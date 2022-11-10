<template>
  <div v-if="installmentBatchTypesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("InstallmentBatchTypes.data") }}</th>
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
          v-for="(installmentBatchType, index) in installmentBatchTypesData"
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  installmentBatchType.installmentBatchTypeImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(installmentBatchType.fullCode) }}</td>
          <td>
            {{
              isDataExist(installmentBatchType.installmentBatchTypeNameCurrent)
            }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setInstallmentBatchTypeData(installmentBatchType);
                    openBottomSheet('InstallmentBatchTypeInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setInstallmentBatchTypeData(installmentBatchType);
                    openBottomSheet('InstallmentBatchTypeQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasInstallmentBatchTypeEdit())">
                <button
                  @click="
                    setInstallmentBatchTypeData(installmentBatchType);
                    openBottomSheet('InstallmentBatchTypeUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasInstallmentBatchTypeFinaleDelete())">
                <button
                  v-b-modal.InstallmentBatchTypeDelete
                  :title="$t('delete')"
                  @click="setInstallmentBatchTypeData(installmentBatchType)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li
                v-if="
                  checkPrivilege(hasInstallmentBatchTypeChangeActivationType())
                "
              >
                <button
                  v-b-modal.InstallmentBatchTypeChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setInstallmentBatchTypeData(installmentBatchType)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setInstallmentBatchTypeData(installmentBatchType);
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
  hasInstallmentBatchTypeEdit,
  hasInstallmentBatchTypeFinaleDelete,
  hasInstallmentBatchTypeChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  name: "InstallmentBatchTypesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["installmentBatchTypesData", "filterData", "defaultImg"],
  methods: {
    setInstallmentBatchTypeData(installmentBatchType) {
      this.$emit("setInstallmentBatchTypeData", installmentBatchType);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasInstallmentBatchTypeEdit,
    hasInstallmentBatchTypeFinaleDelete,
    hasInstallmentBatchTypeChangeActivationType,
  },
};
</script>
