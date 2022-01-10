
export const toISODate = (date: Date): String => {
    return date.getUTCFullYear() +
    '-' + pad(date.getUTCMonth() + 1) +
    '-' + pad(date.getUTCDate());
   } 

const pad = (number) => {
    if (number < 10) {
      return '0' + number;
    }
    return number;
  }