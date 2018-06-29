import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: number, args?: any): any {
    const today = new Date().toISOString();
    const age = (Date.parse(today) - value) / 1000;     // en seconde

    // years
    const y = (age / 31536000);
    if (y < 2 && y >= 1) {
      return '1 year ago';
    }
    if (y > 1) {
      return y.toFixed(0) + ' years ago';
    } else {
      // mois
      const m = (age / 2592000);
      if (m >= 1) {
        return m.toFixed(0) + ' month ago';
      } else {
        // jours
        const j = (age / 86400);
        if (j < 2 && j >= 1) {
          return '1 day ago';
        }
        if (j > 1) {
          return j.toFixed(0) + ' days ago';
        } else {
          // heure
          const h = (age / 3600);
          if (h >= 1) {
            return h.toFixed(0) + ' h ago';
          } else {
            // minute
            const min = (age / 60);
            if (min >= 1) {
              return min.toFixed(0) + ' min ago';
            } else {
              // instant
              return 'just now';
            }
          }
        }
      }
    }
  }
}

