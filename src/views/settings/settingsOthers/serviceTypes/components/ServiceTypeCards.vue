<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(serviceType, index) in serviceTypesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="serviceType.serviceTypeNameCurrent"
      :description="serviceType.fullCode"
      :imagePath="serviceType.serviceTypeImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setServiceTypeData(serviceType);
            openBottomSheet('ServiceTypeInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setServiceTypeData(serviceType);
            openBottomSheet('ServiceTypeQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasServiceTypeEdit())">
        <button
          @click="
            setServiceTypeData(serviceType);
            openBottomSheet('ServiceTypeUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasServiceTypeFinaleDelete())">
        <button
          v-b-modal.ServiceTypeDelete
          :title="$t('delete')"
          @click="setServiceTypeData(serviceType)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasServiceTypeChangeActivationType())">
        <button
          v-b-modal.ServiceTypeChangeActivationType
          :title="$t('changeActivationType')"
          @click="setServiceTypeData(serviceType)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setServiceTypeData(serviceType);
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
  hasServiceTypeEdit,
  hasServiceTypeFinaleDelete,
  hasServiceTypeChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import CustomCard from "./../../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["serviceTypesData", "filterData", "defaultImg"],
  methods: {
    setServiceTypeData(serviceType) {
      this.$emit("setServiceTypeData", serviceType);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasServiceTypeEdit,
    hasServiceTypeFinaleDelete,
    hasServiceTypeChangeActivationType,
  },
};
</script>
