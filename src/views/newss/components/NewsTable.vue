<template>
  <div v-if="newssData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("Newss.data") }}</th>
          <th rowspan="2">{{ $t("NewsCategories.name") }}</th>
          <th rowspan="2">{{ $t("Newss.publisherName") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("Newss.title") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(news, index) in newssData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="getMediaSrc(news)"
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(news.fullCode) }}</td>
          <td>{{ isDataExist(news.newsTitleCurrent) }}</td>
          <td>
            <div
              v-for="(Category, CategoryIndex) in news.newsCategoryInfoData"
              :key="CategoryIndex"
            >
              {{ Category.newsCategoryNameCurrent }}
            </div>
          </td>
          <td>{{ isDataExist(news.publisherNameCurrent) }}</td>

          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setNewsData(news);
                    openBottomSheet('NewsInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setNewsData(news);
                    openBottomSheet('NewsQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasNewsEdit())">
                <button
                  @click="
                    setNewsData(news);
                    openBottomSheet('NewsUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasNewsFinaleDelete())">
                <button
                  v-b-modal.NewsDelete
                  :title="$t('delete')"
                  @click="setNewsData(news)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasNewsChangeActivationType())">
                <button
                  v-b-modal.NewsChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setNewsData(news)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setNewsData(news);
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
} from "./../../../utils/functions";
import {
  hasNewsEdit,
  hasNewsFinaleDelete,
  hasNewsChangeActivationType,
} from "./../../../utils/privilegeHelper";
import FloatingMenu from "./../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../utils/generalMixin";
import { NEWS_MEDIA_TYPES } from "./../../../utils/constants";

export default {
  name: "NewssTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["newssData", "filterData", "defaultImg"],
  methods: {
    getMediaSrc(news) {
      let mediaSrc = "";
      if (news.newsMediaTypeToken == NEWS_MEDIA_TYPES.image) {
        mediaSrc = this.fullPathFileFromServer(
          news.newsMediaPath,
          news.defaultImg
        );
      } else if (news.newsMediaTypeToken == NEWS_MEDIA_TYPES.video) {
        mediaSrc = this.defaultImg;
      }
      return mediaSrc;
    },
    setNewsData(news) {
      this.$emit("setNewsData", news);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasNewsEdit,
    hasNewsFinaleDelete,
    hasNewsChangeActivationType,
  },
};
</script>
