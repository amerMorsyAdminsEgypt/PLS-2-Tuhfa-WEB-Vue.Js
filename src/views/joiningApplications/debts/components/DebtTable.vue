<template>
  <div v-if="debtsData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th rowspan="2">{{ $t("students.name") }}</th>
          <th colspan="6">{{ $t("Debts.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th class="cell-lg">{{ $t("title") }}</th>
          <th>{{ $t("general.type") }}</th>
          <th>{{ $t("Debts.schedulingStatusType") }}</th>
          <th>{{ $t("general.value") }}</th>
          <th>{{ $t("general.paid") }}</th>
          <th>{{ $t("general.remainding") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(debt, index) in debtsData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            {{
              isDataExist(
                debt.userInfoData ? debt.userInfoData.userNameCurrent : ""
              )
            }}
          </td>
          <td>
            {{ isDataExist(debt.debtTitleCurrent) }}
          </td>
          <td>
            {{ isDataExist(debt.debtTypeNameCurrent) }}
          </td>
          <td>
            {{ isDataExist(debt.schedulingStatusTypeNameCurrent) }}
          </td>
          <td>
            {{ isDataExist(debt.debtMoneyWithCurrency) }}
          </td>
          <td>
            {{ isDataExist(debt.paidMoneyWithCurrency) }}
          </td>
          <td>
            {{ isDataExist(debt.remainderMoneyWithCurrency) }}
          </td>

          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setDebtData(debt);
                    openBottomSheet('DebtInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>

              <li>
                <button
                  @click="
                    setDebtData(debt);
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
import { isDataExist } from "./../../../../utils/functions";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "DebtsTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["debtsData", "filterData", "defaultImg"],
  methods: {
    setDebtData(debt) {
      this.$emit("setDebtData", debt);
    },
    isDataExist,
  },
};
</script>
