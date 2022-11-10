<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="sharedMedia.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              sharedMedia.sharedMediaImagePath,
              sharedMedia.defaultImg
            )
          "
          :deleteFileStatus="false"
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="sharedMedia.fullCode"
            v-on:changeValue="sharedMedia.fullCode = $event"
            :title="$t('SharedMedias.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-sharedMediaNameAr`"
            :errors="errors_sharedMediaNameAr"
            :value="sharedMedia.sharedMediaNameAr"
            v-on:changeValue="
              sharedMedia.sharedMediaNameAr = $event;
              $v.sharedMedia.sharedMediaNameAr.$touch();
            "
            :title="$t('SharedMedias.titleAr')"
            :imgName="'sharedMedias.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-sharedMediaNameEn`"
            :errors="errors_sharedMediaNameEn"
            :value="sharedMedia.sharedMediaNameEn"
            v-on:changeValue="
              sharedMedia.sharedMediaNameEn = $event;
              $v.sharedMedia.sharedMediaNameEn.$touch();
            "
            :title="$t('SharedMedias.titleEn')"
            :imgName="'sharedMedias.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-sharedMediaNameUnd`"
            :value="sharedMedia.sharedMediaNameUnd"
            v-on:changeValue="sharedMedia.sharedMediaNameUnd = $event"
            :title="$t('SharedMedias.titleUnd')"
            :imgName="'sharedMedias.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-sharedMediaDescriptionAr`"
            :errors="errors_sharedMediaDescriptionAr"
            :value="sharedMedia.sharedMediaDescriptionAr"
            v-on:changeValue="
              sharedMedia.sharedMediaDescriptionAr = $event;
              $v.sharedMedia.sharedMediaDescriptionAr.$touch();
            "
            :title="$t('SharedMedias.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-sharedMediaDescriptionEn`"
            :errors="errors_sharedMediaDescriptionEn"
            :value="sharedMedia.sharedMediaDescriptionEn"
            v-on:changeValue="
              sharedMedia.sharedMediaDescriptionEn = $event;
              $v.sharedMedia.sharedMediaDescriptionEn.$touch();
            "
            :title="$t('SharedMedias.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-sharedMediaDescriptionUnd`"
            :value="sharedMedia.sharedMediaDescriptionUnd"
            v-on:changeValue="sharedMedia.sharedMediaDescriptionUnd = $event"
            :title="$t('SharedMedias.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-sharedMediaNotes`"
            :value="sharedMedia.sharedMediaNotes"
            v-on:changeValue="sharedMedia.sharedMediaNotes = $event"
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
} from "./../../../utils/functions";

import {
  isValidNameAr,
  isValidNameEn,
  isValidTextAr,
  isValidTextEn,
} from "./../../../utils/validationHelper";
import CustomFileInput from "./../../../components/general/CustomFileInput.vue";
import CustomInput from "./../../../components/general/CustomInput.vue";
import TextArea from "./../../../components/general/TextArea.vue";
import { checkPrivilege } from "./../../../utils/functions";
import generalMixin from "./../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import PreLoader from "@/components/general/PreLoader.vue";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    PreLoader,
    CustomFileInput,
    CustomInput,
    TextArea,
  },
  data() {
    return {
      language: getLanguage(),
      isLoading: false,
    };
  },
  props: {
    sharedMedia: {
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
    sharedMedia: {
      sharedMediaNameAr: { required, isValidNameAr },
      sharedMediaNameEn: { required, isValidNameEn },
      sharedMediaDescriptionAr: { isValidTextAr },
      sharedMediaDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_placesTokensList() {
      let errors = [];
      if (this.$v.sharedMedia.placesTokensList.$error) {
        if (!this.$v.sharedMedia.placesTokensList.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_usersTokensList() {
      let errors = [];
      if (this.$v.sharedMedia.usersTokensList.$error) {
        if (!this.$v.sharedMedia.usersTokensList.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_educationalCategoriesTokensList() {
      let errors = [];
      if (this.$v.sharedMedia.educationalCategoriesTokensList.$error) {
        if (!this.$v.sharedMedia.educationalCategoriesTokensList.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_educationalGroupsTokensList() {
      let errors = [];
      if (this.$v.sharedMedia.educationalGroupsTokensList.$error) {
        if (!this.$v.sharedMedia.educationalGroupsTokensList.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_sharedMediaDateTime() {
      let errors = [];
      if (this.$v.sharedMedia.sharedMediaDateTime.$error) {
        if (!this.$v.sharedMedia.sharedMediaDateTime.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_sharedMediaNameAr() {
      let errors = [];
      if (this.$v.sharedMedia.sharedMediaNameAr.$error) {
        if (
          !this.$v.sharedMedia.sharedMediaNameAr.required &&
          !this.$v.sharedMedia.sharedMediaNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.sharedMedia.sharedMediaNameAr.required &&
          !this.$v.sharedMedia.sharedMediaNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_sharedMediaNameEn() {
      let errors = [];
      if (this.$v.sharedMedia.sharedMediaNameEn.$error) {
        if (
          !this.$v.sharedMedia.sharedMediaNameAr.required &&
          !this.$v.sharedMedia.sharedMediaNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.sharedMedia.sharedMediaNameEn.required &&
          !this.$v.sharedMedia.sharedMediaNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_sharedMediaDescriptionAr() {
      let errors = [];
      if (this.$v.sharedMedia.sharedMediaDescriptionAr.$error) {
        if (!this.$v.sharedMedia.sharedMediaDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_sharedMediaDescriptionEn() {
      let errors = [];
      if (this.$v.sharedMedia.sharedMediaDescriptionEn.$error) {
        if (!this.$v.sharedMedia.sharedMediaDescriptionEn.isValidTextEn)
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
        ((this.$v.sharedMedia.sharedMediaNameAr.required &&
          this.$v.sharedMedia.sharedMediaNameAr.isValidNameAr) ||
          (this.$v.sharedMedia.sharedMediaNameEn.required &&
            this.$v.sharedMedia.sharedMediaNameEn.isValidNameEn)) &&
        this.$v.sharedMedia.sharedMediaDescriptionAr.isValidTextAr &&
        this.$v.sharedMedia.sharedMediaDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    fullPathFileFromServer,
  },
  created() {},
};
</script>
