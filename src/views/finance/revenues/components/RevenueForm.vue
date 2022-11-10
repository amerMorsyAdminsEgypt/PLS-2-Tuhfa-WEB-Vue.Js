<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="revenue.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(revenue.revenueImagePath, revenue.defaultImg)
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !revenue.revenueImageIsDefault &&
            checkPrivilege(hasRevenueDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-revenuesTypeToken`"
            :errors="errors_revenuesTypeToken"
            :value="revenue.revenuesTypeToken"
            :options="revenuesTypeTokenOptions"
            v-on:changeValue="
              revenue.revenuesTypeToken = $event;
              revenuesTypeTokenChanged($event);
              $v.revenue.revenuesTypeToken.$touch();
            "
            :title="$t('Revenues.type')"
            :imgName="'revenues.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-accountToken`"
            :errors="errors_accountToken"
            :value="revenue.accountToken"
            :options="accountTokenOptions"
            v-on:changeValue="
              revenue.accountToken = $event;
              $v.revenue.accountToken.$touch();
            "
            :title="$t('Accounts.select')"
            :imgName="'accounts.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-paymentMethodToken`"
            :errors="errors_paymentMethodToken"
            :value="revenue.paymentMethodToken"
            :options="paymentMethodTokenOptions"
            v-on:changeValue="
              revenue.paymentMethodToken = $event;
              $v.revenue.paymentMethodToken.$touch();
            "
            :title="$t('PaymentMethods.select')"
            :imgName="'paymentMethods.svg'"
          />
          <CustomInputFloat
            :className="'col-md-6'"
            :id="`${id}-revenuesMoney`"
            :errors="errors_revenuesMoney"
            :value="revenue.revenuesMoney"
            v-on:changeValue="
              revenue.revenuesMoney = $event;
              $v.revenue.revenuesMoney.$touch();
            "
            :title="$t('Revenues.money')"
            :imgName="'money.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="revenue.fullCode"
            v-on:changeValue="revenue.fullCode = $event"
            :title="$t('Revenues.code')"
            :imgName="'code.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-revenuesDescriptionAr`"
            :value="revenue.revenuesDescriptionAr"
            v-on:changeValue="revenue.revenuesDescriptionAr = $event"
            :title="$t('Revenues.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-revenuesDescriptionEn`"
            :value="revenue.revenuesDescriptionEn"
            v-on:changeValue="revenue.revenuesDescriptionEn = $event"
            :title="$t('Revenues.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-revenuesDescriptionUnd`"
            :value="revenue.revenuesDescriptionUnd"
            v-on:changeValue="revenue.revenuesDescriptionUnd = $event"
            :title="$t('Revenues.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-12'"
            :id="`${id}-refundNotes`"
            :value="revenue.refundNotes"
            v-on:changeValue="revenue.refundNotes = $event"
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
} from "./../../../../utils/functions";

import CustomFileInput from "./../../../../components/general/CustomFileInput.vue";
import CustomInput from "./../../../../components/general/CustomInput.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import CustomInputFloat from "./../../../../components/general/CustomInputFloat.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import { hasRevenueDeleteImage } from "./../../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../../utils/functions";
import generalMixin from "./../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import {
  getRevenuesTypesDialogFromAll,
  getAccountsDialog,
  getPaymentMethodsDialog,
} from "./../../../../utils/dialogsOfApi";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomFileInput,
    CustomInput,
    CustomSelectBox,
    CustomInputFloat,
    TextArea,
  },
  data() {
    return {
      revenuesTypeTokenOptions: [],
      accountTokenOptions: [],
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
      revenuesTypeToken: { required },
      accountToken: { required },
      paymentMethodToken: { required },
      revenuesMoney: { required },
    },
  },
  computed: {
    errors_revenuesTypeToken() {
      let errors = [];
      if (this.$v.revenue.revenuesTypeToken.$error) {
        if (!this.$v.revenue.revenuesTypeToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_accountToken() {
      let errors = [];
      if (this.$v.revenue.accountToken.$error) {
        if (!this.$v.revenue.accountToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_paymentMethodToken() {
      let errors = [];
      if (this.$v.revenue.paymentMethodToken.$error) {
        if (!this.$v.revenue.paymentMethodToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_revenuesMoney() {
      let errors = [];
      if (this.$v.revenue.revenuesMoney.$error) {
        if (!this.$v.revenue.revenuesMoney.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
  },
  methods: {
    async getValueOfPromise(promise) {
      let val = promise.then(
        function (result) {
          return result;
        },
        function (err) {
          console.log(err);
          return false;
        }
      );
      return val;
    },
    async getRevenuesTypeItem(token) {
      let item = {};
      this.revenuesTypeTokenOptions
        .filter((a) => a.value == token)
        .map(function (a) {
          item = a;
        });
      return item;
    },
    async revenuesTypeTokenChanged(token) {
      if (token) {
        let item = await this.getRevenuesTypeItem(token);
        this.revenue.revenuesMoney = item.price;
      } else {
        this.revenue.revenuesMoney = "";
      }
    },
    async getRevenuesTypesDialogFromAll() {
      this.isLoading = true;
      let options = [];
      let result = await getRevenuesTypesDialogFromAll();
      if (result.hasPromiseOptions) {
        options = await this.getValueOfPromise(result.options);
      } else {
        options = result.options;
      }
      this.revenuesTypeTokenOptions = options;
      this.isLoading = false;
    },
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
      if (
        this.$v.revenue.revenuesTypeToken.required &&
        this.$v.revenue.accountToken.required &&
        this.$v.revenue.paymentMethodToken.required &&
        this.$v.revenue.revenuesMoney.required
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasRevenueDeleteImage,
    fullPathFileFromServer,
  },
  created() {
    this.getRevenuesTypesDialogFromAll();
    this.getAccountsDialog();
    this.getPaymentMethodsDialog();
  },
};
</script>
