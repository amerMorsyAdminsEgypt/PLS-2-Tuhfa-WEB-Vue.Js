<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      :refName="'PriceQuotationDetailInfo'"
      size="xl"
      :headerText="$t('PriceQuotationDetails.data')"
      :headerIcon="priceQuotationDetailModel.icon"
      @opened="getDetails()"
    >
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <template v-else>
        <template v-if="priceQuotationDetailModel.priceQuotationDetailsToken">
          <div class="row">
            <DataLabelGroup
              :className="'col-md-6'"
              :value="priceQuotationDetailModel.fullCode"
              :title="$t('PriceQuotationDetails.code')"
              :imgName="'code.svg'"
            />
            <DataLabelGroup
              :className="'col-md-6'"
              :value="priceQuotationDetailModel.totalFinalPriceWithCurrency"
              :title="$t('price')"
              :imgName="'money.svg'"
            />
            <DataLabelGroup
              :className="'col-md-6'"
              :value="priceQuotationDetailModel.priceQuotationDetailsNotes"
              :title="$t('notes')"
              :imgName="'notes.svg'"
            />
            <DataLabelGroup
              :className="'col-md-6'"
              :value="
                priceQuotationDetailModel.quotationDetailsHistoryWorkTypeNameCurrent
              "
              :title="$t('type')"
              :imgName="'type.svg'"
            />
            <DataLabelGroup
              :className="'col-md-12'"
              :value="
                priceQuotationDetailModel.affiliateOperationTypeNameCurrent
              "
              :title="$t('PriceQuotations.details.AffiliateOperation')"
              :imgName="'type.svg'"
            />
          </div>
          <div class="my-card row">
            <span class="my-card-title">{{ $t("PriceQuotations.data") }}</span>

            <DataLabelGroup
              :className="'col-md-12'"
              :value="
                priceQuotationDetailModel.priceQuotationInfoData
                  .priceQuotationNameCurrent
              "
              :title="$t('PriceQuotations.name')"
              :imgName="'PriceQuotations.svg'"
            />
            <DataLabelGroup
              :className="'col-md-6'"
              :value="priceQuotationDetailModel.priceQuotationInfoData.fullCode"
              :title="$t('PriceQuotations.code')"
              :imgName="'code.svg'"
            />
            <DataLabelGroup
              :className="'col-md-6'"
              :value="
                priceQuotationDetailModel.priceQuotationInfoData
                  .priceQuotationDescriptionCurrent
              "
              :title="$t('PriceQuotations.description')"
              :imgName="'description.svg'"
            />
            <DataLabelGroup
              :className="'col-md-6'"
              :value="
                priceQuotationDetailModel.priceQuotationInfoData
                  .priceQuotationHistoryWorkTypeNameCurrnet
              "
              :title="$t('type')"
              :imgName="'type.svg'"
            />
            <DataLabelGroup
              :className="'col-md-6'"
              :value="
                priceQuotationDetailModel.priceQuotationInfoData
                  .requestPlaceInfoData.placeNameCurrent
              "
              :title="$t('PriceQuotations.clientName')"
              :imgName="'places.svg'"
            />
          </div>
          <div class="my-card">
            <span class="my-card-title">{{ $t("StoreItems.data") }}</span>
            <div class="row">
              <DataLabelGroup
                :className="'col-md-6'"
                :value="
                  priceQuotationDetailModel.storeItemInfoData
                    .storeItemNameCurrent
                "
                :title="$t('StoreItems.name')"
                :imgName="'StoreItems.svg'"
              />
              <DataLabelGroup
                :className="'col-md-6'"
                :value="priceQuotationDetailModel.storeItemQuantity"
                :title="$t('StoreItems.quantity')"
                :imgName="'StoreItems.svg'"
              />
            </div>
            <template
              v-if="priceQuotationDetailModel.storeItemPropertyTypesData.length"
            >
              <div class="my-card">
                <span class="my-card-title">{{
                  $t("PropertyTypes.modelName")
                }}</span>

                <div
                  class=""
                  v-for="(
                    item, index
                  ) in priceQuotationDetailModel.storeItemPropertyTypesData"
                  :key="index"
                >
                  <div class="row">
                    <DataLabelGroup
                      :className="'col-md-12'"
                      :value="item.propertyTypeNameCurrent"
                      :title="$t('PropertyTypes.name')"
                      :imgName="'PropertyTypes.svg'"
                    />
                  </div>
                  <div
                    class="table-container"
                    v-if="item.propertyDetailsData.length"
                  >
                    <table class="my-table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>{{ $t("PropertyTypes.listItems.name") }}</th>
                          <th>{{ $t("general.value") }}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(itemP, indexP) in item.propertyDetailsData"
                          :key="indexP"
                        >
                          <td>{{ ++indexP }}</td>
                          <td>{{ isDataExist(itemP.propertyNameCurrent) }}</td>
                          <td>
                            {{
                              isDataExist(
                                itemP.propertyFieldDefaultValueCurrent
                              )
                            }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </template>
          </div>

          <LastMoveHistory
            :lastPriceQuotationHistoryWorkInfoData="
              priceQuotationDetailModel.lastPriceQuotationHistoryWorkInfoData
            "
          />
        </template>
      </template>
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../../components/general/ExceptionWithImg.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";
import LastMoveHistory from "./../../priceQuotations/components/LastMoveHistory.vue";
import { isDataExist } from "./../../../../utils/functions";
import PriceQuotationDetailMixin from "./PriceQuotationDetailMixin";

export default {
  mixins: [PriceQuotationDetailMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomBottomSheet,
    DataLabelGroup,
    LastMoveHistory,
  },
  methods: {
    isDataExist,
  },
};
</script>
