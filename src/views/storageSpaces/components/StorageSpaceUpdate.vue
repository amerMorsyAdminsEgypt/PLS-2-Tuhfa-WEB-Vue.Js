<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="StorageSpaceUpdate"
      size="xl"
      :headerText="$t('StorageSpaces.edit')"
      :headerIcon="storageSpace.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <StorageSpaceForm
        v-if="!isLoading"
        id="update"
        :storageSpace="storageSpace"
        v-on:submitForm="updateStorageSpace()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="StorageSpaceUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../components/general/CustomBottomSheet.vue";
import StorageSpaceForm from "./StorageSpaceForm.vue";
import { STATUS } from "./../../../utils/constants";
import { objectToFormData } from "./../../../utils/functions";
import StorageSpaceDelete from "./../../../models/storageSpaces/StorageSpaceDelete";
import apiStorageSpace from "./../../../api/storageSpace";
import generalMixin from "./../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    StorageSpaceForm,
  },
  props: ["storageSpace"],
  data() {
    return {
      model: new StorageSpaceDelete(),
    };
  },
  methods: {
    async updateStorageSpace() {
      this.isLoading = true;
      let formData = objectToFormData(this.storageSpace);
      try {
        const response = await apiStorageSpace.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("StorageSpaceUpdate");
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
          token: this.storageSpace.storageSpaceToken,
          storageSpaceTypeToken: this.storageSpace.storageSpaceTypeToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiStorageSpace.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.storageSpace.storageSpaceImagePath = "";
          this.storageSpace.storageSpaceImageIsDefault = true;
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
