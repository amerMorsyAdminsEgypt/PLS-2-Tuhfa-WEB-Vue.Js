import BaseEntityModel from "./../../general/BaseEntityModel";
import EducationalCategoryInfoData from "./../educationalCategories/EducationalCategoryInfoData";
import EducationalPeriod from "./../educationalPeriods/EducationalPeriod";
import PriceList from "./../../settings/settingsOthers/priceLists/PriceList";
import KnownMethod from "./../../settings/settingsOthers/knownMethods/KnownMethod";
import UserInfoData from "./../../users/UserInfoData";
import ActiveSubscriptionData from "./ActiveSubscriptionData";
import defaultImg from "@/assets/images/EducationalJoiningApplications.svg";

export default class EducationalJoiningApplication extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.sendTo = "";
    this.educationalJoiningApplicationToken = "";
    this.educationalJoiningApplicationNameCurrent = "";
    this.educationalJoiningApplicationDescriptionCurrent = "";
    this.educationalJoiningApplicationDescriptionAr = "";
    this.educationalJoiningApplicationDescriptionEn = "";
    this.educationalJoiningApplicationDescriptionUnd = "";
    this.enrollmentTypeToken = "";
    this.enrollmentTypeNameCurrent = "";
    this.subscriptionTypeToken = "";
    this.subscriptionFromDateTime = "";
    this.subscriptionFromDateTimeCustomized = "";
    this.subscriptionFromDate = "";
    this.subscriptionFromTime = "";
    this.subscriptionToDateTime = "";
    this.subscriptionToDateTimeCustomized = "";
    this.subscriptionToDate = "";
    this.subscriptionToTime = "";
    this.subscriptionTypeNameCurrent = "";
    this.subscriptionRequestSessionsNumber = 0;
    this.relatedTypeToken = "";
    this.relatedTypeNameCurrent = "";
    this.educationalJoiningApplicationImageIsDefault = true;
    this.educationalJoiningApplicationImagePath = "";
    this.educationalJoiningApplicationImageSizeBytes = 0;
    this.educationalJoiningApplicationImageSizeTextCurrent = "";
    this.educationalJoiningApplicationNotes = "";
    this.addedByStudentTokenStatus = false;
    this.userStudentToken = "";
    this.studentNameCurrent = "";
    this.studentNameAr = "";
    this.studentNameEn = "";
    this.studentNameUnd = "";
    this.studentNationalNumber = "";
    this.studentPhoneCountryCode = "";
    this.studentPhoneCountryCodeName = "";
    this.studentPhone = "";
    this.studentPhoneWithCC = "";
    this.studentEmail = "";
    this.joiningDateTime = "";
    this.joiningDataTimeCustomized = "";
    this.joiningData = "";
    this.joiningTime = "";
    this.approvalTypeToken = "";
    this.approvalTypeNameCurrent = "";
    this.approvalDataTime = "";
    this.approvalDataTimeCustomized = "";
    this.approvalData = "";
    this.approvalTime = "";
    this.approvalNote = "";
    this.rejectReasonCurrent = "";
    this.approvalUserToken = "";
    this.approvalUserInfoData = new UserInfoData();
    this.educationalCategoryToken = "";
    this.educationalCategoryData = new EducationalCategoryInfoData();
    this.educationalPeriodToken = "";
    this.educationalPeriodInfoData = new EducationalPeriod();
    this.userStudentInfoData = null;
    this.priceListToken = "";
    this.priceListInfoData = new PriceList();
    this.knownMethodToken = "";
    this.knownMethodData = new KnownMethod();
    this.activeSubscriptionData = new ActiveSubscriptionData();
  }
  fillData(data) {
    this.fillDataBaseEntityModel(data);
    this.mediaFile = "";
    this.educationalJoiningApplicationToken =
      data.educationalJoiningApplicationToken || "";
    this.educationalJoiningApplicationNameCurrent =
      data.educationalJoiningApplicationNameCurrent || "";
    this.educationalJoiningApplicationDescriptionCurrent =
      data.educationalJoiningApplicationDescriptionCurrent || "";
    this.educationalJoiningApplicationDescriptionAr =
      data.educationalJoiningApplicationDescriptionAr || "";
    this.educationalJoiningApplicationDescriptionEn =
      data.educationalJoiningApplicationDescriptionEn || "";
    this.educationalJoiningApplicationDescriptionUnd =
      data.educationalJoiningApplicationDescriptionUnd || "";
    this.enrollmentTypeToken = data.enrollmentTypeToken || "";
    this.enrollmentTypeNameCurrent = data.enrollmentTypeNameCurrent || "";
    this.subscriptionTypeToken = data.subscriptionTypeToken || "";
    this.subscriptionFromDateTime = data.subscriptionFromDateTime || "";
    this.subscriptionFromDateTimeCustomized =
      data.subscriptionFromDateTimeCustomized || "";
    this.subscriptionFromDate = data.subscriptionFromDate || "";
    this.subscriptionFromTime = data.subscriptionFromTime || "";
    this.subscriptionToDateTime = data.subscriptionToDateTime || "";
    this.subscriptionToDateTimeCustomized =
      data.subscriptionToDateTimeCustomized || "";
    this.subscriptionToDate = data.subscriptionToDate || "";
    this.subscriptionToTime = data.subscriptionToTime || "";
    this.subscriptionTypeNameCurrent = data.subscriptionTypeNameCurrent || "";
    this.subscriptionRequestSessionsNumber =
      data.subscriptionRequestSessionsNumber || 0;
    this.relatedTypeToken = data.relatedTypeToken || "";
    this.relatedTypeNameCurrent = data.relatedTypeNameCurrent || "";
    this.educationalJoiningApplicationImageIsDefault =
      data.educationalJoiningApplicationImageIsDefault || true;
    this.educationalJoiningApplicationImagePath =
      data.educationalJoiningApplicationImagePath || "";
    this.educationalJoiningApplicationImageSizeBytes =
      data.educationalJoiningApplicationImageSizeBytes || 0;
    this.educationalJoiningApplicationImageSizeTextCurrent =
      data.educationalJoiningApplicationImageSizeTextCurrent || "";
    this.educationalJoiningApplicationNotes =
      data.educationalJoiningApplicationNotes || "";
    this.addedByStudentTokenStatus = data.addedByStudentTokenStatus || false;
    this.userStudentToken = data.userStudentToken || "";
    this.studentNameCurrent = data.studentNameCurrent || "";
    this.studentNameAr = data.studentNameAr || "";
    this.studentNameEn = data.studentNameEn || "";
    this.studentNameUnd = data.studentNameUnd || "";
    this.studentNationalNumber = data.studentNationalNumber || "";
    this.studentPhoneCountryCode = data.studentPhoneCountryCode || "";
    this.studentPhoneCountryCodeName = data.studentPhoneCountryCodeName || "";
    this.studentPhone = data.studentPhone || "";
    this.studentPhoneWithCC = data.studentPhoneWithCC || "";
    this.studentEmail = data.studentEmail || "";
    this.joiningDateTime = data.joiningDateTime || "";
    this.joiningDataTimeCustomized = data.joiningDataTimeCustomized || "";
    this.joiningData = data.joiningData || "";
    this.joiningTime = data.joiningTime || "";
    this.approvalTypeToken = data.approvalTypeToken || "";
    this.approvalTypeNameCurrent = data.approvalTypeNameCurrent || "";
    this.approvalDataTime = data.approvalDataTime || "";
    this.approvalDataTimeCustomized = data.approvalDataTimeCustomized || "";
    this.approvalData = data.approvalData || "";
    this.approvalTime = data.approvalTime || "";
    this.approvalNote = data.approvalNote || "";
    this.rejectReasonCurrent = data.rejectReasonCurrent || "";
    this.approvalUserToken = data.approvalUserToken || "";
    this.approvalUserInfoData.fillData(data.approvalUserInfoData);
    this.educationalCategoryToken = data.educationalCategoryToken || "";
    this.educationalCategoryData.fillData(data.educationalCategoryData);
    this.educationalPeriodToken = data.educationalPeriodToken || "";
    this.educationalPeriodInfoData.fillData(data.educationalPeriodInfoData);
    this.userStudentInfoData = data.userStudentInfoData || null;
    this.priceListToken = data.priceListToken || "";
    this.priceListInfoData.fillData(data.priceListInfoData);
    this.knownMethodToken = data.knownMethodToken || "";
    this.knownMethodData.fillData(data.knownMethodData);
    this.activeSubscriptionData.fillData(data.activeSubscriptionData);
  }
}
