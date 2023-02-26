/**
 * Name: MomentJS functions and extensions for OnSiteX/OnSiteConsoleX
 * Vers: 3.4.0
 * Date: 2022-07-20
 * Auth: David Sargeant
 * Logs: 3.4.0 2022-07-20: Added static moment.isValid() method
 * Logs: 3.3.0 2022-07-08: Added range.expand(), expandDayRange(range) methods
 * Logs: 3.2.0 2021-12-16: Added rounding parameter to Excel output method
 * Logs: 3.1.0 2021-11-17: Added Daylight Saving Time related methods
 * Logs: 3.0.0 2020-02-25: Fixed rounding not working; Added static round(), ceil(), floor() methods; Changed how `moment` exports; Added console log for testing
 * Logs: 2.1.1 2019-12-18: Added parseFormat() functionality from 'moment-parseformat'
 * Logs: 2.1.0 2018-08-08: Added isDuration() method to moment
 * Logs: 2.0.0 2018-04-10: Fixed fromOADate function
 */



// import * as momentRecur       from 'moment-recur'       ;
// import * as moRound       from 'moment-round'       ;
// import * as moment            from 'moment-timezone'    ;
// declare const require                                    ;
// import   * as momo              from 'moment'             ;
// import   * as moment             from 'moment'             ;
import   * as moment             from 'moment'             ;
// // import Moment from 'moment';
// // import   * as momentTimezone      from 'moment-timezone'    ;
// // import { Moment, Duration } from 'moment';
// // import   * as moShortFormat   from 'moment-shortformat' ;
// import   * as momentRange         from 'moment-range'       ;
// import { PreciseRange, preciseDiff as mprPreciseDiff, staticPreciseDiff } from './moment-precise-range';
// import { extendMoment } from 'moment-range';
// // import {momentDurationFormatSetup} from 'moment-duration-format';
// import 'moment-duration-format';
// import { MomentTimer, MomentTimerAttributes, Timer } from './moment-timer-onsite';
// import * as momentParseFormat from 'moment-parseformat' ;
// // import { parseFormat as momentParseFormat } from 'moment-parseformat' ;

// // import 'moment-precise-range-plugin';
// // import   * as momentPreciseRange  from 'moment-precise-range-plugin'       ;

// // import   * as parseFormat         from 'moment-parseformat' ;
// import { Log                    } from '../config/config.log'       ;

// // const twix = require('twix');
// // const momentDurationFormatSetup = require('moment-duration-format');
// // import {Twix,TwixStatic,} from 'twix';

// // const moment:momentRange.MomentRange & moment.Moment = extendMoment(Moment)
// // G['momentDurationFormatSetup'] = momentDurationFormatSetup;
// // G['extendMoment'] = extendMoment;

// // export type MomentFormatSeparator = '/' | '.' | '-';
// // export type PreferredOrderString = "MDY" | "DMY" | "YMD";
// // export type MomentParseFormatPreferredOrder = {
// //   '/' ?: PreferredOrderString,
// //   '.' ?: PreferredOrderString,
// //   '-' ?: PreferredOrderString,
// // };
// // export type MomentParseFormatOptions = {
// //   'preferredOrder': MomentParseFormatPreferredOrder|PreferredOrderString,
// // };
// // export type Moment = momentRange.MomentRange;
export type Moment = moment.Moment;
export type Duration = moment.Duration;
export type Locale = moment.Locale;
export type LocaleSpecification = moment.LocaleSpecification;
export type MomentInput = moment.MomentInput;
// export type MomentRange = momentRange.DateRange;
// export type DateRange = momentRange.DateRange;
// // export type MomentZone = momentTimezone.MomentZone;
// // export type MomentTimezone = momentTimezone.MomentTimezone;
// // export type Twix = Twix;
// // export type TwixStatic = TwixStatic;
export type MomentLike = moment.MomentInput;
export type Momentable = MomentInput;

export type MomentRoundDirection = "round"|"ceil"|"floor"|"up"|"down";
export type MomentRoundingDirection = MomentRoundDirection;
export type MomentRoundUnit = 'hours' | 'hour' | 'h' | 'minutes' | 'minute' | 'min' | 'm' | 'seconds' | 'second' | 'secs' | 'sec' | 's' | 'milliseconds' | 'millisecond' | 'milli' | 'mill' | 'mm' | 'ms';
export type MomentRoundingUnit = MomentRoundUnit;

// export type MomentParseFormatOrder = MomentParseFormatPreferredOrderString | MomentParseFormatPreferredOrderObject;
export type MomentParseFormatSeparator = '/' | '.' | '-';
export type MomentParseFormatPreferredOrderString = "MDY" | "DMY" | "YMD" | string;
export interface MomentParseFormatPreferredOrderObject {
  "/" ?: MomentParseFormatPreferredOrderString;
  "." ?: MomentParseFormatPreferredOrderString;
  "-" ?: MomentParseFormatPreferredOrderString;
}
export interface MomentParseFormatOptionsDefined {
  preferredOrder ?: MomentParseFormatPreferredOrderObject|MomentParseFormatPreferredOrderString;
};
export type MomentParseFormatOptions = MomentParseFormatOptionsDefined|null|undefined;

