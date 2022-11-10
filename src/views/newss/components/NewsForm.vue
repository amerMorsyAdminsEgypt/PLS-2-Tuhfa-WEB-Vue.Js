<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="news.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(news.newsImagePath, news.defaultImg)
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !news.newsImageIsDefault &&
            checkPrivilege(hasNewsDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomSelectBoxMultiple
            :className="'col-md-6'"
            :id="`${id}-newsCategoryTokenList`"
            :errors="errors_newsCategoryTokenList"
            :value="news.newsCategoryTokenList"
            :options="newsCategoryTokenListOptions"
            v-on:changeValue="
              news.newsCategoryTokenList = $event;
              $v.news.newsCategoryTokenList.$touch();
            "
            :title="$t('NewsCategories.select')"
            :imgName="'newsCategories.svg'"
            :returnArrayOfObjects="false"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="news.fullCode"
            v-on:changeValue="news.fullCode = $event"
            :title="$t('Newss.code')"
            :imgName="'code.svg'"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-newsTitleAr`"
            :errors="errors_newsTitleAr"
            :value="news.newsTitleAr"
            v-on:changeValue="
              news.newsTitleAr = $event;
              $v.news.newsTitleAr.$touch();
            "
            :title="$t('Newss.titleAr')"
            :imgName="'news.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-newsTitleEn`"
            :errors="errors_newsTitleEn"
            :value="news.newsTitleEn"
            v-on:changeValue="
              news.newsTitleEn = $event;
              $v.news.newsTitleEn.$touch();
            "
            :title="$t('Newss.titleEn')"
            :imgName="'news.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-newsTitleUnd`"
            :value="news.newsTitleUnd"
            v-on:changeValue="news.newsTitleUnd = $event"
            :title="$t('Newss.titleUnd')"
            :imgName="'news.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-newsDescriptionAr`"
            :value="news.newsDescriptionAr"
            v-on:changeValue="news.newsDescriptionAr = $event"
            :title="$t('Newss.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-newsDescriptionEn`"
            :value="news.newsDescriptionEn"
            v-on:changeValue="news.newsDescriptionEn = $event"
            :title="$t('Newss.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-newsDescriptionUnd`"
            :value="news.newsDescriptionUnd"
            v-on:changeValue="news.newsDescriptionUnd = $event"
            :title="$t('Newss.descriptionUnd')"
            :imgName="'description.svg'"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-publisherNameAr`"
            :value="news.publisherNameAr"
            v-on:changeValue="news.publisherNameAr = $event"
            :title="$t('Newss.publisherNameAr')"
            :imgName="'news.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-publisherNameEn`"
            :value="news.publisherNameEn"
            v-on:changeValue="news.publisherNameEn = $event"
            :title="$t('Newss.publisherNameEn')"
            :imgName="'news.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-publisherNameUnd`"
            :value="news.publisherNameUnd"
            v-on:changeValue="news.publisherNameUnd = $event"
            :title="$t('Newss.publisherNameUnd')"
            :imgName="'news.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-newsNotes`"
            :value="news.newsNotes"
            v-on:changeValue="news.newsNotes = $event"
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />
        </div>
      </div>

      <div class="form-actions">
        <div class="icon-submit" @click.prevent="submitForm">
          <img src="@/assets/images/check-icon.svg" :title="submitName" />
        </div>
        <div
          @click.prevent
          class="icon-cancel"
          v-b-modal="`ConfirmCloseSheet-${bottomSheetName}`"
        >
          <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {
  fullPathFileFromServer,
  bottomSheetScrollToTop,
} from "./../../../utils/functions";
import CustomFileInput from "./../../../components/general/CustomFileInput.vue";
import CustomInput from "./../../../components/general/CustomInput.vue";
import CustomSelectBoxMultiple from "./../../../components/general/CustomSelectBoxMultiple.vue";
import TextArea from "./../../../components/general/TextArea.vue";
import { hasNewsDeleteImage } from "./../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../utils/functions";
import generalMixin from "./../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { getNewsCategoriesDialog } from "./../../../utils/dialogsOfApi";
import PreLoader from "@/components/general/PreLoader.vue";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    PreLoader,
    CustomFileInput,
    CustomInput,
    CustomSelectBoxMultiple,
    TextArea,
  },
  data() {
    return {
      isLoading: false,
      newsCategoryTokenListOptions: [],
    };
  },
  props: {
    news: {
      type: Object,
    },
    submitName: {
      type: String,
    },
    id: {
      type: String,
      default: "id",
    },
    deleteFileStatus: {
      type: Boolean,
      default: false,
    },
    bottomSheetName: {
      type: String,
      default: "",
    },
  },
  validations: {
    news: {
      newsCategoryTokenList: { required },
      newsTitleAr: { required },
      newsTitleEn: { required },
    },
  },
  computed: {
    errors_newsCategoryTokenList() {
      let errors = [];
      if (this.$v.news.newsCategoryTokenList.$error) {
        if (!this.$v.news.newsCategoryTokenList.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_newsTitleAr() {
      let errors = [];
      if (this.$v.news.newsTitleAr.$error) {
        if (
          !this.$v.news.newsTitleAr.required &&
          !this.$v.news.newsTitleEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_newsTitleEn() {
      let errors = [];
      if (this.$v.news.newsTitleEn.$error) {
        if (
          !this.$v.news.newsTitleAr.required &&
          !this.$v.news.newsTitleEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
  },
  methods: {
    async getNewsCategoriesDialog() {
      this.isLoading = true;
      this.newsCategoryTokenListOptions = await getNewsCategoriesDialog();
      this.isLoading = false;
    },

    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        this.$v.news.newsCategoryTokenList.required &&
        (this.$v.news.newsTitleAr.required || this.$v.news.newsTitleEn.required)
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasNewsDeleteImage,
    fullPathFileFromServer,
  },
  created() {
    this.getNewsCategoriesDialog();
  },
};
</script>
