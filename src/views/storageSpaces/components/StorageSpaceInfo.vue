<template>
  <CustomBottomSheet
    :refName="'StorageSpaceInfo'"
    size="xl"
    :headerText="$t('StorageSpaces.data')"
    :headerIcon="storageSpace.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-12'"
        :value="storageSpace.storageSpaceShowStatusTypeNameCurrent"
        :title="$t('general.showStatus')"
        :imgName="'type.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="storageSpace.fullCode"
        :title="$t('StorageSpaces.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="storageSpace.storageSpaceNameAr"
        :title="$t('StorageSpaces.nameAr')"
        :imgName="'StorageSpaces.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="storageSpace.storageSpaceNameEn"
        :title="$t('StorageSpaces.nameEn')"
        :imgName="'StorageSpaces.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="storageSpace.storageSpaceNameUnd"
        :title="$t('StorageSpaces.nameUnd')"
        :imgName="'StorageSpaces.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="storageSpace.storageSpaceDescriptionAr"
        :title="$t('StorageSpaces.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="storageSpace.storageSpaceDescriptionEn"
        :title="$t('StorageSpaces.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="storageSpace.storageSpaceDescriptionUnd"
        :title="$t('StorageSpaces.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="storageSpace.storageSpaceNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../components/general/DataLabelGroup.vue";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
  },
  props: ["storageSpace"],
};
</script>
