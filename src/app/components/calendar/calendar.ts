import { NgModule             } from '@angular/core'          ;
import { Component            } from '@angular/core'          ;
import { ElementRef           } from '@angular/core'          ;
import { OnDestroy            } from '@angular/core'          ;
import { OnInit               } from '@angular/core'          ;
import { Input                } from '@angular/core'          ;
import { Output               } from '@angular/core'          ;
import { SimpleChange         } from '@angular/core'          ;
import { EventEmitter         } from '@angular/core'          ;
import { Renderer2            } from '@angular/core'          ;
import { ViewChild            } from '@angular/core'          ;
import { ChangeDetectorRef    } from '@angular/core'          ;
import { ApplicationRef       } from '@angular/core'          ;
import { TemplateRef          } from '@angular/core'          ;
import { ContentChildren      } from '@angular/core'          ;
import { QueryList            } from '@angular/core'          ;
import { forwardRef           } from '@angular/core'          ;
import { CommonModule         } from '@angular/common'        ;
import { AnimationEvent       } from '@angular/animations'    ;
import { FormsModule          } from '@angular/forms'         ;
import { NG_VALUE_ACCESSOR    } from '@angular/forms'         ;
import { ControlValueAccessor } from '@angular/forms'         ;
import { trigger              } from '@angular/animations'    ;
import { state                } from '@angular/animations'    ;
import { style                } from '@angular/animations'    ;
import { transition           } from '@angular/animations'    ;
import { animate              } from '@angular/animations'    ;
import { ButtonModule         } from '../button/button'       ;
import { DomHandler           } from '../dom/domhandler'      ;
import { SharedModule         } from '../common/shared'       ;
import { PrimeTemplate        } from '../common/shared'       ;
import { Subject              } from 'rxjs'                   ;
import { Subscription         } from 'rxjs'                   ;
import { Moment               } from '../utils/moment-onsite' ;
import { moment               } from '../utils/moment-onsite' ;

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';


export const CALENDAR_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Calendar),
  multi: true
};

export interface LocaleSettings {
  firstDayOfWeek?: number;
  dayNames: string[];
  dayNamesShort: string[];
  dayNamesMin: string[];
  monthNames: string[];
  monthNamesShort: string[];
  today: string;
  now ?: string;
  clear: string;
  save?: string;
}
export type CalendarDataType = "date" | "string";
export type CalendarSelectionType = "single" | "multiple" | "range";
export type CalendarViewType = "date" | "month";

