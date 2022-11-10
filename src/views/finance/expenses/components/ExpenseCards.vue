<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(expense, index) in expensesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="expense.expensesDescriptionCurrent"
      :description="expense.fullCode"
      :imagePath="expense.expenseImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setExpenseData(expense);
            openBottomSheet('ExpenseInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setExpenseData(expense);
            openBottomSheet('ExpenseQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasExpenseRefund()) && ableToRefund(expense)">
        <button
          @click="
            setExpenseData(expense);
            openBottomSheet('ExpenseRefund');
          "
          :title="$t('refund')"
        >
          <img src="@/assets/images/refund.svg" />
        </button>
      </li>

      <li>
        <button
          @click="
            setExpenseData(expense);
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
import { hasExpenseRefund } from "./../../../../utils/privilegeHelper";
import CustomCard from "./../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../utils/generalMixin";
import { REFUND_TYPE_TOKENS } from "./../../../../utils/constantLists";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["expensesData", "filterData", "defaultImg"],
  methods: {
    setExpenseData(expense) {
      this.$emit("setExpenseData", expense);
    },
    ableToRefund(expense) {
      if (expense.expensesRefundTypeToken == REFUND_TYPE_TOKENS.NotRefunded) {
        return true;
      } else {
        return false;
      }
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasExpenseRefund,
  },
};
</script>
