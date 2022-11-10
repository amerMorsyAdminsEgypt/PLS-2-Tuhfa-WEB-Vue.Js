<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(
        countedServiceTransaction, index
      ) in countedServiceTransactionsData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="
        countedServiceTransaction.countedServiceTransactionDescriptionCurrent
      "
      :description="countedServiceTransaction.fullCode"
      :imagePath="countedServiceTransaction.countedServiceTransactionImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setCountedServiceTransactionData(countedServiceTransaction);
            openBottomSheet('CountedServiceTransactionInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setCountedServiceTransactionData(countedServiceTransaction);
            openBottomSheet('CountedServiceTransactionQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>

      <li>
        <button
          @click="
            setCountedServiceTransactionData(countedServiceTransaction);
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
// import { hasCountedServiceTransactionReport } from "./../../../../utils/privilegeHelper";
import CustomCard from "./../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["countedServiceTransactionsData", "filterData", "defaultImg"],
  methods: {
    setCountedServiceTransactionData(countedServiceTransaction) {
      this.$emit("setCountedServiceTransactionData", countedServiceTransaction);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
  },
};
</script>
