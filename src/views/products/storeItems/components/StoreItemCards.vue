<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(storeItem, index) in storeItemsData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="storeItem.storeItemNameCurrent"
      :description="storeItem.fullCode"
      :imagePath="storeItem.storeItemImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setStoreItemData(storeItem);
            openBottomSheet('StoreItemInfo');
          "
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
    </CustomCard>
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
import CustomCard from "./../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
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
