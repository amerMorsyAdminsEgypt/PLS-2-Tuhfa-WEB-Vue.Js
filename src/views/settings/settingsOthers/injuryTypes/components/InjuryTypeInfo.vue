<template>
  <CustomBottomSheet
    :refName="'InjuryTypeInfo'"
    size="xl"
    :headerText="$t('InjuryTypes.data')"
    :headerIcon="injuryType.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="injuryType.fullCode"
        :title="$t('InjuryTypes.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="injuryType.injuryTypeNameAr"
        :title="$t('InjuryTypes.nameAr')"
        :imgName="'injuryTypes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="injuryType.injuryTypeNameEn"
        :title="$t('InjuryTypes.nameEn')"
        :imgName="'injuryTypes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="injuryType.injuryTypeNameUnd"
        :title="$t('InjuryTypes.nameUnd')"
        :imgName="'injuryTypes.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="injuryType.injuryTypeDescriptionAr"
        :title="$t('InjuryTypes.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="injuryType.injuryTypeDescriptionEn"
        :title="$t('InjuryTypes.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="injuryType.injuryTypeDescriptionUnd"
        :title="$t('InjuryTypes.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="injuryType.injuryTypeNotes"
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
  props: ["injuryType"],
};
</script>
