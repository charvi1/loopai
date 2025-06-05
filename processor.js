const store = require('./store');
const { sortQueue } = require('./utils');

async function processBatch(batchObj) {
  const { ingestionId, batch } = batchObj;

  // Update batch status to triggered
  const ingestion = store.ingestions[ingestionId];
  const batchStatus = ingestion.batches.find(b => b.batch_id === batch.batch_id);
  batchStatus.status = 'triggered';

  // Simulate external API delay
  await new Promise(res => setTimeout(res, 1000));

  // Complete processing
  batchStatus.status = 'completed';
  console.log(`Processed batch: ${batch.batch_id}`, batch.ids);
}

async function startWorker() {
  setInterval(async () => {
    if (store.queue.length === 0) {
      return;
    }

    sortQueue(store.queue);
    const next = store.queue.shift();
    await processBatch(next);
  }, 5000); // 1 batch every 5 seconds
}

module.exports = { startWorker };
