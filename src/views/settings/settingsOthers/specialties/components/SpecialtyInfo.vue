<template>
  <CustomBottomSheet
    :refName="'SpecialtyInfo'"
    size="xl"
    :headerText="$t('Specialties.data')"
    :headerIcon="specialty.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="specialty.fullCode"
        :title="$t('Specialties.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="specialty.specialtieNameAr"
        :title="$t('Specialties.nameAr')"
        :imgName="'specialties.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="specialty.specialtieNameEn"
        :title="$t('Specialties.nameEn')"
        :imgName="'specialties.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="specialty.specialtieNameUnd"
        :title="$t('Specialties.nameUnd')"
        :imgName="'specialties.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="specialty.specialtieDescriptionAr"
        :title="$t('Specialties.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="specialty.specialtieDescriptionEn"
        :title="$t('Specialties.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="specialty.specialtieDescriptionUnd"
        :title="$t('Specialties.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="specialty.specialtieNotes"
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
  props: ["specialty"],
};
</script>
