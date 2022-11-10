<template>
  <CustomBottomSheet
    :refName="'ExpensesTypeInfo'"
    size="xl"
    :headerText="$t('ExpensesTypes.data')"
    :headerIcon="expensesType.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="expensesType.fullCode"
        :title="$t('ExpensesTypes.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="expensesType.expensesTypeNameAr"
        :title="$t('ExpensesTypes.nameAr')"
        :imgName="'expensesTypes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="expensesType.expensesTypeNameEn"
        :title="$t('ExpensesTypes.nameEn')"
        :imgName="'expensesTypes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="expensesType.expensesTypeNameUnd"
        :title="$t('ExpensesTypes.nameUnd')"
        :imgName="'expensesTypes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="expensesType.expensesTypeDefaultPrice"
        :title="$t('general.defaultPrice')"
        :imgName="'money.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="expensesType.expensesTypeDescriptionAr"
        :title="$t('ExpensesTypes.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="expensesType.expensesTypeDescriptionEn"
        :title="$t('ExpensesTypes.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="expensesType.expensesTypeDescriptionUnd"
        :title="$t('ExpensesTypes.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-12'"
        :value="expensesType.expensesTypeNotes"
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
  props: ["expensesType"],
};
</script>
