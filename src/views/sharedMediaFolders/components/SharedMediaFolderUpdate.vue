<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="SharedMediaFolderUpdate"
      size="xl"
      :headerText="$t('SharedMediaFolders.edit')"
      :headerIcon="sharedMediaFolder.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <SharedMediaFolderForm
        v-if="!isLoading"
        id="update"
        :sharedMediaFolder="sharedMediaFolder"
        v-on:submitForm="updateSharedMediaFolder()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="SharedMediaFolderUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../components/general/CustomBottomSheet.vue";
import SharedMediaFolderForm from "./SharedMediaFolderForm.vue";
import { STATUS } from "./../../../utils/constants";
import { objectToFormData } from "./../../../utils/functions";
import GeneralDelete from "./../../../models/general/GeneralDelete";
import apiSharedMediaFolder from "./../../../api/sharedMediaFolder";
import generalMixin from "./../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    SharedMediaFolderForm,
  },
  props: ["sharedMediaFolder"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateSharedMediaFolder() {
      this.isLoading = true;
      let formData = objectToFormData(this.sharedMediaFolder);
      try {
        const response = await apiSharedMediaFolder.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("SharedMediaFolderUpdate");
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
          token: this.sharedMediaFolder.sharedMediaFolderToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiSharedMediaFolder.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.sharedMediaFolder.sharedMediaFolderImagePath = "";
          this.sharedMediaFolder.sharedMediaFolderImageIsDefault = true;
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
