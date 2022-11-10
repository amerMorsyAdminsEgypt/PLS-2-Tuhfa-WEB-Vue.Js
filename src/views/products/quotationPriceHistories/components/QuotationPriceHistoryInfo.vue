<template>
  <CustomBottomSheet
    :refName="'QuotationPriceHistoryInfo'"
    size="xl"
    :headerText="$t('QuotationPriceHistories.data')"
    :headerIcon="quotationPriceHistory.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-12'"
        :value="quotationPriceHistory.fullCode"
        :title="$t('QuotationPriceHistories.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          quotationPriceHistory.placeInfoData
            ? quotationPriceHistory.placeInfoData.fullCode
            : ''
        "
        :title="$t('Places.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          quotationPriceHistory.placeInfoData
            ? quotationPriceHistory.placeInfoData.placeNameCurrent
            : ''
        "
        :title="$t('Places.name')"
        :imgName="'places.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          quotationPriceHistory.priceQuotationDetailsInfoData &&
          quotationPriceHistory.priceQuotationDetailsInfoData.storeItemInfoData
            ? quotationPriceHistory.priceQuotationDetailsInfoData
                .storeItemInfoData.fullCode
            : ''
        "
        :title="$t('StoreItems.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          quotationPriceHistory.priceQuotationDetailsInfoData &&
          quotationPriceHistory.priceQuotationDetailsInfoData.storeItemInfoData
            ? quotationPriceHistory.priceQuotationDetailsInfoData
                .storeItemInfoData.storeItemNameCurrent
            : ''
        "
        :title="$t('StoreItems.name')"
        :imgName="'StoreItems.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          quotationPriceHistory.priceQuotationDetailsInfoData
            ? quotationPriceHistory.priceQuotationDetailsInfoData
                .quotationDetailsHistoryWorkTypeNameCurrent
            : ''
        "
        :title="$t('status')"
        :imgName="'type.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="quotationPriceHistory.totalItemsQuantity"
        :title="$t('general.quantity')"
        :imgName="'number.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="quotationPriceHistory.totalItemsAmountWithCurrency"
        :title="$t('StoreItems.price.totalPrice')"
        :imgName="'money.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="quotationPriceHistory.storeItemAmountWithCurrency"
        :title="$t('StoreItems.price.onePrice')"
        :imgName="'money.svg'"
      />
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
  },
  props: ["quotationPriceHistory"],
};
</script>
