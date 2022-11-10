<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="personalCardType.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              personalCardType.personalCardTypeImagePath,
              personalCardType.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !personalCardType.personalCardTypeImageIsDefault &&
            checkPrivilege(hasPersonalCardTypeDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="personalCardType.fullCode"
            v-on:changeValue="personalCardType.fullCode = $event"
            :title="$t('PersonalCardTypes.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-personalCardTypeNameAr`"
            :errors="errors_personalCardTypeNameAr"
            :value="personalCardType.personalCardTypeNameAr"
            v-on:changeValue="
              personalCardType.personalCardTypeNameAr = $event;
              $v.personalCardType.personalCardTypeNameAr.$touch();
            "
            :title="$t('PersonalCardTypes.nameAr')"
            :imgName="'personalCardTypes.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-personalCardTypeNameEn`"
            :errors="errors_personalCardTypeNameEn"
            :value="personalCardType.personalCardTypeNameEn"
            v-on:changeValue="
              personalCardType.personalCardTypeNameEn = $event;
              $v.personalCardType.personalCardTypeNameEn.$touch();
            "
            :title="$t('PersonalCardTypes.nameEn')"
            :imgName="'personalCardTypes.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-personalCardTypeNameUnd`"
            :value="personalCardType.personalCardTypeNameUnd"
            v-on:changeValue="personalCardType.personalCardTypeNameUnd = $event"
            :title="$t('PersonalCardTypes.nameUnd')"
            :imgName="'personalCardTypes.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-personalCardTypeDescriptionAr`"
            :errors="errors_personalCardTypeDescriptionAr"
            :value="personalCardType.personalCardTypeDescriptionAr"
            v-on:changeValue="
              personalCardType.personalCardTypeDescriptionAr = $event;
              $v.personalCardType.personalCardTypeDescriptionAr.$touch();
            "
            :title="$t('PersonalCardTypes.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-personalCardTypeDescriptionEn`"
            :errors="errors_personalCardTypeDescriptionEn"
            :value="personalCardType.personalCardTypeDescriptionEn"
            v-on:changeValue="
              personalCardType.personalCardTypeDescriptionEn = $event;
              $v.personalCardType.personalCardTypeDescriptionEn.$touch();
            "
            :title="$t('PersonalCardTypes.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-personalCardTypeDescriptionUnd`"
            :value="personalCardType.personalCardTypeDescriptionUnd"
            v-on:changeValue="
              personalCardType.personalCardTypeDescriptionUnd = $event
            "
            :title="$t('PersonalCardTypes.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-personalCardTypeNotes`"
            :value="personalCardType.personalCardTypeNotes"
            v-on:changeValue="personalCardType.personalCardTypeNotes = $event"
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
import { hasPersonalCardTypeDeleteImage } from "./../../../../../utils/privilegeHelper";
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
    personalCardType: {
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
    personalCardType: {
      personalCardTypeNameAr: { required, isValidNameAr },
      personalCardTypeNameEn: { required, isValidNameEn },
      personalCardTypeDescriptionAr: { isValidTextAr },
      personalCardTypeDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_personalCardTypeNameAr() {
      let errors = [];
      if (this.$v.personalCardType.personalCardTypeNameAr.$error) {
        if (
          !this.$v.personalCardType.personalCardTypeNameAr.required &&
          !this.$v.personalCardType.personalCardTypeNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.personalCardType.personalCardTypeNameAr.required &&
          !this.$v.personalCardType.personalCardTypeNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_personalCardTypeNameEn() {
      let errors = [];
      if (this.$v.personalCardType.personalCardTypeNameEn.$error) {
        if (
          !this.$v.personalCardType.personalCardTypeNameAr.required &&
          !this.$v.personalCardType.personalCardTypeNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.personalCardType.personalCardTypeNameEn.required &&
          !this.$v.personalCardType.personalCardTypeNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_personalCardTypeDescriptionAr() {
      let errors = [];
      if (this.$v.personalCardType.personalCardTypeDescriptionAr.$error) {
        if (
          !this.$v.personalCardType.personalCardTypeDescriptionAr.isValidTextAr
        )
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_personalCardTypeDescriptionEn() {
      let errors = [];
      if (this.$v.personalCardType.personalCardTypeDescriptionEn.$error) {
        if (
          !this.$v.personalCardType.personalCardTypeDescriptionEn.isValidTextEn
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
        ((this.$v.personalCardType.personalCardTypeNameAr.required &&
          this.$v.personalCardType.personalCardTypeNameAr.isValidNameAr) ||
          (this.$v.personalCardType.personalCardTypeNameEn.required &&
            this.$v.personalCardType.personalCardTypeNameEn.isValidNameEn)) &&
        this.$v.personalCardType.personalCardTypeDescriptionAr.isValidTextAr &&
        this.$v.personalCardType.personalCardTypeDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasPersonalCardTypeDeleteImage,
    fullPathFileFromServer,
  },
};
</script>
