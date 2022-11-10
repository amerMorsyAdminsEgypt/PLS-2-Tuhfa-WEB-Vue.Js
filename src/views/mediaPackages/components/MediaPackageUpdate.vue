<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="MediaPackageUpdate"
      size="xl"
      :headerText="$t('MediaPackages.edit')"
      :headerIcon="mediaPackage.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="getDetails()"
    >
      <MediaPackageForm
        v-if="!isLoading"
        id="update"
        :mediaPackage="mediaPackage"
        v-on:submitForm="updateMediaPackage()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="MediaPackageUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../components/general/CustomBottomSheet.vue";
import MediaPackageForm from "./MediaPackageForm.vue";
import { STATUS } from "./../../../utils/constants";
import { objectToFormData } from "./../../../utils/functions";
import GeneralDelete from "./../../../models/general/GeneralDelete";
import apiMediaPackage from "./../../../api/mediaPackage";
import MediaPackage from "./../../../models/mediaPackages/MediaPackage";
import generalMixin from "./../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    MediaPackageForm,
  },
  props: ["mediaPackageToken"],
  data() {
    return {
      model: new GeneralDelete(),
      mediaPackage: new MediaPackage(),
    };
  },
  methods: {
    async getDetails() {
      this.isLoading = true;
      try {
        let filter = { token: this.mediaPackageToken };
        this.mediaPackage.setInitialValue();
        const response = await apiMediaPackage.getDetails(filter);
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
        } else if (response.data.status == STATUS.NO_INTERNET) {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = "illustrator-noInternet.svg";
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = "illustrator-noData.svg";
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = null;
        }
        this.mediaPackage.fillData(response.data.mediaPackage);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },

    async updateMediaPackage() {
      this.isLoading = true;
      let formData = objectToFormData(this.mediaPackage);
      try {
        const response = await apiMediaPackage.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("MediaPackageUpdate");
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
          token: this.mediaPackage.mediaPackageToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiMediaPackage.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.mediaPackage.mediaPackageImagePath = "";
          this.mediaPackage.mediaPackageImageIsDefault = true;
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