/* Moment.js type corrections */
declare module "moment" {
  export type RoundDirection = MomentRoundDirection;
  export type RoundingDirection = MomentRoundDirection;
  export type RoundingUnit = MomentRoundingUnit;
  export type RoundingingUnit = MomentRoundingUnit;
  interface Moment {

    /**
     * getHoursInDate returns the number of hours in this Moment's day. Usually 24, but on
     * dates that Daylight Saving Time starts or ends, could be 23 or 25.
     *
     * @returns {number} The number of hours in this calendar date. Usually 24 (but not always)
     * @memberof Moment
     */
     getHoursInDate():number;
     /**
       * isDSTDate returns true if this Moment is a Daylight Saving Time changeover date
       *
       * @returns {boolean} True if Daylight Saving Time starts or ends on this date
       */
     isDSTDate():boolean;
     /**
       * isDSTStart returns true if this Moment is a date when Daylight Saving Time begins.
       *
       * @returns {boolean} True if Daylight Saving Time starts on this date
       */
     isDSTStart():boolean;
     /**
       * isDSTEnd returns true if this Moment is a date when Daylight Saving Time ends.
       *
       * @returns {boolean} True if Daylight Saving Time ends on this date
       */
     isDSTEnd():boolean;

    /**
     * 2017-07-04: Added by David Sargeant so TypeScript won't freak out
     * // fn:any;
     */

    /**
     * Moment.fromExcel(): Method to create a Moment from an Excel date.
     * Excel dates are a number where the integer part is a day count and the decimal
     * part is the fraction of a day represented by the time. The day count represents
     * the number of days, starting 1899-12-31. So day 2 is 1900-01-01.
     * So 2.75 would be 1900-01-01T18:00:00.
     *
     * @param {(number|string)} days Excel date as a number or numeric string.
     * @returns {moment.Moment} Moment object equivalent to the provided Excel date.
     * @memberof Moment
     */
    fromExcel(days:number|string):moment.Moment;
    // toExcel(mo?:Date | moment.Moment | string | boolean, dayOnly?:boolean):number;
    // toExcel(dayOnly?:boolean|number, places?:number):number;


    /**
     * Moment.toExcel(): Method to create an Excel date from a Moment object.
     * Excel dates are a number where the integer part is a day count and the decimal
     * part is the fraction of a day represented by the time. The day count represents
     * the number of days, starting on 1899-12-31. So day 2 is 1900-01-01.
     * Thus, moment("1900-01-01T18:00:00-06:00").toExcel() would return 2.75.
     *
     * @param {boolean} [dayOnly] If true, return only the integer part of the Excel date.
     * @returns {number} Excel date equivalent to the Moment object.
     * @memberof Moment
     */
    toExcel(dayOnly?:boolean|number):number;

    round(precision:number, key:MomentRoundingUnit, direction?:MomentRoundDirection): moment.Moment;
    ceil(precision:number, key:MomentRoundingUnit):moment.Moment;
    floor(precision:number, key:MomentRoundingUnit):moment.Moment;
  }

  /**
   * Static Moment method to determine if the provided input is a valid Moment.
   *
   * @returns {boolean}
   */
  function isValid(date:moment.Moment):boolean;

  /**
   * getHoursInDate returns the number of hours in the provided day. Usually 24, but on
   * dates that Daylight Saving Time starts or ends, could be 23 or 25.
   *
   * @param {MomentLike} date A Moment, Date, or ISO8601 date string
   * @returns {number} The number of hours in this calendar date. Usually 24 (but not always)
   * @memberof Moment
   */
  function getHoursInDate(date:MomentLike):number;

  /**
   * isDSTDate returns true if the provided date is a Daylight Saving Time changeover date
   *
   * @param {MomentLike} date A Moment, Date, or ISO8601 date string
   * @returns {boolean} True if Daylight Saving Time starts or ends on this date
   * @memberof Moment
   */
  function isDSTDate(date:MomentLike):boolean;

  /**
   * isDSTStart returns true if the provided date is a day when Daylight Saving Time begins
   *
   * @param {MomentLike} date A Moment, Date, or ISO8601 date string
   * @returns {boolean} True if Daylight Saving Time starts on this date
   * @memberof Moment
   */
  function isDSTStart(date:MomentLike):boolean;

  /**
   * isDSTEnd returns true if the provided date is a day when Daylight Saving Time ends
   *
   * @param {MomentLike} date A Moment, Date, or ISO8601 date string
   * @returns {boolean} True if Daylight Saving Time ends on this date
   * @memberof Moment
   */
  function isDSTEnd(date:MomentLike):boolean;

