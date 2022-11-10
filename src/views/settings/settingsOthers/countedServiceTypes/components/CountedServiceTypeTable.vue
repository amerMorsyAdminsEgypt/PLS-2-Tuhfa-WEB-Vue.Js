<template>
  <div v-if="countedServiceTypesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("CountedServiceTypes.data") }}</th>
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
          v-for="(countedServiceType, index) in countedServiceTypesData"
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  countedServiceType.countedServiceTypeImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(countedServiceType.fullCode) }}</td>
          <td>
            {{ isDataExist(countedServiceType.countedServiceTypeNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setCountedServiceTypeData(countedServiceType);
                    openBottomSheet('CountedServiceTypeInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setCountedServiceTypeData(countedServiceType);
                    openBottomSheet('CountedServiceTypeQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasCountedServiceTypeEdit())">
                <button
                  @click="
                    setCountedServiceTypeData(countedServiceType);
                    openBottomSheet('CountedServiceTypeUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasCountedServiceTypeFinaleDelete())">
                <button
                  v-b-modal.CountedServiceTypeDelete
                  :title="$t('delete')"
                  @click="setCountedServiceTypeData(countedServiceType)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li
                v-if="
                  checkPrivilege(hasCountedServiceTypeChangeActivationType())
                "
              >
                <button
                  v-b-modal.CountedServiceTypeChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setCountedServiceTypeData(countedServiceType)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setCountedServiceTypeData(countedServiceType);
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
  hasCountedServiceTypeEdit,
  hasCountedServiceTypeFinaleDelete,
  hasCountedServiceTypeChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  name: "CountedServiceTypesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["countedServiceTypesData", "filterData", "defaultImg"],
  methods: {
    setCountedServiceTypeData(countedServiceType) {
      this.$emit("setCountedServiceTypeData", countedServiceType);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasCountedServiceTypeEdit,
    hasCountedServiceTypeFinaleDelete,
    hasCountedServiceTypeChangeActivationType,
  },
};
</script>
