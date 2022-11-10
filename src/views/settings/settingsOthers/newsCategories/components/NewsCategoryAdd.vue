<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="NewsCategoryAdd"
      size="xl"
      :headerText="$t('NewsCategories.add')"
      :headerIcon="newsCategory.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="newsCategory.setInitialValue()"
    >
      <NewsCategoryForm
        v-if="!isLoading"
        id="add"
        :newsCategory="newsCategory"
        v-on:submitForm="addNewsCategory()"
        bottomSheetName="NewsCategoryAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="NewsCategoryAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../../components/general/ConfirmClearData.vue";
import NewsCategoryForm from "./NewsCategoryForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import apiNewsCategory from "./../../../../../api/settings/settingsOthers/newsCategories";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    NewsCategoryForm,
  },
  props: ["newsCategory"],
  methods: {
    async addNewsCategory() {
      this.isLoading = true;
      let formData = objectToFormData(this.newsCategory);
      try {
        const response = await apiNewsCategory.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-NewsCategoryAdd");
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
          this.newsCategory.setInitialValue();
          break;
        case "leave":
          this.newsCategory.setInitialValue();
          this.closeBottomSheet("NewsCategoryAdd");
          break;
      }
    },
  },
};
</script>