  // /**
  //  * isDSTEnd returns true if the provided date is a day when Daylight Saving Time ends
  //  *
  //  * @param {MomentLike} date A Moment, Date, or ISO8601 date string
  //  * @returns {boolean} True if Daylight Saving Time ends on this date
  //  * @memberof Moment
  //  */
  // function parseFormat(date:string, preferredOrder?:MomentParseFormatOrder):string;

  // function round(
  function round(datetime:moment.Moment, precision:number, unit:MomentRoundingUnit, roundDirection?:MomentRoundDirection):Moment;
  function ceil(datetime:moment.Moment, precision:number, unit:MomentRoundingUnit):Moment;
  function floor(datetime:moment.Moment, precision:number, unit:MomentRoundingUnit):Moment;
}
/* MOMENT TYPES END */

// const momentRound = function(precision:number, key:string, direction?:string):moment.Moment {
//   if(typeof direction === 'undefined') {
//     direction = 'round';
//   }
//   let self = this;

//   let keys = ['Hours', 'Minutes', 'Seconds', 'Milliseconds'];
//   let maxValues = [24, 60, 60, 1000];

//   // Capitalize first letter
//   key = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();

//   // make sure key is plural
//   if(key.indexOf('s', key.length - 1) === -1) {
//     key += 's';
//   }
//   let value = 0;
//   let rounded = false;
//   let subRatio = 1;
//   let maxValue;
//   for(let i in keys) {
//     let k = keys[i];
//     if(k === key) {
//       value = self._d['get' + key]();
//       maxValue = maxValues[i];
//       rounded = true;
//     } else if(rounded) {
//       subRatio *= maxValues[i];
//       value += self._d['get' + k]() / subRatio;
//       self._d['set' + k](0);
//     }
//   };

//   value = Math[direction](value / precision) * precision;
//   value = Math.min(value, maxValue);
//   self._d['set' + key](value);

//   return self;
// }

// const staticRangeToArray = function(first:Moment, last:Moment):Moment[] {
//   let out:Moment[] = [];
//   if(isMoment(first) && isMoment(last)) {

//   }
// }

/**
 * Static Moment method to determine if the provided object is a valid Moment.
 *
 * @param {Moment} date Object to be tested.
 * @returns {boolean} True if provided object is a valid Moment, false otherwise.
 */
const staticIsValid = function(date:Moment):boolean {
  return moment.isMoment(date) && date.isValid();
};

const staticGetHoursInDate = function(datetime:MomentLike):number {
  let inputmoment = moment(datetime);
  if(!isMoment(inputmoment)) {
    let text = `Parameter 1 must be Moment-able into a valid Moment, invalid parameter provided`;
    console.warn(`getHoursInDate(): ${text}:`, datetime);
    let err = new TypeError(text);
    throw err;
  }
  let date1 = moment(datetime).startOf('day');
  let date2 = moment(date1).add(1, 'day');
  let diff = date2.diff(date1, 'hour');
  return Math.abs(diff);
};

const GetHoursInDate = function():number {
  let self:moment.Moment = this;
  return staticGetHoursInDate(self);
};

const staticIsDSTDate = function(datetime:MomentLike):boolean {
  let inputmoment = moment(datetime);
  if(!isMoment(inputmoment)) {
    let text = `Parameter 1 must be Moment-able into a valid Moment, invalid parameter provided`;
    console.warn(`isDSTDate(): ${text}:`, datetime);
    let err = new TypeError(text);
    throw err;
  }
  let hours = staticGetHoursInDate(inputmoment);
  if(hours !== 24) {
    return true;
  }
  return false;
};

const IsDSTDate = function():boolean {
  let self:moment.Moment = this;
  return staticIsDSTDate(self);
};

const staticIsDSTStart = function(datetime:MomentLike):boolean {
  let inputmoment = moment(datetime);
  if(!isMoment(inputmoment)) {
    let text = `Parameter 1 must be Moment-able into a valid Moment, invalid parameter provided`;
    console.warn(`isDSTStart(): ${text}:`, datetime);
    let err = new TypeError(text);
    throw err;
  }
  let hours = staticGetHoursInDate(inputmoment);
  if(hours === 23) {
    return true;
  }
  return false;
};

const IsDSTStart = function():boolean {
  let self:moment.Moment = this;
  return staticIsDSTStart(self);
};

const staticIsDSTEnd = function(datetime:MomentLike):boolean {
  let inputmoment = moment(datetime);
  if(!isMoment(inputmoment)) {
    let text = `Parameter 1 must be Moment-able into a valid Moment, invalid parameter provided`;
    console.warn(`isDSTEnd(): ${text}:`, datetime);
    let err = new TypeError(text);
    throw err;
  }
  let hours = staticGetHoursInDate(inputmoment);
  if(hours === 25) {
    return true;
  }
  return false;
};

