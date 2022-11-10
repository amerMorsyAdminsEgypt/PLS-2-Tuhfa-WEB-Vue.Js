<template>
  <CustomBottomSheet
    :refName="'PersonalCardTypeInfo'"
    size="xl"
    :headerText="$t('PersonalCardTypes.data')"
    :headerIcon="personalCardType.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="personalCardType.fullCode"
        :title="$t('PersonalCardTypes.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="personalCardType.personalCardTypeNameAr"
        :title="$t('PersonalCardTypes.nameAr')"
        :imgName="'personalCardTypes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="personalCardType.personalCardTypeNameEn"
        :title="$t('PersonalCardTypes.nameEn')"
        :imgName="'personalCardTypes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="personalCardType.personalCardTypeNameUnd"
        :title="$t('PersonalCardTypes.nameUnd')"
        :imgName="'personalCardTypes.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="personalCardType.personalCardTypeDescriptionAr"
        :title="$t('PersonalCardTypes.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="personalCardType.personalCardTypeDescriptionEn"
        :title="$t('PersonalCardTypes.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="personalCardType.personalCardTypeDescriptionUnd"
        :title="$t('PersonalCardTypes.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="personalCardType.personalCardTypeNotes"
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
  props: ["personalCardType"],
};
</script>
