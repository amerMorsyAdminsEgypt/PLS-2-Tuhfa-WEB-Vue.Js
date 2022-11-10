<template>
  <CustomBottomSheet
    :refName="'filterSheet'"
    size="lg"
    :headerText="$t('filter')"
    :headerIcon="icon"
  >
    <div class="row">
      <CustomSelectBox
        :className="'col-md-12'"
        :id="`priceQuotationToken`"
        :value="filterData.priceQuotationToken"
        :options="priceQuotationTokenOptions"
        v-on:changeValue="filterData.priceQuotationToken = $event"
        :title="$t('PriceQuotations.select')"
        :imgName="'PriceQuotations.svg'"
      />
      <CustomSelectBox
        :className="'col-md-12'"
        :id="`affiliateOperationTypeToken`"
        :value="filterData.affiliateOperationTypeToken"
        :options="affiliateOperationTypeTokenOptions"
        v-on:changeValue="filterData.affiliateOperationTypeToken = $event"
        :title="$t('PriceQuotations.details.AffiliateOperationSelect')"
        :imgName="'AffiliateOperationTypes.svg'"
        :openDown="true"
      />
    </div>
    <CustomBaseEntityFilter
      :className="'row'"
      :value="filterData"
      v-on:changeValue="filterData.fillData($event)"
    />

    <div class="form-actions">
      <div class="icon-submit" @click.prevent="search">
        <img src="@/assets/images/search-icon.svg" :title="$t('search')" />
      </div>
      <div @click.prevent="closeBottomSheet('filterSheet')" class="icon-cancel">
        <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
      </div>
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import CustomBaseEntityFilter from "./../../../../components/general/CustomBaseEntityFilter.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import generalMixin from "./../../../../utils/generalMixin";
import { PRICE_QUOTATION_HISTORY_WORK_TYPES } from "./../../../../utils/constantLists";
import { getDialogOfAffiliateOperationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import { getPriceQuotationsDialogCustomized } from "./../../../../utils/dialogsOfApi";
import icon from "@/assets/images/filter.svg";

export default {
  mixins: [generalMixin],
  props: {
    theFilterData: {
      type: Object,
    },
  },
  data() {
    return {
      priceQuotationTokenOptions: [],
      filterData: this.theFilterData,
      icon,
      affiliateOperationTypeTokenOptions: getDialogOfAffiliateOperationTypes(),
    };
  },
  components: {
    CustomBottomSheet,
    CustomBaseEntityFilter,
    CustomSelectBox,
  },
  methods: {
    async getPriceQuotationsDialog() {
      this.isLoading = true;
      let params = {
        priceQuotationHistoryWorkTypeToken:
          PRICE_QUOTATION_HISTORY_WORK_TYPES.AcceptQuotesFormCustomer,
      };
      this.priceQuotationTokenOptions =
        await getPriceQuotationsDialogCustomized(params);
      this.isLoading = false;
    },
    search() {
      this.closeBottomSheet("filterSheet");
      this.$emit("search", this.filterData);
    },
  },
  async created() {
    this.getPriceQuotationsDialog();
  },
};
</script>
