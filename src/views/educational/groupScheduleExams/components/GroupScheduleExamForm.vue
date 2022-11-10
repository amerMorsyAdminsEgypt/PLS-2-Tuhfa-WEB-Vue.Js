<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="groupScheduleExam.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              groupScheduleExam.groupScheduleExamImagePath,
              groupScheduleExam.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !groupScheduleExam.groupScheduleExamImageIsDefault &&
            checkPrivilege(hasGroupScheduleExamDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <DateTimePicker
            class="col-md-6"
            :id="`${id}-startExamDateTime`"
            type="dateTime"
            :errors="errors_startExamDateTime"
            :value="groupScheduleExam.startExamDateTime"
            :title="$t('from')"
            v-on:changeValue="
              groupScheduleExam.startExamDateTime = $event.dateTime;
              $v.groupScheduleExam.startExamDateTime.$touch();
            "
            :language="language"
          />
          <DateTimePicker
            class="col-md-6"
            :id="`${id}-endExamDateTime`"
            type="dateTime"
            :errors="errors_endExamDateTime"
            :value="groupScheduleExam.endExamDateTime"
            :title="$t('to')"
            v-on:changeValue="
              groupScheduleExam.endExamDateTime = $event.dateTime;
              $v.groupScheduleExam.startExamDateTime.$touch();
            "
            :language="language"
          />

          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-educationalCategoryToken`"
            :value="groupScheduleExam.educationalCategoryToken"
            :options="educationalCategoryTokenOptions"
            v-on:changeValue="educationalCategoryTokenChanged($event)"
            :title="$t('EducationalCategories.select')"
            :imgName="'EducationalCategories.svg'"
            :returnArrayOfObjects="false"
          />

          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-educationalGroupToken`"
            :errors="errors_educationalGroupToken"
            :value="groupScheduleExam.educationalGroupToken"
            :options="educationalGroupTokenOptions"
            v-on:changeValue="
              groupScheduleExam.educationalGroupToken = $event;
              $v.groupScheduleExam.educationalGroupToken.$touch();
            "
            :title="$t('EducationalGroups.select')"
            :imgName="'EducationalGroups.svg'"
          />
          <CustomSelectBox
            :className="'col-md-12'"
            :id="`${id}-simpleExamModelToken`"
            :errors="errors_simpleExamModelToken"
            :value="groupScheduleExam.simpleExamModelToken"
            :options="simpleExamModelTokenOptions"
            v-on:changeValue="
              groupScheduleExam.simpleExamModelToken = $event;
              $v.groupScheduleExam.simpleExamModelToken.$touch();
            "
            :title="$t('SimpleExamModels.select')"
            :imgName="'SimpleExamModels.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="groupScheduleExam.fullCode"
            v-on:changeValue="groupScheduleExam.fullCode = $event"
            :title="$t('GroupScheduleExams.code')"
            :imgName="'code.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-groupScheduleExamDescriptionAr`"
            :errors="errors_groupScheduleExamDescriptionAr"
            :value="groupScheduleExam.groupScheduleExamDescriptionAr"
            v-on:changeValue="
              groupScheduleExam.groupScheduleExamDescriptionAr = $event;
              $v.groupScheduleExam.groupScheduleExamDescriptionAr.$touch();
            "
            :title="$t('GroupScheduleExams.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-groupScheduleExamDescriptionEn`"
            :errors="errors_groupScheduleExamDescriptionEn"
            :value="groupScheduleExam.groupScheduleExamDescriptionEn"
            v-on:changeValue="
              groupScheduleExam.groupScheduleExamDescriptionEn = $event;
              $v.groupScheduleExam.groupScheduleExamDescriptionEn.$touch();
            "
            :title="$t('GroupScheduleExams.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-groupScheduleExamDescriptionUnd`"
            :value="groupScheduleExam.groupScheduleExamDescriptionUnd"
            v-on:changeValue="
              groupScheduleExam.groupScheduleExamDescriptionUnd = $event
            "
            :title="$t('GroupScheduleExams.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-12'"
            :id="`${id}-groupScheduleExamNotes`"
            :value="groupScheduleExam.groupScheduleExamNotes"
            v-on:changeValue="groupScheduleExam.groupScheduleExamNotes = $event"
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
  fullPathFileFromServer,
  bottomSheetScrollToTop,
  getLanguage,
} from "./../../../../utils/functions";
import {
  isValidTextAr,
  isValidTextEn,
} from "./../../../../utils/validationHelper";
import CustomFileInput from "./../../../../components/general/CustomFileInput.vue";
import CustomInput from "./../../../../components/general/CustomInput.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import DateTimePicker from "./../../../../components/general/DateTimePicker.vue";
import {
  getEducationalCategoriesDialog,
  getEducationalGroupsDialog,
  getSimpleExamModelsDialog,
} from "./../../../../utils/dialogsOfApi";
import { hasGroupScheduleExamDeleteImage } from "./../../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../../utils/functions";
import generalMixin from "./../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomFileInput,
    CustomInput,
    TextArea,
    CustomSelectBox,
    DateTimePicker,
  },
  data() {
    return {
      language: getLanguage(),
      educationalCategoryTokenOptions: [],
      educationalGroupTokenOptions: [],
      simpleExamModelTokenOptions: [],
    };
  },
  props: {
    groupScheduleExam: {
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
    groupScheduleExam: {
      groupScheduleExamDescriptionAr: { isValidTextAr },
      groupScheduleExamDescriptionEn: { isValidTextEn },
      educationalGroupToken: { required },
      simpleExamModelToken: { required },
      startExamDateTime: { required },
      endExamDateTime: { required },
    },
  },
  computed: {
    errors_groupScheduleExamDescriptionAr() {
      let errors = [];
      if (this.$v.groupScheduleExam.groupScheduleExamDescriptionAr.$error) {
        if (
          !this.$v.groupScheduleExam.groupScheduleExamDescriptionAr
            .isValidTextAr
        )
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_groupScheduleExamDescriptionEn() {
      let errors = [];
      if (this.$v.groupScheduleExam.groupScheduleExamDescriptionEn.$error) {
        if (
          !this.$v.groupScheduleExam.groupScheduleExamDescriptionEn
            .isValidTextEn
        )
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
    errors_educationalGroupToken() {
      let errors = [];
      if (this.$v.groupScheduleExam.educationalGroupToken.$error) {
        if (!this.$v.groupScheduleExam.educationalGroupToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_simpleExamModelToken() {
      let errors = [];
      if (this.$v.groupScheduleExam.simpleExamModelToken.$error) {
        if (!this.$v.groupScheduleExam.simpleExamModelToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_startExamDateTime() {
      let errors = [];
      if (this.$v.groupScheduleExam.startExamDateTime.$error) {
        if (!this.$v.groupScheduleExam.startExamDateTime.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_endExamDateTime() {
      let errors = [];
      if (this.$v.groupScheduleExam.endExamDateTime.$error) {
        if (!this.$v.groupScheduleExam.endExamDateTime.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
  },
  methods: {
    async getEducationalCategoriesDialog() {
      this.isLoading = true;
      this.educationalCategoryTokenOptions =
        await getEducationalCategoriesDialog();
      this.isLoading = false;
    },
    async educationalCategoryTokenChanged(token) {
      this.groupScheduleExam.educationalCategoryToken = token;
    },
    async getEducationalGroupsDialog() {
      this.isLoading = true;
      let params = {
        educationalCategoryToken:
          this.groupScheduleExam.educationalCategoryToken,
      };
      this.educationalGroupTokenOptions = await getEducationalGroupsDialog(
        params
      );
      this.isLoading = false;
    },
    async getSimpleExamModelsDialog() {
      this.isLoading = true;
      this.simpleExamModelTokenOptions = await getSimpleExamModelsDialog();
      this.isLoading = false;
    },
    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        this.$v.groupScheduleExam.groupScheduleExamDescriptionAr
          .isValidTextAr &&
        this.$v.groupScheduleExam.groupScheduleExamDescriptionEn
          .isValidTextEn &&
        this.$v.groupScheduleExam.educationalGroupToken.required &&
        this.$v.groupScheduleExam.simpleExamModelToken.required &&
        this.$v.groupScheduleExam.startExamDateTime.required &&
        this.$v.groupScheduleExam.endExamDateTime.required
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasGroupScheduleExamDeleteImage,
    fullPathFileFromServer,
  },
  created() {
    this.getEducationalCategoriesDialog();
    this.getEducationalGroupsDialog();
    this.getSimpleExamModelsDialog();
  },
};
</script>
