export const BASE_URL = "https://api-pls-tuhfa.adminssw.com";
export const USER_PLATFORM_SESSION_VERSION_NUMBER = "1.0";
export const ESTABLISHMENT_TOKEN = "f92dfb74-9cb9-44ad-b5ad-a946c3d1018f"; // Ahmed Omar & AbdElKarim (06/04/2022)

export const DESKTOP_STATUS = false;
export const DESKTOP_LINK = "#";

export const API_DEFULT_TIMEOUT = 60000;
export const API_LONG_TIMEOUT = 86400000;

const HOME_FOOTER_STATUS = false;
const map_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6911.754904190234!2d31.161331800000003!3d29.982951700000015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145845464c6dc685%3A0xeb3d6cd29c15b77e!2sAdmins-Egypt!5e0!3m2!1sen!2sus!4v1650103836683!5m2!1sen!2sus";
const map_STATUS = false;
const faceBook_URL = "https://www.facebook.com/AdminsSystems";
const faceBook_STATUS = false;
const twitter_URL = "https://www.facebook.com/AdminsSystems";
const twitter_STATUS = false;
const linkedin_URL = "https://www.facebook.com/AdminsSystems";
const linkedin_STATUS = false;
const whatsApp_URL = "https://www.facebook.com/AdminsSystems";
const whatsApp_STATUS = false;
const youTube_URL = "https://www.youtube.com/channel/UCxeh_kVUtUCzu2lxgo30vWA";
const youTube_STATUS = false;

const projectAddress1_STATUS = false;
const projectPhone1_STATUS = false;
const projectPhone2_STATUS = false;
const projectPhone3_STATUS = false;
const projectEmail1_STATUS = false;
const projectEmail2_STATUS = false;

export const PAGE_SIZE = 50;
export const IMPOSSIBLE_TOKEN = 0;
export const MAX_ROWS_TEXTAREA = 100;
export const DEFAULT_DIGITS = 2;
export const DEFAULT_DATE = "2000/01/01";

export const SOCIAL = {
  HOME_FOOTER_STATUS,
  map_URL,
  map_STATUS,
  faceBook_URL,
  faceBook_STATUS,
  twitter_URL,
  twitter_STATUS,
  linkedin_URL,
  linkedin_STATUS,
  whatsApp_URL,
  whatsApp_STATUS,
  youTube_URL,
  youTube_STATUS,
};
export const BASIC_CONTACTS = {
  projectAddress1_STATUS,
  projectPhone1_STATUS,
  projectPhone2_STATUS,
  projectPhone3_STATUS,
  projectEmail1_STATUS,
  projectEmail2_STATUS,
};

export const STATUS = {
  SUCCESS: 200, // success operation
  INVALID_TOKEN: 498, //invalid token
  CATCH: 500, // catch
  NO_CONTENT: 204, // no data
  ERROR: 406, // validation
  VERSION: 306, // error version
  INVALID_LOGIN_CODE: 499, // error login code
  NO_INTERNET: 420, // no internet
  NO_RESPONSE: 421, // no response
};

//#region DefaultPages & Languages
export const DEFAULT_PAGES = {
  notLoggedIn: "Home",
  loggedIn: "SettingsOthers",
};

// ##duplicated in functions file
export const LANGUAGES = {
  list: ["ar-EG", "en-US", "und"],
  default: "ar-EG",
  arEG: "ar-EG",
  enUS: "en-US",
  und: "und",
  defaultCountryCode: "+20",
  defaultCountryCodeName: "EG",
};
//#endregion DefaultPages & Languages

//#region layoutDisplaies
export const VIEW_TYPES = {
  default: "table",
  table: "table",
  cards: "cards",
  list: ["table", "cards"],
};
//#endregion layoutDisplaies

//#region News
export const NEWS_MEDIA_TYPES = {
  image: "MTT-1",
  video: "MTT-2",
};
//#endregion News

//#region Reports
export const FILTER_REPORT_TYPES = {
  Default: "Group",
  Group: "Group",
  Place: "Place",
  Employee: "Employee",
  Student: "Student",
  Attendance: "Attendance",
};
//#endregion Reports

export const VALIDATION = {
  MIN_LENGTH_NAME: 3,
  MAX_LENGTH_NAME: 400,
  MIN_LENGTH_TEXT: 0,
  MAX_LENGTH_TEXT: 1000000,
};

export const KEY_CODE = {
  backspace: 8,
  backspaceMob: 229,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
};
