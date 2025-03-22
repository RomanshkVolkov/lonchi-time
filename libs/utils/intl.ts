import { CalendarDate } from '@internationalized/date';

export function safeParseDateString(dateParam?: Date | string | null, tz?: string) {
   if (!dateParam) return null;

   const dateValue = new Date(dateParam);
   if (isNaN(dateValue.getTime())) return null; // Verificar si la fecha es válida

   const { year, month, day, hour, minute, second, fractionalSecond, dayPeriod } =
      extractDateComponents(dateValue, tz);
   const language = getBrowserLanguage();
   const formatter = new Intl.DateTimeFormat(language, {
      timeZone: tz,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
   });

   return {
      date: {
         format: formatter.format(dateValue),
         en: `${year}-${month}-${day}`,
         year,
         month,
         day,
      },
      time: {
         format: `${hour}:${minute}:${second}`,
         hour,
         minute,
         second,
      },
      datetime: `${formatter.format(dateValue)} ${hour}:${minute}:${second} ${dayPeriod}`,
      dateObject: dateValue,
      iso: `${year}-${month}-${day}T${hour}:${minute}:${second}:${fractionalSecond},`,
      utc: dateValue.toISOString(),
      locale: language,
      calendarDate: safeDateToCalendarDate(dateValue),
   };
}

export function safeDateToCalendarDate(date: Date | null) {
   if (!date) return null;

   const dateStringWithoutTime = date.toISOString().split('T')[0];
   const [year, month, day] = dateStringWithoutTime.split('-');
   return new CalendarDate(Number(year), Number(month), Number(day));
}

// Extraer componentes de la fecha
function extractDateComponents(date: Date, tz?: string) {
   const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3,
   });

   const parts = formatter.formatToParts(date);
   const dateComponents: Record<string, string | number> = {};

   for (const part of parts) {
      dateComponents[part.type] = part.value;
   }
   return dateComponents;
}

// Obtener el idioma del navegador o un valor por defecto
function getBrowserLanguage() {
   return typeof window !== 'undefined' ? window.navigator.language : 'es-MX';
}

// Añadir ceros a la izquierda para números de un solo dígito
// function pad(num: number): string {
//   return num.toString().padStart(2, '0');
// }

export function stringToCalendarDate(date?: string | null): CalendarDate | null {
   if (!date) return null;
   const [year, month, day] = date.split('-').map(Number);
   return new CalendarDate(year, month, day);
}
