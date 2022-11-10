<template>
  <CustomBottomSheet
    :refName="'StorageSpaceMediaInfo'"
    size="xl"
    :headerText="$t('StorageSpaces.media.data')"
    :headerIcon="storageSpaceMedia.icon"
    @closed="storageSpaceMedia.setInitialValue(mainToken)"
  >
    <div class="row">
      <ShowMedia :class="'col-md-12'" :media="storageSpaceMedia" />
    </div>
    <div class="row">
      <DataLabelGroup
        :className="'col-md-12'"
        :value="
          storageSpaceMedia.storageSpaceMediaFileShowStatusTypeNameCurrent
        "
        :title="$t('general.showStatus')"
        :imgName="'type.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="storageSpaceMedia.fullCode"
        :title="$t('StorageSpaces.media.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="storageSpaceMedia.storageSpaceMediaNameAr"
        :title="$t('StorageSpaces.media.nameAr')"
        :imgName="'media.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="storageSpaceMedia.storageSpaceMediaNameEn"
        :title="$t('StorageSpaces.media.nameEn')"
        :imgName="'media.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="storageSpaceMedia.storageSpaceMediaNameUnd"
        :title="$t('StorageSpaces.media.nameUnd')"
        :imgName="'media.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="storageSpaceMedia.storageSpaceMediaDescriptionAr"
        :title="$t('StorageSpaces.media.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="storageSpaceMedia.storageSpaceMediaDescriptionEn"
        :title="$t('StorageSpaces.media.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="storageSpaceMedia.storageSpaceMediaDescriptionUnd"
        :title="$t('StorageSpaces.media.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="storageSpaceMedia.storageSpaceMediaNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../components/general/DataLabelGroup.vue";
import ShowMedia from "./ShowMedia.vue";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
    ShowMedia,
  },
  props: ["storageSpaceMedia", "mainToken"],
  data() {
    return {};
  },
  methods: {},
  created() {},
};
</script>
