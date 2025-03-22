'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
// import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { HeroUIProvider, ToastProvider } from '@heroui/react';

export function Providers({ children }: { children: React.ReactNode }) {
   const [pendingRedirect, setPendingRedirect] = React.useState(false);
   const pathname = usePathname();
   const { push } = useRouter();
   const searchParams = useSearchParams();
   const queryParams = new URLSearchParams(searchParams);

   const redirectKey = 'redirectPath';
   const handlePendingRedirect = () => {
      const currentRedirectPath = queryParams.get(redirectKey);
      const currentRedirectPathStorage = localStorage.getItem(redirectKey);

      if (pendingRedirect) {
         if (
            currentRedirectPathStorage &&
            pendingRedirect &&
            pathname !== currentRedirectPath
         ) {
            setPendingRedirect(false);
            localStorage.removeItem(redirectKey);
            push(currentRedirectPathStorage);
         }
      }
      if (currentRedirectPath && !pendingRedirect) {
         setPendingRedirect(true);
         localStorage.setItem(redirectKey, currentRedirectPath);
      }
   };

   // eslint-disable-next-line react-hooks/exhaustive-deps
   useEffect(handlePendingRedirect, [searchParams, pathname]);

   return (
      <HeroUIProvider navigate={push} locale="es-MX">
         <ToastProvider placement="top-center" />
         {/* <NextThemesProvider attribute="class" defaultTheme="dark"> */}
         {children}
         {/* </NextThemesProvider> */}
      </HeroUIProvider>
   );
}
