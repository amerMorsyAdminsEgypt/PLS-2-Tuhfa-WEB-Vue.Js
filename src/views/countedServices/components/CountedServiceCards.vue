<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(countedService, index) in countedServicesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="countedService.countedServiceNameCurrent"
      :description="countedService.fullCode"
      :imagePath="countedService.countedServiceImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setCountedServiceData(countedService);
            openBottomSheet('CountedServiceInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setCountedServiceData(countedService);
            openBottomSheet('CountedServiceQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasCountedServiceEdit())">
        <button
          @click="
            setCountedServiceData(countedService);
            openBottomSheet('CountedServiceUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasCountedServiceFinaleDelete())">
        <button
          v-b-modal.CountedServiceDelete
          :title="$t('delete')"
          @click="setCountedServiceData(countedService)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasCountedServiceChangeActivationType())">
        <button
          v-b-modal.CountedServiceChangeActivationType
          :title="$t('changeActivationType')"
          @click="setCountedServiceData(countedService)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setCountedServiceData(countedService);
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
} from "./../../../utils/functions";
import {
  hasCountedServiceEdit,
  hasCountedServiceFinaleDelete,
  hasCountedServiceChangeActivationType,
} from "./../../../utils/privilegeHelper";
import CustomCard from "./../../../components/general/CustomCard.vue";
import generalMixin from "./../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["countedServicesData", "filterData", "defaultImg"],
  methods: {
    setCountedServiceData(countedService) {
      this.$emit("setCountedServiceData", countedService);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasCountedServiceEdit,
    hasCountedServiceFinaleDelete,
    hasCountedServiceChangeActivationType,
  },
};
</script>
