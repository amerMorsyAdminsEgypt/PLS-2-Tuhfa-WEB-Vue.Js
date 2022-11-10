<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="SharedMediaFolderAdd"
      size="xl"
      :headerText="$t('SharedMediaFolders.add')"
      :headerIcon="sharedMediaFolder.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="sharedMediaFolder.setInitialValue()"
    >
      <SharedMediaFolderForm
        v-if="!isLoading"
        id="add"
        :sharedMediaFolder="sharedMediaFolder"
        v-on:submitForm="addSharedMediaFolder()"
        bottomSheetName="SharedMediaFolderAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="SharedMediaFolderAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../components/general/ConfirmClearData.vue";
import SharedMediaFolderForm from "./SharedMediaFolderForm.vue";
import { STATUS } from "./../../../utils/constants";
import { objectToFormData } from "./../../../utils/functions";
import apiSharedMediaFolder from "./../../../api/sharedMediaFolder";
import generalMixin from "./../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    SharedMediaFolderForm,
  },
  props: ["sharedMediaFolder"],
  methods: {
    async addSharedMediaFolder() {
      this.isLoading = true;
      let formData = objectToFormData(this.sharedMediaFolder);
      try {
        const response = await apiSharedMediaFolder.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-SharedMediaFolderAdd");
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
          this.sharedMediaFolder.setInitialValue();
          break;
        case "leave":
          this.sharedMediaFolder.setInitialValue();
          this.closeBottomSheet("SharedMediaFolderAdd");
          break;
      }
    },
  },
};
</script>
