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
        <tr
          v-for="(country, index) in countriesData"
          :key="country.countryToken"
        >
          <td>{{ ++index + pagination.currentIndex }}</td>
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
            {{ isDataExist(country.countryNameCurrent) }}
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
                  :title="$t('Countries.qrCode')"
                >
                  <qrcode-vue :value="country.fullCode" :size="40" level="H" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasCountryEdit())">
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
              <li v-if="checkPrivilege(hasCountryFinaleDelete())">
                <button
                  v-b-modal.CountryDelete
                  :title="$t('delete')"
                  @click="setCountryData(country)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li>
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
            </FloatingMenu>
          </td>
        </tr>
      </tbody>
    </table>
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
  hasCountryEdit,
  hasCountryFinaleDelete,
} from "@/utils/privilegeHelper";
import FloatingMenu from "@/components/general/FloatingMenu.vue";
import QrcodeVue from "qrcode.vue";
import generalMixin from "@/utils/generalMixin";

export default {
  name: "CountriesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
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
    hasCountryEdit,
    hasCountryFinaleDelete,
    fullPathFileFromServer,
  },
  computed: {
    ...mapGetters(["usersPrivilegeData"]),
  },
};
</script>
