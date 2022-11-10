<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="CommunicationTypeAdd"
      size="xl"
      :headerText="$t('CommunicationTypes.add')"
      :headerIcon="communicationType.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="communicationType.setInitialValue()"
    >
      <CommunicationTypeForm
        v-if="!isLoading"
        id="add"
        :communicationType="communicationType"
        v-on:submitForm="addCommunicationType()"
        bottomSheetName="CommunicationTypeAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="CommunicationTypeAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../../components/general/ConfirmClearData.vue";
import CommunicationTypeForm from "./CommunicationTypeForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import apiCommunicationType from "./../../../../../api/settings/settingsOthers/communicationTypes";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    CommunicationTypeForm,
  },
  props: ["communicationType"],
  methods: {
    async addCommunicationType() {
      this.isLoading = true;
      let formData = objectToFormData(this.communicationType);
      try {
        const response = await apiCommunicationType.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-CommunicationTypeAdd");
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
          this.communicationType.setInitialValue();
          break;
        case "leave":
          this.communicationType.setInitialValue();
          this.closeBottomSheet("CommunicationTypeAdd");
          break;
      }
    },
  },
};
</script>
