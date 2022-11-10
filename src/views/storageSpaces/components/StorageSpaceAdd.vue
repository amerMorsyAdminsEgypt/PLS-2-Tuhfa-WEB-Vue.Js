<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="StorageSpaceAdd"
      size="xl"
      :headerText="$t('StorageSpaces.add')"
      :headerIcon="storageSpace.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="storageSpace.setInitialValue(mainToken)"
    >
      <StorageSpaceForm
        v-if="!isLoading"
        id="add"
        :storageSpace="storageSpace"
        v-on:submitForm="addStorageSpace()"
        bottomSheetName="StorageSpaceAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="StorageSpaceAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../components/general/ConfirmClearData.vue";
import StorageSpaceForm from "./StorageSpaceForm.vue";
import { STATUS } from "./../../../utils/constants";
import { objectToFormData } from "./../../../utils/functions";
import apiStorageSpace from "./../../../api/storageSpace";
import generalMixin from "./../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    StorageSpaceForm,
  },
  // data() {
  //   return {};
  // },
  props: ["storageSpace", "mainToken"],
  methods: {
    async addStorageSpace() {
      this.isLoading = true;
      this.storageSpace.storageSpaceTypeToken =
        this.$route.meta.storageSpaceTypeToken;
      let formData = objectToFormData(this.storageSpace);
      try {
        const response = await apiStorageSpace.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-StorageSpaceAdd");
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
          this.storageSpace.setInitialValue();
          break;
        case "leave":
          this.storageSpace.setInitialValue();
          this.closeBottomSheet("StorageSpaceAdd");
          break;
      }
    },
  },
};
</script>
