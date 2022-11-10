<template>
  <div class="">
    <PreLoader v-if="isLoading" />

    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="socialStatuse.mediaFile = $event.file"
          :defaultImg="imageSrc"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="'fullCode'"
            :value="socialStatuse.fullCode"
            v-on:changeValue="socialStatuse.fullCode = $event"
            :title="$t('SocialStatuses.code')"
            :imgName="'code.svg'"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="'socialStatuseNameAr'"
            :value="socialStatuse.socialStatuseNameAr"
            v-on:changeValue="socialStatuse.socialStatuseNameAr = $event"
            :title="$t('SocialStatuses.nameAr')"
            :imgName="'socialStatuses.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'socialStatuseNameEn'"
            :value="socialStatuse.socialStatuseNameEn"
            v-on:changeValue="socialStatuse.socialStatuseNameEn = $event"
            :title="$t('SocialStatuses.nameEn')"
            :imgName="'socialStatuses.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'socialStatuseNameUnd'"
            :value="socialStatuse.socialStatuseNameUnd"
            v-on:changeValue="socialStatuse.socialStatuseNameUnd = $event"
            :title="$t('SocialStatuses.nameUnd')"
            :imgName="'socialStatuses.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'socialStatuseDescriptionAr'"
            :value="socialStatuse.socialStatuseDescriptionAr"
            v-on:changeValue="socialStatuse.socialStatuseDescriptionAr = $event"
            :title="$t('SocialStatuses.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'socialStatuseDescriptionEn'"
            :value="socialStatuse.socialStatuseDescriptionEn"
            v-on:changeValue="socialStatuse.socialStatuseDescriptionEn = $event"
            :title="$t('SocialStatuses.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'socialStatuseDescriptionUnd'"
            :value="socialStatuse.socialStatuseDescriptionUnd"
            v-on:changeValue="
              socialStatuse.socialStatuseDescriptionUnd = $event
            "
            :title="$t('SocialStatuses.descriptionUnd')"
            :imgName="'description.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'socialStatuseNotes'"
            :value="socialStatuse.socialStatuseNotes"
            v-on:changeValue="socialStatuse.socialStatuseNotes = $event"
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />
        </div>
      </div>

      <div class="form-footer">
        <button
          name="submit"
          type="submit"
          class="btn btn-submit"
          @click.prevent="addOrUpdateSocialStatuse"
        >
          {{ submitName }}
        </button>
        <router-link :to="{ name: 'SocialStatuses' }" class="btn btn-cancel">
          {{ $t("cancel") }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PreLoader from "@/components/general/PreLoader.vue";
import { BASE_URL } from "@/utils/constants";
import CustomInput from "@/components/general/CustomInput.vue";
import CustomFileInput from "@/components/general/CustomFileInput.vue";
import TextArea from "@/components/general/TextArea.vue";
import generalMixin from "@/utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomInput,
    CustomFileInput,
    TextArea,
  },
  computed: {
    ...mapGetters(["userAuthorizeToken", "constantsListsData"]),
  },
  data() {
    return {
      isLoading: false,
      exceptionMsg: null,
      exceptionImg: null,
      imageSrc: "",
    };
  },
  props: ["socialStatuse", "submitName"],
  methods: {
    async addOrUpdateSocialStatuse() {
      this.$emit("addOrUpdateSocialStatuse");
    },
  },
  async created() {
    this.imageSrc = this.socialStatuse.socialStatuseImagePath
      ? BASE_URL + this.socialStatuse.socialStatuseImagePath
      : this.socialStatuse.defaultImg;
  },
};
</script>

<style lang="scss"></style>
