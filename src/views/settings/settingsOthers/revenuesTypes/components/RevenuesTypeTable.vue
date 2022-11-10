<template>
  <div v-if="revenuesTypesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="4">{{ $t("RevenuesTypes.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
          <th class="cell-lg">{{ $t("general.defaultPrice") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(revenuesType, index) in revenuesTypesData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  revenuesType.revenuesTypeImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(revenuesType.fullCode) }}</td>
          <td>
            {{ isDataExist(revenuesType.revenuesTypeNameCurrent) }}
          </td>
          <td>
            {{ isDataExist(revenuesType.revenuesTypeDefaultPrice) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setRevenuesTypeData(revenuesType);
                    openBottomSheet('RevenuesTypeInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setRevenuesTypeData(revenuesType);
                    openBottomSheet('RevenuesTypeQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasRevenuesTypeEdit())">
                <button
                  @click="
                    setRevenuesTypeData(revenuesType);
                    openBottomSheet('RevenuesTypeUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasRevenuesTypeFinaleDelete())">
                <button
                  v-b-modal.RevenuesTypeDelete
                  :title="$t('delete')"
                  @click="setRevenuesTypeData(revenuesType)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasRevenuesTypeChangeActivationType())">
                <button
                  v-b-modal.RevenuesTypeChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setRevenuesTypeData(revenuesType)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setRevenuesTypeData(revenuesType);
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
  hasRevenuesTypeEdit,
  hasRevenuesTypeFinaleDelete,
  hasRevenuesTypeChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  name: "RevenuesTypesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["revenuesTypesData", "filterData", "defaultImg"],
  methods: {
    setRevenuesTypeData(revenuesType) {
      this.$emit("setRevenuesTypeData", revenuesType);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasRevenuesTypeEdit,
    hasRevenuesTypeFinaleDelete,
    hasRevenuesTypeChangeActivationType,
  },
};
</script>
