<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(district, index) in districtsData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="district.districtNameCurrent"
      :description="district.fullCode"
      :imagePath="district.districtImagePath"
      :defaultImg="defaultImg"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setDistrictData(district);
            openBottomSheet('DistrictInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setDistrictData(district);
            openBottomSheet('DistrictQRCode');
          "
          :title="$t('Districts.qrCode')"
        >
          <qrcode-vue :value="district.fullCode" :size="40" level="H" />
        </button>
      </li>
      <li>
        <router-link
          :to="{
            name: 'DistrictEdit',
            params: {
              districtToken: district.districtToken,
            },
          }"
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </router-link>
      </li>
      <li>
        <button
          v-b-modal.DistrictDelete
          :title="$t('delete')"
          @click="setDistrictData(district)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li>
        <!-- v-if="
            checkPrivilege(usersPrivilegeData.usersPrivilegeDistrict.update)
          " -->
        <button
          :title="$t('actionsData.modelName')"
          @click="
            setDistrictData(district);
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
  props: ["districtsData", "districtData", "pagination", "defaultImg"],
  methods: {
    setDistrictData(district) {
      this.$emit("setDistrictData", district);
    },
    isDataExist,
    checkPrivilege,
    fullPathFileFromServer,
  },
  computed: {
    ...mapGetters(["usersPrivilegeData"]),
  },
};
</script>
