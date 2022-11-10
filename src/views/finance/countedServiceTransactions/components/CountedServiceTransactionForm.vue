<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :defaultImg="
            fullPathFileFromServer(
              countedServiceTransaction.countedServiceTransactionImagePath,
              countedServiceTransaction.defaultImg
            )
          "
          @changeValue="countedServiceTransaction.mediaFile = $event.file"
          :className="'col-12'"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            :className="'col-md-12'"
            :id="`${id}-countedServiceToken`"
            :errors="errors_countedServiceToken"
            :value="countedServiceTransaction.countedServiceToken"
            :options="countedServiceTokenOptions"
            v-on:changeValue="
              countedServiceTransaction.countedServiceToken = $event;
              $v.countedServiceTransaction.countedServiceToken.$touch();
            "
            :title="$t('CountedServices.select')"
            :imgName="'countedServices.svg'"
          />

          <CustomInputFloat
            :className="'col-md-6'"
            :id="`${id}-countedServiceCount`"
            :errors="errors_countedServiceCount"
            :value="countedServiceTransaction.countedServiceCount"
            v-on:changeValue="
              countedServiceTransaction.countedServiceCount = $event;
              $v.countedServiceTransaction.countedServiceCount.$touch();
            "
            :title="$t('CountedServiceTransactions.countedServiceCount')"
            :imgName="'number.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="countedServiceTransaction.fullCode"
            v-on:changeValue="countedServiceTransaction.fullCode = $event"
            :title="$t('CountedServiceTransactions.code')"
            :imgName="'code.svg'"
          />

          <CustomCheckbox
            v-if="sellStatus"
            :className="'col-md-12'"
            :value="countedServiceTransaction.isSellingForStudent"
            v-on:changeValue="
              countedServiceTransaction.isSellingForStudent = $event
            "
            :title="$t('CountedServiceTransactions.isSellingForStudent')"
            :centerStatus="true"
          />

          <CustomSelectBox
            v-if="countedServiceTransaction.isSellingForStudent && sellStatus"
            :className="'col-md-12'"
            :id="`${id}-studentUserToken`"
            :errors="errors_studentUserToken"
            :value="countedServiceTransaction.studentUserToken"
            :options="studentUserTokenOptions"
            v-on:changeValue="
              countedServiceTransaction.studentUserToken = $event;
              $v.countedServiceTransaction.studentUserToken.$touch();
            "
            :title="$t('students.select')"
            :imgName="'students.svg'"
          />
          <template v-else>
            <CustomSelectBox
              :className="'col-md-6'"
              :id="`${id}-accountToken`"
              :errors="errors_accountToken"
              :value="countedServiceTransaction.accountToken"
              :options="accountTokenOptions"
              v-on:changeValue="
                countedServiceTransaction.accountToken = $event;
                $v.countedServiceTransaction.accountToken.$touch();
              "
              :title="$t('Accounts.select')"
              :imgName="'accounts.svg'"
            />
            <CustomSelectBox
              :className="'col-md-6'"
              :id="`${id}-paymentMethodToken`"
              :value="countedServiceTransaction.paymentMethodToken"
              :options="paymentMethodTokenOptions"
              v-on:changeValue="
                countedServiceTransaction.paymentMethodToken = $event
              "
              :title="$t('PaymentMethods.select')"
              :imgName="'paymentMethods.svg'"
            />
          </template>

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-countedServiceTransactionDescriptionAr`"
            :errors="errors_countedServiceTransactionDescriptionAr"
            :value="
              countedServiceTransaction.countedServiceTransactionDescriptionAr
            "
            v-on:changeValue="
              countedServiceTransaction.countedServiceTransactionDescriptionAr =
                $event;
              $v.countedServiceTransaction.countedServiceTransactionDescriptionAr.$touch();
            "
            :title="$t('CountedServiceTransactions.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-countedServiceTransactionDescriptionEn`"
            :errors="errors_countedServiceTransactionDescriptionEn"
            :value="
              countedServiceTransaction.countedServiceTransactionDescriptionEn
            "
            v-on:changeValue="
              countedServiceTransaction.countedServiceTransactionDescriptionEn =
                $event;
              $v.countedServiceTransaction.countedServiceTransactionDescriptionEn.$touch();
            "
            :title="$t('CountedServiceTransactions.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-countedServiceTransactionDescriptionUnd`"
            :value="
              countedServiceTransaction.countedServiceTransactionDescriptionUnd
            "
            v-on:changeValue="
              countedServiceTransaction.countedServiceTransactionDescriptionUnd =
                $event
            "
            :title="$t('CountedServiceTransactions.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-countedServiceTransactionNotes`"
            :value="countedServiceTransaction.countedServiceTransactionNotes"
            v-on:changeValue="
              countedServiceTransaction.countedServiceTransactionNotes = $event
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
import CustomCheckbox from "./../../../../components/general/CustomCheckbox.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import { checkPrivilege } from "./../../../../utils/functions";
import generalMixin from "./../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import {
  getCountedServicesDialog,
  getAccountsDialog,
  getUsersDialog,
  getPaymentMethodsDialog,
} from "./../../../../utils/dialogsOfApi";
import { USER_TYPE } from "./../../../../utils/constantLists";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomFileInput,
    CustomInput,
    CustomInputFloat,
    CustomSelectBox,
    CustomCheckbox,
    TextArea,
  },
  data() {
    return {
      countedServiceTokenOptions: [],
      accountTokenOptions: [],
      studentUserTokenOptions: [],
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
    bottomSheetName: {
      type: String,
      default: "",
    },
    sellStatus: {
      type: Boolean,
      default: false,
    },
  },
  validations: {
    countedServiceTransaction: {
      countedServiceToken: { required },
      accountToken: { required },
      studentUserToken: { required },
      countedServiceCount: { required },
      countedServiceTransactionDescriptionAr: { isValidTextAr },
      countedServiceTransactionDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_studentUserToken() {
      let errors = [];
      if (this.$v.countedServiceTransaction.studentUserToken.$error) {
        if (!this.$v.countedServiceTransaction.studentUserToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_countedServiceToken() {
      let errors = [];
      if (this.$v.countedServiceTransaction.countedServiceToken.$error) {
        if (!this.$v.countedServiceTransaction.countedServiceToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_accountToken() {
      let errors = [];
      if (this.$v.countedServiceTransaction.accountToken.$error) {
        if (!this.$v.countedServiceTransaction.accountToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_countedServiceCount() {
      let errors = [];
      if (this.$v.countedServiceTransaction.countedServiceCount.$error) {
        if (!this.$v.countedServiceTransaction.countedServiceCount.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_countedServiceTransactionDescriptionAr() {
      let errors = [];
      if (
        this.$v.countedServiceTransaction.countedServiceTransactionDescriptionAr
          .$error
      ) {
        if (
          !this.$v.countedServiceTransaction
            .countedServiceTransactionDescriptionAr.isValidTextAr
        )
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_countedServiceTransactionDescriptionEn() {
      let errors = [];
      if (
        this.$v.countedServiceTransaction.countedServiceTransactionDescriptionEn
          .$error
      ) {
        if (
          !this.$v.countedServiceTransaction
            .countedServiceTransactionDescriptionEn.isValidTextEn
        )
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
  },
  methods: {
    async getCountedServicesDialog() {
      this.isLoading = true;
      this.countedServiceTokenOptions = await getCountedServicesDialog();
      this.isLoading = false;
    },
    async getAccountsDialog() {
      this.isLoading = true;

      this.accountTokenOptions = await getAccountsDialog();
      this.isLoading = false;
    },
    async getStudentsDialog() {
      this.isLoading = true;
      let params = {
        modelName: "students",
        userTypeToken: USER_TYPE.Student,
      };
      this.studentUserTokenOptions = await getUsersDialog(params);
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
        this.$v.countedServiceTransaction.countedServiceToken.required &&
        (this.$v.countedServiceTransaction.accountToken.required ||
          this.$v.countedServiceTransaction.studentUserToken.required) &&
        this.$v.countedServiceTransaction.countedServiceCount.required &&
        this.$v.countedServiceTransaction.countedServiceTransactionDescriptionAr
          .isValidTextAr &&
        this.$v.countedServiceTransaction.countedServiceTransactionDescriptionEn
          .isValidTextEn
      ) {
        if (this.countedServiceTransaction.isSellingForStudent) {
          this.countedServiceTransaction.accountToken = "";
          this.countedServiceTransaction.paymentMethodToken = "";
        } else {
          this.countedServiceTransaction.studentUserToken = "";
        }

        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    fullPathFileFromServer,
  },
  created() {
    this.getCountedServicesDialog();
    this.getAccountsDialog();
    this.getStudentsDialog();
    this.getPaymentMethodsDialog();
  },
};
</script>
