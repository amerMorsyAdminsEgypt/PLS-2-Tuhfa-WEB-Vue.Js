<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      :refName="'StoreItemInfo'"
      size="xl"
      :headerText="$t('StoreItems.data')"
      :headerIcon="storeItem.icon"
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
            :value="storeItem.fullCode"
            :title="$t('StoreItems.code')"
            :imgName="'code.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="storeItem.storeItemNameAr"
            :title="$t('StoreItems.nameAr')"
            :imgName="'StoreItems.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="storeItem.storeItemNameEn"
            :title="$t('StoreItems.nameEn')"
            :imgName="'StoreItems.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="storeItem.storeItemNameUnd"
            :title="$t('StoreItems.nameUnd')"
            :imgName="'StoreItems.svg'"
          />

          <DataLabelGroup
            :className="'col-md-6'"
            :value="storeItem.storeItemDescriptionAr"
            :title="$t('StoreItems.descriptionAr')"
            :imgName="'description.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="storeItem.storeItemDescriptionEn"
            :title="$t('StoreItems.descriptionEn')"
            :imgName="'description.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="storeItem.storeItemDescriptionUnd"
            :title="$t('StoreItems.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="storeItem.storeItemNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />
        </div>

        <PropertyTypesInfoTable
          :propertyTypesData="storeItem.propertyTypesData"
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
import PropertyTypesInfoTable from "./PropertyTypesInfoTable.vue";
import { isDataExist } from "./../../../../utils/functions";
import StoreItemMixin from "./StoreItemMixin";

export default {
  mixins: [StoreItemMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomBottomSheet,
    DataLabelGroup,
    PropertyTypesInfoTable,
  },
  methods: {
    isDataExist,
  },
};
</script>
