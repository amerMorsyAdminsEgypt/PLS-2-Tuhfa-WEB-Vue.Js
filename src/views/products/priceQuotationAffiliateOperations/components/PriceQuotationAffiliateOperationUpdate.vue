<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="PriceQuotationAffiliateOperationUpdate"
      size="xl"
      :headerText="$t('PriceQuotationAffiliateOperations.edit')"
      :headerIcon="priceQuotationAffiliateOperation.icon"
      :clickToClose="false"
      :swipeAble="exceptionMsg ? true : false"
      @opened="getDetails()"
    >
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <PriceQuotationAffiliateOperationForm
        v-else-if="!isLoading"
        id="update"
        :priceQuotationAffiliateOperation="priceQuotationAffiliateOperation"
        v-on:submitForm="updatePriceQuotationAffiliateOperation()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="PriceQuotationAffiliateOperationUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../../components/general/ExceptionWithImg.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import PriceQuotationAffiliateOperationForm from "./PriceQuotationAffiliateOperationForm.vue";

import PriceQuotationAffiliateOperationMixin from "./PriceQuotationAffiliateOperationMixin";

export default {
  mixins: [PriceQuotationAffiliateOperationMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomBottomSheet,
    PriceQuotationAffiliateOperationForm,
  },
};
</script>
