<template>
  <div class="row footer-home" v-if="social.HOME_FOOTER_STATUS">
    <div class="col-12">
      <div class="row">
        <h3 class="contact-info-title center-txt">{{ $t("contactInfo") }}</h3>
      </div>
    </div>
    <div class="col-12 content">
      <div class="row">
        <div
          class="bio-social"
          :class="social.map_STATUS ? 'col-sm-12 col-md-6 col-lg-4' : 'col-12 '"
        >
          <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-12">
              <div class="row logo-container">
                <img
                  :src="require('@/assets/images/logo.png')"
                  class="footer-home-logo"
                />
              </div>
              <h4 class="text-lead justify-txt p-3">
                {{ $t("projectBio") }}
              </h4>
            </div>
            <div class="col-sm-12 col-md-12 col-lg-12 p-2">
              <div class="row">
                <div v-if="social.faceBook_STATUS" class="col-2">
                  <a
                    :href="social.faceBook_URL"
                    target="_blink"
                    :title="$t('social.faceBook')"
                  >
                    <img src="@/assets/images/facebook.svg" class="icon-lg" />
                  </a>
                </div>
                <div v-if="social.twitter_STATUS" class="col-2">
                  <a
                    :href="social.twitter_URL"
                    target="_blink"
                    :title="$t('social.twitter')"
                  >
                    <img src="@/assets/images/twitter.svg" class="icon-lg" />
                  </a>
                </div>
                <div v-if="social.linkedin_STATUS" class="col-2">
                  <a
                    :href="social.linkedin_URL"
                    target="_blink"
                    :title="$t('social.linkedin')"
                  >
                    <img src="@/assets/images/linkedin.svg" class="icon-lg" />
                  </a>
                </div>
                <div v-if="social.whatsApp_STATUS" class="col-2">
                  <a
                    :href="social.whatsApp_URL"
                    target="_blink"
                    :title="$t('social.whatsApp')"
                  >
                    <img src="@/assets/images/whatsapp.svg" class="icon-lg" />
                  </a>
                </div>
                <div v-if="social.youTube_STATUS" class="col-2">
                  <a
                    :href="social.youTube_URL"
                    target="_blink"
                    :title="$t('social.youTube')"
                  >
                    <img src="@/assets/images/youtube.svg" class="icon-lg" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="basic-contact"
          :class="social.map_STATUS ? 'col-sm-12 col-md-6 col-lg-4' : 'col-12 '"
        >
          <div class="row">
            <div v-if="basicContacts.projectAddress1_STATUS" class="col-12">
              <div class="row">
                <img
                  :src="require('@/assets/images/home-address.svg')"
                  class="footer-home-img"
                />
              </div>

              <h4 class="text-lead center-txt">
                {{ $t("projectAddress1") }}
              </h4>
              <h4 class="text-lead center-txt">
                {{ $t("projectAddress2") }}
              </h4>
              <h4 class="text-lead center-txt">
                {{ $t("projectAddress3") }}
              </h4>
            </div>
            <div
              v-if="
                basicContacts.projectPhone1_STATUS ||
                basicContacts.projectPhone2_STATUS ||
                basicContacts.projectPhone3_STATUS
              "
              class="row align-items-center"
            >
              <div class="col-2">
                <img
                  :src="require('@/assets/images/home-phone.svg')"
                  class="footer-home-img"
                />
              </div>
              <div class="col-6 footer-phones">
                <p
                  v-if="basicContacts.projectPhone1_STATUS"
                  class="text-lead justify-txt color-w"
                >
                  {{ $t("projectPhone1") }}
                </p>
                <p
                  v-if="basicContacts.projectPhone2_STATUS"
                  class="text-lead justify-txt color-w"
                >
                  {{ $t("projectPhone2") }}
                </p>
                <p
                  v-if="basicContacts.projectPhone3_STATUS"
                  class="text-lead justify-txt color-w"
                >
                  {{ $t("projectPhone3") }}
                </p>
              </div>
            </div>
            <div
              v-if="
                basicContacts.projectEmail1_STATUS ||
                basicContacts.projectEmail2_STATUS
              "
              class="row align-items-center"
            >
              <div class="col-2">
                <img
                  :src="require('@/assets/images/home-email.svg')"
                  class="footer-home-img"
                />
              </div>
              <div class="col-6">
                <p
                  v-if="basicContacts.projectEmail1_STATUS"
                  class="text-lead justify-txt color-w"
                >
                  {{ $t("projectEmail1") }}
                </p>
                <p
                  v-if="basicContacts.projectEmail2_STATUS"
                  class="text-lead justify-txt color-w"
                >
                  {{ $t("projectEmail2") }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="social.map_STATUS"
          class="col-sm-12 col-md-12 col-lg-4 footer-map"
        >
          <iframe
            frameborder="0"
            style="border: 0"
            :src="social.map_URL"
            allowfullscreen=""
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterHome",
  data() {
    return {};
  },
  props: {
    social: {
      type: Object,
    },
    basicContacts: {
      type: Object,
    },
  },
};
</script>
<style lang="scss"></style>
