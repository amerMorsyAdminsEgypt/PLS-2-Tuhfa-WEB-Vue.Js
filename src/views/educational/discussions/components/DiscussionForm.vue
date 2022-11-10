<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="discussion.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              discussion.discussionImagePath,
              discussion.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !discussion.discussionImageIsDefault &&
            checkPrivilege(hasDiscussionDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="discussion.fullCode"
            v-on:changeValue="discussion.fullCode = $event"
            :title="$t('Discussions.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-discussionTitleAr`"
            :errors="errors_discussionTitleAr"
            :value="discussion.discussionTitleAr"
            v-on:changeValue="
              discussion.discussionTitleAr = $event;
              $v.discussion.discussionTitleAr.$touch();
            "
            :title="$t('Discussions.titleAr')"
            :imgName="'discussions.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-discussionTitleEn`"
            :errors="errors_discussionTitleEn"
            :value="discussion.discussionTitleEn"
            v-on:changeValue="
              discussion.discussionTitleEn = $event;
              $v.discussion.discussionTitleEn.$touch();
            "
            :title="$t('Discussions.titleEn')"
            :imgName="'discussions.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-discussionTitleUnd`"
            :value="discussion.discussionTitleUnd"
            v-on:changeValue="discussion.discussionTitleUnd = $event"
            :title="$t('Discussions.titleUnd')"
            :imgName="'discussions.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-discussionDescriptionAr`"
            :errors="errors_discussionDescriptionAr"
            :value="discussion.discussionDescriptionAr"
            v-on:changeValue="
              discussion.discussionDescriptionAr = $event;
              $v.discussion.discussionDescriptionAr.$touch();
            "
            :title="$t('Discussions.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-discussionDescriptionEn`"
            :errors="errors_discussionDescriptionEn"
            :value="discussion.discussionDescriptionEn"
            v-on:changeValue="
              discussion.discussionDescriptionEn = $event;
              $v.discussion.discussionDescriptionEn.$touch();
            "
            :title="$t('Discussions.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-discussionDescriptionUnd`"
            :value="discussion.discussionDescriptionUnd"
            v-on:changeValue="discussion.discussionDescriptionUnd = $event"
            :title="$t('Discussions.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-discussionNotes`"
            :value="discussion.discussionNotes"
            v-on:changeValue="discussion.discussionNotes = $event"
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
  isValidNameAr,
  isValidNameEn,
  isValidTextAr,
  isValidTextEn,
} from "./../../../../utils/validationHelper";
import CustomFileInput from "./../../../../components/general/CustomFileInput.vue";
import CustomInput from "./../../../../components/general/CustomInput.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import { hasDiscussionDeleteImage } from "./../../../../utils/privilegeHelper";
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
  },
  data() {
    return {
      language: getLanguage(),
    };
  },
  props: {
    discussion: {
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
    discussion: {
      discussionTitleAr: { required, isValidNameAr },
      discussionTitleEn: { required, isValidNameEn },
      discussionStartDateTime: { required },
      discussionEndDateTime: { required },
      discussionDescriptionAr: { isValidTextAr },
      discussionDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_discussionTitleAr() {
      let errors = [];
      if (this.$v.discussion.discussionTitleAr.$error) {
        if (
          !this.$v.discussion.discussionTitleAr.required &&
          !this.$v.discussion.discussionTitleEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.discussion.discussionTitleAr.required &&
          !this.$v.discussion.discussionTitleAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_discussionTitleEn() {
      let errors = [];
      if (this.$v.discussion.discussionTitleEn.$error) {
        if (
          !this.$v.discussion.discussionTitleAr.required &&
          !this.$v.discussion.discussionTitleEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.discussion.discussionTitleEn.required &&
          !this.$v.discussion.discussionTitleEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_discussionStartDateTime() {
      let errors = [];
      if (this.$v.discussion.discussionStartDateTime.$error) {
        if (!this.$v.discussion.discussionStartDateTime.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_discussionEndDateTime() {
      let errors = [];
      if (this.$v.discussion.discussionEndDateTime.$error) {
        if (!this.$v.discussion.discussionEndDateTime.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_discussionDescriptionAr() {
      let errors = [];
      if (this.$v.discussion.discussionDescriptionAr.$error) {
        if (!this.$v.discussion.discussionDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_discussionDescriptionEn() {
      let errors = [];
      if (this.$v.discussion.discussionDescriptionEn.$error) {
        if (!this.$v.discussion.discussionDescriptionEn.isValidTextEn)
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
  },
  methods: {
    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        ((this.$v.discussion.discussionTitleAr.required &&
          this.$v.discussion.discussionTitleAr.isValidNameAr) ||
          (this.$v.discussion.discussionTitleEn.required &&
            this.$v.discussion.discussionTitleEn.isValidNameEn)) &&
        this.$v.discussion.discussionDescriptionAr.isValidTextAr &&
        this.$v.discussion.discussionDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasDiscussionDeleteImage,
    fullPathFileFromServer,
  },
};
</script>
