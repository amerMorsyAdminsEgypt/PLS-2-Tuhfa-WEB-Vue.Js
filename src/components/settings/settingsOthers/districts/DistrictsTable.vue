<template>
  <div v-if="districtsData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("Districts.data") }}</th>
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
        <tr
          v-for="(district, index) in districtsData"
          :key="district.districtToken"
        >
          <td>{{ ++index + pagination.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(district.districtImagePath, defaultImg)
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(district.fullCode) }}</td>
          <td>
            {{ isDataExist(district.districtNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setDistrictData(district);
                    openBottomSheet('DistrictInfo');
                  "
                  :title="$t('info')"
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
              <!-- v-if="
                  checkPrivilege(
                    usersPrivilegeData.usersPrivilegeDistrict.update
                  )
                " -->
              <li>
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
            </FloatingMenu>
          </td>
          <td>
            {{ isDataExist(district.userTypeNameCurrent) }}
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
  name: "DistrictsTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
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
