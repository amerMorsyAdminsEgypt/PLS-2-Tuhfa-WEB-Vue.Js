<template>
  <CustomBottomSheet
    :refName="'EducationalRatingInfo'"
    size="xl"
    :headerText="$t('EducationalRatings.data')"
    :headerIcon="educationalRating.icon"
  >
    <div class="row">
      <DataLabelGroup
        v-if="educationalRating.educationalCategoryToken"
        :className="'col-md-6'"
        :value="
          educationalRating.educationalCategoryData
            ? educationalRating.educationalCategoryData
                .educationalCategoryNameCurrent
            : ''
        "
        :title="$t('EducationalCategories.name')"
        :imgName="'EducationalCategories.svg'"
      />
      <DataLabelGroup
        v-if="educationalRating.educationalGroupToken"
        :className="'col-md-6'"
        :value="
          educationalRating.educationalGroupData
            ? educationalRating.educationalGroupData.educationalGroupNameCurrent
            : ''
        "
        :title="$t('EducationalGroups.name')"
        :imgName="'EducationalGroups.svg'"
      />
      <DataLabelGroup
        v-if="educationalRating.educationalScheduleTimeToken"
        :className="'col-md-6'"
        :value="
          educationalRating.educationalScheduleTimeData
            ? educationalRating.educationalScheduleTimeData
                .educationalScheduleTimeNameCurrent
            : ''
        "
        :title="$t('EducationalScheduleTimes.name')"
        :imgName="'EducationalScheduleTimes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalRating.fullCode"
        :title="$t('EducationalRatings.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalRating.educationalRatingNumber"
        :title="$t('general.value')"
        :imgName="'number.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalRating.educationalRatingTitleAr"
        :title="$t('EducationalRatings.titleAr')"
        :imgName="'educationalRatings.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalRating.educationalRatingTitleEn"
        :title="$t('EducationalRatings.titleEn')"
        :imgName="'educationalRatings.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalRating.educationalRatingTitleUnd"
        :title="$t('EducationalRatings.titleUnd')"
        :imgName="'educationalRatings.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalRating.educationalRatingDescriptionAr"
        :title="$t('EducationalRatings.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalRating.educationalRatingDescriptionEn"
        :title="$t('EducationalRatings.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalRating.educationalRatingDescriptionUnd"
        :title="$t('EducationalRatings.descriptionUnd')"
        :imgName="'description.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalRating.educationalRatingNotes"
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
  props: ["educationalRating"],
};
</script>
