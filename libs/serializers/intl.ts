// this function recibe a date and return a CalendarDate only considering the year, month and day
// remember if your field on db is Date prisma will return a Date object include the time
// example field DATE on db: 1999-05-05
// prisma will return: 1999-05-05T00:00:00.000Z

import { CalendarDate, Time } from '@internationalized/date';

// so we need to return only the year, month and day
export function safeDateToCalendarDate(date: Date | null) {
   if (!date) return null;

   const dateStringWithoutTime = date.toISOString().split('T')[0];
   const [year, month, day] = dateStringWithoutTime.split('-');
   return new CalendarDate(Number(year), Number(month), Number(day));
}

export function safeTimeToInputTime(time: string | undefined) {
   try {
      if (!time && !time?.includes(':')) return null;

      const [hours, minutes] = time.split(':');

      return new Time(Number(hours), Number(minutes));
   } catch {
      return null;
   }
}

// if need use on server remember pasing cookie timezone
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

export function getFirstDateOfYear() {
   const date = new Date();
   date.setMonth(0, 1);
   return date.toISOString().split('T')[0];
}

export function getEndDateOfYear() {
   const date = new Date();
   date.setMonth(11, 31);
   return date.toISOString().split('T')[0];
}

export function getFirstDayOfMonth() {
   const date = new Date();
   date.setDate(1);
   const formattedDate = safeParseDateString(date);
   return formattedDate;
}

export function getEndDayOfMonth() {
   const date = new Date();
   const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
   const formattedDate = safeParseDateString(lastDay);
   return formattedDate;
}

export function formatDefaultDateRange(from?: string | null, to?: string | null) {
   const fromDate = stringToCalendarDate(from) || getFirstDayOfMonth()!.calendarDate!;
   const toDate = stringToCalendarDate(to) || getEndDayOfMonth()!.calendarDate!;
   return {
      from: fromDate,
      to: toDate,
   };
}

export function serializeDefaultDateRangeValues(from?: string, to?: string, tz?: string) {
   if (!from || !to) {
      const firstDay = getFirstDayOfMonth()!.utc.split('T')[0];
      const today = safeParseDateString(new Date(), tz)!.date.en;
      return {
         from: firstDay,
         to: today,
      };
   }

   return {
      from: safeParseDateString(from, tz)!.date.en,
      to: safeParseDateString(to, tz)!.date.en,
   };
}

export function safeParseCalendarDateToDate(date: CalendarDate) {
   const objectDate = new Date(date.year, date.month - 1, date.day);

   return safeParseDateString(objectDate);
}

export function safeParseDateRangeToDate(range: {
   start: CalendarDate;
   end: CalendarDate;
}) {
   const fromDate = safeParseCalendarDateToDate(range.start);
   const toDate = safeParseCalendarDateToDate(range.end);

   return {
      from: fromDate,
      to: toDate,
   };
}
