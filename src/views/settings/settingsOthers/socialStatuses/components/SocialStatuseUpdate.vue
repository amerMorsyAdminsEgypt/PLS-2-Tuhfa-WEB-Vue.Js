<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="SocialStatuseUpdate"
      size="xl"
      :headerText="$t('SocialStatuses.edit')"
      :headerIcon="socialStatuse.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <SocialStatuseForm
        v-if="!isLoading"
        id="update"
        :socialStatuse="socialStatuse"
        v-on:submitForm="updateSocialStatuse()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="SocialStatuseUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import SocialStatuseForm from "./SocialStatuseForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import GeneralDelete from "./../../../../../models/general/GeneralDelete";
import apiSocialStatuse from "./../../../../../api/settings/settingsOthers/socialStatuses";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    SocialStatuseForm,
  },
  props: ["socialStatuse"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateSocialStatuse() {
      this.isLoading = true;
      let formData = objectToFormData(this.socialStatuse);
      try {
        const response = await apiSocialStatuse.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("SocialStatuseUpdate");
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
          token: this.socialStatuse.socialStatuseToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiSocialStatuse.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.socialStatuse.socialStatuseImagePath = "";
          this.socialStatuse.socialStatuseImageIsDefault = true;
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
