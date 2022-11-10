<template>
  <div v-if="expensesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("Expenses.data") }}</th>
          <th rowspan="2">{{ $t("Accounts.name") }}</th>
          <th rowspan="2">{{ $t("Expenses.type") }}</th>
          <th rowspan="2">{{ $t("Expenses.refundType") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("Expenses.money") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(expense, index) in expensesData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(expense.expenseImagePath, defaultImg)
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(expense.fullCode) }}</td>
          <td>
            {{ isDataExist(expense.expensesMoneyWithCurrency) }}
          </td>
          <td>
            {{ isDataExist(expense.accountInfoData.accountNameCurrent) }}
          </td>
          <td>
            {{
              isDataExist(expense.expensesTypeInfoData.expensesTypeNameCurrent)
            }}
          </td>
          <td>
            {{ isDataExist(expense.expensesRefundTypeNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setExpenseData(expense);
                    openBottomSheet('ExpenseInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setExpenseData(expense);
                    openBottomSheet('ExpenseQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li
                v-if="
                  checkPrivilege(hasExpenseRefund()) && ableToRefund(expense)
                "
              >
                <button
                  @click="
                    setExpenseData(expense);
                    openBottomSheet('ExpenseRefund');
                  "
                  :title="$t('refund')"
                >
                  <img src="@/assets/images/refund.svg" />
                </button>
              </li>

              <li>
                <button
                  @click="
                    setExpenseData(expense);
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
import { hasExpenseRefund } from "./../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";
import { REFUND_TYPE_TOKENS } from "./../../../../utils/constantLists";

export default {
  name: "ExpensesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["expensesData", "filterData", "defaultImg"],
  methods: {
    setExpenseData(expense) {
      this.$emit("setExpenseData", expense);
    },
    ableToRefund(expense) {
      if (expense.expensesRefundTypeToken == REFUND_TYPE_TOKENS.NotRefunded) {
        return true;
      } else {
        return false;
      }
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasExpenseRefund,
  },
};
</script>
