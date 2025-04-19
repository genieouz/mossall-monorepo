export function getMonthNameFromIndex(monthIndex) {
    const months = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    return months[monthIndex];
  }  

  export class DateFormatter {
    static format(date: Date, formatString: string): string {
      const options: Intl.DateTimeFormatOptions = {};
  
      if (formatString.includes('yyyy')) options.year = 'numeric';
      if (formatString.includes('MM')) options.month = '2-digit';
      if (formatString.includes('dd')) options.day = '2-digit';
      if (formatString.includes('HH')) options.hour = '2-digit';
      if (formatString.includes('mm')) options.minute = '2-digit';
      if (formatString.includes('ss')) options.second = '2-digit';
  
      return new Intl.DateTimeFormat('fr-FR', options).format(date);
    }
  }
  