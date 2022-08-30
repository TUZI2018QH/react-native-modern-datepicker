import {useRef, useState} from 'react';
import {Animated, Easing, I18nManager} from 'react-native';
// import moment from 'moment-jalaali';
import moment from 'moment';

// 里面的字符可以根据自己的需要进行调整
moment.locale('zh-cn', {
    months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
    monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
    weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
    weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
    weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'YYYY-MM-DD',
        LL: 'YYYY年MM月DD日',
        LLL: 'YYYY年MM月DD日Ah点mm分',
        LLLL: 'YYYY年MM月DD日ddddAh点mm分',
        l: 'YYYY-M-D',
        ll: 'YYYY年M月D日',
        lll: 'YYYY年M月D日 HH:mm',
        llll: 'YYYY年M月D日dddd HH:mm'
    },
    meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
    meridiemHour: function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === '凌晨' || meridiem === '早上' ||
            meridiem === '上午') {
            return hour;
        } else if (meridiem === '下午' || meridiem === '晚上') {
            return hour + 12;
        } else {
            // '中午'
            return hour >= 11 ? hour : hour + 12;
        }
    },
    meridiem: function (hour, minute, isLower) {
        const hm = hour * 100 + minute;
        if (hm < 600) {
            return '凌晨';
        } else if (hm < 900) {
            return '早上';
        } else if (hm < 1130) {
            return '上午';
        } else if (hm < 1230) {
            return '中午';
        } else if (hm < 1800) {
            return '下午';
        } else {
            return '晚上';
        }
    },
    calendar: {
        sameDay: '[今天]LT',
        nextDay: '[明天]LT',
        nextWeek: '[下]ddddLT',
        lastDay: '[昨天]LT',
        lastWeek: '[上]ddddLT',
        sameElse: 'L'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
    ordinal: function (number, period) {
        switch (period) {
            case 'd':
            case 'D':
            case 'DDD':
                return number + '日';
            case 'M':
                return number + '月';
            case 'w':
            case 'W':
                return number + '周';
            default:
                return number;
        }
    },
    relativeTime: {
        future: '%s内',
        past: '%s前',
        s: '几秒',
        ss: '%d秒',
        m: '1分钟',
        mm: '%d分钟',
        h: '1小时',
        hh: '%d小时',
        d: '1天',
        dd: '%d天',
        M: '1个月',
        MM: '%d个月',
        y: '1年',
        yy: '%d年'
    },
    week: {
        // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
        dow: 1, // Monday is the first day of the week.
        doy: 4  // The week that contains Jan 4th is the first week of the year.
    }
})


const m = moment();
/* const jalaaliConfigs = {
  dayNames: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'],
  dayNamesShort: ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'],
  monthNames: [
    'فروردین',
    'اردیبهشت',
    'خرداد',
    'تیر',
    'مرداد',
    'شهریور',
    'مهر',
    'آبان',
    'آذر',
    'دی',
    'بهمن',
    'اسفند',
  ],
  selectedFormat: 'jYYYY/jMM/jDD',
  dateFormat: 'jYYYY/jMM/jDD',
  monthYearFormat: 'jYYYY jMM',
  timeFormat: 'HH:mm ',
  hour: 'ساعت',
  minute: 'دقیقه',
  timeSelect: 'انتخاب',
  timeClose: 'بستن',
}; */
const jalaaliConfigs = {
  dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
  monthNames: [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月',
  ],
  selectedFormat: 'YYYY/MM/DD',
  dateFormat: 'YYYY/MM/DD',
  monthYearFormat: 'YYYY MM',
  timeFormat: 'HH:mm',
  hour: '小时',
  minute: '分钟',
  timeSelect: '选择',
  timeClose: '取消',
};
const gregorianConfigs = {
  dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
  monthNames: [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月',
  ],
  selectedFormat: 'YYYY/MM/DD',
  dateFormat: 'YYYY/MM/DD',
  monthYearFormat: 'YYYY MM',
  timeFormat: 'HH:mm',
  hour: '小时',
  minute: '分钟',
  timeSelect: '选择',
  timeClose: '取消',
};

class utils {
  constructor({minimumDate, maximumDate, isGregorian, mode, reverse, configs}) {
    this.data = {
      minimumDate,
      maximumDate,
      isGregorian,
      reverse: reverse === 'unset' ? !isGregorian : reverse,
    };
    this.config = isGregorian ? gregorianConfigs : jalaaliConfigs;
    this.config = {...this.config, ...configs};
    if (mode === 'time' || mode === 'datepicker') {
      this.config.selectedFormat = this.config.dateFormat + ' ' + this.config.timeFormat;
    }
  }

  get flexDirection() {
    return {flexDirection: this.data.reverse ? (I18nManager.isRTL ? 'row' : 'row-reverse') : 'row'};
  }

  getFormated = (date, formatName = 'selectedFormat') => date.format(this.config[formatName]);

  getFormatedDate = (date = new Date(), format = 'YYYY/MM/DD') => moment(date).format(format);

  getTime = (time) => this.getDate(time).format(this.config.timeFormat);

  getToday = () => this.getFormated(m, 'dateFormat');

