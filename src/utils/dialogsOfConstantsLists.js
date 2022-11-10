import {
  setDataMultiLang,
  getLanguage,
  fullPathFileFromServer,
} from "./functions";
import store from "./../store";
const CONSTANTS_LISTS = store.getters.constantsListsData;
const LANGUAGE = getLanguage();

import defaultImgTimeZones from "@/assets/images/TimeZones.svg";
import defaultImgDate from "@/assets/images/date.svg";
import defaultImgTime from "@/assets/images/time.svg";

import defaultImgActivationType from "@/assets/images/changeActivationType.svg";
import defaultImgMediaType from "@/assets/images/media.svg";
import defaultImgUserType from "@/assets/images/user.svg";
import defaultImgCitizenship from "@/assets/images/citizenship.svg";
import defaultImgDeathType from "@/assets/images/type.svg";
import defaultImgGender from "@/assets/images/gender.svg";

import defaultImgDaysOfWeek from "@/assets/images/week.svg";
import defaultImgDayWorkStatus from "@/assets/images/DayWorkStatus.svg";
import defaultImgAppointmentTypes from "@/assets/images/AppointmentTypes.svg";
import defaultImgApprovalTypes from "@/assets/images/ApprovalTypes.svg";

import defaultImgPropertyFieldTypes from "@/assets/images/PropertyFieldTypes.svg";
import defaultImgAffiliateOperationTypes from "@/assets/images/AffiliateOperationTypes.svg";
import defaultImgFeesTypes from "@/assets/images/FeesTypes.svg";

import defaultImgEnrollmentTypes from "@/assets/images/EnrollmentTypes.svg";
import defaultImgSubscriptionTypes from "@/assets/images/SubscriptionTypes.svg";
import defaultImgPriorityTypes from "@/assets/images/priorityTypes.svg";
import defaultImgExamTypes from "@/assets/images/ExamTypes.svg";
import defaultImgAttendanceTypes from "@/assets/images/AttendanceTypes.svg";
import defaultImgComplaintScopeType from "@/assets/images/complaint.svg";
import defaultImgAccountTransactionType from "@/assets/images/accountTransactions.svg";
import defaultImgRefundType from "@/assets/images/refund.svg";
import defaultImgClosedStateType from "@/assets/images/type.svg";
import defaultImgTerminationType from "@/assets/images/type.svg";

import defaultImgReplyStatusTypes from "@/assets/images/ReplyStatusTypes.svg";
import defaultImgInterestTypes from "@/assets/images/type.svg";

import defaultImgGradingPlanSlicesType from "@/assets/images/GradingPlans.svg";
import defaultImgShowType from "@/assets/images/eye-show.svg";
import defaultImgComplaintStatusType from "@/assets/images/complaints.svg";
import defaultImgFollowUpSideType from "@/assets/images/complaintFollowUps.svg";
import defaultImgEducationalRatingType from "@/assets/images/educationalRatings.svg";
import defaultImgDebtType from "@/assets/images/debts.svg";
import defaultImgFollowUpType from "@/assets/images/interestFollowUps.svg";
import defaultImgReplyStatusType from "@/assets/images/type.svg";
import defaultImgSystemType from "@/assets/images/systemComponents.svg";
import defaultImgKinShipDegree from "@/assets/images/RelativeRelationTypes.svg";
import defaultImgPlatFormType from "@/assets/images/type.svg";
import defaultImgAuthenticationLoginType from "@/assets/images/type.svg";
import defaultImgCodeInLoginType from "@/assets/images/type.svg";
import defaultImgCountedServiceTransactionType from "@/assets/images/type.svg";
import defaultImgPlaceActivityType from "@/assets/images/type.svg";
import defaultImgPlaceType from "@/assets/images/type.svg";
import defaultImgUserActivityType from "@/assets/images/type.svg";
import defaultImgPriceQuotationsHistoryWorkType from "@/assets/images/type.svg";
import defaultImgQuotationDetailsHistoryWorkType from "@/assets/images/type.svg";
import defaultImgJobOrderHistoryWorkType from "@/assets/images/type.svg";
import defaultImgSalaryCalculationType from "@/assets/images/type.svg";
import defaultImgSalaryCalculationCaseType from "@/assets/images/type.svg";
import defaultImgCalculationType from "@/assets/images/type.svg";
import defaultImgSharedMediaType from "@/assets/images/sharedMediaFolders.svg";

export const getDialogOfConstantList = (options = [], defaultImg = "") => {
  let list = [];
  if (options.length) {
    for (let item in options) {
      list.push({
        value: options[item]["itemToken"],
        text: setDataMultiLang(
          LANGUAGE,
          options[item]["itemNameAr"],
          options[item]["itemNameEn"],
          options[item]["itemNameUnd"]
        ),
        image: fullPathFileFromServer(
          options[item]["itemImagePath"],
          defaultImg
        ),
      });
    }
  }
  return list;
};

//#region UserAppSettings
export const getDialogOfTimeZones = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listTimeZoneInfo,
    defaultImgTimeZones
  );
};
export const getDialogOfDateFormatTypes = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listDateFormatType,
    defaultImgDate
  );
};
export const getDialogOfTimeFormatTypes = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listTimeFormatType,
    defaultImgTime
  );
};
//#endregion UserAppSettings

export const getDialogOfActivationTypes = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listActivationType,
    defaultImgActivationType
  );
};
export const getDialogOfMediaTypes = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listMediaType,
    defaultImgMediaType
  );
};

export const getDialogOfUserTypes = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listUserType,
    defaultImgUserType
  );
};
export const getDialogOfCitizenshipTypes = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listCitizenShipType,
    defaultImgCitizenship
  );
};

