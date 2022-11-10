<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="SharedMediaUpdate"
      size="xl"
      :headerText="$t('SharedMedias.edit')"
      :headerIcon="sharedMedia.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <SharedMediaForm
        v-if="!isLoading"
        id="update"
        :sharedMedia="sharedMedia"
        v-on:submitForm="updateSharedMedia()"
        :deleteFileStatus="false"
        bottomSheetName="SharedMediaUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../components/general/CustomBottomSheet.vue";
import SharedMediaForm from "./SharedMediaForm.vue";
import { STATUS } from "./../../../utils/constants";
import { objectToFormData } from "./../../../utils/functions";
import GeneralDelete from "./../../../models/general/GeneralDelete";
import apiSharedMedia from "./../../../api/sharedMedia";
import generalMixin from "./../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    SharedMediaForm,
  },
  props: ["sharedMedia"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateSharedMedia() {
      this.isLoading = true;
      let formData = objectToFormData(this.sharedMedia);
      try {
        const response = await apiSharedMedia.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("SharedMediaUpdate");
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
