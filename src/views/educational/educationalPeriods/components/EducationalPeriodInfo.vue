<template>
  <CustomBottomSheet
    :refName="'EducationalPeriodInfo'"
    size="xl"
    :headerText="$t('EducationalPeriods.data')"
    :headerIcon="educationalPeriod.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalPeriod.fullCode"
        :title="$t('EducationalPeriods.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalPeriod.closedStateTypeNameCurrent"
        :title="$t('general.state')"
        :imgName="'type.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalPeriod.educationalPeriodNameAr"
        :title="$t('EducationalPeriods.nameAr')"
        :imgName="'educationalPeriods.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalPeriod.educationalPeriodNameEn"
        :title="$t('EducationalPeriods.nameEn')"
        :imgName="'educationalPeriods.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalPeriod.educationalPeriodNameUnd"
        :title="$t('EducationalPeriods.nameUnd')"
        :imgName="'educationalPeriods.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalPeriod.educationalPeriodDescriptionAr"
        :title="$t('EducationalPeriods.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalPeriod.educationalPeriodDescriptionEn"
        :title="$t('EducationalPeriods.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalPeriod.educationalPeriodDescriptionUnd"
        :title="$t('EducationalPeriods.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalPeriod.educationalPeriodStartDate"
        :title="$t('general.start')"
        :imgName="'date.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalPeriod.educationalPeriodEndDate"
        :title="$t('general.end')"
        :imgName="'date.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalPeriod.educationalPeriodDurationCurrent"
        :title="$t('general.duration')"
        :imgName="'date.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalPeriod.educationalPeriodNotes"
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
  props: ["educationalPeriod"],
};
</script>
