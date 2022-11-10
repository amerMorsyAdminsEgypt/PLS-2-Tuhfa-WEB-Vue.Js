<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="InsuranceCompanyUpdate"
      size="xl"
      :headerText="$t('InsuranceCompanies.edit')"
      :headerIcon="insuranceCompany.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <InsuranceCompanyForm
        v-if="!isLoading"
        id="update"
        :insuranceCompany="insuranceCompany"
        v-on:submitForm="updateInsuranceCompany()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="InsuranceCompanyUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import InsuranceCompanyForm from "./InsuranceCompanyForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import GeneralDelete from "./../../../../../models/general/GeneralDelete";
import apiInsuranceCompany from "./../../../../../api/settings/settingsOthers/insuranceCompanies";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    InsuranceCompanyForm,
  },
  props: ["insuranceCompany"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateInsuranceCompany() {
      this.isLoading = true;
      let formData = objectToFormData(this.insuranceCompany);
      try {
        const response = await apiInsuranceCompany.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("InsuranceCompanyUpdate");
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
          token: this.insuranceCompany.insuranceCompanyToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiInsuranceCompany.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.insuranceCompany.insuranceCompanyImagePath = "";
          this.insuranceCompany.insuranceCompanyImageIsDefault = true;
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
