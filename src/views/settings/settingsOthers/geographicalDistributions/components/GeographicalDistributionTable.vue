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
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
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
              <li v-if="geographicalDistribution.isHaveChildrenStatus">
                <router-link
                  :to="{
                    name: 'GeographicalDistributions',
                    params: {
                      parentGeographicalDistributionToken:
                        geographicalDistribution.geographicalDistributionToken,
                    },
                  }"
                  :title="$t('GeographicalDistributions.modelName')"
                >
                  <img src="@/assets/images/open.svg" />
                </router-link>
              </li>
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
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasGeographicalDistributionEdit())">
                <button
                  @click="
                    setGeographicalDistributionData(geographicalDistribution);
                    openBottomSheet('GeographicalDistributionUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
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
              <li
                v-if="
                  checkPrivilege(
                    hasGeographicalDistributionChangeActivationType()
                  )
                "
              >
                <button
                  v-b-modal.GeographicalDistributionChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="
                    setGeographicalDistributionData(geographicalDistribution)
                  "
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setGeographicalDistributionData(geographicalDistribution);
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
  hasGeographicalDistributionEdit,
  hasGeographicalDistributionFinaleDelete,
  hasGeographicalDistributionChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  name: "GeographicalDistributionsTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["geographicalDistributionsData", "filterData", "defaultImg"],
  methods: {
    setGeographicalDistributionData(geographicalDistribution) {
      this.$emit("setGeographicalDistributionData", geographicalDistribution);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasGeographicalDistributionEdit,
    hasGeographicalDistributionFinaleDelete,
    hasGeographicalDistributionChangeActivationType,
  },
};
</script>
