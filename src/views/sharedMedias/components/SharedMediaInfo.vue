<template>
  <CustomBottomSheet
    :refName="'SharedMediaInfo'"
    size="xl"
    :headerText="$t('SharedMedias.data')"
    :headerIcon="sharedMedia.icon"
  >
    <div class="row">
      <ShowMedia :class="'col-md-12'" :media="sharedMedia" />
    </div>
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="sharedMedia.fullCode"
        :title="$t('SharedMedias.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="sharedMedia.sharedMediaNameAr"
        :title="$t('SharedMedias.titleAr')"
        :imgName="'sharedMedias.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="sharedMedia.sharedMediaNameEn"
        :title="$t('SharedMedias.titleEn')"
        :imgName="'sharedMedias.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="sharedMedia.sharedMediaNameUnd"
        :title="$t('SharedMedias.titleUnd')"
        :imgName="'sharedMedias.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="sharedMedia.sharedMediaDescriptionAr"
        :title="$t('SharedMedias.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="sharedMedia.sharedMediaDescriptionEn"
        :title="$t('SharedMedias.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="sharedMedia.sharedMediaDescriptionUnd"
        :title="$t('SharedMedias.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="sharedMedia.sharedMediaNotes"
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

import {
  isDataExist,
  fullPathFileFromServer,
} from "./../../../utils/functions";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
    ShowMedia,
  },
  props: ["sharedMedia"],
  data() {
    return {};
  },
  methods: {
    isDataExist,
    fullPathFileFromServer,
  },
};
</script>
