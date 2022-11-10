<template>
  <CustomBottomSheet
    :refName="'CommunicationTypeInfo'"
    size="xl"
    :headerText="$t('CommunicationTypes.data')"
    :headerIcon="communicationType.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="communicationType.fullCode"
        :title="$t('CommunicationTypes.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="communicationType.communicationTypeNameAr"
        :title="$t('CommunicationTypes.nameAr')"
        :imgName="'communicationTypes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="communicationType.communicationTypeNameEn"
        :title="$t('CommunicationTypes.nameEn')"
        :imgName="'communicationTypes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="communicationType.communicationTypeNameUnd"
        :title="$t('CommunicationTypes.nameUnd')"
        :imgName="'communicationTypes.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="communicationType.communicationTypeDescriptionAr"
        :title="$t('CommunicationTypes.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="communicationType.communicationTypeDescriptionEn"
        :title="$t('CommunicationTypes.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="communicationType.communicationTypeDescriptionUnd"
        :title="$t('CommunicationTypes.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="communicationType.communicationTypeNotes"
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
  props: ["communicationType"],
};
</script>
