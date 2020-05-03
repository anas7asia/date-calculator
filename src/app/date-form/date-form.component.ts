import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as dayjs from 'dayjs';
import { Dayjs } from 'dayjs';

@Component({
  selector: 'app-date-form',
  templateUrl: './date-form.component.html',
  styleUrls: ['./date-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateFormComponent {

  @Output() submitForm = new EventEmitter()

  dateForm = new FormGroup({
    start: new FormControl(new Date(), [Validators.required]),
    end: new FormControl(new Date('2020-05-25'), [Validators.required]),
    endIncluded: new FormControl(false)
  })

  onSubmit() {
    const [start, end] = this.sortTwoDates(
      dayjs(this.dateForm.value.start), 
      dayjs(this.dateForm.value.end))

    this.submitForm.emit({ 
      start, 
      end, 
      endIncluded: this.dateForm.value.endIncluded })
  }

  private sortTwoDates(date1: Dayjs, date2: Dayjs): Dayjs[] {
    return date1.isBefore(date2) ?
      [date1, date2] :
      [date2, date1]
  }
}
