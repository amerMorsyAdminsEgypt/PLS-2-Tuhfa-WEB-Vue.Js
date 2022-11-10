<template>
  <CustomBottomSheet
    :refName="'OperationTypeInfo'"
    size="xl"
    :headerText="$t('OperationTypes.data')"
    :headerIcon="operationType.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="operationType.fullCode"
        :title="$t('OperationTypes.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="operationType.operationTypeNameAr"
        :title="$t('OperationTypes.nameAr')"
        :imgName="'operationTypes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="operationType.operationTypeNameEn"
        :title="$t('OperationTypes.nameEn')"
        :imgName="'operationTypes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="operationType.operationTypeNameUnd"
        :title="$t('OperationTypes.nameUnd')"
        :imgName="'operationTypes.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="operationType.operationTypeDescriptionAr"
        :title="$t('OperationTypes.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="operationType.operationTypeDescriptionEn"
        :title="$t('OperationTypes.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="operationType.operationTypeDescriptionUnd"
        :title="$t('OperationTypes.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="operationType.operationTypeNotes"
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
  props: ["operationType"],
};
</script>
