<template>
  <div>
    <CustomBottomSheet :refName="'GovernorateInfo'">
      <h3 class="text-center mb-3">
        <img src="@/assets/images/governorates.svg" class="icon-lg" />
        {{ $t("Governorates.data") }}
      </h3>

      <div class="row">
        <DataLabelGroup
          :className="'col-md-6'"
          :value="governorate.fullCode"
          :title="$t('Governorates.code')"
          :imgName="'code.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6'"
          :value="governorate.governorateNameAr"
          :title="$t('Governorates.nameAr')"
          :imgName="'governorates.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="governorate.governorateNameEn"
          :title="$t('Governorates.nameEn')"
          :imgName="'governorates.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="governorate.governorateNameUnd"
          :title="$t('Governorates.nameUnd')"
          :imgName="'governorates.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6'"
          :value="governorate.governorateDescriptionAr"
          :title="$t('Governorates.descriptionAr')"
          :imgName="'description.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="governorate.governorateDescriptionEn"
          :title="$t('Governorates.descriptionEn')"
          :imgName="'description.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="governorate.governorateDescriptionUnd"
          :title="$t('Governorates.descriptionUnd')"
          :imgName="'description.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6'"
          :value="governorate.governorateNotes"
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
  props: ["governorate"],
  methods: {},
};
</script>
