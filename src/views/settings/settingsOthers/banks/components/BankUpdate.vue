<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="BankUpdate"
      size="xl"
      :headerText="$t('Banks.edit')"
      :headerIcon="bank.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <BankForm
        v-if="!isLoading"
        id="update"
        :bank="bank"
        v-on:submitForm="updateBank()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="BankUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import BankForm from "./BankForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import GeneralDelete from "./../../../../../models/general/GeneralDelete";
import apiBank from "./../../../../../api/settings/settingsOthers/banks";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    BankForm,
  },
  props: ["bank"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateBank() {
      this.isLoading = true;
      let formData = objectToFormData(this.bank);
      try {
        const response = await apiBank.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("BankUpdate");
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
          token: this.bank.bankToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiBank.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.bank.bankImagePath = "";
          this.bank.bankImageIsDefault = true;
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
