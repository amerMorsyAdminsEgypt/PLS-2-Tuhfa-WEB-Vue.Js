<template>
  <div v-if="installmentsData" class="table-container">
    <div
      v-for="(installment, index) in installmentsData"
      :key="index"
      class="container-collapse-with-btns-installment"
    >
      <b-button
        v-b-toggle="`item${index}`"
        class="btn btn-lg btn-collapse bg-collapse collapse-data"
      >
        <div class="p-t-container-installment">
          <div class="collapse-status" :class="getClass(installment)"></div>
          <div class="collapse-icon">
            <i class="fa fa-angle-down" aria-hidden="true"></i>
          </div>
          <div class="collapse-img">
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  installment.installmentImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </div>
          <div class="row collapse-title">
            <div class="col-md-12 col-lg-12">
              {{
                `${$t("students.name")}:  ${isDataExist(
                  installment.debtUserInfoData
                    ? installment.debtUserInfoData.userNameCurrent
                    : ""
                )}  ${$t("quma")} ${$t("Installments.name")}:  ${isDataExist(
                  installment.installmentNameCurrent
                )}  ${$t("quma")} ${$t("general.type")}:  ${isDataExist(
                  installment.cancelTypeNameCurrent
                )}`
              }}
            </div>
          </div>
        </div>
      </b-button>
      <div class="collapse-actions btn-collapse bg-collapse">
        <div class="fmenu-item-container">
          <FloatingMenu>
            <li>
              <button
                @click="
                  setInstallmentData(installment);
                  openBottomSheet('InstallmentInfo');
                "
                :title="$t('info')"
              >
                <img src="@/assets/images/info.svg" />
              </button>
            </li>
            <li>
              <button
                @click="
                  setInstallmentData(installment);
                  openBottomSheet('InstallmentQRCode');
                "
                :title="$t('general.qrCode')"
              >
                <img src="@/assets/images/qr-code.svg" />
              </button>
            </li>
            <li v-if="checkPrivilege(hasInstallmentEdit())">
              <button
                @click="
                  setInstallmentData(installment);
                  openBottomSheet('InstallmentUpdate');
                "
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" />
              </button>
            </li>
            <li
              v-if="
                checkPrivilege(hasInstallmentCancel()) &&
                installment.totalScheduleIPaidMoney == 0 &&
                installment.cancelTypeToken == CANCEL_TYPE_TOKENS.NotCanceled
              "
            >
              <button
                :title="$t('cancel')"
                @click="
                  setInstallmentData(installment);
                  openBottomSheet('InstallmentDelete');
                "
              >
                <img src="@/assets/images/cancel.svg" />
              </button>
            </li>
            <li>
              <button
                @click="
                  setInstallmentData(installment);
                  openBottomSheet('ActionsData');
                "
                :title="$t('actionsData.modelName')"
              >
                <img src="@/assets/images/actions-data.svg" />
              </button>
            </li>
          </FloatingMenu>
        </div>
      </div>
      <b-collapse :id="`item${index}`">
        <div class="my-card row">
          <div class="my-card row">
            <span class="my-card-title">{{ $t("Debts.data") }}</span>
            <template v-if="installment.installmentDebtsData.length">
              <table class="my-table mt-3">
                <thead>
                  <tr>
                    <th>#</th>
                    <th class="cell-lg">{{ $t("title") }}</th>
                    <th>{{ $t("general.type") }}</th>
                    <th>{{ $t("Debts.schedulingStatusType") }}</th>
                    <th>{{ $t("general.value") }}</th>
                    <th>{{ $t("general.paid") }}</th>
                    <th>{{ $t("general.remainding") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(debt, index) in installment.installmentDebtsData"
                    :key="index"
                  >
                    <td>{{ ++index }}</td>
                    <td>
                      {{ isDataExist(debt.debtInfoData.debtTitleCurrent) }}
                    </td>
                    <td>
                      {{ isDataExist(debt.debtInfoData.debtTypeNameCurrent) }}
                    </td>
                    <td>
                      {{
                        isDataExist(
                          debt.debtInfoData.schedulingStatusTypeNameCurrent
                        )
                      }}
                    </td>
                    <td>
                      {{ isDataExist(debt.debtInfoData.debtMoneyWithCurrency) }}
                    </td>
                    <td>
                      {{ isDataExist(debt.debtInfoData.paidMoneyWithCurrency) }}
                    </td>
                    <td>
                      {{
                        isDataExist(
                          debt.debtInfoData.remainderMoneyWithCurrency
                        )
                      }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table class="my-table">
                <thead class="thead-light">
                  <tr>
                    <th class="cell-lg">
                      {{
                        $t("Installments.statistics.totalScheduleIPaidMoney")
                      }}
                    </th>
                    <th class="cell-lg">
                      {{
                        $t(
                          "Installments.statistics.totalScheduleRemainderMoney"
                        )
                      }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {{
                        isDataExist(
                          installment.totalScheduleIPaidMoneyWithCurrency
                        )
                      }}
                    </td>
                    <td>
                      {{
                        isDataExist(
                          installment.totalScheduleRemainderMoneyWithCurrency
                        )
                      }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </template>
            <div v-else class="my-card-no-content">
              {{ $t("general.thereAreNoDetails") }}
            </div>
          </div>
          <div class="my-card row">
            <span class="my-card-title">{{
              $t("Installments.dataScheduleTime")
            }}</span>
            <template
              v-if="installment.installmentScheduleTimesInfoData.length"
            >
              <table class="my-table mt-3">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>{{ $t("general.type") }}</th>
                    <th>{{ $t("general.value") }}</th>
                    <th>{{ $t("general.paid") }}</th>
                    <th>{{ $t("general.remainding") }}</th>
                    <th>{{ $t("general.scheduleDateTime") }}</th>
                    <th>{{ $t("notes") }}</th>
                    <th v-if="checkPrivilege(hasInstallmentPaymentAdd())">
                      <i class="fas fa-sliders-h"></i>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(
                      scheduleTime, index
                    ) in installment.installmentScheduleTimesInfoData"
                    :key="index"
                  >
                    <td>{{ ++index }}</td>

                    <td>
                      {{
                        isDataExist(
                          scheduleTime.installmentBatchTypeNameCurrent
                        )
                      }}
                    </td>
                    <td>
                      {{
                        isDataExist(scheduleTime.installmentMoneyWithCurrency)
                      }}
                    </td>
                    <td>
                      {{ isDataExist(scheduleTime.paidMoneyWithCurrency) }}
                    </td>
                    <td>
                      {{ isDataExist(scheduleTime.remainderMoneyWithCurrency) }}
                    </td>
                    <td>
                      {{
                        formateDateTimeLang(
                          scheduleTime.installmentDate,
                          scheduleTime.installmentTime
                        )
                      }}
                    </td>
                    <td>
                      {{ isDataExist(scheduleTime.installmentNotes) }}
                    </td>
                    <td
                      class="fmenu-item-container"
                      v-if="checkPrivilege(hasInstallmentPaymentAdd())"
                    >
                      <button
                        v-if="scheduleTime.remainderMoney > 0"
                        @click="addInstallmentPayment(scheduleTime)"
                        :title="$t('pay')"
                      >
                        <img
                          class="item-img-table"
                          src="@/assets/images/pay.svg"
                        />
                      </button>
                      <div v-else>--</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </template>
            <div v-else class="my-card-no-content">
              {{ $t("general.thereAreNoDetails") }}
            </div>
          </div>
        </div>
      </b-collapse>
    </div>
  </div>
</template>

<script>
import {
  checkPrivilege,
  isDataExist,
  formateDateTimeLang,
  fullPathFileFromServer,
} from "./../../../../utils/functions";
import { CANCEL_TYPE_TOKENS } from "./../../../../utils/constantLists";
import {
  hasInstallmentEdit,
  hasInstallmentPaymentAdd,
  hasInstallmentCancel,
} from "./../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
// import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "InstallmentsTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
    // DataLabelGroup,
  },
  props: ["installmentsData", "filterData", "defaultImg"],
  data() {
    return {
      CANCEL_TYPE_TOKENS,
    };
  },
  methods: {
    getClass(installment) {
      let className = "";
      // paid all
      if (installment.totalScheduleRemainderMoney == 0) {
        className = "status-green";
      } else if (installment.totalScheduleRemainderMoney > 0) {
        className = "status-yellow";
      }

      // canceled
      if (installment.cancelTypeToken == CANCEL_TYPE_TOKENS.Canceled) {
        className = "status-red";
      }
      return className;
    },
    setInstallmentData(installment) {
      this.$emit("setInstallmentData", installment);
    },
    addInstallmentPayment(scheduleTime) {
      this.$emit("addInstallmentPayment", scheduleTime);
    },
    checkPrivilege,
    isDataExist,
    formateDateTimeLang,
    fullPathFileFromServer,
    hasInstallmentEdit,
    hasInstallmentPaymentAdd,
    hasInstallmentCancel,
  },
};
</script>
