<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="SharedMediaAdd"
      size="xl"
      :headerText="$t('SharedMedias.add')"
      :headerIcon="sharedMedia.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="sharedMedia.setInitialValue()"
    >
      <SharedMediaForm
        v-if="!isLoading"
        id="add"
        :sharedMedia="sharedMedia"
        v-on:submitForm="addSharedMedia()"
        bottomSheetName="SharedMediaAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="SharedMediaAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../components/general/ConfirmClearData.vue";
import SharedMediaForm from "./SharedMediaForm.vue";
import { STATUS } from "./../../../utils/constants";
import { objectToFormData } from "./../../../utils/functions";
import apiSharedMedia from "./../../../api/sharedMedia";
import generalMixin from "./../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    SharedMediaForm,
  },
  props: ["sharedMedia", "sharedMediaFolderToken"],
  methods: {
    async addSharedMedia() {
      this.isLoading = true;
      this.sharedMedia.sharedMediaFolderToken = this.sharedMediaFolderToken;
      let formData = objectToFormData(this.sharedMedia);
      try {
        const response = await apiSharedMedia.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-SharedMediaAdd");
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
          this.sharedMedia.setInitialValue();
          break;
        case "leave":
          this.sharedMedia.setInitialValue();
          this.closeBottomSheet("SharedMediaAdd");
          break;
      }
    },
  },
};
</script>
