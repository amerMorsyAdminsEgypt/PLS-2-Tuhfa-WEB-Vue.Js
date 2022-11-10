<template>
  <div v-if="priceQuotationDetailsData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th>#</th>
          <th>{{ $t("PriceQuotationDetails.code") }}</th>
          <th>{{ $t("PriceQuotations.details.AffiliateOperation") }}</th>
          <th>{{ $t("PriceQuotations.code") }}</th>
          <th>{{ $t("PriceQuotations.clientName") }}</th>
          <th>{{ $t("StoreItems.code") }}</th>
          <th>{{ $t("StoreItems.name") }}</th>
          <th><i class="fas fa-sliders-h"></i></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(priceQuotationDetail, index) in priceQuotationDetailsData"
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>{{ isDataExist(priceQuotationDetail.fullCode) }}</td>
          <td>
            {{
              isDataExist(
                priceQuotationDetail.affiliateOperationTypeNameCurrent
              )
            }}
          </td>
          <td>
            {{
              isDataExist(priceQuotationDetail.priceQuotationInfoData.fullCode)
            }}
          </td>
          <td>
            {{
              isDataExist(
                priceQuotationDetail.priceQuotationInfoData.requestPlaceInfoData
                  .placeNameCurrent
              )
            }}
          </td>
          <td>
            {{ isDataExist(priceQuotationDetail.storeItemInfoData.fullCode) }}
          </td>
          <td>
            {{
              isDataExist(
                priceQuotationDetail.storeItemInfoData.storeItemNameCurrent
              )
            }}
          </td>

          <td class="fmenu-item-container">
            <FloatingMenu>
              <li
                v-if="
                  checkPrivilege(hasPriceQuotationAffiliateOperation()) &&
                  priceQuotationDetail.quotationDetailsHistoryWorkTypeToken ==
                    QUOTATION_DETAILS_HISTORY_WORK_TYPES.WorkProgres
                "
              >
                <router-link
                  :to="{
                    name: 'PriceQuotationAffiliateOperations',
                    params: {
                      priceQuotationDetailsToken:
                        priceQuotationDetail.priceQuotationDetailsToken,
                    },
                  }"
                  :title="$t('PriceQuotationAffiliateOperations.modelName')"
                >
                  <img
                    src="@/assets/images/PriceQuotationAffiliateOperations.svg"
                  />
                </router-link>
              </li>
              <li>
                <button
                  @click="
                    setPriceQuotationDetailData(priceQuotationDetail);
                    openBottomSheet('PriceQuotationDetailInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setPriceQuotationDetailData(priceQuotationDetail);
                    openBottomSheet('PriceQuotationDetailQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="hasPriceQuotationDetailMoveTo">
                <button
                  v-b-modal.PriceQuotationDetailMove
                  :title="$t('PriceQuotationDetails.moveTo')"
                  @click="setPriceQuotationDetailData(priceQuotationDetail)"
                >
                  <img src="@/assets/images/EducationalGroupTransfers.svg" />
                </button>
              </li>
            </FloatingMenu>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { isDataExist } from "./../../../../utils/functions";

import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import { hasPriceQuotationAffiliateOperation } from "./../../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../../utils/functions";
import { QUOTATION_DETAILS_HISTORY_WORK_TYPES } from "./../../../../utils/constantLists";
import generalMixin from "./../../../../utils/generalMixin";
// import PriceQuotationDetailMixin from "./PriceQuotationDetailMixin";

export default {
  name: "PriceQuotationDetailsTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: [
    "priceQuotationDetailsData",
    "filterData",
    "defaultImg",
    "hasPriceQuotationDetailMoveTo",
  ],
  data() {
    return {
      QUOTATION_DETAILS_HISTORY_WORK_TYPES,
    };
  },
  methods: {
    setPriceQuotationDetailData(priceQuotationDetail) {
      this.$emit("setPriceQuotationDetailData", priceQuotationDetail);
    },

    isDataExist,
    checkPrivilege,
    hasPriceQuotationAffiliateOperation,
  },
};
</script>
