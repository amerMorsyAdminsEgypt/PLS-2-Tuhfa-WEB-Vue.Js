<template>
  <CustomBottomSheet
    :refName="'DebtInfo'"
    size="xl"
    :headerText="$t('Debts.data')"
    :headerIcon="debt.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-12'"
        :value="debt.debtTitleCurrent"
        :title="$t('title')"
        :imgName="'debts.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="debt.userInfoData ? debt.userInfoData.userNameCurrent : ''"
        :title="$t('students.name')"
        :imgName="'students.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="debt.debtTypeNameCurrent"
        :title="$t('general.type')"
        :imgName="'type.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="debt.schedulingStatusTypeNameCurrent"
        :title="$t('Debts.schedulingStatusType')"
        :imgName="'type.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="debt.debtMoneyWithCurrency"
        :title="$t('general.value')"
        :imgName="'money.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="debt.paidMoneyWithCurrency"
        :title="$t('general.paid')"
        :imgName="'money.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="debt.remainderMoneyWithCurrency"
        :title="$t('general.remainding')"
        :imgName="'money.svg'"
      />
      <DataLabelGroup
        :className="'col-md-12'"
        :value="
          debt.educationalJoiningApplicationInfoData
            ? debt.educationalJoiningApplicationInfoData
                .educationalJoiningApplicationNameCurrent
            : ''
        "
        :title="$t('EducationalJoiningApplications.data')"
        :imgName="'EducationalJoiningApplications.svg'"
      />
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
  },
  props: ["debt"],
};
</script>
