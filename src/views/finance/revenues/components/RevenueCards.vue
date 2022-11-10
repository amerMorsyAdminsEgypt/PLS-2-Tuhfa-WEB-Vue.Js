<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(revenue, index) in revenuesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="revenue.revenueNameCurrent"
      :description="revenue.fullCode"
      :imagePath="revenue.revenueImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setRevenueData(revenue);
            openBottomSheet('RevenueInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setRevenueData(revenue);
            openBottomSheet('RevenueQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasRevenueRefund()) && ableToRefund(revenue)">
        <button
          @click="
            setRevenueData(revenue);
            openBottomSheet('RevenueRefund');
          "
          :title="$t('refund')"
        >
          <img src="@/assets/images/refund.svg" />
        </button>
      </li>

      <li>
        <button
          @click="
            setRevenueData(revenue);
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
import { hasRevenueRefund } from "./../../../../utils/privilegeHelper";
import CustomCard from "./../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../utils/generalMixin";
import { REFUND_TYPE_TOKENS } from "./../../../../utils/constantLists";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["revenuesData", "filterData", "defaultImg"],
  methods: {
    setRevenueData(revenue) {
      this.$emit("setRevenueData", revenue);
    },
    ableToRefund(revenue) {
      if (revenue.revenuesRefundTypeToken == REFUND_TYPE_TOKENS.NotRefunded) {
        return true;
      } else {
        return false;
      }
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasRevenueRefund,
  },
};
</script>
