<template>
  <div class="">
    <form autocomplete="off">
      <div class="row" v-if="id == 'accrual'">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="serviceEntitlement.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              serviceEntitlement.serviceEntitlementImagePath,
              serviceEntitlement.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !serviceEntitlement.serviceEntitlementImageIsDefault &&
            checkPrivilege(hasServiceEntitlementDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <template v-if="id == 'accrual'">
            <CustomSelectBox
              :className="'col-md-12'"
              :id="`${id}-userStudentToken`"
              :errors="errors_userStudentToken"
              :value="serviceEntitlement.userStudentToken"
              :options="userTokenOptions"
              v-on:changeValue="
                serviceEntitlement.userStudentToken = $event;
                $v.serviceEntitlement.userStudentToken.$touch();
              "
              :title="$t('students.select')"
              :imgName="'user.svg'"
            />
            <CustomSelectBox
              :className="'col-md-12'"
              :id="`${id}-serviceToken`"
              :errors="errors_serviceToken"
              :value="serviceEntitlement.serviceToken"
              :options="serviceTokenOptions"
              v-on:changeValue="
                serviceEntitlement.serviceToken = $event;
                $v.serviceEntitlement.serviceToken.$touch();
              "
              :title="$t('Services.select')"
              :imgName="'services.svg'"
            />

            <CustomSelectBox
              :className="'col-md-12'"
              :id="`${id}-accountToken`"
              :errors="errors_accountToken"
              :value="serviceEntitlement.accountToken"
              :options="accountTokenOptions"
              v-on:changeValue="
                serviceEntitlement.accountToken = $event;
                $v.serviceEntitlement.accountToken.$touch();
              "
              :title="$t('Accounts.select')"
              :imgName="'accounts.svg'"
            />
            <CustomSelectBox
              :className="'col-md-6'"
              :id="`${id}-paymentMethodToken`"
              :errors="errors_paymentMethodToken"
              :value="serviceEntitlement.paymentMethodToken"
              :options="paymentMethodTokenOptions"
              v-on:changeValue="
                serviceEntitlement.paymentMethodToken = $event;
                $v.serviceEntitlement.paymentMethodToken.$touch();
              "
              :title="$t('PaymentMethods.select')"
              :imgName="'paymentMethods.svg'"
            />
            <CustomInputFloat
              :className="'col-md-6'"
              :id="`${id}-serviceEntitlementMoney`"
              :value="serviceEntitlement.serviceEntitlementMoney"
              v-on:changeValue="
                serviceEntitlement.serviceEntitlementMoney = $event
              "
              :title="$t('general.value')"
              :imgName="'money.svg'"
            />
            <CustomInput
              :className="'col-md-6'"
              :id="`${id}-fullCode`"
              :value="serviceEntitlement.fullCode"
              v-on:changeValue="serviceEntitlement.fullCode = $event"
              :title="$t('code')"
              :imgName="'code.svg'"
            />
            <TextArea
              :className="'col-md-6'"
              :id="`${id}-serviceEntitlementDescriptionAr`"
              :errors="errors_serviceEntitlementDescriptionAr"
              :value="serviceEntitlement.serviceEntitlementDescriptionAr"
              v-on:changeValue="
                serviceEntitlement.serviceEntitlementDescriptionAr = $event;
                $v.serviceEntitlement.serviceEntitlementDescriptionAr.$touch();
              "
              :title="$t('descriptionAr')"
              :imgName="'description.svg'"
            />
            <TextArea
              :className="'col-md-6'"
              :id="`${id}-serviceEntitlementDescriptionEn`"
              :errors="errors_serviceEntitlementDescriptionEn"
              :value="serviceEntitlement.serviceEntitlementDescriptionEn"
              v-on:changeValue="
                serviceEntitlement.serviceEntitlementDescriptionEn = $event;
                $v.serviceEntitlement.serviceEntitlementDescriptionEn.$touch();
              "
              :title="$t('descriptionEn')"
              :imgName="'description.svg'"
            />
            <TextArea
              :className="'col-md-6'"
              :id="`${id}-serviceEntitlementDescriptionUnd`"
              :value="serviceEntitlement.serviceEntitlementDescriptionUnd"
              v-on:changeValue="
                serviceEntitlement.serviceEntitlementDescriptionUnd = $event
              "
              :title="$t('descriptionUnd')"
              :imgName="'description.svg'"
            />
            <TextArea
              :className="'col-md-12'"
              :id="`${id}-serviceEntitlementNotes`"
              :value="serviceEntitlement.serviceEntitlementNotes"
              v-on:changeValue="
                serviceEntitlement.serviceEntitlementNotes = $event
              "
              :title="$t('notes')"
              :imgName="'notes.svg'"
            />
          </template>

          <template v-if="id == 'addAsDebt'">
            <CustomSelectBox
              :className="'col-md-12'"
              :id="`${id}-userStudentToken`"
              :errors="errors_userStudentToken"
              :value="serviceEntitlement.userStudentToken"
              :options="userTokenOptions"
              v-on:changeValue="
                serviceEntitlement.userStudentToken = $event;
                $v.serviceEntitlement.userStudentToken.$touch();
              "
              :title="$t('students.select')"
              :imgName="'user.svg'"
            />
            <CustomSelectBox
              :className="'col-md-12'"
              :id="`${id}-serviceToken`"
              :errors="errors_serviceToken"
              :value="serviceEntitlement.serviceToken"
              :options="serviceTokenOptions"
              v-on:changeValue="
                serviceEntitlement.serviceToken = $event;
                $v.serviceEntitlement.serviceToken.$touch();
              "
              :title="$t('Services.select')"
              :imgName="'services.svg'"
            />

            <CustomInput
              :className="'col-md-6'"
              :id="`${id}-fullCode`"
              :value="serviceEntitlement.fullCode"
              v-on:changeValue="serviceEntitlement.fullCode = $event"
              :title="$t('ServiceEntitlements.code')"
              :imgName="'code.svg'"
            />
            <TextArea
              :className="'col-md-6'"
              :id="`${id}-serviceEntitlementDescriptionAr`"
              :errors="errors_serviceEntitlementDescriptionAr"
              :value="serviceEntitlement.serviceEntitlementDescriptionAr"
              v-on:changeValue="
                serviceEntitlement.serviceEntitlementDescriptionAr = $event;
                $v.serviceEntitlement.serviceEntitlementDescriptionAr.$touch();
              "
              :title="$t('ServiceEntitlements.descriptionAr')"
              :imgName="'description.svg'"
            />
            <TextArea
              :className="'col-md-6'"
              :id="`${id}-serviceEntitlementDescriptionEn`"
              :errors="errors_serviceEntitlementDescriptionEn"
              :value="serviceEntitlement.serviceEntitlementDescriptionEn"
              v-on:changeValue="
                serviceEntitlement.serviceEntitlementDescriptionEn = $event;
                $v.serviceEntitlement.serviceEntitlementDescriptionEn.$touch();
              "
              :title="$t('ServiceEntitlements.descriptionEn')"
              :imgName="'description.svg'"
            />
            <TextArea
              :className="'col-md-6'"
              :id="`${id}-serviceEntitlementDescriptionUnd`"
              :value="serviceEntitlement.serviceEntitlementDescriptionUnd"
              v-on:changeValue="
                serviceEntitlement.serviceEntitlementDescriptionUnd = $event
              "
              :title="$t('ServiceEntitlements.descriptionUnd')"
              :imgName="'description.svg'"
            />
            <TextArea
              :className="'col-md-12'"
              :id="`${id}-serviceEntitlementNotes`"
              :value="serviceEntitlement.serviceEntitlementNotes"
              v-on:changeValue="
                serviceEntitlement.serviceEntitlementNotes = $event
              "
              :title="$t('notes')"
              :imgName="'notes.svg'"
            />
          </template>

          <template v-if="id == 'refund'">
            <h4 class="text-center col-12 mb-3">
              {{ $t("areYouSureToRefundStart") }}
              <span class="co-red">{{
                serviceEntitlement.serviceEntitlementMoneyWithCurrency
              }}</span>
              {{ $t("areYouSureToRefundEnd") }}
            </h4>
            <CustomSelectBox
              :className="'col-md-6'"
              :id="`${id}-refundPaymentMethodToken`"
              :errors="errors_refundPaymentMethodToken"
              :value="serviceEntitlement.refundPaymentMethodToken"
              :options="paymentMethodTokenOptions"
              v-on:changeValue="
                serviceEntitlement.refundPaymentMethodToken = $event;
                $v.serviceEntitlement.refundPaymentMethodToken.$touch();
              "
              :title="$t('PaymentMethods.select')"
              :imgName="'paymentMethods.svg'"
            />
            <TextArea
              :className="'col-md-6'"
              :id="`${id}-refundReasonAr`"
              :errors="errors_refundReasonAr"
              :value="serviceEntitlement.refundReasonAr"
              v-on:changeValue="
                serviceEntitlement.refundReasonAr = $event;
                $v.serviceEntitlement.refundReasonAr.$touch();
              "
              :title="$t('ServiceEntitlements.refundReasonAr')"
              :imgName="'reason.svg'"
            />
            <TextArea
              :className="'col-md-6'"
              :id="`${id}-refundReasonEn`"
              :errors="errors_refundReasonEn"
              :value="serviceEntitlement.refundReasonEn"
              v-on:changeValue="
                serviceEntitlement.refundReasonEn = $event;
                $v.serviceEntitlement.refundReasonEn.$touch();
              "
              :title="$t('ServiceEntitlements.refundReasonEn')"
              :imgName="'reason.svg'"
            />
            <TextArea
              :className="'col-md-6'"
              :id="`${id}-refundReasonUnd`"
              :value="serviceEntitlement.refundReasonUnd"
              v-on:changeValue="serviceEntitlement.refundReasonUnd = $event"
              :title="$t('ServiceEntitlements.refundReasonUnd')"
              :imgName="'reason.svg'"
            />
            <TextArea
              :className="'col-md-12'"
              :id="`${id}-refundNotes`"
              :value="serviceEntitlement.refundNotes"
              v-on:changeValue="serviceEntitlement.refundNotes = $event"
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
import CustomFileInput from "./../../../../components/general/CustomFileInput.vue";
import CustomInputFloat from "./../../../../components/general/CustomInputFloat.vue";
import CustomInput from "./../../../../components/general/CustomInput.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import { hasServiceEntitlementDeleteImage } from "./../../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../../utils/functions";
import generalMixin from "./../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import {
  getUsersDialog,
  getAccountsDialog,
  getServicesDialog,
  getPaymentMethodsDialog,
} from "./../../../../utils/dialogsOfApi";
import { USER_TYPE } from "./../../../../utils/constantLists";
import { required } from "vuelidate/lib/validators";

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
      serviceTokenOptions: [],
      paymentMethodTokenOptions: [],
      userTokenOptions: [],
    };
  },
  props: {
    serviceEntitlement: {
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
    serviceEntitlement: {
      serviceToken: { required },
      accountToken: { required },
      userStudentToken: { required },
      paymentMethodToken: { required },
      serviceEntitlementDescriptionAr: { isValidTextAr },
      serviceEntitlementDescriptionEn: { isValidTextEn },
      refundPaymentMethodToken: { required },
      refundReasonAr: { required, isValidTextAr },
      refundReasonEn: { required, isValidTextEn },
    },
  },
  computed: {
    errors_serviceToken() {
      let errors = [];
      if (this.$v.serviceEntitlement.serviceToken.$error) {
        if (!this.$v.serviceEntitlement.serviceToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_accountToken() {
      let errors = [];
      if (this.$v.serviceEntitlement.accountToken.$error) {
        if (!this.$v.serviceEntitlement.accountToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_userStudentToken() {
      let errors = [];
      if (this.$v.serviceEntitlement.userStudentToken.$error) {
        if (!this.$v.serviceEntitlement.userStudentToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },

    errors_paymentMethodToken() {
      let errors = [];
      if (this.$v.serviceEntitlement.paymentMethodToken.$error) {
        if (!this.$v.serviceEntitlement.paymentMethodToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },

    errors_serviceEntitlementDescriptionAr() {
      let errors = [];
      if (this.$v.serviceEntitlement.serviceEntitlementDescriptionAr.$error) {
        if (
          !this.$v.serviceEntitlement.serviceEntitlementDescriptionAr
            .isValidTextAr
        )
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_serviceEntitlementDescriptionEn() {
      let errors = [];
      if (this.$v.serviceEntitlement.serviceEntitlementDescriptionEn.$error) {
        if (
          !this.$v.serviceEntitlement.serviceEntitlementDescriptionEn
            .isValidTextEn
        )
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
    errors_refundPaymentMethodToken() {
      let errors = [];
      if (this.$v.serviceEntitlement.refundPaymentMethodToken.$error) {
        if (!this.$v.serviceEntitlement.refundPaymentMethodToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_refundReasonAr() {
      let errors = [];
      if (this.$v.serviceEntitlement.refundReasonAr.$error) {
        if (
          !this.$v.serviceEntitlement.refundReasonAr.required &&
          !this.$v.serviceEntitlement.refundReasonEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.serviceEntitlement.refundReasonAr.required &&
          !this.$v.serviceEntitlement.refundReasonAr.isValidTextAr
        )
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_refundReasonEn() {
      let errors = [];
      if (this.$v.serviceEntitlement.refundReasonEn.$error) {
        if (
          !this.$v.serviceEntitlement.refundReasonEn.required &&
          !this.$v.serviceEntitlement.refundReasonAr.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.serviceEntitlement.refundReasonEn.required &&
          !this.$v.serviceEntitlement.refundReasonEn.isValidTextEn
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
    async getServicesDialog() {
      this.isLoading = true;

      this.serviceTokenOptions = await getServicesDialog();
      this.isLoading = false;
    },
    async getPaymentMethodsDialog() {
      this.isLoading = true;

      this.paymentMethodTokenOptions = await getPaymentMethodsDialog();
      this.isLoading = false;
    },
    async getStudentsDialog() {
      this.isLoading = true;
      let params = {
        modelName: "students",
        userTypeToken: USER_TYPE.Student,
      };
      this.userTokenOptions = await getUsersDialog(params);
      this.isLoading = false;
    },
    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      let check = "";
      if (this.id == "accrual") {
        check =
          this.$v.serviceEntitlement.userStudentToken.required &&
          this.$v.serviceEntitlement.serviceToken.required &&
          this.$v.serviceEntitlement.accountToken.required &&
          this.$v.serviceEntitlement.paymentMethodToken.required &&
          (this.$v.serviceEntitlement.serviceEntitlementDescriptionAr
            .isValidTextAr ||
            this.$v.serviceEntitlement.serviceEntitlementDescriptionEn
              .isValidTextEn);
      } else if (this.id == "addAsDebt") {
        check =
          this.$v.serviceEntitlement.userStudentToken.required &&
          this.$v.serviceEntitlement.serviceToken.required &&
          (this.$v.serviceEntitlement.serviceEntitlementDescriptionAr
            .isValidTextAr ||
            this.$v.serviceEntitlement.serviceEntitlementDescriptionEn
              .isValidTextEn);
      } else if (this.id == "refund") {
        check =
          this.$v.serviceEntitlement.refundPaymentMethodToken.required &&
          ((this.$v.serviceEntitlement.refundReasonAr.required &&
            this.$v.serviceEntitlement.refundReasonAr.isValidTextAr) ||
            (this.$v.serviceEntitlement.refundReasonEn.required &&
              this.$v.serviceEntitlement.refundReasonEn.isValidTextEn));
      }
      if (check) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasServiceEntitlementDeleteImage,
    fullPathFileFromServer,
  },
  created() {
    this.getStudentsDialog();
    this.getAccountsDialog();
    this.getServicesDialog();
    this.getPaymentMethodsDialog();
  },
};
</script>
