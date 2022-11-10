<template>
  <div v-if="propertyTypesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("PropertyTypes.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(propertyType, index) in propertyTypesData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  propertyType.propertyTypeImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(propertyType.fullCode) }}</td>
          <td>
            {{ isDataExist(propertyType.propertyTypeNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setPropertyTypeData(propertyType);
                    openBottomSheet('PropertyTypeInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setPropertyTypeData(propertyType);
                    openBottomSheet('PropertyTypeQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasPropertyTypeEdit())">
                <button
                  @click="
                    setPropertyTypeData(propertyType);
                    openBottomSheet('PropertyTypeUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasPropertyTypeFinaleDelete())">
                <button
                  v-b-modal.PropertyTypeDelete
                  :title="$t('delete')"
                  @click="setPropertyTypeData(propertyType)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasPropertyTypeChangeActivationType())">
                <button
                  v-b-modal.PropertyTypeChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setPropertyTypeData(propertyType)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setPropertyTypeData(propertyType);
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
} from "./../../../../utils/functions";
import {
  hasPropertyTypeEdit,
  hasPropertyTypeFinaleDelete,
  hasPropertyTypeChangeActivationType,
} from "./../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "PropertyTypesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["propertyTypesData", "filterData", "defaultImg"],
  methods: {
    setPropertyTypeData(propertyType) {
      this.$emit("setPropertyTypeData", propertyType);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasPropertyTypeEdit,
    hasPropertyTypeFinaleDelete,
    hasPropertyTypeChangeActivationType,
  },
};
</script>
