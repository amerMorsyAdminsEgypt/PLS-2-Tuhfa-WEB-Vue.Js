<template>
  <CustomBottomSheet
    :refName="'BodyPartInfo'"
    size="xl"
    :headerText="$t('BodyParts.data')"
    :headerIcon="bodyPart.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="bodyPart.fullCode"
        :title="$t('BodyParts.code')"
        :imgName="'code.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="bodyPart.bodyPartNameAr"
        :title="$t('BodyParts.nameAr')"
        :imgName="'bodyParts.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="bodyPart.bodyPartNameEn"
        :title="$t('BodyParts.nameEn')"
        :imgName="'bodyParts.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="bodyPart.bodyPartNameUnd"
        :title="$t('BodyParts.nameUnd')"
        :imgName="'bodyParts.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="bodyPart.bodyPartDescriptionAr"
        :title="$t('BodyParts.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="bodyPart.bodyPartDescriptionEn"
        :title="$t('BodyParts.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="bodyPart.bodyPartDescriptionUnd"
        :title="$t('BodyParts.descriptionUnd')"
        :imgName="'description.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="bodyPart.bodyPartNotes"
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
  props: ["bodyPart"],
};
</script>
