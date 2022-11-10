<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="operationType.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              operationType.operationTypeImagePath,
              operationType.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !operationType.operationTypeImageIsDefault &&
            checkPrivilege(hasOperationTypeDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="operationType.fullCode"
            v-on:changeValue="operationType.fullCode = $event"
            :title="$t('OperationTypes.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-operationTypeNameAr`"
            :errors="errors_operationTypeNameAr"
            :value="operationType.operationTypeNameAr"
            v-on:changeValue="
              operationType.operationTypeNameAr = $event;
              $v.operationType.operationTypeNameAr.$touch();
            "
            :title="$t('OperationTypes.nameAr')"
            :imgName="'operationTypes.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-operationTypeNameEn`"
            :errors="errors_operationTypeNameEn"
            :value="operationType.operationTypeNameEn"
            v-on:changeValue="
              operationType.operationTypeNameEn = $event;
              $v.operationType.operationTypeNameEn.$touch();
            "
            :title="$t('OperationTypes.nameEn')"
            :imgName="'operationTypes.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-operationTypeNameUnd`"
            :value="operationType.operationTypeNameUnd"
            v-on:changeValue="operationType.operationTypeNameUnd = $event"
            :title="$t('OperationTypes.nameUnd')"
            :imgName="'operationTypes.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-operationTypeDescriptionAr`"
            :errors="errors_operationTypeDescriptionAr"
            :value="operationType.operationTypeDescriptionAr"
            v-on:changeValue="
              operationType.operationTypeDescriptionAr = $event;
              $v.operationType.operationTypeDescriptionAr.$touch();
            "
            :title="$t('OperationTypes.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-operationTypeDescriptionEn`"
            :errors="errors_operationTypeDescriptionEn"
            :value="operationType.operationTypeDescriptionEn"
            v-on:changeValue="
              operationType.operationTypeDescriptionEn = $event;
              $v.operationType.operationTypeDescriptionEn.$touch();
            "
            :title="$t('OperationTypes.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-operationTypeDescriptionUnd`"
            :value="operationType.operationTypeDescriptionUnd"
            v-on:changeValue="
              operationType.operationTypeDescriptionUnd = $event
            "
            :title="$t('OperationTypes.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-operationTypeNotes`"
            :value="operationType.operationTypeNotes"
            v-on:changeValue="operationType.operationTypeNotes = $event"
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
import { hasOperationTypeDeleteImage } from "./../../../../../utils/privilegeHelper";
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
    operationType: {
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
    operationType: {
      operationTypeNameAr: { required, isValidNameAr },
      operationTypeNameEn: { required, isValidNameEn },
      operationTypeDescriptionAr: { isValidTextAr },
      operationTypeDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_operationTypeNameAr() {
      let errors = [];
      if (this.$v.operationType.operationTypeNameAr.$error) {
        if (
          !this.$v.operationType.operationTypeNameAr.required &&
          !this.$v.operationType.operationTypeNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.operationType.operationTypeNameAr.required &&
          !this.$v.operationType.operationTypeNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_operationTypeNameEn() {
      let errors = [];
      if (this.$v.operationType.operationTypeNameEn.$error) {
        if (
          !this.$v.operationType.operationTypeNameAr.required &&
          !this.$v.operationType.operationTypeNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.operationType.operationTypeNameEn.required &&
          !this.$v.operationType.operationTypeNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_operationTypeDescriptionAr() {
      let errors = [];
      if (this.$v.operationType.operationTypeDescriptionAr.$error) {
        if (!this.$v.operationType.operationTypeDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_operationTypeDescriptionEn() {
      let errors = [];
      if (this.$v.operationType.operationTypeDescriptionEn.$error) {
        if (!this.$v.operationType.operationTypeDescriptionEn.isValidTextEn)
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
        ((this.$v.operationType.operationTypeNameAr.required &&
          this.$v.operationType.operationTypeNameAr.isValidNameAr) ||
          (this.$v.operationType.operationTypeNameEn.required &&
            this.$v.operationType.operationTypeNameEn.isValidNameEn)) &&
        this.$v.operationType.operationTypeDescriptionAr.isValidTextAr &&
        this.$v.operationType.operationTypeDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasOperationTypeDeleteImage,
    fullPathFileFromServer,
  },
};
</script>
