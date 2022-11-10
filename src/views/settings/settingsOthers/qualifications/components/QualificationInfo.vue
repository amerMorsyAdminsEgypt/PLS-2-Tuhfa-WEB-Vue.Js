<template>
  <CustomBottomSheet
    :refName="'QualificationInfo'"
    size="xl"
    :headerText="$t('Qualifications.data')"
    :headerIcon="qualification.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="qualification.fullCode"
        :title="$t('Qualifications.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="qualification.qualificationNameAr"
        :title="$t('Qualifications.nameAr')"
        :imgName="'qualifications.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="qualification.qualificationNameEn"
        :title="$t('Qualifications.nameEn')"
        :imgName="'qualifications.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="qualification.qualificationNameUnd"
        :title="$t('Qualifications.nameUnd')"
        :imgName="'qualifications.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="qualification.qualificationDescriptionAr"
        :title="$t('Qualifications.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="qualification.qualificationDescriptionEn"
        :title="$t('Qualifications.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="qualification.qualificationDescriptionUnd"
        :title="$t('Qualifications.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="qualification.qualificationNotes"
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
  props: ["qualification"],
};
</script>
