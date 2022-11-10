import {
  STATUS,
  BASE_URL,
  LANGUAGES,
  VIEW_TYPES,
  DEFAULT_DIGITS,
} from "./constants";
import { USER_TYPE, LINK_TARGETS } from "./constantLists";
import store from "./../store";
import i18n from "./../i18n";
import LogoImg from "./../assets/images/logo.png";

//#region Validation
export const validNumber = (number) => {
  var re = /^[0-9]*$/;
  return re.test(number);
};
export const validEmail = (email) => {
  var re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
export const isNameAr = (name) => {
  // loop throw data and trim
  const NAME_PATTERN_AR = /^[ \u0600-\u065F\u066A-\u06EF\u06FA-\u06FF0-9-_]+$/;
  return NAME_PATTERN_AR.test(name);
};
export const isTextAr = (text) => {
  // loop throw data and trim
  const TEXT_PATTERN_AR =
    /^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF][ \u0600-\u065F\u066A-\u06EF\u06FA-\u06FF0-9-،._\\/\n\r\t(){}'\\" ]+$/;
  return TEXT_PATTERN_AR.test(text);
};
export const isTextEn = (text) => {
  // loop throw data and trim
  const TEXT_PATTERN_EN = /^[a-zA-Z0-9-،._\\/\n\r\t(){}'\\" ]/;
  return TEXT_PATTERN_EN.test(text);
};
export const isNameEN = (name) => {
  // loop throw data and trim
  const NAME_PATTERN_EN = /^[a-zA-Z0-9\s]+$/;
  return NAME_PATTERN_EN.test(name);
};

export const isLessThan = (val, len) => {
  // loop throw data and trim
  return val.length < len;
};
export const isGreaterThan = (val, len) => {
  // loop throw data and trim
  return val.length > len;
};
//#endregion Validation

//#region Date & Time
export const date2slash = (date) => {
  if (date.indexOf("-") > -1) return date.replace(/-/g, "/");
  else return date;
};
export const date2dash = (date) => {
  if (date.indexOf("/") > -1) return date.replace(/\//g, "-");
  else return date;
};
export const timeTo12 = (time = "") => {
  if (time.length > 1) {
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? " am" : " pm"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
    time[0] = time[0] < 10 ? "0" + time[0] : time[0];
    // time[3] = ""; hide seconds
    return time.join("");
  }
  return time;
};
export const timeTo24 = (time = "") => {
  if (time.length > 1) {
    const [theTime, modifier] = time.split(" ");
    let [hours, minutes, seconds] = theTime.split(":");

    if (hours == "12") {
      hours = "00";
    }
    if (modifier == "PM" || modifier == "pm") {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}:${seconds}`;
  }
  return time;
};
export const timeToAr = (time) => {
  if (time.indexOf("AM") > -1) return time.replace(/AM/g, "ص");
  else if (time.indexOf("PM") > -1) return time.replace(/PM/g, "م");
  else return time;
};
export const timeToEn = (time) => {
  if (time.indexOf("ص") > -1) return time.replace(/ص/g, "AM");
  else if (time.indexOf("م") > -1) return time.replace(/م/g, "PM");
  else return time;
};
export const timeToLang = (time, lang = LANGUAGES.default) => {
  if (lang == LANGUAGES.und) {
    lang = LANGUAGES.default;
  }

  if (lang == LANGUAGES.arEG && time.indexOf("AM") > -1)
    return time.replace(/AM/i, "ص");
  else if (lang == LANGUAGES.arEG && time.indexOf("PM") > -1)
    return time.replace(/PM/i, "م");
  else if (lang == LANGUAGES.arEG && time.indexOf("am") > -1)
    return time.replace(/am/i, "ص");
  else if (lang == LANGUAGES.arEG && time.indexOf("pm") > -1)
    return time.replace(/pm/i, "م");
  else if (lang == LANGUAGES.enUS && time.indexOf("ص") > -1)
    return time.replace(/ص/i, "AM");
  else if (lang == LANGUAGES.enUS && time.indexOf("م") > -1)
    return time.replace(/م/i, "PM");
  else return time;
};
export const getTimeFormatInMinSec = (seconds = "", minutes = "") => {
  seconds = seconds.toString().length == 1 ? `0${seconds}` : seconds;
  minutes = minutes.toString().length == 1 ? `0${minutes}` : minutes;
  let string = `${minutes}:${seconds}`;
  return string;
};

export const convertValueToMilliSeconds = (value, convertFrom) => {
  /*
  convertFrom :
  1 => Seconds case
  2 => Minutes case
  3 => Hours case
  4 => Days case
  */
  let response = {
    data: {
      status: STATUS.ERROR,
      msg: i18n.t("failedOperation"),
      data: "",
    },
  };
  value = value == "" || value == undefined ? 0 : value;
  if (isNaN(value)) {
    response.data.msg = value + " " + i18n.t("mustBeNumber");
    return response;
  }
  value = parseFloat(value);
  if (!Number.isInteger(value)) {
    response.data.msg = value + " " + i18n.t("mustBeInteger");
    return response;
  }
  switch (convertFrom) {
    case 1:
      if (value < 0 || value > 59) {
        response.data.msg =
          value + " " + i18n.t("mustBeGreaterThan0AndLessThan59");
        return response;
      }
      response.data.data = value * 1000;
      break;
    case 2:
      if (value < 0 || value > 59) {
        response.data.msg =
          value + " " + i18n.t("mustBeGreaterThan0AndLessThan59");
        return response;
      }
      response.data.data = value * 60 * 1000;
      break;
    case 3:
      if (value < 0 || value > 23) {
        response.data.msg =
          value + " " + i18n.t("mustBeGreaterThan0AndLessThan23");
        return response;
      }
      response.data.data = value * 60 * 60 * 1000;
      break;
    case 4:
      response.data.data = value * 24 * 60 * 60 * 1000;
      break;
    default:
      return response;
  }
  response.data.status = STATUS.SUCCESS;
  response.data.msg = i18n.t("successOperation");
  return response;
};
export const convertToMilliSeconds = (seconds, minutes, hours, days) => {
  let response = {
    data: {
      status: STATUS.SUCCESS,
      msg: i18n.t("successOperation"),
      data: "",
    },
  };
  let check1 = convertValueToMilliSeconds(seconds, 1);
  if (check1.data.status != STATUS.SUCCESS) return check1;

  let check2 = convertValueToMilliSeconds(minutes, 2);
  if (check2.data.status != STATUS.SUCCESS) return check2;

  let check3 = convertValueToMilliSeconds(hours, 3);
  if (check3.data.status != STATUS.SUCCESS) return check3;

  let check4 = convertValueToMilliSeconds(days, 4);
  if (check4.data.status != STATUS.SUCCESS) return check4;

  response.data.data =
    check1.data.data + check2.data.data + check3.data.data + check4.data.data;
  return response;
};
export const convertMilliSecondsToTime = (value) => {
  let response = {
    data: {
      status: STATUS.ERROR,
      msg: i18n.t("failedOperation"),
      data: "",
    },
  };
  value = value == "" || value == undefined ? 0 : value;
  if (isNaN(value)) {
    value = 0;
  }
  value = parseFloat(value);
  if (!Number.isInteger(value)) {
    value = 0;
  }
  if (value < 0) value = 0;

  var days = Math.floor(value / (24 * 60 * 60 * 1000));
  var remainderOfDays = value % (24 * 60 * 60 * 1000);
  var hours = Math.floor(remainderOfDays / (60 * 60 * 1000));
  var remainderOfHours = remainderOfDays % (60 * 60 * 1000);
  var minutes = Math.floor(remainderOfHours / (60 * 1000));
  var remainderOfMinutes = remainderOfHours % (60 * 1000);
  var seconds = Math.round(remainderOfMinutes / 1000);

  var string = `${days} ${i18n.t("days")}, `;
  string += `${hours} ${i18n.t("hours")}, `;
  string += `${minutes} ${i18n.t("minutes")}, `;
  string += `${seconds} ${i18n.t("seconds")}`;
  let data = {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    string: string,
  };

  response.data.status = STATUS.SUCCESS;
  response.data.msg = i18n.t("successOperation");
  response.data.data = data;
  return response;
};
export const convertTimeAndDaysToString = (seconds, minutes, hours, days) => {
  let response = {
    data: {
      status: STATUS.SUCCESS,
      msg: i18n.t("successOperation"),
      data: "",
    },
  };
  seconds = seconds == "" || seconds == undefined ? 0 : seconds;
  if (isNaN(seconds)) seconds = 0;
  seconds = parseFloat(seconds);
  if (seconds < 0) seconds = 0;

  minutes = minutes == "" || minutes == undefined ? 0 : minutes;
  if (isNaN(minutes)) minutes = 0;
  minutes = parseFloat(minutes);
  if (minutes < 0) minutes = 0;

  hours = hours == "" || hours == undefined ? 0 : hours;
  if (isNaN(hours)) hours = 0;
  hours = parseFloat(hours);
  if (hours < 0) hours = 0;

  days = days == "" || days == undefined ? 0 : days;
  if (isNaN(days)) days = 0;
  days = parseFloat(days);
  if (days < 0) days = 0;

  var string = `${days} ${i18n.t("days")}, `;
  string += `${hours} ${i18n.t("hours")}, `;
  string += `${minutes} ${i18n.t("minutes")}, `;
  string += `${seconds} ${i18n.t("seconds")}`;
  let data = {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    string: string,
  };

  response.data.data = data;
  return response;
};
export const getDateAndTime = (dateTime) => {
  let dateAndTime = dateTime.split(" ");
  let date = dateAndTime[0];
  let time = dateAndTime[1] + dateAndTime[2] + dateAndTime[3];
  let date_time = {
    date,
    time,
  };
  return date_time;
};
export const setDateAndTime = (date, time) => {
  if (date && time) {
    return `${date} ${time}`;
  } else {
    return ``;
  }
};

export const getDayOfDate = (date = "") => {
  let dayNumber = "";
  if (date) dayNumber = new Date(date).getDay();
  else dayNumber = new Date().getDay();

  let day = "";
  if (dayNumber == 0) day = i18n.t("daysOfWeek.Sunday");
  else if (dayNumber == 1) day = i18n.t("daysOfWeek.Monday");
  else if (dayNumber == 2) day = i18n.t("daysOfWeek.Tuesday");
  else if (dayNumber == 3) day = i18n.t("daysOfWeek.Wednesday");
  else if (dayNumber == 4) day = i18n.t("daysOfWeek.Thursday");
  else if (dayNumber == 5) day = i18n.t("daysOfWeek.Friday");
  else if (dayNumber == 6) day = i18n.t("daysOfWeek.Saturday");
  return day;
};
export const getDayTokenOfDate = (date = "") => {
  let listDaysOfWeekData = [];
  let dayNumber = new Date().getDay();
  if (date) dayNumber = new Date(date).getDay();
  let day = "";

  if (store.getters.constantLists) {
    listDaysOfWeekData = store.getters.constantLists.listDaysOfWeekData;
  } else {
    listDaysOfWeekData = [];
  }

  if (listDaysOfWeekData.length > 0) {
    if (dayNumber == 0) day = listDaysOfWeekData[1].itemToken;
    else if (dayNumber == 1) day = listDaysOfWeekData[2].itemToken;
    else if (dayNumber == 2) day = listDaysOfWeekData[3].itemToken;
    else if (dayNumber == 3) day = listDaysOfWeekData[4].itemToken;
    else if (dayNumber == 4) day = listDaysOfWeekData[5].itemToken;
    else if (dayNumber == 5) day = listDaysOfWeekData[6].itemToken;
    else if (dayNumber == 6) day = listDaysOfWeekData[0].itemToken;
  }
  return day;
};
export const dateWithLang = (date, lang = LANGUAGES.default) => {
  let theDate = new Date(date);
  let year = theDate.getFullYear();
  let month = theDate.getMonth() + 1;
  let day = theDate.getDate();

  lang = getValidLanguage(lang, true);
  if (lang == LANGUAGES.enUS) {
    return `${year}/${month}/${day}`;
  }

  switch (lang) {
    case LANGUAGES.arEG:
      return `${day}/${month}/${year}`;
    case LANGUAGES.enUS:
      return `${year}/${month}/${day}`;
    default:
      return "";
  }
};
// export const formateDateTimeLang = (date, time, lang = LANGUAGES.default) => {
//   if (date && time)
//     return (
//       getDayOfDate(date) +
//       " " +
//       dateWithLang(date, lang) +
//       " - " +
//       timeToLang(time, lang)
//     );
//   // return (`${date} - ${time}`);
//   else return i18n.t("notFound");
// };
export const formateDateTimeLang = (date, time) => {
  if (date && time) return `${date} - ${time}`;
  else return i18n.t("notFound");
};
export const getObjectOfDateTime = (dateTime = "") => {
  let response = {
    dateTimeUTC: "",
    dateTime: "",
    dateTime12: "",
    date: "",
    time: "",
    time12: "",
    timeCustomized: "",
  };

  // let theDateTime = dateTime ? new Date(dateTime) : new Date();
  let theDateTime = new Date(dateTime);
  if (!dateTime || theDateTime == "Invalid Date") return response;

  let year = theDateTime.getFullYear();
  let month = theDateTime.getMonth() + 1;
  let day = theDateTime.getDate();
  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  let hours = theDateTime.getHours();
  let minutes = theDateTime.getMinutes();
  let seconds = theDateTime.getSeconds();
  let m = "AM";
  let hours12;
  if (hours >= 12) {
    m = "PM";
    hours12 = hours % 12 < 10 ? `0${hours % 12}` : hours % 12;
  } else {
    hours12 = hours % 12 < 10 ? `0${hours}` : hours;
  }
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  let date = `${year}/${month}/${day}`;
  let time24 = `${hours}:${minutes}:${seconds}`;
  let time12 = `${hours12}:${minutes}:${seconds} ${m}`;
  let timeCustomized = `${hours12}:${minutes} ${m}`;
  let fullDateTime = `${date} ${time24}`;
  let fullDateTime12 = `${date} ${time12}`;

  response.dateTimeUTC = theDateTime;
  response.dateTime = fullDateTime;
  response.dateTime12 = fullDateTime12;
  response.date = date;
  response.time = time24;
  response.time12 = time12;
  response.timeCustomized = timeCustomized;
  return response;
};

export const getDay = (shiftDaysNumber = 0) => {
  let date = new Date();
  const day = new Date(date.getTime());
  day.setDate(date.getDate() + shiftDaysNumber);

  return day;
};

export const getYearsMonthsDaysFromDays = (numberOfDays) => {
  let response = {
    years: 0,
    months: 0,
    days: 0,
  };
  if (numberOfDays) {
    response.years = Math.floor(numberOfDays / 365);
    response.months = Math.floor((numberOfDays % 365) / 30);
    response.days = Math.floor((numberOfDays % 365) % 30);
  }
  return response;
};
//#endregion Date & Time

//#region General
export const setDataMultiLang = (lang, dataAr, dataEn, dataUnd = "") => {
  if (lang == LANGUAGES.arEG) return dataAr;
  else if (lang == LANGUAGES.enUS) return dataEn;
  else if (lang == LANGUAGES.und) return dataUnd;
  else return "";
};
export const isDataExist = (data) => {
  return data || data === 0 ? data : i18n.t("notFound");
};
export const moneyFormat = (money) => {
  return (typeof money !== "undefined" ? money : 0) + i18n.t("EGP");
};
export const numberToAr = (number) => {
  if (number.toString().indexOf("0") > -1)
    number = number.toString().replace(/0/g, "٠");
  if (number.toString().indexOf("1") > -1)
    number = number.toString().replace(/1/g, "١");
  if (number.toString().indexOf("2") > -1)
    number = number.toString().replace(/2/g, "٢");
  if (number.toString().indexOf("3") > -1)
    number = number.toString().replace(/3/g, "٣");
  if (number.toString().indexOf("4") > -1)
    number = number.toString().replace(/4/g, "٤");
  if (number.toString().indexOf("5") > -1)
    number = number.toString().replace(/5/g, "٥");
  if (number.toString().indexOf("6") > -1)
    number = number.toString().replace(/6/g, "٦");
  if (number.toString().indexOf("7") > -1)
    number = number.toString().replace(/7/g, "٧");
  if (number.toString().indexOf("8") > -1)
    number = number.toString().replace(/8/g, "٨");
  if (number.toString().indexOf("9") > -1)
    number = number.toString().replace(/9/g, "٩");
  return number;
};
export const numberToEn = (number) => {
  if (number.toString().indexOf("٠") > -1)
    number = number.toString().replace(/٠/g, "0");
  if (number.toString().indexOf("١") > -1)
    number = number.toString().replace(/١/g, "1");
  if (number.toString().indexOf("٢") > -1)
    number = number.toString().replace(/٢/g, "2");
  if (number.toString().indexOf("٣") > -1)
    number = number.toString().replace(/٣/g, "3");
  if (number.toString().indexOf("٤") > -1)
    number = number.toString().replace(/٤/g, "4");
  if (number.toString().indexOf("٥") > -1)
    number = number.toString().replace(/٥/g, "5");
  if (number.toString().indexOf("٦") > -1)
    number = number.toString().replace(/٦/g, "6");
  if (number.toString().indexOf("٧") > -1)
    number = number.toString().replace(/٧/g, "7");
  if (number.toString().indexOf("٨") > -1)
    number = number.toString().replace(/٨/g, "8");
  if (number.toString().indexOf("٩") > -1)
    number = number.toString().replace(/٩/g, "9");
  return number;
};
export const getDeviceName = () => {
  return navigator.userAgent;
};
export const getBrowserName = () => {
  let userAgent = navigator.userAgent;

  if (userAgent.includes("Firefox") && !userAgent.includes("Seamonkey"))
    return "Firefox";
  else if (userAgent.includes("Seamonkey")) return "Seamonkey";
  else if (userAgent.includes("OPR") || userAgent.includes("Opera"))
    return "Opera";
  else if (userAgent.includes("MSIE") || userAgent.includes("Trident"))
    return "Internet Explorer";
  else if (userAgent.includes("Chrome") && !userAgent.includes("Chromium"))
    return "Chrome";
  else if (userAgent.includes("Chromium")) return "Chromium";
  else if (
    userAgent.includes("Safari") &&
    (!userAgent.includes("Chrome") || !userAgent.includes("Chromium"))
  )
    return "Safari";
  else return "Unkonwn";
};
export const checkDeviceIsMobile = () => {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    return true;
  } else {
    return false;
  }
};
export const checkIfImageExists = (url, callback) => {
  const img = new Image();
  img.src = url;
  if (img.complete) {
    callback(true);
  } else {
    img.onload = () => callback(true);
    img.onerror = () => callback(false);
  }
};

export const checkViewType = (viewType) => {
  switch (viewType) {
    case VIEW_TYPES.table:
      return VIEW_TYPES.table;
    case VIEW_TYPES.cards:
      return VIEW_TYPES.cards;
    default:
      return VIEW_TYPES.default;
  }
};
export const checkPrivilege = (privilegeStatus, userTypeToken = "") => {
  try {
    let theUserTypeToken =
      userTypeToken == ""
        ? store.getters.userPersonalData.userTypeToken
        : userTypeToken;

    return theUserTypeToken == USER_TYPE.AdminsEgypt || privilegeStatus == true
      ? true
      : false;
  } catch (error) {
    return false;
  }
};

export const objectToFormData = (object = {}) => {
  let form_data = new FormData();

  for (let key in object) {
    if (typeof object[key] == "object") {
      if (Array.isArray(object[key])) {
        for (let arrKey in object[key]) {
          if (typeof object[key][arrKey] == "object") {
            for (let objKey in object[key][arrKey]) {
              form_data.append(
                `${key}[${arrKey}].${objKey}`,
                object[key][arrKey][objKey]
              );
            }
          } else {
            form_data.append(`${key}[${arrKey}]`, object[key][arrKey]);
          }
        }
      } else if (object[key] == null) {
        // nothing
      } else if (object[key] instanceof File) {
        // (object[key] instanceof File) OR (typeof object[key].name == "string")
        form_data.append(key, object[key]);
      } else {
        for (let objKey in object[key]) {
          form_data.append(`${key}.${objKey}`, object[key][objKey]);
        }
      }
    } else {
      form_data.append(key, object[key]);
    }
  }
  return form_data;
};

export const DEFAULT_QUERY_SELECTORS = {
  appContent: ".app-content",
  bottomSheet: ".bottom-sheet__content-data",
};
export const scrollToTop = (selectors = "") => {
  const allSelectors = document.querySelectorAll(selectors);
  if (allSelectors != undefined && allSelectors.length != 0) {
    allSelectors.forEach(function (item) {
      item.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
};
export const appContentScrollToTop = () => {
  scrollToTop(DEFAULT_QUERY_SELECTORS.appContent);
};
export const bottomSheetScrollToTop = () => {
  scrollToTop(DEFAULT_QUERY_SELECTORS.bottomSheet);
};
export const checkOnlineStatus = () => {
  return navigator.onLine;
  // const checkOnlineStatus = async () => {
  //   try {
  //     const online = await fetch("/1pixel.png");
  //     return online.status >= 200 && online.status < 300; // either true or false
  //   } catch (err) {
  //     return false; // definitely offline
  //   }
  // };
};

export const approximate = (num, digits = DEFAULT_DIGITS) => {
  return parseFloat(num.toFixed(digits));
};
//#endregion General

//#region lang & theme
export const getValidLanguage = (lang, withoutUndLang = false) => {
  switch (lang) {
    case LANGUAGES.arEG:
      return LANGUAGES.arEG;
    case LANGUAGES.enUS:
      return LANGUAGES.enUS;
    case LANGUAGES.und:
      if (withoutUndLang == true) return LANGUAGES.default;
      else return LANGUAGES.und;
    case LANGUAGES.default:
    default:
      return LANGUAGES.default;
  }
};
export const setLanguage = (language = LANGUAGES.default) => {
  language = getValidLanguage(language, false);
  localStorage.setItem("userLanguage", language);
  window.location.reload();
};
export const getLanguage = () => {
  let appLanguage = localStorage.getItem("userLanguage");
  return getValidLanguage(appLanguage, false);
};
export const getUserAuthorizeToken = () => {
  return store.getters.userAuthorizeToken || "";
};
export const getLinkTarget = () => {
  return store.getters.openLinkIn || LINK_TARGETS.newTab;
};
//#endregion lang & theme

//#region api
export const apiLanguageFormate = (language) => {
  const lang = language.split("-");
  const firstShuncklang = lang[0];

  return firstShuncklang.charAt(0).toUpperCase() + firstShuncklang.slice(1);
};
// export const downloadFileFromServer = (
//   language,
//   userAuthorizeToken,
//   filePath
// ) => {
//   window.open(
//     `${BASE_URL}/General//AutoDwnloadFille?filePath=${filePath}`,
//     "_blank"
//   );
// };
export const viewFileFromServer = (filePath) => {
  window.open(`${BASE_URL}${filePath}`, "_blank");
};
export const fullPathFileFromServer = (filePath, defaultFile = "") => {
  if (filePath) return `${BASE_URL}${filePath}`;
  else if (defaultFile) return defaultFile;
  else return LogoImg;
};
//#endregion api

export const range = (start, stop, step = 1) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

export const numToStrOfXDigits = (number, digits = 1) => {
  if (String(number).length >= digits) {
    return `${number}`;
  } else {
    let zerosString = "";
    for (let i = 0; i < digits - String(number).length; i++) zerosString += "0";
    return `${zerosString}${number}`;
  }
};
