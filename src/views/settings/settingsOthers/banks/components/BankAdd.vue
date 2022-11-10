<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="BankAdd"
      size="xl"
      :headerText="$t('Banks.add')"
      :headerIcon="bank.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="bank.setInitialValue()"
    >
      <BankForm
        v-if="!isLoading"
        id="add"
        :bank="bank"
        v-on:submitForm="addBank()"
        bottomSheetName="BankAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData dialogName="BankAdd" v-on:response="response($event)" />
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../../components/general/ConfirmClearData.vue";
import BankForm from "./BankForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import apiBank from "./../../../../../api/settings/settingsOthers/banks";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    BankForm,
  },
  props: ["bank"],
  methods: {
    async addBank() {
      this.isLoading = true;
      let formData = objectToFormData(this.bank);
      try {
        const response = await apiBank.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-BankAdd");
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
          this.bank.setInitialValue();
          break;
        case "leave":
          this.bank.setInitialValue();
          this.closeBottomSheet("BankAdd");
          break;
      }
    },
  },
};
</script>
