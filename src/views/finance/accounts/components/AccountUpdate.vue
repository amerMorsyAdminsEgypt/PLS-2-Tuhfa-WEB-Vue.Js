<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="AccountUpdate"
      size="xl"
      :headerText="$t('Accounts.edit')"
      :headerIcon="account.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <AccountForm
        v-if="!isLoading"
        id="update"
        :account="account"
        v-on:submitForm="updateAccount()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="AccountUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import AccountForm from "./AccountForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import GeneralDelete from "./../../../../models/general/GeneralDelete";
import apiAccount from "./../../../../api/finance/accounts";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    AccountForm,
  },
  props: ["account"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateAccount() {
      this.isLoading = true;
      let formData = objectToFormData(this.account);
      try {
        const response = await apiAccount.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("AccountUpdate");
          this.$emit("refresh");
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
    async deleteFile() {
      this.isLoading = true;
      try {
        this.model.fillData({
          token: this.account.accountToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiAccount.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.account.accountImagePath = "";
          this.account.accountImageIsDefault = true;
          this.$emit("refresh");
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
  },
};
</script>
