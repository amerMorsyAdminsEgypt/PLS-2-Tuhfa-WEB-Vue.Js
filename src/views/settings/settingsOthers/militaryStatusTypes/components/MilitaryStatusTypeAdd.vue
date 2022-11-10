<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="MilitaryStatusTypeAdd"
      size="xl"
      :headerText="$t('MilitaryStatusTypes.add')"
      :headerIcon="militaryStatusType.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="militaryStatusType.setInitialValue()"
    >
      <MilitaryStatusTypeForm
        v-if="!isLoading"
        id="add"
        :militaryStatusType="militaryStatusType"
        v-on:submitForm="addMilitaryStatusType()"
        bottomSheetName="MilitaryStatusTypeAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="MilitaryStatusTypeAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../../components/general/ConfirmClearData.vue";
import MilitaryStatusTypeForm from "./MilitaryStatusTypeForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import apiMilitaryStatusType from "./../../../../../api/settings/settingsOthers/militaryStatusTypes";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    MilitaryStatusTypeForm,
  },
  props: ["militaryStatusType"],
  methods: {
    async addMilitaryStatusType() {
      this.isLoading = true;
      let formData = objectToFormData(this.militaryStatusType);
      try {
        const response = await apiMilitaryStatusType.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-MilitaryStatusTypeAdd");
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
          this.militaryStatusType.setInitialValue();
          break;
        case "leave":
          this.militaryStatusType.setInitialValue();
          this.closeBottomSheet("MilitaryStatusTypeAdd");
          break;
      }
    },
  },
};
</script>
