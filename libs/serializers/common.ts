export function serializeSelectOptionMapped({
  mapped,
  options,
}: {
  mapped: { key: string; label: string };
  options: {
    [key: string]: string;
  }[];
}) {
  return options.map((option) => ({
    key: option[mapped.key],
    label: option[mapped.label],
  }));
}

export function serializePrice(price: number | any | null) {
  const value = typeof price === 'number' ? price : (price?.toNumber() ?? 0.0);
  return {
    value: value,
    formatted: new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(value),
  };
}
