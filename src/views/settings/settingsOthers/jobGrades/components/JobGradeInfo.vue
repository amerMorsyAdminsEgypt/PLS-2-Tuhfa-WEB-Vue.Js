<template>
  <CustomBottomSheet
    :refName="'JobGradeInfo'"
    size="xl"
    :headerText="$t('JobGrades.data')"
    :headerIcon="jobGrade.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          jobGrade.systemComponentsHierarchyData
            .systemComponentsHierarchyNameCurrent
        "
        :title="$t('SystemComponentsHierarchies.jobGrade')"
        :imgName="'systemComponentsHierarchies.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="jobGrade.systemComponentData.systemComponentNameCurrent"
        :title="$t('SystemComponents.jobGrade')"
        :imgName="'systemComponents.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="jobGrade.fullCode"
        :title="$t('JobGrades.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="jobGrade.jobGradeNameAr"
        :title="$t('JobGrades.nameAr')"
        :imgName="'jobGrade.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="jobGrade.jobGradeNameEn"
        :title="$t('JobGrades.nameEn')"
        :imgName="'jobGrade.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="jobGrade.jobGradeNameUnd"
        :title="$t('JobGrades.nameUnd')"
        :imgName="'jobGrade.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="jobGrade.jobGradeDescriptionAr"
        :title="$t('JobGrades.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="jobGrade.jobGradeDescriptionEn"
        :title="$t('JobGrades.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="jobGrade.jobGradeDescriptionUnd"
        :title="$t('JobGrades.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="jobGrade.jobGradeNotes"
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
  props: ["jobGrade"],
};
</script>
