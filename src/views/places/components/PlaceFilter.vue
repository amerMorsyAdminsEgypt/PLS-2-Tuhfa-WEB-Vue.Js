<template>
  <CustomBottomSheet
    :refName="'filterSheet'"
    size="lg"
    :headerText="$t('filter')"
    :headerIcon="icon"
  >
    <div class="row">
      <CustomSelectBox
        :className="'col-12'"
        :id="`placeActivityTypeToken`"
        :value="filterData.placeActivityTypeToken"
        :options="placeActivityTypeTokenOptions"
        v-on:changeValue="filterData.placeActivityTypeToken = $event"
        :title="$t('Places.activityType')"
        :imgName="'activity-types.svg'"
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
import { checkPrivilege } from "./../../../utils/functions";
import {
  getDialogOfUserTypes,
  getDialogOfPlaceActivityType,
} from "./../../../utils/dialogsOfConstantsLists";
import CustomBottomSheet from "./../../../components/general/CustomBottomSheet.vue";
import CustomSelectBox from "./../../../components/general/CustomSelectBox.vue";
import CustomBaseEntityFilter from "./../../../components/general/CustomBaseEntityFilter.vue";
import generalMixin from "./../../../utils/generalMixin";
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
      placeActivityTypeTokenOptions: getDialogOfPlaceActivityType() || [],
      filterData: this.theFilterData,
      userTypeTokenOptions: getDialogOfUserTypes(),
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
    checkPrivilege,
  },
};
</script>
