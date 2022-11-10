<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="educationalJoiningApplication.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              educationalJoiningApplication.educationalJoiningApplicationImagePath,
              educationalJoiningApplication.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !educationalJoiningApplication.educationalJoiningApplicationImageIsDefault &&
            checkPrivilege(hasEducationalJoiningApplicationDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <span class="my-card-title">{{ $t("students.data") }}</span>

        <div class="row">
          <!-- <CustomCheckbox
            :className="'col-md-12'"
            :value="educationalJoiningApplication.addedByStudentTokenStatus"
            v-on:changeValue="
              educationalJoiningApplication.addedByStudentTokenStatus = $event
            "
            :title="$t('EducationalJoiningApplications.studentExistInSystem')"
          /> -->
          <CustomSelectBox
            :className="'col-md-12'"
            :id="`userStudentToken`"
            :value="educationalJoiningApplication.userStudentToken"
            :options="userTokenOptions"
            v-on:changeValue="
              educationalJoiningApplication.userStudentToken = $event;
              educationalJoiningApplication.addedByStudentTokenStatus =
                educationalJoiningApplication.userStudentToken ? true : false;
            "
            :title="$t('students.select')"
            :imgName="'students.svg'"
          />
          <CustomInput
            :isDisabled="
              educationalJoiningApplication.addedByStudentTokenStatus
            "
            :className="'col-md-6'"
            :id="`${id}-studentNameAr`"
            :value="educationalJoiningApplication.studentNameAr"
            v-on:changeValue="
              educationalJoiningApplication.studentNameAr = $event
            "
            :title="$t('Users.nameAr')"
            :imgName="'students.svg'"
          />
          <CustomInput
            :isDisabled="
              educationalJoiningApplication.addedByStudentTokenStatus
            "
            :className="'col-md-6'"
            :id="`${id}-studentNameEn`"
            :value="educationalJoiningApplication.studentNameEn"
            v-on:changeValue="
              educationalJoiningApplication.studentNameEn = $event
            "
            :title="$t('Users.nameEn')"
            :imgName="'students.svg'"
          />
          <CustomInput
            :isDisabled="
              educationalJoiningApplication.addedByStudentTokenStatus
            "
            :className="'col-md-6'"
            :id="`${id}-studentNameUnd`"
            :value="educationalJoiningApplication.studentNameUnd"
            v-on:changeValue="
              educationalJoiningApplication.studentNameUnd = $event
            "
            :title="$t('Users.nameUnd')"
            :imgName="'students.svg'"
          />

          <CustomInput
            :isDisabled="
              educationalJoiningApplication.addedByStudentTokenStatus
            "
            :className="'col-md-6'"
            :id="`${id}-studentNationalNumber`"
            :value="educationalJoiningApplication.studentNationalNumber"
            v-on:changeValue="
              educationalJoiningApplication.studentNationalNumber = $event
            "
            :title="$t('Users.nationalID')"
            :imgName="'nationalNumber.svg'"
          />
          <CustomPhonePicker
            :isDisabled="
              educationalJoiningApplication.addedByStudentTokenStatus
            "
            :className="'col-md-6'"
            :id="`${id}-studentPhone`"
            :countryCodeName="
              educationalJoiningApplication.studentPhoneCountryCodeName
            "
            :countryCode="educationalJoiningApplication.studentPhoneCountryCode"
            :phoneNumber="educationalJoiningApplication.studentPhone"
            v-on:changeValue="
              educationalJoiningApplication.studentPhoneCountryCodeName =
                $event.countryCodeName;
              educationalJoiningApplication.studentPhoneCountryCode =
                $event.countryCode;
              educationalJoiningApplication.studentPhone = $event.phoneNumber;
            "
            :title="$t('Users.phone')"
            :imgName="'phone.svg'"
          />
          <CustomInput
            :isDisabled="
              educationalJoiningApplication.addedByStudentTokenStatus
            "
            :className="'col-md-6'"
            :id="`${id}-studentEmail`"
            :value="educationalJoiningApplication.studentEmail"
            v-on:changeValue="
              educationalJoiningApplication.studentEmail = $event
            "
            :title="$t('Users.email')"
            :imgName="'email.svg'"
          />
        </div>
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="educationalJoiningApplication.fullCode"
            v-on:changeValue="educationalJoiningApplication.fullCode = $event"
            :title="$t('EducationalJoiningApplications.code')"
            :imgName="'code.svg'"
          />
          <DateTimePicker
            class="col-md-6"
            :id="`${id}-joiningDateTime`"
            type="dateTime"
            :value="educationalJoiningApplication.joiningDateTime"
            :title="$t('EducationalJoiningApplications.joiningDateTime')"
            v-on:changeValue="
              educationalJoiningApplication.joiningDateTime = $event.dateTime
            "
            :language="language"
          />

          <BaseTree
            :hierarchySystemTypeFilterToken="hierarchySystemTypeFilterToken"
            :treeModel="getTreeModel"
            v-on:changeValue="baseTreeChanged($event)"
            :showParent="true"
            :filterParentDirect="true"
          />

          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-priceListToken`"
            :value="educationalJoiningApplication.priceListToken"
            :options="priceListTokenOptions"
            v-on:changeValue="
              educationalJoiningApplication.priceListToken = $event
            "
            :title="$t('PriceLists.select')"
            :imgName="'PriceLists.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-knownMethodToken`"
            :value="educationalJoiningApplication.knownMethodToken"
            :options="knownMethodTokenOptions"
            v-on:changeValue="
              educationalJoiningApplication.knownMethodToken = $event
            "
            :title="$t('KnownMethods.select')"
            :imgName="'knownMethods.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-enrollmentTypeToken`"
            :value="educationalJoiningApplication.enrollmentTypeToken"
            :options="enrollmentTypeTokenOptions"
            v-on:changeValue="
              educationalJoiningApplication.enrollmentTypeToken = $event
            "
            :title="$t('ConstantsListSelect.EnrollmentTypes')"
            :imgName="'EnrollmentTypes.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-subscriptionTypeToken`"
            :value="educationalJoiningApplication.subscriptionTypeToken"
            :options="subscriptionTypeTokenOptions"
            v-on:changeValue="
              educationalJoiningApplication.subscriptionTypeToken = $event
            "
            :title="$t('ConstantsListSelect.SubscriptionTypes')"
            :imgName="'SubscriptionTypes.svg'"
          />

          <template
            v-if="
              educationalJoiningApplication.subscriptionTypeToken ==
              SUBSCRIPTION_TYPE_TOKENS.Session
            "
          >
            <CustomInputInt
              :className="'col-md-6'"
              :id="`${id}-subscriptionRequestSessionsNumber`"
              :value="
                educationalJoiningApplication.subscriptionRequestSessionsNumber
              "
              v-on:changeValue="
                educationalJoiningApplication.subscriptionRequestSessionsNumber =
                  $event
              "
              :title="
                $t(
                  'EducationalJoiningApplications.subscriptionRequestSessionsNumber'
                )
              "
              :imgName="'number.svg'"
            />
            <DateTimePicker
              class="col-md-6"
              :id="`${id}-subscriptionToDateTime`"
              type="dateTime"
              :value="educationalJoiningApplication.subscriptionToDateTime"
              :title="
                $t('EducationalJoiningApplications.subscriptionToDateTime')
              "
              v-on:changeValue="
                educationalJoiningApplication.subscriptionToDateTime =
                  $event.dateTime
              "
              :language="language"
            />
          </template>

          <template
            v-if="
              educationalJoiningApplication.subscriptionTypeToken ==
              SUBSCRIPTION_TYPE_TOKENS.Duration
            "
          >
            <DateTimePicker
              class="col-md-6"
              :id="`${id}-subscriptionToDateTime`"
              type="dateTime"
              :value="educationalJoiningApplication.subscriptionToDateTime"
              :title="
                $t('EducationalJoiningApplications.subscriptionToDateTime')
              "
              v-on:changeValue="
                educationalJoiningApplication.subscriptionToDateTime =
                  $event.dateTime
              "
              :language="language"
            />
          </template>

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-educationalJoiningApplicationDescriptionAr`"
            :value="
              educationalJoiningApplication.educationalJoiningApplicationDescriptionAr
            "
            v-on:changeValue="
              educationalJoiningApplication.educationalJoiningApplicationDescriptionAr =
                $event
            "
            :title="$t('EducationalJoiningApplications.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-educationalJoiningApplicationDescriptionEn`"
            :value="
              educationalJoiningApplication.educationalJoiningApplicationDescriptionEn
            "
            v-on:changeValue="
              educationalJoiningApplication.educationalJoiningApplicationDescriptionEn =
                $event
            "
            :title="$t('EducationalJoiningApplications.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-educationalJoiningApplicationDescriptionUnd`"
            :value="
              educationalJoiningApplication.educationalJoiningApplicationDescriptionUnd
            "
            v-on:changeValue="
              educationalJoiningApplication.educationalJoiningApplicationDescriptionUnd =
                $event
            "
            :title="$t('EducationalJoiningApplications.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-educationalJoiningApplicationNotes`"
            :value="
              educationalJoiningApplication.educationalJoiningApplicationNotes
            "
            v-on:changeValue="
              educationalJoiningApplication.educationalJoiningApplicationNotes =
                $event
            "
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
import {
  getLanguage,
  fullPathFileFromServer,
  bottomSheetScrollToTop,
  checkPrivilege,
} from "./../../../../utils/functions";
import {
  isValidTextAr,
  isValidTextEn,
} from "./../../../../utils/validationHelper";
import CustomFileInput from "./../../../../components/general/CustomFileInput.vue";
import CustomInput from "./../../../../components/general/CustomInput.vue";
import CustomInputInt from "./../../../../components/general/CustomInputInt.vue";
// import CustomCheckbox from "./../../../../components/general/CustomCheckbox.vue";
import CustomPhonePicker from "./../../../../components/general/CustomPhonePicker.vue";
import DateTimePicker from "./../../../../components/general/DateTimePicker.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import BaseTree from "./../../../../components/general/BaseTree.vue";
import {
  getPriceListsDialog,
  getUsersDialog,
  getKnownMethodsDialog,
} from "./../../../../utils/dialogsOfApi";
import {
  getDialogOfEnrollmentTypes,
  getDialogOfSubscriptionTypes,
} from "./../../../../utils/dialogsOfConstantsLists";
import { hasEducationalJoiningApplicationDeleteImage } from "./../../../../utils/privilegeHelper";
import {
  SYSTEM_TYPE,
  USER_TYPE,
  SUBSCRIPTION_TYPE_TOKENS,
} from "./../../../../utils/constantLists";
import generalMixin from "./../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomFileInput,
    CustomInput,
    CustomInputInt,
    // CustomCheckbox,
    CustomPhonePicker,
    DateTimePicker,
    TextArea,
    CustomSelectBox,
    BaseTree,
  },
  data() {
    return {
      language: getLanguage(),
      priceListTokenOptions: [],
      knownMethodTokenOptions: [],
      userTokenOptions: [],
      enrollmentTypeTokenOptions: getDialogOfEnrollmentTypes(),
      subscriptionTypeTokenOptions: getDialogOfSubscriptionTypes(),
      SUBSCRIPTION_TYPE_TOKENS,
    };
  },
  props: {
    educationalJoiningApplication: {
      type: Object,
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
    educationalJoiningApplication: {
      priceListToken: { required },
      educationalJoiningApplicationDescriptionAr: { isValidTextAr },
      educationalJoiningApplicationDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    hierarchySystemTypeFilterToken() {
      return SYSTEM_TYPE.EducationalActivity;
    },
    getTreeModel() {
      let treeModelObject = {
        systemComponentHierarchyToken:
          this.educationalJoiningApplication.educationalCategoryData
            .systemComponentHierarchyToken,
        hierarchyTitle: this.$t(
          "SystemComponentsHierarchies.selectEducationalActivity"
        ),
        systemComponentToken:
          this.educationalJoiningApplication.educationalCategoryData
            .systemComponentToken,
        componentTitle: this.$t("SystemComponents.selectEducationalActivity"),
        parentToken:
          this.educationalJoiningApplication.educationalCategoryToken,
        parentTitle: this.$t("EducationalCategories.select"),
        parentImgName: "EducationalCategories.svg",
      };
      return treeModelObject;
    },
    errors_priceListToken() {
      let errors = [];
      if (this.$v.educationalJoiningApplication.priceListToken.$error) {
        if (!this.$v.educationalJoiningApplication.priceListToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_educationalJoiningApplicationDescriptionAr() {
      let errors = [];
      if (
        this.$v.educationalJoiningApplication
          .educationalJoiningApplicationDescriptionAr.$error
      ) {
        if (
          !this.$v.educationalJoiningApplication
            .educationalJoiningApplicationDescriptionAr.isValidTextAr
        )
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_educationalJoiningApplicationDescriptionEn() {
      let errors = [];
      if (
        this.$v.educationalJoiningApplication
          .educationalJoiningApplicationDescriptionEn.$error
      ) {
        if (
          !this.$v.educationalJoiningApplication
            .educationalJoiningApplicationDescriptionEn.isValidTextEn
        )
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
  },
  methods: {
    async getPriceListsDialog() {
      this.isLoading = true;
      this.priceListTokenOptions = await getPriceListsDialog();
      this.isLoading = false;
    },
    async getKnownMethodsDialog() {
      this.isLoading = true;
      this.knownMethodTokenOptions = await getKnownMethodsDialog();
      this.isLoading = false;
    },
    baseTreeChanged(data) {
      this.educationalJoiningApplication.educationalCategoryData.systemComponentHierarchyToken =
        data.hierarchyToken;
      this.educationalJoiningApplication.educationalCategoryData.systemComponentToken =
        data.componentToken;
      this.educationalJoiningApplication.educationalCategoryToken =
        data.parentToken;
    },
    async getStudentsDialog() {
      this.isLoading = true;
      let params = {
        modelName: "students",
        userTypeToken: USER_TYPE.Student,
      };
      this.userTokenOptions = await getUsersDialog(params);
      this.isLoading = false;
    },
    async submitForm() {
      bottomSheetScrollToTop();
      // this.$v.$touch();
      // if (
      //   this.$v.educationalJoiningApplication.priceListToken.required &&
      //   this.$v.educationalJoiningApplication
      //     .educationalJoiningApplicationDescriptionAr.isValidTextAr &&
      //   this.$v.educationalJoiningApplication
      //     .educationalJoiningApplicationDescriptionEn.isValidTextEn
      // ) {
      //   this.$emit("submitForm");
      // }
      // if (
      //   this.educationalJoiningApplication.subscriptionTypeToken ==
      //   SUBSCRIPTION_TYPE_TOKENS.Package
      // ) {
      //   this.educationalJoiningApplication.subscriptionToDateTime = "";
      //   this.educationalJoiningApplication.subscriptionRequestSessionsNumber =
      //     "";
      // } else if (
      //   this.educationalJoiningApplication.subscriptionTypeToken ==
      //   SUBSCRIPTION_TYPE_TOKENS.Duration
      // ) {
      //   this.educationalJoiningApplication.subscriptionRequestSessionsNumber =
      //     "";
      // }
      if (
        this.educationalJoiningApplication.subscriptionTypeToken !=
        (SUBSCRIPTION_TYPE_TOKENS.Session || SUBSCRIPTION_TYPE_TOKENS.Duration)
      ) {
        this.educationalJoiningApplication.subscriptionRequestSessionsNumber =
          "";
        this.educationalJoiningApplication.subscriptionToDateTime = "";
      }
      this.$emit("submitForm");
    },
    checkPrivilege,
    hasEducationalJoiningApplicationDeleteImage,
    fullPathFileFromServer,
  },
  created() {
    this.getPriceListsDialog();
    this.getKnownMethodsDialog();
    this.getStudentsDialog();
  },
};
</script>
