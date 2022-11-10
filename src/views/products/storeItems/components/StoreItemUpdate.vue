<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="StoreItemUpdate"
      size="xl"
      :headerText="$t('StoreItems.edit')"
      :headerIcon="storeItem.icon"
      :clickToClose="false"
      :swipeAble="exceptionMsg ? true : false"
      @opened="getDetails()"
    >
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <StoreItemForm
        v-else-if="!isLoading"
        id="update"
        :storeItem="storeItem"
        v-on:submitForm="updateStoreItem()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="StoreItemUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import StoreItemForm from "./StoreItemForm.vue";

import StoreItemMixin from "./StoreItemMixin";

export default {
  mixins: [StoreItemMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    StoreItemForm,
  },
};
</script>
