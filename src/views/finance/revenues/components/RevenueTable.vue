<template>
  <div v-if="revenuesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("Revenues.data") }}</th>
          <th rowspan="2">{{ $t("Accounts.name") }}</th>
          <th rowspan="2">{{ $t("Revenues.type") }}</th>
          <th rowspan="2">{{ $t("Revenues.refundType") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("Revenues.money") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(revenue, index) in revenuesData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(revenue.revenueImagePath, defaultImg)
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(revenue.fullCode) }}</td>
          <td>
            {{ isDataExist(revenue.revenuesMoneyWithCurrency) }}
          </td>
          <td>
            {{ isDataExist(revenue.accountInfoData.accountNameCurrent) }}
          </td>
          <td>
            {{
              isDataExist(revenue.revenuesTypeInfoData.revenuesTypeNameCurrent)
            }}
          </td>
          <td>
            {{ isDataExist(revenue.revenuesRefundTypeNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setRevenueData(revenue);
                    openBottomSheet('RevenueInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setRevenueData(revenue);
                    openBottomSheet('RevenueQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li
                v-if="
                  checkPrivilege(hasRevenueRefund()) && ableToRefund(revenue)
                "
              >
                <button
                  @click="
                    setRevenueData(revenue);
                    openBottomSheet('RevenueRefund');
                  "
                  :title="$t('refund')"
                >
                  <img src="@/assets/images/refund.svg" />
                </button>
              </li>

              <li>
                <button
                  @click="
                    setRevenueData(revenue);
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
import {
  checkPrivilege,
  isDataExist,
  fullPathFileFromServer,
} from "./../../../../utils/functions";
import { hasRevenueRefund } from "./../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";
import { REFUND_TYPE_TOKENS } from "./../../../../utils/constantLists";

export default {
  name: "RevenuesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["revenuesData", "filterData", "defaultImg"],
  methods: {
    setRevenueData(revenue) {
      this.$emit("setRevenueData", revenue);
    },
    ableToRefund(revenue) {
      if (revenue.revenuesRefundTypeToken == REFUND_TYPE_TOKENS.NotRefunded) {
        return true;
      } else {
        return false;
      }
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasRevenueRefund,
  },
};
</script>
