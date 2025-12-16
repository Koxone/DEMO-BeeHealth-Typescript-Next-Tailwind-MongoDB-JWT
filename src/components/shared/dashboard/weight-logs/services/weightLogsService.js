// Compute newest logs per patient
export function getNewestLogs(weightLogs) {
  /* Group by patient */
  const grouped = weightLogs.reduce((acc, log) => {
    const id = log.patient._id;
    if (!acc[id] || new Date(log.createdAt) > new Date(acc[id].createdAt)) {
      acc[id] = log;
    }
    return acc;
  }, {});
  return Object.values(grouped);
}

// Compute total loss
export function computeTotalLoss(weightLogs) {
  /* Sum newest value */
  const newest = getNewestLogs(weightLogs);
  return newest.reduce((sum, log) => sum + (log.differenceFromOriginal || 0), 0);
}
