<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="userQualification.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              userQualification.userQualificationImagePath,
              userQualification.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !userQualification.userQualificationImageIsDefault &&
            hasPrivilegeDeleteImage
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-qualificationToken`"
            :errors="errors_qualificationToken"
            :value="userQualification.qualificationToken"
            :options="qualificationTokenOptions"
            v-on:changeValue="
              userQualification.qualificationToken = $event;
              $v.userQualification.qualificationToken.$touch();
            "
            :title="$t('Qualifications.select')"
            :imgName="'qualifications.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-classificationDegreeToken`"
            :value="userQualification.classificationDegreeToken"
            :options="classificationDegreeTokenOptions"
            v-on:changeValue="
              userQualification.classificationDegreeToken = $event
            "
            :title="$t('ClassificationDegrees.select')"
            :imgName="'classificationDegrees.svg'"
          />

          <DateTimePicker
            class="col-md-6"
            :id="`${id}-joiningDateTime`"
            type="dateTime"
            :value="userQualification.joiningDateTime"
            :title="$t('UserQualifications.joiningDateTime')"
            v-on:changeValue="
              userQualification.joiningDateTime = $event.dateTime
            "
            :language="language"
          />

          <DateTimePicker
            class="col-md-6"
            :id="`${id}-obtainingDateTime`"
            type="dateTime"
            :value="userQualification.obtainingDateTime"
            :title="$t('UserQualifications.obtainingDateTime')"
            v-on:changeValue="
              userQualification.obtainingDateTime = $event.dateTime
            "
            :language="language"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="userQualification.fullCode"
            v-on:changeValue="userQualification.fullCode = $event"
            :title="$t('UserQualifications.code')"
            :imgName="'code.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-userQualificationDescriptionAr`"
            :errors="errors_userQualificationDescriptionAr"
            :value="userQualification.userQualificationDescriptionAr"
            v-on:changeValue="
              userQualification.userQualificationDescriptionAr = $event;
              $v.userQualification.userQualificationDescriptionAr.$touch();
            "
            :title="$t('UserQualifications.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-userQualificationDescriptionEn`"
            :errors="errors_userQualificationDescriptionEn"
            :value="userQualification.userQualificationDescriptionEn"
            v-on:changeValue="
              userQualification.userQualificationDescriptionEn = $event;
              $v.userQualification.userQualificationDescriptionEn.$touch();
            "
            :title="$t('UserQualifications.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-userQualificationDescriptionUnd`"
            :value="userQualification.userQualificationDescriptionUnd"
            v-on:changeValue="
              userQualification.userQualificationDescriptionUnd = $event
            "
            :title="$t('UserQualifications.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-12'"
            :id="`${id}-userQualificationNotes`"
            :value="userQualification.userQualificationNotes"
            v-on:changeValue="userQualification.userQualificationNotes = $event"
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
  hasAdminsEgyptQualificationDeleteImage,
  hasMasterAdminQualificationDeleteImage,
  hasEmployeeQualificationDeleteImage,
  hasStudentQualificationDeleteImage,
  hasSupplierQualificationDeleteImage,
  hasParentQualificationDeleteImage,
  hasClientQualificationDeleteImage,
} from "./../../../../utils/privilegeHelper";
import { checkPrivilege, getLanguage } from "./../../../../utils/functions";
import {
  getQualificationsDialog,
  getClassificationDegreesDialog,
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
      qualificationTokenOptions: [],
      classificationDegreeTokenOptions: [],
    };
  },
  props: {
    userQualification: {
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
    userQualification: {
      qualificationToken: { required },
      userQualificationDescriptionAr: { isValidTextAr },
      userQualificationDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_qualificationToken() {
      let errors = [];
      if (this.$v.userQualification.qualificationToken.$error) {
        if (!this.$v.userQualification.qualificationToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_userQualificationDescriptionAr() {
      let errors = [];
      if (this.$v.userQualification.userQualificationDescriptionAr.$error) {
        if (
          !this.$v.userQualification.userQualificationDescriptionAr
            .isValidTextAr
        )
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_userQualificationDescriptionEn() {
      let errors = [];
      if (this.$v.userQualification.userQualificationDescriptionEn.$error) {
        if (
          !this.$v.userQualification.userQualificationDescriptionEn
            .isValidTextEn
        )
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
    hasPrivilegeDeleteImage() {
      let status = false;
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          status = checkPrivilege(hasAdminsEgyptQualificationDeleteImage());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminQualificationDeleteImage());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeeQualificationDeleteImage());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentQualificationDeleteImage());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierQualificationDeleteImage());
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentQualificationDeleteImage());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientQualificationDeleteImage());
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
        this.$v.userQualification.qualificationToken.required &&
        this.$v.userQualification.userQualificationDescriptionAr
          .isValidTextAr &&
        this.$v.userQualification.userQualificationDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    async getQualificationsDialog() {
      this.isLoading = true;
      this.qualificationTokenOptions = await getQualificationsDialog();
      this.isLoading = false;
    },
    async getClassificationDegreesDialog() {
      this.isLoading = true;
      this.classificationDegreeTokenOptions =
        await getClassificationDegreesDialog();
      this.isLoading = false;
    },
    fullPathFileFromServer,
  },
  created() {
    this.getQualificationsDialog();
    this.getClassificationDegreesDialog();
  },
};
</script>
