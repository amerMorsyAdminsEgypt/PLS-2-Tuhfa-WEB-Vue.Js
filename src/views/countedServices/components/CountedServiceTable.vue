<template>
  <div v-if="countedServicesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="7">{{ $t("CountedServices.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
          <th>{{ $t("CountedServices.countedServicePrice") }}</th>
          <th>{{ $t("CountedServices.countedServiceBoughtCount") }}</th>
          <th>{{ $t("CountedServices.countedServiceSoldCount") }}</th>
          <th>{{ $t("CountedServices.countedServiceRemainCount") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(countedService, index) in countedServicesData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  countedService.countedServiceImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(countedService.fullCode) }}</td>
          <td>
            {{ isDataExist(countedService.countedServiceNameCurrent) }}
          </td>
          <td>
            {{ isDataExist(countedService.countedServicePriceWithCurrency) }}
          </td>
          <td>
            {{ isDataExist(countedService.countedServiceBoughtCount) }}
          </td>
          <td>
            {{ isDataExist(countedService.countedServiceSoldCount) }}
          </td>
          <td>
            {{ isDataExist(countedService.countedServiceRemainCount) }}
          </td>

          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setCountedServiceData(countedService);
                    openBottomSheet('CountedServiceInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setCountedServiceData(countedService);
                    openBottomSheet('CountedServiceQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasCountedServiceEdit())">
                <button
                  @click="
                    setCountedServiceData(countedService);
                    openBottomSheet('CountedServiceUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasCountedServiceFinaleDelete())">
                <button
                  v-b-modal.CountedServiceDelete
                  :title="$t('delete')"
                  @click="setCountedServiceData(countedService)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li
                v-if="checkPrivilege(hasCountedServiceChangeActivationType())"
              >
                <button
                  v-b-modal.CountedServiceChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setCountedServiceData(countedService)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setCountedServiceData(countedService);
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
} from "./../../../utils/functions";
import {
  hasCountedServiceEdit,
  hasCountedServiceFinaleDelete,
  hasCountedServiceChangeActivationType,
} from "./../../../utils/privilegeHelper";
import FloatingMenu from "./../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../utils/generalMixin";

export default {
  name: "CountedServicesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["countedServicesData", "filterData", "defaultImg"],
  methods: {
    setCountedServiceData(countedService) {
      this.$emit("setCountedServiceData", countedService);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasCountedServiceEdit,
    hasCountedServiceFinaleDelete,
    hasCountedServiceChangeActivationType,
  },
};
</script>
