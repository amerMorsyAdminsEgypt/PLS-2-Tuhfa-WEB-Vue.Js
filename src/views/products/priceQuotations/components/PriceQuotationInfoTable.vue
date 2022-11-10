<template>
  <div v-if="priceQuotationDetails" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("StoreItems.data") }}</th>
          <th rowspan="2">{{ $t("general.quantity") }}</th>
          <th colspan="2">{{ $t("StoreItems.price.bestprice") }}</th>
          <th rowspan="2">{{ $t("status") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-md">{{ $t("general.name") }}</th>
          <th>{{ $t("StoreItems.price.total") }}</th>
          <th>{{ $t("StoreItems.price.one") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in priceQuotationDetails" :key="index">
          <td>{{ ++index }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  item.storeItemInfoData
                    ? item.storeItemInfoData.serviceImagePath
                    : '',
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>
            {{
              isDataExist(
                item.storeItemInfoData ? item.storeItemInfoData.fullCode : ""
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                item.storeItemInfoData
                  ? item.storeItemInfoData.storeItemNameCurrent
                  : ""
              )
            }}
          </td>
          <td>{{ isDataExist(item.storeItemQuantity) }}</td>
          <td>{{ isDataExist(item.bestPriceTotalItemsAmountWithCurrency) }}</td>
          <td>{{ isDataExist(item.bestPriceStoreItemAmountWithCurrency) }}</td>
          <td>
            {{
              isDataExist(
                item.lastPriceQuotationHistoryWorkInfoData
                  ? item.lastPriceQuotationHistoryWorkInfoData
                      .quotationDetailsHistoryWorkTypeNameCurrent
                  : ""
              )
            }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li v-if="checkPrivilege(hasQuotationPriceHistoryAdd())">
                <button
                  @click="
                    setStoreItemData(item);
                    openBottomSheet('QuotationPriceHistoryAdd');
                  "
                  :title="$t('QuotationPriceHistories.add')"
                >
                  <img src="@/assets/images/plus.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasQuotationPriceHistory())">
                <router-link
                  :to="{
                    name: 'QuotationPriceHistories',
                    params: {
                      priceQuotationDetailsToken:
                        item.priceQuotationDetailsToken,
                    },
                  }"
                  :title="$t('QuotationPriceHistories.modelName')"
                >
                  <img src="@/assets/images/QuotationPriceHistories.svg" />
                </router-link>
              </li>
              <li>
                <button
                  @click="
                    setStoreItemData(item);
                    openBottomSheet('PriceQuotationInfoPropertyTypesInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
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
import {
  checkPrivilege,
  isDataExist,
  fullPathFileFromServer,
} from "./../../../../utils/functions";
import {
  hasQuotationPriceHistory,
  hasQuotationPriceHistoryAdd,
} from "./../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "PriceQuotationInfoTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["priceQuotationDetails", "defaultImg"],
  methods: {
    setStoreItemData(item) {
      this.$emit("setStoreItemData", item);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasQuotationPriceHistory,
    hasQuotationPriceHistoryAdd,
  },
};
</script>
