<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      :refName="'PriceQuotationAffiliateOperationInfo'"
      size="xl"
      :headerText="$t('PriceQuotationAffiliateOperations.data')"
      :headerIcon="priceQuotationAffiliateOperation.icon"
      @opened="getDetails()"
    >
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <div v-else class="row">
        <DataLabelGroup
          :className="'col-md-6'"
          :value="priceQuotationAffiliateOperation.fullCode"
          :title="$t('PriceQuotationAffiliateOperations.code')"
          :imgName="'code.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            priceQuotationAffiliateOperation.priceQuotationAffiliateOperationTitleAr
          "
          :title="$t('PriceQuotationAffiliateOperations.titleAr')"
          :imgName="'PriceQuotationAffiliateOperations.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            priceQuotationAffiliateOperation.priceQuotationAffiliateOperationTitleEn
          "
          :title="$t('PriceQuotationAffiliateOperations.titleEn')"
          :imgName="'PriceQuotationAffiliateOperations.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            priceQuotationAffiliateOperation.priceQuotationAffiliateOperationTitleUnd
          "
          :title="$t('PriceQuotationAffiliateOperations.titleUnd')"
          :imgName="'PriceQuotationAffiliateOperations.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            priceQuotationAffiliateOperation.priceQuotationAffiliateOperationDescriptionAr
          "
          :title="$t('PriceQuotationAffiliateOperations.descriptionAr')"
          :imgName="'description.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            priceQuotationAffiliateOperation.priceQuotationAffiliateOperationDescriptionEn
          "
          :title="$t('PriceQuotationAffiliateOperations.descriptionEn')"
          :imgName="'description.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            priceQuotationAffiliateOperation.priceQuotationAffiliateOperationDescriptionUnd
          "
          :title="$t('PriceQuotationAffiliateOperations.descriptionUnd')"
          :imgName="'description.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            priceQuotationAffiliateOperation.priceQuotationAffiliateOperationNotes
          "
          :title="$t('notes')"
          :imgName="'notes.svg'"
        />
        <DataLabelGroup
          v-if="priceQuotationAffiliateOperation.priceQuotationDetailsInfoData"
          :className="'col-md-12'"
          :value="
            priceQuotationAffiliateOperation.priceQuotationDetailsInfoData
              .priceQuotationDetailsNotes
          "
          :title="$t('PriceQuotationDetails.notes')"
          :imgName="'PriceQuotationDetails.svg'"
        />
      </div>
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../../components/general/ExceptionWithImg.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";
import { isDataExist } from "./../../../../utils/functions";
import PriceQuotationAffiliateOperationMixin from "./PriceQuotationAffiliateOperationMixin";

export default {
  mixins: [PriceQuotationAffiliateOperationMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomBottomSheet,
    DataLabelGroup,
  },
  methods: {
    isDataExist,
  },
};
</script>
