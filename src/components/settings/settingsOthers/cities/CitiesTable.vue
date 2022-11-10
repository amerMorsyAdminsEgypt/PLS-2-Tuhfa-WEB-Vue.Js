<template>
  <div v-if="citiesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("Cities.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
          <th rowspan="2">{{ $t("Users.type") }}</th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(city, index) in citiesData" :key="city.cityToken">
          <td>{{ ++index + pagination.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="fullPathFileFromServer(city.cityImagePath, defaultImg)"
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(city.fullCode) }}</td>
          <td>
            {{ isDataExist(city.cityNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setCityData(city);
                    openBottomSheet('CityInfo');
                  "
                  :title="$t('info')"
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
              <!-- v-if="
                  checkPrivilege(
                    usersPrivilegeData.usersPrivilegeCity.update
                  )
                " -->
              <li>
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
            </FloatingMenu>
          </td>
          <td>
            {{ isDataExist(city.userTypeNameCurrent) }}
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
import FloatingMenu from "@/components/general/FloatingMenu.vue";
import QrcodeVue from "qrcode.vue";
import generalMixin from "@/utils/generalMixin";

export default {
  name: "CitiesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
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
