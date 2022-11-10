<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="installmentBatchType.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              installmentBatchType.installmentBatchTypeImagePath,
              installmentBatchType.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !installmentBatchType.installmentBatchTypeImageIsDefault &&
            checkPrivilege(hasInstallmentBatchTypeDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="installmentBatchType.fullCode"
            v-on:changeValue="installmentBatchType.fullCode = $event"
            :title="$t('InstallmentBatchTypes.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-installmentBatchTypeNameAr`"
            :errors="errors_installmentBatchTypeNameAr"
            :value="installmentBatchType.installmentBatchTypeNameAr"
            v-on:changeValue="
              installmentBatchType.installmentBatchTypeNameAr = $event;
              $v.installmentBatchType.installmentBatchTypeNameAr.$touch();
            "
            :title="$t('InstallmentBatchTypes.nameAr')"
            :imgName="'installmentBatchTypes.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-installmentBatchTypeNameEn`"
            :errors="errors_installmentBatchTypeNameEn"
            :value="installmentBatchType.installmentBatchTypeNameEn"
            v-on:changeValue="
              installmentBatchType.installmentBatchTypeNameEn = $event;
              $v.installmentBatchType.installmentBatchTypeNameEn.$touch();
            "
            :title="$t('InstallmentBatchTypes.nameEn')"
            :imgName="'installmentBatchTypes.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-installmentBatchTypeNameUnd`"
            :value="installmentBatchType.installmentBatchTypeNameUnd"
            v-on:changeValue="
              installmentBatchType.installmentBatchTypeNameUnd = $event
            "
            :title="$t('InstallmentBatchTypes.nameUnd')"
            :imgName="'installmentBatchTypes.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-installmentBatchTypeDescriptionAr`"
            :errors="errors_installmentBatchTypeDescriptionAr"
            :value="installmentBatchType.installmentBatchTypeDescriptionAr"
            v-on:changeValue="
              installmentBatchType.installmentBatchTypeDescriptionAr = $event;
              $v.installmentBatchType.installmentBatchTypeDescriptionAr.$touch();
            "
            :title="$t('InstallmentBatchTypes.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-installmentBatchTypeDescriptionEn`"
            :errors="errors_installmentBatchTypeDescriptionEn"
            :value="installmentBatchType.installmentBatchTypeDescriptionEn"
            v-on:changeValue="
              installmentBatchType.installmentBatchTypeDescriptionEn = $event;
              $v.installmentBatchType.installmentBatchTypeDescriptionEn.$touch();
            "
            :title="$t('InstallmentBatchTypes.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-installmentBatchTypeDescriptionUnd`"
            :value="installmentBatchType.installmentBatchTypeDescriptionUnd"
            v-on:changeValue="
              installmentBatchType.installmentBatchTypeDescriptionUnd = $event
            "
            :title="$t('InstallmentBatchTypes.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-installmentBatchTypeNotes`"
            :value="installmentBatchType.installmentBatchTypeNotes"
            v-on:changeValue="
              installmentBatchType.installmentBatchTypeNotes = $event
            "
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
import { hasInstallmentBatchTypeDeleteImage } from "./../../../../../utils/privilegeHelper";
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
    installmentBatchType: {
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
    installmentBatchType: {
      installmentBatchTypeNameAr: { required, isValidNameAr },
      installmentBatchTypeNameEn: { required, isValidNameEn },
      installmentBatchTypeDescriptionAr: { isValidTextAr },
      installmentBatchTypeDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_installmentBatchTypeNameAr() {
      let errors = [];
      if (this.$v.installmentBatchType.installmentBatchTypeNameAr.$error) {
        if (
          !this.$v.installmentBatchType.installmentBatchTypeNameAr.required &&
          !this.$v.installmentBatchType.installmentBatchTypeNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.installmentBatchType.installmentBatchTypeNameAr.required &&
          !this.$v.installmentBatchType.installmentBatchTypeNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_installmentBatchTypeNameEn() {
      let errors = [];
      if (this.$v.installmentBatchType.installmentBatchTypeNameEn.$error) {
        if (
          !this.$v.installmentBatchType.installmentBatchTypeNameAr.required &&
          !this.$v.installmentBatchType.installmentBatchTypeNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.installmentBatchType.installmentBatchTypeNameEn.required &&
          !this.$v.installmentBatchType.installmentBatchTypeNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_installmentBatchTypeDescriptionAr() {
      let errors = [];
      if (
        this.$v.installmentBatchType.installmentBatchTypeDescriptionAr.$error
      ) {
        if (
          !this.$v.installmentBatchType.installmentBatchTypeDescriptionAr
            .isValidTextAr
        )
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_installmentBatchTypeDescriptionEn() {
      let errors = [];
      if (
        this.$v.installmentBatchType.installmentBatchTypeDescriptionEn.$error
      ) {
        if (
          !this.$v.installmentBatchType.installmentBatchTypeDescriptionEn
            .isValidTextEn
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
        ((this.$v.installmentBatchType.installmentBatchTypeNameAr.required &&
          this.$v.installmentBatchType.installmentBatchTypeNameAr
            .isValidNameAr) ||
          (this.$v.installmentBatchType.installmentBatchTypeNameEn.required &&
            this.$v.installmentBatchType.installmentBatchTypeNameEn
              .isValidNameEn)) &&
        this.$v.installmentBatchType.installmentBatchTypeDescriptionAr
          .isValidTextAr &&
        this.$v.installmentBatchType.installmentBatchTypeDescriptionEn
          .isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasInstallmentBatchTypeDeleteImage,
    fullPathFileFromServer,
  },
};
</script>
