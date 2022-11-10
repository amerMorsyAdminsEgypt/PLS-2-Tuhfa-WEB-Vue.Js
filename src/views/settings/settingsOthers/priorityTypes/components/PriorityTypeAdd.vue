<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="PriorityTypeAdd"
      size="xl"
      :headerText="$t('PriorityTypes.add')"
      :headerIcon="priorityType.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="priorityType.setInitialValue()"
    >
      <PriorityTypeForm
        v-if="!isLoading"
        id="add"
        :priorityType="priorityType"
        v-on:submitForm="addPriorityType()"
        bottomSheetName="PriorityTypeAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="PriorityTypeAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../../components/general/ConfirmClearData.vue";
import PriorityTypeForm from "./PriorityTypeForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import apiPriorityType from "./../../../../../api/settings/settingsOthers/priorityTypes";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    PriorityTypeForm,
  },
  props: ["priorityType"],
  methods: {
    async addPriorityType() {
      this.isLoading = true;
      let formData = objectToFormData(this.priorityType);
      try {
        const response = await apiPriorityType.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-PriorityTypeAdd");
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
          this.priorityType.setInitialValue();
          break;
        case "leave":
          this.priorityType.setInitialValue();
          this.closeBottomSheet("PriorityTypeAdd");
          break;
      }
    },
  },
};
</script>
