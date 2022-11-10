<template>
  <div v-if="installmentPaymentsData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th rowspan="2">{{ $t("students.name") }}</th>
          <th colspan="7">{{ $t("InstallmentPayments.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("description") }}</th>
          <th>{{ $t("general.type") }}</th>
          <th>{{ $t("general.value") }}</th>
          <th>{{ $t("Accounts.name") }}</th>
          <th>{{ $t("PaymentMethods.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(installmentPayment, index) in installmentPaymentsData"
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            {{
              isDataExist(
                installmentPayment.debtUserInfoData
                  ? installmentPayment.debtUserInfoData.userNameCurrent
                  : ""
              )
            }}
          </td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  installmentPayment.installmentPaymentImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(installmentPayment.fullCode) }}</td>
          <td>
            {{
              isDataExist(
                installmentPayment.installmentPaymentDescriptionCurrent
              )
            }}
          </td>
          <td>
            {{ isDataExist(installmentPayment.refundTypeNameCurrent) }}
          </td>
          <td>
            {{ isDataExist(installmentPayment.installmentPaymentMoney) }}
          </td>
          <td>
            {{
              isDataExist(
                installmentPayment.accountInfoData
                  ? installmentPayment.accountInfoData.accountNameCurrent
                  : ""
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                installmentPayment.paymentMethodInfoData
                  ? installmentPayment.paymentMethodInfoData
                      .paymentMethodNameCurrent
                  : ""
              )
            }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setInstallmentPaymentData(installmentPayment);
                    openBottomSheet('InstallmentPaymentInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setInstallmentPaymentData(installmentPayment);
                    openBottomSheet('InstallmentPaymentQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li
                v-if="
                  checkPrivilege(hasInstallmentPaymentRefund()) &&
                  installmentPayment.refundTypeToken ==
                    REFUND_TYPE_TOKENS.NotRefunded
                "
              >
                <button
                  @click="
                    setInstallmentPaymentData(installmentPayment);
                    openBottomSheet('InstallmentPaymentRefund');
                  "
                  :title="$t('refund')"
                >
                  <img src="@/assets/images/refund.svg" />
                </button>
              </li>

              <li>
                <button
                  @click="
                    setInstallmentPaymentData(installmentPayment);
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
import { hasInstallmentPaymentRefund } from "./../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";
import { REFUND_TYPE_TOKENS } from "./../../../../utils/constantLists";

export default {
  name: "InstallmentPaymentsTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["installmentPaymentsData", "filterData", "defaultImg"],
  data() {
    return {
      REFUND_TYPE_TOKENS: REFUND_TYPE_TOKENS,
    };
  },
  methods: {
    setInstallmentPaymentData(installmentPayment) {
      this.$emit("setInstallmentPaymentData", installmentPayment);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasInstallmentPaymentRefund,
  },
};
</script>
