import { Suspense } from 'react';

export default function Layout({
  children,
  modals,
}: Record<'children' | 'modals', React.ReactNode>) {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {children}
        {modals}
      </Suspense>
    </>
  );
}
