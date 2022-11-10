<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="userExperience.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              userExperience.userExperienceImagePath,
              userExperience.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !userExperience.userExperienceImageIsDefault &&
            hasPrivilegeDeleteImage
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-generalJobToken`"
            :errors="errors_generalJobToken"
            :value="userExperience.generalJobToken"
            :options="generalJobTokenOptions"
            v-on:changeValue="
              userExperience.generalJobToken = $event;
              $v.userExperience.generalJobToken.$touch();
            "
            :title="$t('GeneralJobs.select')"
            :imgName="'generalJobs.svg'"
          />
          <DateTimePicker
            class="col-md-6"
            :id="`${id}-startDateTime`"
            type="dateTime"
            :value="userExperience.startDateTime"
            :title="$t('UserExperiences.startDateTime')"
            v-on:changeValue="userExperience.startDateTime = $event.dateTime"
            :language="language"
            :maxDate="new Date()"
          />

          <DateTimePicker
            class="col-md-6"
            :id="`${id}-endDateTime`"
            type="dateTime"
            :value="userExperience.endDateTime"
            :title="$t('UserExperiences.endDateTime')"
            v-on:changeValue="userExperience.endDateTime = $event.dateTime"
            :language="language"
            :maxDate="new Date()"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="userExperience.fullCode"
            v-on:changeValue="userExperience.fullCode = $event"
            :title="$t('UserExperiences.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-userExperiencePlaceNameAr`"
            :errors="errors_userExperiencePlaceNameAr"
            :value="userExperience.userExperiencePlaceNameAr"
            v-on:changeValue="
              userExperience.userExperiencePlaceNameAr = $event;
              $v.userExperience.userExperiencePlaceNameAr.$touch();
            "
            :title="$t('UserExperiences.PlaceNameAr')"
            :imgName="'address.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-userExperiencePlaceNameEn`"
            :errors="errors_userExperiencePlaceNameEn"
            :value="userExperience.userExperiencePlaceNameEn"
            v-on:changeValue="
              userExperience.userExperiencePlaceNameEn = $event;
              $v.userExperience.userExperiencePlaceNameEn.$touch();
            "
            :title="$t('UserExperiences.PlaceNameEn')"
            :imgName="'address.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-userExperiencePlaceNameUnd`"
            :value="userExperience.userExperiencePlaceNameUnd"
            v-on:changeValue="
              userExperience.userExperiencePlaceNameUnd = $event
            "
            :title="$t('UserExperiences.PlaceNameUnd')"
            :imgName="'address.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-userExperienceDescriptionAr`"
            :errors="errors_userExperienceDescriptionAr"
            :value="userExperience.userExperienceDescriptionAr"
            v-on:changeValue="
              userExperience.userExperienceDescriptionAr = $event;
              $v.userExperience.userExperienceDescriptionAr.$touch();
            "
            :title="$t('UserExperiences.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-userExperienceDescriptionEn`"
            :errors="errors_userExperienceDescriptionEn"
            :value="userExperience.userExperienceDescriptionEn"
            v-on:changeValue="
              userExperience.userExperienceDescriptionEn = $event;
              $v.userExperience.userExperienceDescriptionEn.$touch();
            "
            :title="$t('UserExperiences.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-userExperienceDescriptionUnd`"
            :value="userExperience.userExperienceDescriptionUnd"
            v-on:changeValue="
              userExperience.userExperienceDescriptionUnd = $event
            "
            :title="$t('UserExperiences.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-12'"
            :id="`${id}-userExperienceNotes`"
            :value="userExperience.userExperienceNotes"
            v-on:changeValue="userExperience.userExperienceNotes = $event"
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
  isValidNameAr,
  isValidNameEn,
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
  hasAdminsEgyptExperienceDeleteImage,
  hasMasterAdminExperienceDeleteImage,
  hasEmployeeExperienceDeleteImage,
  hasStudentExperienceDeleteImage,
  hasSupplierExperienceDeleteImage,
  hasParentExperienceDeleteImage,
  hasClientExperienceDeleteImage,
} from "./../../../../utils/privilegeHelper";
import { checkPrivilege, getLanguage } from "./../../../../utils/functions";
import { getGeneralJobsDialog } from "./../../../../utils/dialogsOfApi";
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
      generalJobTokenOptions: [],
    };
  },
  props: {
    userExperience: {
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
    userExperience: {
      generalJobToken: { required },
      userExperiencePlaceNameAr: { required, isValidNameAr },
      userExperiencePlaceNameEn: { required, isValidNameEn },
      userExperienceDescriptionAr: { isValidTextAr },
      userExperienceDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_generalJobToken() {
      let errors = [];
      if (this.$v.userExperience.generalJobToken.$error) {
        if (!this.$v.userExperience.generalJobToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_userExperiencePlaceNameAr() {
      let errors = [];
      if (this.$v.userExperience.userExperiencePlaceNameAr.$error) {
        if (
          !this.$v.userExperience.userExperiencePlaceNameAr.required &&
          !this.$v.userExperience.userExperiencePlaceNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.userExperience.userExperiencePlaceNameAr.required &&
          !this.$v.userExperience.userExperiencePlaceNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_userExperiencePlaceNameEn() {
      let errors = [];
      if (this.$v.userExperience.userExperiencePlaceNameEn.$error) {
        if (
          !this.$v.userExperience.userExperiencePlaceNameEn.required &&
          !this.$v.userExperience.userExperiencePlaceNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.userExperience.userExperiencePlaceNameEn.required &&
          !this.$v.userExperience.userExperiencePlaceNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_userExperienceDescriptionAr() {
      let errors = [];
      if (this.$v.userExperience.userExperienceDescriptionAr.$error) {
        if (!this.$v.userExperience.userExperienceDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_userExperienceDescriptionEn() {
      let errors = [];
      if (this.$v.userExperience.userExperienceDescriptionEn.$error) {
        if (!this.$v.userExperience.userExperienceDescriptionEn.isValidTextEn)
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
    hasPrivilegeDeleteImage() {
      let status = false;
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          status = checkPrivilege(hasAdminsEgyptExperienceDeleteImage());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminExperienceDeleteImage());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeeExperienceDeleteImage());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentExperienceDeleteImage());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierExperienceDeleteImage());
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentExperienceDeleteImage());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientExperienceDeleteImage());
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
        this.$v.userExperience.generalJobToken.required &&
        ((this.$v.userExperience.userExperiencePlaceNameAr.required &&
          this.$v.userExperience.userExperiencePlaceNameAr.isValidNameAr) ||
          (this.$v.userExperience.userExperiencePlaceNameEn.required &&
            this.$v.userExperience.userExperiencePlaceNameEn.isValidNameEn)) &&
        this.$v.userExperience.userExperienceDescriptionAr.isValidTextAr &&
        this.$v.userExperience.userExperienceDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    async getGeneralJobsDialog() {
      this.isLoading = true;
      this.generalJobTokenOptions = await getGeneralJobsDialog();
      this.isLoading = false;
    },

    fullPathFileFromServer,
  },
  created() {
    this.getGeneralJobsDialog();
  },
};
</script>
