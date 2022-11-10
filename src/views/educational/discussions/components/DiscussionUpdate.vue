<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="DiscussionUpdate"
      size="xl"
      :headerText="$t('Discussions.edit')"
      :headerIcon="discussion.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <DiscussionForm
        v-if="!isLoading"
        id="update"
        :discussion="discussion"
        v-on:submitForm="updateDiscussion()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="DiscussionUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import DiscussionForm from "./DiscussionForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import GeneralDelete from "./../../../../models/general/GeneralDelete";
import apiDiscussion from "./../../../../api/educational/discussions";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    DiscussionForm,
  },
  props: ["discussion"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateDiscussion() {
      this.isLoading = true;
      let formData = objectToFormData(this.discussion);
      try {
        const response = await apiDiscussion.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("DiscussionUpdate");
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
          token: this.discussion.discussionToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiDiscussion.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.discussion.discussionImagePath = "";
          this.discussion.discussionImageIsDefault = true;
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
