<template>
  <CustomBottomSheet
    :refName="'InstallmentBatchTypeInfo'"
    size="xl"
    :headerText="$t('InstallmentBatchTypes.data')"
    :headerIcon="installmentBatchType.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="installmentBatchType.fullCode"
        :title="$t('InstallmentBatchTypes.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="installmentBatchType.installmentBatchTypeNameAr"
        :title="$t('InstallmentBatchTypes.nameAr')"
        :imgName="'installmentBatchTypes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="installmentBatchType.installmentBatchTypeNameEn"
        :title="$t('InstallmentBatchTypes.nameEn')"
        :imgName="'installmentBatchTypes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="installmentBatchType.installmentBatchTypeNameUnd"
        :title="$t('InstallmentBatchTypes.nameUnd')"
        :imgName="'installmentBatchTypes.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="installmentBatchType.installmentBatchTypeDescriptionAr"
        :title="$t('InstallmentBatchTypes.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="installmentBatchType.installmentBatchTypeDescriptionEn"
        :title="$t('InstallmentBatchTypes.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="installmentBatchType.installmentBatchTypeDescriptionUnd"
        :title="$t('InstallmentBatchTypes.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="installmentBatchType.installmentBatchTypeNotes"
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
  props: ["installmentBatchType"],
};
</script>
