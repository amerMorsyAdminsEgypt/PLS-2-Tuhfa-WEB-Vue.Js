<template>
  <CustomBottomSheet
    :refName="'BloodTypeInfo'"
    size="xl"
    :headerText="$t('BloodTypes.data')"
    :headerIcon="bloodType.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="bloodType.fullCode"
        :title="$t('BloodTypes.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="bloodType.bloodTypeNameAr"
        :title="$t('BloodTypes.nameAr')"
        :imgName="'BloodTypes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="bloodType.bloodTypeNameEn"
        :title="$t('BloodTypes.nameEn')"
        :imgName="'BloodTypes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="bloodType.bloodTypeNameUnd"
        :title="$t('BloodTypes.nameUnd')"
        :imgName="'BloodTypes.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="bloodType.bloodTypeDescriptionAr"
        :title="$t('BloodTypes.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="bloodType.bloodTypeDescriptionEn"
        :title="$t('BloodTypes.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="bloodType.bloodTypeDescriptionUnd"
        :title="$t('BloodTypes.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="bloodType.bloodTypeNotes"
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
  props: ["bloodType"],
};
</script>
