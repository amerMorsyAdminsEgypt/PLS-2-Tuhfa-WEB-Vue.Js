<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="PriorityTypeUpdate"
      size="xl"
      :headerText="$t('PriorityTypes.edit')"
      :headerIcon="priorityType.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <PriorityTypeForm
        v-if="!isLoading"
        id="update"
        :priorityType="priorityType"
        v-on:submitForm="updatePriorityType()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="PriorityTypeUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import PriorityTypeForm from "./PriorityTypeForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import GeneralDelete from "./../../../../../models/general/GeneralDelete";
import apiPriorityType from "./../../../../../api/settings/settingsOthers/priorityTypes";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    PriorityTypeForm,
  },
  props: ["priorityType"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updatePriorityType() {
      this.isLoading = true;
      let formData = objectToFormData(this.priorityType);
      try {
        const response = await apiPriorityType.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("PriorityTypeUpdate");
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
          token: this.priorityType.priorityTypeToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiPriorityType.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.priorityType.priorityTypeImagePath = "";
          this.priorityType.priorityTypeImageIsDefault = true;
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
