<template>
  <div class="">
    <form autocomplete="off">
      <div class="my-card">
        <div class="row">
          <!-- refund -->
          <template>
            <CustomSelectBox
              :className="'col-md-6'"
              :id="`${id}-refundPaymentMethodToken`"
              :value="countedServiceTransaction.refundPaymentMethodToken"
              :options="paymentMethodTokenOptions"
              v-on:changeValue="
                countedServiceTransaction.refundPaymentMethodToken = $event
              "
              :title="$t('PaymentMethods.select')"
              :imgName="'paymentMethods.svg'"
            />

            <TextArea
              :className="'col-md-6'"
              :id="`${id}-refundReasonAr`"
              :errors="errors_refundReasonAr"
              :value="countedServiceTransaction.refundReasonAr"
              v-on:changeValue="
                countedServiceTransaction.refundReasonAr = $event;
                $v.countedServiceTransaction.refundReasonAr.$touch();
              "
              :title="$t('InstallmentPayments.refundReasonAr')"
              :imgName="'reason.svg'"
            />
            <TextArea
              :className="'col-md-6'"
              :id="`${id}-refundReasonEn`"
              :errors="errors_refundReasonEn"
              :value="countedServiceTransaction.refundReasonEn"
              v-on:changeValue="
                countedServiceTransaction.refundReasonEn = $event;
                $v.countedServiceTransaction.refundReasonEn.$touch();
              "
              :title="$t('InstallmentPayments.refundReasonEn')"
              :imgName="'reason.svg'"
            />
            <TextArea
              :className="'col-md-6'"
              :id="`${id}-refundReasonUnd`"
              :value="countedServiceTransaction.refundReasonUnd"
              v-on:changeValue="
                countedServiceTransaction.refundReasonUnd = $event
              "
              :title="$t('InstallmentPayments.refundReasonUnd')"
              :imgName="'reason.svg'"
            />
            <TextArea
              :className="'col-md-12'"
              :id="`${id}-refundNotes`"
              :value="countedServiceTransaction.refundNotes"
              v-on:changeValue="countedServiceTransaction.refundNotes = $event"
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
} from "./../../../../utils/validationHelper";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import { checkPrivilege } from "./../../../../utils/functions";
import generalMixin from "./../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { getPaymentMethodsDialog } from "./../../../../utils/dialogsOfApi";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomSelectBox,
    TextArea,
  },
  data() {
    return {
      paymentMethodTokenOptions: [],
    };
  },
  props: {
    countedServiceTransaction: {
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
    countedServiceTransaction: {
      refundReasonAr: { required, isValidTextAr },
      refundReasonEn: { required, isValidTextEn },
    },
  },
  computed: {
    errors_refundReasonAr() {
      let errors = [];
      if (this.$v.countedServiceTransaction.refundReasonAr.$error) {
        if (
          !this.$v.countedServiceTransaction.refundReasonAr.required &&
          !this.$v.countedServiceTransaction.refundReasonEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.countedServiceTransaction.refundReasonAr.required &&
          !this.$v.countedServiceTransaction.refundReasonAr.isValidTextAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_refundReasonEn() {
      let errors = [];
      if (this.$v.countedServiceTransaction.refundReasonEn.$error) {
        if (
          !this.$v.countedServiceTransaction.refundReasonAr.required &&
          !this.$v.countedServiceTransaction.refundReasonEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.countedServiceTransaction.refundReasonEn.required &&
          !this.$v.countedServiceTransaction.refundReasonEn.isValidTextEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
  },
  methods: {
    async getPaymentMethodsDialog() {
      this.isLoading = true;

      this.paymentMethodTokenOptions = await getPaymentMethodsDialog();
      this.isLoading = false;
    },
    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        (this.$v.countedServiceTransaction.refundReasonAr.required &&
          this.$v.countedServiceTransaction.refundReasonAr.isValidTextAr) ||
        (this.$v.countedServiceTransaction.refundReasonEn.required &&
          this.$v.countedServiceTransaction.refundReasonEn.isValidTextEn)
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    fullPathFileFromServer,
  },
  created() {
    this.getPaymentMethodsDialog();
  },
};
</script>
