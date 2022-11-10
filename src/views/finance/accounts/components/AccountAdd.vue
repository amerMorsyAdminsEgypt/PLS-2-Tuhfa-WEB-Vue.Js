<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="AccountAdd"
      size="xl"
      :headerText="$t('Accounts.add')"
      :headerIcon="account.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="account.setInitialValue()"
    >
      <AccountForm
        v-if="!isLoading"
        id="add"
        :account="account"
        v-on:submitForm="addAccount()"
        bottomSheetName="AccountAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="AccountAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import AccountForm from "./AccountForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import apiAccount from "./../../../../api/finance/accounts";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    AccountForm,
  },
  props: ["account"],
  methods: {
    async addAccount() {
      this.isLoading = true;
      let formData = objectToFormData(this.account);
      try {
        const response = await apiAccount.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-AccountAdd");
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
          this.account.setInitialValue();
          break;
        case "leave":
          this.account.setInitialValue();
          this.closeBottomSheet("AccountAdd");
          break;
      }
    },
  },
};
</script>
