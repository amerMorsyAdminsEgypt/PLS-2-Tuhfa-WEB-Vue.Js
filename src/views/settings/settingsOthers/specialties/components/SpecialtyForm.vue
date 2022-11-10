<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="specialty.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              specialty.specialtieImagePath,
              specialty.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !specialty.specialtieImageIsDefault &&
            checkPrivilege(hasSpecialtyDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="specialty.fullCode"
            v-on:changeValue="specialty.fullCode = $event"
            :title="$t('Specialties.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-specialtieNameAr`"
            :errors="errors_specialtieNameAr"
            :value="specialty.specialtieNameAr"
            v-on:changeValue="
              specialty.specialtieNameAr = $event;
              $v.specialty.specialtieNameAr.$touch();
            "
            :title="$t('Specialties.nameAr')"
            :imgName="'specialties.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-specialtieNameEn`"
            :errors="errors_specialtieNameEn"
            :value="specialty.specialtieNameEn"
            v-on:changeValue="
              specialty.specialtieNameEn = $event;
              $v.specialty.specialtieNameEn.$touch();
            "
            :title="$t('Specialties.nameEn')"
            :imgName="'specialties.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-specialtieNameUnd`"
            :value="specialty.specialtieNameUnd"
            v-on:changeValue="specialty.specialtieNameUnd = $event"
            :title="$t('Specialties.nameUnd')"
            :imgName="'specialties.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-specialtieDescriptionAr`"
            :errors="errors_specialtieDescriptionAr"
            :value="specialty.specialtieDescriptionAr"
            v-on:changeValue="
              specialty.specialtieDescriptionAr = $event;
              $v.specialty.specialtieDescriptionAr.$touch();
            "
            :title="$t('Specialties.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-specialtieDescriptionEn`"
            :errors="errors_specialtieDescriptionEn"
            :value="specialty.specialtieDescriptionEn"
            v-on:changeValue="
              specialty.specialtieDescriptionEn = $event;
              $v.specialty.specialtieDescriptionEn.$touch();
            "
            :title="$t('Specialties.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-specialtieDescriptionUnd`"
            :value="specialty.specialtieDescriptionUnd"
            v-on:changeValue="specialty.specialtieDescriptionUnd = $event"
            :title="$t('Specialties.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-specialtieNotes`"
            :value="specialty.specialtieNotes"
            v-on:changeValue="specialty.specialtieNotes = $event"
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
import { hasSpecialtyDeleteImage } from "./../../../../../utils/privilegeHelper";
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
    specialty: {
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
    specialty: {
      specialtieNameAr: { required, isValidNameAr },
      specialtieNameEn: { required, isValidNameEn },
      specialtieDescriptionAr: { isValidTextAr },
      specialtieDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_specialtieNameAr() {
      let errors = [];
      if (this.$v.specialty.specialtieNameAr.$error) {
        if (
          !this.$v.specialty.specialtieNameAr.required &&
          !this.$v.specialty.specialtieNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.specialty.specialtieNameAr.required &&
          !this.$v.specialty.specialtieNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_specialtieNameEn() {
      let errors = [];
      if (this.$v.specialty.specialtieNameEn.$error) {
        if (
          !this.$v.specialty.specialtieNameAr.required &&
          !this.$v.specialty.specialtieNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.specialty.specialtieNameEn.required &&
          !this.$v.specialty.specialtieNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_specialtieDescriptionAr() {
      let errors = [];
      if (this.$v.specialty.specialtieDescriptionAr.$error) {
        if (!this.$v.specialty.specialtieDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_specialtieDescriptionEn() {
      let errors = [];
      if (this.$v.specialty.specialtieDescriptionEn.$error) {
        if (!this.$v.specialty.specialtieDescriptionEn.isValidTextEn)
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
        ((this.$v.specialty.specialtieNameAr.required &&
          this.$v.specialty.specialtieNameAr.isValidNameAr) ||
          (this.$v.specialty.specialtieNameEn.required &&
            this.$v.specialty.specialtieNameEn.isValidNameEn)) &&
        this.$v.specialty.specialtieDescriptionAr.isValidTextAr &&
        this.$v.specialty.specialtieDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasSpecialtyDeleteImage,
    fullPathFileFromServer,
  },
};
</script>
