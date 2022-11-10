<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(discussion, index) in discussionsData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="discussion.discussionTitleCurrent"
      :description="discussion.fullCode"
      :imagePath="discussion.discussionMediaPath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li v-if="checkPrivilege(hasDiscussionComment())">
        <router-link
          :to="{
            name: 'DiscussionComments',
            params: {
              educationalGroupToken: filterData.educationalGroupToken,
              discussionToken: discussion.discussionToken,
              parentDiscussionCommentToken: '',
            },
          }"
          :title="$t('DiscussionComments.modelName')"
        >
          <img src="@/assets/images/discussionComments.svg" />
        </router-link>
      </li>
      <li>
        <button
          :title="$t('info')"
          @click="
            setDiscussionData(discussion);
            openBottomSheet('DiscussionInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setDiscussionData(discussion);
            openBottomSheet('DiscussionQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasDiscussionEdit())">
        <button
          @click="
            setDiscussionData(discussion);
            openBottomSheet('DiscussionUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasDiscussionFinaleDelete())">
        <button
          v-b-modal.DiscussionDelete
          :title="$t('delete')"
          @click="setDiscussionData(discussion)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasDiscussionChangeActivationType())">
        <button
          v-b-modal.DiscussionChangeActivationType
          :title="$t('changeActivationType')"
          @click="setDiscussionData(discussion)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasDiscussionChangeClosedState())">
        <button
          v-b-modal.DiscussionChangeCloseState
          :title="$t('Discussions.changeClosedState')"
          @click="setDiscussionData(discussion)"
        >
          <img src="@/assets/images/type.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setDiscussionData(discussion);
            openBottomSheet('ActionsData');
          "
          :title="$t('actionsData.modelName')"
        >
          <img src="@/assets/images/actions-data.svg" />
        </button>
      </li>
    </CustomCard>
  </div>
</template>

<script>
import {
  checkPrivilege,
  isDataExist,
  fullPathFileFromServer,
} from "./../../../../utils/functions";
import {
  hasDiscussionComment,
  hasDiscussionEdit,
  hasDiscussionFinaleDelete,
  hasDiscussionChangeActivationType,
  hasDiscussionChangeClosedState,
} from "./../../../../utils/privilegeHelper";
import CustomCard from "./../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["discussionsData", "filterData", "defaultImg"],
  methods: {
    setDiscussionData(discussion) {
      this.$emit("setDiscussionData", discussion);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasDiscussionComment,
    hasDiscussionEdit,
    hasDiscussionFinaleDelete,
    hasDiscussionChangeActivationType,
    hasDiscussionChangeClosedState,
  },
};
</script>
