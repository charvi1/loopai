const express = require('express');
const { v4: uuidv4 } = require('uuid');
const store = require('./store');
const { getOverallStatus } = require('./utils');
const { startWorker } = require('./processor');

const app = express();
app.use(express.json());

app.post('/ingest', (req, res) => {
  const { ids, priority } = req.body;

  if (!Array.isArray(ids) || !['HIGH', 'MEDIUM', 'LOW'].includes(priority)) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const ingestionId = uuidv4();
  const batches = [];

  for (let i = 0; i < ids.length; i += 3) {
    const batch_ids = ids.slice(i, i + 3);
    const batch_id = uuidv4();
    const batch = { batch_id, ids: batch_ids, status: 'yet_to_start' };

    batches.push(batch);
    store.queue.push({
      ingestionId,
      batch,
      priority,
      createdAt: Date.now()
    });
  }

  store.ingestions[ingestionId] = {
    ingestion_id: ingestionId,
    status: 'yet_to_start',
    batches
  };

  res.status(202).json({ ingestion_id: ingestionId });
});

app.get('/status/:id', (req, res) => {
  const ingestion = store.ingestions[req.params.id];
  if (!ingestion) return res.status(404).json({ error: 'Not found' });

  ingestion.status = getOverallStatus(ingestion.batches);
  res.json(ingestion);
});

startWorker();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
