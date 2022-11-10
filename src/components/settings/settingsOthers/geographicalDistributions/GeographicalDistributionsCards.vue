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
    >
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
          :title="$t('GeographicalDistributions.qrCode')"
        >
          <qrcode-vue
            :value="geographicalDistribution.fullCode"
            :size="40"
            level="H"
          />
        </button>
      </li>
      <li v-if="checkPrivilege(hasGeographicalDistributionEdit())">
        <router-link
          :to="{
            name: 'GeographicalDistributionEdit',
            params: {
              geographicalDistributionToken:
                geographicalDistribution.geographicalDistributionToken,
            },
          }"
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </router-link>
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
      <li>
        <!-- v-if="checkPrivilege(usersPrivilegeData.usersPrivilegeGeographicalDistribution.update)" -->
        <button
          :title="$t('actionsData.modelName')"
          @click="
            setGeographicalDistributionData(geographicalDistribution);
            openBottomSheet('ActionsData');
          "
        >
          <img src="@/assets/images/actions-data.svg" />
        </button>
      </li>
    </CustomCard>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  isDataExist,
  checkPrivilege,
  fullPathFileFromServer,
} from "@/utils/functions";
import {
  hasGeographicalDistributionEdit,
  hasGeographicalDistributionFinaleDelete,
} from "@/utils/privilegeHelper";
import CustomCard from "@/components/general/CustomCard.vue";
import QrcodeVue from "qrcode.vue";
import generalMixin from "@/utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
    QrcodeVue,
  },
  data() {
    return {};
  },
  props: [
    "geographicalDistributionsData",
    "geographicalDistributionData",
    "pagination",
    "defaultImg",
  ],
  methods: {
    setGeographicalDistributionData(geographicalDistribution) {
      this.$emit("setGeographicalDistributionData", geographicalDistribution);
    },
    isDataExist,
    checkPrivilege,
    fullPathFileFromServer,
    hasGeographicalDistributionEdit,
    hasGeographicalDistributionFinaleDelete,
  },
  computed: {
    ...mapGetters(["usersPrivilegeData"]),
  },
};
</script>
