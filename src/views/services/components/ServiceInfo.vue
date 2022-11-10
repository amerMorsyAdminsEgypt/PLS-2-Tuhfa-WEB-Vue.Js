<template>
  <CustomBottomSheet
    :refName="'ServiceInfo'"
    size="xl"
    :headerText="$t('Services.data')"
    :headerIcon="service.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="service.fullCode"
        :title="$t('Services.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="service.serviceNameAr"
        :title="$t('Services.nameAr')"
        :imgName="'services.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="service.serviceNameEn"
        :title="$t('Services.nameEn')"
        :imgName="'services.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="service.serviceNameUnd"
        :title="$t('Services.nameUnd')"
        :imgName="'services.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          isDataExist(
            service.placeInfoData ? service.placeInfoData.placeNameCurrent : ''
          )
        "
        :title="$t('Places.name')"
        :imgName="'services.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          isDataExist(
            service.serviceTypeData
              ? service.serviceTypeData.serviceTypeNameCurrent
              : ''
          )
        "
        :title="$t('ServiceTypes.name')"
        :imgName="'serviceTypes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          isDataExist(
            service.educationalCategoryInfoData
              ? service.educationalCategoryInfoData
                  .educationalCategoryNameCurrent
              : ''
          )
        "
        :title="$t('EducationalCategories.name')"
        :imgName="'EducationalCategories.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="service.servicePrice"
        :title="$t('Services.servicePrice')"
        :imgName="'money.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="service.serviceMaximumDiscountPercentage"
        :title="$t('Services.maximumDiscountPercentage')"
        :imgName="'percentage.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="service.serviceDescriptionAr"
        :title="$t('Services.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="service.serviceDescriptionEn"
        :title="$t('Services.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="service.serviceDescriptionUnd"
        :title="$t('Services.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-12'"
        :value="service.serviceNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../components/general/DataLabelGroup.vue";
import { isDataExist } from "./../../../utils/functions";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
  },
  props: ["service"],
  methods: {
    isDataExist,
  },
};
</script>
