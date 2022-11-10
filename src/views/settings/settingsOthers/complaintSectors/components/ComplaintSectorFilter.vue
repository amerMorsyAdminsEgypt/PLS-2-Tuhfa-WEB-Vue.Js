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
        :id="`complaintScopeTypeToken`"
        :value="filterData.complaintScopeTypeToken"
        :options="complaintScopeTypeTokenOptions"
        v-on:changeValue="filterData.complaintScopeTypeToken = $event"
        :title="$t('ComplaintTypes.complaintScopeType')"
        :imgName="'complaintTypes.svg'"
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
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import CustomSelectBox from "./../../../../../components/general/CustomSelectBox.vue";
import CustomBaseEntityFilter from "./../../../../../components/general/CustomBaseEntityFilter.vue";
import generalMixin from "./../../../../../utils/generalMixin";
import icon from "@/assets/images/filter.svg";
import { getDialogOfComplaintScopeType } from "./../../../../../utils/dialogsOfConstantsLists";

export default {
  mixins: [generalMixin],
  props: {
    theFilterData: {
      type: Object,
    },
  },
  data() {
    return {
      complaintScopeTypeTokenOptions: getDialogOfComplaintScopeType(),
      filterData: this.theFilterData,
      icon,
    };
  },
  components: {
    CustomBottomSheet,
    CustomSelectBox,
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
