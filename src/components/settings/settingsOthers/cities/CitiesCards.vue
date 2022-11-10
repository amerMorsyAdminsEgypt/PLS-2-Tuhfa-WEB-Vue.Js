<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(city, index) in citiesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="city.cityNameCurrent"
      :description="city.fullCode"
      :imagePath="city.cityImagePath"
      :defaultImg="defaultImg"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setCityData(city);
            openBottomSheet('CityInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setCityData(city);
            openBottomSheet('CityQRCode');
          "
          :title="$t('Cities.qrCode')"
        >
          <qrcode-vue :value="city.fullCode" :size="40" level="H" />
        </button>
      </li>
      <li>
        <router-link
          :to="{
            name: 'CityEdit',
            params: {
              cityToken: city.cityToken,
            },
          }"
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </router-link>
      </li>
      <li>
        <button
          v-b-modal.CityDelete
          :title="$t('delete')"
          @click="setCityData(city)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li>
        <!-- v-if="checkPrivilege(usersPrivilegeData.usersPrivilegeCity.update)" -->
        <button
          :title="$t('actionsData.modelName')"
          @click="
            setCityData(city);
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
  props: ["citiesData", "cityData", "pagination", "defaultImg"],
  methods: {
    setCityData(city) {
      this.$emit("setCityData", city);
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
