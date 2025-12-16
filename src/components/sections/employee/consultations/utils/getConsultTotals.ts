export function getConsultTotals(consults = []) {
  const totals = consults.reduce(
    (acc, c) => {
      acc.consultPrice += Number(c.consultPrice) || 0;
      acc.totalItemsSold += Number(c.totalItemsSold) || 0;
      acc.totalCost += Number(c.totalCost) || 0;
      return acc;
    },
    {
      consultPrice: 0,
      totalItemsSold: 0,
      totalCost: 0,
    }
  );

  return totals;
}
