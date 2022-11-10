<template>
  <CustomBottomSheet
    :refName="'SystemComponentInfo'"
    size="xl"
    :headerText="$t('SystemComponents.data')"
    :headerIcon="systemComponent.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="systemComponent.fullCode"
        :title="$t('SystemComponents.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="systemComponent.systemComponentNameAr"
        :title="$t('SystemComponents.nameAr')"
        :imgName="'systemComponents.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="systemComponent.systemComponentNameEn"
        :title="$t('SystemComponents.nameEn')"
        :imgName="'systemComponents.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="systemComponent.systemComponentNameUnd"
        :title="$t('SystemComponents.nameUnd')"
        :imgName="'systemComponents.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="systemComponent.systemComponentDescriptionAr"
        :title="$t('SystemComponents.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="systemComponent.systemComponentDescriptionEn"
        :title="$t('SystemComponents.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="systemComponent.systemComponentDescriptionUnd"
        :title="$t('SystemComponents.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="systemComponent.systemComponentNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
  },
  props: ["systemComponent"],
};
</script>
