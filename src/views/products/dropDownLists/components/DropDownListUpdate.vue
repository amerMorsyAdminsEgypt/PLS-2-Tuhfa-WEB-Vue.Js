<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="DropDownListUpdate"
      size="xl"
      :headerText="$t('DropDownLists.edit')"
      :headerIcon="dropDownList.icon"
      :clickToClose="false"
      :swipeAble="exceptionMsg ? true : false"
      @opened="getDetails()"
    >
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <DropDownListForm
        v-else-if="!isLoading"
        id="update"
        :dropDownList="dropDownList"
        v-on:submitForm="updateDropDownList()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="DropDownListUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import DropDownListForm from "./DropDownListForm.vue";

import DropDownListMixin from "./DropDownListMixin";

export default {
  mixins: [DropDownListMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    DropDownListForm,
  },
};
</script>
