<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(serviceEntitlement, index) in serviceEntitlementsData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="`${$t('Services.name')}: ${
        serviceEntitlement.serviceInfoData.serviceNameCurrent
      } - ${$t('general.value')}: ${
        serviceEntitlement.serviceEntitlementMoneyWithCurrency
      }`"
      :description="serviceEntitlement.fullCode"
      :imagePath="serviceEntitlement.serviceEntitlementImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setServiceEntitlementData(serviceEntitlement);
            openBottomSheet('ServiceEntitlementInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setServiceEntitlementData(serviceEntitlement);
            openBottomSheet('ServiceEntitlementQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li
        v-if="
          checkPrivilege(hasServiceEntitlementRefund()) &&
          serviceEntitlement.serviceEntitlementRefundTypeToken ==
            REFUND_TYPE_TOKENS.NotRefunded
        "
      >
        <button
          @click="
            setServiceEntitlementData(serviceEntitlement);
            openBottomSheet('ServiceEntitlementRefund');
          "
          :title="$t('refund')"
        >
          <img src="@/assets/images/refund.svg" />
        </button>
      </li>

      <li>
        <button
          @click="
            setServiceEntitlementData(serviceEntitlement);
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
import { hasServiceEntitlementRefund } from "./../../../../utils/privilegeHelper";
import CustomCard from "./../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../utils/generalMixin";
import { REFUND_TYPE_TOKENS } from "./../../../../utils/constantLists";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["serviceEntitlementsData", "filterData", "defaultImg"],
  data() {
    return {
      REFUND_TYPE_TOKENS: REFUND_TYPE_TOKENS,
    };
  },
  methods: {
    setServiceEntitlementData(serviceEntitlement) {
      this.$emit("setServiceEntitlementData", serviceEntitlement);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasServiceEntitlementRefund,
  },
};
</script>
