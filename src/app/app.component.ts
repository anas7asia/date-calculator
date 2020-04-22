import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  dateForm = new FormGroup({
    start: new FormControl(new Date(), [Validators.required]),
    end: new FormControl(new Date('2020-05-25'), [Validators.required]),
    endIncluded: new FormControl(false)
  })
  result: string

  calcDate() {
    const [start, end] = this.sortTwoDates(
      dayjs(this.dateForm.value.start), 
      dayjs(this.dateForm.value.end))
    const daysCount: number = this.addStartDate(start, end) + 
      end.diff(start, 'day') +
      this.addEndDate(this.dateForm.value.endIncluded)
    this.result = this.getTextResult(daysCount, start, end, this.dateForm.value.endIncluded)
    this.calendar = { start, end, endIncluded: this.dateForm.value.endIncluded }
  }

  private sortTwoDates(date1: Dayjs, date2: Dayjs): Dayjs[] {
    return date1.isBefore(date2) ?
      [date1, date2] :
      [date2, date1]
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
