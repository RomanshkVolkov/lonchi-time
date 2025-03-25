'use client';

import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { addToast, Form } from '@heroui/react';
import { useAtom } from 'jotai';
import Select from '@/ui/inputs/select';
import FormSubmissionSection from '@/ui/form/form-submission-section';
import { ButtonQuantity } from '@/ui/buttons/quantity-button';
import { SelectOption } from '@/types/common';
import { orderAtom } from '@/libs/atoms/order';
import { ProductList } from '@/types/event';

type Props = {
  keyItem?: string;
  diners: SelectOption[];
  products: ProductList[];
  mode?: 'edit' | 'create';
};
export default function FormAppendOrder({
  keyItem,
  diners,
  products,
  mode = 'create',
}: Props) {
  const { back } = useRouter();
  const [orders, setOrders] = useAtom(orderAtom);
  const order = orders.find((item) => item.key === keyItem);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const keys = Object.keys(data);
    const productKeys = keys.filter((key) => key.includes('product_amount_'));
    const items = productKeys
      .map((key) => {
        const id = key.replace('product_amount_', '');
        const product = products.find((item) => item.id === id)!;
        const amount = +data[key];
        return { ...product, amount };
      })
      .filter((p) => p.amount > 0);

    if (products.length === 0) {
      addToast({
        title: 'Debe agregar al menos un producto',
        severity: 'danger',
      });
      return;
    }

    const order = {
      diner: diners.find((item) => item.key === String(data.diner))!,
      hasCoca: data.hasCoca === '1',
      items,
    };

    setOrders((prev) => {
      if (mode === 'edit') {
        return prev.map((item) =>
          item.key === keyItem ? { ...item, ...order } : item,
        );
      }
      return [...prev, { ...order, key: String(prev.length + 1) }];
    });

    back();
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="w-full"
      validationBehavior="native"
    >
      <div className="flex w-full flex-col gap-2">
        <Select
          name="diner"
          label="Comensal"
          options={diners.filter(
            (item) =>
              !orders.some((order) => order.diner.key === item.key) ||
              mode === 'edit',
          )}
          defaultSelectedKeys={new Set([order?.diner?.key ?? ''])}
          isRequired
        />
        <Select
          name="hasCoca"
          label="Coca-Cola"
          defaultSelectedKeys={new Set([order?.hasCoca ? '1' : '0'])}
          options={[
            { key: '1', label: 'Sí' },
            { key: '0', label: 'No' },
          ]}
        />

        {products.map((product) => (
          <div key={product.id} className="flex justify-between">
            <div>
              <h2>{product.name}</h2>
              <p>{product.price.formatted}</p>
            </div>
            <div>
              <ButtonQuantity
                inputProps={{ name: `product_amount_${product.id}` }}
                defaultValue={
                  order?.items.find((item) => item.id === product.id)?.amount
                }
              />
            </div>
          </div>
        ))}
      </div>
      <FormSubmissionSection isLoading={false} />
    </Form>
  );
}
