<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="GeographicalDistributionAdd"
      size="xl"
      :headerText="$t('GeographicalDistributions.add')"
      :headerIcon="geographicalDistribution.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="geographicalDistribution.setInitialValue()"
    >
      <GeographicalDistributionForm
        v-if="!isLoading"
        id="add"
        :geographicalDistribution="geographicalDistribution"
        v-on:submitForm="addGeographicalDistribution()"
        bottomSheetName="GeographicalDistributionAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="GeographicalDistributionAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../../components/general/ConfirmClearData.vue";
import GeographicalDistributionForm from "./GeographicalDistributionForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import apiGeographicalDistribution from "./../../../../../api/settings/settingsOthers/geographicalDistributions";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    GeographicalDistributionForm,
  },
  props: ["geographicalDistribution"],
  methods: {
    async addGeographicalDistribution() {
      this.isLoading = true;
      let formData = objectToFormData(this.geographicalDistribution);
      try {
        const response = await apiGeographicalDistribution.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-GeographicalDistributionAdd");
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
          this.geographicalDistribution.setInitialValue();
          break;
        case "leave":
          this.geographicalDistribution.setInitialValue();
          this.closeBottomSheet("GeographicalDistributionAdd");
          break;
      }
    },
  },
};
</script>
