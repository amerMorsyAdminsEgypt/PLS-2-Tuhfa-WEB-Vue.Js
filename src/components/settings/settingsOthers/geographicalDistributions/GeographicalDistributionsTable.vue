<template>
  <div v-if="geographicalDistributionsData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("GeographicalDistributions.data") }}</th>
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
          v-for="(
            geographicalDistribution, index
          ) in geographicalDistributionsData"
          :key="geographicalDistribution.geographicalDistributionToken"
        >
          <td>{{ ++index + pagination.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  geographicalDistribution.geographicalDistributionImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(geographicalDistribution.fullCode) }}</td>
          <td>
            {{
              isDataExist(
                geographicalDistribution.geographicalDistributionNameCurrent
              )
            }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setGeographicalDistributionData(geographicalDistribution);
                    openBottomSheet('GeographicalDistributionInfo');
                  "
                  :title="$t('info')"
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
              <li
                v-if="checkPrivilege(hasGeographicalDistributionFinaleDelete())"
              >
                <button
                  v-b-modal.GeographicalDistributionDelete
                  :title="$t('delete')"
                  @click="
                    setGeographicalDistributionData(geographicalDistribution)
                  "
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>

              <li>
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
  hasGeographicalDistributionEdit,
  hasGeographicalDistributionFinaleDelete,
} from "@/utils/privilegeHelper";
import FloatingMenu from "@/components/general/FloatingMenu.vue";
import QrcodeVue from "qrcode.vue";
import generalMixin from "@/utils/generalMixin";

export default {
  name: "GeographicalDistributionsTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
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
