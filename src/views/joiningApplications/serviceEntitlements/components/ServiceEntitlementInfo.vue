<template>
  <CustomBottomSheet
    :refName="'ServiceEntitlementInfo'"
    size="xl"
    :headerText="$t('ServiceEntitlements.data')"
    :headerIcon="serviceEntitlement.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          serviceEntitlement.userStudentInfoData
            ? serviceEntitlement.userStudentInfoData.userNameCurrent
            : ''
        "
        :title="$t('students.name')"
        :imgName="'students.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="serviceEntitlement.fullCode"
        :title="$t('ServiceEntitlements.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="serviceEntitlement.serviceEntitlementDescriptionAr"
        :title="$t('ServiceEntitlements.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="serviceEntitlement.serviceEntitlementDescriptionEn"
        :title="$t('ServiceEntitlements.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="serviceEntitlement.serviceEntitlementDescriptionUnd"
        :title="$t('ServiceEntitlements.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="serviceEntitlement.serviceEntitlementNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="serviceEntitlement.serviceEntitlementRefundTypeNameCurrent"
        :title="$t('general.type')"
        :imgName="'type.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          serviceEntitlement.accountInfoData
            ? serviceEntitlement.accountInfoData.accountNameCurrent
            : ''
        "
        :title="$t('Accounts.name')"
        :imgName="'accounts.svg'"
      />
      <!-- <div
        class="my-card row"
        v-if="serviceEntitlement.installmentScheduleTimeInfo"
      >
        <span class="my-card-title">{{
          $t("Installments.dataScheduleTime")
        }}</span>
        <table class="my-table mt-3">
          <thead>
            <tr>
              <th>{{ $t("general.value") }}</th>
              <th>{{ $t("general.paid") }}</th>
              <th>{{ $t("general.remainding") }}</th>
              <th>{{ $t("general.scheduleDateTime") }}</th>
              <th>{{ $t("notes") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {{
                  isDataExist(
                    serviceEntitlement.installmentScheduleTimeInfo
                      .installmentMoneyWithCurrency
                  )
                }}
              </td>
              <td>
                {{
                  isDataExist(
                    serviceEntitlement.installmentScheduleTimeInfo
                      .paidMoneyWithCurrency
                  )
                }}
              </td>
              <td>
                {{
                  isDataExist(
                    serviceEntitlement.installmentScheduleTimeInfo
                      .remainderMoneyWithCurrency
                  )
                }}
              </td>
              <td>
                {{
                  formateDateTimeLang(
                    serviceEntitlement.installmentScheduleTimeInfo
                      .installmentDate,
                    serviceEntitlement.installmentScheduleTimeInfo
                      .installmentTime
                  )
                }}
              </td>
              <td>
                {{
                  isDataExist(
                    serviceEntitlement.installmentScheduleTimeInfo
                      .installmentNotes
                  )
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div> -->
      <div class="my-card row">
        <span class="my-card-title">{{ $t("general.paymentData") }}</span>

        <DataLabelGroup
          :className="'col-md-6'"
          :value="serviceEntitlement.serviceEntitlementMoney"
          :title="$t('general.value')"
          :imgName="'money.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            formateDateTimeLang(
              serviceEntitlement.creationDate,
              serviceEntitlement.creationTime
            )
          "
          :title="$t('actionsData.dateTime')"
          :imgName="'dateAndTime.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            serviceEntitlement.userCreatedData
              ? serviceEntitlement.userCreatedData.userNameCurrent
              : ''
          "
          :title="$t('userMakeAction')"
          :imgName="'user.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            serviceEntitlement.paymentMethodInfoData
              ? serviceEntitlement.paymentMethodInfoData
                  .paymentMethodNameCurrent
              : ''
          "
          :title="$t('PaymentMethods.name')"
          :imgName="'paymentMethods.svg'"
        />
      </div>

      <div
        class="my-card row"
        v-if="
          serviceEntitlement.serviceEntitlementRefundTypeToken ==
          REFUND_TYPE_TOKENS.Refunded
        "
      >
        <span class="my-card-title">{{ $t("general.refundData") }}</span>

        <DataLabelGroup
          :className="'col-md-6'"
          :value="serviceEntitlement.refundServiceEntitlementMoney"
          :title="$t('general.value')"
          :imgName="'money.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            formateDateTimeLang(
              serviceEntitlement.refundDate,
              serviceEntitlement.refundTime
            )
          "
          :title="$t('actionsData.dateTime')"
          :imgName="'dateAndTime.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            serviceEntitlement.refundUserInfoData
              ? serviceEntitlement.refundUserInfoData.userNameCurrent
              : ''
          "
          :title="$t('userMakeAction')"
          :imgName="'user.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            serviceEntitlement.refundPaymentMethodInfoData
              ? serviceEntitlement.refundPaymentMethodInfoData
                  .paymentMethodNameCurrent
              : ''
          "
          :title="$t('PaymentMethods.name')"
          :imgName="'paymentMethods.svg'"
        />
      </div>
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";
import {
  isDataExist,
  formateDateTimeLang,
} from "./../../../../utils/functions";
import { REFUND_TYPE_TOKENS } from "./../../../../utils/constantLists";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
  },
  props: ["serviceEntitlement"],
  data() {
    return {
      REFUND_TYPE_TOKENS: REFUND_TYPE_TOKENS,
    };
  },
  methods: {
    isDataExist,
    formateDateTimeLang,
  },
};
</script>
