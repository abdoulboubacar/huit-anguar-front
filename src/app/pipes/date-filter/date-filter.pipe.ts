import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateFilter'
})
export class DateFilterPipe implements PipeTransform {

  transform(value: string): string {
    const date = moment(value);
    const duration = date.locale('fr').fromNow();
    const durationString = duration.split(' ');
    let dateToDisplay: string;
    if (durationString[durationString.length - 1] === ('jours' || 'mois' || 'ans') ) {
      dateToDisplay = date.locale('fr').format('DD-MM-YYYY HH:MM');
    } else {
      dateToDisplay = duration;
    }
    return dateToDisplay;
  }

}
