<template>
  <CustomBottomSheet
    :refName="'EducationalStageInfo'"
    size="xl"
    :headerText="$t('EducationalStages.data')"
    :headerIcon="educationalStage.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalStage.fullCode"
        :title="$t('EducationalStages.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalStage.educationalStageNameAr"
        :title="$t('EducationalStages.nameAr')"
        :imgName="'educationalStages.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalStage.educationalStageNameEn"
        :title="$t('EducationalStages.nameEn')"
        :imgName="'educationalStages.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalStage.educationalStageNameUnd"
        :title="$t('EducationalStages.nameUnd')"
        :imgName="'educationalStages.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalStage.educationalStageDescriptionAr"
        :title="$t('EducationalStages.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalStage.educationalStageDescriptionEn"
        :title="$t('EducationalStages.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalStage.educationalStageDescriptionUnd"
        :title="$t('EducationalStages.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalStage.educationalStageNotes"
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
  props: ["educationalStage"],
};
</script>
