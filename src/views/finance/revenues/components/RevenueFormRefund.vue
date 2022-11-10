<template>
  <div class="">
    <form autocomplete="off">
      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-refundPaymentMethodToken`"
            :errors="errors_refundPaymentMethodToken"
            :value="revenue.refundPaymentMethodToken"
            :options="paymentMethodTokenOptions"
            v-on:changeValue="
              revenue.refundPaymentMethodToken = $event;
              $v.revenue.refundPaymentMethodToken.$touch();
            "
            :title="$t('PaymentMethods.select')"
            :imgName="'paymentMethods.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="revenue.revenuesMoneyWithCurrency"
            :title="$t('Revenues.money')"
            :imgName="'money.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-refundReasonAr`"
            :value="revenue.refundReasonAr"
            v-on:changeValue="revenue.refundReasonAr = $event"
            :title="$t('Revenues.refundReasonAr')"
            :imgName="'reason.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-refundReasonEn`"
            :value="revenue.refundReasonEn"
            v-on:changeValue="revenue.refundReasonEn = $event"
            :title="$t('Revenues.refundReasonEn')"
            :imgName="'reason.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-refundReasonUnd`"
            :value="revenue.refundReasonUnd"
            v-on:changeValue="revenue.refundReasonUnd = $event"
            :title="$t('Revenues.refundReasonUnd')"
            :imgName="'reason.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-refundNotes`"
            :value="revenue.refundNotes"
            v-on:changeValue="revenue.refundNotes = $event"
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
import { hasRevenueDeleteImage } from "./../../../../utils/privilegeHelper";
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
    revenue: {
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
    revenue: {
      refundPaymentMethodToken: { required },
    },
  },
  computed: {
    errors_refundPaymentMethodToken() {
      let errors = [];
      if (this.$v.revenue.refundPaymentMethodToken.$error) {
        if (!this.$v.revenue.refundPaymentMethodToken.required)
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
      if (this.$v.revenue.refundPaymentMethodToken.required) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasRevenueDeleteImage,
    fullPathFileFromServer,
  },
  created() {
    this.getPaymentMethodsDialog();
  },
};
</script>
