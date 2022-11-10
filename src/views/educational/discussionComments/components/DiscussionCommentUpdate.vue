<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="DiscussionCommentUpdate"
      size="xl"
      :headerText="$t('DiscussionComments.edit')"
      :headerIcon="discussionComment.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <DiscussionCommentForm
        v-if="!isLoading"
        id="update"
        :discussionComment="discussionComment"
        v-on:submitForm="updateDiscussionComment()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="DiscussionCommentUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import DiscussionCommentForm from "./DiscussionCommentForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import GeneralDelete from "./../../../../models/general/GeneralDelete";
import apiDiscussionComment from "./../../../../api/educational/discussionComments";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    DiscussionCommentForm,
  },
  props: ["discussionComment"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateDiscussionComment() {
      this.isLoading = true;
      this.discussionComment.userTokens = [
        ...this.discussionComment.lecturerTokens,
        ...this.discussionComment.studentTokens,
      ];
      let formData = objectToFormData(this.discussionComment);
      try {
        const response = await apiDiscussionComment.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("DiscussionCommentUpdate");
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
          token: this.discussionComment.discussionCommentToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiDiscussionComment.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.discussionComment.discussionCommentMediaPath = "";
          this.discussionComment.discussionCommentMediaIsDefault = true;
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
