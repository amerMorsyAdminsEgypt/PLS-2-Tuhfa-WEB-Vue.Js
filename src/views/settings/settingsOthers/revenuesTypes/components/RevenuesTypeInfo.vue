<template>
  <CustomBottomSheet
    :refName="'RevenuesTypeInfo'"
    size="xl"
    :headerText="$t('RevenuesTypes.data')"
    :headerIcon="revenuesType.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="revenuesType.fullCode"
        :title="$t('RevenuesTypes.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="revenuesType.revenuesTypeNameAr"
        :title="$t('RevenuesTypes.nameAr')"
        :imgName="'revenuesTypes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="revenuesType.revenuesTypeNameEn"
        :title="$t('RevenuesTypes.nameEn')"
        :imgName="'revenuesTypes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="revenuesType.revenuesTypeNameUnd"
        :title="$t('RevenuesTypes.nameUnd')"
        :imgName="'revenuesTypes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="revenuesType.revenuesTypeDefaultPrice"
        :title="$t('general.defaultPrice')"
        :imgName="'money.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="revenuesType.revenuesTypeDescriptionAr"
        :title="$t('RevenuesTypes.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="revenuesType.revenuesTypeDescriptionEn"
        :title="$t('RevenuesTypes.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="revenuesType.revenuesTypeDescriptionUnd"
        :title="$t('RevenuesTypes.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-12'"
        :value="revenuesType.revenuesTypeNotes"
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
  props: ["revenuesType"],
};
</script>
