<template>
  <CustomBottomSheet
    :refName="'GeneralJobInfo'"
    size="xl"
    :headerText="$t('GeneralJobs.data')"
    :headerIcon="generalJob.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="generalJob.fullCode"
        :title="$t('GeneralJobs.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="generalJob.generalJobNameAr"
        :title="$t('GeneralJobs.nameAr')"
        :imgName="'generalJobs.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="generalJob.generalJobNameEn"
        :title="$t('GeneralJobs.nameEn')"
        :imgName="'generalJobs.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="generalJob.generalJobNameUnd"
        :title="$t('GeneralJobs.nameUnd')"
        :imgName="'generalJobs.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="generalJob.generalJobDescriptionAr"
        :title="$t('GeneralJobs.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="generalJob.generalJobDescriptionEn"
        :title="$t('GeneralJobs.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="generalJob.generalJobDescriptionUnd"
        :title="$t('GeneralJobs.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="generalJob.generalJobNotes"
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
  props: ["generalJob"],
};
</script>
