<template>
  <div>
    <CustomBottomSheet :refName="'DistrictInfo'">
      <h3 class="text-center mb-3">
        <img src="@/assets/images/districts.svg" class="icon-lg" />
        {{ $t("Districts.data") }}
      </h3>

      <div class="row">
        <DataLabelGroup
          :className="'col-md-6'"
          :value="district.fullCode"
          :title="$t('Districts.code')"
          :imgName="'code.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6'"
          :value="district.districtNameAr"
          :title="$t('Districts.nameAr')"
          :imgName="'districts.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="district.districtNameEn"
          :title="$t('Districts.nameEn')"
          :imgName="'districts.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="district.districtNameUnd"
          :title="$t('Districts.nameUnd')"
          :imgName="'districts.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6'"
          :value="district.districtDescriptionAr"
          :title="$t('Districts.descriptionAr')"
          :imgName="'description.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="district.districtDescriptionEn"
          :title="$t('Districts.descriptionEn')"
          :imgName="'description.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="district.districtDescriptionUnd"
          :title="$t('Districts.descriptionUnd')"
          :imgName="'description.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6'"
          :value="district.districtNotes"
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
  props: ["district"],
  methods: {},
};
</script>
