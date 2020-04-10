import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  dateForm = new FormGroup({
    start: new FormControl(new Date(), [Validators.required]),
    end: new FormControl(undefined, [Validators.required]),
    endIncluded: new FormControl(false)
  })
  result: string

  calcDate() {
    const [start, end] = this.sortTwoDates(
      dayjs(this.dateForm.value.start), 
      dayjs(this.dateForm.value.end))
    const res: number = this.addStartDate(start, end) + 
      end.diff(start, 'day') +
      this.addEndDate(this.dateForm.value.endIncluded)
    this.result = this.getTextResult(res, start, end, this.dateForm.value.endIncluded)
  }

  private sortTwoDates(date1: dayjs.Dayjs, date2: dayjs.Dayjs): dayjs.Dayjs[] {
    return date1.isBefore(date2) ?
      [date1, date2] :
      [date2, date1]
  }

  /* start date is not taken into account by dayjs.diff, 
  include manually if more than one day of difference */
  private addStartDate(start: dayjs.Dayjs, end: dayjs.Dayjs): number {
    return end.isSame(start, 'day') ? 0 : 1
  }

  private addEndDate(isIncluded: boolean): number {
    return isIncluded ? 1 : 0
  }

  private getTextResult(result: number, start: dayjs.Dayjs, end: dayjs.Dayjs, endIncluded?: boolean): string {
    return `
    <p>From and including: ${start.format('DD/MM/YYYY')}</p>
    <p>To${endIncluded ? ' and including': ''}: ${end.format('DD/MM/YYYY')}</p>
    <p>Result: ${result} ${result > 1 ? 'days' : 'day'}</p>
    <p>It is ${result} ${result > 1 ? 'days' : 'day'} from the start date to the end date${endIncluded ? ', end date included' : '' }.</p>
    `
  }
}
