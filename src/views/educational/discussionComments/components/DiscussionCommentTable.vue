<template>
  <div v-if="discussionCommentsData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="7">{{ $t("DiscussionComments.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("description") }}</th>
          <th>{{ $t("DiscussionComments.totalCommentReactsCount") }}</th>
          <th>{{ $t("DiscussionComments.totalLikesCount") }}</th>
          <th>{{ $t("DiscussionComments.totalDisLikesCount") }}</th>
          <th>{{ $t("DiscussionComments.totalRepliesCount") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(discussionComment, index) in discussionCommentsData"
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  discussionComment.discussionCommentMediaPath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(discussionComment.fullCode) }}</td>
          <td>
            {{
              isDataExist(discussionComment.discussionCommentDescriptionCurrent)
            }}
          </td>

          <td>
            {{ isDataExist(discussionComment.totalCommentReactsCount) }}
          </td>
          <td>
            {{ isDataExist(discussionComment.totalLikesCount) }}
          </td>
          <td>
            {{ isDataExist(discussionComment.totalDisLikesCount) }}
          </td>
          <td>
            {{ isDataExist(discussionComment.totalRepliesCount) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setDiscussionCommentData(discussionComment);
                    openBottomSheet('DiscussionCommentInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setDiscussionCommentData(discussionComment);
                    openBottomSheet('DiscussionCommentQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasDiscussionCommentEdit())">
                <button
                  @click="
                    setDiscussionCommentData(discussionComment);
                    openBottomSheet('DiscussionCommentUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasDiscussionCommentFinaleDelete())">
                <button
                  v-b-modal.DiscussionCommentDelete
                  :title="$t('delete')"
                  @click="setDiscussionCommentData(discussionComment)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li
                v-if="
                  checkPrivilege(hasDiscussionCommentChangeActivationType())
                "
              >
                <button
                  v-b-modal.DiscussionCommentChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setDiscussionCommentData(discussionComment)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>

              <li>
                <button
                  @click="
                    setDiscussionCommentData(discussionComment);
                    openBottomSheet('ActionsData');
                  "
                  :title="$t('actionsData.modelName')"
                >
                  <img src="@/assets/images/actions-data.svg" />
                </button>
              </li>
            </FloatingMenu>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {
  checkPrivilege,
  isDataExist,
  fullPathFileFromServer,
} from "./../../../../utils/functions";
import {
  hasDiscussionCommentEdit,
  hasDiscussionCommentFinaleDelete,
  hasDiscussionCommentChangeActivationType,
} from "./../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "DiscussionCommentsTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["discussionCommentsData", "filterData", "defaultImg"],
  methods: {
    setDiscussionCommentData(discussionComment) {
      this.$emit("setDiscussionCommentData", discussionComment);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasDiscussionCommentEdit,
    hasDiscussionCommentFinaleDelete,
    hasDiscussionCommentChangeActivationType,
  },
};
</script>
