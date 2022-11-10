<template>
  <CustomBottomSheet
    :refName="'KnownMethodInfo'"
    size="xl"
    :headerText="$t('KnownMethods.data')"
    :headerIcon="knownMethod.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="knownMethod.fullCode"
        :title="$t('KnownMethods.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="knownMethod.knownMethodNameAr"
        :title="$t('KnownMethods.nameAr')"
        :imgName="'knownMethods.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="knownMethod.knownMethodNameEn"
        :title="$t('KnownMethods.nameEn')"
        :imgName="'knownMethods.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="knownMethod.knownMethodNameUnd"
        :title="$t('KnownMethods.nameUnd')"
        :imgName="'knownMethods.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="knownMethod.knownMethodDescriptionAr"
        :title="$t('KnownMethods.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="knownMethod.knownMethodDescriptionEn"
        :title="$t('KnownMethods.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="knownMethod.knownMethodDescriptionUnd"
        :title="$t('KnownMethods.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="knownMethod.knownMethodNotes"
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
  props: ["knownMethod"],
};
</script>
