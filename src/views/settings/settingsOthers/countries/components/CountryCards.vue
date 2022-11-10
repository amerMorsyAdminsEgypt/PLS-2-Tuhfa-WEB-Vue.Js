<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(country, index) in countriesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="country.nationalityNameCurrent"
      :description="country.fullCode"
      :imagePath="country.countryImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
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
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasCountryEdit())">
        <button
          @click="
            setCountryData(country);
            openBottomSheet('CountryUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasCountryFinaleDelete())">
        <button
          v-b-modal.CountryDelete
          :title="$t('delete')"
          @click="setCountryData(country)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasCountryChangeActivationType())">
        <button
          v-b-modal.CountryChangeActivationType
          :title="$t('changeActivationType')"
          @click="setCountryData(country)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setCountryData(country);
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
  hasCountryEdit,
  hasCountryFinaleDelete,
  hasCountryChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import CustomCard from "./../../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["countriesData", "filterData", "defaultImg"],
  methods: {
    setCountryData(country) {
      this.$emit("setCountryData", country);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasCountryEdit,
    hasCountryFinaleDelete,
    hasCountryChangeActivationType,
  },
};
</script>
