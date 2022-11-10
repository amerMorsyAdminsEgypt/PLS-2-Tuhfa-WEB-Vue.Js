<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="SubscribeInMediaPackage"
      :headerText="$t('MediaPackageCodes.subscribe')"
      :headerIcon="subscribeInMediaPackage.icon"
    >
      <!-- class="bottom-sheet-like-modal" -->
      <div class="row">
        <CustomSelectBox
          :className="'col-md-12'"
          :id="`mediaPackageToken`"
          :value="subscribeInMediaPackage.mediaPackageToken"
          :options="mediaPackageTokenOptions"
          v-on:changeValue="subscribeInMediaPackage.mediaPackageToken = $event"
          :title="$t('MediaPackages.select')"
          :imgName="'mediaPackages.svg'"
        />
        <!-- parent -->
        <CustomSelectBox
          :className="'col-md-12'"
          :id="`joinInEducationalGroupToken`"
          :value="subscribeInMediaPackage.joinInEducationalGroupToken"
          :options="educationalGroupTokenOptions"
          v-on:changeValue="
            subscribeInMediaPackage.joinInEducationalGroupToken = $event
          "
          :title="$t('EducationalGroups.select')"
          :imgName="'EducationalGroups.svg'"
        />
        <CustomSelectBox
          :className="'col-md-12'"
          :id="`userToken`"
          :value="subscribeInMediaPackage.userToken"
          :options="studentTokensOptions"
          v-on:changeValue="subscribeInMediaPackage.userToken = $event"
          :title="$t('students.select')"
          :imgName="'students.svg'"
        />
        <CustomCheckbox
          :className="'col-md-12'"
          :value="subscribeInMediaPackage.cashPaymentStatus"
          v-on:changeValue="subscribeInMediaPackage.cashPaymentStatus = $event"
          :title="$t('pay')"
        />
        <template v-if="subscribeInMediaPackage.cashPaymentStatus">
          <CustomSelectBox
            :className="'col-md-12'"
            :id="`accountToken`"
            :value="subscribeInMediaPackage.accountToken"
            :options="accountTokenOptions"
            v-on:changeValue="subscribeInMediaPackage.accountToken = $event"
            :title="$t('Accounts.select')"
            :imgName="'accounts.svg'"
          />
          <CustomSelectBox
            :className="'col-md-12'"
            :id="`paymentMethodToken`"
            :value="subscribeInMediaPackage.paymentMethodToken"
            :options="paymentMethodTokenOptions"
            v-on:changeValue="
              subscribeInMediaPackage.paymentMethodToken = $event
            "
            :title="$t('PaymentMethods.select')"
            :imgName="'paymentMethods.svg'"
          />
        </template>
      </div>

      <div class="form-actions">
        <div class="icon-submit" @click.prevent="subscribeMediaPackageCode()">
          <img src="@/assets/images/check-icon.svg" :title="$t('add')" />
        </div>
        <div
          @click.prevent="closeBottomSheet('SubscribeInMediaPackage')"
          class="icon-cancel"
        >
          <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
        </div>
      </div>
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="SubscribeInMediaPackage"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../components/general/CustomBottomSheet.vue";
import CustomCheckbox from "./../../../components/general/CustomCheckbox.vue";
import CustomSelectBox from "./../../../components/general/CustomSelectBox.vue";
import ConfirmClearData from "./../../../components/general/ConfirmClearData.vue";
import { STATUS } from "./../../../utils/constants";
// import { USER_TYPE } from "./../../../utils/constantLists";
import { objectToFormData } from "./../../../utils/functions";
import {
  getMediaPackagesDialog,
  getEducationalGroupsDialog,
  getEducationalGroupStudentsDialog,
  // getUsersDialog,
  getAccountsDialog,
  getPaymentMethodsDialog,
} from "./../../../utils/dialogsOfApi";
import apiMediaPackageCode from "./../../../api/mediaPackageCode";
import generalMixin from "./../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    CustomCheckbox,
    CustomSelectBox,
    ConfirmClearData,
  },
  props: ["subscribeInMediaPackage"],
  watch: {
    "subscribeInMediaPackage.joinInEducationalGroupToken": function () {
      this.getEducationalGroupStudentsDialog();
    },
  },
  data() {
    return {
      mediaPackageTokenOptions: [],
      educationalGroupTokenOptions: [],
      studentTokensOptions: [],
      accountTokenOptions: [],
      paymentMethodTokenOptions: [],
    };
  },
  methods: {
    //#region dialogs
    async getEducationalGroupsDialog() {
      this.isLoading = true;
      this.educationalGroupTokenOptions = await getEducationalGroupsDialog();
      this.isLoading = false;
    },
    async getEducationalGroupStudentsDialog() {
      this.isLoading = true;
      let params = {
        educationalGroupToken:
          this.subscribeInMediaPackage.joinInEducationalGroupToken,
      };
      this.studentTokensOptions = await getEducationalGroupStudentsDialog(
        params
      );
      this.isLoading = false;
    },
    // async getStudentsDialog() {
    //   this.isLoading = true;
    //   let params = {
    //     modelName: "students",
    //     userTypeToken: USER_TYPE.Student,
    //   };
    //   this.studentTokensOptions = await getUsersDialog(params);
    //   this.isLoading = false;
    // },
    async getMediaPackagesDialog() {
      this.isLoading = true;
      this.mediaPackageTokenOptions = await getMediaPackagesDialog();
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

    async subscribeMediaPackageCode() {
      this.isLoading = true;

      let formData = objectToFormData(this.subscribeInMediaPackage);
      try {
        const response = await apiMediaPackageCode.subscribe(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-SubscribeInMediaPackage");
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
          this.showMsg(response.data.msg);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },

    response(data) {
      this.$emit("refresh");
      switch (data) {
        case "yes":
          this.subscribeInMediaPackage.setInitialValue();
          break;
        case "leave":
          this.subscribeInMediaPackage.setInitialValue();
          this.closeBottomSheet("SubscribeInMediaPackage");
          break;
      }
    },
  },
  created() {
    this.getEducationalGroupsDialog();
    this.getEducationalGroupStudentsDialog();
    // this.getStudentsDialog();
    this.getMediaPackagesDialog();
    this.getAccountsDialog();
    this.getPaymentMethodsDialog();
  },
};
</script>
