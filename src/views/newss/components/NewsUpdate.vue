<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="NewsUpdate"
      size="xl"
      :headerText="$t('Newss.edit')"
      :headerIcon="news.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <NewsForm
        v-if="!isLoading"
        id="update"
        :news="news"
        v-on:submitForm="updateNews()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="NewsUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../components/general/CustomBottomSheet.vue";
import NewsForm from "./NewsForm.vue";
import { STATUS } from "./../../../utils/constants";
import { objectToFormData } from "./../../../utils/functions";
import GeneralDelete from "./../../../models/general/GeneralDelete";
import apiNews from "./../../../api/news";
import generalMixin from "./../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    NewsForm,
  },
  props: ["news"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateNews() {
      this.isLoading = true;
      let formData = objectToFormData(this.news);
      try {
        const response = await apiNews.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("NewsUpdate");
          this.$emit("refresh");
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
          this.showMsg(response.data.msg);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
    async deleteFile() {
      this.isLoading = true;
      try {
        this.model.fillData({
          token: this.news.newsToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiNews.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.news.newsImagePath = "";
          this.news.newsImageIsDefault = true;
          this.$emit("refresh");
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
  },
};
</script>
