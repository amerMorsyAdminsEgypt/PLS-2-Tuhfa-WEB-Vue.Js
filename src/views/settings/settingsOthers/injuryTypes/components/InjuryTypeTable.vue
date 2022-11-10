<template>
  <div v-if="injuryTypesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("InjuryTypes.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(injuryType, index) in injuryTypesData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  injuryType.injuryTypeImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(injuryType.fullCode) }}</td>
          <td>
            {{ isDataExist(injuryType.injuryTypeNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setInjuryTypeData(injuryType);
                    openBottomSheet('InjuryTypeInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setInjuryTypeData(injuryType);
                    openBottomSheet('InjuryTypeQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasInjuryTypeEdit())">
                <button
                  @click="
                    setInjuryTypeData(injuryType);
                    openBottomSheet('InjuryTypeUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasInjuryTypeFinaleDelete())">
                <button
                  v-b-modal.InjuryTypeDelete
                  :title="$t('delete')"
                  @click="setInjuryTypeData(injuryType)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasInjuryTypeChangeActivationType())">
                <button
                  v-b-modal.InjuryTypeChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setInjuryTypeData(injuryType)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setInjuryTypeData(injuryType);
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
  hasInjuryTypeEdit,
  hasInjuryTypeFinaleDelete,
  hasInjuryTypeChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  name: "InjuryTypesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["injuryTypesData", "filterData", "defaultImg"],
  methods: {
    setInjuryTypeData(injuryType) {
      this.$emit("setInjuryTypeData", injuryType);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasInjuryTypeEdit,
    hasInjuryTypeFinaleDelete,
    hasInjuryTypeChangeActivationType,
  },
};
</script>