const IsDSTEnd = function():boolean {
  let self:moment.Moment = this;
  return staticIsDSTEnd(self);
};

const staticMomentRound = function(datetime:Moment, precision:number, unit:MomentRoundingUnit, roundDirection?:MomentRoundDirection):Moment {
  let direction:string = roundDirection || 'round';
  if(direction === 'up') {
    direction = 'ceil';
  } else if(direction === 'down') {
    direction = 'floor';
  }
  if(!(moment.isMoment(datetime) && datetime.isValid())) {
    let text = `MomentRound(): Parameter 1 must be a Moment object`;
    console.warn(text + ':', datetime);
    let err = new Error(text);
    throw err;
  }
  let _this:any = this; // cache of this
  let self = datetime;
  let methods = {
    hours:        { 'name': 'Hours',        'maxValue': 24   },
    minutes:      { 'name': 'Minutes',      'maxValue': 60   },
    seconds:      { 'name': 'Seconds',      'maxValue': 60   },
    milliseconds: { 'name': 'Milliseconds', 'maxValue': 1000 },
  };
  let keys = {
    'mm':           methods.milliseconds.name,
    'ms':           methods.milliseconds.name,
    'milliseconds': methods.milliseconds.name,
    'Milliseconds': methods.milliseconds.name,
    's':            methods.seconds.name,
    'sec':          methods.seconds.name,
    'secs':         methods.seconds.name,
    'seconds':      methods.seconds.name,
    'Seconds':      methods.seconds.name,
    'm':            methods.minutes.name,
    'min':          methods.minutes.name,
    'mins':         methods.minutes.name,
    'minutes':      methods.minutes.name,
    'Minutes':      methods.minutes.name,
    'H':            methods.hours.name,
    'h':            methods.hours.name,
    'hour':         methods.hours.name,
    'Hour':         methods.hours.name,
    'hours':        methods.hours.name,
    'Hours':        methods.hours.name
  };
  let value:number = 0;
  let rounded:boolean = false;
  let subRatio:number = 1;
  let maxValue:number;

  // make sure key is plural
  if(unit.length > 1 && unit !== 'mm' && unit.slice(-1) !== 's') {
    unit += 's';
  }
  unit = keys[unit].toLowerCase();

  // control
  if(!methods[unit]) {
    let text = 'MomentRound(): The unit to round to is not valid. Possibles [hours", "minutes", "seconds", "milliseconds"]';
    console.warn(text + ':', unit);
    let err = new Error(text);
    throw err;
  }

  let getMethodName:string = 'get' + methods[unit].name;
  let setMethodName:string = 'set' + methods[unit].name;

  for(let k in methods) {
    if(k === unit) {
      value = (self as any)._d[getMethodName]();
      maxValue = methods[k].maxValue;
      rounded = true;
    } else if(rounded) {
      subRatio *= methods[k].maxValue;
      value += (self as any)._d['get' + methods[k].name]() / subRatio;
      (self as any)._d['set' + methods[k].name](0);
    }
  }

  value = Math[direction](value / precision) * precision;
  value = Math.min(value, maxValue);
  (self as any)._d[setMethodName](value);

  return self;
};

const staticMomentCeil = function(datetime:Moment, precision:number, key:MomentRoundingUnit):Moment {
  return staticMomentRound(datetime, precision, key, 'ceil');
};

const staticMomentFloor = function(datetime:Moment, precision:number, key:MomentRoundingUnit):Moment {
  return staticMomentRound(datetime, precision, key, 'floor');
};

const momentRound = function(precision:number, unit:MomentRoundingUnit, roundDirection?:MomentRoundDirection):Moment {
  let self = this;
  return staticMomentRound(self, precision, unit, roundDirection);
};

const momentCeil = function(precision:number, key:MomentRoundingUnit):Moment {
  let self = this;
  return self.round(precision, key, 'ceil');
};

const momentFloor = function(precision:number, key:MomentRoundingUnit):Moment {
  let self = this;
  return self.round(precision, key, 'floor');
};

export const isMoment = function(val:any):boolean {
  return (moment.isMoment(val) && moment(val).isValid());
};

export const isDuration = function(val:any):boolean {
  return (moment.isDuration(val) && val['isValid'] && typeof val['isValid'] === 'function' && (val as any).isValid());
};

// export var moment2excel = function (mo?: Date | moment.Moment | string | boolean, dayOnly?: boolean) {
  //   let xlDate;
  //   let XLDay0 = moment([1900, 0, 1]).startOf('day');
  //   let value;
  //   if (mo) {
    //     if (typeof mo === 'boolean') {
      //       value = this;
