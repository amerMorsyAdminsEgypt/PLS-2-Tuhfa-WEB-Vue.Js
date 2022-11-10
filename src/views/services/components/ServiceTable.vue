<template>
  <div v-if="servicesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="5">{{ $t("Services.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
          <th>{{ $t("Services.servicePrice") }}</th>
          <th class="cell-lg">{{ $t("Places.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(service, index) in servicesData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(service.serviceImagePath, defaultImg)
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(service.fullCode) }}</td>
          <td>
            {{ isDataExist(service.serviceNameCurrent) }}
          </td>
          <td>
            {{ isDataExist(service.servicePrice) }}
          </td>
          <td>
            {{
              isDataExist(
                service.placeInfoData
                  ? service.placeInfoData.placeNameCurrent
                  : ""
              )
            }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setServiceData(service);
                    openBottomSheet('ServiceInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setServiceData(service);
                    openBottomSheet('ServiceQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasServiceEdit())">
                <button
                  @click="
                    setServiceData(service);
                    openBottomSheet('ServiceUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasServiceFinaleDelete())">
                <button
                  v-b-modal.ServiceDelete
                  :title="$t('delete')"
                  @click="setServiceData(service)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasServiceChangeActivationType())">
                <button
                  v-b-modal.ServiceChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setServiceData(service)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setServiceData(service);
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
  hasServiceEdit,
  hasServiceFinaleDelete,
  hasServiceChangeActivationType,
} from "./../../../utils/privilegeHelper";
import FloatingMenu from "./../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../utils/generalMixin";

export default {
  name: "ServicesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["servicesData", "filterData", "defaultImg"],
  methods: {
    setServiceData(service) {
      this.$emit("setServiceData", service);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasServiceEdit,
    hasServiceFinaleDelete,
    hasServiceChangeActivationType,
  },
};
</script>
