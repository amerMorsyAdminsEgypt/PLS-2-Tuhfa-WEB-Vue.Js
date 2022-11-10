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
        :id="`userToken`"
        :value="filterData.userToken"
        :options="userTokenOptions"
        v-on:changeValue="filterData.userToken = $event"
        :title="$t('students.name')"
        :imgName="'user.svg'"
      />

      <CustomSelectBox
        :className="'col-md-6'"
        :id="`debtTypeToken`"
        :value="filterData.debtTypeToken"
        :options="debtTypeTokenOptions"
        v-on:changeValue="filterData.debtTypeToken = $event"
        :title="$t('general.type')"
        :imgName="'type.svg'"
      />
      <CustomInputFloat
        :className="'col-md-6'"
        :id="`debtMoneyFrom`"
        :value="filterData.debtMoneyFrom"
        v-on:changeValue="filterData.debtMoneyFrom = $event"
        :title="$t('general.valueFrom')"
        :imgName="'money.svg'"
      />
      <CustomInputFloat
        :className="'col-md-6'"
        :id="`debtMoneyTo`"
        :value="filterData.debtMoneyTo"
        v-on:changeValue="filterData.debtMoneyTo = $event"
        :title="$t('general.valueTo')"
        :imgName="'money.svg'"
      />
      <CustomInputFloat
        :className="'col-md-6'"
        :id="`paidMoneyFrom`"
        :value="filterData.paidMoneyFrom"
        v-on:changeValue="filterData.paidMoneyFrom = $event"
        :title="$t('general.paidFrom')"
        :imgName="'money.svg'"
      />
      <CustomInputFloat
        :className="'col-md-6'"
        :id="`paidMoneyTo`"
        :value="filterData.paidMoneyTo"
        v-on:changeValue="filterData.paidMoneyTo = $event"
        :title="$t('general.paidTo')"
        :imgName="'money.svg'"
      />
      <CustomInputFloat
        :className="'col-md-6'"
        :id="`remainderMoneyFrom`"
        :value="filterData.remainderMoneyFrom"
        v-on:changeValue="filterData.remainderMoneyFrom = $event"
        :title="$t('general.remaindingFrom')"
        :imgName="'money.svg'"
      />
      <CustomInputFloat
        :className="'col-md-6'"
        :id="`remainderMoneyTo`"
        :value="filterData.remainderMoneyTo"
        v-on:changeValue="filterData.remainderMoneyTo = $event"
        :title="$t('general.remaindingTo')"
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
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import CustomInputFloat from "./../../../../components/general/CustomInputFloat.vue";
import CustomBaseEntityFilter from "./../../../../components/general/CustomBaseEntityFilter.vue";
import generalMixin from "./../../../../utils/generalMixin";
import icon from "@/assets/images/filter.svg";
import { USER_TYPE } from "./../../../../utils/constantLists";
import { getUsersDialog } from "./../../../../utils/dialogsOfApi";
import { getDialogOfDebtType } from "./../../../../utils/dialogsOfConstantsLists";

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
      userTokenOptions: [],
      debtTypeTokenOptions: getDialogOfDebtType(),
    };
  },
  components: {
    CustomBottomSheet,
    CustomSelectBox,
    CustomInputFloat,
    CustomBaseEntityFilter,
  },
  methods: {
    async getStudentsDialog() {
      this.isLoading = true;
      let params = {
        modelName: "students",
        userTypeToken: USER_TYPE.Student,
      };
      this.userTokenOptions = await getUsersDialog(params);
      this.isLoading = false;
    },
    search() {
      this.closeBottomSheet("filterSheet");
      this.$emit("search", this.filterData);
    },
  },
  created() {
    this.getStudentsDialog();
  },
};
</script>
