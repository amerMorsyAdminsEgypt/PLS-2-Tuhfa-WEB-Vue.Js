<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(debt, index) in debtsData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="debt.debtTitleCurrent"
      :description="''"
      :imagePath="defaultImg"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setDebtData(debt);
            openBottomSheet('DebtInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>

      <li>
        <button
          @click="
            setDebtData(debt);
            openBottomSheet('ActionsData');
          "
          :title="$t('actionsData.modelName')"
        >
          <img src="@/assets/images/actions-data.svg" />
        </button>
      </li>
    </CustomCard>
  </div>
</template>

<script>
import {
  checkPrivilege,
  isDataExist,
  fullPathFileFromServer,
} from "./../../../../utils/functions";
import CustomCard from "./../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["debtsData", "filterData", "defaultImg"],
  methods: {
    setDebtData(debt) {
      this.$emit("setDebtData", debt);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
  },
};
</script>
