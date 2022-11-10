<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="SystemComponentUpdate"
      size="xl"
      :headerText="$t('SystemComponents.edit')"
      :headerIcon="systemComponent.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <SystemComponentForm
        v-if="!isLoading"
        id="update"
        :systemComponent="systemComponent"
        v-on:submitForm="updateSystemComponent()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="SystemComponentUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import GeneralDelete from "./../../../../models/general/GeneralDelete";
import SystemComponentForm from "./SystemComponentForm.vue";

import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";

import apiSystemComponent from "./../../../../api/systemComponent";

import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    SystemComponentForm,
  },
  props: ["systemComponent", "systemTypeToken"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateSystemComponent() {
      this.isLoading = true;
      let formData = objectToFormData(this.systemComponent);
      try {
        const response = await apiSystemComponent.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("SystemComponentUpdate");
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
          token: this.systemComponent.systemComponentToken,
          // systemTypeToken: this.systemComponent.systemTypeToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiSystemComponent.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.systemComponent.systemComponentImagePath = "";
          this.systemComponent.systemComponentImageIsDefault = true;
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
