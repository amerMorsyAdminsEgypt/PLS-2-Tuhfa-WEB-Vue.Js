<template>
  <CustomBottomSheet
    :refName="'AccountTransactionInfo'"
    size="xl"
    :headerText="$t('AccountTransactions.data')"
    :headerIcon="accountTransaction.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="accountTransaction.fullCode"
        :title="$t('AccountTransactions.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="accountTransaction.accountTransactionNameAr"
        :title="$t('AccountTransactions.nameAr')"
        :imgName="'accountTransactions.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="accountTransaction.accountTransactionNameEn"
        :title="$t('AccountTransactions.nameEn')"
        :imgName="'accountTransactions.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="accountTransaction.accountTransactionNameUnd"
        :title="$t('AccountTransactions.nameUnd')"
        :imgName="'accountTransactions.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="accountTransaction.accountTransactionDescriptionAr"
        :title="$t('AccountTransactions.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="accountTransaction.accountTransactionDescriptionEn"
        :title="$t('AccountTransactions.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="accountTransaction.accountTransactionDescriptionUnd"
        :title="$t('AccountTransactions.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="accountTransaction.accountInfoData.accountNameCurrent"
        :title="$t('Accounts.name')"
        :imgName="'accounts.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="accountTransaction.accountTransactionTypeNameCurrent"
        :title="$t('AccountTransactions.type')"
        :imgName="'accountTransactions.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="accountTransaction.accountTransactionMoney"
        :title="$t('AccountTransactions.money')"
        :imgName="'money.svg'"
      />
      <DataLabelGroup
        :className="'col-md-12'"
        :value="accountTransaction.accountTransactionNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
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
  props: ["accountTransaction"],
};
</script>
