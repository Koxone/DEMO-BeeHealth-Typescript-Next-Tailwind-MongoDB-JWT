export const formatDateToMXShort = (dateString: string | Date | undefined): string => {
  if (!dateString) return '--/--/--';

  return new Intl.DateTimeFormat('es-MX', {
    timeZone: 'America/Mexico_City',
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  }).format(new Date(dateString));
};

export const getCalendarDateMX = (dateString: string | Date | undefined) => {
  if (!dateString) return { month: '---', day: '--' };

  const dateObj = new Date(dateString);

  const month = new Intl.DateTimeFormat('es-MX', {
    timeZone: 'America/Mexico_City',
    month: 'short',
  })
    .format(dateObj)
    .substring(0, 3)
    .replace('.', '')
    .toUpperCase();

  const day = new Intl.DateTimeFormat('es-MX', {
    timeZone: 'America/Mexico_City',
    day: '2-digit',
  }).format(dateObj);

  return { month, day };
};

export const daysActive = (createdAt: string | Date | undefined) => {
  if (!createdAt) return 0;
  const start = new Date(createdAt).getTime();
  const now = Date.now();
  const diff = now - start;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};
