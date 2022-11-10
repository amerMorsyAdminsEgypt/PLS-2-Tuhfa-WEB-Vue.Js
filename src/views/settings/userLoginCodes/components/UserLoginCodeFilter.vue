<template>
  <CustomBottomSheet
    :refName="'filterSheet'"
    size="lg"
    :headerText="$t('filter')"
    :headerIcon="icon"
  >
    <!-- <div class="row">
      <CustomSelectBox
        :className="'col-md-12'"
        :id="'userTypeToken'"
        :value="filterData.userTypeToken"
        :options="userTypeTokenOptions"
        v-on:changeValue="filterData.userTypeToken = $event"
        :title="$t('Users.selectType')"
        :imgName="'type.svg'"
      />
    </div> -->
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
// import { getDialogOfUserTypes } from "./../../../../utils/dialogsOfConstantsLists";
// import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
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
      // userTypeTokenOptions: getDialogOfUserTypes(),
      icon,
    };
  },
  components: {
    CustomBottomSheet,
    CustomBaseEntityFilter,
    // CustomSelectBox,
  },
  methods: {
    search() {
      this.closeBottomSheet("filterSheet");
      this.$emit("search", this.filterData);
    },
  },
};
</script>
