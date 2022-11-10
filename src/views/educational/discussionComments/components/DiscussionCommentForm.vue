<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="discussionComment.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              discussionComment.discussionCommentMediaPath,
              discussionComment.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !discussionComment.discussionCommentMediaIsDefault &&
            checkPrivilege(hasDiscussionCommentDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="discussionComment.fullCode"
            v-on:changeValue="discussionComment.fullCode = $event"
            :title="$t('DiscussionComments.code')"
            :imgName="'code.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-discussionCommentDescriptionAr`"
            :errors="errors_discussionCommentDescriptionAr"
            :value="discussionComment.discussionCommentDescriptionAr"
            v-on:changeValue="
              discussionComment.discussionCommentDescriptionAr = $event;
              $v.discussionComment.discussionCommentDescriptionAr.$touch();
            "
            :title="$t('DiscussionComments.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-discussionCommentDescriptionEn`"
            :errors="errors_discussionCommentDescriptionEn"
            :value="discussionComment.discussionCommentDescriptionEn"
            v-on:changeValue="
              discussionComment.discussionCommentDescriptionEn = $event;
              $v.discussionComment.discussionCommentDescriptionEn.$touch();
            "
            :title="$t('DiscussionComments.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-discussionCommentDescriptionUnd`"
            :value="discussionComment.discussionCommentDescriptionUnd"
            v-on:changeValue="
              discussionComment.discussionCommentDescriptionUnd = $event
            "
            :title="$t('DiscussionComments.descriptionUnd')"
            :imgName="'description.svg'"
          />

          <CustomSelectBoxMultiple
            :className="'col-md-12'"
            :id="`${id}-userTokens`"
            :value="discussionComment.userTokens"
            :options="lecturerTokenOptions"
            v-on:changeValue="discussionComment.lecturerTokens = $event"
            :title="$t('lecturers.select')"
            :imgName="'lecturers.svg'"
            :returnArrayOfObjects="false"
          />

          <CustomSelectBoxMultiple
            :className="'col-md-12'"
            :id="`${id}-userTokens`"
            :value="discussionComment.userTokens"
            :options="studentTokenOptions"
            v-on:changeValue="discussionComment.studentTokens = $event"
            :title="$t('students.select')"
            :imgName="'students.svg'"
            :returnArrayOfObjects="false"
          />
          <TextArea
            :className="'col-md-12'"
            :id="`${id}-discussionCommentNotes`"
            :value="discussionComment.discussionCommentNotes"
            v-on:changeValue="discussionComment.discussionCommentNotes = $event"
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
} from "./../../../../utils/functions";
import {
  isValidTextAr,
  isValidTextEn,
} from "./../../../../utils/validationHelper";
import CustomFileInput from "./../../../../components/general/CustomFileInput.vue";
import CustomInput from "./../../../../components/general/CustomInput.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import CustomSelectBoxMultiple from "./../../../../components/general/CustomSelectBoxMultiple.vue";
import { hasDiscussionCommentDeleteImage } from "./../../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../../utils/functions";
import generalMixin from "./../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
// import { required } from "vuelidate/lib/validators";
import PreLoader from "./../../../../components/general/PreLoader.vue";
import {
  getEducationalGroupEmployeesDialog,
  getEducationalGroupStudentsDialog,
} from "./../../../../utils/dialogsOfApi";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomFileInput,
    PreLoader,
    CustomInput,
    TextArea,
    CustomSelectBoxMultiple,
  },
  data() {
    return {
      isLoading: false,
      language: getLanguage(),
      lecturerTokenOptions: [],
      studentTokenOptions: [],
    };
  },
  props: {
    discussionComment: {
      type: Object,
    },
    educationalGroupToken: {
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
    discussionComment: {
      discussionCommentDescriptionAr: { isValidTextAr },
      discussionCommentDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_discussionCommentDescriptionAr() {
      let errors = [];
      if (this.$v.discussionComment.discussionCommentDescriptionAr.$error) {
        if (
          !this.$v.discussionComment.discussionCommentDescriptionAr
            .isValidTextAr
        )
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_discussionCommentDescriptionEn() {
      let errors = [];
      if (this.$v.discussionComment.discussionCommentDescriptionEn.$error) {
        if (
          !this.$v.discussionComment.discussionCommentDescriptionEn
            .isValidTextEn
        )
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
  },

  methods: {
    async getEducationalGroupEmployeesDialog() {
      this.isLoading = true;
      this.lecturerTokenOptions = [];
      let params = {
        educationalGroupToken: this.educationalGroupToken,
      };
      this.lecturerTokenOptions = await getEducationalGroupEmployeesDialog(
        params
      );

      this.isLoading = false;
    },
    async getEducationalGroupStudentsDialog() {
      this.isLoading = true;
      this.studentTokenOptions = [];
      let params = {
        educationalGroupToken: this.educationalGroupToken,
      };
      this.studentTokenOptions = await getEducationalGroupStudentsDialog(
        params
      );

      this.isLoading = false;
    },
    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        this.$v.discussionComment.discussionCommentDescriptionAr
          .isValidTextAr &&
        this.$v.discussionComment.discussionCommentDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasDiscussionCommentDeleteImage,
    fullPathFileFromServer,
  },
  async created() {
    this.getEducationalGroupEmployeesDialog();
    this.getEducationalGroupStudentsDialog();
  },
};
</script>
