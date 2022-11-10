<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="injuryType.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              injuryType.injuryTypeImagePath,
              injuryType.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !injuryType.injuryTypeImageIsDefault &&
            checkPrivilege(hasInjuryTypeDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="injuryType.fullCode"
            v-on:changeValue="injuryType.fullCode = $event"
            :title="$t('InjuryTypes.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-injuryTypeNameAr`"
            :errors="errors_injuryTypeNameAr"
            :value="injuryType.injuryTypeNameAr"
            v-on:changeValue="
              injuryType.injuryTypeNameAr = $event;
              $v.injuryType.injuryTypeNameAr.$touch();
            "
            :title="$t('InjuryTypes.nameAr')"
            :imgName="'injuryTypes.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-injuryTypeNameEn`"
            :errors="errors_injuryTypeNameEn"
            :value="injuryType.injuryTypeNameEn"
            v-on:changeValue="
              injuryType.injuryTypeNameEn = $event;
              $v.injuryType.injuryTypeNameEn.$touch();
            "
            :title="$t('InjuryTypes.nameEn')"
            :imgName="'injuryTypes.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-injuryTypeNameUnd`"
            :value="injuryType.injuryTypeNameUnd"
            v-on:changeValue="injuryType.injuryTypeNameUnd = $event"
            :title="$t('InjuryTypes.nameUnd')"
            :imgName="'injuryTypes.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-injuryTypeDescriptionAr`"
            :errors="errors_injuryTypeDescriptionAr"
            :value="injuryType.injuryTypeDescriptionAr"
            v-on:changeValue="
              injuryType.injuryTypeDescriptionAr = $event;
              $v.injuryType.injuryTypeDescriptionAr.$touch();
            "
            :title="$t('InjuryTypes.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-injuryTypeDescriptionEn`"
            :errors="errors_injuryTypeDescriptionEn"
            :value="injuryType.injuryTypeDescriptionEn"
            v-on:changeValue="
              injuryType.injuryTypeDescriptionEn = $event;
              $v.injuryType.injuryTypeDescriptionEn.$touch();
            "
            :title="$t('InjuryTypes.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-injuryTypeDescriptionUnd`"
            :value="injuryType.injuryTypeDescriptionUnd"
            v-on:changeValue="injuryType.injuryTypeDescriptionUnd = $event"
            :title="$t('InjuryTypes.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-injuryTypeNotes`"
            :value="injuryType.injuryTypeNotes"
            v-on:changeValue="injuryType.injuryTypeNotes = $event"
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
import { hasInjuryTypeDeleteImage } from "./../../../../../utils/privilegeHelper";
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
    injuryType: {
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
    injuryType: {
      injuryTypeNameAr: { required, isValidNameAr },
      injuryTypeNameEn: { required, isValidNameEn },
      injuryTypeDescriptionAr: { isValidTextAr },
      injuryTypeDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_injuryTypeNameAr() {
      let errors = [];
      if (this.$v.injuryType.injuryTypeNameAr.$error) {
        if (
          !this.$v.injuryType.injuryTypeNameAr.required &&
          !this.$v.injuryType.injuryTypeNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.injuryType.injuryTypeNameAr.required &&
          !this.$v.injuryType.injuryTypeNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_injuryTypeNameEn() {
      let errors = [];
      if (this.$v.injuryType.injuryTypeNameEn.$error) {
        if (
          !this.$v.injuryType.injuryTypeNameAr.required &&
          !this.$v.injuryType.injuryTypeNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.injuryType.injuryTypeNameEn.required &&
          !this.$v.injuryType.injuryTypeNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_injuryTypeDescriptionAr() {
      let errors = [];
      if (this.$v.injuryType.injuryTypeDescriptionAr.$error) {
        if (!this.$v.injuryType.injuryTypeDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_injuryTypeDescriptionEn() {
      let errors = [];
      if (this.$v.injuryType.injuryTypeDescriptionEn.$error) {
        if (!this.$v.injuryType.injuryTypeDescriptionEn.isValidTextEn)
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
        ((this.$v.injuryType.injuryTypeNameAr.required &&
          this.$v.injuryType.injuryTypeNameAr.isValidNameAr) ||
          (this.$v.injuryType.injuryTypeNameEn.required &&
            this.$v.injuryType.injuryTypeNameEn.isValidNameEn)) &&
        this.$v.injuryType.injuryTypeDescriptionAr.isValidTextAr &&
        this.$v.injuryType.injuryTypeDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasInjuryTypeDeleteImage,
    fullPathFileFromServer,
  },
};
</script>