//       xlDate = Math.trunc(moment(value).diff(XLDay0, 'days', true) + 2);
//     } else {
  //       value = mo;
  //       if (dayOnly) {
    //         xlDate = Math.trunc(moment(value).diff(XLDay0, 'days', true) + 2);
    //       } else {
      //         xlDate = moment(value).diff(XLDay0, 'days', true) + 2;
      //       }
      //     }
      //   } else {
//     value = this;
//     xlDate = moment(value).diff(XLDay0, 'days', true) + 2;
//   }
//   return xlDate;
// };

/* Begin MSDate/OADate/ExcelDate functionality */
export const XLDay0 = moment([1900, 0, 1]).startOf('day');

const MINUTE_MILLISECONDS:number = 60 * 1000;
const DAY_MILLISECONDS:number    = 86400000 ;
const MS_DAY_OFFSET:number       = 25569    ;

const momentVersion:string[] = moment.version.split('.');
const major:number = +momentVersion[0];
const minor:number = +momentVersion[1];

const oaDateToTicks = function(oaDate:number):number {
  return ((oaDate - MS_DAY_OFFSET) * DAY_MILLISECONDS) + (oaDate >= 0.0 ? 0.5 : -0.5);
};

const ticksToOADate = function(ticks:number):number {
  return (ticks / DAY_MILLISECONDS) + MS_DAY_OFFSET;
};

/**
* @description takes an oaDate that is not in utc and converts it to a utc moment offset by a number of minutes
*
* @param {number} oaDate
 * @param {number} offsetToUtcInMinutes
 * @returns moment
 */
const fromOADateOffsetToUtcByMinutes = function(oaDate:number, offsetToUtcInMinutes:number):moment.Moment {
  const offsetInTicks = offsetToUtcInMinutes * MINUTE_MILLISECONDS;
  const ticks = oaDateToTicks(oaDate);
  return moment(ticks + offsetInTicks).utc();
};


/**
 * @description takes an oaDate that is in utc and converts it to a utc moment or takes an oaDate and an offset to utc and converts it to a utc moment. The offset can be an int representing the offset to utc in minutes or a string indicating the timezone of the oaDate. Will be used as moment.fromOADate()
 *
 * @param {double} oaDate
 * @param {string=} {int=} offset
 * @returns moment
 */
const fromOADate = function(oaDate:number, offset?:number):moment.Moment {
  if(isNaN(Number(oaDate))) {
    throw new TypeError('fromOADate requires an oaDate that is number-like!!!');
  }

  /* no offset */
  if(!offset) {
    return fromOADateOffsetToUtcByMinutes(oaDate, 0);
  }

  // /* timezone */
  const parsedOffset = Number(offset);
  if(isNaN(parsedOffset)) {
    // return fromOADateOffsetToUtcByTimezone(oaDate, offset);
    throw new TypeError("fromOADate requires an offset that is number-like!!!");
  }

  /* minutes */
  return fromOADateOffsetToUtcByMinutes(oaDate, parsedOffset);
};

/**
 * @description converts a moment to a UTC OLE automation date represented as a double. Will be used as moment.fn.toOADate()
 *
 * @returns {double}
 */
const toOADate = function():number {
  const milliseconds = this.valueOf();
  return ticksToOADate(milliseconds);
};
/* End MSDate/OADate/ExcelDate functionality */


/**
 * Round the provided number to the specified number of decimal places.
 * Similar to toFixed(), but returning a number instead of string.
 * NOTE: Since this returns a number, you will not get trailing zeroes.
 * So `roundToMaxPlaces(4.499993872, 3)` will return 4.5, not "4.500".
 *
 * @param {number} value The number to be rounded.
 * @param {number} [decimals=2] The number of decimal places to be provided. If null, default to 2.
 * @returns {number} The provided value, rounded to the requested number of decimals at most.
 */
export const roundToMaxPlaces = function(value:number, decimals?:number):number {
  let places:number = typeof decimals === 'number' ? decimals : 2;
  let string1:string = value.toFixed(places);
  let num1:number = Number(string1);
  return num1;
};


/**
 * Converts a Moment object to an Excel-style date.
 * Excel dates are just floating-point numbers:
 * {INTEGER}[.{DECIMAL}]
 * INTEGER = number of days starting at 1900-01-01, i.e. 1 means 1900-01-01.
 * DECIMAL = fraction of a day. So 0 means midnight, 0.5 means noon, 0.75 means 18:00, etc.
 * Caveat: Excel has a bug regarding the number of days in the year 1900. See:
 * {@link https://docs.microsoft.com/en-us/office/troubleshoot/excel/wrongly-assumes-1900-is-leap-year}
 *
 * @param {(Date | moment.Moment | string)} datetime A Date, Moment, or a Moment-able string. If null, use current Moment.
 * @param {boolean|number} [dayOnly] If null or false, return the raw number value. May have a lot of decimal places.
*      If true, return only the integer portion; disregard the time portion.
 *     Can also be a number, representing the maximum number of allowed decimal places in the result.
 *     Some guidelines on how accurate this makes the results:
 *     0 => Same date (returns integer only)
 *     1 => Within ~2.4 hours (probably not very useful)
 *     2 => Within ~15 minutes
 *     3 => Within ~1.5 minutes
 *     4 => Within ~9 seconds
 *     5 => Within ~1 second
 * @returns {number} The Excel-compatible number corresponding to the provided Moment.
 */
