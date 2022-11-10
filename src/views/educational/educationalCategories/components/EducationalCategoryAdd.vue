<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="EducationalCategoryAdd"
      size="xl"
      :headerText="$t('EducationalCategories.add')"
      :headerIcon="educationalCategory.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="educationalCategory.setInitialValue()"
    >
      <EducationalCategoryForm
        v-if="!isLoading"
        id="add"
        :educationalCategory="educationalCategory"
        v-on:submitForm="addEducationalCategory()"
        bottomSheetName="EducationalCategoryAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="EducationalCategoryAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import EducationalCategoryForm from "./EducationalCategoryForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import apiEducationalCategory from "./../../../../api/educational/educationalCategories";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    EducationalCategoryForm,
  },
  props: ["educationalCategory"],
  methods: {
    async addEducationalCategory() {
      this.isLoading = true;
      let formData = objectToFormData(this.educationalCategory);
      try {
        const response = await apiEducationalCategory.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-EducationalCategoryAdd");
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
          this.educationalCategory.setInitialValue();
          break;
        case "leave":
          this.educationalCategory.setInitialValue();
          this.closeBottomSheet("EducationalCategoryAdd");
          break;
      }
    },
  },
};
</script>
