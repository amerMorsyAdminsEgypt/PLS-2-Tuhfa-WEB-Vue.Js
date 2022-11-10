<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="expensesType.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              expensesType.expensesTypeImagePath,
              expensesType.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !expensesType.expensesTypeImageIsDefault &&
            checkPrivilege(hasExpensesTypeDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="expensesType.fullCode"
            v-on:changeValue="expensesType.fullCode = $event"
            :title="$t('ExpensesTypes.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-expensesTypeNameAr`"
            :errors="errors_expensesTypeNameAr"
            :value="expensesType.expensesTypeNameAr"
            v-on:changeValue="
              expensesType.expensesTypeNameAr = $event;
              $v.expensesType.expensesTypeNameAr.$touch();
            "
            :title="$t('ExpensesTypes.nameAr')"
            :imgName="'expensesTypes.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-expensesTypeNameEn`"
            :errors="errors_expensesTypeNameEn"
            :value="expensesType.expensesTypeNameEn"
            v-on:changeValue="
              expensesType.expensesTypeNameEn = $event;
              $v.expensesType.expensesTypeNameEn.$touch();
            "
            :title="$t('ExpensesTypes.nameEn')"
            :imgName="'expensesTypes.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-expensesTypeNameUnd`"
            :value="expensesType.expensesTypeNameUnd"
            v-on:changeValue="expensesType.expensesTypeNameUnd = $event"
            :title="$t('ExpensesTypes.nameUnd')"
            :imgName="'expensesTypes.svg'"
          />
          <CustomInputFloat
            :className="'col-md-6'"
            :id="`${id}-expensesTypeDefaultPrice`"
            :value="expensesType.expensesTypeDefaultPrice"
            v-on:changeValue="expensesType.expensesTypeDefaultPrice = $event"
            :title="$t('general.defaultPrice')"
            :imgName="'money.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-expensesTypeDescriptionAr`"
            :errors="errors_expensesTypeDescriptionAr"
            :value="expensesType.expensesTypeDescriptionAr"
            v-on:changeValue="
              expensesType.expensesTypeDescriptionAr = $event;
              $v.expensesType.expensesTypeDescriptionAr.$touch();
            "
            :title="$t('ExpensesTypes.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-expensesTypeDescriptionEn`"
            :errors="errors_expensesTypeDescriptionEn"
            :value="expensesType.expensesTypeDescriptionEn"
            v-on:changeValue="
              expensesType.expensesTypeDescriptionEn = $event;
              $v.expensesType.expensesTypeDescriptionEn.$touch();
            "
            :title="$t('ExpensesTypes.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-expensesTypeDescriptionUnd`"
            :value="expensesType.expensesTypeDescriptionUnd"
            v-on:changeValue="expensesType.expensesTypeDescriptionUnd = $event"
            :title="$t('ExpensesTypes.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-12'"
            :id="`${id}-expensesTypeNotes`"
            :value="expensesType.expensesTypeNotes"
            v-on:changeValue="expensesType.expensesTypeNotes = $event"
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
import { hasExpensesTypeDeleteImage } from "./../../../../../utils/privilegeHelper";
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
    expensesType: {
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
    expensesType: {
      expensesTypeNameAr: { required, isValidNameAr },
      expensesTypeNameEn: { required, isValidNameEn },
      expensesTypeDescriptionAr: { isValidTextAr },
      expensesTypeDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_expensesTypeNameAr() {
      let errors = [];
      if (this.$v.expensesType.expensesTypeNameAr.$error) {
        if (
          !this.$v.expensesType.expensesTypeNameAr.required &&
          !this.$v.expensesType.expensesTypeNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.expensesType.expensesTypeNameAr.required &&
          !this.$v.expensesType.expensesTypeNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_expensesTypeNameEn() {
      let errors = [];
      if (this.$v.expensesType.expensesTypeNameEn.$error) {
        if (
          !this.$v.expensesType.expensesTypeNameAr.required &&
          !this.$v.expensesType.expensesTypeNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.expensesType.expensesTypeNameEn.required &&
          !this.$v.expensesType.expensesTypeNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_expensesTypeDescriptionAr() {
      let errors = [];
      if (this.$v.expensesType.expensesTypeDescriptionAr.$error) {
        if (!this.$v.expensesType.expensesTypeDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_expensesTypeDescriptionEn() {
      let errors = [];
      if (this.$v.expensesType.expensesTypeDescriptionEn.$error) {
        if (!this.$v.expensesType.expensesTypeDescriptionEn.isValidTextEn)
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
        ((this.$v.expensesType.expensesTypeNameAr.required &&
          this.$v.expensesType.expensesTypeNameAr.isValidNameAr) ||
          (this.$v.expensesType.expensesTypeNameEn.required &&
            this.$v.expensesType.expensesTypeNameEn.isValidNameEn)) &&
        this.$v.expensesType.expensesTypeDescriptionAr.isValidTextAr &&
        this.$v.expensesType.expensesTypeDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasExpensesTypeDeleteImage,
    fullPathFileFromServer,
  },
};
</script>
