import { Component } from '@angular/core';
import * as dayjs from 'dayjs';
import { Dayjs } from 'dayjs';

interface CalendarData {
  start: Dayjs
  end: Dayjs
  endIncluded: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  calendar: CalendarData
  result: string

  getResult(e) {
    this.calendar = e

    const { start, end, endIncluded } = e
    const daysCount: number = this.addStartDate(start, end) + 
      end.diff(start, 'day') +
      this.addEndDate(endIncluded)
    this.result = this.getTextResult(daysCount, start, end, endIncluded)
  }

  /* start date is not taken into account by dayjs.diff, 
  include manually if more than one day of difference */
  private addStartDate(start: Dayjs, end: Dayjs): number {
    return end.isSame(start, 'day') ? 0 : 1
  }

  private addEndDate(isIncluded: boolean): number {
    return isIncluded ? 1 : 0
  }

  private getTextResult(result: number, start: Dayjs, end: Dayjs, endIncluded?: boolean): string {
    return `
    <p><strong>From and including:</strong> ${start.format('DD/MM/YYYY')}</p>
    <p><strong>To${endIncluded ? ' and including': ''}:</strong> ${end.format('DD/MM/YYYY')}</p>
    <p><strong>Result:</strong> ${result} ${result > 1 ? 'days' : 'day'}</p>
    <p>It is ${result} ${result > 1 ? 'days' : 'day'} from the start date to the end date${endIncluded ? ', end date included' : '' }.</p>
    `
  }
}
