<template>
  <div class="">
    <form autocomplete="off">
      <div v-if="!userSelectedStatus" class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="userFamily.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              userFamily.userFamilyImagePath,
              userFamily.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !userFamily.userFamilyImageIsDefault &&
            hasPrivilegeDeleteImage
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            :className="'col-md-12'"
            :id="`userFamilyPersonToken`"
            :value="userFamily.userFamilyPersonToken"
            :options="userTokenOptions"
            v-on:changeValue="
              userFamily.userFamilyPersonToken = $event;
              userFamily.addedByUserFamilyPersonTokenStatus =
                userFamily.userFamilyPersonToken ? true : false;
            "
            :title="$t('parents.select')"
            :imgName="'parents.svg'"
          />

          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-relativeRelationTypeToken`"
            :errors="errors_relativeRelationTypeToken"
            :value="userFamily.relativeRelationTypeToken"
            :options="relativeRelationTypeTokenOptions"
            v-on:changeValue="
              userFamily.relativeRelationTypeToken = $event;
              $v.userFamily.relativeRelationTypeToken.$touch();
            "
            :title="$t('RelativeRelationTypes.select')"
            :imgName="'RelativeRelationTypes.svg'"
          />
          <CustomCheckbox
            :className="'col-md-6'"
            :value="userFamily.emergencyContactStatus"
            v-on:changeValue="userFamily.emergencyContactStatus = $event"
            :title="$t('general.emergencyContact')"
            :imgName="'type.svg'"
          />
        </div>
      </div>

      <div class="my-card">
        <span class="my-card-title">{{ $t("parents.data") }}</span>

        <div class="row">
          <CustomInput
            :isDisabled="userSelectedStatus"
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="userFamily.fullCode"
            v-on:changeValue="userFamily.fullCode = $event"
            :title="$t('UserFamilies.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :isDisabled="userSelectedStatus"
            :className="'col-md-6'"
            :id="`${id}-userFamilyNameAr`"
            :errors="errors_userFamilyNameAr"
            :value="userFamily.userFamilyNameAr"
            v-on:changeValue="
              userFamily.userFamilyNameAr = $event;
              $v.userFamily.userFamilyNameAr.$touch();
            "
            :title="$t('UserFamilies.nameAr')"
            :imgName="'UserFamilies.svg'"
          />
          <CustomInput
            :isDisabled="userSelectedStatus"
            :className="'col-md-6'"
            :id="`${id}-userFamilyNameEn`"
            :errors="errors_userFamilyNameEn"
            :value="userFamily.userFamilyNameEn"
            v-on:changeValue="
              userFamily.userFamilyNameEn = $event;
              $v.userFamily.userFamilyNameEn.$touch();
            "
            :title="$t('UserFamilies.nameEn')"
            :imgName="'UserFamilies.svg'"
          />
          <CustomInput
            :isDisabled="userSelectedStatus"
            :className="'col-md-6'"
            :id="`${id}-userFamilyNameUnd`"
            :value="userFamily.userFamilyNameUnd"
            v-on:changeValue="userFamily.userFamilyNameUnd = $event"
            :title="$t('UserFamilies.nameUnd')"
            :imgName="'UserFamilies.svg'"
          />

          <CustomPhonePicker
            :isDisabled="userSelectedStatus"
            :className="'col-md-6'"
            :id="`${id}-userFamilyMainPhone`"
            :countryCodeName="userFamily.userFamilyMainPhoneCountryCodeName"
            :countryCode="userFamily.userFamilyMainPhoneCountryCode"
            :phoneNumber="userFamily.userFamilyMainPhone"
            :title="$t('Users.phone')"
            :imgName="'phone.svg'"
            v-on:changeValue="setMainPhone($event)"
          />
          <CustomInput
            :isDisabled="userSelectedStatus"
            :className="'col-md-6'"
            :id="`${id}-userFamilyEmail`"
            :value="userFamily.userFamilyEmail"
            v-on:changeValue="userFamily.userFamilyEmail = $event"
            :title="$t('Users.email')"
            :imgName="'email.svg'"
          />
          <CustomInput
            :isDisabled="userSelectedStatus"
            :className="'col-md-6'"
            :id="`${id}-userFamilyUserName`"
            :value="userFamily.userFamilyUserName"
            v-on:changeValue="userFamily.userFamilyUserName = $event"
            :title="$t('Users.userName')"
            :imgName="'users.svg'"
          />
          <CustomInput
            :isDisabled="userSelectedStatus"
            :className="'col-md-6'"
            :id="`${id}-userFamilyNationalNumber`"
            :value="userFamily.userFamilyNationalNumber"
            v-on:changeValue="userFamily.userFamilyNationalNumber = $event"
            :title="$t('Users.nationalID')"
            :imgName="'nationalNumber.svg'"
          />

          <CustomSelectBox
            :isDisabled="userSelectedStatus"
            :className="'col-md-12'"
            :id="`${id}-nationalityCountryToken`"
            :value="userFamily.nationalityCountryToken"
            :options="nationalityCountryTokenOptions"
            v-on:changeValue="userFamily.nationalityCountryToken = $event"
            :title="$t('Countries.selectNationality')"
            :imgName="'countries.svg'"
          />
          <BaseTree
            :hierarchySystemTypeFilterToken="hierarchySystemTypeJobGradeToken"
            :treeModel="getTreeModelJobGrade"
            v-on:changeValue="baseTreeChanged($event)"
            :showParent="true"
            :filterParentDirect="true"
          />

          <CustomPhonePicker
            :isDisabled="userSelectedStatus"
            :className="'col-md-9'"
            :id="`${id}-userFamilyPhone1`"
            :countryCodeName="userFamily.userFamilyPhone1CountryCodeName"
            :countryCode="userFamily.userFamilyPhone1CountryCode"
            :phoneNumber="userFamily.userFamilyPhone1"
            :title="$t('Users.userPhone1')"
            :imgName="'phone.svg'"
            v-on:changeValue="setPhone1($event)"
          />
          <CustomCheckbox
            :isDisabled="userSelectedStatus"
            :className="'col-md-3'"
            :value="userFamily.userFamilyPhone1WhatsAppStatus"
            v-on:changeValue="
              userFamily.userFamilyPhone1WhatsAppStatus = $event
            "
            :title="$t('Users.whatsAppStatus')"
            :imgName="'type.svg'"
          />
          <CustomPhonePicker
            :isDisabled="userSelectedStatus"
            :className="'col-md-9'"
            :id="`${id}-userFamilyPhone2`"
            :countryCodeName="userFamily.userFamilyPhone2CountryCodeName"
            :countryCode="userFamily.userFamilyPhone2CountryCode"
            :phoneNumber="userFamily.userFamilyPhone2"
            :title="$t('Users.userPhone2')"
            :imgName="'phone.svg'"
            v-on:changeValue="setPhone2($event)"
          />
          <CustomCheckbox
            :isDisabled="userSelectedStatus"
            :className="'col-md-3'"
            :value="userFamily.userFamilyPhone2WhatsAppStatus"
            v-on:changeValue="
              userFamily.userFamilyPhone2WhatsAppStatus = $event
            "
            :title="$t('Users.whatsAppStatus')"
            :imgName="'type.svg'"
          />
          <CustomPhonePicker
            :isDisabled="userSelectedStatus"
            :className="'col-md-9'"
            :id="`${id}-userFamilyPhone3`"
            :countryCodeName="userFamily.userFamilyPhone3CountryCodeName"
            :countryCode="userFamily.userFamilyPhone3CountryCode"
            :phoneNumber="userFamily.userFamilyPhone3"
            :title="$t('Users.userPhone3')"
            :imgName="'phone.svg'"
            v-on:changeValue="setPhone3($event)"
          />
          <CustomCheckbox
            :isDisabled="userSelectedStatus"
            :className="'col-md-3'"
            :value="userFamily.userFamilyPhone3WhatsAppStatus"
            v-on:changeValue="
              userFamily.userFamilyPhone3WhatsAppStatus = $event
            "
            :title="$t('Users.whatsAppStatus')"
            :imgName="'type.svg'"
          />

          <TextArea
            :isDisabled="userSelectedStatus"
            :className="'col-md-6'"
            :id="`${id}-userFamilyAddressAr`"
            :errors="errors_userFamilyAddressAr"
            :value="userFamily.userFamilyAddressAr"
            v-on:changeValue="
              userFamily.userFamilyAddressAr = $event;
              $v.userFamily.userFamilyAddressAr.$touch();
            "
            :title="$t('UserFamilies.addressAr')"
            :imgName="'address.svg'"
          />
          <TextArea
            :isDisabled="userSelectedStatus"
            :className="'col-md-6'"
            :id="`${id}-userFamilyAddressEn`"
            :errors="errors_userFamilyAddressEn"
            :value="userFamily.userFamilyAddressEn"
            v-on:changeValue="
              userFamily.userFamilyAddressEn = $event;
              $v.userFamily.userFamilyAddressEn.$touch();
            "
            :title="$t('UserFamilies.addressEn')"
            :imgName="'address.svg'"
          />
          <TextArea
            :isDisabled="userSelectedStatus"
            :className="'col-md-6'"
            :id="`${id}-userFamilyAddressUnd`"
            :value="userFamily.userFamilyAddressUnd"
            v-on:changeValue="userFamily.userFamilyAddressUnd = $event"
            :title="$t('UserFamilies.addressUnd')"
            :imgName="'address.svg'"
          />
          <TextArea
            :isDisabled="userSelectedStatus"
            :className="'col-md-6'"
            :id="`${id}-userFamilyNotes`"
            :value="userFamily.userFamilyNotes"
            v-on:changeValue="userFamily.userFamilyNotes = $event"
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />
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
import { USER_TYPE, SYSTEM_TYPE } from "./../../../../utils/constantLists";
import {
  checkPrivilege,
  fullPathFileFromServer,
  bottomSheetScrollToTop,
} from "./../../../../utils/functions";
import {
  isValidNameAr,
  isValidNameEn,
  isValidTextAr,
  isValidTextEn,
} from "./../../../../utils/validationHelper";
import CustomFileInput from "./../../../../components/general/CustomFileInput.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import CustomCheckbox from "./../../../../components/general/CustomCheckbox.vue";
import CustomPhonePicker from "./../../../../components/general/CustomPhonePicker.vue";
import CustomInput from "./../../../../components/general/CustomInput.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import BaseTree from "./../../../../components/general/BaseTree.vue";
import {
  hasAdminsEgyptFamilyDeleteImage,
  hasMasterAdminFamilyDeleteImage,
  hasEmployeeFamilyDeleteImage,
  hasStudentFamilyDeleteImage,
  hasSupplierFamilyDeleteImage,
  hasClientFamilyDeleteImage,
} from "./../../../../utils/privilegeHelper";
import {
  getUsersDialog,
  getRelativeRelationTypesDialog,
  getCountriesDialog,
} from "./../../../../utils/dialogsOfApi";
import generalMixin from "./../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomFileInput,
    CustomSelectBox,
    CustomCheckbox,
    CustomPhonePicker,
    CustomInput,
    TextArea,
    BaseTree,
  },
  data() {
    return {
      userTokenOptions: [],
      nationalityCountryTokenOptions: [],
      relativeRelationTypeTokenOptions: [],
    };
  },
  props: {
    userFamily: {
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
  },
  validations: {
    userFamily: {
      relativeRelationTypeToken: { required },
      userFamilyPersonToken: { required },
      userFamilyNameAr: { required, isValidNameAr },
      userFamilyNameEn: { required, isValidNameEn },
      userFamilyAddressAr: { isValidTextAr },
      userFamilyAddressEn: { isValidTextEn },
    },
  },
  computed: {
    userSelectedStatus() {
      return this.userFamily.addedByUserFamilyPersonTokenStatus;
    },
    errors_relativeRelationTypeToken() {
      let errors = [];
      if (this.$v.userFamily.relativeRelationTypeToken.$error) {
        if (!this.$v.userFamily.relativeRelationTypeToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_userFamilyNameAr() {
      let errors = [];
      if (
        this.$v.userFamily.userFamilyNameAr.$error &&
        !this.$v.userFamily.userFamilyPersonToken.required
      ) {
        if (
          !this.$v.userFamily.userFamilyNameAr.required &&
          !this.$v.userFamily.userFamilyNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.userFamily.userFamilyNameAr.required &&
          !this.$v.userFamily.userFamilyNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_userFamilyNameEn() {
      let errors = [];
      if (
        this.$v.userFamily.userFamilyNameEn.$error &&
        !this.$v.userFamily.userFamilyPersonToken.required
      ) {
        if (
          !this.$v.userFamily.userFamilyNameAr.required &&
          !this.$v.userFamily.userFamilyNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.userFamily.userFamilyNameEn.required &&
          !this.$v.userFamily.userFamilyNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_userFamilyAddressAr() {
      let errors = [];
      if (this.$v.userFamily.userFamilyAddressAr.$error) {
        if (!this.$v.userFamily.userFamilyAddressAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_userFamilyAddressEn() {
      let errors = [];
      if (this.$v.userFamily.userFamilyAddressEn.$error) {
        if (!this.$v.userFamily.userFamilyAddressEn.isValidTextEn)
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
    hasPrivilegeDeleteImage() {
      let status = false;
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          status = checkPrivilege(hasAdminsEgyptFamilyDeleteImage());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminFamilyDeleteImage());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeeFamilyDeleteImage());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentFamilyDeleteImage());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierFamilyDeleteImage());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientFamilyDeleteImage());
          break;
      }
      return status;
    },

    hierarchySystemTypeJobGradeToken() {
      return SYSTEM_TYPE.JobGrade;
    },
    getTreeModelJobGrade() {
      let treeModelObject = {
        systemComponentHierarchyToken:
          this.userFamily.jobGradeData.systemComponentHierarchyToken,
        hierarchyTitle: this.$t("SystemComponentsHierarchies.selectJobGrade"),
        systemComponentToken: this.userFamily.jobGradeData.systemComponentToken,
        componentTitle: this.$t("SystemComponents.selectJobGrade"),
        parentToken: this.userFamily.jobGradeToken,
        parentTitle: this.$t("JobGrades.select"),
        parentImgName: "jobGrade.svg",
      };
      return treeModelObject;
    },
  },
  methods: {
    setMainPhone(data) {
      this.userFamily.userFamilyMainPhoneCountryCodeName = data.countryCodeName;
      this.userFamily.userFamilyMainPhoneCountryCode = data.countryCode;
      this.userFamily.userFamilyMainPhone = data.phoneNumber;
    },
    setPhone1(data) {
      this.userFamily.userFamilyPhone1CountryCodeName = data.countryCodeName;
      this.userFamily.userFamilyPhone1CountryCode = data.countryCode;
      this.userFamily.userFamilyPhone1 = data.phoneNumber;
    },
    setPhone2(data) {
      this.userFamily.userFamilyPhone2CountryCodeName = data.countryCodeName;
      this.userFamily.userFamilyPhone2CountryCode = data.countryCode;
      this.userFamily.userFamilyPhone2 = data.phoneNumber;
    },
    setPhone3(data) {
      this.userFamily.userFamilyPhone3CountryCodeName = data.countryCodeName;
      this.userFamily.userFamilyPhone3CountryCode = data.countryCode;
      this.userFamily.userFamilyPhone3 = data.phoneNumber;
    },
    baseTreeChanged(data) {
      this.userFamily.jobGradeData.systemComponentHierarchyToken =
        data.hierarchyToken;
      this.userFamily.jobGradeData.systemComponentToken = data.componentToken;
      this.userFamily.jobGradeToken = data.parentToken;
    },

    async getUsersDialog() {
      this.isLoading = true;
      let params = {
        modelName: "parents",
        userTypeToken: USER_TYPE.Parent,
      };
      this.userTokenOptions = await getUsersDialog(params);
      this.isLoading = false;
    },
    async getNationalityDialog() {
      this.isLoading = true;
      this.nationalityCountryTokenOptions = await getCountriesDialog();
      this.isLoading = false;
    },
    async submitForm() {
      try {
        bottomSheetScrollToTop();
        this.$v.$touch();
        if (
          this.$v.userFamily.relativeRelationTypeToken.required &&
          (this.$v.userFamily.userFamilyPersonToken.required ||
            (((this.$v.userFamily.userFamilyNameAr.required &&
              this.$v.userFamily.userFamilyNameAr.isValidNameAr) ||
              (this.$v.userFamily.userFamilyNameEn.required &&
                this.$v.userFamily.userFamilyNameEn.isValidNameEn)) &&
              this.$v.userFamily.userFamilyAddressAr.isValidTextAr &&
              this.$v.userFamily.userFamilyAddressEn.isValidTextEn))
        ) {
          this.$emit("submitForm");
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getRelativeRelationTypesDialog() {
      this.isLoading = true;
      this.relativeRelationTypeTokenOptions =
        await getRelativeRelationTypesDialog();
      this.isLoading = false;
    },
    fullPathFileFromServer,
  },
  created() {
    this.getUsersDialog();
    this.getNationalityDialog();
    this.getRelativeRelationTypesDialog();
  },
};
</script>
