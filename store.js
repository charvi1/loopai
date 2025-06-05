const store = {
  ingestions: {},  // { ingestionId: { status, batches: [{batch_id, ids, status}] } }
  queue: []        // [{ batch, priority, createdAt }]
};

module.exports = store;