@Component({
  selector: 'p-calendar',
  template: `
<span [ngClass]="{'ui-calendar':true, 'ui-calendar-w-btn': showIcon, 'ui-calendar-timeonly': timeOnly}" [ngStyle]="style" [class]="styleClass">
  <ng-template [ngIf]="!inline">
    <input #inputfield type="text" [attr.id]="inputId" [attr.name]="name" [attr.required]="required" [value]="inputFieldValue" (focus)="onInputFocus($event)" (keydown)="onInputKeydown($event)" (click)="onInputClick($event)" (blur)="onInputBlur($event)" [readonly]="readonlyInput" (input)="onUserInput($event)" [ngStyle]="inputStyle" [class]="inputStyleClass" [placeholder]="placeholder||''" [disabled]="disabled" [attr.tabindex]="tabindex" [ngClass]="'ui-inputtext ui-widget ui-state-default ui-corner-all'" autocomplete="off"><button type="button" [icon]="icon" pButton *ngIf="showIcon" (click)="onButtonClick($event,inputfield)" class="ui-datepicker-trigger ui-calendar-button" [ngClass]="{'ui-state-disabled':disabled}" [disabled]="disabled" tabindex="-1">
    </button>
  </ng-template>
  <div [class]="panelStyleClass" [ngStyle]="panelStyle" [ngClass]="{'ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all': true, 'ui-datepicker-inline':inline,'ui-shadow':!inline,
        'ui-state-disabled':disabled,'ui-datepicker-timeonly':timeOnly,'ui-datepicker-multiple-month': this.numberOfMonths > 1, 'ui-datepicker-monthpicker': (view === 'month'), 'ui-datepicker-touch-ui': touchUI}" (click)="onDatePickerClick($event)" (wheel)="onCalendarWheelEvent($event)" [@overlayAnimation]="touchUI ? {value: 'visibleTouchUI', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}:
        {value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" [@.disabled]="inline === true" (@overlayAnimation.start)="onOverlayAnimationStart($event)" *ngIf="inline || overlayVisible">
    <ng-container *ngIf="!timeOnly">
      <div class="ui-datepicker-group ui-widget-content" *ngFor="let month of months; let i = index;">
        <div class="ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all">
          <ng-content select="p-header"></ng-content>
          <a class="ui-datepicker-prev ui-corner-all" href="#" (click)="navBackward($event)" *ngIf="i === 0">
            <span class="pi pi-chevron-left"></span>
          </a>
          <a class="ui-datepicker-next ui-corner-all" href="#" (click)="navForward($event)" *ngIf="numberOfMonths === 1 ? true : (i === numberOfMonths -1)">
            <span class="pi pi-chevron-right"></span>
          </a>
          <div class="ui-datepicker-title">
            <span class="ui-datepicker-month" *ngIf="!monthNavigator && (view !== 'month')">{{locale.monthNames[month.month]}}</span>
            <select class="ui-datepicker-month" *ngIf="monthNavigator && (view !== 'month') && numberOfMonths === 1" (change)="onMonthDropdownChange($event.target.value)">
              <option [value]="i" *ngFor="let monthName of locale.monthNames;let i = index" [selected]="i === month.month">{{monthName}}</option>
            </select>
            <select class="ui-datepicker-year" *ngIf="yearNavigator && numberOfMonths === 1" (change)="onYearDropdownChange($event.target.value)">
              <option [value]="year" *ngFor="let year of yearOptions" [selected]="year === currentYear">{{year}}</option>
            </select>
            <span class="ui-datepicker-year" *ngIf="!yearNavigator">{{view === 'month' ? currentYear : month.year}}</span>
          </div>
        </div>
        <div class="ui-datepicker-calendar-container" *ngIf="view ==='date'">
          <table class="ui-datepicker-calendar">
            <thead>
              <tr>
                <th scope="col" *ngFor="let weekDay of weekDays;let begin = first; let end = last">
                  <span>{{weekDay}}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let week of month.dates">
                <td *ngFor="let date of week" [ngClass]="{'ui-datepicker-other-month': date.otherMonth,
                  'ui-datepicker-current-day':isSelected(date), 'ui-datepicker-today': date.today}">
                  <ng-container *ngIf="date.otherMonth ? showOtherMonths : true">
                    <a class="ui-state-default" *ngIf="date.selectable" [ngClass]="{'ui-state-active':isSelected(date), 'ui-state-highlight':date.today}" (click)="onDateSelect($event,date)" draggable="false">
                      <ng-container *ngIf="!dateTemplate">{{date.day}}</ng-container>
                      <ng-container *ngTemplateOutlet="dateTemplate; context: {$implicit: date}"></ng-container>
                    </a>
                    <span class="ui-state-default ui-state-disabled" *ngIf="!date.selectable"> {{date.day}} </span>
                  </ng-container>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="ui-monthpicker" *ngIf="view === 'month'">
        <a href="#" *ngFor="let m of monthPickerValues; let i = index" (click)="onMonthSelect($event, i)" class="ui-monthpicker-month" [ngClass]="{'ui-state-active': isMonthSelected(i)}"> {{m}} </a>
      </div>
    </ng-container>
    <div class="ui-timepicker ui-widget-header ui-corner-all" *ngIf="showTime||timeOnly">
      <div class="ui-hour-picker">
        <a href="#" (click)="incrementHour($event)" [tabindex]="!timeReadOnly ? -1 : 20">
          <span class="pi pi-chevron-up"></span>
        </a>
        <ng-container *ngIf="timeReadOnly">
          <span [ngStyle]="{'display': currentHour < 10 ? 'inline': 'none'}">0</span><span>{{currentHour}}</span>
        </ng-container>
        <ng-container *ngIf="!timeReadOnly">
          <input #inputhours type="text" [attr.id]="inputHoursId" [value]="showCurrentHour" (focus)="onInputTimeFocus('hour', inputhours, $event)" (blur)="onInputTimeBlur('hour', inputhours, $event)" (input)="onInputHours($event)" (keyup)="onKeyUp('hour', $event)" (wheel)="onInputScroll('hour', $event)" [disabled]="timeReadOnly" [ngClass]="'ui-inputtext ui-widget ui-state-default ui-corner-all input-time input-hour'" tabindex="1" autocomplete="off" />
        </ng-container>
        <a href="#" (click)="decrementHour($event)" [tabindex]="!timeReadOnly ? -1 : 21">
          <span class="pi pi-chevron-down"></span>
        </a>
      </div>
      <div class="ui-separator">
        <a href="#">
          <span class="pi pi-chevron-up"></span>
        </a>
        <span>:</span>
        <a href="#">
          <span class="pi pi-chevron-down"></span>
        </a>
      </div>
      <div class="ui-minute-picker">
        <a href="#" (click)="incrementMinute($event)" [tabindex]="!timeReadOnly ? -1 : 22">
          <span class="pi pi-chevron-up"></span>
        </a>
        <ng-container *ngIf="timeReadOnly">
          <span [ngStyle]="{'display': currentMinute < 10 ? 'inline': 'none'}">0</span><span>{{currentMinute}}</span>
        </ng-container>
        <ng-container *ngIf="!timeReadOnly">
          <input #inputminutes type="text" [attr.id]="inputMinutesId" [value]="showCurrentMinute" (input)="onInputMinutes($event)" (keyup)="onKeyUp('minute', $event)" (wheel)="onInputScroll('minute', $event)" [disabled]="timeReadOnly" [ngClass]="'ui-inputtext ui-widget ui-state-default ui-corner-all input-time input-minute'" tabindex="2" autocomplete="off" />
        </ng-container>
        <a href="#" (click)="decrementMinute($event)" [tabindex]="!timeReadOnly ? -1 : 23">
          <span class="pi pi-chevron-down"></span>
        </a>
      </div>
      <div class="ui-separator" *ngIf="showSeconds">
        <a href="#">
          <span class="pi pi-chevron-up"></span>
        </a>
        <span>:</span>
        <a href="#">
          <span class="pi pi-chevron-down"></span>
        </a>
      </div>
      <div class="ui-second-picker" *ngIf="showSeconds">
        <a href="#" (click)="incrementSecond($event)" [tabindex]="!timeReadOnly ? -1 : 24">
          <span class="pi pi-chevron-up"></span>
        </a>
        <ng-container *ngIf="timeReadOnly">
          <span [ngStyle]="{'display': currentSecond < 10 ? 'inline': 'none'}">0</span><span>{{currentSecond}}</span>
        </ng-container>
        <ng-container *ngIf="!timeReadOnly">
          <input #inputseconds type="text" [attr.id]="inputSecondsId" [value]="showCurrentSecond" (input)="onInputSeconds($event)" (keyup)="onKeyUp('second', $event)" (wheel)="onInputScroll('second', $event)" [disabled]="timeReadOnly" [ngClass]="'ui-inputtext ui-widget ui-state-default ui-corner-all input-time input-second'" tabindex="3" autocomplete="off" />
        </ng-container>
        <a href="#" (click)="decrementSecond($event)" [tabindex]="!timeReadOnly ? -1 : 25">
          <span class="pi pi-chevron-down"></span>
        </a>
      </div>
      <div class="ui-ampm-picker" *ngIf="hourFormat=='12'">
        <a href="#" (click)="toggleAMPM($event)">
          <span class="pi pi-chevron-up"></span>
        </a>
        <span>{{pm ? 'PM' : 'AM'}}</span>
        <a href="#" (click)="toggleAMPM($event)">
          <span class="pi pi-chevron-down"></span>
        </a>
      </div>
    </div>
    <div class="ui-datepicker-buttonbar ui-widget-header" *ngIf="showButtonBar">
      <div class="ui-g">
        <ng-container *ngIf="!showTime">
          <div class="ui-g-4">
            <button type="button" [label]="_locale.today" (click)="onTodayButtonClick($event)" pButton [ngClass]="[todayButtonStyleClass]"></button>
          </div>
          <div class="ui-g-4">
            <button type="button" [label]="_locale.clear" (click)="onClearButtonClick($event)" pButton [ngClass]="[clearButtonStyleClass]"></button>
          </div>
          <div class="ui-g-4">
            <button type="button" [label]="_locale.save" (click)="onSaveButtonClick($event)" pButton [ngClass]="[saveButtonStyleClass]"></button>
          </div>
        </ng-container>
        <ng-container *ngIf="showTime">
          <div class="ui-g-3">
            <button type="button" [label]="_locale.today" (click)="onTodayButtonClick($event)" pButton [ngClass]="[todayButtonStyleClass]"></button>
          </div>
          <div class="ui-g-3">
            <button type="button" [label]="_locale.now" (click)="onNowButtonClick($event)" pButton [ngClass]="[nowButtonStyleClass]"></button>
          </div>
          <div class="ui-g-3">
            <button type="button" [label]="_locale.clear" (click)="onClearButtonClick($event)" pButton [ngClass]="[clearButtonStyleClass]"></button>
          </div>
          <div class="ui-g-3">
            <button type="button" [label]="_locale.save" (click)="onSaveButtonClick($event)" pButton [ngClass]="[saveButtonStyleClass]"></button>
          </div>
        </ng-container>
      </div>
    </div>
    <ng-content select="p-footer"></ng-content>
  </div>
</span>
`,
  animations: [
    trigger('overlayAnimation', [
      state('visible', style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      state('visibleTouchUI', style({
        transform: 'translate(-50%,-50%)',
        opacity: 1
      })),
      transition('void => visible', [
        style({ transform: 'translateY(5%)', opacity: 0 }),
        animate('{{showTransitionParams}}')
      ]),
      transition('visible => void', [
        animate(('{{hideTransitionParams}}'),
          style({
            opacity: 0,
            transform: 'translateY(5%)'
          }))
      ]),
      transition('void => visibleTouchUI', [
        style({ opacity: 0, transform: 'translate3d(-50%, -40%, 0) scale(0.9)' }),
        animate('{{showTransitionParams}}')
      ]),
      transition('visibleTouchUI => void', [
        animate(('{{hideTransitionParams}}'),
          style({
            opacity: 0,
            transform: 'translate3d(-50%, -40%, 0) scale(0.9)'
          }))
      ])
    ])
  ],
  host: {
    '[class.ui-inputwrapper-filled]': 'filled',
    '[class.ui-inputwrapper-focus]': 'focus'
  },
  providers: [DomHandler, CALENDAR_VALUE_ACCESSOR]
})
export class Calendar implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() defaultDate: Date;

  @Input() style: any;

  @Input() styleClass: string;

  @Input() inputStyle: any;

  @Input() inputId: string;

  @Input() name: string;

  @Input() inputStyleClass: string;

  @Input() placeholder: string;

  @Input() disabled: any;

  @Input() dateFormat: string = 'mm/dd/yy';

  @Input() inline: boolean = false;

  @Input() showOtherMonths: boolean = true;

  @Input() selectOtherMonths: boolean;

  @Input() showIcon: boolean;

  @Input() icon: string = 'pi pi-calendar';

  @Input() appendTo: any;

  @Input() readonlyInput: boolean;

  @Input() shortYearCutoff: any = '+10';

  @Input() monthNavigator: boolean;

  @Input() yearNavigator: boolean;

  @Input() yearRange: string;

  @Input() hourFormat: string = '24';

  @Input() timeOnly: boolean;

  @Input() stepHour: number;

  @Input() stepMinute: number;

  @Input() stepSecond: number;

  @Input() showSeconds: boolean = false;

  @Input() roundMinutesToNearest: number;

  @Input() required: boolean;

  @Input() showOnFocus: boolean = true;

  @Input() dataType: CalendarDataType = 'date';

  @Input() selectionMode: CalendarSelectionType = 'single';

  @Input() maxDateCount: number;

  @Input() showButtonBar: boolean;

  @Input() todayButtonStyleClass: string = 'ui-button-secondary';

  @Input() nowButtonStyleClass: string = 'ui-button-secondary';

  @Input() clearButtonStyleClass: string = 'ui-button-secondary';

  @Input() saveButtonStyleClass: string = 'ui-button-primary';

  @Input() autoZIndex: boolean = true;

  @Input() baseZIndex: number = 0;

  @Input() panelStyleClass: string;

  @Input() panelStyle: any;

  @Input() keepInvalid: boolean = false;

  @Input() hideOnDateTimeSelect: boolean = false;

  @Input() numberOfMonths: number = 1;

  @Input() view: CalendarViewType = 'date';

  @Input() touchUI: boolean;

  @Input() timeReadOnly: boolean = true;

  @Input() timeInputDebounce: number = 200;

  @Input() showTransitionOptions: string = '225ms ease-out';

  @Input() hideTransitionOptions: string = '195ms ease-in';

  @Output() onFocus: EventEmitter<any> = new EventEmitter();

  @Output() onBlur: EventEmitter<any> = new EventEmitter();

  @Output() onClose: EventEmitter<any> = new EventEmitter();

  @Output() onSelect: EventEmitter<any> = new EventEmitter();

  @Output() onInput: EventEmitter<any> = new EventEmitter();

  @Output() onTodayClick: EventEmitter<any> = new EventEmitter();

  @Output() onNowClick: EventEmitter<any> = new EventEmitter();

  @Output() onClearClick: EventEmitter<any> = new EventEmitter();

  @Output() onSaveClick: EventEmitter<any> = new EventEmitter();

  @Output() onMonthChange: EventEmitter<any> = new EventEmitter();

  @Output() onYearChange: EventEmitter<any> = new EventEmitter();

  @ContentChildren(PrimeTemplate) templates: QueryList<any>;

  _locale: LocaleSettings = {
    firstDayOfWeek: 0,
    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    today: 'Today',
    now: 'Now',
    clear: 'Clear',
    save: 'OK'
  };

  @Input() tabindex: number;

  @ViewChild('inputfield') inputfieldViewChild: ElementRef;
  @ViewChild('inputhours') inputhours: ElementRef;
  @ViewChild('inputminutes', {}) inputminutes: ElementRef;
  @ViewChild('inputseconds') inputseconds: ElementRef;

  private _utc: boolean;

  @Input() get utc(): boolean {
    return this._utc;
  }
  set utc(_utc: boolean) {
    this._utc = _utc;
    console.log("Setting utc has no effect as built-in UTC support is dropped.");
  }

  value: any;

  dates: any[];

  months: any[];

  monthPickerValues: any[];

  weekDays: string[];

  currentMonth: number;

  currentYear: number;

  currentHour: number;

  currentMinute: number;

  currentSecond: number;

  get showCurrentHour(): string {
    let out = "";
    let time = this.currentHour == null ? 0 : Number(this.currentHour);
    time = this.fixHour(time);
    out = time < 10 ? '0' + time : String(time);
    out = out.length > 2 ? out.slice(-2) : out;
    return out;
  };
  get showCurrentMinute(): string {
    let out = "";
    let time = this.currentMinute == null ? 0 : Number(this.currentMinute);
    time = this.fixMinuteOrSecond(time);
    out = time < 10 ? '0' + time : String(time);
    out = out.length > 2 ? out.slice(-2) : out;
    return out;
  };
  get showCurrentSecond(): string {
    let out = "";
    let time = this.currentSecond == null ? 0 : Number(this.currentSecond);
    time = this.fixMinuteOrSecond(time);
    out = time < 10 ? '0' + time : String(time);
    out = out.length > 2 ? out.slice(-2) : out;
    return out;
  };
  // get showCurrentMinute(): string { return this.currentMinute == null ? "" : this.currentMinute < 10 ? '0' + this.currentMinute : String(this.currentMinute); };
  // get showCurrentSecond(): string { return this.currentSecond == null ? "" : this.currentSecond < 10 ? '0' + this.currentSecond : String(this.currentSecond); };

  pm: boolean;

  mask: HTMLDivElement;

  maskClickListener: Function;

  overlay: HTMLDivElement;

  overlayVisible: boolean;

  datepickerClick: boolean;

  onModelChange: Function = () => { };

  onModelTouched: Function = () => { };

  calendarElement: any;

  documentClickListener: any;

  ticksTo1970: number;

  yearOptions: number[];

  focus: boolean;

  isKeydown: boolean;

  filled: boolean;

  inputFieldValue: string = null;

  _minDate: Date;

  _maxDate: Date;

  _showTime: boolean;

  preventDocumentListener: boolean;

  dateTemplate: TemplateRef<any>;

  _disabledDates: Array<Date>;

  _disabledDays: Array<number>;

  selectElement: any;

  todayElement: any;

  focusElement: any;

  @Input('debug') debug = false;

//   inputChangedHours: Subject<number> = new Subject<number>();
//   inputChangedMinutes: Subject<number> = new Subject<number>();
//   inputChangedSeconds: Subject<number> = new Subject<number>();

  inputChangedHours: Subject<any> = new Subject<any>();
  inputChangedMinutes: Subject<any> = new Subject<any>();
  inputChangedSeconds: Subject<any> = new Subject<any>();

  subInputHours: Subscription;
  subInputMinutes: Subscription;
  subInputSeconds: Subscription;

  minHours: number = 0;
  maxHours: number = 23;

  @Input() get minDate(): Date {
    return this._minDate;
  }

  set minDate(date: Date) {
    this._minDate = date;

    if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
      this.createMonths(this.currentMonth, this.currentYear);
    }
  }

  @Input() get maxDate(): Date {
    return this._maxDate;
  }

  set maxDate(date: Date) {
    this._maxDate = date;

    if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
      this.createMonths(this.currentMonth, this.currentYear);
    }
  }

  @Input() get disabledDates(): Date[] {
    return this._disabledDates;
  }

  set disabledDates(disabledDates: Date[]) {
    this._disabledDates = disabledDates;
    if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {

      this.createMonths(this.currentMonth, this.currentYear);
    }
  }

  @Input() get disabledDays(): number[] {
    return this._disabledDays;
  }

  set disabledDays(disabledDays: number[]) {
    this._disabledDays = disabledDays;

    if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
      this.createMonths(this.currentMonth, this.currentYear);
    }
  }

  @Input() get showTime(): boolean {
    return this._showTime;
  }

  set showTime(showTime: boolean) {
    this._showTime = showTime;

    if (this.currentHour == null) {
      let date = this.value || new Date();
      let mo = moment(date);
      if(this.roundMinutesToNearest != null && this.roundMinutesToNearest > 0) {
        let min = mo.minute();
        min = this.roundToNearest(min, this.roundMinutesToNearest);
        mo.minute(min);
        mo.second(0);
      }
      if(!this.showSeconds) {
        mo.second(0);
      }
      this.initTime(mo.toDate());
    }
    this.updateInputfield();
  }

  get locale() {
    return this._locale;
  }

  @Input()
  set locale(newLocale: LocaleSettings) {
    this._locale = newLocale;

    if (this.view === 'date') {
      this.createWeekDays();
      this.createMonths(this.currentMonth, this.currentYear);
    }
    else if (this.view === 'month') {
      this.createMonthPickerValues();
    }
  }

  constructor(
    public el         : ElementRef        ,
    public domHandler : DomHandler        ,
    public renderer   : Renderer2         ,
    public cd         : ChangeDetectorRef ,
    public app        : ApplicationRef    ,
  ) { }

  ngOnInit() {
    let date = this.defaultDate || new Date();
    let mo = moment(date);
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let hour = date.getHours();
    if(!this.showSeconds) {
      second = 0;
    }
    date.setSeconds(second);
    if(this.roundMinutesToNearest != null && this.roundMinutesToNearest > 0) {
      let mo2 = moment(mo).round(this.roundMinutesToNearest, 'min');
      date = mo2.toDate();
      minute = date.getMinutes();
    }
    this.currentMonth = date.getMonth();
    this.currentYear = date.getFullYear();

    const wheelListener = this.onCalendarWheelEvent.bind(this);

    // document.addEventListener('wheel', wheelListener, {passive:false});
    document.addEventListener('wheel', wheelListener, {passive:true});

    if (this.yearNavigator && this.yearRange) {
      const years = this.yearRange.split(':');
      const yearStart = parseInt(years[0]);
      const yearEnd = parseInt(years[1]);

      this.populateYearOptions(yearStart, yearEnd);
    }

    if (this.view === 'date') {
      this.createWeekDays();
      this.initTime(date);
      this.createMonths(this.currentMonth, this.currentYear);
      this.ticksTo1970 = (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000);
    }
    else if (this.view === 'month') {
      this.createMonthPickerValues();
    }
    if (!this.timeReadOnly) {
      this.minHours = 0;
      this.maxHours = 23;
      if(this.hourFormat === '12') {
        this.minHours = 1;
        this.maxHours = 12;
      }
      if(this.stepHour == null || isNaN(this.stepHour)) {
        this.stepHour = 1;
      }
      if(this.stepMinute == null || isNaN(this.stepMinute)) {
        if(this.roundMinutesToNearest != null && this.roundMinutesToNearest > 0) {
          this.stepMinute = this.roundMinutesToNearest;
        } else {
          this.stepMinute = 1;
        }
      }
      if(this.stepSecond == null || isNaN(this.stepSecond)) {
        this.stepSecond = 1;
      }


      this.subInputHours = this.inputChangedHours.debounceTime(this.timeInputDebounce).distinctUntilChanged().subscribe((evt) => {
        // let newHour = Number(evt);
        let curVal = evt.target.value;
        let time = Number(curVal);
        if(this.debug) {
          console.log(`inputChangedHours: Event, input value, and numeric value:\n`, evt, '\n', curVal, '\n', time);
        }
        if(isNaN(time)) {
          time = 0;
          this.currentHour = null;
          if(this.debug) {
            console.log(`inputChangedHours: non-numeric value entered:`, curVal);
          }
          return;
        }
        time = this.fixHour(time);
        if(this.debug) {
            console.log(`inputChangedHours: Fixed value:`, time);
        }
        if(this.validateHour(time)) {
          if(this.hourFormat == '24') {
            this.currentHour = (time >= 24) ? (time - 24) : (time < 0) ? 0 : time;
          } else if(this.hourFormat == '12') {
            // Before the AM/PM break, now after
            this.currentHour = (time >= 13) ? (time - 12) : (time < 0) ? 0 : time;
            if(time >= 12) {
              this.pm = true;
            } else {
              this.pm = false;
            }
          }
          this.updateTime();
        }
        if(this.debug) {
            console.log(`inputChangedHours(): New datetime is:`, this.value);
        }
      });

      this.subInputMinutes = this.inputChangedMinutes.debounceTime(this.timeInputDebounce).distinctUntilChanged().subscribe((evt) => {
        // let newMinute = Number(evt);
        let curVal = evt.target.value;
        let time = Number(curVal);
        let minround = this.roundMinutesToNearest != null && this.roundMinutesToNearest > 0 ? this.roundMinutesToNearest : 0;
        if(this.debug) {
          console.log(`inputChangedMinutes: Event, input value, and numeric value:\n`, evt, '\n', curVal, '\n', time);
        }
        if(isNaN(time)) {
          time = 0;
          this.currentMinute = null;
          if(this.debug) {
            console.log(`inputChangedMinutes: non-numeric value entered:`, curVal);
          }
          return;
        }
        time = this.fixMinuteOrSecond(time);
        if(this.debug) {
          console.log(`inputChangedHours: Fixed value:`, time);
        }
        let min = (time > 59) ? time - 60 : time;
        if(minround > 0) {
          min = this.roundToNearest(min, minround);
        }
        this.currentMinute = min;
        this.updateTime();
        if(this.debug) {
            console.log(`inputChangedMinutes(): New datetime is:`, this.value);
        }
      });

      this.subInputSeconds = this.inputChangedSeconds.debounceTime(this.timeInputDebounce).distinctUntilChanged().subscribe((evt) => {
        let curVal = evt.target.value;
        let time = Number(curVal);
        if(this.debug) {
          console.log(`inputChangedSeconds: Event, input value, and numeric value:\n`, evt, '\n', curVal, '\n', time);
        }
        if(isNaN(time)) {
          time = 0;
          this.currentSecond = null;
          if(this.debug) {
            console.log(`inputChangedSeconds: non-numeric value entered:`, curVal);
          }
          return;
        }
        time = this.fixMinuteOrSecond(time);
        if(this.debug) {
          console.log(`inputChangedHours: Fixed value:`, time);
        }
        this.currentSecond = (time > 59) ? time - 60 : time;
        this.updateTime();
        if(this.debug) {
          console.log(`inputChangedSeconds(): New datetime is:`, this.value);
        }
      });
    }
  }

  fixHour(newHour: number): number {
    let hour = Number(newHour);
    if(isNaN(hour)) {
      hour = 0;
    }
    if(hour < 0) {
      hour = Math.abs(hour);
    }
    if(this.hourFormat == '12') {
      while(hour >= 13) {
        hour -= 12;
      }
    } else {
      while(hour >= 24) {
        hour -= 24;
      }
    }
    return hour;
  }

  fixMinuteOrSecond(newMinuteOrSecond: number): number {
    let val = Number(newMinuteOrSecond);
    if(isNaN(val)) {
      val = 0;
    }
    if(val < 0) {
      val = Math.abs(val);
    }
    while(val >= 60) {
      val -= 60;
    }
    return val;
  }

  roundTime(datetime?:Date|Date[]|string[]):Date|Date[]|string[] {
    let value = datetime ? datetime : this.value ? this.value : this.defaultDate ? this.defaultDate : new Date();
    let values = [value];
    let minutes = this.currentMinute;
    if(minutes != null && this.roundMinutesToNearest !== 0) {
      let min = this.roundToNearest(minutes, this.roundMinutesToNearest);
      this.currentMinute = min;
    }
    let res:any[] = values.map(date => {
      if(date != null) {
        let val = moment(date);
        if(moment.isMoment(val) && moment.isValid(val) && this.roundMinutesToNearest !== 0) {
          val = moment(val).round(this.roundMinutesToNearest, 'min', 'round');
          return val.toDate();
        }
      }
    });
    if(this.isSingleSelection()) {
      this.value = res[0];
    } else if(this.isRangeSelection()) {
      this.value = res;
    } else if(this.isMultipleSelection()) {
      this.value = res;
    }
    this.value = res;
    return res;
  }

  ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'date':
          this.dateTemplate = item.template;
          break;

        default:
          this.dateTemplate = item.template;
          break;
      }
    });
  }

  populateYearOptions(start, end) {
    this.yearOptions = [];

    for (let i = start; i <= end; i++) {
      this.yearOptions.push(i);
    }
  }

  createWeekDays() {
    this.weekDays = [];
    let dayIndex = this.locale.firstDayOfWeek;
    for (let i = 0; i < 7; i++) {
      this.weekDays.push(this.locale.dayNamesMin[dayIndex]);
      dayIndex = (dayIndex == 6) ? 0 : ++dayIndex;
    }
  }

  createMonthPickerValues() {
    this.monthPickerValues = [];
    for (let i = 0; i <= 11; i++) {
      this.monthPickerValues.push(this.locale.monthNamesShort[i]);
    }
  }

  createMonths(month: number, year: number) {
    this.months = this.months = [];
    for (let i = 0; i < this.numberOfMonths; i++) {
      let m = month + i;
      let y = year;
      if (m > 11) {
        m = m % 11 - 1;
        y = year + 1;
      }

      this.months.push(this.createMonth(m, y));
    }
  }

  createMonth(month: number, year: number) {
    let dates = [];
    let firstDay = this.getFirstDayOfMonthIndex(month, year);
    let daysLength = this.getDaysCountInMonth(month, year);
    let prevMonthDaysLength = this.getDaysCountInPrevMonth(month, year);
    let sundayIndex = this.getSundayIndex();
    let dayNo = 1;
    let today = new Date();

    for (let i = 0; i < 6; i++) {
      let week = [];

      if (i == 0) {
        for (let j = (prevMonthDaysLength - firstDay + 1); j <= prevMonthDaysLength; j++) {
          let prev = this.getPreviousMonthAndYear(month, year);
          week.push({
            day: j, month: prev.month, year: prev.year, otherMonth: true,
            today: this.isToday(today, j, prev.month, prev.year), selectable: this.isSelectable(j, prev.month, prev.year, true)
          });
        }

        let remainingDaysLength = 7 - week.length;
        for (let j = 0; j < remainingDaysLength; j++) {
          week.push({
            day: dayNo, month: month, year: year, today: this.isToday(today, dayNo, month, year),
            selectable: this.isSelectable(dayNo, month, year, false)
          });
          dayNo++;
        }
      }
      else {
        for (let j = 0; j < 7; j++) {
          if (dayNo > daysLength) {
            let next = this.getNextMonthAndYear(month, year);
            week.push({
              day: dayNo - daysLength, month: next.month, year: next.year, otherMonth: true,
              today: this.isToday(today, dayNo - daysLength, next.month, next.year),
              selectable: this.isSelectable((dayNo - daysLength), next.month, next.year, true)
            });
          }
          else {
            week.push({
              day: dayNo, month: month, year: year, today: this.isToday(today, dayNo, month, year),
              selectable: this.isSelectable(dayNo, month, year, false)
            });
          }

          dayNo++;
        }
      }

      dates.push(week);
    }

    return {
      month: month,
      year: year,
      dates: dates
    };
  }

  initTime(date: Date) {
    this.pm = date.getHours() > 11;
    let minround = this.roundMinutesToNearest != null && this.roundMinutesToNearest > 0 ? this.roundMinutesToNearest : 0;
    if(this.debug) {
      console.log(`initTime(): called with datetime:`, date);
      console.log(`initTime(): minute rounding set to:`, minround);
    }

    if (this.showTime) {
      let minute = date.getMinutes();
      let second = date.getSeconds();
      if(!this.showSeconds) {
        second = 0;
      }
      if(minround > 0) {
        minute = this.roundToNearest(minute, this.roundMinutesToNearest);
        second = 0;
      }

      this.currentMinute = minute;
      this.currentSecond = second;

      if (this.hourFormat == '12') {
          this.currentHour = date.getHours() == 0 ? 12 : date.getHours() % 12;
      } else {
        this.currentHour = date.getHours();
      }
    } else if (this.timeOnly) {
      this.currentMinute = 0;
      this.currentHour = 0;
      this.currentSecond = 0;
    }
    if(this.debug) {
      console.log(`initTime(): Time initialized to: ${this.showCurrentHour}:${this.showCurrentMinute}:${this.showCurrentSecond}`);
    }
  }

  navBackward(event) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }

    if (this.view === 'month') {
      this.decrementYear();
    }
    else {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.decrementYear();
      }
      else {
        this.currentMonth--;
      }

      this.onMonthChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
      this.createMonths(this.currentMonth, this.currentYear);
    }

    event.preventDefault();
  }

  navForward(event) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }

    if (this.view === 'month') {
      this.incrementYear();
    }
    else {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.incrementYear();
      }
      else {
        this.currentMonth++;
      }

      this.onMonthChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
      this.createMonths(this.currentMonth, this.currentYear);
    }

    event.preventDefault();
  }

  decrementYear() {
    this.currentYear--;

    if (this.yearNavigator && this.currentYear < this.yearOptions[0]) {
      let difference = this.yearOptions[this.yearOptions.length - 1] - this.yearOptions[0];
      this.populateYearOptions(this.yearOptions[0] - difference, this.yearOptions[this.yearOptions.length - 1] - difference);
    }
  }

  incrementYear() {
    this.currentYear++;

    if (this.yearNavigator && this.currentYear > this.yearOptions[this.yearOptions.length - 1]) {
      let difference = this.yearOptions[this.yearOptions.length - 1] - this.yearOptions[0];
      this.populateYearOptions(this.yearOptions[0] + difference, this.yearOptions[this.yearOptions.length - 1] + difference);
    }
  }

  onDateSelect(event, dateMeta) {
    if (this.disabled || !dateMeta.selectable) {
      event.preventDefault();
      return;
    }

    if (this.isMultipleSelection() && this.isSelected(dateMeta)) {
      this.value = this.value.filter((date, i) => {
        return !this.isDateEquals(date, dateMeta);
      });
      this.updateModel(this.value);
    }
    else {
      if (this.shouldSelectDate(dateMeta)) {
        if (dateMeta.otherMonth) {
          this.currentMonth = dateMeta.month;
          this.currentYear = dateMeta.year;
          this.createMonths(this.currentMonth, this.currentYear);
          this.selectDate(dateMeta);
        }
        else {
          this.selectDate(dateMeta);
        }
      }
    }

    if (this.isSingleSelection() && (!this.showTime || this.hideOnDateTimeSelect)) {
      setTimeout(() => {
        event.preventDefault();
        this.overlayVisible = false;

        if (this.mask) {
          this.disableModality();
        }

        this.cd.markForCheck();
      }, 150);
    }

    this.updateInputfield();
    event.preventDefault();
  }

  shouldSelectDate(dateMeta) {
    if (this.isMultipleSelection()) {
      return !this.maxDateCount ||  !this.value || this.maxDateCount > this.value.length;
    } else {
      return true;
    }
  }

  onMonthSelect(event, index) {
    this.onDateSelect(event, { year: this.currentYear, month: index, day: 1, selectable: true });
  }

  updateInputfield() {
    let formattedValue = '';

    if (this.value) {
      if (this.isSingleSelection()) {
        formattedValue = this.formatDateTime(this.value);
      } else if (this.isMultipleSelection()) {
        for (let i = 0; i < this.value.length; i++) {
          let dateAsString = this.formatDateTime(this.value[i]);
          formattedValue += dateAsString;
          if (i !== (this.value.length - 1)) {
            formattedValue += ', ';
          }
        }
      } else if (this.isRangeSelection()) {
        if (this.value && this.value.length) {
          let startDate = this.value[0];
          let endDate = this.value[1];

          formattedValue = this.formatDateTime(startDate);
          if (endDate) {
            formattedValue += ' - ' + this.formatDateTime(endDate);
          }
        }
      }
    }

    this.inputFieldValue = formattedValue;
    this.updateFilledState();
    if (this.inputfieldViewChild && this.inputfieldViewChild.nativeElement) {
      this.inputfieldViewChild.nativeElement.value = this.inputFieldValue;
    }
  }

  formatDateTime(date) {
    let formattedValue = null;
    if (date) {
      if (this.timeOnly) {
        formattedValue = this.formatTime(date);
      }
      else {
        formattedValue = this.formatDate(date, this.dateFormat);
        if (this.showTime) {
          formattedValue += ' ' + this.formatTime(date);
        }
      }
    }

    return formattedValue;
  }

  selectDate(dateMeta) {
    let date = new Date(dateMeta.year, dateMeta.month, dateMeta.day);

    if (this.showTime) {
      if (this.hourFormat === '12' && this.pm && this.currentHour != 12) {
        date.setHours(this.currentHour + 12);
      } else {
        date.setHours(this.currentHour);
      }

      date.setMinutes(this.currentMinute);
      date.setSeconds(this.currentSecond);
    }

    if (this.minDate && this.minDate > date) {
      date = this.minDate;
      this.currentHour = date.getHours();
      this.currentMinute = date.getMinutes();
      this.currentSecond = date.getSeconds();
      if(!this.showSeconds) {
        this.currentSecond = 0;
      }
    }

    if (this.maxDate && this.maxDate < date) {
      date = this.maxDate;
      this.currentHour = date.getHours();
      this.currentMinute = date.getMinutes();
      this.currentSecond = date.getSeconds();
      if(!this.showSeconds) {
        this.currentSecond = 0;
      }

    }

    if (this.isSingleSelection()) {
      this.updateModel(date);
    }
    else if (this.isMultipleSelection()) {
      this.updateModel(this.value ? [...this.value, date] : [date]);
    }
    else if (this.isRangeSelection()) {
      if (this.value && this.value.length) {
        let startDate = this.value[0];
        let endDate = this.value[1];

        if (!endDate && date.getTime() >= startDate.getTime()) {
          endDate = date;
        }
        else {
          startDate = date;
          endDate = null;
        }

        this.updateModel([startDate, endDate]);
      }
      else {
        this.updateModel([date, null]);
      }
    }
    if(this.debug) {
      console.log(`selectDate(): Current value is:`, this.value);
    }
    this.onSelect.emit(date);
  }

  updateModel(value:Date|[Date,Date]|Date[]) {
    this.value = value;

    if (this.dataType == 'date') {
      this.onModelChange(this.value);
    } else if (this.dataType == 'string') {
      if (this.isSingleSelection()) {
        this.onModelChange(this.formatDateTime(this.value));
      } else {
        let stringArrValue = null;
        if (this.value) {
          stringArrValue = this.value.map(date => this.formatDateTime(date));
        }
        this.onModelChange(stringArrValue);
      }
    }
  }

  getFirstDayOfMonthIndex(month: number, year: number) {
    let day = new Date();
    day.setDate(1);
    day.setMonth(month);
    day.setFullYear(year);

    let dayIndex = day.getDay() + this.getSundayIndex();
    return dayIndex >= 7 ? dayIndex - 7 : dayIndex;
  }

  getDaysCountInMonth(month: number, year: number) {
    return 32 - this.daylightSavingAdjust(new Date(year, month, 32)).getDate();
  }

  getDaysCountInPrevMonth(month: number, year: number) {
    let prev = this.getPreviousMonthAndYear(month, year);
    return this.getDaysCountInMonth(prev.month, prev.year);
  }

  getPreviousMonthAndYear(month: number, year: number) {
    let m, y;

    if (month === 0) {
      m = 11;
      y = year - 1;
    }
    else {
      m = month - 1;
      y = year;
    }

    return { 'month': m, 'year': y };
  }

  getNextMonthAndYear(month: number, year: number) {
    let m, y;

    if (month === 11) {
      m = 0;
      y = year + 1;
    }
    else {
      m = month + 1;
      y = year;
    }

    return { 'month': m, 'year': y };
  }

  getSundayIndex() {
    return this.locale.firstDayOfWeek > 0 ? 7 - this.locale.firstDayOfWeek : 0;
  }

  isSelected(dateMeta): boolean {
    if (this.value) {
      if (this.isSingleSelection()) {
        return this.isDateEquals(this.value, dateMeta);
      }
      else if (this.isMultipleSelection()) {
        let selected = false;
        for (let date of this.value) {
          selected = this.isDateEquals(date, dateMeta);
          if (selected) {
            break;
          }
        }

        return selected;
      }
      else if (this.isRangeSelection()) {
        if (this.value[1]) {
          return this.isDateEquals(this.value[0], dateMeta) || this.isDateEquals(this.value[1], dateMeta) || this.isDateBetween(this.value[0], this.value[1], dateMeta);
        } else {
          return this.isDateEquals(this.value[0], dateMeta);
        }
      }
    } else {
      return false;
    }
  }

  isMonthSelected(month: number): boolean {
    return this.value ? (this.value.getMonth() === month && this.value.getFullYear() === this.currentYear) : false;
  }

  isDateEquals(value, dateMeta) {
    if (value) {
      return value.getDate() === dateMeta.day && value.getMonth() === dateMeta.month && value.getFullYear() === dateMeta.year;
    } else {
      return false;
    }
  }

  isDateBetween(start, end, dateMeta) {
    let between: boolean = false;
    if (start && end) {
      let date: Date = new Date(dateMeta.year, dateMeta.month, dateMeta.day);
      return start.getTime() <= date.getTime() && end.getTime() >= date.getTime();
    }

    return between;
  }

  isSingleSelection(): boolean {
    return this.selectionMode === 'single';
  }

  isRangeSelection(): boolean {
    return this.selectionMode === 'range';
  }

  isMultipleSelection(): boolean {
    return this.selectionMode === 'multiple';
  }

  isToday(today, day, month, year): boolean {
    return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
  }

  isSelectable(day, month, year, otherMonth): boolean {
    let validMin = true;
    let validMax = true;
    let validDate = true;
    let validDay = true;

    if (otherMonth && !this.selectOtherMonths) {
      return false;
    }

    if (this.minDate) {
      if (this.minDate.getFullYear() > year) {
        validMin = false;
      }
      else if (this.minDate.getFullYear() === year) {
        if (this.minDate.getMonth() > month) {
          validMin = false;
        }
        else if (this.minDate.getMonth() === month) {
          if (this.minDate.getDate() > day) {
            validMin = false;
          }
        }
      }
    }

    if (this.maxDate) {
      if (this.maxDate.getFullYear() < year) {
        validMax = false;
      }
      else if (this.maxDate.getFullYear() === year) {
        if (this.maxDate.getMonth() < month) {
          validMax = false;
        }
        else if (this.maxDate.getMonth() === month) {
          if (this.maxDate.getDate() < day) {
            validMax = false;
          }
        }
      }
    }

    if (this.disabledDates) {
      validDate = !this.isDateDisabled(day, month, year);
    }

    if (this.disabledDays) {
      validDay = !this.isDayDisabled(day, month, year);
    }

    return validMin && validMax && validDate && validDay;
  }

  isDateDisabled(day: number, month: number, year: number): boolean {
    if (this.disabledDates) {
      for (let disabledDate of this.disabledDates) {
        if (disabledDate.getFullYear() === year && disabledDate.getMonth() === month && disabledDate.getDate() === day) {
          return true;
        }
      }
    }

    return false;
  }

  isDayDisabled(day: number, month: number, year: number): boolean {
    if (this.disabledDays) {
      let weekday = new Date(year, month, day);
      let weekdayNumber = weekday.getDay();
      return this.disabledDays.indexOf(weekdayNumber) !== -1;
    }
    return false;
  }

  onInputFocus(event: Event) {
    this.focus = true;
    if (this.showOnFocus) {

      this.showOverlay();
    }
    this.onFocus.emit(event);
  }

  onInputClick(event: Event) {
    this.datepickerClick = true;
    if (this.overlay && this.autoZIndex) {
      this.overlay.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
    }
  }

  onInputBlur(event: Event) {
    this.focus = false;
    this.onBlur.emit(event);
    if (!this.keepInvalid) {
      this.updateInputfield();
    }
    this.onModelTouched();
  }

  onButtonClick(event, inputfield) {
    if (!this.overlayVisible) {
      inputfield.focus();
      this.showOverlay();
    }
    else {
      this.overlayVisible = false;
    }

    this.datepickerClick = true;
  }

  onInputKeydown(event) {
    this.isKeydown = true;
    if (event.keyCode === 9) {
      this.overlayVisible = false;
    }
  }

  onMonthDropdownChange(m: string) {
    this.currentMonth = parseInt(m);
    this.onMonthChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
    this.createMonths(this.currentMonth, this.currentYear);
  }

  onYearDropdownChange(y: string) {
    this.currentYear = parseInt(y);
    this.onYearChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
    this.createMonths(this.currentMonth, this.currentYear);
  }

  // fixInputHour(value:string):string {
  //   let time = Number(value);
  //   let strTime = String(value);
  //   if(!isNaN(time)) {
  //     time = this.fixHour(time);
  //     strTime = time < 10 ? '0' + time : time > this.maxHours ? strTime.slice(-2) : strTime;
  //   }
  //   return PLORP;
  // }

  incrementHour(event, noPreventDefault?:boolean) {
    let pd = typeof noPreventDefault === 'boolean' ? !noPreventDefault : true;
    const prevHour = this.currentHour;
    const newHour = this.currentHour + this.stepHour;

    if (this.validateHour(newHour)) {
      if (this.hourFormat == '24') {
        this.currentHour = (newHour >= 24) ? (newHour - 24) : newHour;
      } else if (this.hourFormat == '12') {
        // Before the AM/PM break, now after
        if (prevHour < 12 && newHour > 11) {
          this.pm = !this.pm;
        }

        this.currentHour = (newHour >= 13) ? (newHour - 12) : newHour;
      }

      this.updateTime();
    }

    if(pd === true) {
      event.preventDefault();
    }
  }

  decrementHour(event, noPreventDefault?:boolean) {
    let pd = typeof noPreventDefault === 'boolean' ? !noPreventDefault : true;
    const newHour = this.currentHour - this.stepHour;

    if (this.validateHour(newHour)) {
      if (this.hourFormat == '24') {
        this.currentHour = (newHour < 0) ? (24 + newHour) : newHour;
      } else if (this.hourFormat == '12') {
        // If we were at noon/midnight, then switch
        if (this.currentHour === 12) {
          this.pm = !this.pm;
        }
        this.currentHour = (newHour <= 0) ? (12 + newHour) : newHour;
      }

      this.updateTime();
    }

    if(pd === true) {
      event.preventDefault();
    }
  }

  validateHour(hour): boolean {
    let valid: boolean = true;
    let value = this.value;
    if (this.isRangeSelection()) {
      value = Array.isArray(this.value) && this.value.length === 2 ? this.value[1] || this.value[0] : null;
    }
    if (this.isMultipleSelection()) {
      value = this.value[this.value.length - 1];
    }
    let valueDateString = value ? value.toDateString() : null;

    if (this.minDate && valueDateString && this.minDate.toDateString() === valueDateString) {
      if (this.minDate.getHours() > hour) {
        valid = false;
      }
    }

    if (this.maxDate && valueDateString && this.maxDate.toDateString() === valueDateString) {
      if (this.maxDate.getHours() < hour) {
        valid = false;
      }
    }

    return valid;
  }

  incrementMinute(event, noPreventDefault?:boolean) {
    let pd = typeof noPreventDefault === 'boolean' ? !noPreventDefault : true;
    let newMinute = this.currentMinute + this.stepMinute;
    if (this.validateMinute(newMinute)) {
      this.currentMinute = (newMinute > 59) ? newMinute - 60 : newMinute;
      this.updateTime();
    }

    if(pd === true) {
      event.preventDefault();
    }
  }

  decrementMinute(event, noPreventDefault?:boolean) {
    let pd = typeof noPreventDefault === 'boolean' ? !noPreventDefault : true;
    let newMinute = this.currentMinute - this.stepMinute;
    if (this.validateMinute(newMinute)) {
      this.currentMinute = (newMinute < 0) ? 60 + newMinute : newMinute;
      this.updateTime();
    }

    if(pd === true) {
      event.preventDefault();
    }
  }

  validateMinute(minute): boolean {
    let valid: boolean = true;
    let value = this.value;
    if (this.isRangeSelection()) {
      value = Array.isArray(this.value) && this.value.length === 2 ? this.value[1] || this.value[0] : null;
    }
    if (this.isMultipleSelection()) {
      value = this.value[this.value.length - 1];
    }
    let valueDateString = value ? value.toDateString() : null;
    if (this.minDate && valueDateString && this.minDate.toDateString() === valueDateString) {
      if (value.getHours() == this.minDate.getHours()) {
        if (this.minDate.getMinutes() > minute) {
          valid = false;
        }
      }
    }

    if (this.maxDate && valueDateString && this.maxDate.toDateString() === valueDateString) {
      if (value.getHours() == this.maxDate.getHours()) {
        if (this.maxDate.getMinutes() < minute) {
          valid = false;
        }
      }
    }

    return valid;
  }

  incrementSecond(event, noPreventDefault?:boolean) {
    let pd = typeof noPreventDefault === 'boolean' ? !noPreventDefault : true;
    let newSecond = this.currentSecond + this.stepSecond;
    if (this.validateSecond(newSecond)) {
      this.currentSecond = (newSecond > 59) ? newSecond - 60 : newSecond;
      this.updateTime();
    }

    if(pd === true) {
      event.preventDefault();
    }
  }

  decrementSecond(event, noPreventDefault?:boolean) {
    let pd = typeof noPreventDefault === 'boolean' ? !noPreventDefault : true;
    let newSecond = this.currentSecond - this.stepSecond;
    if (this.validateSecond(newSecond)) {
      this.currentSecond = (newSecond < 0) ? 60 + newSecond : newSecond;
      this.updateTime();
    }

    if(pd === true) {
      event.preventDefault();
    }
  }

  validateSecond(second): boolean {
    let valid: boolean = true;
    let value = this.value;
    if (this.isRangeSelection()) {
      value = Array.isArray(this.value) && this.value.length === 2 ? this.value[1] || this.value[0] : null;
    }
    if (this.isMultipleSelection()) {
      value = this.value[this.value.length - 1];
    }
    let valueDateString = value ? value.toDateString() : null;

    if (this.minDate && valueDateString && this.minDate.toDateString() === valueDateString) {
      if (this.minDate.getSeconds() > second) {
        valid = false;
      }
    }

    if (this.maxDate && valueDateString && this.maxDate.toDateString() === valueDateString) {
      if (this.maxDate.getSeconds() < second) {
        valid = false;
      }
    }

    return valid;
  }

  updateTime() {
    let value = this.value;
    if (this.isRangeSelection()) {
      value = Array.isArray(this.value) && this.value.length === 2 ? this.value[1] || this.value[0] : null;
    }
    if (this.isMultipleSelection()) {
      value = this.value[this.value.length - 1];
    }
    value = value ? new Date(value.getTime()) : new Date();

    if (this.hourFormat == '12') {
      if (this.currentHour === 12) {
        value.setHours(this.pm ? 12 : 0);
      } else {
          value.setHours(this.pm ? this.currentHour + 12 : this.currentHour);
      }
    } else {
      value.setHours(this.currentHour);
    }

    value.setMinutes(this.currentMinute);
    let second = this.currentSecond;
    if(!this.showSeconds) {
      second = 0;
    }
    value.setSeconds(second);
    if(this.isRangeSelection()) {
      if (Array.isArray(this.value) && this.value.length === 2 && this.value[1]) {
        value = [this.value[0], value];
      } else {
        value = [value, null];
      }
    }

    if (this.isMultipleSelection()) {
      value = [...this.value.slice(0, -1), value];
    }

    this.updateModel(value);
    this.onSelect.emit(value);
    this.updateInputfield();
    if(this.debug) {
      console.log(`updateTime(): Current value is:`, this.value);
    }
  }

  toggleAMPM(event) {
    this.pm = !this.pm;
    this.updateTime();
    event.preventDefault();
  }

  onUserInput(event) {
    // IE 11 Workaround for input placeholder : https://github.com/primefaces/primeng/issues/2026
    if (!this.isKeydown) {
      return;
    }
    this.isKeydown = false;

    let val = event.target.value;
    try {
      let value = this.parseValueFromString(val);
      if (this.isSelectable(value.getDate(), value.getMonth(), value.getFullYear(), false)) {
        this.updateModel(value);
        this.updateUI();
      }
    }
    catch (err) {
      //invalid date
      this.updateModel(null);
    }

    this.filled = val != null && val.length;
    this.onInput.emit(event);
  }

  onUserHoursInput(evt) {

  }

  parseValueFromString(text: string): Date {
    if (!text || text.trim().length === 0) {
      return null;
    }

    let value: any;

    if (this.isSingleSelection()) {
      value = this.parseDateTime(text);
    }
    else if (this.isMultipleSelection()) {
      let tokens = text.split(',');
      value = [];
      for (let token of tokens) {
        value.push(this.parseDateTime(token.trim()));
      }
    }
    else if (this.isRangeSelection()) {
      let tokens = text.split(' - ');
      value = [];
      for (let i = 0; i < tokens.length; i++) {
        value[i] = this.parseDateTime(tokens[i].trim());
      }
    }

    return value;
  }

  parseDateTime(text): Date {
    let date: Date;
    let parts: string[] = text.split(' ');

    if (this.timeOnly) {
      date = new Date();
      this.populateTime(date, parts[0], parts[1]);
    }
    else {
      if (this.showTime) {
        date = this.parseDate(parts[0], this.dateFormat);
        this.populateTime(date, parts[1], parts[2]);
      }
      else {
        date = this.parseDate(text, this.dateFormat);
      }
    }

    return date;
  }

  populateTime(value, timeString, ampm) {
    if (this.hourFormat == '12' && !ampm) {
      throw new Error('Invalid Time');
    }

    this.pm = (ampm === 'PM' || ampm === 'pm');
    let time = this.parseTime(timeString);
    value.setHours(time.hour);
    value.setMinutes(time.minute);
    value.setSeconds(time.second);
  }

  updateUI() {
    let val = this.value || this.defaultDate || new Date();
    if (Array.isArray(val)) {
      val = val[0];
    }

    this.currentMonth = val.getMonth();
    this.currentYear = val.getFullYear();
    this.createMonths(this.currentMonth, this.currentYear);

    if (this.showTime || this.timeOnly) {
      let hours = val.getHours();
      let mins = val.getMinutes();
      let secs = val.getSeconds();
      let minround = this.roundMinutesToNearest != null && this.roundMinutesToNearest > 0 ? this.roundMinutesToNearest : 0;
      if(minround > 0) {
        secs = 0;
        mins = this.roundToNearest(mins, minround);
      }
      if(!this.showSeconds) {
        secs = 0;
      }

      if (this.hourFormat == '12') {
        this.pm = hours > 11;

        if (hours >= 12) {
          this.currentHour = (hours == 12) ? 12 : hours - 12;
        } else {
          this.currentHour = (hours == 0) ? 12 : hours;
        }
      } else {
        this.currentHour = val.getHours();
      }

      this.currentMinute = mins;
      this.currentSecond = secs;
    }
  }

  onDatePickerClick(event) {
    this.datepickerClick = true;
  }

  showOverlay() {
    this.overlayVisible = true;
  }

  onShowCalendar = this.onOverlayAnimationStart;

  onOverlayAnimationStart(event: AnimationEvent) {
    let minround = this.roundMinutesToNearest ? this.roundMinutesToNearest : 0;
    switch (event.toState) {
      case 'visible':
      case 'visibleTouchUI':
        if(!this.defaultDate) {
          let defDate = moment();
          if(minround) {
            defDate = moment(defDate).round(minround, 'min');
          }
          this.defaultDate = defDate.toDate();
        }
        if (!this.inline) {
          this.overlay = event.element;
          this.appendOverlay();
          if (this.autoZIndex) {
            this.overlay.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
          }
          this.alignOverlay();
          this.bindDocumentClickListener();
        }
        break;

      case 'void':
        this.onOverlayHide();
        break;
    }
  }

  appendOverlay() {
    if (this.appendTo) {
      if (this.appendTo === 'body') {
          document.body.appendChild(this.overlay);
      } else {
          this.domHandler.appendChild(this.overlay, this.appendTo);
      }
    }
  }

  restoreOverlayAppend() {
    if (this.overlay && this.appendTo) {
      this.el.nativeElement.appendChild(this.overlay);
    }
  }

  alignOverlay() {
    if (this.touchUI) {
      this.enableModality(this.overlay);
    } else {
      if (this.appendTo) {
        this.domHandler.absolutePosition(this.overlay, this.inputfieldViewChild.nativeElement);
      } else {
        this.domHandler.relativePosition(this.overlay, this.inputfieldViewChild.nativeElement);
      }
    }
  }

  enableModality(element) {
    if (!this.mask) {
      this.mask = document.createElement('div');
      this.mask.style.zIndex = String(parseInt(element.style.zIndex) - 1);
      let maskStyleClass = 'ui-widget-overlay ui-datepicker-mask ui-datepicker-mask-scrollblocker';
      this.domHandler.addMultipleClasses(this.mask, maskStyleClass);

      this.maskClickListener = this.renderer.listen(this.mask, 'click', (event: any) => {
        this.disableModality();
      });
      document.body.appendChild(this.mask);
      this.domHandler.addClass(document.body, 'ui-overflow-hidden');
    }
  }

  disableModality() {
    if (this.mask) {
      document.body.removeChild(this.mask);
      let bodyChildren = document.body.children;
      let hasBlockerMasks: boolean;
      for (let i = 0; i < bodyChildren.length; i++) {
        let bodyChild = bodyChildren[i];
        if (this.domHandler.hasClass(bodyChild, 'ui-datepicker-mask-scrollblocker')) {
          hasBlockerMasks = true;
          break;
        }
      }

      if (!hasBlockerMasks) {
        this.domHandler.removeClass(document.body, 'ui-overflow-hidden');
      }

      this.overlayVisible = false;
      this.unbindMaskClickListener();

      this.mask = null;
    }
  }

  unbindMaskClickListener() {
    if (this.maskClickListener) {
      this.maskClickListener();
      this.maskClickListener = null;
    }
  }

  writeValue(value: any): void {
    this.value = value;
    if (this.value && typeof this.value === 'string') {
      this.value = this.parseValueFromString(this.value);
    }

    this.updateInputfield();
    this.updateUI();
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  setDisabledState(val: boolean): void {
    this.disabled = val;
  }

  // Ported from jquery-ui datepicker formatDate
  formatDate(date, format) {
    if (!date) {
      return '';
    }

    let iFormat;
    const lookAhead = (match) => {
      const matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
      if (matches) {
        iFormat++;
      }
      return matches;
    },
      formatNumber = (match, value, len) => {
        let num = '' + value;
        if (lookAhead(match)) {
          while (num.length < len) {
            num = '0' + num;
          }
        }
        return num;
      },
      formatName = (match, value, shortNames, longNames) => {
        return (lookAhead(match) ? longNames[value] : shortNames[value]);
      };
    let output = '';
    let literal = false;

    if (date) {
      for (iFormat = 0; iFormat < format.length; iFormat++) {
        if (literal) {
          if (format.charAt(iFormat) === '\'' && !lookAhead('\'')) {
            literal = false;
          } else {
            output += format.charAt(iFormat);
          }
        } else {
          switch (format.charAt(iFormat)) {
            case 'd':
              output += formatNumber('d', date.getDate(), 2);
              break;
            case 'D':
              output += formatName('D', date.getDay(), this.locale.dayNamesShort, this.locale.dayNames);
              break;
            case 'o':
              output += formatNumber('o',
                Math.round((
                  new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() -
                  new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
              break;
            case 'm':
              output += formatNumber('m', date.getMonth() + 1, 2);
              break;
            case 'M':
              output += formatName('M', date.getMonth(), this.locale.monthNamesShort, this.locale.monthNames);
              break;
            case 'y':
              output += lookAhead('y') ? date.getFullYear() : (date.getFullYear() % 100 < 10 ? '0' : '') + (date.getFullYear() % 100);
              break;
            case '@':
              output += date.getTime();
              break;
            case '!':
              output += date.getTime() * 10000 + this.ticksTo1970;
              break;
            case '\'':
              if (lookAhead('\'')) {
                output += '\'';
              } else {
                literal = true;
              }
              break;
            default:
              output += format.charAt(iFormat);
          }
        }
      }
    }
    return output;
  }

  formatTime(date) {
    if (!date) {
      return '';
    }

    let output = '';
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    if (this.hourFormat == '12' && hours > 11 && hours != 12) {
      hours -= 12;
    }

    if (this.hourFormat == '12') {
      output += hours === 0 ? 12 : (hours < 10) ? '0' + hours : hours;
    } else {
      output += (hours < 10) ? '0' + hours : hours;
    }
    output += ':';
    output += (minutes < 10) ? '0' + minutes : minutes;

    if (this.showSeconds) {
      output += ':';
      output += (seconds < 10) ? '0' + seconds : seconds;
    }

    if (this.hourFormat == '12') {
      output += date.getHours() > 11 ? ' PM' : ' AM';
    }

    return output;
  }

  parseTime(value) {
    let tokens: string[] = value.split(':');
    let validTokenLength = this.showSeconds ? 3 : 2;

    if (tokens.length !== validTokenLength) {
      throw new Error("Invalid time");
    }

    let h = parseInt(tokens[0]);
    let m = parseInt(tokens[1]);
    let s = this.showSeconds ? parseInt(tokens[2]) : null;

    if (isNaN(h) || isNaN(m) || h > 23 || m > 59 || (this.hourFormat == '12' && h > 12) || (this.showSeconds && (isNaN(s) || s > 59))) {
      throw new Error("Invalid time");
    }
    else {
      if (this.hourFormat == '12' && h !== 12 && this.pm) {
        h += 12;
      }

      return { hour: h, minute: m, second: s };
    }
  }

  // Ported from jquery-ui datepicker parseDate
  parseDate(value, format) {
    if (format == null || value == null) {
      throw new Error("Invalid arguments");
    }

    value = (typeof value === "object" ? value.toString() : value + "");
    if (value === "") {
      return null;
    }

    let iFormat, dim, extra,
      iValue = 0,
      shortYearCutoff = (typeof this.shortYearCutoff !== "string" ? this.shortYearCutoff : new Date().getFullYear() % 100 + parseInt(this.shortYearCutoff, 10)),
      year = -1,
      month = -1,
      day = -1,
      doy = -1,
      literal = false,
      date,
      lookAhead = (match) => {
        let matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
        if (matches) {
          iFormat++;
        }
        return matches;
      },
      getNumber = (match) => {
        let isDoubled = lookAhead(match),
          size = (match === "@" ? 14 : (match === "!" ? 20 :
            (match === "y" && isDoubled ? 4 : (match === "o" ? 3 : 2)))),
          minSize = (match === "y" ? size : 1),
          digits = new RegExp("^\\d{" + minSize + "," + size + "}"),
          num = value.substring(iValue).match(digits);
        if (!num) {
          throw new Error("Missing number at position " + iValue);
        }
        iValue += num[0].length;
        return parseInt(num[0], 10);
      },
      getName = (match, shortNames, longNames) => {
        let index = -1;
        let arr = lookAhead(match) ? longNames : shortNames;
        let names = [];

        for (let i = 0; i < arr.length; i++) {
          names.push([i, arr[i]]);
        }
        names.sort((a, b) => {
          return -(a[1].length - b[1].length);
        });

        for (let i = 0; i < names.length; i++) {
          let name = names[i][1];
          if (value.substr(iValue, name.length).toLowerCase() === name.toLowerCase()) {
            index = names[i][0];
            iValue += name.length;
            break;
          }
        }

        if (index !== -1) {
          return index + 1;
        } else {
          throw new Error("Unknown name at position " + iValue);
        }
      },
      checkLiteral = () => {
        if (value.charAt(iValue) !== format.charAt(iFormat)) {
          throw new Error("Unexpected literal at position " + iValue);
        }
        iValue++;
      };

    if (this.view === 'month') {
      day = 1;
    }

    for (iFormat = 0; iFormat < format.length; iFormat++) {
      if (literal) {
        if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
          literal = false;
        } else {
          checkLiteral();
        }
      } else {
        switch (format.charAt(iFormat)) {
          case "d":
            day = getNumber("d");
            break;
          case "D":
            getName("D", this.locale.dayNamesShort, this.locale.dayNames);
            break;
          case "o":
            doy = getNumber("o");
            break;
          case "m":
            month = getNumber("m");
            break;
          case "M":
            month = getName("M", this.locale.monthNamesShort, this.locale.monthNames);
            break;
          case "y":
            year = getNumber("y");
            break;
          case "@":
            date = new Date(getNumber("@"));
            year = date.getFullYear();
            month = date.getMonth() + 1;
            day = date.getDate();
            break;
          case "!":
            date = new Date((getNumber("!") - this.ticksTo1970) / 10000);
            year = date.getFullYear();
            month = date.getMonth() + 1;
            day = date.getDate();
            break;
          case "'":
            if (lookAhead("'")) {
              checkLiteral();
            } else {
              literal = true;
            }
            break;
          default:
            checkLiteral();
        }
      }
    }

    if (iValue < value.length) {
      extra = value.substr(iValue);
      if (!/^\s+/.test(extra)) {
        throw new Error("Extra/unparsed characters found in date: " + extra);
      }
    }

    if (year === -1) {
      year = new Date().getFullYear();
    } else if (year < 100) {
      year += new Date().getFullYear() - new Date().getFullYear() % 100 +
        (year <= shortYearCutoff ? 0 : -100);
    }

    if (doy > -1) {
      month = 1;
      day = doy;
      do {
        dim = this.getDaysCountInMonth(year, month - 1);
        if (day <= dim) {
          break;
        }
        month++;
        day -= dim;
      } while (true);
    }

    date = this.daylightSavingAdjust(new Date(year, month - 1, day));
    if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
      throw new Error("Invalid date"); // E.g. 31/02/00
    }

    return date;
  }

  daylightSavingAdjust(date) {
    if (!date) {
      return null;
    }

    date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);

    return date;
  }

  updateFilledState() {
    this.filled = this.inputFieldValue && this.inputFieldValue != '';
  }

  onTodayButtonClick(event) {
    let date: Date = new Date();
    let dateMeta = { day: date.getDate(), month: date.getMonth(), year: date.getFullYear(), otherMonth: date.getMonth() !== this.currentMonth || date.getFullYear() !== this.currentYear, today: true, selectable: true };

    this.onDateSelect(event, dateMeta);
    this.onTodayClick.emit(event);
  }

  onNowButtonClick(event) {
    let date: Date = new Date();
    let minute:number = date.getMinutes();
    let second = date.getSeconds();
    if(!this.showSeconds) {
      second = 0;
    }
    if(this.roundMinutesToNearest != null && this.roundMinutesToNearest > 0) {
      minute = this.roundToNearest(minute, this.roundMinutesToNearest);
    }
    let dateMeta = { day: date.getDate(), month: date.getMonth(), year: date.getFullYear(), hour: date.getHours(), minute: minute, second: second, millisecond: date.getMilliseconds(), otherMonth: date.getMonth() !== this.currentMonth || date.getFullYear() !== this.currentYear, today: true, selectable: true };
    this.currentHour = date.getHours();
    this.currentMinute = minute;
    this.currentSecond = second;
    this.onDateSelect(event, dateMeta);
    this.onNowClick.emit(event);
  }

  onClearButtonClick(event) {
    this.updateModel(null);
    this.updateInputfield();
    this.overlayVisible = false;
    this.onClearClick.emit(event);
  }

  onSaveButtonClick(evt) {
    let defDate:Date = this.defaultDate ? this.defaultDate : new Date();
    if(!this.value) {
      if(this.isRangeSelection()) {
        this.updateModel([defDate, defDate]);
      } else if(this.isMultipleSelection()) {
        this.updateModel([defDate]);
      } else {
        this.updateModel(defDate);
      }
    }
    this.updateInputfield();
    this.overlayVisible = false;
    this.onSaveClick.emit(evt);
  }

  bindDocumentClickListener() {
    if (!this.documentClickListener) {
      this.documentClickListener = this.renderer.listen('document', 'click', (event) => {
        if (!this.datepickerClick && this.overlayVisible) {
          this.overlayVisible = false;
          this.onClose.emit(event);
        }

        this.datepickerClick = false;
        this.cd.detectChanges();
      });
    }
  }

  unbindDocumentClickListener() {
    if (this.documentClickListener) {
      this.documentClickListener();
      this.documentClickListener = null;
    }
  }

  onOverlayHide() {
    this.unbindDocumentClickListener();
    this.unbindMaskClickListener();
    this.overlay = null;
  }

  ngOnDestroy() {
    this.restoreOverlayAppend();
    this.onOverlayHide();
    if (this.subInputHours && !this.subInputHours.closed) {
      this.subInputHours.unsubscribe();
    }
    if (this.subInputMinutes && !this.subInputMinutes.closed) {
      this.subInputMinutes.unsubscribe();
    }
    if (this.subInputSeconds && !this.subInputSeconds.closed) {
      this.subInputSeconds.unsubscribe();
    }
  }

  onInputHours(evt: any) {
    this.inputChangedHours.next(evt);
  }
  onInputMinutes(evt: any) {
    this.inputChangedMinutes.next(evt);
  }
  onInputSeconds(evt: any) {
    this.inputChangedSeconds.next(evt);
  }

  onInputTimeFocus(type:string, el:HTMLInputElement, evt?:FocusEvent) {
    if(this.debug) {
      console.log(`onInputTimeFocus(): For ${type}, got element and event:\n`, el, '\n', evt);
    }
    el.setSelectionRange(0, -1, 'forward');
  }
  onInputTimeBlur(type:string, el:HTMLInputElement, evt?:FocusEvent) {
    if(this.debug) {
      console.log(`onInputTimeBlur(): For ${type}, got element and event:\n`, el, '\n', evt);
    }
    let time:number, val:string;
    switch(type) {
      case 'hour':
        time = this.currentHour;
        val = el.value;
        if(Number(time) !== Number(val)) {
          el.value = this.showCurrentHour;
        }
        break;
      case 'minute':
        time = this.currentMinute;
        val = el.value;
        if(Number(time) !== Number(val)) {
          el.value = this.showCurrentMinute;
        }
        break;
      case 'second':
        time = this.currentSecond;
        val = el.value;
        if(Number(time) !== Number(val)) {
          el.value = this.showCurrentSecond;
        }
      break;
    }
  }

  onKeyUp(type:'hour'|'minute'|'second', evt:KeyboardEvent) {
    if(evt != null && evt.preventDefault != null) {
      evt.preventDefault();
    }
    switch(type) {
      case 'hour':
        if(evt && evt.key === 'ArrowDown') {
          // evt.preventDefault();
          this.incrementHour(evt);
        } else if(evt && evt.key === 'ArrowUp') {
          // evt.preventDefault();
          this.decrementHour(evt);
        }
        break;
      case 'minute':
        if(evt && evt.key === 'ArrowDown') {
          // evt.preventDefault();
          this.incrementMinute(evt);
        } else if(evt && evt.key === 'ArrowUp') {
          // evt.preventDefault();
          this.decrementMinute(evt);
        }
        break;
      case 'second':
        if(evt && evt.key === 'ArrowDown') {
          // evt.preventDefault();
          this.incrementSecond(evt);
        } else if(evt && evt.key === 'ArrowUp') {
          // evt.preventDefault();
          this.decrementSecond(evt);
        }
        break;
      default:
        break;
    }
  }

  onInputScroll(type:'hour'|'minute'|'second', evt:WheelEvent) {
    if(this.debug) {
        console.log(`onInputScroll(): Event:`, evt);
    }
    let dir = evt != null ? evt.deltaY : 0;
    if(dir === 0) {
      return;
    }
    switch(type) {
      case 'hour':
        if(dir < 0) {
          evt.preventDefault();
          this.incrementHour(evt, true);
        } else if(dir > 0) {
          evt.preventDefault();
          this.decrementHour(evt, true);
        }
        break;
      case 'minute':
        if(dir < 0) {
          evt.preventDefault();
          this.incrementMinute(evt, true);
        } else if(dir > 0) {
          evt.preventDefault();
          this.decrementMinute(evt, true);
        }
        break;
      case 'second':
        if(dir < 0) {
          evt.preventDefault();
          this.incrementSecond(evt, true);
        } else if(dir > 0) {
          evt.preventDefault();
          this.decrementSecond(evt, true);
        }
        break;
      default:
        break;
    }
  }

  onCalendarWheelEvent(evt:WheelEvent) {
    if(this.debug) {
        console.log(`onCalendarWheelEvent(): Event:`, evt);
    }
    let dir = evt != null ? evt.deltaY : 0;
    if(dir === 0) {
      return;
    }
    let type:"hour"|"minute"|"second";
    let tgt:HTMLInputElement;
    let varTgt;
    if(this.inputhours != null && document.activeElement === this.inputhours.nativeElement) {
      type = 'hour';
      tgt = this.inputhours.nativeElement;
    }
    if(this.inputminutes != null && document.activeElement === this.inputminutes.nativeElement) {
      type = 'minute';
      tgt = this.inputminutes.nativeElement;
    }
    if(this.inputseconds != null && document.activeElement === this.inputseconds.nativeElement) {
      type = 'second';
      tgt = this.inputseconds.nativeElement;
    }

    switch(type) {
      case 'hour':
        if(dir < 0) {
        //   evt.preventDefault();
          this.incrementHour(evt, true);
        } else if(dir > 0) {
        //   evt.preventDefault();
          this.decrementHour(evt, true);
        }
        break;
      case 'minute':
        if(dir < 0) {
        //   evt.preventDefault();
          this.incrementMinute(evt, true);
        } else if(dir > 0) {
        //   evt.preventDefault();
          this.decrementMinute(evt, true);
        }
        break;
      case 'second':
        if(dir < 0) {
        //   evt.preventDefault();
          this.incrementSecond(evt, true);
        } else if(dir > 0) {
        //   evt.preventDefault();
          this.decrementSecond(evt, true);
        }
        break;
      default:
        break;
    }
  }

  /**
  * Round parameter 1 to the nearest multiple of parameter 2.
  * Works with fractional values as well as integers.
  * Examples:
  * (5, 15) => 0
  * (8, 15) => 15
  * (20, 15) => 15
  * (25, 15) => 30
  * (25, 100) => 0
  * (51, 100) => 100
  * (1.25, 0.1) => 1.3
  *
  * @param {number} value Number to be rounded.
  * @param {number} roundTo Number to round to the nearest multiple of. Must be positive. Can be fractional!
  * @returns {number} The rounded value.
  */
  public roundToNearest(value:number, roundTo:number):number {
    let toRound:number = Number(value);
    let numRoundTo = Number(roundTo);
    let step = !isNaN(numRoundTo) ? Math.abs(numRoundTo) : 1.0;
    if(step === 0) {
      console.warn(`roundToNearest(): Rounding to the nearest 0 makes no sense, aborting.`);
      return null;
    }
    if(!isNaN(step)) {
      let intStep = Math.trunc(step);
      if(intStep !== step) {
        /* Rounding to a fractional value */
        let inverse = 1.0 / step;
        return Math.round(toRound * inverse) / inverse;
      } else {
        let result = Math.round(toRound / step) * step;
        if(!isNaN(result)) {
          return result;
        }
      }
    }
    console.warn(`roundToNearest(): Must supply numbers as parameters.`);
    return null;
  };

  /**
  * Round parameter 1 up to the next multiple of parameter 2.
  * Examples:
  * (5, 15) => 15
  * (8, 15) => 15
  * (20, 15) => 30
  * (31, 15) => 45
  * (25, 100) => 100
  * (101, 100) => 200
  * (1.25, 0.1) => 1.3

  * @param {number} value Number to be rounded.
  * @param {number} roundTo Number to round to the next higher multiple of. Must be positive. Can be fractional!
  * @returns {number} The rounded value.
  * @see {@link roundToNearest} for the version that rounds to the nearest instead of next higher.
  * @see {@link roundDownToNearest} for the version that rounds to the previous multiple instead of next multiple.
  */
  public roundUpToNearest(value:number, roundTo:number):number {
    let toRound:number = Number(value);
    let numRoundTo = Number(roundTo);
    let step = !isNaN(numRoundTo) ? Math.abs(numRoundTo) : 1.0;
    if(step === 0) {
      console.warn(`roundToNearest(): Rounding to the nearest 0 makes no sense, aborting.`);
      return null;
    }
    if(!isNaN(toRound)) {
      let intStep = Math.trunc(step);
      if(intStep !== step) {
        /* Rounding to a fractional value */
        let inverse = 1.0 / step;
        return Math.ceil(toRound * inverse) / inverse;
      } else {
        let result = Math.ceil(toRound / step) * step;
        if(!isNaN(result)) {
          return result;
        }
      }
    }
    console.warn(`roundUpToNext(): Must supply numbers as parameters.`);
    return null;
  };

  /**
  * Round parameter 1 down to the nearest multiple of parameter 2 that is <= parameter 1.
  * Examples:
  * roundDownToNearest(5, 15) => 0
  * roundDownToNearest(8, 15) => 0
  * roundDownToNearest(20, 15) => 15
  * roundDownToNearest(31, 15) => 30
  * roundDownToNearest(25, 100) => 0
  * roundDownToNearest(101, 100) => 100
  * roundDownToNearest(199, 100) => 100
  * roundDownToNearest(1.25, 0.1) => 1.2

  * @param {number} value Number to be rounded.
  * @param {number} roundTo Number to round to the nearest multiple of that is not larger than the provided value.
  * @returns {number} The rounded value.
  * @see {@link roundToNearest} for the version that rounds to the nearest instead of rounding down.
  * @see {@link roundUpToNearest} for the version that rounds to the next multiple instead of previous multiple.
  */
  public roundDownToNearest(value:number, roundTo:number):number {
    let toRound:number = Number(value);
    let numRoundTo = Number(roundTo);
    let step = !isNaN(numRoundTo) ? Math.abs(numRoundTo) : 1.0;
    if(step === 0) {
      console.warn(`roundToNearest(): Rounding to the nearest 0 makes no sense, aborting.`);
      return null;
    }
    if(!isNaN(toRound)) {
      let intStep = Math.trunc(step);
      if(intStep !== step) {
        /* Rounding to a fractional value */
        let inverse = 1.0 / step;
        return Math.floor(toRound * inverse) / inverse;
      } else {
        let result = Math.floor(toRound / step) * step;
        if(!isNaN(result)) {
          return result;
        }
      }
    }
    console.warn(`roundDownToNext(): Must supply numbers as parameters.`);
    return null;
  };


}

@NgModule({
  imports: [CommonModule, ButtonModule, SharedModule, FormsModule],
  exports: [Calendar, ButtonModule, SharedModule, FormsModule],
  declarations: [Calendar]
})
export class CalendarModule { }
