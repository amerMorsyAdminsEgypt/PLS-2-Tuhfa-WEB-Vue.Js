<template>
  <CustomBottomSheet
    :refName="'NewsCategoryInfo'"
    size="xl"
    :headerText="$t('NewsCategories.data')"
    :headerIcon="newsCategory.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="newsCategory.fullCode"
        :title="$t('NewsCategories.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="newsCategory.newsCategoryNameAr"
        :title="$t('NewsCategories.nameAr')"
        :imgName="'newsCategories.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="newsCategory.newsCategoryNameEn"
        :title="$t('NewsCategories.nameEn')"
        :imgName="'newsCategories.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="newsCategory.newsCategoryNameUnd"
        :title="$t('NewsCategories.nameUnd')"
        :imgName="'newsCategories.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="newsCategory.newsCategoryDescriptionAr"
        :title="$t('NewsCategories.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="newsCategory.newsCategoryDescriptionEn"
        :title="$t('NewsCategories.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="newsCategory.newsCategoryDescriptionUnd"
        :title="$t('NewsCategories.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="newsCategory.newsCategoryNotes"
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
  props: ["newsCategory"],
};
</script>
