<template>
  <CustomBottomSheet
    :refName="'ClassificationDegreeInfo'"
    size="xl"
    :headerText="$t('ClassificationDegrees.data')"
    :headerIcon="classificationDegree.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="classificationDegree.fullCode"
        :title="$t('ClassificationDegrees.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="classificationDegree.classificationDegreeNameAr"
        :title="$t('ClassificationDegrees.nameAr')"
        :imgName="'classificationDegrees.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="classificationDegree.classificationDegreeNameEn"
        :title="$t('ClassificationDegrees.nameEn')"
        :imgName="'classificationDegrees.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="classificationDegree.classificationDegreeNameUnd"
        :title="$t('ClassificationDegrees.nameUnd')"
        :imgName="'classificationDegrees.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="classificationDegree.classificationDegreeGradeFrom"
        :title="$t('general.degreeFrom')"
        :imgName="'number.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="classificationDegree.classificationDegreeGradeTo"
        :title="$t('general.degreeTo')"
        :imgName="'number.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="classificationDegree.classificationDegreeDescriptionAr"
        :title="$t('ClassificationDegrees.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="classificationDegree.classificationDegreeDescriptionEn"
        :title="$t('ClassificationDegrees.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="classificationDegree.classificationDegreeDescriptionUnd"
        :title="$t('ClassificationDegrees.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="classificationDegree.classificationDegreeNotes"
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
  props: ["classificationDegree"],
};
</script>
