import { useCallback } from 'react';
import { orderAtom } from '@/libs/atoms/order';
import { useAtom } from 'jotai';
import { Button } from '@heroui/react';
import { ArrowRightIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

export default function DetailsOrderToogle({ id }: { id: string }) {
  const [orders, setOrders] = useAtom(orderAtom);
  const order = useCallback(
    () => orders.find((order) => order.id === id),
    [id, orders],
  );

  const handleToogle = () => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, isCollapsed: !order.isCollapsed } : order,
      ),
    );
  };

  const iconClassName = 'w-5';
  return (
    <Button onPress={handleToogle} isIconOnly variant="light">
      {Boolean(order()?.isCollapsed) ? (
        <ArrowDownIcon className={iconClassName} />
      ) : (
        <ArrowRightIcon className={iconClassName} />
      )}
    </Button>
  );
}
