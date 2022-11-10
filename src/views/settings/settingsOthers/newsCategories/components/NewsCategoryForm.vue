<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="newsCategory.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              newsCategory.newsCategoryImagePath,
              newsCategory.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !newsCategory.newsCategoryImageIsDefault &&
            checkPrivilege(hasNewsCategoryDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="newsCategory.fullCode"
            v-on:changeValue="newsCategory.fullCode = $event"
            :title="$t('NewsCategories.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-newsCategoryNameAr`"
            :errors="errors_newsCategoryNameAr"
            :value="newsCategory.newsCategoryNameAr"
            v-on:changeValue="
              newsCategory.newsCategoryNameAr = $event;
              $v.newsCategory.newsCategoryNameAr.$touch();
            "
            :title="$t('NewsCategories.nameAr')"
            :imgName="'newsCategories.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-newsCategoryNameEn`"
            :errors="errors_newsCategoryNameEn"
            :value="newsCategory.newsCategoryNameEn"
            v-on:changeValue="
              newsCategory.newsCategoryNameEn = $event;
              $v.newsCategory.newsCategoryNameEn.$touch();
            "
            :title="$t('NewsCategories.nameEn')"
            :imgName="'newsCategories.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-newsCategoryNameUnd`"
            :value="newsCategory.newsCategoryNameUnd"
            v-on:changeValue="newsCategory.newsCategoryNameUnd = $event"
            :title="$t('NewsCategories.nameUnd')"
            :imgName="'newsCategories.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-newsCategoryDescriptionAr`"
            :errors="errors_newsCategoryDescriptionAr"
            :value="newsCategory.newsCategoryDescriptionAr"
            v-on:changeValue="
              newsCategory.newsCategoryDescriptionAr = $event;
              $v.newsCategory.newsCategoryDescriptionAr.$touch();
            "
            :title="$t('NewsCategories.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-newsCategoryDescriptionEn`"
            :errors="errors_newsCategoryDescriptionEn"
            :value="newsCategory.newsCategoryDescriptionEn"
            v-on:changeValue="
              newsCategory.newsCategoryDescriptionEn = $event;
              $v.newsCategory.newsCategoryDescriptionEn.$touch();
            "
            :title="$t('NewsCategories.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-newsCategoryDescriptionUnd`"
            :value="newsCategory.newsCategoryDescriptionUnd"
            v-on:changeValue="newsCategory.newsCategoryDescriptionUnd = $event"
            :title="$t('NewsCategories.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-newsCategoryNotes`"
            :value="newsCategory.newsCategoryNotes"
            v-on:changeValue="newsCategory.newsCategoryNotes = $event"
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
} from "./../../../../../utils/functions";
import {
  isValidNameAr,
  isValidNameEn,
  isValidTextAr,
  isValidTextEn,
} from "./../../../../../utils/validationHelper";
import CustomFileInput from "./../../../../../components/general/CustomFileInput.vue";
import CustomInput from "./../../../../../components/general/CustomInput.vue";
import TextArea from "./../../../../../components/general/TextArea.vue";
import { hasNewsCategoryDeleteImage } from "./../../../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../../../utils/functions";
import generalMixin from "./../../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomFileInput,
    CustomInput,
    TextArea,
  },
  // data() {
  //   return {};
  // },
  props: {
    newsCategory: {
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
    newsCategory: {
      newsCategoryNameAr: { required, isValidNameAr },
      newsCategoryNameEn: { required, isValidNameEn },
      newsCategoryDescriptionAr: { isValidTextAr },
      newsCategoryDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_newsCategoryNameAr() {
      let errors = [];
      if (this.$v.newsCategory.newsCategoryNameAr.$error) {
        if (
          !this.$v.newsCategory.newsCategoryNameAr.required &&
          !this.$v.newsCategory.newsCategoryNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.newsCategory.newsCategoryNameAr.required &&
          !this.$v.newsCategory.newsCategoryNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_newsCategoryNameEn() {
      let errors = [];
      if (this.$v.newsCategory.newsCategoryNameEn.$error) {
        if (
          !this.$v.newsCategory.newsCategoryNameAr.required &&
          !this.$v.newsCategory.newsCategoryNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.newsCategory.newsCategoryNameEn.required &&
          !this.$v.newsCategory.newsCategoryNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_newsCategoryDescriptionAr() {
      let errors = [];
      if (this.$v.newsCategory.newsCategoryDescriptionAr.$error) {
        if (!this.$v.newsCategory.newsCategoryDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_newsCategoryDescriptionEn() {
      let errors = [];
      if (this.$v.newsCategory.newsCategoryDescriptionEn.$error) {
        if (!this.$v.newsCategory.newsCategoryDescriptionEn.isValidTextEn)
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
        ((this.$v.newsCategory.newsCategoryNameAr.required &&
          this.$v.newsCategory.newsCategoryNameAr.isValidNameAr) ||
          (this.$v.newsCategory.newsCategoryNameEn.required &&
            this.$v.newsCategory.newsCategoryNameEn.isValidNameEn)) &&
        this.$v.newsCategory.newsCategoryDescriptionAr.isValidTextAr &&
        this.$v.newsCategory.newsCategoryDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasNewsCategoryDeleteImage,
    fullPathFileFromServer,
  },
};
</script>
