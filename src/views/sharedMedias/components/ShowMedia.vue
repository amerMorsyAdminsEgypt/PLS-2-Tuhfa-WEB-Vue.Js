<template>
  <div class="main-container mb-2">
    <div
      v-if="media.sharedMediaFileTypeToken == MEDIA_TYPE_TOKENS.image"
      class="media-container"
    >
      <img
        class="media-item"
        :src="
          fullPathFileFromServer(media.sharedMediaFilePath, media.defaultImg)
        "
        :onerror="`this.src='${media.defaultImg}'`"
      />
    </div>
    <div
      v-if="media.sharedMediaFileTypeToken == MEDIA_TYPE_TOKENS.video"
      class="media-container"
    >
      <video controls class="media-item" style="cursor: pointer">
        <source
          :src="
            fullPathFileFromServer(media.sharedMediaFilePath, media.defaultImg)
          "
          type="video/mp4"
          :onerror="`this.src='${media.defaultImg}'`"
        />
        Your browser does not support the video tag.
      </video>
    </div>
    <div
      v-if="media.sharedMediaFileTypeToken == MEDIA_TYPE_TOKENS.audio"
      class="media-container"
    >
      <audio controls>
        <source :src="`${BASE_URL}${media.sharedMediaFilePath}`" />

        Your browser does not support the audio element.
      </audio>
    </div>
    <div
      v-if="media.sharedMediaFileTypeToken == MEDIA_TYPE_TOKENS.pdf"
      class="media-container"
    >
      <vue-pdf-app
        class="pdf"
        :pdf="
          fullPathFileFromServer(media.sharedMediaFilePath, media.defaultImg)
        "
        theme="dark"
      ></vue-pdf-app>
    </div>
    <div v-if="isExWoPo()" class="media-container">
      <VueDocPreview
        class="office"
        :url="
          fullPathFileFromServer(media.sharedMediaFilePath, media.defaultImg)
        "
        :type="`office`"
      />
    </div>
    <div
      v-if="media.sharedMediaFileTypeToken == MEDIA_TYPE_TOKENS.other"
      class="media-container"
    >
      <img
        class="download"
        src="@/assets/images/download.svg"
        @click="viewFileFromServer(media.sharedMediaFilePath)"
      />
    </div>
  </div>
</template>

<script>
import { MEDIA_TYPE_TOKENS } from "@/utils/constantLists";
import { BASE_URL } from "@/utils/constants";
import { fullPathFileFromServer, viewFileFromServer } from "@/utils/functions";
import VuePdfApp from "vue-pdf-app";
import VueDocPreview from "vue-doc-preview";

export default {
  name: "ShowMedia",
  components: {
    VueDocPreview,
    VuePdfApp,
  },
  computed: {},
  data() {
    return {
      MEDIA_TYPE_TOKENS: MEDIA_TYPE_TOKENS,
      BASE_URL,
    };
  },
  props: {
    media: {
      type: Object,
    },
  },
  watch() {},
  methods: {
    fullPathFileFromServer,
    viewFileFromServer,

    isExWoPo() {
      let check =
        this.media.sharedMediaFileTypeToken == MEDIA_TYPE_TOKENS.excel ||
        this.media.sharedMediaFileTypeToken == MEDIA_TYPE_TOKENS.word ||
        this.media.sharedMediaFileTypeToken == MEDIA_TYPE_TOKENS.powerPoint;
      return check;
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped></style>
