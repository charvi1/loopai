const PRIORITY_RANK = { HIGH: 1, MEDIUM: 2, LOW: 3 };

function getOverallStatus(batches) {
  const statuses = batches.map(b => b.status);
  if (statuses.every(s => s === 'yet_to_start')) return 'yet_to_start';
  if (statuses.every(s => s === 'completed')) return 'completed';
  return 'triggered';
}

function sortQueue(queue) {
  queue.sort((a, b) => {
    const pa = PRIORITY_RANK[a.priority];
    const pb = PRIORITY_RANK[b.priority];
    if (pa !== pb) return pa - pb;
    return a.createdAt - b.createdAt;
  });
}

module.exports = { getOverallStatus, sortQueue };
