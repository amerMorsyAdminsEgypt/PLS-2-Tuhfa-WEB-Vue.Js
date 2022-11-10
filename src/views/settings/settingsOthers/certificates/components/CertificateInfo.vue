<template>
  <CustomBottomSheet
    :refName="'CertificateInfo'"
    size="xl"
    :headerText="$t('Certificates.data')"
    :headerIcon="certificate.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="certificate.fullCode"
        :title="$t('Certificates.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="certificate.certificateNameAr"
        :title="$t('Certificates.nameAr')"
        :imgName="'certificates.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="certificate.certificateNameEn"
        :title="$t('Certificates.nameEn')"
        :imgName="'certificates.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="certificate.certificateNameUnd"
        :title="$t('Certificates.nameUnd')"
        :imgName="'certificates.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="certificate.certificateDescriptionAr"
        :title="$t('Certificates.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="certificate.certificateDescriptionEn"
        :title="$t('Certificates.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="certificate.certificateDescriptionUnd"
        :title="$t('Certificates.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="certificate.certificateNotes"
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
  props: ["certificate"],
};
</script>
