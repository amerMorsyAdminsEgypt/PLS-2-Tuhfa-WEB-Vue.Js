<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="paymentMethod.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              paymentMethod.paymentMethodImagePath,
              paymentMethod.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !paymentMethod.paymentMethodImageIsDefault &&
            checkPrivilege(hasPaymentMethodDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="paymentMethod.fullCode"
            v-on:changeValue="paymentMethod.fullCode = $event"
            :title="$t('PaymentMethods.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-paymentMethodNameAr`"
            :errors="errors_paymentMethodNameAr"
            :value="paymentMethod.paymentMethodNameAr"
            v-on:changeValue="
              paymentMethod.paymentMethodNameAr = $event;
              $v.paymentMethod.paymentMethodNameAr.$touch();
            "
            :title="$t('PaymentMethods.nameAr')"
            :imgName="'paymentMethods.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-paymentMethodNameEn`"
            :errors="errors_paymentMethodNameEn"
            :value="paymentMethod.paymentMethodNameEn"
            v-on:changeValue="
              paymentMethod.paymentMethodNameEn = $event;
              $v.paymentMethod.paymentMethodNameEn.$touch();
            "
            :title="$t('PaymentMethods.nameEn')"
            :imgName="'paymentMethods.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-paymentMethodNameUnd`"
            :value="paymentMethod.paymentMethodNameUnd"
            v-on:changeValue="paymentMethod.paymentMethodNameUnd = $event"
            :title="$t('PaymentMethods.nameUnd')"
            :imgName="'paymentMethods.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-paymentMethodDescriptionAr`"
            :errors="errors_paymentMethodDescriptionAr"
            :value="paymentMethod.paymentMethodDescriptionAr"
            v-on:changeValue="
              paymentMethod.paymentMethodDescriptionAr = $event;
              $v.paymentMethod.paymentMethodDescriptionAr.$touch();
            "
            :title="$t('PaymentMethods.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-paymentMethodDescriptionEn`"
            :errors="errors_paymentMethodDescriptionEn"
            :value="paymentMethod.paymentMethodDescriptionEn"
            v-on:changeValue="
              paymentMethod.paymentMethodDescriptionEn = $event;
              $v.paymentMethod.paymentMethodDescriptionEn.$touch();
            "
            :title="$t('PaymentMethods.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-paymentMethodDescriptionUnd`"
            :value="paymentMethod.paymentMethodDescriptionUnd"
            v-on:changeValue="
              paymentMethod.paymentMethodDescriptionUnd = $event
            "
            :title="$t('PaymentMethods.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-paymentMethodNotes`"
            :value="paymentMethod.paymentMethodNotes"
            v-on:changeValue="paymentMethod.paymentMethodNotes = $event"
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
import { hasPaymentMethodDeleteImage } from "./../../../../../utils/privilegeHelper";
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
    paymentMethod: {
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
    paymentMethod: {
      paymentMethodNameAr: { required, isValidNameAr },
      paymentMethodNameEn: { required, isValidNameEn },
      paymentMethodDescriptionAr: { isValidTextAr },
      paymentMethodDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_paymentMethodNameAr() {
      let errors = [];
      if (this.$v.paymentMethod.paymentMethodNameAr.$error) {
        if (
          !this.$v.paymentMethod.paymentMethodNameAr.required &&
          !this.$v.paymentMethod.paymentMethodNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.paymentMethod.paymentMethodNameAr.required &&
          !this.$v.paymentMethod.paymentMethodNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_paymentMethodNameEn() {
      let errors = [];
      if (this.$v.paymentMethod.paymentMethodNameEn.$error) {
        if (
          !this.$v.paymentMethod.paymentMethodNameAr.required &&
          !this.$v.paymentMethod.paymentMethodNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.paymentMethod.paymentMethodNameEn.required &&
          !this.$v.paymentMethod.paymentMethodNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_paymentMethodDescriptionAr() {
      let errors = [];
      if (this.$v.paymentMethod.paymentMethodDescriptionAr.$error) {
        if (!this.$v.paymentMethod.paymentMethodDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_paymentMethodDescriptionEn() {
      let errors = [];
      if (this.$v.paymentMethod.paymentMethodDescriptionEn.$error) {
        if (!this.$v.paymentMethod.paymentMethodDescriptionEn.isValidTextEn)
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
        ((this.$v.paymentMethod.paymentMethodNameAr.required &&
          this.$v.paymentMethod.paymentMethodNameAr.isValidNameAr) ||
          (this.$v.paymentMethod.paymentMethodNameEn.required &&
            this.$v.paymentMethod.paymentMethodNameEn.isValidNameEn)) &&
        this.$v.paymentMethod.paymentMethodDescriptionAr.isValidTextAr &&
        this.$v.paymentMethod.paymentMethodDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasPaymentMethodDeleteImage,
    fullPathFileFromServer,
  },
};
</script>
