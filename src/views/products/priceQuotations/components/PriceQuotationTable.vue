<template>
  <div v-if="priceQuotationsData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th>#</th>
          <th>{{ $t("PriceQuotations.code") }}</th>
          <th>{{ $t("PriceQuotations.clientName") }}</th>
          <th>{{ $t("ConstantsListSelect.ReportTemplatesName") }}</th>
          <th><i class="fas fa-sliders-h"></i></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(priceQuotation, index) in priceQuotationsData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>{{ isDataExist(priceQuotation.fullCode) }}</td>
          <td>
            {{
              isDataExist(
                priceQuotation.requestPlaceInfoData
                  ? priceQuotation.requestPlaceInfoData.placeNameCurrent
                  : ""
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                priceQuotation.reportTemplateInfoData
                  ? priceQuotation.reportTemplateInfoData
                      .reportTemplateNameCurrent
                  : ""
              )
            }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li
                v-if="
                  checkPrivilege(hasPriceQuotationJobOrderAdd()) &&
                  priceQuotation.priceQuotationHistoryWorkTypeToken ==
                    PRICE_QUOTATION_HISTORY_WORK_TYPES.AcceptQuotesFormCustomer
                "
              >
                <button
                  @click="
                    setPriceQuotationData(priceQuotation);
                    openBottomSheet('PriceQuotationJobOrderAdd');
                  "
                  :title="$t('PriceQuotationJobOrders.add')"
                >
                  <img src="@/assets/images/plus.svg" />
                </button>
              </li>
              <li
                v-if="
                  checkPrivilege(
                    hasPriceQuotationSendPriceQuotationToClient()
                  ) &&
                  (priceQuotation.priceQuotationHistoryWorkTypeToken ==
                    PRICE_QUOTATION_HISTORY_WORK_TYPES.WaitingForQuotes ||
                    priceQuotation.priceQuotationHistoryWorkTypeToken ==
                      PRICE_QUOTATION_HISTORY_WORK_TYPES.RejectedQuotesFormCustomer)
                "
              >
                <button
                  @click="
                    setPriceQuotationData(priceQuotation);
                    openBottomSheet('SendPriceQuotationToClient');
                  "
                  :title="$t('PriceQuotations.sendToClient')"
                >
                  <img src="@/assets/images/sendToClient.svg" />
                </button>
              </li>
              <li
                v-if="
                  checkPrivilege(hasPriceQuotationResendPriceQuotations()) &&
                  priceQuotation.priceQuotationHistoryWorkTypeToken ==
                    PRICE_QUOTATION_HISTORY_WORK_TYPES.WaitingForCustomerAccept
                "
              >
                <button
                  @click="
                    setPriceQuotationData(priceQuotation);
                    openBottomSheet('ResendPriceQuotationToClient');
                  "
                  :title="$t('PriceQuotations.resendToClient')"
                >
                  <img src="@/assets/images/email.svg" />
                </button>
              </li>
              <li v-if="hasPriceQuotationMoveTo">
                <button
                  v-b-modal.PriceQuotationMove
                  :title="$t('PriceQuotations.moveTo')"
                  @click="setPriceQuotationData(priceQuotation)"
                >
                  <img src="@/assets/images/EducationalGroupTransfers.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setPriceQuotationData(priceQuotation);
                    openBottomSheet('PriceQuotationReport');
                  "
                  :title="$t('PriceQuotations.report')"
                >
                  <img src="@/assets/images/reports.svg" />
                </button>
              </li>
              <li>
                <router-link
                  :to="{
                    name: 'PriceQuotationInfo',
                    params: { token: priceQuotation.priceQuotationToken },
                  }"
                  :title="$t('PriceQuotationsInfo.modelName')"
                >
                  <img src="@/assets/images/PriceQuotations.svg" />
                </router-link>
              </li>
              <li>
                <button
                  @click="
                    setPriceQuotationData(priceQuotation);
                    openBottomSheet('PriceQuotationInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setPriceQuotationData(priceQuotation);
                    openBottomSheet('PriceQuotationQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setPriceQuotationData(priceQuotation);
                    openBottomSheet('ActionsData');
                  "
                  :title="$t('actionsData.modelName')"
                >
                  <img src="@/assets/images/actions-data.svg" />
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
import { checkPrivilege, isDataExist } from "./../../../../utils/functions";
import {
  hasPriceQuotationSendPriceQuotationToClient,
  hasPriceQuotationResendPriceQuotations,
  hasPriceQuotationJobOrderAdd,
} from "./../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import { PRICE_QUOTATION_HISTORY_WORK_TYPES } from "./../../../../utils/constantLists";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "PriceQuotationsTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: [
    "priceQuotationsData",
    "filterData",
    "defaultImg",
    "hasPriceQuotationMoveTo",
  ],
  data() {
    return {
      PRICE_QUOTATION_HISTORY_WORK_TYPES,
    };
  },
  methods: {
    setPriceQuotationData(priceQuotation) {
      this.$emit("setPriceQuotationData", priceQuotation);
    },
    checkPrivilege,
    isDataExist,
    hasPriceQuotationSendPriceQuotationToClient,
    hasPriceQuotationResendPriceQuotations,
    hasPriceQuotationJobOrderAdd,
  },
};
</script>
