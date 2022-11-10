<template>
  <CustomBottomSheet
    :refName="'CountedServiceInfo'"
    size="xl"
    :headerText="$t('CountedServices.data')"
    :headerIcon="countedService.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="countedService.fullCode"
        :title="$t('CountedServices.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="countedService.countedServiceNameAr"
        :title="$t('CountedServices.nameAr')"
        :imgName="'countedServices.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="countedService.countedServiceNameEn"
        :title="$t('CountedServices.nameEn')"
        :imgName="'countedServices.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="countedService.countedServiceNameUnd"
        :title="$t('CountedServices.nameUnd')"
        :imgName="'countedServices.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          isDataExist(
            countedService.placeInfoData
              ? countedService.placeInfoData.placeNameCurrent
              : ''
          )
        "
        :title="$t('Places.name')"
        :imgName="'countedServices.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          isDataExist(
            countedService.educationalCategoryInfoData
              ? countedService.educationalCategoryInfoData
                  .educationalCategoryNameCurrent
              : ''
          )
        "
        :title="$t('EducationalCategories.name')"
        :imgName="'EducationalCategories.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          isDataExist(
            countedService.countedServiceTypeData
              ? countedService.countedServiceTypeData
                  .countedServiceTypeNameCurrent
              : ''
          )
        "
        :title="$t('CountedServiceTypes.name')"
        :imgName="'countedServiceTypes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="countedService.countedServicePriceWithCurrency"
        :title="$t('CountedServices.countedServicePrice')"
        :imgName="'money.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="countedService.countedServiceBoughtCount"
        :title="$t('CountedServices.countedServiceBoughtCount')"
        :imgName="'money.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="countedService.countedServiceSoldCount"
        :title="$t('CountedServices.countedServiceSoldCount')"
        :imgName="'money.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="countedService.countedServiceRemainCount"
        :title="$t('CountedServices.countedServiceRemainCount')"
        :imgName="'money.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="countedService.countedServiceMaximumDiscountPercentage"
        :title="$t('CountedServices.maximumDiscountPercentage')"
        :imgName="'percentage.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="countedService.countedServiceDescriptionAr"
        :title="$t('CountedServices.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="countedService.countedServiceDescriptionEn"
        :title="$t('CountedServices.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="countedService.countedServiceDescriptionUnd"
        :title="$t('CountedServices.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="countedService.countedServiceNotes"
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
  props: ["countedService"],
  methods: {
    isDataExist,
  },
};
</script>
