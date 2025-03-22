'use client';

import { Card, Skeleton } from '@heroui/react';

export default function TableSkeletonWithoutFilters() {
  const rows = 20;
  return (
    <div className="mt-2 w-full">
      <Card className="mt-3 w-full p-4" radius="sm">
        <div className="mt-6">
          {Array.from({ length: rows }).map((_, index) => (
            <div key={`table_skeleton_row_${index}`} className="h-10">
              <Skeleton className="h-8 rounded-lg" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
