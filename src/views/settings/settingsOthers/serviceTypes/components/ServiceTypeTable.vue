<template>
  <div v-if="serviceTypesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("ServiceTypes.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(serviceType, index) in serviceTypesData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  serviceType.serviceTypeImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(serviceType.fullCode) }}</td>
          <td>
            {{ isDataExist(serviceType.serviceTypeNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setServiceTypeData(serviceType);
                    openBottomSheet('ServiceTypeInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setServiceTypeData(serviceType);
                    openBottomSheet('ServiceTypeQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasServiceTypeEdit())">
                <button
                  @click="
                    setServiceTypeData(serviceType);
                    openBottomSheet('ServiceTypeUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasServiceTypeFinaleDelete())">
                <button
                  v-b-modal.ServiceTypeDelete
                  :title="$t('delete')"
                  @click="setServiceTypeData(serviceType)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasServiceTypeChangeActivationType())">
                <button
                  v-b-modal.ServiceTypeChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setServiceTypeData(serviceType)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setServiceTypeData(serviceType);
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
  hasServiceTypeEdit,
  hasServiceTypeFinaleDelete,
  hasServiceTypeChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  name: "ServiceTypesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["serviceTypesData", "filterData", "defaultImg"],
  methods: {
    setServiceTypeData(serviceType) {
      this.$emit("setServiceTypeData", serviceType);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasServiceTypeEdit,
    hasServiceTypeFinaleDelete,
    hasServiceTypeChangeActivationType,
  },
};
</script>
