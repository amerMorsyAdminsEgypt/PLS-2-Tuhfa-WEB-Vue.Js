<template>
  <CustomBottomSheet
    :refName="'ColorInfo'"
    size="xl"
    :headerText="$t('Colors.data')"
    :headerIcon="color.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="color.fullCode"
        :title="$t('Colors.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="color.colorNameAr"
        :title="$t('Colors.nameAr')"
        :imgName="'colors.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="color.colorNameEn"
        :title="$t('Colors.nameEn')"
        :imgName="'colors.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="color.colorNameUnd"
        :title="$t('Colors.nameUnd')"
        :imgName="'colors.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="color.colorHexFromat"
        :title="$t('Colors.hexFromat')"
        :imgName="'colors.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="color.colorDescriptionAr"
        :title="$t('Colors.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="color.colorDescriptionEn"
        :title="$t('Colors.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="color.colorDescriptionUnd"
        :title="$t('Colors.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-12'"
        :value="color.colorNotes"
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
  props: ["color"],
};
</script>
