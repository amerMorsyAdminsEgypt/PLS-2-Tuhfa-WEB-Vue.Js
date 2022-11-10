<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="expense.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(expense.expenseImagePath, expense.defaultImg)
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !expense.expenseImageIsDefault &&
            checkPrivilege(hasExpenseDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-expensesTypeToken`"
            :errors="errors_expensesTypeToken"
            :value="expense.expensesTypeToken"
            :options="expensesTypeTokenOptions"
            v-on:changeValue="
              expense.expensesTypeToken = $event;
              expensesTypeTokenChanged($event);
              $v.expense.expensesTypeToken.$touch();
            "
            :title="$t('Expenses.type')"
            :imgName="'expenses.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-accountToken`"
            :errors="errors_accountToken"
            :value="expense.accountToken"
            :options="accountTokenOptions"
            v-on:changeValue="
              expense.accountToken = $event;
              $v.expense.accountToken.$touch();
            "
            :title="$t('Accounts.select')"
            :imgName="'accounts.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-paymentMethodToken`"
            :errors="errors_paymentMethodToken"
            :value="expense.paymentMethodToken"
            :options="paymentMethodTokenOptions"
            v-on:changeValue="
              expense.paymentMethodToken = $event;
              $v.expense.paymentMethodToken.$touch();
            "
            :title="$t('PaymentMethods.select')"
            :imgName="'paymentMethods.svg'"
          />
          <CustomInputFloat
            :className="'col-md-6'"
            :id="`${id}-expensesMoney`"
            :errors="errors_expensesMoney"
            :value="expense.expensesMoney"
            v-on:changeValue="
              expense.expensesMoney = $event;
              $v.expense.expensesMoney.$touch();
            "
            :title="$t('Expenses.money')"
            :imgName="'money.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="expense.fullCode"
            v-on:changeValue="expense.fullCode = $event"
            :title="$t('Expenses.code')"
            :imgName="'code.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-expensesDescriptionAr`"
            :value="expense.expensesDescriptionAr"
            v-on:changeValue="expense.expensesDescriptionAr = $event"
            :title="$t('Expenses.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-expensesDescriptionEn`"
            :value="expense.expensesDescriptionEn"
            v-on:changeValue="expense.expensesDescriptionEn = $event"
            :title="$t('Expenses.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-expensesDescriptionUnd`"
            :value="expense.expensesDescriptionUnd"
            v-on:changeValue="expense.expensesDescriptionUnd = $event"
            :title="$t('Expenses.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-12'"
            :id="`${id}-expensesNotes`"
            :value="expense.expensesNotes"
            v-on:changeValue="expense.expensesNotes = $event"
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
import { hasExpenseDeleteImage } from "./../../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../../utils/functions";
import generalMixin from "./../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import {
  // getExpensesTypesDialog,
  getExpensesTypesDialogFromAll,
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
      expensesTypeTokenOptions: [],
      accountTokenOptions: [],
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
      expensesTypeToken: { required },
      accountToken: { required },
      paymentMethodToken: { required },
      expensesMoney: { required },
    },
  },
  computed: {
    errors_expensesTypeToken() {
      let errors = [];
      if (this.$v.expense.expensesTypeToken.$error) {
        if (!this.$v.expense.expensesTypeToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_accountToken() {
      let errors = [];
      if (this.$v.expense.accountToken.$error) {
        if (!this.$v.expense.accountToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_paymentMethodToken() {
      let errors = [];
      if (this.$v.expense.paymentMethodToken.$error) {
        if (!this.$v.expense.paymentMethodToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_expensesMoney() {
      let errors = [];
      if (this.$v.expense.expensesMoney.$error) {
        if (!this.$v.expense.expensesMoney.required)
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
    async getExpensesTypeItem(token) {
      let item = {};
      this.expensesTypeTokenOptions
        .filter((a) => a.value == token)
        .map(function (a) {
          item = a;
        });
      return item;
    },
    async expensesTypeTokenChanged(token) {
      if (token) {
        let item = await this.getExpensesTypeItem(token);
        this.expense.expensesMoney = item.price;
      } else {
        this.expense.expensesMoney = "";
      }
    },
    async getExpensesTypesDialogFromAll() {
      this.isLoading = true;
      let options = [];
      let result = await getExpensesTypesDialogFromAll();
      if (result.hasPromiseOptions) {
        options = await this.getValueOfPromise(result.options);
      } else {
        options = result.options;
      }
      this.expensesTypeTokenOptions = options;
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
        this.$v.expense.expensesTypeToken.required &&
        this.$v.expense.accountToken.required &&
        this.$v.expense.paymentMethodToken.required &&
        this.$v.expense.expensesMoney.required
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasExpenseDeleteImage,
    fullPathFileFromServer,
  },
  created() {
    this.getExpensesTypesDialogFromAll();
    this.getAccountsDialog();
    this.getPaymentMethodsDialog();
  },
};
</script>
