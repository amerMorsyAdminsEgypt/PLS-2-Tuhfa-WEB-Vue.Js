<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(countedServiceType, index) in countedServiceTypesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="countedServiceType.countedServiceTypeNameCurrent"
      :description="countedServiceType.fullCode"
      :imagePath="countedServiceType.countedServiceTypeImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setCountedServiceTypeData(countedServiceType);
            openBottomSheet('CountedServiceTypeInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setCountedServiceTypeData(countedServiceType);
            openBottomSheet('CountedServiceTypeQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasCountedServiceTypeEdit())">
        <button
          @click="
            setCountedServiceTypeData(countedServiceType);
            openBottomSheet('CountedServiceTypeUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasCountedServiceTypeFinaleDelete())">
        <button
          v-b-modal.CountedServiceTypeDelete
          :title="$t('delete')"
          @click="setCountedServiceTypeData(countedServiceType)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasCountedServiceTypeChangeActivationType())">
        <button
          v-b-modal.CountedServiceTypeChangeActivationType
          :title="$t('changeActivationType')"
          @click="setCountedServiceTypeData(countedServiceType)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setCountedServiceTypeData(countedServiceType);
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
} from "./../../../../../utils/functions";
import {
  hasCountedServiceTypeEdit,
  hasCountedServiceTypeFinaleDelete,
  hasCountedServiceTypeChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import CustomCard from "./../../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["countedServiceTypesData", "filterData", "defaultImg"],
  methods: {
    setCountedServiceTypeData(countedServiceType) {
      this.$emit("setCountedServiceTypeData", countedServiceType);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasCountedServiceTypeEdit,
    hasCountedServiceTypeFinaleDelete,
    hasCountedServiceTypeChangeActivationType,
  },
};
</script>
