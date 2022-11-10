<template>
  <CustomBottomSheet
    :refName="'InstallmentPaymentInfo'"
    size="xl"
    :headerText="$t('InstallmentPayments.data')"
    :headerIcon="installmentPayment.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          installmentPayment.debtUserInfoData
            ? installmentPayment.debtUserInfoData.userNameCurrent
            : ''
        "
        :title="$t('students.name')"
        :imgName="'students.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="installmentPayment.fullCode"
        :title="$t('InstallmentPayments.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="installmentPayment.installmentPaymentDescriptionAr"
        :title="$t('InstallmentPayments.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="installmentPayment.installmentPaymentDescriptionEn"
        :title="$t('InstallmentPayments.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="installmentPayment.installmentPaymentDescriptionUnd"
        :title="$t('InstallmentPayments.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="installmentPayment.installmentPaymentNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="installmentPayment.refundTypeNameCurrent"
        :title="$t('general.type')"
        :imgName="'type.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          installmentPayment.accountInfoData
            ? installmentPayment.accountInfoData.accountNameCurrent
            : ''
        "
        :title="$t('Accounts.name')"
        :imgName="'accounts.svg'"
      />
      <div
        class="my-card row"
        v-if="installmentPayment.installmentScheduleTimeInfo"
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
                    installmentPayment.installmentScheduleTimeInfo
                      .installmentMoneyWithCurrency
                  )
                }}
              </td>
              <td>
                {{
                  isDataExist(
                    installmentPayment.installmentScheduleTimeInfo
                      .paidMoneyWithCurrency
                  )
                }}
              </td>
              <td>
                {{
                  isDataExist(
                    installmentPayment.installmentScheduleTimeInfo
                      .remainderMoneyWithCurrency
                  )
                }}
              </td>
              <td>
                {{
                  formateDateTimeLang(
                    installmentPayment.installmentScheduleTimeInfo
                      .installmentDate,
                    installmentPayment.installmentScheduleTimeInfo
                      .installmentTime
                  )
                }}
              </td>
              <td>
                {{
                  isDataExist(
                    installmentPayment.installmentScheduleTimeInfo
                      .installmentNotes
                  )
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="my-card row">
        <span class="my-card-title">{{ $t("general.paymentData") }}</span>

        <DataLabelGroup
          :className="'col-md-6'"
          :value="installmentPayment.installmentPaymentMoney"
          :title="$t('general.value')"
          :imgName="'money.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            formateDateTimeLang(
              installmentPayment.installmentPaymentDate,
              installmentPayment.installmentPaymentTime
            )
          "
          :title="$t('actionsData.dateTime')"
          :imgName="'dateAndTime.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            installmentPayment.paymentUserInfoData
              ? installmentPayment.paymentUserInfoData.userNameCurrent
              : ''
          "
          :title="$t('userMakeAction')"
          :imgName="'user.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            installmentPayment.paymentMethodInfoData
              ? installmentPayment.paymentMethodInfoData
                  .paymentMethodNameCurrent
              : ''
          "
          :title="$t('PaymentMethods.name')"
          :imgName="'paymentMethods.svg'"
        />
      </div>

      <div class="my-card row" v-if="installmentPayment.refundUserToken">
        <span class="my-card-title">{{ $t("general.refundData") }}</span>

        <DataLabelGroup
          :className="'col-md-6'"
          :value="installmentPayment.refundInstallmentPaymentMoney"
          :title="$t('general.value')"
          :imgName="'money.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            formateDateTimeLang(
              installmentPayment.refundDate,
              installmentPayment.refundTime
            )
          "
          :title="$t('actionsData.dateTime')"
          :imgName="'dateAndTime.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            installmentPayment.refundUserInfoData
              ? installmentPayment.refundUserInfoData.userNameCurrent
              : ''
          "
          :title="$t('userMakeAction')"
          :imgName="'user.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            installmentPayment.refundPaymentMethodInfoData
              ? installmentPayment.refundPaymentMethodInfoData
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

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
  },
  props: ["installmentPayment"],
  methods: {
    isDataExist,
    formateDateTimeLang,
  },
};
</script>
