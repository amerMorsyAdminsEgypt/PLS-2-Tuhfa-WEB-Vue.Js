<template>
  <CustomBottomSheet
    :refName="'RevenueInfo'"
    size="xl"
    :headerText="$t('Revenues.data')"
    :headerIcon="revenue.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="revenue.fullCode"
        :title="$t('Revenues.code')"
        :imgName="'code.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="revenue.revenuesDescriptionAr"
        :title="$t('Revenues.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="revenue.revenuesDescriptionEn"
        :title="$t('Revenues.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="revenue.revenuesDescriptionUnd"
        :title="$t('Revenues.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="revenue.revenuesMoneyWithCurrency"
        :title="$t('Revenues.money')"
        :imgName="'money.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="revenue.revenuesTypeInfoData.revenuesTypeNameCurrent"
        :title="$t('Revenues.type')"
        :imgName="'type.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="revenue.accountInfoData.accountNameCurrent"
        :title="$t('Accounts.name')"
        :imgName="'accounts.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="revenue.paymentMethodInfoData.paymentMethodNameCurrent"
        :title="$t('PaymentMethods.type')"
        :imgName="'paymentMethods.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="revenue.revenuesRefundTypeNameCurrent"
        :title="$t('Revenues.refundType')"
        :imgName="'refund.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="revenue.revenuesNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />
      <template v-if="revenue.refundUserToken">
        <div class="my-card row">
          <span class="my-card-title">{{ $t("general.refundData") }}</span>
          <div class="row pt-4">
            <DataLabelGroup
              :className="'col-md-6'"
              :value="revenue.refundUserInfoData.userNameCurrent"
              :title="$t('userMakeAction')"
              :imgName="'user.svg'"
            />
            <DataLabelGroup
              :className="'col-md-6'"
              :value="
                revenue.refundPaymentMethodInfoData.paymentMethodNameCurrent
              "
              :title="$t('PaymentMethods.type')"
              :imgName="'paymentMethods.svg'"
            />
            <DataLabelGroup
              :className="'col-md-6'"
              :value="revenue.refundReasonCurrent"
              :title="$t('Revenues.refundReason')"
              :imgName="'reason.svg'"
            />
            <DataLabelGroup
              :className="'col-md-6'"
              :value="revenue.refundNotes"
              :title="$t('notes')"
              :imgName="'notes.svg'"
            />
            <DataLabelGroup
              :className="'col-md-12'"
              :value="
                formateDateTimeLang(revenue.refundDate, revenue.refundTime)
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
  props: ["revenue"],
  methods: {
    formateDateTimeLang,
  },
};
</script>
