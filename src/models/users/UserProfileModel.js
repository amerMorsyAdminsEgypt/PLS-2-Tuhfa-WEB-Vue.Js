import GeographicalDistribution from "./../settings/settingsOthers/geographicalDistributions/GeographicalDistribution";
import JobGrade from "./../settings/settingsOthers/jobGrades/JobGrade";
import EducationalStage from "./../settings/settingsOthers/educationalStages/EducationalStage";
import Specialty from "./../settings/settingsOthers/specialties/Specialty";

export default class UserProfileModel {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.userProfileToken = "";
    this.userBirthPlaceNameCurrent = "";
    this.userBirthPlaceNameEn = "";
    this.userBirthPlaceNameAr = "";
    this.userBirthPlaceNameUnd = "";
    this.userBirthDateTime = "";
    this.userBirthDateTimeCustomized = "";
    this.userBirthDate = "";
    this.userBirthTime = "";
    this.userAge = "";
    this.militaryStatuseTypeStartDateTime = "";
    this.militaryStatuseTypeStartDateTimeCustomized = "";
    this.militaryStatuseTypeStartDate = "";
    this.militaryStatuseTypeStartTime = "";
    this.militaryStatuseTypeEndDateTime = "";
    this.militaryStatuseTypeEndDateTimeCustomized = "";
    this.militaryStatuseTypeEndDate = "";
    this.militaryStatuseTypeEndTime = "";
    this.militaryStatuseTypeDuration = "";
    this.userAddressCurrent = "";
    this.userAddressEn = "";
    this.userAddressAr = "";
    this.userAddressUnd = "";
    this.userPhone1 = "";
    this.userPhone1CountryCodeName = "";
    this.userPhone1CountryCode = "";
    this.userPhone1WithCC = "";
    this.userPhone1WhatsAppStatus = "";
    this.userPhone2 = "";
    this.userPhone2CountryCodeName = "";
    this.userPhone2CountryCode = "";
    this.userPhone2WithCC = "";
    this.userPhone2WhatsAppStatus = "";
    this.userPhone3 = "";
    this.userPhone3CountryCodeName = "";
    this.userPhone3CountryCode = "";
    this.userPhone3WithCC = "";
    this.userPhone3WhatsAppStatus = "";
    this.userCitizenshipTypeToken = "";
    this.userCitizenshipTypeNameCurrent = "";
    this.userCitizenshipTypeNameEn = "";
    this.userCitizenshipTypeNameAr = "";
    this.userCitizenshipTypeNameUnd = "";
    this.userGenderToken = "";
    this.userGenderNameCurrent = "";
    this.userGenderNameEn = "";
    this.userGenderNameAr = "";
    this.userGenderNameUnd = "";
    this.userEmail = "";
    this.userSocialStatuseNotes = "";
    this.userInsuranceNumber = "";
    this.userBankAccountNumber = "";
    this.userGeneralNotes = "";
    this.fatherDeathTypeToken = "";
    this.fatherDeathTypeNameCurrent = "";
    this.fatherDeathTypeNameEn = "";
    this.fatherDeathTypeNameAr = "";
    this.fatherDeathTypeNameUnd = "";
    this.motherDeathTypeToken = "";
    this.motherDeathTypeNameCurrent = "";
    this.motherDeathTypeNameEn = "";
    this.motherDeathTypeNameAr = "";
    this.motherDeathTypeNameUnd = "";
    this.militaryStatusTypeToken = "";
    this.geographicalDistributionToken = "";
    this.geographicalDistributionData = new GeographicalDistribution();
    this.nationalityCountryToken = "";
    this.socialStatuseToken = "";
    this.insuranceCompanyToken = "";
    this.bankToken = "";
    this.parentsSocialStatusToken = "";
    this.jobGradeToken = "";
    this.jobGradeData = new JobGrade();
    this.userNationalNumber = "";
    this.educationalStageToken = "";
    this.educationalStageData = new EducationalStage();
    this.specialtieToken = "";
    this.specialtieData = new Specialty();
  }
  fillData(data) {
    if (data) {
      this.userProfileToken = data.userProfileToken || "";
      this.userBirthPlaceNameCurrent = data.userBirthPlaceNameCurrent || "";
      this.userBirthPlaceNameEn = data.userBirthPlaceNameEn || "";
      this.userBirthPlaceNameAr = data.userBirthPlaceNameAr || "";
      this.userBirthPlaceNameUnd = data.userBirthPlaceNameUnd || "";
      this.userBirthDateTime = data.userBirthDateTime || "";
      this.userBirthDateTimeCustomized = data.userBirthDateTimeCustomized || "";
      this.userBirthDate = data.userBirthDate || "";
      this.userBirthTime = data.userBirthTime || "";
      this.userAge = data.userAge || "";
      this.militaryStatuseTypeStartDateTime =
        data.militaryStatuseTypeStartDateTime || "";
      this.militaryStatuseTypeStartDateTimeCustomized =
        data.militaryStatuseTypeStartDateTimeCustomized || "";
      this.militaryStatuseTypeStartDate =
        data.militaryStatuseTypeStartDate || "";
      this.militaryStatuseTypeStartTime =
        data.militaryStatuseTypeStartTime || "";
      this.militaryStatuseTypeEndDateTime =
        data.militaryStatuseTypeEndDateTime || "";
      this.militaryStatuseTypeEndDateTimeCustomized =
        data.militaryStatuseTypeEndDateTimeCustomized || "";
      this.militaryStatuseTypeEndDate = data.militaryStatuseTypeEndDate || "";
      this.militaryStatuseTypeEndTime = data.militaryStatuseTypeEndTime || "";
      this.militaryStatuseTypeDuration = data.militaryStatuseTypeDuration || "";
      this.userAddressCurrent = data.userAddressCurrent || "";
      this.userAddressEn = data.userAddressEn || "";
      this.userAddressAr = data.userAddressAr || "";
      this.userAddressUnd = data.userAddressUnd || "";
      this.userPhone1 = data.userPhone1 || "";
      this.userPhone1CountryCodeName = data.userPhone1CountryCodeName || "";
      this.userPhone1CountryCode = data.userPhone1CountryCode || "";
      this.userPhone1WithCC = data.userPhone1WithCC || "";
      this.userPhone1WhatsAppStatus = data.userPhone1WhatsAppStatus || "";
      this.userPhone2 = data.userPhone2 || "";
      this.userPhone2CountryCodeName = data.userPhone2CountryCodeName || "";
      this.userPhone2CountryCode = data.userPhone2CountryCode || "";
      this.userPhone2WithCC = data.userPhone2WithCC || "";
      this.userPhone2WhatsAppStatus = data.userPhone2WhatsAppStatus || "";
      this.userPhone3 = data.userPhone3 || "";
      this.userPhone3CountryCodeName = data.userPhone3CountryCodeName || "";
      this.userPhone3CountryCode = data.userPhone3CountryCode || "";
      this.userPhone3WithCC = data.userPhone3WithCC || "";
      this.userPhone3WhatsAppStatus = data.userPhone3WhatsAppStatus || "";
      this.userCitizenshipTypeToken = data.userCitizenshipTypeToken || "";
      this.userCitizenshipTypeNameCurrent =
        data.userCitizenshipTypeNameCurrent || "";
      this.userCitizenshipTypeNameEn = data.userCitizenshipTypeNameEn || "";
      this.userCitizenshipTypeNameAr = data.userCitizenshipTypeNameAr || "";
      this.userCitizenshipTypeNameUnd = data.userCitizenshipTypeNameUnd || "";
      this.userGenderToken = data.userGenderToken || "";
      this.userGenderNameCurrent = data.userGenderNameCurrent || "";
      this.userGenderNameEn = data.userGenderNameEn || "";
      this.userGenderNameAr = data.userGenderNameAr || "";
      this.userGenderNameUnd = data.userGenderNameUnd || "";
      this.userEmail = data.userEmail || "";
      this.userSocialStatuseNotes = data.userSocialStatuseNotes || "";
      this.userInsuranceNumber = data.userInsuranceNumber || "";
      this.userBankAccountNumber = data.userBankAccountNumber || "";
      this.userGeneralNotes = data.userGeneralNotes || "";
      this.fatherDeathTypeToken = data.fatherDeathTypeToken || "";
      this.fatherDeathTypeNameCurrent = data.fatherDeathTypeNameCurrent || "";
      this.fatherDeathTypeNameEn = data.fatherDeathTypeNameEn || "";
      this.fatherDeathTypeNameAr = data.fatherDeathTypeNameAr || "";
      this.fatherDeathTypeNameUnd = data.fatherDeathTypeNameUnd || "";
      this.motherDeathTypeToken = data.motherDeathTypeToken || "";
      this.motherDeathTypeNameCurrent = data.motherDeathTypeNameCurrent || "";
      this.motherDeathTypeNameEn = data.motherDeathTypeNameEn || "";
      this.motherDeathTypeNameAr = data.motherDeathTypeNameAr || "";
      this.motherDeathTypeNameUnd = data.motherDeathTypeNameUnd || "";
      this.militaryStatusTypeToken = data.militaryStatusTypeToken || "";
      this.geographicalDistributionToken =
        data.geographicalDistributionToken || "";
      this.geographicalDistributionData.fillData(
        data.geographicalDistributionData
      );
      this.nationalityCountryToken = data.nationalityCountryToken || "";
      this.socialStatuseToken = data.socialStatuseToken || "";
      this.insuranceCompanyToken = data.insuranceCompanyToken || "";
      this.bankToken = data.bankToken || "";
      this.parentsSocialStatusToken = data.parentsSocialStatusToken || "";
      this.jobGradeToken = data.jobGradeToken || "";
      this.jobGradeData.fillData(data.jobGradeData);
      this.userNationalNumber = data.userNationalNumber || "";
      this.educationalStageToken = data.educationalStageToken || "";
      this.educationalStageData.fillData(data.educationalStageData);
      this.specialtieToken = data.specialtieToken || "";
      this.specialtieData.fillData(data.specialtieData);
    } else {
      this.setInitialValue();
    }
  }
}
