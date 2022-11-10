<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="StorageSpaceMediaAdd"
      size="xl"
      :headerText="$t('StorageSpaces.media.add')"
      :headerIcon="storageSpaceMedia.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="storageSpaceMedia.setInitialValue(mainToken)"
    >
      <StorageSpaceMediaForm
        v-if="!isLoading"
        id="add"
        :storageSpaceMedia="storageSpaceMedia"
        v-on:submitForm="addStorageSpaceMedia()"
        bottomSheetName="StorageSpaceMediaAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="StorageSpaceMediaAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../components/general/ConfirmClearData.vue";
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
    ConfirmClearData,
    StorageSpaceMediaForm,
  },
  // data() {
  //   return {};
  // },
  props: ["storageSpaceMedia", "mainToken"],
  methods: {
    async addStorageSpaceMedia() {
      this.isLoading = true;
      this.storageSpaceMedia.storageSpaceMediaTypeToken =
        this.$route.meta.storageSpaceMediaTypeToken;
      this.storageSpaceMedia.storageSpaceToken =
        this.$route.params.storageSpaceToken;
      let formData = objectToFormData(this.storageSpaceMedia);
      try {
        const response = await apiStorageSpaceMedia.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-StorageSpaceMediaAdd");
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
    response(data) {
      this.$emit("refresh");
      switch (data) {
        case "yes":
          this.storageSpaceMedia.setInitialValue();
          break;
        case "leave":
          this.storageSpaceMedia.setInitialValue();
          this.closeBottomSheet("StorageSpaceMediaAdd");
          break;
      }
    },
  },
};
</script>
