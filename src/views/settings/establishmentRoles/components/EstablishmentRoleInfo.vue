<template>
  <CustomBottomSheet
    :refName="'EstablishmentRoleInfo'"
    size="xl"
    :headerText="$t('EstablishmentRoles.data')"
    :headerIcon="establishmentRole.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="establishmentRole.fullCode"
        :title="$t('EstablishmentRoles.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="establishmentRole.establishmentRoleNameAr"
        :title="$t('EstablishmentRoles.nameAr')"
        :imgName="'establishment-role.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="establishmentRole.establishmentRoleNameEn"
        :title="$t('EstablishmentRoles.nameEn')"
        :imgName="'establishment-role.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="establishmentRole.establishmentRoleNameUnd"
        :title="$t('EstablishmentRoles.nameUnd')"
        :imgName="'establishment-role.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="establishmentRole.userTypeNameCurrent"
        :title="$t('general.type')"
        :imgName="'type.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="establishmentRole.establishmentRoleDescriptionAr"
        :title="$t('EstablishmentRoles.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="establishmentRole.establishmentRoleDescriptionEn"
        :title="$t('EstablishmentRoles.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="establishmentRole.establishmentRoleDescriptionUnd"
        :title="$t('EstablishmentRoles.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-12'"
        :value="establishmentRole.establishmentRoleNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
  },
  props: ["establishmentRole"],
};
</script>
