<template>
  <div class="">
    <form autocomplete="off">
      <div class="row" v-if="id == 'add'">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="installmentPayment.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              installmentPayment.installmentPaymentImagePath,
              installmentPayment.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !installmentPayment.installmentPaymentImageIsDefault &&
            checkPrivilege(hasInstallmentPaymentDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <template v-if="id == 'add'">
            <CustomSelectBox
              :className="'col-md-6'"
              :id="`${id}-accountToken`"
              :errors="errors_accountToken"
              :value="installmentPayment.accountToken"
              :options="accountTokenOptions"
              v-on:changeValue="
                installmentPayment.accountToken = $event;
                $v.installmentPayment.accountToken.$touch();
              "
              :title="$t('Accounts.select')"
              :imgName="'accounts.svg'"
            />
            <CustomSelectBox
              :className="'col-md-6'"
              :id="`${id}-paymentMethodToken`"
              :errors="errors_paymentMethodToken"
              :value="installmentPayment.paymentMethodToken"
              :options="paymentMethodTokenOptions"
              v-on:changeValue="
                installmentPayment.paymentMethodToken = $event;
                $v.installmentPayment.paymentMethodToken.$touch();
              "
              :title="$t('PaymentMethods.select')"
              :imgName="'paymentMethods.svg'"
            />
            <CustomInputFloat
              :className="'col-md-6'"
              :id="`${id}-installmentPaymentMoney`"
              :errors="errors_installmentPaymentMoney"
              :value="installmentPayment.installmentPaymentMoney"
              v-on:changeValue="
                installmentPayment.installmentPaymentMoney = $event;
                $v.installmentPayment.installmentPaymentMoney.$touch();
              "
              :title="$t('general.value')"
              :imgName="'money.svg'"
            />
            <CustomInput
              :className="'col-md-6'"
              :id="`${id}-fullCode`"
              :value="installmentPayment.fullCode"
              v-on:changeValue="installmentPayment.fullCode = $event"
              :title="$t('InstallmentPayments.code')"
              :imgName="'code.svg'"
            />
            <TextArea
              :className="'col-md-6'"
              :id="`${id}-installmentPaymentDescriptionAr`"
              :errors="errors_installmentPaymentDescriptionAr"
              :value="installmentPayment.installmentPaymentDescriptionAr"
              v-on:changeValue="
                installmentPayment.installmentPaymentDescriptionAr = $event;
                $v.installmentPayment.installmentPaymentDescriptionAr.$touch();
              "
              :title="$t('InstallmentPayments.descriptionAr')"
              :imgName="'description.svg'"
            />
            <TextArea
              :className="'col-md-6'"
              :id="`${id}-installmentPaymentDescriptionEn`"
              :errors="errors_installmentPaymentDescriptionEn"
              :value="installmentPayment.installmentPaymentDescriptionEn"
              v-on:changeValue="
                installmentPayment.installmentPaymentDescriptionEn = $event;
                $v.installmentPayment.installmentPaymentDescriptionEn.$touch();
              "
              :title="$t('InstallmentPayments.descriptionEn')"
              :imgName="'description.svg'"
            />
            <TextArea
              :className="'col-md-6'"
              :id="`${id}-installmentPaymentDescriptionUnd`"
              :value="installmentPayment.installmentPaymentDescriptionUnd"
              v-on:changeValue="
                installmentPayment.installmentPaymentDescriptionUnd = $event
              "
              :title="$t('InstallmentPayments.descriptionUnd')"
              :imgName="'description.svg'"
            />
            <TextArea
              :className="'col-md-6'"
              :id="`${id}-installmentPaymentNotes`"
              :value="installmentPayment.installmentPaymentNotes"
              v-on:changeValue="
                installmentPayment.installmentPaymentNotes = $event
              "
              :title="$t('notes')"
              :imgName="'notes.svg'"
            />
          </template>
          <template v-if="id == 'refund'">
            <CustomSelectBox
              :className="'col-md-6'"
              :id="`${id}-refundPaymentMethodToken`"
              :errors="errors_refundPaymentMethodToken"
              :value="installmentPayment.refundPaymentMethodToken"
              :options="paymentMethodTokenOptions"
              v-on:changeValue="
                installmentPayment.refundPaymentMethodToken = $event;
                $v.installmentPayment.refundPaymentMethodToken.$touch();
              "
              :title="$t('PaymentMethods.select')"
              :imgName="'paymentMethods.svg'"
            />

            <TextArea
              :className="'col-md-6'"
              :id="`${id}-refundReasonAr`"
              :errors="errors_refundReasonAr"
              :value="installmentPayment.refundReasonAr"
              v-on:changeValue="
                installmentPayment.refundReasonAr = $event;
                $v.installmentPayment.refundReasonAr.$touch();
              "
              :title="$t('InstallmentPayments.refundReasonAr')"
              :imgName="'reason.svg'"
            />
            <TextArea
              :className="'col-md-6'"
              :id="`${id}-refundReasonEn`"
              :errors="errors_refundReasonEn"
              :value="installmentPayment.refundReasonEn"
              v-on:changeValue="
                installmentPayment.refundReasonEn = $event;
                $v.installmentPayment.refundReasonEn.$touch();
              "
              :title="$t('InstallmentPayments.refundReasonEn')"
              :imgName="'reason.svg'"
            />
            <TextArea
              :className="'col-md-6'"
              :id="`${id}-refundReasonUnd`"
              :value="installmentPayment.refundReasonUnd"
              v-on:changeValue="installmentPayment.refundReasonUnd = $event"
              :title="$t('InstallmentPayments.refundReasonUnd')"
              :imgName="'reason.svg'"
            />
            <TextArea
              :className="'col-md-12'"
              :id="`${id}-refundNotes`"
              :value="installmentPayment.refundNotes"
              v-on:changeValue="installmentPayment.refundNotes = $event"
              :title="$t('notes')"
              :imgName="'notes.svg'"
            />
          </template>
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
} from "./../../../../utils/functions";
import {
  isValidTextAr,
  isValidTextEn,
  // isValidNumberRange,
} from "./../../../../utils/validationHelper";
import CustomFileInput from "./../../../../components/general/CustomFileInput.vue";
import CustomInputFloat from "./../../../../components/general/CustomInputFloat.vue";
import CustomInput from "./../../../../components/general/CustomInput.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import { hasInstallmentPaymentDeleteImage } from "./../../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../../utils/functions";
import generalMixin from "./../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import {
  getAccountsDialog,
  getPaymentMethodsDialog,
} from "./../../../../utils/dialogsOfApi";
import { required, between } from "vuelidate/lib/validators";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomFileInput,
    CustomInputFloat,
    CustomInput,
    CustomSelectBox,
    TextArea,
  },
  data() {
    return {
      accountTokenOptions: [],
      paymentMethodTokenOptions: [],
      // remainderMoney: this.installmentPayment.remainderMoney,
      remainderMoney: 10,
    };
  },
  props: {
    installmentPayment: {
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
  validations() {
    return {
      installmentPayment: {
        accountToken: { required },
        paymentMethodToken: { required },
        installmentPaymentMoney: {
          between: between(0, this.installmentPayment.remainderMoney),
        },
        installmentPaymentDescriptionAr: { isValidTextAr },
        installmentPaymentDescriptionEn: { isValidTextEn },
        refundPaymentMethodToken: { required },
        refundReasonAr: { required, isValidTextAr },
        refundReasonEn: { required, isValidTextEn },
      },
    };
  },
  computed: {
    errors_refundPaymentMethodToken() {
      let errors = [];
      if (this.$v.installmentPayment.refundPaymentMethodToken.$error) {
        if (!this.$v.installmentPayment.refundPaymentMethodToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_refundReasonAr() {
      let errors = [];
      if (this.$v.installmentPayment.refundReasonAr.$error) {
        if (
          !this.$v.installmentPayment.refundReasonAr.required &&
          !this.$v.installmentPayment.refundReasonEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.installmentPayment.refundReasonAr.required &&
          !this.$v.installmentPayment.refundReasonAr.isValidTextAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_refundReasonEn() {
      let errors = [];
      if (this.$v.installmentPayment.refundReasonEn.$error) {
        if (
          !this.$v.installmentPayment.refundReasonAr.required &&
          !this.$v.installmentPayment.refundReasonEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.installmentPayment.refundReasonEn.required &&
          !this.$v.installmentPayment.refundReasonEn.isValidTextEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_accountToken() {
      let errors = [];
      if (this.$v.installmentPayment.accountToken.$error) {
        if (!this.$v.installmentPayment.accountToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_paymentMethodToken() {
      let errors = [];
      if (this.$v.installmentPayment.paymentMethodToken.$error) {
        if (!this.$v.installmentPayment.paymentMethodToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_installmentPaymentMoney() {
      let errors = [];
      if (this.$v.installmentPayment.installmentPaymentMoney.$error) {
        if (!this.$v.installmentPayment.installmentPaymentMoney.between)
          errors.push(
            this.$t("validation.valueIsLessThan") +
              this.installmentPayment.remainderMoney
          );
      }
      return errors;
    },
    errors_installmentPaymentDescriptionAr() {
      let errors = [];
      if (this.$v.installmentPayment.installmentPaymentDescriptionAr.$error) {
        if (
          !this.$v.installmentPayment.installmentPaymentDescriptionAr
            .isValidTextAr
        )
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_installmentPaymentDescriptionEn() {
      let errors = [];
      if (this.$v.installmentPayment.installmentPaymentDescriptionEn.$error) {
        if (
          !this.$v.installmentPayment.installmentPaymentDescriptionEn
            .isValidTextEn
        )
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
    // remainderMoney() {
    //   return this.installmentPayment.remainderMoney;
    // },
  },
  methods: {
    async getAccountsDialog() {
      this.isLoading = true;

      this.accountTokenOptions = await getAccountsDialog();
      this.isLoading = false;
    },
    async getPaymentMethodsDialog() {
      this.isLoading = true;

      this.paymentMethodTokenOptions = await getPaymentMethodsDialog();
      this.isLoading = false;
    },
    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      let check = false;
      if (this.id == "add") {
        check =
          this.$v.installmentPayment.accountToken.required &&
          this.$v.installmentPayment.paymentMethodToken.required &&
          this.$v.installmentPayment.installmentPaymentMoney.between &&
          this.$v.installmentPayment.installmentPaymentDescriptionAr
            .isValidTextAr &&
          this.$v.installmentPayment.installmentPaymentDescriptionEn
            .isValidTextEn;
      } else if (this.id == "refund") {
        check =
          this.$v.installmentPayment.refundPaymentMethodToken.required &&
          ((this.$v.installmentPayment.refundReasonAr.required &&
            this.$v.installmentPayment.refundReasonAr.isValidTextAr) ||
            (this.$v.installmentPayment.refundReasonEn.required &&
              this.$v.installmentPayment.refundReasonEn.isValidTextEn));
      }
      if (check) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasInstallmentPaymentDeleteImage,
    fullPathFileFromServer,
  },
  created() {
    this.getAccountsDialog();
    this.getPaymentMethodsDialog();
  },
};
</script>
