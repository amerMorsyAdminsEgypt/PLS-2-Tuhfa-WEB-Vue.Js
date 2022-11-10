<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="CountedServiceUpdate"
      size="xl"
      :headerText="$t('CountedServices.edit')"
      :headerIcon="countedService.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <CountedServiceForm
        v-if="!isLoading"
        id="update"
        :countedService="countedService"
        v-on:submitForm="updateCountedService()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="CountedServiceUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../components/general/CustomBottomSheet.vue";
import CountedServiceForm from "./CountedServiceForm.vue";
import { STATUS } from "./../../../utils/constants";
import { objectToFormData } from "./../../../utils/functions";
import GeneralDelete from "./../../../models/general/GeneralDelete";
import apiCountedService from "./../../../api/countedService";
import generalMixin from "./../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    CountedServiceForm,
  },
  props: ["countedService"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateCountedService() {
      this.isLoading = true;
      let formData = objectToFormData(this.countedService);
      try {
        const response = await apiCountedService.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("CountedServiceUpdate");
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
          token: this.countedService.countedServiceToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiCountedService.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.countedService.countedServiceImagePath = "";
          this.countedService.countedServiceImageIsDefault = true;
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
