<template>
  <CustomBottomSheet
    :refName="'PriceQuotationInfoPropertyTypesInfo'"
    size="xl"
    :headerText="$t('StoreItems.data')"
    :headerIcon="priceQuotationDetail.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          priceQuotationDetail.storeItemInfoData
            ? priceQuotationDetail.storeItemInfoData.fullCode
            : ''
        "
        :title="$t('StoreItems.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          priceQuotationDetail.storeItemInfoData
            ? priceQuotationDetail.storeItemInfoData.storeItemNameCurrent
            : ''
        "
        :title="$t('StoreItems.name')"
        :imgName="'StoreItems.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="priceQuotationDetail.storeItemQuantity"
        :title="$t('general.quantity')"
        :imgName="'number.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          priceQuotationDetail.lastPriceQuotationHistoryWorkInfoData
            ? priceQuotationDetail.lastPriceQuotationHistoryWorkInfoData
                .quotationDetailsHistoryWorkTypeNameCurrent
            : ''
        "
        :title="$t('status')"
        :imgName="'type.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="priceQuotationDetail.bestPriceTotalItemsAmountWithCurrency"
        :title="$t('StoreItems.price.bestTotalPrice')"
        :imgName="'money.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="priceQuotationDetail.bestPriceStoreItemAmountWithCurrency"
        :title="$t('StoreItems.price.bestOnePrice')"
        :imgName="'money.svg'"
      />

      <PropertyTypesInfoTable
        class="col-12"
        :propertyTypesData="priceQuotationDetail.storeItemPropertyTypesData"
      />
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";
import PropertyTypesInfoTable from "./../../storeItems/components/PropertyTypesInfoTable.vue";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
    PropertyTypesInfoTable,
  },
  props: ["priceQuotationDetail"],
};
</script>
