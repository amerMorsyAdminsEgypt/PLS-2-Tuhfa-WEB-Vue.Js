<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(service, index) in servicesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="service.serviceNameCurrent"
      :description="service.fullCode"
      :imagePath="service.serviceImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setServiceData(service);
            openBottomSheet('ServiceInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setServiceData(service);
            openBottomSheet('ServiceQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasServiceEdit())">
        <button
          @click="
            setServiceData(service);
            openBottomSheet('ServiceUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasServiceFinaleDelete())">
        <button
          v-b-modal.ServiceDelete
          :title="$t('delete')"
          @click="setServiceData(service)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasServiceChangeActivationType())">
        <button
          v-b-modal.ServiceChangeActivationType
          :title="$t('changeActivationType')"
          @click="setServiceData(service)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setServiceData(service);
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
  hasServiceEdit,
  hasServiceFinaleDelete,
  hasServiceChangeActivationType,
} from "./../../../utils/privilegeHelper";
import CustomCard from "./../../../components/general/CustomCard.vue";
import generalMixin from "./../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["servicesData", "filterData", "defaultImg"],
  methods: {
    setServiceData(service) {
      this.$emit("setServiceData", service);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasServiceEdit,
    hasServiceFinaleDelete,
    hasServiceChangeActivationType,
  },
};
</script>
