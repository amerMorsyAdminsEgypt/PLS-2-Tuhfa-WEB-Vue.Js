<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="educationalRating.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              educationalRating.educationalRatingImagePath,
              educationalRating.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !educationalRating.educationalRatingImageIsDefault &&
            checkPrivilege(hasEducationalRatingDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            v-if="
              educationalRating.educationalRatingTypeToken ==
              EDUCATIONAL_RATING_TYPE_TOKENS.EducationalCategory
            "
            :className="'col-md-6'"
            :id="`${id}-educationalCategoryToken`"
            :value="educationalRating.educationalCategoryToken"
            :options="educationalCategoryTokenOptions"
            v-on:changeValue="
              educationalRating.educationalCategoryToken = $event
            "
            :title="$t('EducationalCategories.select')"
            :imgName="'EducationalCategories.svg'"
          />
          <CustomSelectBox
            v-if="
              educationalRating.educationalRatingTypeToken ==
              EDUCATIONAL_RATING_TYPE_TOKENS.EducationalGroup
            "
            :className="'col-md-6'"
            :id="`${id}-educationalGroupToken`"
            :value="educationalRating.educationalGroupToken"
            :options="educationalGroupTokenOptions"
            v-on:changeValue="educationalRating.educationalGroupToken = $event"
            :title="$t('EducationalGroups.select')"
            :imgName="'EducationalGroups.svg'"
          />

          <CustomRatingStars
            class="col-md-6"
            :id="`${id}-educationalRatingNumber`"
            :showRating="false"
            :value="educationalRating.educationalRatingNumber"
            v-on:changeValue="
              educationalRating.educationalRatingNumber = $event
            "
            :title="$t('EducationalRatings.ratingNumber')"
            :imgName="'educationalRatings.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="educationalRating.fullCode"
            v-on:changeValue="educationalRating.fullCode = $event"
            :title="$t('EducationalRatings.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-educationalRatingTitleAr`"
            :errors="errors_educationalRatingTitleAr"
            :value="educationalRating.educationalRatingTitleAr"
            v-on:changeValue="
              educationalRating.educationalRatingTitleAr = $event;
              $v.educationalRating.educationalRatingTitleAr.$touch();
            "
            :title="$t('EducationalRatings.titleAr')"
            :imgName="'educationalRatings.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-educationalRatingTitleEn`"
            :errors="errors_educationalRatingTitleEn"
            :value="educationalRating.educationalRatingTitleEn"
            v-on:changeValue="
              educationalRating.educationalRatingTitleEn = $event;
              $v.educationalRating.educationalRatingTitleEn.$touch();
            "
            :title="$t('EducationalRatings.titleEn')"
            :imgName="'educationalRatings.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-educationalRatingTitleUnd`"
            :value="educationalRating.educationalRatingTitleUnd"
            v-on:changeValue="
              educationalRating.educationalRatingTitleUnd = $event
            "
            :title="$t('EducationalRatings.titleUnd')"
            :imgName="'educationalRatings.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-educationalRatingDescriptionAr`"
            :errors="errors_educationalRatingDescriptionAr"
            :value="educationalRating.educationalRatingDescriptionAr"
            v-on:changeValue="
              educationalRating.educationalRatingDescriptionAr = $event;
              $v.educationalRating.educationalRatingDescriptionAr.$touch();
            "
            :title="$t('EducationalRatings.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-educationalRatingDescriptionEn`"
            :errors="errors_educationalRatingDescriptionEn"
            :value="educationalRating.educationalRatingDescriptionEn"
            v-on:changeValue="
              educationalRating.educationalRatingDescriptionEn = $event;
              $v.educationalRating.educationalRatingDescriptionEn.$touch();
            "
            :title="$t('EducationalRatings.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-educationalRatingDescriptionUnd`"
            :value="educationalRating.educationalRatingDescriptionUnd"
            v-on:changeValue="
              educationalRating.educationalRatingDescriptionUnd = $event
            "
            :title="$t('EducationalRatings.descriptionUnd')"
            :imgName="'description.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-educationalRatingNotes`"
            :value="educationalRating.educationalRatingNotes"
            v-on:changeValue="educationalRating.educationalRatingNotes = $event"
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
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import CustomRatingStars from "./../../../../components/general/CustomRatingStars.vue";
import CustomInput from "./../../../../components/general/CustomInput.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import { hasEducationalRatingDeleteImage } from "./../../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../../utils/functions";
import generalMixin from "./../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import {
  getEducationalCategoriesDialog,
  getEducationalGroupsDialog,
} from "./../../../../utils/dialogsOfApi";
import { EDUCATIONAL_RATING_TYPE_TOKENS } from "./../../../../utils/constantLists";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomFileInput,
    CustomSelectBox,
    CustomRatingStars,
    CustomInput,
    TextArea,
  },
  data() {
    return {
      language: getLanguage(),
      EDUCATIONAL_RATING_TYPE_TOKENS: EDUCATIONAL_RATING_TYPE_TOKENS,
      educationalCategoryTokenOptions: [],
      educationalGroupTokenOptions: [],
    };
  },
  props: {
    educationalRating: {
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
    educationalRating: {
      educationalRatingTitleAr: { required, isValidNameAr },
      educationalRatingTitleEn: { required, isValidNameEn },
      educationalRatingDescriptionAr: { isValidTextAr },
      educationalRatingDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_educationalRatingTitleAr() {
      let errors = [];
      if (this.$v.educationalRating.educationalRatingTitleAr.$error) {
        if (
          !this.$v.educationalRating.educationalRatingTitleAr.required &&
          !this.$v.educationalRating.educationalRatingTitleEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.educationalRating.educationalRatingTitleAr.required &&
          !this.$v.educationalRating.educationalRatingTitleAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_educationalRatingTitleEn() {
      let errors = [];
      if (this.$v.educationalRating.educationalRatingTitleEn.$error) {
        if (
          !this.$v.educationalRating.educationalRatingTitleAr.required &&
          !this.$v.educationalRating.educationalRatingTitleEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.educationalRating.educationalRatingTitleEn.required &&
          !this.$v.educationalRating.educationalRatingTitleEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_educationalRatingDescriptionAr() {
      let errors = [];
      if (this.$v.educationalRating.educationalRatingDescriptionAr.$error) {
        if (
          !this.$v.educationalRating.educationalRatingDescriptionAr
            .isValidTextAr
        )
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_educationalRatingDescriptionEn() {
      let errors = [];
      if (this.$v.educationalRating.educationalRatingDescriptionEn.$error) {
        if (
          !this.$v.educationalRating.educationalRatingDescriptionEn
            .isValidTextEn
        )
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
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
    async getEducationalGroupsDialog() {
      this.isLoading = true;
      this.educationalGroupTokenOptions = await getEducationalGroupsDialog();
      this.isLoading = false;
    },
    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        ((this.$v.educationalRating.educationalRatingTitleAr.required &&
          this.$v.educationalRating.educationalRatingTitleAr.isValidNameAr) ||
          (this.$v.educationalRating.educationalRatingTitleEn.required &&
            this.$v.educationalRating.educationalRatingTitleEn
              .isValidNameEn)) &&
        this.$v.educationalRating.educationalRatingDescriptionAr
          .isValidTextAr &&
        this.$v.educationalRating.educationalRatingDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasEducationalRatingDeleteImage,
    fullPathFileFromServer,
  },
  async created() {
    this.getEducationalCategoriesDialog();
    this.getEducationalGroupsDialog();
  },
};
</script>
