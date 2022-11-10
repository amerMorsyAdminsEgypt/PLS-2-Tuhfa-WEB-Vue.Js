<template>
  <CustomBottomSheet
    :refName="'ComplaintTypeInfo'"
    size="xl"
    :headerText="$t('ComplaintTypes.data')"
    :headerIcon="complaintType.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="complaintType.fullCode"
        :title="$t('ComplaintTypes.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="complaintType.complaintTypeNameAr"
        :title="$t('ComplaintTypes.nameAr')"
        :imgName="'complaintTypes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="complaintType.complaintTypeNameEn"
        :title="$t('ComplaintTypes.nameEn')"
        :imgName="'complaintTypes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="complaintType.complaintTypeNameUnd"
        :title="$t('ComplaintTypes.nameUnd')"
        :imgName="'complaintTypes.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="complaintType.complaintTypeDescriptionAr"
        :title="$t('ComplaintTypes.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="complaintType.complaintTypeDescriptionEn"
        :title="$t('ComplaintTypes.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="complaintType.complaintTypeDescriptionUnd"
        :title="$t('ComplaintTypes.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="complaintType.complaintTypeNotes"
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
  props: ["complaintType"],
};
</script>
