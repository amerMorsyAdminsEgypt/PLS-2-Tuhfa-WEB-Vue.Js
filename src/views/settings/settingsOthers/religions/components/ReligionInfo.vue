<template>
  <CustomBottomSheet
    :refName="'ReligionInfo'"
    size="xl"
    :headerText="$t('Religions.data')"
    :headerIcon="religion.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="religion.fullCode"
        :title="$t('Religions.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="religion.religionNameAr"
        :title="$t('Religions.nameAr')"
        :imgName="'religions.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="religion.religionNameEn"
        :title="$t('Religions.nameEn')"
        :imgName="'religions.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="religion.religionNameUnd"
        :title="$t('Religions.nameUnd')"
        :imgName="'religions.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="religion.religionDescriptionAr"
        :title="$t('Religions.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="religion.religionDescriptionEn"
        :title="$t('Religions.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="religion.religionDescriptionUnd"
        :title="$t('Religions.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="religion.religionNotes"
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
  props: ["religion"],
};
</script>
