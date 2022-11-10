import { MEDIA_TYPE_TOKENS, MEDIA_EXTENSIONS } from "./constantLists";

export default {
  data() {
    return {};
  },
  methods: {
    getMediaTypeToken(mediaExtention) {
      let mediaTypeToken = "";

      if (MEDIA_EXTENSIONS.image.includes(mediaExtention)) {
        mediaTypeToken = MEDIA_TYPE_TOKENS.image;
      } else if (MEDIA_EXTENSIONS.video.includes(mediaExtention)) {
        mediaTypeToken = MEDIA_TYPE_TOKENS.video;
      } else if (MEDIA_EXTENSIONS.audio.includes(mediaExtention)) {
        mediaTypeToken = MEDIA_TYPE_TOKENS.audio;
      } else if (MEDIA_EXTENSIONS.pdf.includes(mediaExtention)) {
        mediaTypeToken = MEDIA_TYPE_TOKENS.pdf;
      } else if (MEDIA_EXTENSIONS.excel.includes(mediaExtention)) {
        mediaTypeToken = MEDIA_TYPE_TOKENS.excel;
      } else if (MEDIA_EXTENSIONS.word.includes(mediaExtention)) {
        mediaTypeToken = MEDIA_TYPE_TOKENS.word;
      } else {
        mediaTypeToken = MEDIA_TYPE_TOKENS.other;
      }
      return mediaTypeToken;
    },
  },
};
