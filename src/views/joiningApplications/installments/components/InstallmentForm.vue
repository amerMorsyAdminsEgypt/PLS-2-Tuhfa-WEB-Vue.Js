<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="installment.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              installment.installmentImagePath,
              installment.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !installment.installmentImageIsDefault &&
            checkPrivilege(hasInstallmentDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="installment.fullCode"
            v-on:changeValue="installment.fullCode = $event"
            :title="$t('Installments.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-installmentNameAr`"
            :value="installment.installmentNameAr"
            v-on:changeValue="installment.installmentNameAr = $event"
            :title="$t('Installments.nameAr')"
            :imgName="'installments.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-installmentNameEn`"
            :value="installment.installmentNameEn"
            v-on:changeValue="installment.installmentNameEn = $event"
            :title="$t('Installments.nameEn')"
            :imgName="'installments.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-installmentNameUnd`"
            :value="installment.installmentNameUnd"
            v-on:changeValue="installment.installmentNameUnd = $event"
            :title="$t('Installments.nameUnd')"
            :imgName="'installments.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-installmentDescriptionAr`"
            :errors="errors_installmentDescriptionAr"
            :value="installment.installmentDescriptionAr"
            v-on:changeValue="
              installment.installmentDescriptionAr = $event;
              $v.installment.installmentDescriptionAr.$touch();
            "
            :title="$t('Installments.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-installmentDescriptionEn`"
            :errors="errors_installmentDescriptionEn"
            :value="installment.installmentDescriptionEn"
            v-on:changeValue="
              installment.installmentDescriptionEn = $event;
              $v.installment.installmentDescriptionEn.$touch();
            "
            :title="$t('Installments.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-installmentDescriptionUnd`"
            :value="installment.installmentDescriptionUnd"
            v-on:changeValue="installment.installmentDescriptionUnd = $event"
            :title="$t('Installments.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-installmentNotes`"
            :value="installment.installmentNotes"
            v-on:changeValue="installment.installmentNotes = $event"
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />
        </div>
        <template v-if="id == 'add'">
          <CustomSelectBox
            :className="'col-md-12'"
            :id="`${id}-debtUserToken`"
            :value="installment.debtUserToken"
            :options="debtUserTokenOptions"
            v-on:changeValue="userChanged($event)"
            :title="$t('students.name')"
            :imgName="'students.svg'"
          />
          <CustomSelectBoxMultiple
            :className="'col-md-12'"
            :id="`${id}-debtTokens`"
            :value="installment.debtTokens"
            :options="debtTokensOptions"
            v-on:changeValue="installment.debtTokens = $event"
            :title="$t('Debts.modelName')"
            :imgName="'debts.svg'"
            :returnArrayOfObjects="false"
          />
          <CustomCheckbox
            :className="'col-12'"
            :value="installment.isPaidCash"
            v-on:changeValue="installment.isPaidCash = $event"
            :title="$t('general.isPaidCash')"
            :centerStatus="true"
          />

          <InstallmentScheduleTimesInfoDataComponet
            v-if="!installment.isPaidCash"
            :installmentScheduleTimesInfoData="
              installment.installmentScheduleTimesInfoData
            "
            :installmentBatchTypeTokenOptions="installmentBatchTypeTokenOptions"
            :id="`add`"
          />

          <CustomSelectBox
            v-else
            :className="'col-md-12'"
            :id="`${id}-accountToken`"
            :value="installment.accountToken"
            :options="accountTokenOptions"
            v-on:changeValue="installment.accountToken = $event"
            :title="$t('Accounts.select')"
            :imgName="'accounts.svg'"
          />
        </template>
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
  isValidNameAr,
  isValidNameEn,
  isValidTextAr,
  isValidTextEn,
} from "./../../../../utils/validationHelper";
import CustomFileInput from "./../../../../components/general/CustomFileInput.vue";
import CustomInput from "./../../../../components/general/CustomInput.vue";
import CustomCheckbox from "./../../../../components/general/CustomCheckbox.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import CustomSelectBoxMultiple from "./../../../../components/general/CustomSelectBoxMultiple.vue";
import InstallmentScheduleTimesInfoDataComponet from "./InstallmentScheduleTimesInfoDataComponet.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import { hasInstallmentDeleteImage } from "./../../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../../utils/functions";
import generalMixin from "./../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import {
  USER_TYPE,
  SCHEDULING_STATUS_TOKENS,
} from "./../../../../utils/constantLists";
import {
  getInstallmentBatchTypesDialog,
  getAccountsDialog,
  getUsersDialog,
  getDebtsDialog,
} from "./../../../../utils/dialogsOfApi";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomFileInput,
    CustomInput,
    CustomCheckbox,
    CustomSelectBox,
    CustomSelectBoxMultiple,
    TextArea,
    InstallmentScheduleTimesInfoDataComponet,
  },
  data() {
    return {
      debtUserTokenOptions: [],
      debtTokensOptions: [],
      accountTokenOptions: [],
      installmentBatchTypeTokenOptions: [],
    };
  },
  props: {
    installment: {
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
    installment: {
      installmentNameAr: { required, isValidNameAr },
      installmentNameEn: { required, isValidNameEn },
      installmentDescriptionAr: { isValidTextAr },
      installmentDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_installmentNameAr() {
      let errors = [];
      if (this.$v.installment.installmentNameAr.$error) {
        if (
          !this.$v.installment.installmentNameAr.required &&
          !this.$v.installment.installmentNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.installment.installmentNameAr.required &&
          !this.$v.installment.installmentNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_installmentNameEn() {
      let errors = [];
      if (this.$v.installment.installmentNameEn.$error) {
        if (
          !this.$v.installment.installmentNameAr.required &&
          !this.$v.installment.installmentNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.installment.installmentNameEn.required &&
          !this.$v.installment.installmentNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_installmentDescriptionAr() {
      let errors = [];
      if (this.$v.installment.installmentDescriptionAr.$error) {
        if (!this.$v.installment.installmentDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_installmentDescriptionEn() {
      let errors = [];
      if (this.$v.installment.installmentDescriptionEn.$error) {
        if (!this.$v.installment.installmentDescriptionEn.isValidTextEn)
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
  },
  methods: {
    async getInstallmentBatchTypesDialog() {
      this.isLoading = true;
      this.installmentBatchTypeTokenOptions =
        await getInstallmentBatchTypesDialog();
      this.isLoading = false;
    },
    async getAccountsDialog() {
      this.isLoading = true;
      this.accountTokenOptions = await getAccountsDialog();
      this.isLoading = false;
    },
    async userChanged(data) {
      this.installment.debtUserToken = data;
      this.debtTokensOptions = [];
      this.getDebtsDialog();
    },
    async getStudentsDialog() {
      this.isLoading = true;
      let params = {
        modelName: "students",
        userTypeToken: USER_TYPE.Student,
      };
      this.debtUserTokenOptions = await getUsersDialog(params);
      this.isLoading = false;
    },
    async getDebtsDialog() {
      this.isLoading = true;
      let params = {
        userToken: this.installment.debtUserToken,
        schedulingStatusTypeToken: SCHEDULING_STATUS_TOKENS.NotHaveSchedule,
      };
      this.debtTokensOptions = await getDebtsDialog(params);
      this.isLoading = false;
    },
    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        this.$v.installment.installmentDescriptionAr.isValidTextAr &&
        this.$v.installment.installmentDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasInstallmentDeleteImage,
    fullPathFileFromServer,
  },
  created() {
    if (this.id == "add") {
      this.getInstallmentBatchTypesDialog();
      this.getAccountsDialog();
      this.getStudentsDialog();
      this.getDebtsDialog();
    }
  },
};
</script>
