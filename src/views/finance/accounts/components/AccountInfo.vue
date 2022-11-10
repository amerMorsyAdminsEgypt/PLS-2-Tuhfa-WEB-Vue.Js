<template>
  <CustomBottomSheet
    :refName="'AccountInfo'"
    size="xl"
    :headerText="$t('Accounts.data')"
    :headerIcon="account.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="account.fullCode"
        :title="$t('Accounts.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="account.accountNameAr"
        :title="$t('Accounts.nameAr')"
        :imgName="'accounts.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="account.accountNameEn"
        :title="$t('Accounts.nameEn')"
        :imgName="'accounts.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="account.accountNameUnd"
        :title="$t('Accounts.nameUnd')"
        :imgName="'accounts.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="account.accountDescriptionAr"
        :title="$t('Accounts.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="account.accountDescriptionEn"
        :title="$t('Accounts.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="account.accountDescriptionUnd"
        :title="$t('Accounts.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="account.accountMoneyBalanceWithCurrency"
        :title="$t('Accounts.balance')"
        :imgName="'money.svg'"
      />
      <DataLabelGroup
        :className="'col-md-12'"
        :value="account.accountNotes"
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
  props: ["account"],
};
</script>
