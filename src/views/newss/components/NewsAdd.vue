<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="NewsAdd"
      size="xl"
      :headerText="$t('Newss.add')"
      :headerIcon="news.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="news.setInitialValue()"
    >
      <NewsForm
        v-if="!isLoading"
        id="add"
        :news="news"
        v-on:submitForm="addNews()"
        bottomSheetName="NewsAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData dialogName="NewsAdd" v-on:response="response($event)" />
  </div>
</template>

<script>
import PreLoader from "./../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../components/general/ConfirmClearData.vue";
import NewsForm from "./NewsForm.vue";
import { STATUS } from "./../../../utils/constants";
import { objectToFormData } from "./../../../utils/functions";
import apiNews from "./../../../api/news";
import generalMixin from "./../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    NewsForm,
  },
  props: ["news"],
  methods: {
    async addNews() {
      this.isLoading = true;
      let formData = objectToFormData(this.news);
      try {
        const response = await apiNews.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-NewsAdd");
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

    response(data) {
      this.$emit("refresh");
      switch (data) {
        case "yes":
          this.news.setInitialValue();
          break;
        case "leave":
          this.news.setInitialValue();
          this.closeBottomSheet("NewsAdd");
          break;
      }
    },
  },
};
</script>
