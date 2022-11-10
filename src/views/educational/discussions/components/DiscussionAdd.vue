<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="DiscussionAdd"
      size="xl"
      :headerText="$t('Discussions.add')"
      :headerIcon="discussion.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="discussion.setInitialValue()"
    >
      <DiscussionForm
        v-if="!isLoading"
        id="add"
        :discussion="discussion"
        v-on:submitForm="addDiscussion()"
        bottomSheetName="DiscussionAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="DiscussionAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import DiscussionForm from "./DiscussionForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import apiDiscussion from "./../../../../api/educational/discussions";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    DiscussionForm,
  },
  props: ["discussion", "discussionTypeToken", "mainToken"],
  methods: {
    async addDiscussion() {
      this.isLoading = true;
      this.discussion.discussionTypeToken = this.discussionTypeToken;
      this.discussion.mainToken = this.mainToken;
      // console.log(this.discussion);
      let formData = objectToFormData(this.discussion);
      try {
        const response = await apiDiscussion.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-DiscussionAdd");
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
          this.discussion.setInitialValue();
          break;
        case "leave":
          this.discussion.setInitialValue();
          this.closeBottomSheet("DiscussionAdd");
          break;
      }
    },
  },
};
</script>
