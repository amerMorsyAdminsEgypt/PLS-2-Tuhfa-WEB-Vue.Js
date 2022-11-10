<template>
  <CustomBottomSheet
    :refName="'RelativeRelationTypeInfo'"
    size="xl"
    :headerText="$t('RelativeRelationTypes.data')"
    :headerIcon="relativeRelationType.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="relativeRelationType.fullCode"
        :title="$t('RelativeRelationTypes.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="relativeRelationType.relativeRelationTypeNameAr"
        :title="$t('RelativeRelationTypes.nameAr')"
        :imgName="'RelativeRelationTypes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="relativeRelationType.relativeRelationTypeNameEn"
        :title="$t('RelativeRelationTypes.nameEn')"
        :imgName="'RelativeRelationTypes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="relativeRelationType.relativeRelationTypeNameUnd"
        :title="$t('RelativeRelationTypes.nameUnd')"
        :imgName="'RelativeRelationTypes.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="relativeRelationType.relativeRelationKinShipDegreeNameCurrent"
        :title="$t('general.degree')"
        :imgName="'RelativeRelationTypes.svg'"
      />
      <CustomCheckbox
        :className="'col-md-6'"
        :value="relativeRelationType.relativeRelationRepetitionStatus"
        :title="$t('RelativeRelationTypes.RepetitionStatus')"
        :showAsInfo="true"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="relativeRelationType.relativeRelationTypeDescriptionAr"
        :title="$t('RelativeRelationTypes.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="relativeRelationType.relativeRelationTypeDescriptionEn"
        :title="$t('RelativeRelationTypes.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="relativeRelationType.relativeRelationTypeDescriptionUnd"
        :title="$t('RelativeRelationTypes.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="relativeRelationType.relativeRelationTypeNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../../../components/general/DataLabelGroup.vue";
import CustomCheckbox from "./../../../../../components/general/CustomCheckbox.vue";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
    CustomCheckbox,
  },
  props: ["relativeRelationType"],
};
</script>
