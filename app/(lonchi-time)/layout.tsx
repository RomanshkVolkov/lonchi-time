export default function Layout({
  children,
  modals,
}: Record<'children' | 'modals', React.ReactNode>) {
  return (
    <>
      {children}
      {modals}
    </>
  );
}
