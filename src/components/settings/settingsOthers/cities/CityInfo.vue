<template>
  <div>
    <CustomBottomSheet :refName="'CityInfo'">
      <h3 class="text-center mb-3">
        <img src="@/assets/images/cities.svg" class="icon-lg" />
        {{ $t("Cities.data") }}
      </h3>

      <div class="row">
        <DataLabelGroup
          :className="'col-md-6'"
          :value="city.fullCode"
          :title="$t('Cities.code')"
          :imgName="'code.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6'"
          :value="city.cityNameAr"
          :title="$t('Cities.nameAr')"
          :imgName="'cities.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="city.cityNameEn"
          :title="$t('Cities.nameEn')"
          :imgName="'cities.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="city.cityNameUnd"
          :title="$t('Cities.nameUnd')"
          :imgName="'cities.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6'"
          :value="city.cityDescriptionAr"
          :title="$t('Cities.descriptionAr')"
          :imgName="'description.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="city.cityDescriptionEn"
          :title="$t('Cities.descriptionEn')"
          :imgName="'description.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="city.cityDescriptionUnd"
          :title="$t('Cities.descriptionUnd')"
          :imgName="'description.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6'"
          :value="city.cityNotes"
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
  props: ["city"],
  methods: {},
};
</script>
