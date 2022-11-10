<template>
  <div v-if="discussionsData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="4">{{ $t("Discussions.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.title") }}</th>
          <th>{{ $t("general.state") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(discussion, index) in discussionsData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  discussion.discussionMediaPath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(discussion.fullCode) }}</td>
          <td>
            {{ isDataExist(discussion.discussionTitleCurrent) }}
          </td>

          <td>
            {{ isDataExist(discussion.discussionClosedStateTypeNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li v-if="checkPrivilege(hasDiscussionComment())">
                <router-link
                  :to="{
                    name: 'DiscussionComments',
                    params: {
                      educationalGroupToken: filterData.educationalGroupToken,
                      discussionToken: discussion.discussionToken,
                      parentDiscussionCommentToken: ' ',
                    },
                  }"
                  :title="$t('DiscussionComments.modelName')"
                >
                  <img src="@/assets/images/discussionComments.svg" />
                </router-link>
              </li>
              <li>
                <button
                  @click="
                    setDiscussionData(discussion);
                    openBottomSheet('DiscussionInfo');
                  "
                  :title="$t('info')"
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
  hasDiscussionComment,
  hasDiscussionEdit,
  hasDiscussionFinaleDelete,
  hasDiscussionChangeActivationType,
  hasDiscussionChangeClosedState,
} from "./../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "DiscussionsTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
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
