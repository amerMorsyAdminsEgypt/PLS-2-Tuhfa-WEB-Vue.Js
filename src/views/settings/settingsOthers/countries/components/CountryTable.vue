<template>
  <div v-if="countriesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("Countries.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(country, index) in countriesData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(country.countryImagePath, defaultImg)
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(country.fullCode) }}</td>
          <td>
            {{ isDataExist(country.nationalityNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setCountryData(country);
                    openBottomSheet('CountryInfo');
                  "
                  :title="$t('info')"
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
            </FloatingMenu>
          </td>
        </tr>
      </tbody>
    </table>
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
import FloatingMenu from "./../../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  name: "CountriesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
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
