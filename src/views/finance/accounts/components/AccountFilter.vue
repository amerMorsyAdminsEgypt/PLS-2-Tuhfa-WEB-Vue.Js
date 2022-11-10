<template>
  <CustomBottomSheet
    :refName="'filterSheet'"
    size="lg"
    :headerText="$t('filter')"
    :headerIcon="icon"
  >
    <div class="row">
      <CustomInputFloat
        :className="'col-md-6'"
        :id="`accountMoneyBalanceFrom`"
        :value="filterData.accountMoneyBalanceFrom"
        v-on:changeValue="filterData.accountMoneyBalanceFrom = $event"
        :title="$t('Accounts.balanceFrom')"
        :imgName="'money.svg'"
      />
      <CustomInputFloat
        :className="'col-md-6'"
        :id="`accountMoneyBalanceTo`"
        :value="filterData.accountMoneyBalanceTo"
        v-on:changeValue="filterData.accountMoneyBalanceTo = $event"
        :title="$t('Accounts.balanceTo')"
        :imgName="'money.svg'"
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
import CustomInputFloat from "./../../../../components/general/CustomInputFloat.vue";
import CustomBaseEntityFilter from "./../../../../components/general/CustomBaseEntityFilter.vue";
import generalMixin from "./../../../../utils/generalMixin";
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
      filterData: this.theFilterData,
      icon,
    };
  },
  components: {
    CustomBottomSheet,
    CustomInputFloat,
    CustomBaseEntityFilter,
  },
  methods: {
    search() {
      this.closeBottomSheet("filterSheet");
      this.$emit("search", this.filterData);
    },
  },
};
</script>