export const convertMoment2Excel = function(datetime:Date|moment.Moment|string, dayOnly?:boolean|number):number {
  let xlDate:number;
  const EXCEL_DATE_BUG_CORRECTION = 2;
  let value:moment.Moment;
  let self = this;
  if(datetime == null) {
    if(isMoment(self)) {
      value = self;
    } else {
      let text = `convertMoment2Excel(): Parameter 1 was null, but this did not point to a Moment object`;
      console.warn(text + ", `this`:", self);
      value = moment();
    }
    xlDate = moment(value).diff(XLDay0, 'days', true) + EXCEL_DATE_BUG_CORRECTION;
  // } else {
    // if(typeof datetime === 'boolean') {
    //   if(isMoment(self)) {
    //     value = self;
    //   } else {
    //     value = moment();
    //   }
    //   xlDate = Math.trunc(moment(value).diff(XLDay0, 'days', true) + EXCEL_DATE_BUG_CORRECTION);
  } else if(datetime instanceof Date || isMoment(datetime) || typeof datetime === 'string' || typeof datetime === 'number') {
    value = moment(datetime);
    if(isMoment(value)) {
      xlDate = moment(value).diff(XLDay0, 'days', true) + EXCEL_DATE_BUG_CORRECTION;
    } else {
      let text = `Moment.toExcel(): Called with an invalid Date, Moment, or string as parameter 1, or called in static mode without a valid Date, Moment, or Moment-able string as parameter 1`;
      console.warn(text + ", parameter 1 was:\n", datetime);
      throw new TypeError(text);
    }
  } else {
    let text = `Moment.toExcel(): Parameter 1 invalid. Must be Moment-able`;
    text += ` (provided type = ` + typeof datetime + `)`;
    console.warn(text + ", parameter 1 was:\n", datetime);
    throw new TypeError(text);
  }
  if(dayOnly === true) {
    xlDate = Math.trunc(moment(value).diff(XLDay0, 'days', true) + EXCEL_DATE_BUG_CORRECTION);
  } else if(typeof dayOnly === 'number') {
    let tmpVal = xlDate;
    if(dayOnly <= 0) {
      tmpVal = Math.trunc(tmpVal);
    } else {
      /* Round to this many decimal places. 5 is enough to get to the nearest second. */
      tmpVal = roundToMaxPlaces(tmpVal, dayOnly);
    }
    xlDate = tmpVal;
  }
  // else if(typeof places === 'number') {
  //   /* Round to this many decimal places. 5 is enough to get to the nearest second. */
  //   let tmpVal = roundToMaxPlaces(xlDate, places);
  //   xlDate = tmpVal;
  // }
  // if(dayOnly !== true && typeof places === 'number') {
  //     /* Round to this many decimal places. 5 is enough to get to the nearest second. */
  //     let tmpVal = roundToMaxPlaces(xlDate, places);
  //     xlDate = tmpVal;
  //   }
  // else {
  //   value = this;
  //   xlDate = moment(value).diff(XLDay0, 'days', true) + 2;
  // }
  return xlDate;
};

/**
 * Converts the current Moment object to an Excel-style date.
 * Excel dates are just floating-point numbers:
 * {INTEGER}[.{DECIMAL}]
 * INTEGER = number of days starting at 1900-01-01, i.e. 1 means 1900-01-01.
 * DECIMAL = fraction of a day. So none = midnight, 0.5 means noon, 0.75 means 18:00, etc.
 * Caveat: Excel has a bug regarding the number of days in the year 1900. See:
 * {@link https://docs.microsoft.com/en-us/office/troubleshoot/excel/wrongly-assumes-1900-is-leap-year}
 *
 * @param {boolean|number} [dayOnly] If null or false, return the raw number value. May have a lot of decimal places.
*      If true, return only the integer portion; disregard the time portion.
 *     Can also be a number, representing the maximum number of allowed decimal places in the result.
 *     Some guidelines on how accurate this makes the results:
 *     0 => Same date (returns integer only)
 *     1 => Within ~2.4 hours (probably not very useful)
 *     2 => Within ~15 minutes
 *     3 => Within ~1.5 minutes
 *     4 => Within ~9 seconds
 *     5 => Within ~1 second
 * @returns {number} The Excel-compatible number corresponding to the provided Moment.
 * @see {@link convertMoment2Excel} for the underlying function.
 */
