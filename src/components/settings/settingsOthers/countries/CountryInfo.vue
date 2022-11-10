<template>
  <div>
    <CustomBottomSheet :refName="'CountryInfo'">
      <h3 class="text-center mb-3">
        <img src="@/assets/images/countries.svg" class="icon-lg" />
        {{ $t("Countries.data") }}
      </h3>

      <div class="row">
        <DataLabelGroup
          :className="'col-md-6'"
          :value="country.fullCode"
          :title="$t('Countries.code')"
          :imgName="'code.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6'"
          :value="country.countryNameAr"
          :title="$t('Countries.nameAr')"
          :imgName="'countries.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="country.countryNameEn"
          :title="$t('Countries.nameEn')"
          :imgName="'countries.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="country.countryNameUnd"
          :title="$t('Countries.nameUnd')"
          :imgName="'countries.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="country.nationalityNameAr"
          :title="$t('Countries.nationalityAr')"
          :imgName="'countries.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="country.nationalityNameEn"
          :title="$t('Countries.nationalityEn')"
          :imgName="'countries.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="country.nationalityNameUnd"
          :title="$t('Countries.nationalityUnd')"
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
          :className="'col-md-12'"
          :value="country.countryNotes"
          :title="$t('notes')"
          :imgName="'notes.svg'"
        />
      </div>
    </CustomBottomSheet>
  </div>
</template>

<script>
import CustomBottomSheet from "@/components/general/CustomBottomSheet.vue";
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
  },
  data() {
    return {};
  },
  props: ["country"],
  methods: {},
};
</script>
