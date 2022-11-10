<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(news, index) in newssData"
      :key="index"
      :className="'col-sm-12 col-md-6 col-lg-4'"
      :title="news.newsTitleCurrent"
      :description="news.fullCode"
      :imagePath="getMediaSrc(news)"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setNewsData(news);
            openBottomSheet('NewsInfo');
          "
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
    </CustomCard>
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
import CustomCard from "./../../../components/general/CustomCard.vue";
import generalMixin from "./../../../utils/generalMixin";
import { NEWS_MEDIA_TYPES } from "./../../../utils/constants";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["newssData", "filterData", "defaultImg"],
  methods: {
    getMediaSrc(news) {
      let mediaSrc = "";
      if (news.newsMediaTypeToken == NEWS_MEDIA_TYPES.image) {
        mediaSrc = news.newsMediaPath;
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
