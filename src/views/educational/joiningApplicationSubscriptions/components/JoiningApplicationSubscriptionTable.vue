<template>
  <div v-if="joiningApplicationSubscriptionsData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="2">{{ $t("JoiningApplicationSubscriptions.data") }}</th>
          <th rowspan="2">
            {{ $t("ConstantsListSelect.SubscriptionTypesName") }}
          </th>
          <th rowspan="2">
            {{
              $t(
                "EducationalJoiningApplications.subscriptionRequestSessionsNumber"
              )
            }}
          </th>
          <th rowspan="2">{{ $t("Debts.statistics.totalDebtsMoney") }}</th>
          <th rowspan="2">{{ $t("Debts.statistics.totalPaidMoney") }}</th>
          <th rowspan="2">{{ $t("Debts.statistics.totalRemainderMoney") }}</th>
          <th rowspan="2">
            {{ $t("EducationalJoiningApplications.subscriptionFromDateTime") }}
          </th>
          <th rowspan="2">
            {{ $t("EducationalJoiningApplications.subscriptionToDateTime") }}
          </th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(
            joiningApplicationSubscription, index
          ) in joiningApplicationSubscriptionsData"
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  joiningApplicationSubscription.joiningApplicationSubscriptionImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(joiningApplicationSubscription.fullCode) }}</td>
          <td>
            {{
              isDataExist(
                joiningApplicationSubscription.subscriptionTypeNameCurrent
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                joiningApplicationSubscription.subscriptionRequestSessionsNumber
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                joiningApplicationSubscription.totalDebtsMoneyWithCurrency
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                joiningApplicationSubscription.totalPaidMoneyWithCurrency
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                joiningApplicationSubscription.totalRemainderMoneyWithCurrency
              )
            }}
          </td>
          <td>
            {{
              formateDateTimeLang(
                joiningApplicationSubscription.subscriptionFromDate,
                joiningApplicationSubscription.subscriptionFromTime
              )
            }}
          </td>
          <td>
            {{
              formateDateTimeLang(
                joiningApplicationSubscription.subscriptionToDate,
                joiningApplicationSubscription.subscriptionToTime
              )
            }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setJoiningApplicationSubscriptionData(
                      joiningApplicationSubscription
                    );
                    openBottomSheet('JoiningApplicationSubscriptionQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setJoiningApplicationSubscriptionData(
                      joiningApplicationSubscription
                    );
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
  formateDateTimeLang,
} from "./../../../../utils/functions";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "JoiningApplicationSubscriptionsTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["joiningApplicationSubscriptionsData", "filterData", "defaultImg"],
  data() {
    return {};
  },
  methods: {
    setJoiningApplicationSubscriptionData(joiningApplicationSubscription) {
      this.$emit(
        "setJoiningApplicationSubscriptionData",
        joiningApplicationSubscription
      );
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    formateDateTimeLang,
  },
};
</script>
