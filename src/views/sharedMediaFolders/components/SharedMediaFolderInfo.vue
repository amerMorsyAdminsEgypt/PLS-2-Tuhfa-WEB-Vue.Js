<template>
  <CustomBottomSheet
    :refName="'SharedMediaFolderInfo'"
    size="xl"
    :headerText="$t('SharedMediaFolders.data')"
    :headerIcon="sharedMediaFolder.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="sharedMediaFolder.fullCode"
        :title="$t('SharedMediaFolders.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="sharedMediaFolder.sharedMediaFolderNameAr"
        :title="$t('SharedMediaFolders.titleAr')"
        :imgName="'sharedMediaFolders.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="sharedMediaFolder.sharedMediaFolderNameEn"
        :title="$t('SharedMediaFolders.titleEn')"
        :imgName="'sharedMediaFolders.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="sharedMediaFolder.sharedMediaFolderNameUnd"
        :title="$t('SharedMediaFolders.titleUnd')"
        :imgName="'sharedMediaFolders.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="sharedMediaFolder.sharedMediaFolderDescriptionAr"
        :title="$t('SharedMediaFolders.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="sharedMediaFolder.sharedMediaFolderDescriptionEn"
        :title="$t('SharedMediaFolders.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="sharedMediaFolder.sharedMediaFolderDescriptionUnd"
        :title="$t('SharedMediaFolders.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="sharedMediaFolder.sharedMediaFolderNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />
      <DataLabelGroup
        v-if="
          sharedMediaFolder.sharedMediaFolderTypeToken ==
          SHARED_MEDIA_TYPE.Genral
        "
        :className="'col-md-12'"
        :value="'-'"
        :title="$t('SharedMediaFolders.sharedWith')"
        :imgName="'sharedMediaFolders.svg'"
      />
      <DataLabelGroup
        v-if="
          sharedMediaFolder.sharedMediaFolderTypeToken ==
          SHARED_MEDIA_TYPE.EducationalCategory
        "
        :className="'col-md-12'"
        :value="
          sharedMediaFolder.educationalCategoryInfoData
            .educationalCategoryNameCurrent
        "
        :title="$t('SharedMediaFolders.sharedWith')"
        :imgName="'EducationalCategories.svg'"
      />
      <DataLabelGroup
        v-if="
          sharedMediaFolder.sharedMediaFolderTypeToken ==
          SHARED_MEDIA_TYPE.EducationalGroup
        "
        :className="'col-md-12'"
        :value="
          sharedMediaFolder.educationalGroupInfoData.educationalGroupNameCurrent
        "
        :title="$t('SharedMediaFolders.sharedWith')"
        :imgName="'EducationalGroups.svg'"
      />
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../components/general/DataLabelGroup.vue";
import { SHARED_MEDIA_TYPE } from "./../../../utils/constantLists";

import {
  isDataExist,
  fullPathFileFromServer,
} from "./../../../utils/functions";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
  },
  props: ["sharedMediaFolder"],
  data() {
    return { SHARED_MEDIA_TYPE };
  },
  methods: {
    isDataExist,
    fullPathFileFromServer,
  },
};
</script>
