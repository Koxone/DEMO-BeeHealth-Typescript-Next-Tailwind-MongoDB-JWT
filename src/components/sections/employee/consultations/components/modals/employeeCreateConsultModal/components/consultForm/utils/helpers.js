// Add medicine
const handleSelect = (medId, meds, selected, setSelected) => {
  const med = meds.find((m) => m._id === medId);
  if (!med) return;

  const exists = selected.some((item) => item.product === medId);
  if (exists) return;

  setSelected([
    ...selected,
    {
      name: med.name,
      product: med._id,
      inventory: med.inventory?._id || null,
      quantity: 1,
      price: med.salePrice,
      total: med.salePrice,
    },
  ]);
};

// Update quantity
const handleQuantity = (productId, value, setSelected) => {
  const qty = Number(value);

  setSelected((prev) =>
    prev.map((item) =>
      item.product === productId ? { ...item, quantity: qty, total: qty * item.price } : item
    )
  );
};

// Remove medicine
const handleRemove = (productId, selected, setSelected) => {
  setSelected(selected.filter((item) => item.product !== productId));
};

export { handleSelect, handleQuantity, handleRemove };
