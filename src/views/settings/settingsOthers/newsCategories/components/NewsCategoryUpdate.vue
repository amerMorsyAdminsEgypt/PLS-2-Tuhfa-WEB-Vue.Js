<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="NewsCategoryUpdate"
      size="xl"
      :headerText="$t('NewsCategories.edit')"
      :headerIcon="newsCategory.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <NewsCategoryForm
        v-if="!isLoading"
        id="update"
        :newsCategory="newsCategory"
        v-on:submitForm="updateNewsCategory()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="NewsCategoryUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import NewsCategoryForm from "./NewsCategoryForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import GeneralDelete from "./../../../../../models/general/GeneralDelete";
import apiNewsCategory from "./../../../../../api/settings/settingsOthers/newsCategories";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    NewsCategoryForm,
  },
  props: ["newsCategory"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateNewsCategory() {
      this.isLoading = true;
      let formData = objectToFormData(this.newsCategory);
      try {
        const response = await apiNewsCategory.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("NewsCategoryUpdate");
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
          token: this.newsCategory.newsCategoryToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiNewsCategory.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.newsCategory.newsCategoryImagePath = "";
          this.newsCategory.newsCategoryImageIsDefault = true;
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
