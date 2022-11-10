<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="InsuranceCompanyAdd"
      size="xl"
      :headerText="$t('InsuranceCompanies.add')"
      :headerIcon="insuranceCompany.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="insuranceCompany.setInitialValue()"
    >
      <InsuranceCompanyForm
        v-if="!isLoading"
        id="add"
        :insuranceCompany="insuranceCompany"
        v-on:submitForm="addInsuranceCompany()"
        bottomSheetName="InsuranceCompanyAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="InsuranceCompanyAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../../components/general/ConfirmClearData.vue";
import InsuranceCompanyForm from "./InsuranceCompanyForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import apiInsuranceCompany from "./../../../../../api/settings/settingsOthers/insuranceCompanies";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    InsuranceCompanyForm,
  },
  props: ["insuranceCompany"],
  methods: {
    async addInsuranceCompany() {
      this.isLoading = true;
      let formData = objectToFormData(this.insuranceCompany);
      try {
        const response = await apiInsuranceCompany.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-InsuranceCompanyAdd");
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
          this.insuranceCompany.setInitialValue();
          break;
        case "leave":
          this.insuranceCompany.setInitialValue();
          this.closeBottomSheet("InsuranceCompanyAdd");
          break;
      }
    },
  },
};
</script>
