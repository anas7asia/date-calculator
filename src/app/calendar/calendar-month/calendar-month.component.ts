import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Dayjs } from 'dayjs';
import * as dayjs from 'dayjs';
import * as isSameOrBefore from 'dayjs/plugin/isSameOrBefore' // import plugin
import * as isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
dayjs.extend(isSameOrBefore) // use plugin
dayjs.extend(isSameOrAfter)

interface CalendarCell {
  value: string | number
  isActive: boolean
  isDisabled: boolean
}

@Component({
  selector: 'app-calendar-month',
  templateUrl: './calendar-month.component.html',
  styleUrls: ['./calendar-month.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarMonthComponent implements OnInit {

  @Input() month: Dayjs
  @Input() start: Dayjs 
  @Input() end: Dayjs 
  @Input() endIncluded: boolean
  monthName: string
  calendarCells: CalendarCell[]

  ngOnInit() {
    this.monthName = this.month.format('MMMM')
    this.calendarCells = this.createCalendarCells()
  }

  // total cells number (empty and non empty cells) % 7 is equal to 0 
  private createCalendarCells(): CalendarCell[] {
    const daysInMonth = this.month.daysInMonth()
    const firstDayDayOfWeek = dayjs(`${this.createYearAndMonthStr()}-01`).day()
    const lastDayDayOfWeek = dayjs(`${this.createYearAndMonthStr()}-${daysInMonth}`).day()
    const result: CalendarCell[] = []

    // empty cells at the beginning of calendar from the first cell till the cell with the first day of month (first row in calendar) 
    // days are counted from 0 to 6, Sun to Sat
    for (let i = 0; i < firstDayDayOfWeek; i++) {
      result.push({ value: '', isActive: false, isDisabled: true })
    }
    
    // all days of month
    for (let i = 1; i <= daysInMonth; i++) {
      result.push({ 
        value: i, 
        isActive: this.checkDateIsInBetween(i), 
        isDisabled: false
      })
    }
    
    // empty cells in the end of calendar from the cell with the last day of month till the seventh cell (last row)
    // days are counted from 0 to 6, Sun to Sat
    for (let i = lastDayDayOfWeek; i < 6; i++) {
      result.push({ value: '', isActive: false, isDisabled: true })
    }

    return result
  }

  private checkDateIsInBetween(dayNum: number): boolean {
    const thisDayDate = `${this.createYearAndMonthStr()}-${this.createDayFromNumber(dayNum)}`
    return dayjs(thisDayDate).isSameOrAfter(this.start, 'day') && 
      (this.endIncluded ? 
        dayjs(thisDayDate).isSameOrBefore(this.end, 'day') :
        dayjs(thisDayDate).isBefore(this.end, 'day'))
  }

  private createYearAndMonthStr(): string {
    return `${this.month.year()}-${this.month.month()+1}`
  }

  private createDayFromNumber(day: number): string {
    return day < 10 ? `0${day}` : `${day}`
  }
}
