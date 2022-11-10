<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(accountTransaction, index) in accountTransactionsData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="accountTransaction.accountTransactionNameCurrent"
      :description="accountTransaction.fullCode"
      :imagePath="accountTransaction.accountTransactionImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setAccountTransactionData(accountTransaction);
            openBottomSheet('AccountTransactionInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setAccountTransactionData(accountTransaction);
            openBottomSheet('AccountTransactionQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasAccountTransactionReport())">
        <button
          @click="
            setAccountTransactionData(accountTransaction);
            openBottomSheet('AccountTransactionReportFilter');
          "
          :title="$t('Reports.accountTransactionsReport')"
        >
          <img src="@/assets/images/report.svg" />
        </button>
      </li>

      <li>
        <button
          @click="
            setAccountTransactionData(accountTransaction);
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
import { hasAccountTransactionReport } from "./../../../../utils/privilegeHelper";
import CustomCard from "./../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["accountTransactionsData", "filterData", "defaultImg"],
  methods: {
    setAccountTransactionData(accountTransaction) {
      this.$emit("setAccountTransactionData", accountTransaction);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasAccountTransactionReport,
  },
};
</script>
