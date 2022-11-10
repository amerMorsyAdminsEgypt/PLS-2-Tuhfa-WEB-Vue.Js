<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      :refName="'PriceQuotationJobOrderInfo'"
      size="xl"
      :headerText="$t('PriceQuotationJobOrders.data')"
      :headerIcon="priceQuotationJobOrder.icon"
    >
      <!-- @opened="getDetails()" -->
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <template v-else>
        <div class="row">
          <DataLabelGroup
            :className="'col-md-6'"
            :value="priceQuotationJobOrder.fullCode"
            :title="$t('PriceQuotationJobOrders.code')"
            :imgName="'code.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="priceQuotationJobOrder.priceQuotationJobOrderNameCurrent"
            :title="$t('general.name')"
            :imgName="'PriceQuotationJobOrders.svg'"
          />

          <DataLabelGroup
            :className="'col-md-6'"
            :value="priceQuotationJobOrder.priceQuotationJobOrderDescriptionAr"
            :title="$t('PriceQuotationJobOrders.descriptionAr')"
            :imgName="'description.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="priceQuotationJobOrder.priceQuotationJobOrderDescriptionEn"
            :title="$t('PriceQuotationJobOrders.descriptionEn')"
            :imgName="'description.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="priceQuotationJobOrder.priceQuotationJobOrderDescriptionUnd"
            :title="$t('PriceQuotationJobOrders.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="
              priceQuotationJobOrder.priceQuotationInfoData.requestPlaceInfoData
                .placeNameCurrent
            "
            :title="$t('clientName')"
            :imgName="'man.svg'"
          />

          <DataLabelGroup
            :className="'col-md-6'"
            :value="
              formateDateTimeLang(
                priceQuotationJobOrder.startWorkDate,
                priceQuotationJobOrder.startWorkTime
              )
            "
            :title="$t('PriceQuotationJobOrders.startWorkDateTime')"
            :imgName="'dateAndTime.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="
              formateDateTimeLang(
                priceQuotationJobOrder.expectedFinishWorkDate,
                priceQuotationJobOrder.expectedFinishWorkTime
              )
            "
            :title="$t('PriceQuotationJobOrders.expectedFinishWorkDateTime')"
            :imgName="'dateAndTime.svg'"
          />
          <DataLabelGroup
            :className="'col-md-12'"
            :value="
              priceQuotationJobOrder.priceQuotationInfoData
                .priceQuotationNameCurrent
            "
            :title="$t('PriceQuotations.name')"
            :imgName="'PriceQuotations.svg'"
          />
        </div>
      </template>
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../../components/general/ExceptionWithImg.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";
import {
  isDataExist,
  formateDateTimeLang,
} from "./../../../../utils/functions";
import generalMixin from "./../../../../utils/generalMixin";
// import PriceQuotationJobOrderlMixin from "./PriceQuotationJobOrderlMixin";

export default {
  mixins: [generalMixin],
  props: ["priceQuotationJobOrder"],
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomBottomSheet,
    DataLabelGroup,
  },
  methods: {
    isDataExist,
    formateDateTimeLang,
  },
};
</script>
