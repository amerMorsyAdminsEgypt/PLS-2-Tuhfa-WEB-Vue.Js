<template>
  <div v-if="bloodTypesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("BloodTypes.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(bloodType, index) in bloodTypesData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(bloodType.bloodTypeImagePath, defaultImg)
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(bloodType.fullCode) }}</td>
          <td>
            {{ isDataExist(bloodType.bloodTypeNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setBloodTypeData(bloodType);
                    openBottomSheet('BloodTypeInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setBloodTypeData(bloodType);
                    openBottomSheet('BloodTypeQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasBloodTypeEdit())">
                <button
                  @click="
                    setBloodTypeData(bloodType);
                    openBottomSheet('BloodTypeUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasBloodTypeFinaleDelete())">
                <button
                  v-b-modal.BloodTypeDelete
                  :title="$t('delete')"
                  @click="setBloodTypeData(bloodType)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasBloodTypeChangeActivationType())">
                <button
                  v-b-modal.BloodTypeChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setBloodTypeData(bloodType)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setBloodTypeData(bloodType);
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
  hasBloodTypeEdit,
  hasBloodTypeFinaleDelete,
  hasBloodTypeChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  name: "BloodTypesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["bloodTypesData", "filterData", "defaultImg"],
  methods: {
    setBloodTypeData(bloodType) {
      this.$emit("setBloodTypeData", bloodType);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasBloodTypeEdit,
    hasBloodTypeFinaleDelete,
    hasBloodTypeChangeActivationType,
  },
};
</script>
