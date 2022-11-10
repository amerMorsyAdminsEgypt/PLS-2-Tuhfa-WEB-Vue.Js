<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(geographicalDistribution, index) in geographicalDistributionsData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="geographicalDistribution.geographicalDistributionNameCurrent"
      :description="geographicalDistribution.fullCode"
      :imagePath="geographicalDistribution.geographicalDistributionImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li v-if="geographicalDistribution.isHaveChildrenStatus">
        <router-link
          :to="{
            name: 'GeographicalDistributions',
            params: {
              parentGeographicalDistributionToken:
                geographicalDistribution.geographicalDistributionToken,
            },
          }"
          :title="$t('GeographicalDistributions.modelName')"
        >
          <img src="@/assets/images/open.svg" />
        </router-link>
      </li>
      <li>
        <button
          :title="$t('info')"
          @click="
            setGeographicalDistributionData(geographicalDistribution);
            openBottomSheet('GeographicalDistributionInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setGeographicalDistributionData(geographicalDistribution);
            openBottomSheet('GeographicalDistributionQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasGeographicalDistributionEdit())">
        <button
          @click="
            setGeographicalDistributionData(geographicalDistribution);
            openBottomSheet('GeographicalDistributionUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasGeographicalDistributionFinaleDelete())">
        <button
          v-b-modal.GeographicalDistributionDelete
          :title="$t('delete')"
          @click="setGeographicalDistributionData(geographicalDistribution)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li
        v-if="checkPrivilege(hasGeographicalDistributionChangeActivationType())"
      >
        <button
          v-b-modal.GeographicalDistributionChangeActivationType
          :title="$t('changeActivationType')"
          @click="setGeographicalDistributionData(geographicalDistribution)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setGeographicalDistributionData(geographicalDistribution);
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
  hasGeographicalDistributionEdit,
  hasGeographicalDistributionFinaleDelete,
  hasGeographicalDistributionChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import CustomCard from "./../../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["geographicalDistributionsData", "filterData", "defaultImg"],
  methods: {
    setGeographicalDistributionData(geographicalDistribution) {
      this.$emit("setGeographicalDistributionData", geographicalDistribution);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasGeographicalDistributionEdit,
    hasGeographicalDistributionFinaleDelete,
    hasGeographicalDistributionChangeActivationType,
  },
};
</script>