export const moment2excel = function(dayOnly?:boolean|number):number {
  /* Wrapper ensures 'this' points to the Moment object calling this function */
  return (function() {
    let self = this;
    return convertMoment2Excel(self, dayOnly);
  }.bind(this))();
};

/**
 * Converts the provided Moment or Moment-able value to an Excel-style date.
 * Excel dates are just floating-point numbers:
 * {INTEGER}[.{DECIMAL}]
 * INTEGER = number of days starting at 1900-01-01, i.e. 1 means 1900-01-01.
 * DECIMAL = fraction of a day. So none = midnight, 0.5 means noon, 0.75 means 18:00, etc.
 * Caveat: Excel has a bug regarding the number of days in the year 1900. See:
 * {@link https://docs.microsoft.com/en-us/office/troubleshoot/excel/wrongly-assumes-1900-is-leap-year}
 *
 * @param {(Date | moment.Moment | string)} [datetime] A Date, Moment, or a Moment-able string. If null, use current Moment.
 * @param {boolean|number} [dayOnly] If true, return only the integer portion; disregard the time portion.
 *     Can also be a number, representing the maximum number of allowed decimal places in the result.
 *     Some guidelines on how accurate this makes the results:
 *     0 => Same date (returns integer only)
 *     1 => Within ~2.4 hours (probably not very useful)
 *     2 => Within ~15 minutes
 *     3 => Within ~1.5 minutes
 *     4 => Within ~9 seconds
 *     5 => Within ~1 second
 * @returns {number} The Excel-compatible number corresponding to the provided Moment.
 * @see {@link convertMoment2Excel} for the underlying function.
 */
export const Moment2excel = function(datetime:Date|moment.Moment|string, dayOnly?:boolean|number):number {
  return convertMoment2Excel(datetime, dayOnly);
};

// const MomentObject2excel = function(dayOnly?:boolean, places?:number):number {
//   return convertMoment2Excel(null, dayOnly, places);
// };

/**
 * Converts a number representing an Excel-style date to a Moment object.
 * Excel dates are just floating-point numbers:
 * {INTEGER}[.{DECIMAL}]
 * INTEGER = number of days starting at 1900-01-01, i.e. 1 means 1900-01-01.
 * DECIMAL = fraction of a day. So none = midnight, 0.5 means noon, 0.75 means 18:00, etc.
 * Caveat: Excel has a bug regarding the number of days in the year 1900. See:
 * {@link https://docs.microsoft.com/en-us/office/troubleshoot/excel/wrongly-assumes-1900-is-leap-year}
*
* @param {(number|string)} days - Excel-style date, in number or string form.
* @param {boolean} [sourceIsMacExcel] - DEPRECATED - No longer used.
*     Excel 2008 for Mac and earlier used the 1904 date system by default.
*     @see {@link https://docs.microsoft.com/en-us/office/troubleshoot/excel/1900-and-1904-date-system}
* @returns {Moment} A Moment representing the date and time provided.
*/
export const excel2moment = function(days:number|string, sourceIsMacExcel?:boolean):moment.Moment {
  let value:number;
  if(typeof days === 'number') {
    value = days;
  } else if(typeof days === 'string') {
    let tmp1:number = Number(days);
    if(!isNaN(tmp1)) {
      value = tmp1;
    } else {
      let text = "Moment.fromExcel(): Parameter 1 must be number or numeric string. Non-numeric string provided";
      text += " : ";
      text += String(days);
      console.warn(text + ". Original parameter:\n", days);
      throw new TypeError(text);
    }
  } else {
    let text = "Moment.fromExcel(): Parameter 1 must be number or numeric string. Invalid parameter provided";
    text += " : ";
    text += String(days);
    text += " (type " + typeof days + ")";
    console.warn(text + ". Original parameter:\n", days);
    throw new TypeError(text);
  }
  // let xlDay0Array = [1900, 0, 1, 0, 0, 0];
  // if(sourceIsMacExcel) {
    // xlDay0Array = [1904, 0, 1, 0, 0, 0];
  // }
  // let XLDay0 = moment(xlDay0Array);
  // let now = moment();
  // let daysInMilliseconds = moment.duration(moment.duration(value - 2, 'days').asMilliseconds());
  // let newMoment = moment(XLDay0).add(daysInMilliseconds);
  // let tzDifference = now.utcOffset() - XLDay0.utcOffset();
  // // Log.l("New Moment and XLDay0 TZ difference is (%d - %d = %d):", now.utcOffset(), XLDay0.utcOffset(), tzDifference);
  // // Log.l(newMoment);
  // // Log.l(XLDay0);
  // G['xldays'] = { xlday0: XLDay0, value: value, now: newMoment };
  // let midnightDateInQuestion = moment(newMoment).startOf('day');
  // let morningDateInQuestion  = moment(newMoment).startOf('day').add(6, 'hours');
  // let offset1 = midnightDateInQuestion.utcOffset();
  // let offset2 = morningDateInQuestion.utcOffset();
  // if(offset1 !== offset2) {
  //   tzDifference = tzDifference +
  // }
  // let lastMoment = moment(newMoment).subtract(tzDifference, 'minutes');
  // lastMoment.round(10, 'milliseconds');
  // let outMoment = moment(lastMoment);
  // let DSTTest1 = moment(lastMoment).startOf('day').add(30, 'minutes');
  // let DSTTest2 = moment(DSTTest1).add(2, 'hours');
  // if(!DSTTest1.isDST() && DSTTest2.isDST()) {
  //   outMoment.add(1, 'hour');
  // }
  // let testForDSTMoment = moment(lastMoment).startOf('day').add(2, 'hours');
  // return lastMoment;
  let OADate = fromOADate(value);
  let OADateString = moment(OADate).format("YYYY-MM-DDTHH:mm:ss.SSS");
  let CorrectedOADate = moment(OADateString);
  return CorrectedOADate;
};

