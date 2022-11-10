<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="SystemComponentAdd"
      size="xl"
      :headerText="$t('SystemComponents.add')"
      :headerIcon="systemComponent.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="systemComponent.setInitialValue()"
    >
      <SystemComponentForm
        v-if="!isLoading"
        id="add"
        :systemComponent="systemComponent"
        v-on:submitForm="addSystemComponent()"
        bottomSheetName="SystemComponentAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="SystemComponentAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import SystemComponentForm from "./SystemComponentForm.vue";

import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";

import apiSystemComponent from "./../../../../api/systemComponent";

import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    SystemComponentForm,
  },
  props: ["systemComponent", "systemTypeToken"],
  methods: {
    async addSystemComponent() {
      this.isLoading = true;
      this.systemComponent.systemTypeToken = this.systemTypeToken;
      let formData = objectToFormData(this.systemComponent);
      try {
        const response = await apiSystemComponent.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-SystemComponentAdd");
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
          this.systemComponent.setInitialValue();
          break;
        case "leave":
          this.systemComponent.setInitialValue();
          this.closeBottomSheet("SystemComponentAdd");
          break;
      }
    },
  },
};
</script>
