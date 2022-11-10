<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="userInjury.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              userInjury.userInjuryImagePath,
              userInjury.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !userInjury.userInjuryImageIsDefault &&
            hasPrivilegeDeleteImage
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="userInjury.fullCode"
            v-on:changeValue="userInjury.fullCode = $event"
            :title="$t('UserInjuries.code')"
            :imgName="'code.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-injuryTypeToken`"
            :errors="errors_injuryTypeToken"
            :value="userInjury.injuryTypeToken"
            :options="injuryTypeTokenOptions"
            v-on:changeValue="
              userInjury.injuryTypeToken = $event;
              $v.userInjury.injuryTypeToken.$touch();
            "
            :title="$t('InjuryTypes.select')"
            :imgName="'injuryTypes.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-bodyPartToken`"
            :errors="errors_bodyPartToken"
            :value="userInjury.bodyPartToken"
            :options="bodyPartTokenOptions"
            v-on:changeValue="
              userInjury.bodyPartToken = $event;
              $v.userInjury.bodyPartToken.$touch();
            "
            :title="$t('BodyParts.select')"
            :imgName="'bodyParts.svg'"
          />

          <DateTimePicker
            class="col-md-6"
            :id="`${id}-injuryDateTime`"
            type="dateTime"
            :value="userInjury.injuryDateTime"
            :title="$t('UserInjuries.injuryDateTime')"
            v-on:changeValue="userInjury.injuryDateTime = $event.dateTime"
            :language="language"
            :maxDate="new Date()"
          />
          <DateTimePicker
            class="col-md-6"
            :id="`${id}-injuryRecoveryStartDateTime`"
            type="dateTime"
            :value="userInjury.injuryRecoveryStartDateTime"
            :title="$t('UserInjuries.recoveryStartDateTime')"
            v-on:changeValue="
              userInjury.injuryRecoveryStartDateTime = $event.dateTime
            "
            :language="language"
          />
          <DateTimePicker
            class="col-md-6"
            :id="`${id}-injuryRecoveryEndDateTime`"
            type="dateTime"
            :value="userInjury.injuryRecoveryEndDateTime"
            :title="$t('UserInjuries.recoveryEndDateTime')"
            v-on:changeValue="
              userInjury.injuryRecoveryEndDateTime = $event.dateTime
            "
            :language="language"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-userInjuryDescriptionAr`"
            :errors="errors_userInjuryDescriptionAr"
            :value="userInjury.userInjuryDescriptionAr"
            v-on:changeValue="
              userInjury.userInjuryDescriptionAr = $event;
              $v.userInjury.userInjuryDescriptionAr.$touch();
            "
            :title="$t('UserInjuries.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-userInjuryDescriptionEn`"
            :errors="errors_userInjuryDescriptionEn"
            :value="userInjury.userInjuryDescriptionEn"
            v-on:changeValue="
              userInjury.userInjuryDescriptionEn = $event;
              $v.userInjury.userInjuryDescriptionEn.$touch();
            "
            :title="$t('UserInjuries.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-userInjuryDescriptionUnd`"
            :value="userInjury.userInjuryDescriptionUnd"
            v-on:changeValue="userInjury.userInjuryDescriptionUnd = $event"
            :title="$t('UserInjuries.descriptionUnd')"
            :imgName="'description.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-userInjuryNotes`"
            :value="userInjury.userInjuryNotes"
            v-on:changeValue="userInjury.userInjuryNotes = $event"
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
import { USER_TYPE } from "./../../../../utils/constantLists";
import {
  fullPathFileFromServer,
  bottomSheetScrollToTop,
} from "./../../../../utils/functions";
import {
  isValidTextAr,
  isValidTextEn,
} from "./../../../../utils/validationHelper";
import CustomFileInput from "./../../../../components/general/CustomFileInput.vue";
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import CustomInput from "./../../../../components/general/CustomInput.vue";
import DateTimePicker from "./../../../../components/general/DateTimePicker.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import {
  hasAdminsEgyptInjuryDeleteImage,
  hasMasterAdminInjuryDeleteImage,
  hasEmployeeInjuryDeleteImage,
  hasStudentInjuryDeleteImage,
  hasSupplierInjuryDeleteImage,
  hasParentInjuryDeleteImage,
  hasClientInjuryDeleteImage,
} from "./../../../../utils/privilegeHelper";
import { checkPrivilege, getLanguage } from "./../../../../utils/functions";
import {
  getInjuryTypesDialog,
  getBodyPartsDialog,
} from "./../../../../utils/dialogsOfApi";
import generalMixin from "./../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomFileInput,
    PreLoader,
    CustomSelectBox,
    CustomInput,
    DateTimePicker,
    TextArea,
  },
  data() {
    return {
      isLoading: false,
      language: getLanguage(),
      injuryTypeTokenOptions: [],
      bodyPartTokenOptions: [],
    };
  },
  props: {
    userInjury: {
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
    userInjury: {
      injuryTypeToken: { required },
      bodyPartToken: { required },
      userInjuryDescriptionAr: { isValidTextAr },
      userInjuryDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_injuryTypeToken() {
      let errors = [];
      if (this.$v.userInjury.injuryTypeToken.$error) {
        if (!this.$v.userInjury.injuryTypeToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_bodyPartToken() {
      let errors = [];
      if (this.$v.userInjury.bodyPartToken.$error) {
        if (!this.$v.userInjury.bodyPartToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_userInjuryDescriptionAr() {
      let errors = [];
      if (this.$v.userInjury.userInjuryDescriptionAr.$error) {
        if (!this.$v.userInjury.userInjuryDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_userInjuryDescriptionEn() {
      let errors = [];
      if (this.$v.userInjury.userInjuryDescriptionEn.$error) {
        if (!this.$v.userInjury.userInjuryDescriptionEn.isValidTextEn)
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
    hasPrivilegeDeleteImage() {
      let status = false;
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          status = checkPrivilege(hasAdminsEgyptInjuryDeleteImage());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminInjuryDeleteImage());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeeInjuryDeleteImage());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentInjuryDeleteImage());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierInjuryDeleteImage());
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentInjuryDeleteImage());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientInjuryDeleteImage());
          break;
      }
      return status;
    },
  },
  methods: {
    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();

      if (
        this.$v.userInjury.injuryTypeToken.required &&
        this.$v.userInjury.bodyPartToken.required &&
        this.$v.userInjury.userInjuryDescriptionAr.isValidTextAr &&
        this.$v.userInjury.userInjuryDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    async getInjuryTypesDialog() {
      this.isLoading = true;
      this.injuryTypeTokenOptions = await getInjuryTypesDialog();
      this.isLoading = false;
    },
    async getBodyPartsDialog() {
      this.isLoading = true;
      this.bodyPartTokenOptions = await getBodyPartsDialog();
      this.isLoading = false;
    },

    fullPathFileFromServer,
  },
  created() {
    this.getInjuryTypesDialog();
    this.getBodyPartsDialog();
  },
};
</script>
