<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="educationalStage.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              educationalStage.educationalStageImagePath,
              educationalStage.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !educationalStage.educationalStageImageIsDefault &&
            checkPrivilege(hasEducationalStageDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="educationalStage.fullCode"
            v-on:changeValue="educationalStage.fullCode = $event"
            :title="$t('EducationalStages.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-educationalStageNameAr`"
            :errors="errors_educationalStageNameAr"
            :value="educationalStage.educationalStageNameAr"
            v-on:changeValue="
              educationalStage.educationalStageNameAr = $event;
              $v.educationalStage.educationalStageNameAr.$touch();
            "
            :title="$t('EducationalStages.nameAr')"
            :imgName="'educationalStages.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-educationalStageNameEn`"
            :errors="errors_educationalStageNameEn"
            :value="educationalStage.educationalStageNameEn"
            v-on:changeValue="
              educationalStage.educationalStageNameEn = $event;
              $v.educationalStage.educationalStageNameEn.$touch();
            "
            :title="$t('EducationalStages.nameEn')"
            :imgName="'educationalStages.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-educationalStageNameUnd`"
            :value="educationalStage.educationalStageNameUnd"
            v-on:changeValue="educationalStage.educationalStageNameUnd = $event"
            :title="$t('EducationalStages.nameUnd')"
            :imgName="'educationalStages.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-educationalStageDescriptionAr`"
            :errors="errors_educationalStageDescriptionAr"
            :value="educationalStage.educationalStageDescriptionAr"
            v-on:changeValue="
              educationalStage.educationalStageDescriptionAr = $event;
              $v.educationalStage.educationalStageDescriptionAr.$touch();
            "
            :title="$t('EducationalStages.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-educationalStageDescriptionEn`"
            :errors="errors_educationalStageDescriptionEn"
            :value="educationalStage.educationalStageDescriptionEn"
            v-on:changeValue="
              educationalStage.educationalStageDescriptionEn = $event;
              $v.educationalStage.educationalStageDescriptionEn.$touch();
            "
            :title="$t('EducationalStages.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-educationalStageDescriptionUnd`"
            :value="educationalStage.educationalStageDescriptionUnd"
            v-on:changeValue="
              educationalStage.educationalStageDescriptionUnd = $event
            "
            :title="$t('EducationalStages.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-educationalStageNotes`"
            :value="educationalStage.educationalStageNotes"
            v-on:changeValue="educationalStage.educationalStageNotes = $event"
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
import { hasEducationalStageDeleteImage } from "./../../../../../utils/privilegeHelper";
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
    educationalStage: {
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
    educationalStage: {
      educationalStageNameAr: { required, isValidNameAr },
      educationalStageNameEn: { required, isValidNameEn },
      educationalStageDescriptionAr: { isValidTextAr },
      educationalStageDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_educationalStageNameAr() {
      let errors = [];
      if (this.$v.educationalStage.educationalStageNameAr.$error) {
        if (
          !this.$v.educationalStage.educationalStageNameAr.required &&
          !this.$v.educationalStage.educationalStageNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.educationalStage.educationalStageNameAr.required &&
          !this.$v.educationalStage.educationalStageNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_educationalStageNameEn() {
      let errors = [];
      if (this.$v.educationalStage.educationalStageNameEn.$error) {
        if (
          !this.$v.educationalStage.educationalStageNameAr.required &&
          !this.$v.educationalStage.educationalStageNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.educationalStage.educationalStageNameEn.required &&
          !this.$v.educationalStage.educationalStageNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_educationalStageDescriptionAr() {
      let errors = [];
      if (this.$v.educationalStage.educationalStageDescriptionAr.$error) {
        if (
          !this.$v.educationalStage.educationalStageDescriptionAr.isValidTextAr
        )
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_educationalStageDescriptionEn() {
      let errors = [];
      if (this.$v.educationalStage.educationalStageDescriptionEn.$error) {
        if (
          !this.$v.educationalStage.educationalStageDescriptionEn.isValidTextEn
        )
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
        ((this.$v.educationalStage.educationalStageNameAr.required &&
          this.$v.educationalStage.educationalStageNameAr.isValidNameAr) ||
          (this.$v.educationalStage.educationalStageNameEn.required &&
            this.$v.educationalStage.educationalStageNameEn.isValidNameEn)) &&
        this.$v.educationalStage.educationalStageDescriptionAr.isValidTextAr &&
        this.$v.educationalStage.educationalStageDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasEducationalStageDeleteImage,
    fullPathFileFromServer,
  },
};
</script>
