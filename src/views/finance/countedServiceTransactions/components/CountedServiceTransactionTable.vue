<template>
  <div v-if="countedServiceTransactionsData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th :colspan="colSpan">
            {{ $t("CountedServiceTransactions.data") }}
          </th>
          <th rowspan="2" class="cell-lg">{{ $t("CountedServices.name") }}</th>
          <th rowspan="2">
            {{ $t("CountedServiceTransactions.countedServiceCount") }}
          </th>
          <th rowspan="2">{{ $t("money") }}</th>
          <th rowspan="2">{{ $t("Accounts.name") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>
            {{ $t("general.code") }}
          </th>
          <th v-if="currentTab == 'refunded'">
            {{ $t("type") }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(
            countedServiceTransaction, index
          ) in countedServiceTransactionsData"
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  countedServiceTransaction.countedServiceTransactionImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(countedServiceTransaction.fullCode) }}</td>
          <td v-if="currentTab == 'refunded'">
            {{
              isDataExist(
                countedServiceTransaction.countedServiceTransactionTypeNameCurrent
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                countedServiceTransaction.countedServiceInfoData
                  ? countedServiceTransaction.countedServiceInfoData
                      .countedServiceNameCurrent
                  : ""
              )
            }}
          </td>
          <td>
            {{ isDataExist(countedServiceTransaction.countedServiceCount) }}
          </td>
          <td>
            {{
              isDataExist(
                countedServiceTransaction.countedServiceTransactionMoneyWithCurrency
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                countedServiceTransaction.accountInfoData
                  ? countedServiceTransaction.accountInfoData.accountNameCurrent
                  : ""
              )
            }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setCountedServiceTransactionData(countedServiceTransaction);
                    openBottomSheet('CountedServiceTransactionInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li
                v-if="
                  checkPrivilege(hasCountedServiceTransactionRefund()) &&
                  countedServiceTransaction.countedServiceTransactionRefundTypeToken !=
                    REFUND_TYPE_TOKENS.Refunded
                "
              >
                <button
                  @click="
                    setCountedServiceTransactionData(countedServiceTransaction);
                    openBottomSheet('CountedServiceTransactionRefund');
                  "
                  :title="$t('refund')"
                >
                  <img src="@/assets/images/refund.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setCountedServiceTransactionData(countedServiceTransaction);
                    openBottomSheet('CountedServiceTransactionQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>

              <li>
                <button
                  @click="
                    setCountedServiceTransactionData(countedServiceTransaction);
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
import { REFUND_TYPE_TOKENS } from "./../../../../utils/constantLists";
import { hasCountedServiceTransactionRefund } from "./../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "CountedServiceTransactionsTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: [
    "countedServiceTransactionsData",
    "filterData",
    "defaultImg",
    "currentTab",
  ],
  computed: {
    colSpan() {
      return this.currentTab == "refunded" ? 3 : 2;
    },
  },
  data() {
    return {
      REFUND_TYPE_TOKENS,
    };
  },
  methods: {
    canRefund(countedServiceTransaction) {
      let check1 = this.checkPrivilege(
        this.hasCountedServiceTransactionRefund()
      );
      let check2 =
        countedServiceTransaction.countedServiceInfoData
          .countedServiceRemainCount <
        countedServiceTransaction.countedServiceInfoData
          .countedServiceBoughtCount;
      return check1 && check2;
    },
    setCountedServiceTransactionData(countedServiceTransaction) {
      this.$emit("setCountedServiceTransactionData", countedServiceTransaction);
    },
    checkPrivilege,
    hasCountedServiceTransactionRefund,
    isDataExist,
    fullPathFileFromServer,
  },
};
</script>
