<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="RelativeRelationTypeUpdate"
      size="xl"
      :headerText="$t('RelativeRelationTypes.edit')"
      :headerIcon="relativeRelationType.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <RelativeRelationTypeForm
        v-if="!isLoading"
        id="update"
        :relativeRelationType="relativeRelationType"
        v-on:submitForm="updateRelativeRelationType()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="RelativeRelationTypeUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import RelativeRelationTypeForm from "./RelativeRelationTypeForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import GeneralDelete from "./../../../../../models/general/GeneralDelete";
import apiRelativeRelationType from "./../../../../../api/settings/settingsOthers/relativeRelationTypes";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    RelativeRelationTypeForm,
  },
  props: ["relativeRelationType"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateRelativeRelationType() {
      this.isLoading = true;
      let formData = objectToFormData(this.relativeRelationType);
      try {
        const response = await apiRelativeRelationType.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("RelativeRelationTypeUpdate");
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
          token: this.relativeRelationType.relativeRelationTypeToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiRelativeRelationType.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.relativeRelationType.relativeRelationTypeImagePath = "";
          this.relativeRelationType.relativeRelationTypeImageIsDefault = true;
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
