<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="StorageSpaceMediaUpdate"
      size="xl"
      :headerText="$t('StorageSpaces.media.edit')"
      :headerIcon="storageSpaceMedia.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <StorageSpaceMediaForm
        v-if="!isLoading"
        id="update"
        :storageSpaceMedia="storageSpaceMedia"
        v-on:submitForm="updateStorageSpaceMedia()"
        bottomSheetName="StorageSpaceMediaUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../components/general/CustomBottomSheet.vue";
import StorageSpaceMediaForm from "./StorageSpaceMediaForm.vue";
import { STATUS } from "./../../../utils/constants";
import { objectToFormData } from "./../../../utils/functions";
import apiStorageSpaceMedia from "./../../../api/storageSpaceMedia";
import generalMixin from "./../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    StorageSpaceMediaForm,
  },
  props: ["storageSpaceMedia"],
  methods: {
    async updateStorageSpaceMedia() {
      this.isLoading = true;
      let formData = objectToFormData(this.storageSpaceMedia);
      try {
        const response = await apiStorageSpaceMedia.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("StorageSpaceMediaUpdate");
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
  },
};
</script>
