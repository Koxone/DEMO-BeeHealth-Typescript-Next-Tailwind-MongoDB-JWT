export function getConsultTotals(consults = []) {
  const totals = consults.reduce(
    (acc, c) => {
      // Totals
      acc.consultPrice += Number(c?.consultPrice) || 0;
      acc.totalItemsSold += Number(c?.totalItemsSold) || 0;
      acc.totalCost += Number(c?.totalCost) || 0;

      // Count items sold
      if (Array.isArray(c?.itemsSold)) {
        acc.itemsSoldCount += c.itemsSold.reduce(
          (sum, item) => sum + (Number(item?.quantity) || 0),
          0
        );
      }

      // Count real consultations (exclude product-only sales)
      if (c?.consultType !== 'Venta de Producto') {
        acc.consultsCount += 1;
      }

      return acc;
    },
    {
      consultPrice: 0,
      totalItemsSold: 0,
      totalCost: 0,
      itemsSoldCount: 0,
      consultsCount: 0,
    }
  );

  return totals;
}

// Usage Example:
// const {
//   consultPrice,
//   totalItemsSold,
//   totalCost,
//   itemsSoldCount,
//   consultsCount,
// } = getConsultTotals(consults);
