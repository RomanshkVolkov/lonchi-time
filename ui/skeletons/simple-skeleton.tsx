'use client';

import { Skeleton, SkeletonProps } from '@heroui/react';

type Props = SkeletonProps;
export default function SimpleSkeleton(props: Props) {
  return <Skeleton {...props} />;
}
