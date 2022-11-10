<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="revenuesType.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              revenuesType.revenuesTypeImagePath,
              revenuesType.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !revenuesType.revenuesTypeImageIsDefault &&
            checkPrivilege(hasRevenuesTypeDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="revenuesType.fullCode"
            v-on:changeValue="revenuesType.fullCode = $event"
            :title="$t('RevenuesTypes.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-revenuesTypeNameAr`"
            :errors="errors_revenuesTypeNameAr"
            :value="revenuesType.revenuesTypeNameAr"
            v-on:changeValue="
              revenuesType.revenuesTypeNameAr = $event;
              $v.revenuesType.revenuesTypeNameAr.$touch();
            "
            :title="$t('RevenuesTypes.nameAr')"
            :imgName="'revenuesTypes.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-revenuesTypeNameEn`"
            :errors="errors_revenuesTypeNameEn"
            :value="revenuesType.revenuesTypeNameEn"
            v-on:changeValue="
              revenuesType.revenuesTypeNameEn = $event;
              $v.revenuesType.revenuesTypeNameEn.$touch();
            "
            :title="$t('RevenuesTypes.nameEn')"
            :imgName="'revenuesTypes.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-revenuesTypeNameUnd`"
            :value="revenuesType.revenuesTypeNameUnd"
            v-on:changeValue="revenuesType.revenuesTypeNameUnd = $event"
            :title="$t('RevenuesTypes.nameUnd')"
            :imgName="'revenuesTypes.svg'"
          />
          <CustomInputFloat
            :className="'col-md-6'"
            :id="`${id}-revenuesTypeDefaultPrice`"
            :value="revenuesType.revenuesTypeDefaultPrice"
            v-on:changeValue="revenuesType.revenuesTypeDefaultPrice = $event"
            :title="$t('general.defaultPrice')"
            :imgName="'money.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-revenuesTypeDescriptionAr`"
            :errors="errors_revenuesTypeDescriptionAr"
            :value="revenuesType.revenuesTypeDescriptionAr"
            v-on:changeValue="
              revenuesType.revenuesTypeDescriptionAr = $event;
              $v.revenuesType.revenuesTypeDescriptionAr.$touch();
            "
            :title="$t('RevenuesTypes.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-revenuesTypeDescriptionEn`"
            :errors="errors_revenuesTypeDescriptionEn"
            :value="revenuesType.revenuesTypeDescriptionEn"
            v-on:changeValue="
              revenuesType.revenuesTypeDescriptionEn = $event;
              $v.revenuesType.revenuesTypeDescriptionEn.$touch();
            "
            :title="$t('RevenuesTypes.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-revenuesTypeDescriptionUnd`"
            :value="revenuesType.revenuesTypeDescriptionUnd"
            v-on:changeValue="revenuesType.revenuesTypeDescriptionUnd = $event"
            :title="$t('RevenuesTypes.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-12'"
            :id="`${id}-revenuesTypeNotes`"
            :value="revenuesType.revenuesTypeNotes"
            v-on:changeValue="revenuesType.revenuesTypeNotes = $event"
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
import CustomInputFloat from "./../../../../../components/general/CustomInputFloat.vue";
import CustomInput from "./../../../../../components/general/CustomInput.vue";
import TextArea from "./../../../../../components/general/TextArea.vue";
import { hasRevenuesTypeDeleteImage } from "./../../../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../../../utils/functions";
import generalMixin from "./../../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomFileInput,
    CustomInputFloat,
    CustomInput,
    TextArea,
  },
  // data() {
  //   return {};
  // },
  props: {
    revenuesType: {
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
    revenuesType: {
      revenuesTypeNameAr: { required, isValidNameAr },
      revenuesTypeNameEn: { required, isValidNameEn },
      revenuesTypeDescriptionAr: { isValidTextAr },
      revenuesTypeDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_revenuesTypeNameAr() {
      let errors = [];
      if (this.$v.revenuesType.revenuesTypeNameAr.$error) {
        if (
          !this.$v.revenuesType.revenuesTypeNameAr.required &&
          !this.$v.revenuesType.revenuesTypeNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.revenuesType.revenuesTypeNameAr.required &&
          !this.$v.revenuesType.revenuesTypeNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_revenuesTypeNameEn() {
      let errors = [];
      if (this.$v.revenuesType.revenuesTypeNameEn.$error) {
        if (
          !this.$v.revenuesType.revenuesTypeNameAr.required &&
          !this.$v.revenuesType.revenuesTypeNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.revenuesType.revenuesTypeNameEn.required &&
          !this.$v.revenuesType.revenuesTypeNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_revenuesTypeDescriptionAr() {
      let errors = [];
      if (this.$v.revenuesType.revenuesTypeDescriptionAr.$error) {
        if (!this.$v.revenuesType.revenuesTypeDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_revenuesTypeDescriptionEn() {
      let errors = [];
      if (this.$v.revenuesType.revenuesTypeDescriptionEn.$error) {
        if (!this.$v.revenuesType.revenuesTypeDescriptionEn.isValidTextEn)
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
        ((this.$v.revenuesType.revenuesTypeNameAr.required &&
          this.$v.revenuesType.revenuesTypeNameAr.isValidNameAr) ||
          (this.$v.revenuesType.revenuesTypeNameEn.required &&
            this.$v.revenuesType.revenuesTypeNameEn.isValidNameEn)) &&
        this.$v.revenuesType.revenuesTypeDescriptionAr.isValidTextAr &&
        this.$v.revenuesType.revenuesTypeDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasRevenuesTypeDeleteImage,
    fullPathFileFromServer,
  },
};
</script>
