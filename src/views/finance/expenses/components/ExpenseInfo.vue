<template>
  <CustomBottomSheet
    :refName="'ExpenseInfo'"
    size="xl"
    :headerText="$t('Expenses.data')"
    :headerIcon="expense.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="expense.fullCode"
        :title="$t('Expenses.code')"
        :imgName="'code.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="expense.expensesDescriptionAr"
        :title="$t('Expenses.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="expense.expensesDescriptionEn"
        :title="$t('Expenses.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="expense.expensesDescriptionUnd"
        :title="$t('Expenses.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="expense.expensesMoneyWithCurrency"
        :title="$t('Expenses.money')"
        :imgName="'money.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="expense.expensesTypeInfoData.expensesTypeNameCurrent"
        :title="$t('Expenses.type')"
        :imgName="'type.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="expense.accountInfoData.accountNameCurrent"
        :title="$t('Accounts.name')"
        :imgName="'accounts.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="expense.paymentMethodInfoData.paymentMethodNameCurrent"
        :title="$t('PaymentMethods.type')"
        :imgName="'paymentMethods.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="expense.expensesRefundTypeNameCurrent"
        :title="$t('Expenses.refundType')"
        :imgName="'refund.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="expense.expensesNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />
      <template v-if="expense.refundUserToken">
        <div class="my-card row">
          <span class="my-card-title">{{ $t("general.refundData") }}</span>
          <div class="row pt-4">
            <DataLabelGroup
              :className="'col-md-6'"
              :value="expense.refundUserInfoData.userNameCurrent"
              :title="$t('userMakeAction')"
              :imgName="'user.svg'"
            />
            <DataLabelGroup
              :className="'col-md-6'"
              :value="
                expense.refundPaymentMethodInfoData.paymentMethodNameCurrent
              "
              :title="$t('PaymentMethods.type')"
              :imgName="'paymentMethods.svg'"
            />
            <DataLabelGroup
              :className="'col-md-6'"
              :value="expense.refundReasonCurrent"
              :title="$t('Expenses.refundReason')"
              :imgName="'reason.svg'"
            />
            <DataLabelGroup
              :className="'col-md-6'"
              :value="expense.refundNotes"
              :title="$t('notes')"
              :imgName="'notes.svg'"
            />
            <DataLabelGroup
              :className="'col-md-12'"
              :value="
                formateDateTimeLang(expense.refundDate, expense.refundTime)
              "
              :title="$t('actionsData.dateTime')"
              :imgName="'dateAndTime.svg'"
            />
          </div>
        </div>
      </template>
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";
import { formateDateTimeLang } from "./../../../../utils/functions";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
  },
  props: ["expense"],
  methods: {
    formateDateTimeLang,
  },
};
</script>
