<template>
  <CustomBottomSheet
    :refName="'CountryInfo'"
    size="xl"
    :headerText="$t('Countries.data')"
    :headerIcon="country.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="country.fullCode"
        :title="$t('Countries.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="country.nationalityNameAr"
        :title="$t('Countries.nameAr')"
        :imgName="'countries.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="country.nationalityNameEn"
        :title="$t('Countries.nameEn')"
        :imgName="'countries.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="country.nationalityNameUnd"
        :title="$t('Countries.nameUnd')"
        :imgName="'countries.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="country.countryDescriptionAr"
        :title="$t('Countries.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="country.countryDescriptionEn"
        :title="$t('Countries.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="country.countryDescriptionUnd"
        :title="$t('Countries.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="country.countryNotes"
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
  props: ["country"],
};
</script>
