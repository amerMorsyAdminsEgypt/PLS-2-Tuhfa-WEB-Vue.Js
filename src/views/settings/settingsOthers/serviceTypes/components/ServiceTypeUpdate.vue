<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="ServiceTypeUpdate"
      size="xl"
      :headerText="$t('ServiceTypes.edit')"
      :headerIcon="serviceType.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <ServiceTypeForm
        v-if="!isLoading"
        id="update"
        :serviceType="serviceType"
        v-on:submitForm="updateServiceType()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="ServiceTypeUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ServiceTypeForm from "./ServiceTypeForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import GeneralDelete from "./../../../../../models/general/GeneralDelete";
import apiServiceType from "./../../../../../api/settings/settingsOthers/serviceTypes";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ServiceTypeForm,
  },
  props: ["serviceType"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateServiceType() {
      this.isLoading = true;
      let formData = objectToFormData(this.serviceType);
      try {
        const response = await apiServiceType.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("ServiceTypeUpdate");
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
          token: this.serviceType.serviceTypeToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiServiceType.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.serviceType.serviceTypeImagePath = "";
          this.serviceType.serviceTypeImageIsDefault = true;
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
