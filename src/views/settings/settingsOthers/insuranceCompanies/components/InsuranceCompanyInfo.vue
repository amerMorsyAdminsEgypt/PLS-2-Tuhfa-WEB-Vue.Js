<template>
  <CustomBottomSheet
    :refName="'InsuranceCompanyInfo'"
    size="xl"
    :headerText="$t('InsuranceCompanies.data')"
    :headerIcon="insuranceCompany.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="insuranceCompany.fullCode"
        :title="$t('InsuranceCompanies.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="insuranceCompany.insuranceCompanyNameAr"
        :title="$t('InsuranceCompanies.nameAr')"
        :imgName="'insuranceCompanies.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="insuranceCompany.insuranceCompanyNameEn"
        :title="$t('InsuranceCompanies.nameEn')"
        :imgName="'insuranceCompanies.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="insuranceCompany.insuranceCompanyNameUnd"
        :title="$t('InsuranceCompanies.nameUnd')"
        :imgName="'insuranceCompanies.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="insuranceCompany.insuranceCompanyDescriptionAr"
        :title="$t('InsuranceCompanies.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="insuranceCompany.insuranceCompanyDescriptionEn"
        :title="$t('InsuranceCompanies.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="insuranceCompany.insuranceCompanyDescriptionUnd"
        :title="$t('InsuranceCompanies.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="insuranceCompany.insuranceCompanyNotes"
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
  props: ["insuranceCompany"],
};
</script>
