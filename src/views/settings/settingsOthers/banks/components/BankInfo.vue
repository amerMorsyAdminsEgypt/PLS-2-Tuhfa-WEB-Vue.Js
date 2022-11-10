<template>
  <CustomBottomSheet
    :refName="'BankInfo'"
    size="xl"
    :headerText="$t('Banks.data')"
    :headerIcon="bank.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="bank.fullCode"
        :title="$t('Banks.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="bank.bankNameAr"
        :title="$t('Banks.nameAr')"
        :imgName="'banks.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="bank.bankNameEn"
        :title="$t('Banks.nameEn')"
        :imgName="'banks.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="bank.bankNameUnd"
        :title="$t('Banks.nameUnd')"
        :imgName="'banks.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="bank.bankDescriptionAr"
        :title="$t('Banks.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="bank.bankDescriptionEn"
        :title="$t('Banks.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="bank.bankDescriptionUnd"
        :title="$t('Banks.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="bank.bankNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../../../components/general/DataLabelGroup.vue";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
  },
  props: ["bank"],
};
</script>
