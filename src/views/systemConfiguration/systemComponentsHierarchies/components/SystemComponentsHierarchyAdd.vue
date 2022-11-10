<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="SystemComponentsHierarchyAdd"
      size="xl"
      :headerText="$t('SystemComponentsHierarchies.add')"
      :headerIcon="systemComponentsHierarchy.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="systemComponentsHierarchy.setInitialValue()"
    >
      <SystemComponentsHierarchyForm
        v-if="!isLoading"
        id="add"
        :systemComponentsHierarchy="systemComponentsHierarchy"
        :systemTypeToken="systemTypeToken"
        :modelName="modelName"
        v-on:submitForm="addSystemComponentsHierarchy()"
        bottomSheetName="SystemComponentsHierarchyAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="SystemComponentsHierarchyAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import SystemComponentsHierarchyForm from "./SystemComponentsHierarchyForm.vue";

import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";

import apiSystemComponentsHierarchy from "./../../../../api/systemComponentsHierarchy";

import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    SystemComponentsHierarchyForm,
  },
  props: ["systemComponentsHierarchy", "systemTypeToken", "modelName"],
  methods: {
    async addSystemComponentsHierarchy() {
      this.isLoading = true;
      this.systemComponentsHierarchy.systemTypeToken = this.systemTypeToken;
      let formData = objectToFormData(this.systemComponentsHierarchy);
      try {
        const response = await apiSystemComponentsHierarchy.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-SystemComponentsHierarchyAdd");
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
          this.systemComponentsHierarchy.setInitialValue();
          break;
        case "leave":
          this.systemComponentsHierarchy.setInitialValue();
          this.closeBottomSheet("SystemComponentsHierarchyAdd");
          break;
      }
    },
  },
};
</script>
