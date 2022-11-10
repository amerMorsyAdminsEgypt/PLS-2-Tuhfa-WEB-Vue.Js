<template>
  <CustomBottomSheet
    :refName="'InterestFollowUpInfo'"
    size="xl"
    :headerText="$t('InterestFollowUps.data')"
    :headerIcon="interestFollowUp.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="interestFollowUp.fullCode"
        :title="$t('InterestFollowUps.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="interestFollowUp.interestFollowUpTitleAr"
        :title="$t('InterestFollowUps.titleAr')"
        :imgName="'interestFollowUps.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="interestFollowUp.interestFollowUpTitleEn"
        :title="$t('InterestFollowUps.titleEn')"
        :imgName="'interestFollowUps.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="interestFollowUp.interestFollowUpTitleUnd"
        :title="$t('InterestFollowUps.titleUnd')"
        :imgName="'interestFollowUps.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="interestFollowUp.interestFollowUpDescriptionAr"
        :title="$t('InterestFollowUps.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="interestFollowUp.interestFollowUpDescriptionEn"
        :title="$t('InterestFollowUps.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="interestFollowUp.interestFollowUpDescriptionUnd"
        :title="$t('InterestFollowUps.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="interestFollowUp.interestFollowUpTypeNameCurrent"
        :title="$t('general.type')"
        :imgName="'type.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="interestFollowUp.interestFollowUpNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          interestFollowUp.educationalCategoryInterestData
            ? interestFollowUp.educationalCategoryInterestData
                .educationalCategoryInterestDescriptionCurrent
            : ''
        "
        :title="$t('Interests.title')"
        :imgName="'interestFollowUps.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          interestFollowUp.educationalCategoryInterestData
            ? interestFollowUp.educationalCategoryInterestData
                .joiningTypeNameCurrent
            : ''
        "
        :title="$t('InterestFollowUps.joiningType')"
        :imgName="'interestFollowUps.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          interestFollowUp.educationalCategoryOtherInterestData
            ? interestFollowUp.educationalCategoryOtherInterestData
                .educationalCategoryOtherInterestNameCurrent
            : ''
        "
        :title="$t('InterestFollowUps.dataOther')"
        :imgName="'interestFollowUps.svg'"
      />
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";
import { isDataExist } from "./../../../../utils/functions";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
  },
  props: ["interestFollowUp"],
  methods: { isDataExist },
};
</script>
