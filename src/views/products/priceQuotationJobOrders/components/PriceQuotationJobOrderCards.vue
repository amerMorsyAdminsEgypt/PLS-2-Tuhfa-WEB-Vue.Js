<template>
  <div v-if="priceQuotationJobOrdersData" class="row custom-cards">
    <CustomCard
      v-for="(priceQuotationJobOrder, index) in priceQuotationJobOrdersData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="priceQuotationJobOrder.priceQuotationJobOrderNameCurrent"
      :description="priceQuotationJobOrder.fullCode"
      :imagePath="priceQuotationJobOrder.priceQuotationJobOrderImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          @click="
            setPriceQuotationJobOrderData(priceQuotationJobOrder);
            openBottomSheet('PriceQuotationJobOrderInfo');
          "
          :title="$t('info')"
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setPriceQuotationJobOrderData(priceQuotationJobOrder);
            openBottomSheet('PriceQuotationJobOrderQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasPriceQuotationJobOrderEdit())">
        <button
          @click="
            setPriceQuotationJobOrderData(priceQuotationJobOrder);
            openBottomSheet('PriceQuotationJobOrderUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="hasPriceQuotationJobOrderMoveTo">
        <button
          v-b-modal.PriceQuotationJobOrderMove
          :title="$t('PriceQuotationJobOrders.moveTo')"
          @click="setPriceQuotationJobOrderData(priceQuotationJobOrder)"
        >
          <img src="@/assets/images/EducationalGroupTransfers.svg" />
        </button>
      </li>
    </CustomCard>
  </div>
</template>

<script>
import { isDataExist } from "./../../../../utils/functions";
import CustomCard from "./../../../../components/general/CustomCard.vue";
import { hasPriceQuotationJobOrderEdit } from "./../../../../utils/privilegeHelper";
import {
  checkPrivilege,
  fullPathFileFromServer,
} from "./../../../../utils/functions";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "PriceQuotationJobOrdersCards",
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: [
    "priceQuotationJobOrdersData",
    "filterData",
    "defaultImg",
    "hasPriceQuotationJobOrderMoveTo",
  ],
  data() {
    return {};
  },
  methods: {
    setPriceQuotationJobOrderData(priceQuotationJobOrder) {
      this.$emit("setPriceQuotationJobOrderData", priceQuotationJobOrder);
    },

    isDataExist,
    checkPrivilege,
    fullPathFileFromServer,
    hasPriceQuotationJobOrderEdit,
  },
};
</script>
