<template>
  <div v-if="accountTransactionsData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("AccountTransactions.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(accountTransaction, index) in accountTransactionsData"
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  accountTransaction.accountTransactionImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(accountTransaction.fullCode) }}</td>
          <td>
            {{ isDataExist(accountTransaction.accountTransactionNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setAccountTransactionData(accountTransaction);
                    openBottomSheet('AccountTransactionInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setAccountTransactionData(accountTransaction);
                    openBottomSheet('AccountTransactionQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasAccountTransactionReport())">
                <button
                  @click="
                    setAccountTransactionData(accountTransaction);
                    openBottomSheet('AccountTransactionReportFilter');
                  "
                  :title="$t('Reports.accountTransactionsReport')"
                >
                  <img src="@/assets/images/report.svg" />
                </button>
              </li>

              <li>
                <button
                  @click="
                    setAccountTransactionData(accountTransaction);
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
import { hasAccountTransactionReport } from "./../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "AccountTransactionsTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["accountTransactionsData", "filterData", "defaultImg"],
  methods: {
    setAccountTransactionData(accountTransaction) {
      this.$emit("setAccountTransactionData", accountTransaction);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasAccountTransactionReport,
  },
};
</script>
