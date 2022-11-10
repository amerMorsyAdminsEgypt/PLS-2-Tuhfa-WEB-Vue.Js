<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="MilitaryStatusTypeUpdate"
      size="xl"
      :headerText="$t('MilitaryStatusTypes.edit')"
      :headerIcon="militaryStatusType.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <MilitaryStatusTypeForm
        v-if="!isLoading"
        id="update"
        :militaryStatusType="militaryStatusType"
        v-on:submitForm="updateMilitaryStatusType()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="MilitaryStatusTypeUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import MilitaryStatusTypeForm from "./MilitaryStatusTypeForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import GeneralDelete from "./../../../../../models/general/GeneralDelete";
import apiMilitaryStatusType from "./../../../../../api/settings/settingsOthers/militaryStatusTypes";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    MilitaryStatusTypeForm,
  },
  props: ["militaryStatusType"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateMilitaryStatusType() {
      this.isLoading = true;
      let formData = objectToFormData(this.militaryStatusType);
      try {
        const response = await apiMilitaryStatusType.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("MilitaryStatusTypeUpdate");
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
          token: this.militaryStatusType.militaryStatusTypeToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiMilitaryStatusType.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.militaryStatusType.militaryStatusTypeImagePath = "";
          this.militaryStatusType.militaryStatusTypeImageIsDefault = true;
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
