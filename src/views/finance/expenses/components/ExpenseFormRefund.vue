<template>
  <div class="">
    <form autocomplete="off">
      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-refundPaymentMethodToken`"
            :errors="errors_refundPaymentMethodToken"
            :value="expense.refundPaymentMethodToken"
            :options="paymentMethodTokenOptions"
            v-on:changeValue="
              expense.refundPaymentMethodToken = $event;
              $v.expense.refundPaymentMethodToken.$touch();
            "
            :title="$t('PaymentMethods.select')"
            :imgName="'paymentMethods.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="expense.expensesMoneyWithCurrency"
            :title="$t('Expenses.money')"
            :imgName="'money.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-refundReasonAr`"
            :value="expense.refundReasonAr"
            v-on:changeValue="expense.refundReasonAr = $event"
            :title="$t('Expenses.refundReasonAr')"
            :imgName="'reason.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-refundReasonEn`"
            :value="expense.refundReasonEn"
            v-on:changeValue="expense.refundReasonEn = $event"
            :title="$t('Expenses.refundReasonEn')"
            :imgName="'reason.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-refundReasonUnd`"
            :value="expense.refundReasonUnd"
            v-on:changeValue="expense.refundReasonUnd = $event"
            :title="$t('Expenses.refundReasonUnd')"
            :imgName="'reason.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-refundNotes`"
            :value="expense.refundNotes"
            v-on:changeValue="expense.refundNotes = $event"
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />
        </div>
      </div>

      <div class="form-footer">
        <button
          name="submit"
          type="submit"
          class="btn btn-submit"
          @click.prevent="submitForm"
        >
          {{ submitName }}
        </button>
        <button
          class="btn btn-cancel"
          v-b-modal="`ConfirmCloseSheet-${bottomSheetName}`"
          @click.prevent
        >
          {{ $t("cancel") }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import {
  fullPathFileFromServer,
  bottomSheetScrollToTop,
} from "./../../../../utils/functions";

import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import { hasExpenseDeleteImage } from "./../../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../../utils/functions";
import generalMixin from "./../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { getPaymentMethodsDialog } from "./../../../../utils/dialogsOfApi";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomSelectBox,
    DataLabelGroup,
    TextArea,
  },
  data() {
    return {
      paymentMethodTokenOptions: [],
    };
  },
  props: {
    expense: {
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
    expense: {
      refundPaymentMethodToken: { required },
    },
  },
  computed: {
    errors_refundPaymentMethodToken() {
      let errors = [];
      if (this.$v.expense.refundPaymentMethodToken.$error) {
        if (!this.$v.expense.refundPaymentMethodToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
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
      if (this.$v.expense.refundPaymentMethodToken.required) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasExpenseDeleteImage,
    fullPathFileFromServer,
  },
  created() {
    this.getPaymentMethodsDialog();
  },
};
</script>
