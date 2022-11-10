<template>
  <div v-if="operationTypesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("OperationTypes.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(operationType, index) in operationTypesData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  operationType.operationTypeImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(operationType.fullCode) }}</td>
          <td>
            {{ isDataExist(operationType.operationTypeNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setOperationTypeData(operationType);
                    openBottomSheet('OperationTypeInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setOperationTypeData(operationType);
                    openBottomSheet('OperationTypeQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasOperationTypeEdit())">
                <button
                  @click="
                    setOperationTypeData(operationType);
                    openBottomSheet('OperationTypeUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasOperationTypeFinaleDelete())">
                <button
                  v-b-modal.OperationTypeDelete
                  :title="$t('delete')"
                  @click="setOperationTypeData(operationType)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasOperationTypeChangeActivationType())">
                <button
                  v-b-modal.OperationTypeChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setOperationTypeData(operationType)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setOperationTypeData(operationType);
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
  hasOperationTypeEdit,
  hasOperationTypeFinaleDelete,
  hasOperationTypeChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  name: "OperationTypesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["operationTypesData", "filterData", "defaultImg"],
  methods: {
    setOperationTypeData(operationType) {
      this.$emit("setOperationTypeData", operationType);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasOperationTypeEdit,
    hasOperationTypeFinaleDelete,
    hasOperationTypeChangeActivationType,
  },
};
</script>
