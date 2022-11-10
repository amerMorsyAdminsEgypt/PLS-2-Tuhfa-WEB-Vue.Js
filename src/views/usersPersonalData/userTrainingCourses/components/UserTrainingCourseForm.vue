<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="userTrainingCourse.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              userTrainingCourse.userTrainingCourseImagePath,
              userTrainingCourse.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !userTrainingCourse.userTrainingCourseImageIsDefault &&
            hasPrivilegeDeleteImage
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-certificateToken`"
            :errors="errors_certificateToken"
            :value="userTrainingCourse.certificateToken"
            :options="certificateTokenOptions"
            v-on:changeValue="
              userTrainingCourse.certificateToken = $event;
              $v.userTrainingCourse.certificateToken.$touch();
            "
            :title="$t('Certificates.select')"
            :imgName="'certificates.svg'"
          />
          <DateTimePicker
            class="col-md-6"
            :id="`${id}-joiningDateTime`"
            type="dateTime"
            :value="userTrainingCourse.joiningDateTime"
            :title="$t('UserTrainingCourses.joiningDateTime')"
            v-on:changeValue="
              userTrainingCourse.joiningDateTime = $event.dateTime
            "
            :language="language"
            :maxDate="new Date()"
          />

          <DateTimePicker
            class="col-md-6"
            :id="`${id}-obtainingDateTime`"
            type="dateTime"
            :value="userTrainingCourse.obtainingDateTime"
            :title="$t('UserTrainingCourses.obtainingDateTime')"
            v-on:changeValue="
              userTrainingCourse.obtainingDateTime = $event.dateTime
            "
            :language="language"
            :maxDate="new Date()"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="userTrainingCourse.fullCode"
            v-on:changeValue="userTrainingCourse.fullCode = $event"
            :title="$t('UserTrainingCourses.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-userTrainingCourseNameAr`"
            :errors="errors_userTrainingCourseNameAr"
            :value="userTrainingCourse.userTrainingCourseNameAr"
            v-on:changeValue="
              userTrainingCourse.userTrainingCourseNameAr = $event;
              $v.userTrainingCourse.userTrainingCourseNameAr.$touch();
            "
            :title="$t('UserTrainingCourses.nameAr')"
            :imgName="'UserTrainingCourses.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-userTrainingCourseNameEn`"
            :errors="errors_userTrainingCourseNameEn"
            :value="userTrainingCourse.userTrainingCourseNameEn"
            v-on:changeValue="
              userTrainingCourse.userTrainingCourseNameEn = $event;
              $v.userTrainingCourse.userTrainingCourseNameEn.$touch();
            "
            :title="$t('UserTrainingCourses.nameEn')"
            :imgName="'UserTrainingCourses.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-userTrainingCourseNameUnd`"
            :value="userTrainingCourse.userTrainingCourseNameUnd"
            v-on:changeValue="
              userTrainingCourse.userTrainingCourseNameUnd = $event
            "
            :title="$t('UserTrainingCourses.nameUnd')"
            :imgName="'UserTrainingCourses.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-userTrainingCourseDescriptionAr`"
            :errors="errors_userTrainingCourseDescriptionAr"
            :value="userTrainingCourse.userTrainingCourseDescriptionAr"
            v-on:changeValue="
              userTrainingCourse.userTrainingCourseDescriptionAr = $event;
              $v.userTrainingCourse.userTrainingCourseDescriptionAr.$touch();
            "
            :title="$t('UserTrainingCourses.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-userTrainingCourseDescriptionEn`"
            :errors="errors_userTrainingCourseDescriptionEn"
            :value="userTrainingCourse.userTrainingCourseDescriptionEn"
            v-on:changeValue="
              userTrainingCourse.userTrainingCourseDescriptionEn = $event;
              $v.userTrainingCourse.userTrainingCourseDescriptionEn.$touch();
            "
            :title="$t('UserTrainingCourses.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-userTrainingCourseDescriptionUnd`"
            :value="userTrainingCourse.userTrainingCourseDescriptionUnd"
            v-on:changeValue="
              userTrainingCourse.userTrainingCourseDescriptionUnd = $event
            "
            :title="$t('UserTrainingCourses.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-12'"
            :id="`${id}-userTrainingCourseNotes`"
            :value="userTrainingCourse.userTrainingCourseNotes"
            v-on:changeValue="
              userTrainingCourse.userTrainingCourseNotes = $event
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
  hasAdminsEgyptTrainingCourseDeleteImage,
  hasMasterAdminTrainingCourseDeleteImage,
  hasEmployeeTrainingCourseDeleteImage,
  hasStudentTrainingCourseDeleteImage,
  hasSupplierTrainingCourseDeleteImage,
  hasParentTrainingCourseDeleteImage,
  hasClientTrainingCourseDeleteImage,
} from "./../../../../utils/privilegeHelper";
import { getCertificatesDialog } from "./../../../../utils/dialogsOfApi";
import { checkPrivilege, getLanguage } from "./../../../../utils/functions";
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
      certificateTokenOptions: [],
    };
  },
  props: {
    userTrainingCourse: {
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
    userTrainingCourse: {
      certificateToken: { required },
      userTrainingCourseNameAr: { required, isValidNameAr },
      userTrainingCourseNameEn: { required, isValidNameEn },
      userTrainingCourseDescriptionAr: { isValidTextAr },
      userTrainingCourseDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_certificateToken() {
      let errors = [];
      if (this.$v.userTrainingCourse.certificateToken.$error) {
        if (!this.$v.userTrainingCourse.certificateToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_userTrainingCourseNameAr() {
      let errors = [];
      if (this.$v.userTrainingCourse.userTrainingCourseNameAr.$error) {
        if (
          !this.$v.userTrainingCourse.userTrainingCourseNameAr.required &&
          !this.$v.userTrainingCourse.userTrainingCourseNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.userTrainingCourse.userTrainingCourseNameAr.required &&
          !this.$v.userTrainingCourse.userTrainingCourseNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_userTrainingCourseNameEn() {
      let errors = [];
      if (this.$v.userTrainingCourse.userTrainingCourseNameEn.$error) {
        if (
          !this.$v.userTrainingCourse.userTrainingCourseNameEn.required &&
          !this.$v.userTrainingCourse.userTrainingCourseNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.userTrainingCourse.userTrainingCourseNameEn.required &&
          !this.$v.userTrainingCourse.userTrainingCourseNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_userTrainingCourseDescriptionAr() {
      let errors = [];
      if (this.$v.userTrainingCourse.userTrainingCourseDescriptionAr.$error) {
        if (
          !this.$v.userTrainingCourse.userTrainingCourseDescriptionAr
            .isValidTextAr
        )
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_userTrainingCourseDescriptionEn() {
      let errors = [];
      if (this.$v.userTrainingCourse.userTrainingCourseDescriptionEn.$error) {
        if (
          !this.$v.userTrainingCourse.userTrainingCourseDescriptionEn
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
          status = checkPrivilege(hasAdminsEgyptTrainingCourseDeleteImage());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminTrainingCourseDeleteImage());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeeTrainingCourseDeleteImage());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentTrainingCourseDeleteImage());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierTrainingCourseDeleteImage());
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentTrainingCourseDeleteImage());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientTrainingCourseDeleteImage());
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
        this.$v.userTrainingCourse.certificateToken.required &&
        ((this.$v.userTrainingCourse.userTrainingCourseNameAr.required &&
          this.$v.userTrainingCourse.userTrainingCourseNameAr.isValidNameAr) ||
          (this.$v.userTrainingCourse.userTrainingCourseNameEn.required &&
            this.$v.userTrainingCourse.userTrainingCourseNameEn
              .isValidNameEn)) &&
        this.$v.userTrainingCourse.userTrainingCourseDescriptionAr
          .isValidTextAr &&
        this.$v.userTrainingCourse.userTrainingCourseDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    async getCertificatesDialog() {
      this.isLoading = true;
      this.certificateTokenOptions = await getCertificatesDialog();
      this.isLoading = false;
    },

    fullPathFileFromServer,
  },
  created() {
    this.getCertificatesDialog();
  },
};
</script>
