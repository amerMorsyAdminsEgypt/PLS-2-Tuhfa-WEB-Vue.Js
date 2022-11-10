<template>
  <div v-if="priceQuotationJobOrdersData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("PriceQuotationJobOrders.data") }}</th>
          <th rowspan="2">{{ $t("PriceQuotations.code") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.code") }}</th>
          <th>{{ $t("general.image") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(priceQuotationJobOrder, index) in priceQuotationJobOrdersData"
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>{{ isDataExist(priceQuotationJobOrder.fullCode) }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  priceQuotationJobOrder.priceQuotationJobOrderImagePath,
                  priceQuotationJobOrder.defaultImg
                )
              "
            />
          </td>
          <td>
            {{
              isDataExist(
                priceQuotationJobOrder.priceQuotationJobOrderNameCurrent
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                priceQuotationJobOrder.priceQuotationInfoData.fullCode
              )
            }}
          </td>

          <td class="fmenu-item-container">
            <FloatingMenu>
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
import { hasPriceQuotationJobOrderEdit } from "./../../../../utils/privilegeHelper";
import {
  checkPrivilege,
  fullPathFileFromServer,
} from "./../../../../utils/functions";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "PriceQuotationJobOrdersTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
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
