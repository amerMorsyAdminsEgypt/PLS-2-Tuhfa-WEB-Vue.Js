<template>
  <CustomBottomSheet
    :refName="'SocialStatuseInfo'"
    size="xl"
    :headerText="$t('SocialStatuses.data')"
    :headerIcon="socialStatuse.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="socialStatuse.fullCode"
        :title="$t('SocialStatuses.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="socialStatuse.socialStatuseNameAr"
        :title="$t('SocialStatuses.nameAr')"
        :imgName="'socialStatuses.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="socialStatuse.socialStatuseNameEn"
        :title="$t('SocialStatuses.nameEn')"
        :imgName="'socialStatuses.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="socialStatuse.socialStatuseNameUnd"
        :title="$t('SocialStatuses.nameUnd')"
        :imgName="'socialStatuses.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="socialStatuse.socialStatuseDescriptionAr"
        :title="$t('SocialStatuses.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="socialStatuse.socialStatuseDescriptionEn"
        :title="$t('SocialStatuses.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="socialStatuse.socialStatuseDescriptionUnd"
        :title="$t('SocialStatuses.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="socialStatuse.socialStatuseNotes"
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
  props: ["socialStatuse"],
};
</script>
