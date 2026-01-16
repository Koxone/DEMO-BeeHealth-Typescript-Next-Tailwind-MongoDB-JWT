'use client';

// Types
type PaymentMethod = 'efectivo' | 'tarjeta' | 'transferencia';

type Totals = {
  consultsCount: number;
  consultsAmount: number;
  medicinesCount: number;
  medicinesAmount: number;
};

type TotalsByPayment = Record<PaymentMethod, Totals>;

export default function PaymentMethodDistribution({ data }: { data: any[] }) {
  const totals = data.reduce<TotalsByPayment>(
    (acc, consult) => {
      const method = consult.paymentMethod as PaymentMethod;

      if (!acc[method]) return acc;

      // Consults
      acc[method].consultsCount += 1;
      acc[method].consultsAmount += consult.consultPrice || 0;

      // Medicines
      consult.itemsSold?.forEach((item: any) => {
        acc[method].medicinesCount += item.quantity;
        acc[method].medicinesAmount += item.total || 0;
      });

      return acc;
    },
    {
      efectivo: {
        consultsCount: 0,
        consultsAmount: 0,
        medicinesCount: 0,
        medicinesAmount: 0,
      },
      tarjeta: {
        consultsCount: 0,
        consultsAmount: 0,
        medicinesCount: 0,
        medicinesAmount: 0,
      },
      transferencia: {
        consultsCount: 0,
        consultsAmount: 0,
        medicinesCount: 0,
        medicinesAmount: 0,
      },
    }
  );

  return (
    <div className="bg-beehealth-body-main rounded-xl border border-gray-200 p-4 shadow-sm md:p-6">
      <h2 className="mb-4 text-lg font-semibold text-gray-700 md:text-xl">
        Distribución por Método de Pago
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {(Object.entries(totals) as [PaymentMethod, Totals][]).map(([method, values]) => (
          <div
            key={method}
            className="bg-beehealth-green-primary-light rounded-lg border border-gray-200 p-4 text-sm"
          >
            <p className="mb-2 font-semibold text-gray-700 capitalize">{method}</p>

            <div className="flex justify-between text-gray-600">
              <span>Consultas</span>
              <span>{values.consultsCount}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Monto consultas</span>
              <span>${values.consultsAmount.toLocaleString()}</span>
            </div>

            <div className="mt-1 flex justify-between text-gray-600">
              <span>Medicamentos</span>
              <span>{values.medicinesCount}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Monto medicamentos</span>
              <span>${values.medicinesAmount.toLocaleString()}</span>
            </div>

            <div className="mt-2 flex justify-between font-semibold text-gray-700">
              <span>Total</span>
              <span>${(values.consultsAmount + values.medicinesAmount).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
