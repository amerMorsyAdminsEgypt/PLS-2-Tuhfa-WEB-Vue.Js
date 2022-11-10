<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(installmentPayment, index) in installmentPaymentsData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="installmentPayment.installmentPaymentNameCurrent"
      :description="installmentPayment.fullCode"
      :imagePath="installmentPayment.installmentPaymentImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setInstallmentPaymentData(installmentPayment);
            openBottomSheet('InstallmentPaymentInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setInstallmentPaymentData(installmentPayment);
            openBottomSheet('InstallmentPaymentQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li
        v-if="
          checkPrivilege(hasInstallmentPaymentRefund()) &&
          installmentPayment.refundTypeToken == REFUND_TYPE_TOKENS.NotRefunded
        "
      >
        <button
          @click="
            setInstallmentPaymentData(installmentPayment);
            openBottomSheet('InstallmentPaymentRefund');
          "
          :title="$t('refund')"
        >
          <img src="@/assets/images/refund.svg" />
        </button>
      </li>

      <li>
        <button
          @click="
            setInstallmentPaymentData(installmentPayment);
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
import { hasInstallmentPaymentRefund } from "./../../../../utils/privilegeHelper";
import CustomCard from "./../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../utils/generalMixin";
import { REFUND_TYPE_TOKENS } from "./../../../../utils/constantLists";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["installmentPaymentsData", "filterData", "defaultImg"],
  data() {
    return {
      REFUND_TYPE_TOKENS: REFUND_TYPE_TOKENS,
    };
  },
  methods: {
    setInstallmentPaymentData(installmentPayment) {
      this.$emit("setInstallmentPaymentData", installmentPayment);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasInstallmentPaymentRefund,
  },
};
</script>
