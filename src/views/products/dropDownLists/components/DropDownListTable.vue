<template>
  <div v-if="dropDownListsData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("DropDownLists.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(dropDownList, index) in dropDownListsData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  dropDownList.dropDownListImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(dropDownList.fullCode) }}</td>
          <td>
            {{ isDataExist(dropDownList.dropDownListNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setDropDownListData(dropDownList);
                    openBottomSheet('DropDownListInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setDropDownListData(dropDownList);
                    openBottomSheet('DropDownListQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasDropDownListEdit())">
                <button
                  @click="
                    setDropDownListData(dropDownList);
                    openBottomSheet('DropDownListUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasDropDownListFinaleDelete())">
                <button
                  v-b-modal.DropDownListDelete
                  :title="$t('delete')"
                  @click="setDropDownListData(dropDownList)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasDropDownListChangeActivationType())">
                <button
                  v-b-modal.DropDownListChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setDropDownListData(dropDownList)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setDropDownListData(dropDownList);
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
  hasDropDownListEdit,
  hasDropDownListFinaleDelete,
  hasDropDownListChangeActivationType,
} from "./../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "DropDownListsTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["dropDownListsData", "filterData", "defaultImg"],
  methods: {
    setDropDownListData(dropDownList) {
      this.$emit("setDropDownListData", dropDownList);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasDropDownListEdit,
    hasDropDownListFinaleDelete,
    hasDropDownListChangeActivationType,
  },
};
</script>
