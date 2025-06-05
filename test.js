const axios = require('axios');

const sleep = ms => new Promise(res => setTimeout(res, ms));

async function runTest() {
  const base = 'http://localhost:5000';

  // Send first request (MEDIUM)
  const r1 = await axios.post(`${base}/ingest`, {
    ids: [1, 2, 3, 4, 5],
    priority: 'MEDIUM'
  });
  console.log('Ingestion ID 1:', r1.data);

  await sleep(4000);

  // Send second request (HIGH)
  const r2 = await axios.post(`${base}/ingest`, {
    ids: [6, 7, 8, 9],
    priority: 'HIGH'
  });
  console.log('Ingestion ID 2:', r2.data);

  await sleep(16000);

  // Check statuses
  const status1 = await axios.get(`${base}/status/${r1.data.ingestion_id}`);
  console.log('Status 1:', JSON.stringify(status1.data, null, 2));

  const status2 = await axios.get(`${base}/status/${r2.data.ingestion_id}`);
  console.log('Status 2:', JSON.stringify(status2.data, null, 2));
}

runTest();
