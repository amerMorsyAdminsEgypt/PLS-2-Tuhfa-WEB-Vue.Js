<template>
  <div class="user-card-info mt-4">
    <span v-b-toggle.PriceQuotationInfoData class="collapse-title">
      {{ $t("StoreItems.data") }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </span>
    <b-collapse id="PriceQuotationInfoData">
      <div class="row">
        <div class="user-img-container col-lg-4">
          <img
            class="user-img"
            :src="
              fullPathFileFromServer(
                priceQuotation.storeItemInfoData
                  ? priceQuotation.storeItemInfoData.storeItemImagePath
                  : '',
                priceQuotation.defaultImg
              )
            "
            :onerror="`this.src='${priceQuotation.defaultImg}'`"
          />
        </div>
        <div class="col-lg-4 col-md-6">
          <DataLabelGroup
            :value="
              priceQuotation.storeItemInfoData
                ? priceQuotation.storeItemInfoData.fullCode
                : ''
            "
            :title="$t('StoreItems.code')"
            :imgName="'code.svg'"
          />
          <DataLabelGroup
            :value="
              priceQuotation.storeItemInfoData
                ? priceQuotation.storeItemInfoData.storeItemNameCurrent
                : ''
            "
            :title="$t('StoreItems.name')"
            :imgName="'StoreItems.svg'"
          />
          <DataLabelGroup
            :value="priceQuotation.storeItemQuantity"
            :title="$t('StoreItems.quantity')"
            :imgName="'number.svg'"
          />
        </div>
        <div class="col-lg-4 col-md-6">
          <DataLabelGroup
            :value="priceQuotation.bestPriceTotalItemsAmountWithCurrency"
            :title="$t('StoreItems.price.bestTotalPrice')"
            :imgName="'money.svg'"
          />
          <DataLabelGroup
            :value="priceQuotation.bestPriceStoreItemAmountWithCurrency"
            :title="$t('StoreItems.price.bestOnePrice')"
            :imgName="'money.svg'"
          />
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
import { fullPathFileFromServer } from "./../../../../utils/functions";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "PriceQuotationInfoData",
  mixins: [generalMixin],
  components: { DataLabelGroup },
  props: ["priceQuotation"],
  methods: {
    fullPathFileFromServer,
  },
};
</script>