export const getDialogOfDeathTypes = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listDeathType,
    defaultImgDeathType
  );
};
export const getDialogOfGender = () => {
  return getDialogOfConstantList(CONSTANTS_LISTS.listGender, defaultImgGender);
};

export const getDialogOfDaysOfWeek = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listDaysOfWeekData,
    defaultImgDaysOfWeek
  );
};
export const getDialogOfDayWorkStatus = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listWorkStatusType,
    defaultImgDayWorkStatus
  );
};
export const getDialogOfAppointmentTypes = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listAppointmentType,
    defaultImgAppointmentTypes
  );
};
export const getDialogOfApprovalTypes = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listApprovalType,
    defaultImgApprovalTypes
  );
};

export const getDialogOfEnrollmentTypes = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listEnrollmentType,
    defaultImgEnrollmentTypes
  );
};
export const getDialogOfSubscriptionTypes = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listSubscriptionType,
    defaultImgSubscriptionTypes
  );
};

export const getDialogOfPropertyFieldTypes = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listPropertyFieldType,
    defaultImgPropertyFieldTypes
  );
};

export const getDialogOfAffiliateOperationTypes = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listAffiliateOperationTypeData,
    defaultImgAffiliateOperationTypes
  );
};
export const getDialogOfFeesTypes = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listFeesType,
    defaultImgFeesTypes
  );
};

export const getDialogOfPriorityScopeType = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listPriorityScopeType,
    defaultImgPriorityTypes
  );
};
export const getDialogOfExamTypes = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listExamType,
    defaultImgExamTypes
  );
};
export const getDialogOfAttendanceTypes = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listAttendanceType,
    defaultImgAttendanceTypes
  );
};

export const getDialogOfComplaintScopeType = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listComplaintScopeType,
    defaultImgComplaintScopeType
  );
};

export const getDialogOfAccountTransactionType = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listAccountTransactionType,
    defaultImgAccountTransactionType
  );
};

export const getDialogOfRefundType = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listRefundType,
    defaultImgRefundType
  );
};

export const getDialogOfGradingPlanSlicesType = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listGradingPlanSlicesType,
    defaultImgGradingPlanSlicesType
  );
};

export const getDialogOfShowType = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listShowType,
    defaultImgShowType
  );
};

export const getDialogOfComplaintStatusType = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listComplaintStatusType,
    defaultImgComplaintStatusType
  );
};

export const getDialogOfFollowUpSideType = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listFollowUpSideType,
    defaultImgFollowUpSideType
  );
};

export const getDialogOfEducationalRatingType = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listEducationalRatingType,
    defaultImgEducationalRatingType
  );
};

export const getDialogOfDebtType = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listDebtType,
    defaultImgDebtType
  );
};

export const getDialogOfFollowUpType = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listFollowUpType,
    defaultImgFollowUpType
  );
};

export const getDialogOfReplyStatusType = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listReplyStatusType,
    defaultImgReplyStatusType
  );
};

export const getDialogOfSystemType = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listSystemType,
    defaultImgSystemType
  );
};

export const getDialogOfKinShipDegree = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listKinShipDegree,
    defaultImgKinShipDegree
  );
};

export const getDialogOfPlatFormType = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listPlatFormType,
    defaultImgPlatFormType
  );
};

export const getDialogOfAuthenticationLoginType = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listAuthenticationLoginType,
    defaultImgAuthenticationLoginType
  );
};

export const getDialogOfCodeInLoginType = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listCodeInLoginType,
    defaultImgCodeInLoginType
  );
};

export const getDialogOfCountedServiceTransactionType = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listCountedServiceTransactionType,
    defaultImgCountedServiceTransactionType
  );
};

export const getDialogOfPlaceActivityType = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listPlaceActivityType,
    defaultImgPlaceActivityType
  );
};

export const getDialogOfPlaceType = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listPlaceType,
    defaultImgPlaceType
  );
};

export const getDialogOfUserActivityType = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listUserActivityType,
    defaultImgUserActivityType
  );
};

export const getDialogOfPriceQuotationsHistoryWorkType = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listPriceQuotationHistoryWorkType,
    defaultImgPriceQuotationsHistoryWorkType
  );
};

export const getDialogOfQuotationDetailsHistoryWorkType = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listQuotationDetailsHistoryWorkType,
    defaultImgQuotationDetailsHistoryWorkType
  );
};

export const getDialogOfJobOrderHistoryWorkType = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listJobOrderHistoryWorkType,
    defaultImgJobOrderHistoryWorkType
  );
};

export const getDialogOfClosedStateType = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listClosedStateType,
    defaultImgClosedStateType
  );
};
export const getDialogOfTerminationType = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listTerminationType,
    defaultImgTerminationType
  );
};

export const getDialogOfReplyStatusTypes = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listReplyStatusType,
    defaultImgReplyStatusTypes
  );
};
export const getDialogOfInterestTypes = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listInterestType,
    defaultImgInterestTypes
  );
};

export const getDialogOfSalaryCalculationType = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listSalaryCalculationType,
    defaultImgSalaryCalculationType
  );
};
export const getDialogOfSalaryCalculationCaseType = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listSalaryCalculationCaseType,
    defaultImgSalaryCalculationCaseType
  );
};
export const getDialogOfCalculationType = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listCalculationType,
    defaultImgCalculationType
  );
};
export const getDialogOfSharedMediaType = () => {
  return getDialogOfConstantList(
    CONSTANTS_LISTS.listSharedMediaType,
    defaultImgSharedMediaType
  );
};
