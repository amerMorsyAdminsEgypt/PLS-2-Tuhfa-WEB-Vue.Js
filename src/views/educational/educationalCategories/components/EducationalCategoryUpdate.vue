<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="EducationalCategoryUpdate"
      size="xl"
      :headerText="$t('EducationalCategories.edit')"
      :headerIcon="educationalCategory.icon"
      :clickToClose="false"
      :swipeAble="exceptionMsg ? true : false"
      @opened="getDetails()"
    >
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <EducationalCategoryForm
        v-else-if="!isLoading"
        id="update"
        :educationalCategory="educationalCategory"
        v-on:submitForm="updateEducationalCategory()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="EducationalCategoryUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../../components/general/ExceptionWithImg.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import EducationalCategoryForm from "./EducationalCategoryForm.vue";
import EducationalCategoryMixin from "./EducationalCategoryMixin";

export default {
  mixins: [EducationalCategoryMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomBottomSheet,
    EducationalCategoryForm,
  },
};
</script>
