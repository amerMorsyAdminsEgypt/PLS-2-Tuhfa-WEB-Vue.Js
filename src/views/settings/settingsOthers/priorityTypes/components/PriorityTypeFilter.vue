<template>
  <CustomBottomSheet
    :refName="'filterSheet'"
    size="lg"
    :headerText="$t('filter')"
    :headerIcon="icon"
  >
    <div class="row">
      <CustomSelectBox
        :className="'col-md-6'"
        :id="`priorityScopeTypeToken`"
        :value="filterData.priorityScopeTypeToken"
        :options="priorityScopeTypeTokenOptions"
        v-on:changeValue="filterData.priorityScopeTypeToken = $event"
        :title="$t('PriorityTypes.type')"
        :imgName="'type.svg'"
      />
      <CustomSelectBox
        :className="'col-md-6'"
        :id="`colorToken`"
        :value="filterData.colorToken"
        :options="colorTokenOptions"
        v-on:changeValue="filterData.colorToken = $event"
        :title="$t('Colors.select')"
        :imgName="'colors.svg'"
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
import apiColor from "./../../../../../api/settings/settingsOthers/colors";
import { STATUS, BASE_URL } from "./../../../../../utils/constants";
import { getDialogOfPriorityScopeType } from "./../../../../../utils/dialogsOfConstantsLists";
import Colors from "./../../../../../models/settings/settingsOthers/colors/Colors";

export default {
  mixins: [generalMixin],
  props: {
    theFilterData: {
      type: Object,
    },
  },
  data() {
    return {
      priorityScopeTypeTokenOptions: getDialogOfPriorityScopeType(),
      colorTokenOptions: [],
      colors: new Colors(),
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
    async getColorsDialog() {
      this.isLoading = true;
      let options = [];
      try {
        const response = await apiColor.getDialog(this.colors.filterData);
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            options.push({
              value: itemsData[item]["itemToken"],
              text: itemsData[item]["itemName"],
              image: itemsData[item]["itemImagePath"]
                ? BASE_URL + itemsData[item]["itemImagePath"]
                : this.colors.color.defaultImg,
            });
          }
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          options.push({
            value: "",
            text: response.data.msg,
            image: this.colors.color.defaultImg,
          });
        }
      } catch (error) {
        options.push({
          value: "",
          text: this.$t("errorCatch"),
          image: this.colors.color.defaultImg,
        });
      }
      this.colorTokenOptions = options;
      this.isLoading = false;
    },
    search() {
      this.closeBottomSheet("filterSheet");
      this.$emit("search", this.filterData);
    },
  },
  created() {
    this.getColorsDialog();
  },
};
</script>
