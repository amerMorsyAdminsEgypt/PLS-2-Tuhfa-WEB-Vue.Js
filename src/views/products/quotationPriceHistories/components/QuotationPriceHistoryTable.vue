<template>
  <div v-if="quotationPriceHistoriesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th rowspan="2">{{ $t("QuotationPriceHistories.code") }}</th>
          <th rowspan="2">{{ $t("Places.name") }}</th>
          <!-- <th colspan="3">{{ $t("StoreItems.data") }}</th> -->
          <th colspan="2">{{ $t("StoreItems.price.price") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <!-- <th>{{ $t("general.code") }}</th>
          <th>{{ $t("general.name") }}</th>
          <th>{{ $t("general.quantity") }}</th> -->
          <th>{{ $t("StoreItems.price.total") }}</th>
          <th>{{ $t("StoreItems.price.one") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in quotationPriceHistoriesData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>{{ isDataExist(item.fullCode) }}</td>
          <td>
            {{
              isDataExist(
                item.placeInfoData ? item.placeInfoData.placeNameCurrent : ""
              )
            }}
          </td>
          <!-- <td>{{ isDataExist(item.priceQuotationDetailsInfoData && item.priceQuotationDetailsInfoData.storeItemInfoData ? item.priceQuotationDetailsInfoData.storeItemInfoData.fullCode : "") }}</td>
          <td>{{ isDataExist(item.priceQuotationDetailsInfoData && item.priceQuotationDetailsInfoData.storeItemInfoData ? item.priceQuotationDetailsInfoData.storeItemInfoData.storeItemNameCurrent : "") }}</td>
          <td>{{ isDataExist(item.totalItemsQuantity) }}</td> -->
          <td>{{ isDataExist(item.totalItemsAmountWithCurrency) }}</td>
          <td>{{ isDataExist(item.storeItemAmountWithCurrency) }}</td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setQuotationPriceHistoryData(item);
                    openBottomSheet('QuotationPriceHistoryInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setQuotationPriceHistoryData(item);
                    openBottomSheet('QuotationPriceHistoryQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasQuotationPriceHistoryEdit())">
                <button
                  @click="
                    setQuotationPriceHistoryData(item);
                    openBottomSheet('QuotationPriceHistoryUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasQuotationPriceHistoryFinaleDelete())">
                <button
                  v-b-modal.QuotationPriceHistoryDelete
                  :title="$t('delete')"
                  @click="setQuotationPriceHistoryData(item)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setQuotationPriceHistoryData(item);
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
  hasQuotationPriceHistoryEdit,
  hasQuotationPriceHistoryFinaleDelete,
} from "./../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "QuotationPriceHistoryTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["quotationPriceHistoriesData", "filterData"],
  methods: {
    setQuotationPriceHistoryData(item) {
      this.$emit("setQuotationPriceHistoryData", item);
    },
    checkPrivilege,
    isDataExist,
    hasQuotationPriceHistoryEdit,
    hasQuotationPriceHistoryFinaleDelete,
  },
};
</script>
