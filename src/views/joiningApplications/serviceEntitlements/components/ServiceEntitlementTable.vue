<template>
  <div v-if="serviceEntitlementsData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th rowspan="2">{{ $t("students.name") }}</th>
          <th colspan="8">{{ $t("ServiceEntitlements.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("description") }}</th>
          <th>{{ $t("general.value") }}</th>
          <th>{{ $t("Services.name") }}</th>
          <th>{{ $t("Accounts.name") }}</th>
          <th>{{ $t("PaymentMethods.name") }}</th>
          <th>{{ $t("general.refundType") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(serviceEntitlement, index) in serviceEntitlementsData"
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            {{
              isDataExist(
                serviceEntitlement.userStudentInfoData
                  ? serviceEntitlement.userStudentInfoData.userNameCurrent
                  : ""
              )
            }}
          </td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  serviceEntitlement.serviceEntitlementImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(serviceEntitlement.fullCode) }}</td>
          <td>
            {{
              isDataExist(
                serviceEntitlement.serviceEntitlementDescriptionCurrent
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                serviceEntitlement.serviceEntitlementMoneyWithCurrency
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                serviceEntitlement.serviceInfoData
                  ? serviceEntitlement.serviceInfoData.serviceNameCurrent
                  : ""
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                serviceEntitlement.accountInfoData
                  ? serviceEntitlement.accountInfoData.accountNameCurrent
                  : ""
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                serviceEntitlement.paymentMethodInfoData
                  ? serviceEntitlement.paymentMethodInfoData
                      .paymentMethodNameCurrent
                  : ""
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                serviceEntitlement.serviceEntitlementRefundTypeNameCurrent
              )
            }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setServiceEntitlementData(serviceEntitlement);
                    openBottomSheet('ServiceEntitlementInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setServiceEntitlementData(serviceEntitlement);
                    openBottomSheet('ServiceEntitlementQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li
                v-if="
                  checkPrivilege(hasServiceEntitlementRefund()) &&
                  serviceEntitlement.serviceEntitlementRefundTypeToken ==
                    REFUND_TYPE_TOKENS.NotRefunded
                "
              >
                <button
                  @click="
                    setServiceEntitlementData(serviceEntitlement);
                    openBottomSheet('ServiceEntitlementRefund');
                  "
                  :title="$t('refund')"
                >
                  <img src="@/assets/images/refund.svg" />
                </button>
              </li>

              <li>
                <button
                  @click="
                    setServiceEntitlementData(serviceEntitlement);
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
import { hasServiceEntitlementRefund } from "./../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";
import { REFUND_TYPE_TOKENS } from "./../../../../utils/constantLists";

export default {
  name: "ServiceEntitlementsTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["serviceEntitlementsData", "filterData", "defaultImg"],
  data() {
    return {
      REFUND_TYPE_TOKENS: REFUND_TYPE_TOKENS,
    };
  },
  methods: {
    setServiceEntitlementData(serviceEntitlement) {
      this.$emit("setServiceEntitlementData", serviceEntitlement);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasServiceEntitlementRefund,
  },
};
</script>
