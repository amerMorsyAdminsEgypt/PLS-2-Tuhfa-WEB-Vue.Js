<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="DiscussionCommentAdd"
      size="xl"
      :headerText="$t('DiscussionComments.add')"
      :headerIcon="discussionComment.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="discussionComment.setInitialValue()"
    >
      <DiscussionCommentForm
        v-if="!isLoading"
        id="add"
        :discussionComment="discussionComment"
        :educationalGroupToken="filterData.educationalGroupToken"
        v-on:submitForm="addDiscussionComment()"
        bottomSheetName="DiscussionCommentAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="DiscussionCommentAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import DiscussionCommentForm from "./DiscussionCommentForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import apiDiscussionComment from "./../../../../api/educational/discussionComments";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    DiscussionCommentForm,
  },
  props: ["discussionComment", "filterData"],
  methods: {
    async addDiscussionComment() {
      this.isLoading = true;
      this.discussionComment.userTokens = [
        ...this.discussionComment.lecturerTokens,
        ...this.discussionComment.studentTokens,
      ];
      this.discussionComment.discussionToken = this.filterData.discussionToken;
      this.discussionComment.parentDiscussionCommentToken =
        this.filterData.parentDiscussionCommentToken;
      let formData = objectToFormData(this.discussionComment);
      try {
        const response = await apiDiscussionComment.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-DiscussionCommentAdd");
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
          this.discussionComment.setInitialValue();
          break;
        case "leave":
          this.discussionComment.setInitialValue();
          this.closeBottomSheet("DiscussionCommentAdd");
          break;
      }
    },
  },
};
</script>
