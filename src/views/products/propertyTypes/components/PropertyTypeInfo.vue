<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      :refName="'PropertyTypeInfo'"
      size="xl"
      :headerText="$t('PropertyTypes.data')"
      :headerIcon="propertyType.icon"
      @opened="getDetails()"
    >
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <template v-else>
        <div class="row">
          <DataLabelGroup
            :className="'col-md-6'"
            :value="propertyType.fullCode"
            :title="$t('PropertyTypes.code')"
            :imgName="'code.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="propertyType.propertyTypeNameAr"
            :title="$t('PropertyTypes.nameAr')"
            :imgName="'PropertyTypes.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="propertyType.propertyTypeNameEn"
            :title="$t('PropertyTypes.nameEn')"
            :imgName="'PropertyTypes.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="propertyType.propertyTypeNameUnd"
            :title="$t('PropertyTypes.nameUnd')"
            :imgName="'PropertyTypes.svg'"
          />

          <DataLabelGroup
            :className="'col-md-6'"
            :value="propertyType.propertyTypeDescriptionAr"
            :title="$t('PropertyTypes.descriptionAr')"
            :imgName="'description.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="propertyType.propertyTypeDescriptionEn"
            :title="$t('PropertyTypes.descriptionEn')"
            :imgName="'description.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="propertyType.propertyTypeDescriptionUnd"
            :title="$t('PropertyTypes.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="propertyType.propertyTypeNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />
        </div>

        <PropertyDetailsTable
          :propertyDetailsData="propertyType.propertyDetailsData"
        />
      </template>
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../../components/general/ExceptionWithImg.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";
import PropertyDetailsTable from "./PropertyDetailsTable.vue";
import PropertyTypeMixin from "./PropertyTypeMixin";

export default {
  mixins: [PropertyTypeMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomBottomSheet,
    DataLabelGroup,
    PropertyDetailsTable,
  },
};
</script>
