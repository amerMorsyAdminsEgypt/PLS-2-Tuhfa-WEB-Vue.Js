<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="InjuryTypeUpdate"
      size="xl"
      :headerText="$t('InjuryTypes.edit')"
      :headerIcon="injuryType.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <InjuryTypeForm
        v-if="!isLoading"
        id="update"
        :injuryType="injuryType"
        v-on:submitForm="updateInjuryType()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="InjuryTypeUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import InjuryTypeForm from "./InjuryTypeForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import GeneralDelete from "./../../../../../models/general/GeneralDelete";
import apiInjuryType from "./../../../../../api/settings/settingsOthers/injuryTypes";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    InjuryTypeForm,
  },
  props: ["injuryType"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateInjuryType() {
      this.isLoading = true;
      let formData = objectToFormData(this.injuryType);
      try {
        const response = await apiInjuryType.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("InjuryTypeUpdate");
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
          token: this.injuryType.injuryTypeToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiInjuryType.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.injuryType.injuryTypeImagePath = "";
          this.injuryType.injuryTypeImageIsDefault = true;
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
