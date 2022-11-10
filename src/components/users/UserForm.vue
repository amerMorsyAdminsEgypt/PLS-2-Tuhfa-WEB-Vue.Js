<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="user.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(user.userImagePath, user.defaultImg)
          "
          :deleteFileStatus="deleteFileStatus && !user.userImageIsDefault"
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <template>
            <CustomInput
              :className="'col-md-6'"
              :id="`${id}-userNameAr`"
              :errors="errors_userNameAr"
              :value="user.userNameAr"
              v-on:changeValue="
                user.userNameAr = $event;
                $v.user.userNameAr.$touch();
              "
              :title="$t('Users.nameAr')"
              :imgName="'users.svg'"
              :disabledStatus="disabledStatus"
            />
            <CustomInput
              :className="'col-md-6'"
              :id="`${id}-userNameEn`"
              :errors="errors_userNameEn"
              :value="user.userNameEn"
              v-on:changeValue="
                user.userNameEn = $event;
                $v.user.userNameEn.$touch();
              "
              :title="$t('Users.nameEn')"
              :imgName="'users.svg'"
              :disabledStatus="disabledStatus"
            />
            <CustomInput
              :className="'col-md-6'"
              :id="`${id}-userNameUnd`"
              :value="user.userNameUnd"
              v-on:changeValue="user.userNameUnd = $event"
              :title="$t('Users.nameUnd')"
              :imgName="'users.svg'"
              :disabledStatus="disabledStatus"
            />
            <CustomPhonePicker
              :className="'col-md-6'"
              :id="`${id}-phone`"
              :countryCodeName="user.userPhoneCountryCodeName"
              :countryCode="user.userPhoneCountryCode"
              :phoneNumber="user.userPhone"
              :title="$t('Users.phone')"
              :imgName="'phone.svg'"
              v-on:changeValue="setPhone($event)"
            />
            <CustomInput
              :className="'col-md-6'"
              :id="`${id}-email`"
              :errors="errors_userEmail"
              :value="user.userEmail"
              v-on:changeValue="
                user.userEmail = $event;
                $v.user.userEmail.$touch();
              "
              :title="$t('Users.email')"
              :imgName="'email.svg'"
              :disabledStatus="disabledStatus"
            />
            <CustomInput
              :className="'col-md-6'"
              :id="`${id}-userName`"
              :value="user.userName"
              v-on:changeValue="user.userName = $event"
              :title="$t('Users.userName')"
              :imgName="'users.svg'"
              :disabledStatus="disabledStatus"
            />
            <CustomInput
              :className="'col-md-6'"
              :id="`${id}-fullCode`"
              :value="user.fullCode"
              v-on:changeValue="user.fullCode = $event"
              :title="$t('Users.code')"
              :imgName="'code.svg'"
            />
            <CustomSelectBox
              v-if="userTypeToken == USER_TYPE.Employee"
              :className="'col-md-6'"
              :id="`${id}-userActivityTypeToken`"
              :value="user.userActivityTypeToken"
              :options="userActivityTypeTokenOptions"
              v-on:changeValue="user.userActivityTypeToken = $event"
              :title="$t('Users.activityType')"
              :imgName="'activity-types.svg'"
            />
            <CustomSelectBox
              :className="'col-md-6'"
              :id="`${id}-establishmentRoleToken`"
              :value="
                !disabledStatus
                  ? user.establishmentRoleToken
                  : user.establishmentRoleData.establishmentRoleNameCurrent
              "
              :options="establishmentRoleTokenOptions"
              v-on:changeValue="user.establishmentRoleToken = $event"
              :title="$t('EstablishmentRoles.select')"
              :imgName="'type.svg'"
              :disabledStatus="disabledStatus"
            />
            <CustomSelectBox
              :className="'col-md-6'"
              :id="`${id}-userGenderToken`"
              :value="
                !disabledStatus
                  ? user.userProfileData.userGenderToken
                  : user.userProfileData.userGenderNameCurrent
              "
              :options="userGenderTokenOptions"
              v-on:changeValue="user.userProfileData.userGenderToken = $event"
              :title="$t('Users.gender')"
              :imgName="'gender.svg'"
              :disabledStatus="disabledStatus"
            />

            <TextArea
              :className="'col-md-6'"
              :id="`${id}-userBirthPlaceNameAr`"
              :value="user.userProfileData.userBirthPlaceNameAr"
              :title="$t('Users.userBirthPlaceNameAr')"
              :imgName="'address.svg'"
              v-on:changeValue="
                user.userProfileData.userBirthPlaceNameAr = $event
              "
              :disabledStatus="disabledStatus"
            />
            <TextArea
              :className="'col-md-6'"
              :id="`${id}-userBirthPlaceNameEn`"
              :value="user.userProfileData.userBirthPlaceNameEn"
              :title="$t('Users.userBirthPlaceNameEn')"
              :imgName="'address.svg'"
              v-on:changeValue="
                user.userProfileData.userBirthPlaceNameEn = $event
              "
              :disabledStatus="disabledStatus"
            />
            <TextArea
              :className="'col-md-6'"
              :id="`${id}-userBirthPlaceNameUnd`"
              :value="user.userProfileData.userBirthPlaceNameUnd"
              :title="$t('Users.userBirthPlaceNameUnd')"
              :imgName="'address.svg'"
              v-on:changeValue="
                user.userProfileData.userBirthPlaceNameUnd = $event
              "
              :disabledStatus="disabledStatus"
            />
          </template>

          <template>
            <CustomInputPassword
              v-if="submitName != $t('edit')"
              :className="'col-md-6'"
              :id="`${id}-userPassword`"
              :value="user.userPassword"
              v-on:changeValue="user.userPassword = $event"
              :title="$t('Users.password')"
              :imgName="'passwordlock.svg'"
            />

            <DateTimePicker
              class="col-md-6"
              :id="`${id}-userBirthDateTime`"
              type="dateTime"
              :value="user.userProfileData.userBirthDateTime"
              :title="$t('Users.userBirthDateTime')"
              v-on:changeValue="
                user.userProfileData.userBirthDateTime = $event.dateTime
              "
              :language="language"
              :disabledStatus="disabledStatus"
            />
            <template v-if="userTypeToken == USER_TYPE.Student">
              <CustomSelectBox
                :className="'col-md-6'"
                :id="`${id}-educationalStageToken`"
                :value="user.userProfileData.educationalStageToken"
                :options="educationalStageTokenOptions"
                v-on:changeValue="
                  user.userProfileData.educationalStageToken = $event
                "
                :title="$t('EducationalStages.select')"
                :imgName="'educationalStages.svg'"
              />
              <CustomSelectBox
                :className="'col-md-6'"
                :id="`${id}-specialtieToken`"
                :value="user.userProfileData.specialtieToken"
                :options="specialtieTokenOptions"
                v-on:changeValue="user.userProfileData.specialtieToken = $event"
                :title="$t('Specialties.select')"
                :imgName="'specialties.svg'"
              />
            </template>
            <CustomSelectBox
              :className="'col-md-6'"
              :id="`${id}-militaryStatusTypeToken`"
              :value="
                !disabledStatus
                  ? user.userProfileData.militaryStatusTypeToken
                  : user.userProfileData.militaryStatusTypeData
                      .militaryStatusTypeNameCurrent
              "
              :options="militaryStatusTypeTokenOptions"
              v-on:changeValue="
                user.userProfileData.militaryStatusTypeToken = $event
              "
              :title="$t('MilitaryStatusTypes.select')"
              :imgName="'militaryStatus.svg'"
              :disabledStatus="disabledStatus"
            />
            <DateTimePicker
              class="col-md-6"
              :id="`${id}-militaryStatuseTypeStartDateTime`"
              type="dateTime"
              :value="user.userProfileData.militaryStatuseTypeStartDateTime"
              :title="$t('Users.militaryStatuseTypeStartDateTime')"
              v-on:changeValue="
                user.userProfileData.militaryStatuseTypeStartDateTime =
                  $event.dateTime
              "
              :language="language"
              :disabledStatus="disabledStatus"
            />
            <DateTimePicker
              class="col-md-6"
              :id="`${id}-militaryStatuseTypeEndDateTime`"
              type="dateTime"
              :value="user.userProfileData.militaryStatuseTypeEndDateTime"
              :title="$t('Users.militaryStatuseTypeEndDateTime')"
              v-on:changeValue="
                user.userProfileData.militaryStatuseTypeEndDateTime =
                  $event.dateTime
              "
              :language="language"
              :disabledStatus="disabledStatus"
            />
            <TextArea
              :className="'col-md-6'"
              :id="`${id}-userAddressAr`"
              :value="user.userProfileData.userAddressAr"
              :title="$t('Users.addressAr')"
              :imgName="'address.svg'"
              v-on:changeValue="user.userProfileData.userAddressAr = $event"
              :disabledStatus="disabledStatus"
            />
            <TextArea
              :className="'col-md-6'"
              :id="`${id}-userAddressEn`"
              :value="user.userProfileData.userAddressEn"
              :title="$t('Users.addressEn')"
              :imgName="'address.svg'"
              v-on:changeValue="user.userProfileData.userAddressEn = $event"
              :disabledStatus="disabledStatus"
            />
            <TextArea
              :className="'col-md-6'"
              :id="`${id}-userAddressUnd`"
              :value="user.userProfileData.userAddressUnd"
              :title="$t('Users.addressUnd')"
              :imgName="'address.svg'"
              v-on:changeValue="user.userProfileData.userAddressUnd = $event"
              :disabledStatus="disabledStatus"
            />
            <TextArea
              :className="className"
              :id="`${id}-userGeneralNotes`"
              :value="user.userProfileData.userGeneralNotes"
              :title="$t('notes')"
              :imgName="'notes.svg'"
              v-on:changeValue="user.userProfileData.userGeneralNotes = $event"
              :disabledStatus="disabledStatus"
            />

            <BaseTree
              :hierarchySystemTypeFilterToken="hierarchySystemTypeJobGradeToken"
              :treeModel="getTreeModelJobGrade"
              v-on:changeValue="baseTreeChanged($event)"
              :showParent="true"
              :filterParentDirect="true"
            />
            <BaseTree
              :hierarchySystemTypeFilterToken="hierarchySystemTypeFilterToken"
              :treeModel="getTreeModel"
              v-on:changeValue="baseTreeChanged($event)"
              :showParent="true"
              :filterParentDirect="true"
            />
            <CustomPhonePicker
              :className="'col-md-9'"
              :id="`${id}-userPhone1`"
              :countryCodeName="user.userProfileData.userPhone1CountryCodeName"
              :countryCode="user.userProfileData.userPhone1CountryCode"
              :phoneNumber="user.userProfileData.userPhone1"
              :title="$t('Users.userPhone1')"
              :imgName="'phone.svg'"
              v-on:changeValue="setPhone1($event)"
            />
            <CustomCheckbox
              :className="'col-md-3'"
              :value="user.userProfileData.userPhone1WhatsAppStatus"
              v-on:changeValue="
                user.userProfileData.userPhone1WhatsAppStatus = $event
              "
              :title="$t('Users.whatsAppStatus')"
              :imgName="'type.svg'"
              :disabledStatus="disabledStatus"
            />
            <CustomPhonePicker
              :className="'col-md-9'"
              :id="`${id}-userPhone2`"
              :countryCodeName="user.userProfileData.userPhone2CountryCodeName"
              :countryCode="user.userProfileData.userPhone2CountryCode"
              :phoneNumber="user.userProfileData.userPhone2"
              :title="$t('Users.userPhone2')"
              :imgName="'phone.svg'"
              v-on:changeValue="setPhone2($event)"
            />
            <CustomCheckbox
              :className="'col-md-3'"
              :value="user.userProfileData.userPhone2WhatsAppStatus"
              v-on:changeValue="
                user.userProfileData.userPhone2WhatsAppStatus = $event
              "
              :title="$t('Users.whatsAppStatus')"
              :imgName="'type.svg'"
              :disabledStatus="disabledStatus"
            />
            <CustomPhonePicker
              :className="'col-md-9'"
              :id="`${id}-userPhone3`"
              :countryCodeName="user.userProfileData.userPhone3CountryCodeName"
              :countryCode="user.userProfileData.userPhone3CountryCode"
              :phoneNumber="user.userProfileData.userPhone3"
              :title="$t('Users.userPhone3')"
              :imgName="'phone.svg'"
              v-on:changeValue="setPhone3($event)"
            />
            <CustomCheckbox
              :className="'col-md-3'"
              :value="user.userProfileData.userPhone3WhatsAppStatus"
              v-on:changeValue="
                user.userProfileData.userPhone3WhatsAppStatus = $event
              "
              :title="$t('Users.whatsAppStatus')"
              :imgName="'type.svg'"
              :disabledStatus="disabledStatus"
            />
            <CustomSelectBox
              :className="'col-md-6'"
              :id="`${id}-nationalityCountryToken`"
              :value="
                !disabledStatus
                  ? user.userProfileData.nationalityCountryToken
                  : user.userProfileData.nationalityCountryData
                      .nationalityCountryNameCurrent
              "
              :options="nationalityCountryTokenOptions"
              v-on:changeValue="
                user.userProfileData.nationalityCountryToken = $event
              "
              :title="$t('Countries.selectNationality')"
              :imgName="'countries.svg'"
              :disabledStatus="disabledStatus"
            />
            <CustomInput
              :className="'col-md-6'"
              :id="`${id}-userEmail`"
              :value="user.userProfileData.userEmail"
              v-on:changeValue="user.userProfileData.userEmail = $event"
              :title="$t('Users.userEmail')"
              :imgName="'email.svg'"
              :disabledStatus="disabledStatus"
            />
            <CustomSelectBox
              :className="'col-md-6'"
              :id="`${id}-socialStatuseToken`"
              :value="
                !disabledStatus
                  ? user.userProfileData.socialStatuseToken
                  : user.userProfileData.socialStatuseData
                      .socialStatuseNameCurrent
              "
              :options="socialStatuseTokenOptions"
              v-on:changeValue="
                user.userProfileData.socialStatuseToken = $event
              "
              :title="$t('SocialStatuses.select')"
              :imgName="'socialStatuses.svg'"
              :disabledStatus="disabledStatus"
            />
            <TextArea
              :className="'col-md-6'"
              :id="`${id}-userSocialStatuseNotes`"
              :value="user.userProfileData.userSocialStatuseNotes"
              :title="$t('Users.userSocialStatuseNotes')"
              :imgName="'notes.svg'"
              v-on:changeValue="
                user.userProfileData.userSocialStatuseNotes = $event
              "
              :disabledStatus="disabledStatus"
            />
            <CustomSelectBox
              :className="'col-md-6'"
              :id="`${id}-insuranceCompanyToken`"
              :value="
                !disabledStatus
                  ? user.userProfileData.insuranceCompanyToken
                  : user.userProfileData.insuranceCompanyData
                      .insuranceCompanyNameCurrent
              "
              :options="insuranceCompanyTokenOptions"
              v-on:changeValue="
                user.userProfileData.insuranceCompanyToken = $event
              "
              :title="$t('InsuranceCompanies.select')"
              :imgName="'insuranceCompanies.svg'"
              :disabledStatus="disabledStatus"
            />
            <CustomInput
              :className="'col-md-6'"
              :id="`${id}-userInsuranceNumber`"
              :value="user.userProfileData.userInsuranceNumber"
              v-on:changeValue="
                user.userProfileData.userInsuranceNumber = $event
              "
              :title="$t('Users.insuranceNumber')"
              :imgName="'number.svg'"
              :disabledStatus="disabledStatus"
            />
            <CustomSelectBox
              :className="'col-md-6'"
              :id="`${id}-bankToken`"
              :value="
                !disabledStatus
                  ? user.userProfileData.bankToken
                  : user.userProfileData.bankData.bankNameCurrent
              "
              :options="bankTokenOptions"
              v-on:changeValue="user.userProfileData.bankToken = $event"
              :title="$t('Banks.select')"
              :imgName="'banks.svg'"
              :disabledStatus="disabledStatus"
            />
            <CustomInput
              :className="'col-md-6'"
              :id="`${id}-userBankAccountNumber`"
              :value="user.userProfileData.userBankAccountNumber"
              v-on:changeValue="
                user.userProfileData.userBankAccountNumber = $event
              "
              :title="$t('Users.bankAccountNumber')"
              :imgName="'number.svg'"
              :disabledStatus="disabledStatus"
            />
            <CustomSelectBox
              :className="'col-md-6'"
              :id="`${id}-userCitizenshipTypeToken`"
              :value="
                !disabledStatus
                  ? user.userProfileData.userCitizenshipTypeToken
                  : user.userProfileData.userCitizenshipTypeNameCurrent
              "
              :options="userCitizenshipTypeTokenOptions"
              v-on:changeValue="
                user.userProfileData.userCitizenshipTypeToken = $event
              "
              :title="$t('Users.citizenship')"
              :imgName="'citizenship.svg'"
              :disabledStatus="disabledStatus"
            />
            <CustomSelectBox
              :className="'col-md-6'"
              :id="`${id}-parentsSocialStatusToken`"
              :value="
                !disabledStatus
                  ? user.userProfileData.parentsSocialStatusToken
                  : user.userProfileData.parentsSocialStatusData
                      .socialStatuseNameCurrent
              "
              :options="socialStatuseTokenOptions"
              v-on:changeValue="
                user.userProfileData.parentsSocialStatusToken = $event
              "
              :title="$t('Users.parentsSocialStatus')"
              :imgName="'socialStatuses.svg'"
              :disabledStatus="disabledStatus"
            />
            <CustomSelectBox
              :className="'col-md-6'"
              :id="`${id}-fatherDeathTypeToken`"
              :value="
                !disabledStatus
                  ? user.userProfileData.fatherDeathTypeToken
                  : user.userProfileData.fatherDeathTypeNameCurrent
              "
              :options="deathTypeTokenOptions"
              v-on:changeValue="
                user.userProfileData.fatherDeathTypeToken = $event
              "
              :title="$t('Users.fatherDeathType')"
              :imgName="'type.svg'"
              :disabledStatus="disabledStatus"
            />
            <CustomSelectBox
              :className="'col-md-6'"
              :id="`${id}-motherDeathTypeToken`"
              :value="
                !disabledStatus
                  ? user.userProfileData.motherDeathTypeToken
                  : user.userProfileData.motherDeathTypeNameCurrent
              "
              :options="deathTypeTokenOptions"
              v-on:changeValue="
                user.userProfileData.motherDeathTypeToken = $event
              "
              :title="$t('Users.motherDeathType')"
              :imgName="'type.svg'"
              :disabledStatus="disabledStatus"
            />
            <CustomSelectBox
              :className="'col-md-6'"
              :options="religionTokenOptions"
              :id="`${id}-religionToken`"
              :value="user.userProfileData.religionToken"
              v-on:changeValue="user.userProfileData.religionToken = $event"
              :title="$t('Religions.select')"
              :imgName="'religions.svg'"
            />
            <CustomInput
              :className="'col-md-6'"
              :id="`${id}-userNationalNumber`"
              :value="user.userProfileData.userNationalNumber"
              v-on:changeValue="
                user.userProfileData.userNationalNumber = $event
              "
              :title="$t('Users.nationalID')"
              :imgName="'nationalNumber.svg'"
              :disabledStatus="disabledStatus"
            />
          </template>
        </div>
      </div>

      <div class="form-actions">
        <div class="icon-submit" @click.prevent="submitForm">
          <img src="@/assets/images/check-icon.svg" :title="submitName" />
        </div>
        <div
          @click.prevent
          class="icon-cancel"
          v-b-modal="`ConfirmCloseSheet-${bottomSheetName}`"
        >
          <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {
  getLanguage,
  fullPathFileFromServer,
  bottomSheetScrollToTop,
} from "./../../utils/functions";
import {
  isValidUserNameAr,
  isValidUserNameEn,
  isValidEmail,
  // isValidTextAr,
  // isValidTextEn,
} from "./../../utils/validationHelper";
import CustomFileInput from "./../../components/general/CustomFileInput.vue";
import BaseTree from "./../../components/general/BaseTree.vue";
import CustomInput from "./../../components/general/CustomInput.vue";
import CustomSelectBox from "./../../components/general/CustomSelectBox.vue";
import CustomCheckbox from "./../../components/general/CustomCheckbox.vue";
import TextArea from "./../../components/general/TextArea.vue";
import DateTimePicker from "./../../components/general/DateTimePicker.vue";
import generalMixin from "./../../utils/generalMixin";
import { STATUS, BASE_URL } from "./../../utils/constants";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import CustomInputPassword from "@/components/general/CustomInputPassword.vue";
import CustomPhonePicker from "@/components/general/CustomPhonePicker.vue";
import JobGrades from "@/models/settings/settingsOthers/jobGrades/JobGrades";
import apiJobGrade from "./../../api/jobGrade";
import JobGradeImg from "@/assets/images/jobGrade.svg";
import {
  getDialogOfCitizenshipTypes,
  getDialogOfDeathTypes,
  getDialogOfGender,
  getDialogOfUserActivityType,
} from "./../../utils/dialogsOfConstantsLists";
import { SYSTEM_TYPE, USER_TYPE } from "./../../utils/constantLists";
import {
  getEstablishmentRolesDialog,
  getMilitaryStatusTypesDialog,
  getEducationalStagesDialog,
  getSpecialtiesDialog,
  getCountriesDialog,
  getSocialStatusesDialog,
  getInsuranceCompaniesDialog,
  getBanksDialog,
  getReligionsDialog,
} from "./../../utils/dialogsOfApi";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomFileInput,
    BaseTree,
    CustomInputPassword,
    CustomPhonePicker,
    CustomInput,
    CustomSelectBox,
    CustomCheckbox,
    TextArea,
    DateTimePicker,
  },
  data() {
    return {
      isLoading: true,
      exceptionMsg: null,
      exceptionImg: null,
      language: getLanguage(),
      establishmentRoleTokenOptions: [],
      militaryStatusTypeTokenOptions: [],
      educationalStageTokenOptions: [],
      specialtieTokenOptions: [],
      nationalityCountryTokenOptions: [],
      jobGradeTokenOptions: [],
      userCitizenshipTypeTokenOptions: getDialogOfCitizenshipTypes(),
      deathTypeTokenOptions: getDialogOfDeathTypes(),
      userGenderTokenOptions: getDialogOfGender(),
      userActivityTypeTokenOptions: getDialogOfUserActivityType(),
      socialStatuseTokenOptions: [],
      insuranceCompanyTokenOptions: [],
      bankTokenOptions: [],
      jobGrades: new JobGrades(),
      religionTokenOptions: [],
      USER_TYPE,
    };
  },
  props: {
    user: {
      type: Object,
    },
    userTypeToken: {
      type: String,
      default: "",
    },
    submitName: {
      type: String,
    },
    id: {
      type: String,
      default: "id",
    },
    deleteFileStatus: {
      type: Boolean,
      default: false,
    },
    bottomSheetName: {
      type: String,
      default: "",
    },
    disabledStatus: {
      type: Boolean,
      default: false,
    },
  },
  validations: {
    user: {
      userNameAr: { required, isValidUserNameAr },
      userNameEn: { required, isValidUserNameEn },
      userEmail: { isValidEmail },
    },
  },
  computed: {
    className() {
      let className = "";
      if (this.submitName == this.$t("add")) {
        if (this.userTypeToken == USER_TYPE.Employee) {
          className = "col-md-6";
        } else {
          className = "col-md-12";
        }
      } else {
        if (this.userTypeToken == USER_TYPE.Employee) {
          className = "col-md-12";
        } else {
          className = "col-md-6";
        }
      }
      return className;
    },
    hierarchySystemTypeJobGradeToken() {
      return SYSTEM_TYPE.JobGrade;
    },
    getTreeModelJobGrade() {
      let treeModelObject = {
        systemComponentHierarchyToken:
          this.user.userProfileData.jobGradeData.systemComponentHierarchyToken,
        hierarchyTitle: this.$t("SystemComponentsHierarchies.selectJobGrade"),
        systemComponentToken:
          this.user.userProfileData.jobGradeData.systemComponentToken,
        componentTitle: this.$t("SystemComponents.selectJobGrade"),
        parentToken: this.user.userProfileData.jobGradeData.jobGradeToken,
        parentTitle: this.$t("JobGrades.select"),
        parentImgName: "jobGrade.svg",
      };
      return treeModelObject;
    },
    hierarchySystemTypeFilterToken() {
      return SYSTEM_TYPE.GeographicalDistribution;
    },
    getTreeModel() {
      let treeModelObject = {
        systemComponentHierarchyToken:
          this.user.userProfileData.geographicalDistributionData
            .systemComponentHierarchyToken,
        hierarchyTitle: this.$t(
          "SystemComponentsHierarchies.selectGeographicalDistribution"
        ),
        systemComponentToken:
          this.user.userProfileData.geographicalDistributionData
            .systemComponentToken,
        componentTitle: this.$t(
          "SystemComponents.selectGeographicalDistribution"
        ),
        parentToken: this.user.userProfileData.geographicalDistributionToken,
        parentTitle: this.$t("GeographicalDistributions.select"),
        parentImgName: "geographicalDistributions.svg",
      };
      return treeModelObject;
    },

    errors_userNameAr() {
      let errors = [];
      if (this.$v.user.userNameAr.$error) {
        if (
          !this.$v.user.userNameAr.required &&
          !this.$v.user.userNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.user.userNameAr.required &&
          !this.$v.user.userNameAr.isValidUserNameAr
        )
          errors.push(this.$t("validation.userNameIsRequiredInAr"));
      }
      return errors;
    },
    errors_userNameEn() {
      let errors = [];
      if (this.$v.user.userNameEn.$error) {
        if (
          !this.$v.user.userNameAr.required &&
          !this.$v.user.userNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.user.userNameEn.required &&
          !this.$v.user.userNameEn.isValidUserNameEn
        )
          errors.push(this.$t("validation.userNameIsRequiredInEn"));
      }
      return errors;
    },
    errors_userEmail() {
      let errors = [];
      if (this.$v.user.userEmail.$error) {
        if (!this.$v.user.userEmail.isValidEmail)
          errors.push(this.$t("validation.fieldMustBeEmail"));
      }
      return errors;
    },
  },
  methods: {
    baseTreeChanged(data) {
      if (data.systemTypeToken == SYSTEM_TYPE.JobGrade) {
        this.user.userProfileData.jobGradeData.systemComponentHierarchyToken =
          data.hierarchyToken;
        this.user.userProfileData.jobGradeData.systemComponentToken =
          data.componentToken;
        this.user.userProfileData.jobGradeToken = data.parentToken;
      }
      if (data.systemTypeToken == SYSTEM_TYPE.GeographicalDistribution) {
        this.user.userProfileData.geographicalDistributionData.systemComponentHierarchyToken =
          data.hierarchyToken;
        this.user.userProfileData.geographicalDistributionData.systemComponentToken =
          data.componentToken;
        this.user.userProfileData.geographicalDistributionToken =
          data.parentToken;
      }
    },

    setPhone(data) {
      this.user.userPhoneCountryCodeName = data.countryCodeName;
      this.user.userPhoneCountryCode = data.countryCode;
      this.user.userPhone = data.phoneNumber;
    },

    async getEstablishmentRoleDialog() {
      let modelName = "";
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          modelName = "adminsEgyptEstablishmentsRole";
          break;
        case USER_TYPE.MasterAdmin:
          modelName = "masterAdminEstablishmentsRole";
          break;
        case USER_TYPE.Employee:
          modelName = "employeeEstablishmentsRole";
          break;
        case USER_TYPE.Student:
          modelName = "studentEstablishmentsRole";
          break;
        case USER_TYPE.Supplier:
          modelName = "supplierEstablishmentsRole";
          break;
        case USER_TYPE.Parent:
          modelName = "parentEstablishmentsRole";
          break;
        case USER_TYPE.Client:
          modelName = "clientEstablishmentsRole";
          break;

        default:
          break;
      }

      this.isLoading = true;
      this.establishmentRoleTokenOptions = await getEstablishmentRolesDialog(
        modelName
      );
      this.isLoading = false;
    },
    async getMilitaryStatusTypesDialog() {
      this.isLoading = true;
      this.militaryStatusTypeTokenOptions =
        await getMilitaryStatusTypesDialog();
      this.isLoading = false;
    },
    async getEducationalStagesDialog() {
      this.isLoading = true;
      this.educationalStageTokenOptions = await getEducationalStagesDialog();
      this.isLoading = false;
    },
    async getSpecialtiesDialog() {
      this.isLoading = true;
      this.specialtieTokenOptions = await getSpecialtiesDialog();
      this.isLoading = false;
    },

    async getNationalityDialog() {
      this.isLoading = true;
      this.nationalityCountryTokenOptions = await getCountriesDialog();
      this.isLoading = false;
    },
    async getJobGradeTokenDialog() {
      this.isLoading = true;
      let options = [];
      try {
        const response = await apiJobGrade.getDialog(this.jobGrades.filterData);
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            options.push({
              value: itemsData[item]["itemToken"],
              text: itemsData[item]["itemName"],
              image: itemsData[item]["itemImagePath"]
                ? BASE_URL + itemsData[item]["itemImagePath"]
                : JobGradeImg,
            });
          }
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          options.push({
            value: "",
            text: response.data.msg,
            image: JobGradeImg,
          });
        }
      } catch (error) {
        options.push({
          value: "",
          text: this.$t("errorCatch"),
          image: JobGradeImg,
        });
      }
      this.jobGradeTokenOptions = options;
      this.isLoading = false;
    },
    async getSocialStatuseDialog() {
      this.isLoading = true;
      this.socialStatuseTokenOptions = await getSocialStatusesDialog();
      this.isLoading = false;
    },
    async getInsuranceCompanyDialog() {
      this.isLoading = true;
      this.insuranceCompanyTokenOptions = await getInsuranceCompaniesDialog();
      this.isLoading = false;
    },
    async getBankDialog() {
      this.isLoading = true;
      this.bankTokenOptions = await getBanksDialog();
      this.isLoading = false;
    },
    async getReligionsDialog() {
      this.isLoading = true;
      this.religionTokenOptions = await getReligionsDialog();
      this.isLoading = false;
    },

    setPhone1(data) {
      this.user.userProfileData.userPhone1CountryCodeName =
        data.countryCodeName;
      this.user.userProfileData.userPhone1CountryCode = data.countryCode;
      this.user.userProfileData.userPhone1 = data.phoneNumber;
    },
    setPhone2(data) {
      this.user.userProfileData.userPhone2CountryCodeName =
        data.countryCodeName;
      this.user.userProfileData.userPhone2CountryCode = data.countryCode;
      this.user.userProfileData.userPhone2 = data.phoneNumber;
    },
    setPhone3(data) {
      this.user.userProfileData.userPhone3CountryCodeName =
        data.countryCodeName;
      this.user.userProfileData.userPhone3CountryCode = data.countryCode;
      this.user.userProfileData.userPhone3 = data.phoneNumber;
    },
    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        (this.$v.user.userNameAr.required &&
          this.$v.user.userNameAr.isValidUserNameAr) ||
        (this.$v.user.userNameEn.required &&
          this.$v.user.userNameEn.isValidUserNameEn &&
          this.$v.user.userEmail.isValidEmail)
      ) {
        this.$emit("submitForm");
      }
    },
    fullPathFileFromServer,
  },
  watch: {
    userTypeToken() {
      this.getEstablishmentRoleDialog();
    },
  },
  async created() {
    this.getEstablishmentRoleDialog();
    this.getMilitaryStatusTypesDialog();
    this.getEducationalStagesDialog();
    this.getSpecialtiesDialog();
    this.getNationalityDialog();
    this.getJobGradeTokenDialog();
    this.getSocialStatuseDialog();
    this.getInsuranceCompanyDialog();
    this.getBankDialog();
    this.getReligionsDialog();
  },
};
</script>
