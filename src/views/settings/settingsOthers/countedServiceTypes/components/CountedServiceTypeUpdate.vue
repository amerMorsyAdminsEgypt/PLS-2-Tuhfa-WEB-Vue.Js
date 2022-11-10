<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="CountedServiceTypeUpdate"
      size="xl"
      :headerText="$t('CountedServiceTypes.edit')"
      :headerIcon="countedServiceType.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <CountedServiceTypeForm
        v-if="!isLoading"
        id="update"
        :countedServiceType="countedServiceType"
        v-on:submitForm="updateCountedServiceType()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="CountedServiceTypeUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import CountedServiceTypeForm from "./CountedServiceTypeForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import GeneralDelete from "./../../../../../models/general/GeneralDelete";
import apiCountedServiceType from "./../../../../../api/settings/settingsOthers/countedServiceTypes";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    CountedServiceTypeForm,
  },
  props: ["countedServiceType"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateCountedServiceType() {
      this.isLoading = true;
      let formData = objectToFormData(this.countedServiceType);
      try {
        const response = await apiCountedServiceType.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("CountedServiceTypeUpdate");
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
          token: this.countedServiceType.countedServiceTypeToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiCountedServiceType.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.countedServiceType.countedServiceTypeImagePath = "";
          this.countedServiceType.countedServiceTypeImageIsDefault = true;
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
