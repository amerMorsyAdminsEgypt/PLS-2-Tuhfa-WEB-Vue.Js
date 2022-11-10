<template>
  <CustomBottomSheet
    :refName="'NewsInfo'"
    size="xl"
    :headerText="$t('Newss.data')"
    :headerIcon="news.icon"
  >
    <div class="container-flud">
      <div class="main-container">
        <div class="img-row">
          <b-img
            v-if="news.newsMediaTypeToken == image"
            :src="fullPathFileFromServer(news.newsMediaPath, news.defaultImg)"
            :onerror="`this.src='${news.defaultImg}'`"
            alt="Image"
            class="news-image"
            ref="img"
          >
          </b-img>
          <video
            v-else-if="news.newsMediaTypeToken == video"
            class="video-container"
            controls
            style="cursor: pointer"
          >
            <source
              :src="fullPathFileFromServer(news.newsMediaPath, news.defaultImg)"
              type="video/mp4"
              :onerror="`this.src='${news.defaultImg}'`"
            />
            Your browser does not support the video tag.
          </video>
          <b-img
            v-else
            :src="require('@/assets/images/news.svg')"
            alt="Image"
            class="news-image"
            ref="img"
          >
          </b-img>
        </div>
        <div class="news-data">
          <div class="news-info">
            <div>
              <p class="news-info-item">
                <b-icon
                  icon="calendar2-check"
                  animation="throb"
                  variant="success"
                  scale="1.3"
                  class="margin"
                ></b-icon
                >{{ formateDateTimeLang(news.creationDate, news.creationTime) }}
              </p>
            </div>
            <div>
              <p class="news-info-item">
                <b-icon
                  icon="person-fill"
                  animation="throb"
                  variant="info"
                  scale="1.3"
                  class="margin"
                ></b-icon
                >{{ $t("publisherName") }}:
                {{ news.publisherNameCurrent || $t("notFound") }}
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <h1 class="h5 mb-3 mt-3">
                {{ news.newsTitleCurrent }}
              </h1>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <p class="news-description">
                {{ news.newsDescriptionCurrent }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../components/general/CustomBottomSheet.vue";
// import DataLabelGroup from "./../../../components/general/DataLabelGroup.vue";
import {
  formateDateTimeLang,
  fullPathFileFromServer,
} from "./../../../utils/functions";
import { NEWS_MEDIA_TYPES } from "./../../../utils/constants";

export default {
  components: {
    CustomBottomSheet,
    // DataLabelGroup,
  },
  props: ["news"],
  data() {
    return {
      image: NEWS_MEDIA_TYPES.image,
      video: NEWS_MEDIA_TYPES.video,
    };
  },
  methods: {
    fullPathFileFromServer,
    formateDateTimeLang,
  },
};
</script>

<style scoped lang="scss">
.main-container {
  display: flex;
  flex-direction: column;
}
.img-row {
  margin-bottom: 25px;
  position: relative;
  height: auto;
  max-height: 20%;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
}
.news-image,
.video-container {
  max-height: 100%;
  max-width: 60%;
}

.news-info {
  display: flex;
  flex-wrap: wrap;
  padding: 0 25px;
  justify-content: space-between;
}
.news-info-item {
  font-size: 1rem;
}
.news-description {
  text-align: justify;
}

svg {
  margin: 0 4px;
}
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .news-info-item {
    font-size: 0.75rem;
  }
}
</style>
