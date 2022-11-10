<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="GeographicalDistributionUpdate"
      size="xl"
      :headerText="$t('GeographicalDistributions.edit')"
      :headerIcon="geographicalDistribution.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <GeographicalDistributionForm
        v-if="!isLoading"
        id="update"
        :geographicalDistribution="geographicalDistribution"
        v-on:submitForm="updateGeographicalDistribution()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="GeographicalDistributionUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import GeographicalDistributionForm from "./GeographicalDistributionForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import GeneralDelete from "./../../../../../models/general/GeneralDelete";
import apiGeographicalDistribution from "./../../../../../api/settings/settingsOthers/geographicalDistributions";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    GeographicalDistributionForm,
  },
  props: ["geographicalDistribution"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateGeographicalDistribution() {
      this.isLoading = true;
      let formData = objectToFormData(this.geographicalDistribution);
      try {
        const response = await apiGeographicalDistribution.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("GeographicalDistributionUpdate");
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
          token: this.geographicalDistribution.geographicalDistributionToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiGeographicalDistribution.deleteImage(
          formData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.geographicalDistribution.geographicalDistributionImagePath = "";
          this.geographicalDistribution.geographicalDistributionImageIsDefault = true;
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
