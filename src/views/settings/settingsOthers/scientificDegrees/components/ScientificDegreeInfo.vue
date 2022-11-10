<template>
  <CustomBottomSheet
    :refName="'ScientificDegreeInfo'"
    size="xl"
    :headerText="$t('ScientificDegrees.data')"
    :headerIcon="scientificDegree.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="scientificDegree.fullCode"
        :title="$t('ScientificDegrees.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="scientificDegree.scientificDegreeNameAr"
        :title="$t('ScientificDegrees.nameAr')"
        :imgName="'scientificDegrees.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="scientificDegree.scientificDegreeNameEn"
        :title="$t('ScientificDegrees.nameEn')"
        :imgName="'scientificDegrees.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="scientificDegree.scientificDegreeNameUnd"
        :title="$t('ScientificDegrees.nameUnd')"
        :imgName="'scientificDegrees.svg'"
      />
      <!-- <DataLabelGroup
        :className="'col-md-6'"
        :value="scientificDegree.scientificDegreeGradeFrom"
        :title="$t('general.degreeFrom')"
        :imgName="'number.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="scientificDegree.scientificDegreeGradeTo"
        :title="$t('general.degreeTo')"
        :imgName="'number.svg'"
      /> -->

      <DataLabelGroup
        :className="'col-md-6'"
        :value="scientificDegree.scientificDegreeDescriptionAr"
        :title="$t('ScientificDegrees.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="scientificDegree.scientificDegreeDescriptionEn"
        :title="$t('ScientificDegrees.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="scientificDegree.scientificDegreeDescriptionUnd"
        :title="$t('ScientificDegrees.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="scientificDegree.scientificDegreeNotes"
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
  props: ["scientificDegree"],
};
</script>
