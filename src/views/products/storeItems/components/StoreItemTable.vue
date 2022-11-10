<template>
  <div v-if="storeItemsData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("StoreItems.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(storeItem, index) in storeItemsData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(storeItem.storeItemImagePath, defaultImg)
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(storeItem.fullCode) }}</td>
          <td>
            {{ isDataExist(storeItem.storeItemNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li v-if="storeItem.isHaveChildrenStatus">
                <router-link
                  :to="{
                    name: 'StoreItems',
                    params: {
                      parentStoreItemToken: storeItem.storeItemToken,
                    },
                  }"
                  :title="$t('StoreItems.modelName')"
                >
                  <img src="@/assets/images/open.svg" />
                </router-link>
              </li>
              <li>
                <button
                  @click="
                    setStoreItemData(storeItem);
                    openBottomSheet('StoreItemInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setStoreItemData(storeItem);
                    openBottomSheet('StoreItemQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasStoreItemEdit())">
                <button
                  @click="
                    setStoreItemData(storeItem);
                    openBottomSheet('StoreItemUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasStoreItemFinaleDelete())">
                <button
                  v-b-modal.StoreItemDelete
                  :title="$t('delete')"
                  @click="setStoreItemData(storeItem)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasStoreItemChangeActivationType())">
                <button
                  v-b-modal.StoreItemChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setStoreItemData(storeItem)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setStoreItemData(storeItem);
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
  hasStoreItemEdit,
  hasStoreItemFinaleDelete,
  hasStoreItemChangeActivationType,
} from "./../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "StoreItemsTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["storeItemsData", "filterData", "defaultImg"],
  methods: {
    setStoreItemData(storeItem) {
      this.$emit("setStoreItemData", storeItem);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasStoreItemEdit,
    hasStoreItemFinaleDelete,
    hasStoreItemChangeActivationType,
  },
};
</script>
