import { Suspense } from 'react';
import TableSkeleton from '@/ui/skeletons/table-skeleton';

export default function TableSkeletonProvider({
   children,
   skeleton = <TableSkeleton />,
}: {
   children: React.ReactNode;
   skeleton?: React.ReactNode;
}) {
   return <Suspense fallback={skeleton}>{children}</Suspense>;
}
