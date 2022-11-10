<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="BloodTypeUpdate"
      size="xl"
      :headerText="$t('BloodTypes.edit')"
      :headerIcon="bloodType.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <BloodTypeForm
        v-if="!isLoading"
        id="update"
        :bloodType="bloodType"
        v-on:submitForm="updateBloodType()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="BloodTypeUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import BloodTypeForm from "./BloodTypeForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import GeneralDelete from "./../../../../../models/general/GeneralDelete";
import apiBloodType from "./../../../../../api/settings/settingsOthers/bloodTypes";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    BloodTypeForm,
  },
  props: ["bloodType"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateBloodType() {
      this.isLoading = true;
      let formData = objectToFormData(this.bloodType);
      try {
        const response = await apiBloodType.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("BloodTypeUpdate");
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
          token: this.bloodType.bloodTypeToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiBloodType.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.bloodType.bloodTypeImagePath = "";
          this.bloodType.bloodTypeImageIsDefault = true;
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
