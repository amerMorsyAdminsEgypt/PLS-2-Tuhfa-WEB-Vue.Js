<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="accountTransaction.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              accountTransaction.accountTransactionImagePath,
              accountTransaction.defaultImg
            )
          "
          :deleteFileStatus="false"
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-accountTransactionTypeToken`"
            :errors="errors_accountTransactionTypeToken"
            :value="accountTransaction.accountTransactionTypeToken"
            :options="accountTransactionTypeTokenOptions"
            v-on:changeValue="
              accountTransaction.accountTransactionTypeToken = $event;
              $v.accountTransaction.accountTransactionTypeToken.$touch();
            "
            :title="$t('AccountTransactions.type')"
            :imgName="'accountTransactions.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-accountToken`"
            :errors="errors_accountToken"
            :value="accountTransaction.accountToken"
            :options="accountTokenOptions"
            v-on:changeValue="
              accountTransaction.accountToken = $event;
              $v.accountTransaction.accountToken.$touch();
            "
            :title="$t('Accounts.select')"
            :imgName="'accounts.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-paymentMethodToken`"
            :errors="errors_paymentMethodToken"
            :value="accountTransaction.paymentMethodToken"
            :options="paymentMethodTokenOptions"
            v-on:changeValue="
              accountTransaction.paymentMethodToken = $event;
              $v.accountTransaction.paymentMethodToken.$touch();
            "
            :title="$t('PaymentMethods.select')"
            :imgName="'paymentMethods.svg'"
          />
          <CustomInputFloat
            :className="'col-md-6'"
            :id="`${id}-accountTransactionMoney`"
            :errors="errors_accountTransactionMoney"
            :value="accountTransaction.accountTransactionMoney"
            v-on:changeValue="
              accountTransaction.accountTransactionMoney = $event;
              $v.accountTransaction.accountTransactionMoney.$touch();
            "
            :title="$t('AccountTransactions.money')"
            :imgName="'money.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="accountTransaction.fullCode"
            v-on:changeValue="accountTransaction.fullCode = $event"
            :title="$t('AccountTransactions.code')"
            :imgName="'code.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-accountTransactionDescriptionAr`"
            :errors="errors_accountTransactionDescriptionAr"
            :value="accountTransaction.accountTransactionDescriptionAr"
            v-on:changeValue="
              accountTransaction.accountTransactionDescriptionAr = $event;
              $v.accountTransaction.accountTransactionDescriptionAr.$touch();
            "
            :title="$t('AccountTransactions.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-accountTransactionDescriptionEn`"
            :errors="errors_accountTransactionDescriptionEn"
            :value="accountTransaction.accountTransactionDescriptionEn"
            v-on:changeValue="
              accountTransaction.accountTransactionDescriptionEn = $event;
              $v.accountTransaction.accountTransactionDescriptionEn.$touch();
            "
            :title="$t('AccountTransactions.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-accountTransactionDescriptionUnd`"
            :value="accountTransaction.accountTransactionDescriptionUnd"
            v-on:changeValue="
              accountTransaction.accountTransactionDescriptionUnd = $event
            "
            :title="$t('AccountTransactions.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-12'"
            :id="`${id}-accountTransactionNotes`"
            :value="accountTransaction.accountTransactionNotes"
            v-on:changeValue="
              accountTransaction.accountTransactionNotes = $event
            "
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
import {
  isValidTextAr,
  isValidTextEn,
} from "./../../../../utils/validationHelper";
import CustomFileInput from "./../../../../components/general/CustomFileInput.vue";
import CustomInput from "./../../../../components/general/CustomInput.vue";
import CustomInputFloat from "./../../../../components/general/CustomInputFloat.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import { checkPrivilege } from "./../../../../utils/functions";
import generalMixin from "./../../../../utils/generalMixin";
import { getDialogOfAccountTransactionType } from "./../../../../utils/dialogsOfConstantsLists";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import {
  getAccountsDialog,
  getPaymentMethodsDialog,
} from "./../../../../utils/dialogsOfApi";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomFileInput,
    CustomInput,
    CustomInputFloat,
    CustomSelectBox,
    TextArea,
  },
  data() {
    return {
      accountTransactionTypeTokenOptions: getDialogOfAccountTransactionType(),
      accountTokenOptions: [],
      paymentMethodTokenOptions: [],
    };
  },
  props: {
    accountTransaction: {
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
    accountTransaction: {
      accountTransactionTypeToken: { required },
      accountToken: { required },
      paymentMethodToken: { required },
      accountTransactionMoney: { required },
      accountTransactionDescriptionAr: { isValidTextAr },
      accountTransactionDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_accountTransactionTypeToken() {
      let errors = [];
      if (this.$v.accountTransaction.accountTransactionTypeToken.$error) {
        if (!this.$v.accountTransaction.accountTransactionTypeToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_accountToken() {
      let errors = [];
      if (this.$v.accountTransaction.accountToken.$error) {
        if (!this.$v.accountTransaction.accountToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_paymentMethodToken() {
      let errors = [];
      if (this.$v.accountTransaction.paymentMethodToken.$error) {
        if (!this.$v.accountTransaction.paymentMethodToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_accountTransactionMoney() {
      let errors = [];
      if (this.$v.accountTransaction.accountTransactionMoney.$error) {
        if (!this.$v.accountTransaction.accountTransactionMoney.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_accountTransactionDescriptionAr() {
      let errors = [];
      if (this.$v.accountTransaction.accountTransactionDescriptionAr.$error) {
        if (
          !this.$v.accountTransaction.accountTransactionDescriptionAr
            .isValidTextAr
        )
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_accountTransactionDescriptionEn() {
      let errors = [];
      if (this.$v.accountTransaction.accountTransactionDescriptionEn.$error) {
        if (
          !this.$v.accountTransaction.accountTransactionDescriptionEn
            .isValidTextEn
        )
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
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
      if (
        this.$v.accountTransaction.accountTransactionTypeToken.required &&
        this.$v.accountTransaction.accountToken.required &&
        this.$v.accountTransaction.paymentMethodToken.required &&
        this.$v.accountTransaction.accountTransactionMoney.required &&
        this.$v.accountTransaction.accountTransactionDescriptionAr
          .isValidTextAr &&
        this.$v.accountTransaction.accountTransactionDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    fullPathFileFromServer,
  },
  created() {
    this.getAccountsDialog();
    this.getPaymentMethodsDialog();
  },
};
</script>
