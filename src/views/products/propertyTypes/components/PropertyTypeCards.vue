<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(propertyType, index) in propertyTypesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="propertyType.propertyTypeNameCurrent"
      :description="propertyType.fullCode"
      :imagePath="propertyType.propertyTypeImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setPropertyTypeData(propertyType);
            openBottomSheet('PropertyTypeInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setPropertyTypeData(propertyType);
            openBottomSheet('PropertyTypeQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasPropertyTypeEdit())">
        <button
          @click="
            setPropertyTypeData(propertyType);
            openBottomSheet('PropertyTypeUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasPropertyTypeFinaleDelete())">
        <button
          v-b-modal.PropertyTypeDelete
          :title="$t('delete')"
          @click="setPropertyTypeData(propertyType)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasPropertyTypeChangeActivationType())">
        <button
          v-b-modal.PropertyTypeChangeActivationType
          :title="$t('changeActivationType')"
          @click="setPropertyTypeData(propertyType)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setPropertyTypeData(propertyType);
            openBottomSheet('ActionsData');
          "
          :title="$t('actionsData.modelName')"
        >
          <img src="@/assets/images/actions-data.svg" />
        </button>
      </li>
    </CustomCard>
  </div>
</template>

<script>
import {
  checkPrivilege,
  isDataExist,
  fullPathFileFromServer,
} from "./../../../../utils/functions";
import {
  hasPropertyTypeEdit,
  hasPropertyTypeFinaleDelete,
  hasPropertyTypeChangeActivationType,
} from "./../../../../utils/privilegeHelper";
import CustomCard from "./../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["propertyTypesData", "filterData", "defaultImg"],
  methods: {
    setPropertyTypeData(propertyType) {
      this.$emit("setPropertyTypeData", propertyType);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasPropertyTypeEdit,
    hasPropertyTypeFinaleDelete,
    hasPropertyTypeChangeActivationType,
  },
};
</script>
