<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="SystemComponentsHierarchyUpdate"
      size="xl"
      :headerText="$t('SystemComponentsHierarchies.edit')"
      :headerIcon="systemComponentsHierarchy.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <SystemComponentsHierarchyForm
        v-if="!isLoading"
        id="update"
        :systemComponentsHierarchy="systemComponentsHierarchy"
        :systemTypeToken="systemTypeToken"
        :modelName="modelName"
        v-on:submitForm="updateSystemComponentsHierarchy()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="SystemComponentsHierarchyUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import GeneralDelete from "./../../../../models/general/GeneralDelete";
import SystemComponentsHierarchyForm from "./SystemComponentsHierarchyForm.vue";

import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";

import apiSystemComponentsHierarchy from "./../../../../api/systemComponentsHierarchy";

import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    SystemComponentsHierarchyForm,
  },
  props: ["systemComponentsHierarchy", "systemTypeToken", "modelName"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateSystemComponentsHierarchy() {
      this.isLoading = true;
      let formData = objectToFormData(this.systemComponentsHierarchy);
      try {
        const response = await apiSystemComponentsHierarchy.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("SystemComponentsHierarchyUpdate");
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
          token: this.systemComponentsHierarchy.systemComponentsHierarchyToken,
          // systemTypeToken: this.systemComponentsHierarchy.systemTypeToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiSystemComponentsHierarchy.deleteImage(
          formData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.systemComponentsHierarchy.systemComponentsHierarchyImagePath =
            "";
          this.systemComponentsHierarchy.systemComponentsHierarchyImageIsDefault = true;
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
