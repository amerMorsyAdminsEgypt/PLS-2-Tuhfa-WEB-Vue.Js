<template>
  <div v-if="militaryStatusTypesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("MilitaryStatusTypes.data") }}</th>
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
          v-for="(militaryStatusType, index) in militaryStatusTypesData"
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  militaryStatusType.militaryStatusTypeImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(militaryStatusType.fullCode) }}</td>
          <td>
            {{ isDataExist(militaryStatusType.militaryStatusTypeNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setMilitaryStatusTypeData(militaryStatusType);
                    openBottomSheet('MilitaryStatusTypeInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setMilitaryStatusTypeData(militaryStatusType);
                    openBottomSheet('MilitaryStatusTypeQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasMilitaryStatusTypeEdit())">
                <button
                  @click="
                    setMilitaryStatusTypeData(militaryStatusType);
                    openBottomSheet('MilitaryStatusTypeUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasMilitaryStatusTypeFinaleDelete())">
                <button
                  v-b-modal.MilitaryStatusTypeDelete
                  :title="$t('delete')"
                  @click="setMilitaryStatusTypeData(militaryStatusType)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li
                v-if="
                  checkPrivilege(hasMilitaryStatusTypeChangeActivationType())
                "
              >
                <button
                  v-b-modal.MilitaryStatusTypeChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setMilitaryStatusTypeData(militaryStatusType)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setMilitaryStatusTypeData(militaryStatusType);
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
  hasMilitaryStatusTypeEdit,
  hasMilitaryStatusTypeFinaleDelete,
  hasMilitaryStatusTypeChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  name: "MilitaryStatusTypesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["militaryStatusTypesData", "filterData", "defaultImg"],
  methods: {
    setMilitaryStatusTypeData(militaryStatusType) {
      this.$emit("setMilitaryStatusTypeData", militaryStatusType);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasMilitaryStatusTypeEdit,
    hasMilitaryStatusTypeFinaleDelete,
    hasMilitaryStatusTypeChangeActivationType,
  },
};
</script>
