<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(country, index) in countriesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="country.countryNameCurrent"
      :description="country.fullCode"
      :imagePath="country.countryImagePath"
      :defaultImg="defaultImg"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setCountryData(country);
            openBottomSheet('CountryInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setCountryData(country);
            openBottomSheet('CountryQRCode');
          "
          :title="$t('Countries.qrCode')"
        >
          <qrcode-vue :value="country.fullCode" :size="40" level="H" />
        </button>
      </li>
      <li>
        <router-link
          :to="{
            name: 'CountryEdit',
            params: {
              countryToken: country.countryToken,
            },
          }"
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </router-link>
      </li>
      <li>
        <button
          v-b-modal.CountryDelete
          :title="$t('delete')"
          @click="setCountryData(country)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li>
        <!-- v-if="checkPrivilege(usersPrivilegeData.usersPrivilegeCountry.update)" -->
        <button
          :title="$t('actionsData.modelName')"
          @click="
            setCountryData(country);
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
  props: ["countriesData", "countryData", "pagination", "defaultImg"],
  methods: {
    setCountryData(country) {
      this.$emit("setCountryData", country);
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