  getMonthName = (month) => this.config.monthNames[month];

  toPersianNumber = (value) => {
    const {isGregorian} = this.data;
    return isGregorian
      ? this.toEnglish(String(value))
      : String(value).replace(/[0-9]/g, (w) =>
          String.fromCharCode(w.charCodeAt(0) + '۰'.charCodeAt(0) - 48),
        );
  };

  toEnglish = (value) => {
    const charCodeZero = '۰'.charCodeAt(0);
    return value.replace(/[۰-۹]/g, (w) => w.charCodeAt(0) - charCodeZero);
  };

  getDate = (time) => moment(time, this.config.selectedFormat);

  getMonthYearText = (time) => {
    const {isGregorian} = this.data;
    const date = this.getDate(time);
    const year = this.toPersianNumber(isGregorian ? date.year() : date.jYear());
    const month = this.getMonthName(isGregorian ? date.month() : date.jMonth());
    return `${month} ${year}`;
  };

  checkMonthDisabled = (time) => {
    const {minimumDate, maximumDate, isGregorian} = this.data;
    const date = this.getDate(time);
    let disabled = false;
    if (minimumDate) {
      const lastDayInMonth = isGregorian ? date.date(29) : date.jDate(29);
      disabled = lastDayInMonth < this.getDate(minimumDate);
    }
    if (maximumDate && !disabled) {
      const firstDayInMonth = isGregorian ? date.date(1) : date.jDate(1);
      disabled = firstDayInMonth > this.getDate(maximumDate);
    }
    return disabled;
  };

  checkArrowMonthDisabled = (time, next) => {
    const {isGregorian} = this.data;
    const date = this.getDate(time);
    return this.checkMonthDisabled(
      this.getFormated(date.add(next ? -1 : 1, isGregorian ? 'month' : 'jMonth')),
    );
  };

  checkYearDisabled = (year, next) => {
    const {minimumDate, maximumDate, isGregorian} = this.data;
    const y = isGregorian
      ? this.getDate(next ? maximumDate : minimumDate).year()
      : this.getDate(next ? maximumDate : minimumDate).jYear();
    return next ? year >= y : year <= y;
  };

  checkSelectMonthDisabled = (time, month) => {
    const {isGregorian} = this.data;
    const date = this.getDate(time);
    const dateWithNewMonth = isGregorian ? date.month(month) : date.jMonth(month);
    return this.checkMonthDisabled(this.getFormated(dateWithNewMonth));
  };

  validYear = (time, year) => {
    const {minimumDate, maximumDate, isGregorian} = this.data;
    const date = isGregorian ? this.getDate(time).year(year) : this.getDate(time).jYear(year);
    let validDate = this.getFormated(date);
    if (minimumDate && date < this.getDate(minimumDate)) {
      validDate = minimumDate;
    }
    if (maximumDate && date > this.getDate(maximumDate)) {
      validDate = maximumDate;
    }
    return validDate;
  };

  getMonthDays = (time) => {
    const {minimumDate, maximumDate, isGregorian} = this.data;
    let date = this.getDate(time);
    const currentMonthDays = isGregorian
      ? date.daysInMonth()
      : moment.jDaysInMonth(date.jYear(), date.jMonth());
    const firstDay = isGregorian ? date.date(1) : date.jDate(1);
    const dayOfMonth = (firstDay.day() + Number(!isGregorian)) % 7;
    return [
      ...new Array(dayOfMonth),
      ...[...new Array(currentMonthDays)].map((i, n) => {
        const thisDay = isGregorian ? date.date(n + 1) : date.jDate(n + 1);
        let disabled = false;
        if (minimumDate) {
          disabled = thisDay < this.getDate(minimumDate);
        }
        if (maximumDate && !disabled) {
          disabled = thisDay > this.getDate(maximumDate);
        }

        date = this.getDate(time);
        return {
          dayString: this.toPersianNumber(n + 1),
          day: n + 1,
          date: this.getFormated(isGregorian ? date.date(n + 1) : date.jDate(n + 1)),
          disabled,
        };
      }),
    ];
  };

  useMonthAnimation = (activeDate, distance, onEnd = () => null) => {
    const [lastDate, setLastDate] = useState(activeDate);
    const [changeWay, setChangeWay] = useState(null);
    const monthYearAnimation = useRef(new Animated.Value(0)).current;

    const changeMonthAnimation = (type) => {
      setChangeWay(type);
      setLastDate(activeDate);
      monthYearAnimation.setValue(1);
      Animated.timing(monthYearAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.bezier(0.33, 0.66, 0.54, 1),
      }).start(onEnd);
    };

    const shownAnimation = {
      opacity: monthYearAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1],
      }),
      transform: [
        {
          translateX: monthYearAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, changeWay === 'NEXT' ? -distance : distance],
          }),
        },
      ],
    };

    const hiddenAnimation = {
      opacity: monthYearAnimation,
      transform: [
        {
          translateX: monthYearAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [changeWay === 'NEXT' ? distance : -distance, 0],
          }),
        },
      ],
    };

    return [{lastDate, shownAnimation, hiddenAnimation}, changeMonthAnimation];
  };
}

export {utils};
