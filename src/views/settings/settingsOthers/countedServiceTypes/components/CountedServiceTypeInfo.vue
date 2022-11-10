<template>
  <CustomBottomSheet
    :refName="'CountedServiceTypeInfo'"
    size="xl"
    :headerText="$t('CountedServiceTypes.data')"
    :headerIcon="countedServiceType.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="countedServiceType.fullCode"
        :title="$t('CountedServiceTypes.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="countedServiceType.countedServiceTypeNameAr"
        :title="$t('CountedServiceTypes.nameAr')"
        :imgName="'countedServiceTypes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="countedServiceType.countedServiceTypeNameEn"
        :title="$t('CountedServiceTypes.nameEn')"
        :imgName="'countedServiceTypes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="countedServiceType.countedServiceTypeNameUnd"
        :title="$t('CountedServiceTypes.nameUnd')"
        :imgName="'countedServiceTypes.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="countedServiceType.countedServiceTypeDescriptionAr"
        :title="$t('CountedServiceTypes.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="countedServiceType.countedServiceTypeDescriptionEn"
        :title="$t('CountedServiceTypes.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="countedServiceType.countedServiceTypeDescriptionUnd"
        :title="$t('CountedServiceTypes.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="countedServiceType.countedServiceTypeNotes"
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
  props: ["countedServiceType"],
};
</script>
