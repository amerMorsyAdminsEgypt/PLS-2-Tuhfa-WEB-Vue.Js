<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(
        priceQuotationAffiliateOperation, index
      ) in priceQuotationAffiliateOperationsData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="
        priceQuotationAffiliateOperation.priceQuotationAffiliateOperationTitleCurrent
      "
      :description="priceQuotationAffiliateOperation.fullCode"
      :imagePath="
        priceQuotationAffiliateOperation.priceQuotationAffiliateOperationImagePath
      "
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setPriceQuotationAffiliateOperationData(
              priceQuotationAffiliateOperation
            );
            openBottomSheet('PriceQuotationAffiliateOperationInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setPriceQuotationAffiliateOperationData(
              priceQuotationAffiliateOperation
            );
            openBottomSheet('PriceQuotationAffiliateOperationQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasPriceQuotationAffiliateOperationEdit())">
        <button
          @click="
            setPriceQuotationAffiliateOperationData(
              priceQuotationAffiliateOperation
            );
            openBottomSheet('PriceQuotationAffiliateOperationUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li
        v-if="checkPrivilege(hasPriceQuotationAffiliateOperationFinaleDelete())"
      >
        <button
          v-b-modal.PriceQuotationAffiliateOperationDelete
          :title="$t('delete')"
          @click="
            setPriceQuotationAffiliateOperationData(
              priceQuotationAffiliateOperation
            )
          "
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li
        v-if="
          checkPrivilege(
            hasPriceQuotationAffiliateOperationChangeActivationType()
          )
        "
      >
        <button
          v-b-modal.PriceQuotationAffiliateOperationChangeActivationType
          :title="$t('changeActivationType')"
          @click="
            setPriceQuotationAffiliateOperationData(
              priceQuotationAffiliateOperation
            )
          "
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setPriceQuotationAffiliateOperationData(
              priceQuotationAffiliateOperation
            );
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
import {
  hasPriceQuotationAffiliateOperationEdit,
  hasPriceQuotationAffiliateOperationFinaleDelete,
  hasPriceQuotationAffiliateOperationChangeActivationType,
} from "./../../../../utils/privilegeHelper";
import CustomCard from "./../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../utils/generalMixin";
import generalSettingsMixin from "./../../../../utils/generalSettingsMixin";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    CustomCard,
  },
  props: ["priceQuotationAffiliateOperationsData", "filterData", "defaultImg"],
  methods: {
    setPriceQuotationAffiliateOperationData(priceQuotationAffiliateOperation) {
      this.$emit(
        "setPriceQuotationAffiliateOperationData",
        priceQuotationAffiliateOperation
      );
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasPriceQuotationAffiliateOperationEdit,
    hasPriceQuotationAffiliateOperationFinaleDelete,
    hasPriceQuotationAffiliateOperationChangeActivationType,
  },
};
</script>
