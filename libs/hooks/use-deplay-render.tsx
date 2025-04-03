/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useState, useEffect } from 'react';

/**
 * Hook para retrasar la renderización de un componente.
 * @param delay - Tiempo de retraso en milisegundos.
 * @param dependencies - Dependencias que pueden desencadenar el retraso nuevamente.
 * @returns Un booleano que indica si el componente debe renderizarse.
 */
export function useDelayedRender(
  delay: number,
  dependencies: any[] = [],
): boolean {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Reinicia el estado antes de aplicar el retraso
    let timeoutId: NodeJS.Timeout;

    const applyDelay = () => {
      setShouldRender(false); // Oculta temporalmente
      timeoutId = setTimeout(() => {
        setShouldRender(true); // Muestra después del retraso
      }, delay);
    };

    applyDelay();

    // Limpia el timeout si el efecto se desmonta o las dependencias cambian
    return () => clearTimeout(timeoutId);
  }, [delay, ...dependencies]); // Reaplica el retraso si las dependencias cambian

  return shouldRender;
}
