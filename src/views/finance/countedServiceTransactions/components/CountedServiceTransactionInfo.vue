<template>
  <CustomBottomSheet
    :refName="'CountedServiceTransactionInfo'"
    size="xl"
    :headerText="$t('CountedServiceTransactions.data')"
    :headerIcon="countedServiceTransaction.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="countedServiceTransaction.fullCode"
        :title="$t('CountedServiceTransactions.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="countedServiceTransaction.countedServiceCount"
        :title="$t('CountedServiceTransactions.countedServiceCount')"
        :imgName="'number.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          countedServiceTransaction.countedServiceInfoData
            ? countedServiceTransaction.countedServiceInfoData
                .countedServiceNameCurrent
            : ''
        "
        :title="$t('CountedServices.name')"
        :imgName="'countedServices.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          countedServiceTransaction.countedServiceTransactionMoneyWithCurrency
        "
        :title="$t('money')"
        :imgName="'money.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          countedServiceTransaction.countedServiceTransactionTypeNameCurrent
        "
        :title="$t('CountedServiceTransactions.type')"
        :imgName="'type.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          countedServiceTransaction.studentUserInfoData
            ? countedServiceTransaction.studentUserInfoData.accountNameCurrent
            : ''
        "
        :title="$t('students.name')"
        :imgName="'students.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          countedServiceTransaction.accountInfoData
            ? countedServiceTransaction.accountInfoData.accountNameCurrent
            : ''
        "
        :title="$t('Accounts.name')"
        :imgName="'accounts.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          countedServiceTransaction.paymentMethodInfoData
            ? countedServiceTransaction.paymentMethodInfoData
                .paymentMethodNameCurrent
            : ''
        "
        :title="$t('PaymentMethods.name')"
        :imgName="'paymentMethods.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          countedServiceTransaction.countedServiceTransactionDescriptionAr
        "
        :title="$t('CountedServiceTransactions.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          countedServiceTransaction.countedServiceTransactionDescriptionEn
        "
        :title="$t('CountedServiceTransactions.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          countedServiceTransaction.countedServiceTransactionDescriptionUnd
        "
        :title="$t('CountedServiceTransactions.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="countedServiceTransaction.countedServiceTransactionNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />
    </div>

    <div
      class="my-card"
      v-if="
        countedServiceTransaction.countedServiceTransactionRefundTypeToken ==
        REFUND_TYPE_TOKENS.Refunded
      "
    >
      <span class="my-card-title">{{ $t("general.refundData") }}</span>

      <div class="row">
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            countedServiceTransaction.refundCountedServiceTransactionMoneyWithCurrency
          "
          :title="$t('general.refundAmount')"
          :imgName="'money.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6'"
          :value="countedServiceTransaction.refundReasonCurrent"
          :title="$t('general.reason')"
          :imgName="'reason.svg'"
        />
        <DataLabelGroup
          :className="'col-md-12'"
          :value="countedServiceTransaction.refundNotes"
          :title="$t('notes')"
          :imgName="'notes.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            countedServiceTransaction.refundUserInfoData
              ? countedServiceTransaction.refundUserInfoData.userNameCurrent
              : ''
          "
          :title="$t('userMakeAction')"
          :imgName="'man.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            formateDateTimeLang(
              countedServiceTransaction.refundDate,
              countedServiceTransaction.refundTime
            )
          "
          :title="$t('dateTime')"
          :imgName="'dateAndTime.svg'"
        />
      </div>
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";
import { formateDateTimeLang } from "./../../../../utils/functions";
import { REFUND_TYPE_TOKENS } from "./../../../../utils/constantLists";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
  },
  props: ["countedServiceTransaction"],
  data() {
    return {
      REFUND_TYPE_TOKENS,
    };
  },
  methods: {
    formateDateTimeLang,
  },
};
</script>
