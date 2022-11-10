<template>
  <div v-if="governoratesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("Governorates.data") }}</th>
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
          v-for="(governorate, index) in governoratesData"
          :key="governorate.governorateToken"
        >
          <td>{{ ++index + pagination.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  governorate.governorateImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(governorate.fullCode) }}</td>
          <td>
            {{ isDataExist(governorate.governorateNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setGovernorateData(governorate);
                    openBottomSheet('GovernorateInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setGovernorateData(governorate);
                    openBottomSheet('GovernorateQRCode');
                  "
                  :title="$t('Governorates.qrCode')"
                >
                  <qrcode-vue
                    :value="governorate.fullCode"
                    :size="40"
                    level="H"
                  />
                </button>
              </li>
              <li>
                <router-link
                  :to="{
                    name: 'GovernorateEdit',
                    params: {
                      governorateToken: governorate.governorateToken,
                    },
                  }"
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </router-link>
              </li>
              <li>
                <button
                  v-b-modal.GovernorateDelete
                  :title="$t('delete')"
                  @click="setGovernorateData(governorate)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <!-- v-if="
                  checkPrivilege(
                    usersPrivilegeData.usersPrivilegeGovernorate.update
                  )
                " -->
              <li>
                <button
                  :title="$t('actionsData.modelName')"
                  @click="
                    setGovernorateData(governorate);
                    openBottomSheet('ActionsData');
                  "
                >
                  <img src="@/assets/images/actions-data.svg" />
                </button>
              </li>
            </FloatingMenu>
          </td>
          <td>
            {{ isDataExist(governorate.userTypeNameCurrent) }}
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
  name: "GovernoratesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
    QrcodeVue,
  },
  data() {
    return {};
  },
  props: ["governoratesData", "governorateData", "pagination", "defaultImg"],
  methods: {
    setGovernorateData(governorate) {
      this.$emit("setGovernorateData", governorate);
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
