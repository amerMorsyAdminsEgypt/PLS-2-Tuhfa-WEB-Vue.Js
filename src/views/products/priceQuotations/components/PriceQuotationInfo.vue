<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      :refName="'PriceQuotationInfo'"
      size="xl"
      :headerText="$t('PriceQuotations.data')"
      :headerIcon="priceQuotation.icon"
      @opened="getDetails()"
    >
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <template v-else>
        <div class="row">
          <DataLabelGroup
            :className="'col-md-6'"
            :value="priceQuotation.fullCode"
            :title="$t('PriceQuotations.code')"
            :imgName="'code.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="
              priceQuotation.reportTemplateInfoData
                ? priceQuotation.reportTemplateInfoData
                    .reportTemplateNameCurrent
                : ''
            "
            :title="$t('ConstantsListSelect.ReportTemplatesName')"
            :imgName="'ReportTemplates.svg'"
          />

          <!-- <DataLabelGroup
          :className="'col-md-6'"
          :value="
            priceQuotation.requestPlaceInfoData
              ? priceQuotation.requestPlaceInfoData.placeTypeNameCurrent
              : ''
          "
          :title="$t('Places.placeType')"
          :imgName="'type.svg'"
        /> -->
          <DataLabelGroup
            :className="'col-md-12'"
            :value="
              priceQuotation.requestPlaceInfoData
                ? priceQuotation.requestPlaceInfoData.placeNameCurrent
                : ''
            "
            :title="$t('PriceQuotations.clientName')"
            :imgName="'places.svg'"
          />

          <DataLabelGroup
            :className="'col-md-6'"
            :value="priceQuotation.priceQuotationDescriptionAr"
            :title="$t('PriceQuotations.descriptionAr')"
            :imgName="'description.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="priceQuotation.priceQuotationDescriptionEn"
            :title="$t('PriceQuotations.descriptionEn')"
            :imgName="'description.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="priceQuotation.priceQuotationDescriptionUnd"
            :title="$t('PriceQuotations.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="priceQuotation.priceQuotationNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />
        </div>

        <div class="my-card">
          <span class="my-card-title">{{ $t("sales.data") }}</span>

          <SalesDataTable
            :SalesData="priceQuotation.priceQuotationUsersSalesData"
          />
        </div>

        <div class="my-card">
          <span class="my-card-title">{{
            $t("PriceQuotations.details.name")
          }}</span>

          <div
            v-if="priceQuotation.priceQuotationDetails.length == 0"
            class="my-card-no-content"
          >
            {{ $t("PriceQuotations.details.thereAreNoSlides") }}
          </div>
          <template v-else>
            <div
              class="my-card"
              v-for="(section, index) in priceQuotation.priceQuotationDetails"
              :key="index"
            >
              <span class="my-card-title">{{ index + 1 }}</span>

              <div class="row">
                <DataLabelGroup
                  :className="'col-md-6'"
                  :value="
                    section.storeItemInfoData
                      ? section.storeItemInfoData.storeItemNameCurrent
                      : ''
                  "
                  :title="$t('StoreItems.name')"
                  :imgName="'StoreItems.svg'"
                />
                <DataLabelGroup
                  :className="'col-md-6'"
                  :value="section.priceQuotationDetailsNotes"
                  :title="$t('notes')"
                  :imgName="'notes.svg'"
                />
                <DataLabelGroup
                  :className="'col-md-4'"
                  :value="section.storeItemQuantity"
                  :title="$t('StoreItems.quantity')"
                  :imgName="'number.svg'"
                />
                <DataLabelGroup
                  :className="'col-md-4'"
                  :value="section.affiliateOperationTypeNameCurrent"
                  :title="$t('PriceQuotations.details.AffiliateOperation')"
                  :imgName="'AffiliateOperationTypes.svg'"
                />
                <DataLabelGroup
                  :className="'col-md-4'"
                  :value="section.quotationDetailsHistoryWorkTypeNameCurrent"
                  :title="$t('status')"
                  :imgName="'type.svg'"
                />

                <PropertyTypesInfoTable
                  class="col-12"
                  :propertyTypesData="section.storeItemPropertyTypesData"
                />
              </div>
            </div>
          </template>
        </div>

        <LastMoveHistory
          :lastPriceQuotationHistoryWorkInfoData="
            priceQuotation.lastPriceQuotationHistoryWorkInfoData
          "
        />
      </template>
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../../components/general/ExceptionWithImg.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";
import SalesDataTable from "./SalesDataTable.vue";
import LastMoveHistory from "./LastMoveHistory.vue";
import PropertyTypesInfoTable from "./../../storeItems/components/PropertyTypesInfoTable.vue";
import PriceQuotationMixin from "./PriceQuotationMixin";

export default {
  mixins: [PriceQuotationMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomBottomSheet,
    DataLabelGroup,
    SalesDataTable,
    LastMoveHistory,
    PropertyTypesInfoTable,
  },
};
</script>
