import { Component, Input, OnChanges } from '@angular/core';
import { Dayjs } from 'dayjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnChanges {

  @Input() start: Dayjs 
  @Input() end: Dayjs
  @Input() endIncluded: boolean
  months: Dayjs[]

  ngOnChanges() {
    this.months = this.createMonthsRange(this.start, this.end)
  }

  // ex. output: [starting month, next month, ..., last month]
  private createMonthsRange(start, end): Dayjs[] {
    let tempDate: Dayjs = start
    const result: Dayjs[] = [tempDate]

    while (tempDate.isBefore(end, 'month')) {
      let nextMonth = tempDate.add(1, 'month')
      result.push(nextMonth)
      tempDate = nextMonth
    }
    
    return result
  }
}