let momentObject = moment;
// let momentFnObject = moment.fn || {};
let momentFnObject = moment.fn;
// .toExcel = moment2excel;
// (moment as any).fn = momentFnObject;
// (moment as any).fn.round        = momentRound       ;
// (moment as any).fn.ceil         = momentCeil        ;
// (moment as any).fn.floor        = momentFloor       ;
// (moment as any).fn.preciseDiff  = mprPreciseDiff    ;
// (moment as any).fn.fromExcel    = excel2moment      ;
// (moment as any).fn.toExcel      = moment2excel      ;
// (moment as any).fn.round        = staticMomentRound ;
// (moment as any).fn.ceil         = staticMomentCeil  ;
// (moment as any).fn.floor        = staticMomentFloor ;
// (moment as any).fromExcel       = excel2moment      ;
// (moment as any).toExcel         = Moment2excel      ;
// (moment as any).preciseDiff     = staticPreciseDiff ;
momentObject.fn = momentFnObject;
momentObject.fn.round          = momentRound               ;
momentObject.fn.ceil           = momentCeil                ;
momentObject.fn.floor          = momentFloor               ;
momentObject.fn.fromExcel      = excel2moment              ;
// momentObject.fn.toExcel        = moment2excel.bind(momentObject.fn)       ;
momentObject.fn.toExcel        = moment2excel              ;
momentObject.fn.getHoursInDate = GetHoursInDate            ;
momentObject.fn.isDSTDate      = IsDSTDate                 ;
momentObject.fn.isDSTStart     = IsDSTStart                ;
momentObject.fn.isDSTEnd       = IsDSTEnd                  ;
momentObject.round             = staticMomentRound         ;
momentObject.ceil              = staticMomentCeil          ;
momentObject.floor             = staticMomentFloor         ;
(momentObject as any).fromExcel         = excel2moment              ;
(momentObject as any).toExcel           = Moment2excel              ;
momentObject.isValid           = staticIsValid             ;
momentObject.getHoursInDate    = staticGetHoursInDate      ;
momentObject.isDSTDate         = staticIsDSTDate           ;
momentObject.isDSTStart        = staticIsDSTStart          ;
momentObject.isDSTEnd          = staticIsDSTEnd            ;

// momentDurationFormatSetup(moment);

// (<any>moment).parseFormat  = parseFormat;
// (moment as any).fn.toExcel = moment2excel;
// (moment as any).fn.fromExcel = excel2moment;
// (moment as any).fromExcel = excel2moment;
// (moment as any).round = momentRound;
// (moment as any).ceil = momentCeil;
// (moment as any).floor = momentFloor;

// // export type Moment = momentRange.MomentRange;
// export type Moment = moment.Moment;
// export type Duration = moment.Duration;
// export type Locale = moment.Locale;
// export type LocaleSpecification = moment.LocaleSpecification;
// export type MomentInput = moment.MomentInput;
// export type MomentRange = momentRange.DateRange;
// export type DateRange = momentRange.DateRange;
// // export type MomentZone = momentTimezone.MomentZone;
// // export type MomentTimezone = momentTimezone.MomentTimezone;
// // export type Twix = Twix;
// // export type TwixStatic = TwixStatic;

// export const momentParseFormat = parseFormat;
// momentMS.momentMS(moment, momentTimezone);
// momentMSPlugin();
// const momentTimezone = moment;
// const msDatePlugin = require('lib/moment-msdate-plugin.js');
// const emoment = extendMoment(Moment);

// export {moment, momentTimezone};
// export {moment, momentTimezone};

declare const window:any;
// date2xl                     : date2xl,
// xl2date                     : xl2date,
// xl2datetime                 : xl2datetime,

export { moment };
// export const parseFormat = momentParseFormat;
// export const momentShortFormat = moShortFormat;
// momentDurationFormat
