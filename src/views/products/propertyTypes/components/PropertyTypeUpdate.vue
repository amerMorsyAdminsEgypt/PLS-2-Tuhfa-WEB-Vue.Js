<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="PropertyTypeUpdate"
      size="xl"
      :headerText="$t('PropertyTypes.edit')"
      :headerIcon="propertyType.icon"
      :clickToClose="false"
      :swipeAble="exceptionMsg ? true : false"
      @opened="getDetails()"
    >
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <PropertyTypeForm
        v-else-if="!isLoading"
        id="update"
        :propertyType="propertyType"
        v-on:submitForm="updatePropertyType()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="PropertyTypeUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import PropertyTypeForm from "./PropertyTypeForm.vue";

import PropertyTypeMixin from "./PropertyTypeMixin";

export default {
  mixins: [PropertyTypeMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    PropertyTypeForm,
  },
};
</script>
