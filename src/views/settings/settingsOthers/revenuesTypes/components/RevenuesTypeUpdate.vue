<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="RevenuesTypeUpdate"
      size="xl"
      :headerText="$t('RevenuesTypes.edit')"
      :headerIcon="revenuesType.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <RevenuesTypeForm
        v-if="!isLoading"
        id="update"
        :revenuesType="revenuesType"
        v-on:submitForm="updateRevenuesType()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="RevenuesTypeUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import RevenuesTypeForm from "./RevenuesTypeForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import GeneralDelete from "./../../../../../models/general/GeneralDelete";
import apiRevenuesType from "./../../../../../api/settings/settingsOthers/revenuesTypes";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    RevenuesTypeForm,
  },
  props: ["revenuesType"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateRevenuesType() {
      this.isLoading = true;
      let formData = objectToFormData(this.revenuesType);
      try {
        const response = await apiRevenuesType.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("RevenuesTypeUpdate");
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
          token: this.revenuesType.revenuesTypeToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiRevenuesType.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.revenuesType.revenuesTypeImagePath = "";
          this.revenuesType.revenuesTypeImageIsDefault = true;
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
