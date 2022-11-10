<template>
  <CustomBottomSheet
    :refName="'ServiceTypeInfo'"
    size="xl"
    :headerText="$t('ServiceTypes.data')"
    :headerIcon="serviceType.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="serviceType.fullCode"
        :title="$t('ServiceTypes.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="serviceType.serviceTypeNameAr"
        :title="$t('ServiceTypes.nameAr')"
        :imgName="'serviceTypes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="serviceType.serviceTypeNameEn"
        :title="$t('ServiceTypes.nameEn')"
        :imgName="'serviceTypes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="serviceType.serviceTypeNameUnd"
        :title="$t('ServiceTypes.nameUnd')"
        :imgName="'serviceTypes.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="serviceType.serviceTypeDescriptionAr"
        :title="$t('ServiceTypes.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="serviceType.serviceTypeDescriptionEn"
        :title="$t('ServiceTypes.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="serviceType.serviceTypeDescriptionUnd"
        :title="$t('ServiceTypes.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="serviceType.serviceTypeNotes"
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
  props: ["serviceType"],
};
</script>
