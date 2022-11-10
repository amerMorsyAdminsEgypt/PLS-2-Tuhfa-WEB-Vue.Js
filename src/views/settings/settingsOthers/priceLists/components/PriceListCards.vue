<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(priceList, index) in priceListsData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="priceList.priceListNameCurrent"
      :description="priceList.fullCode"
      :imagePath="priceList.priceListImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setPriceListData(priceList);
            openBottomSheet('PriceListInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setPriceListData(priceList);
            openBottomSheet('PriceListQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasPriceListEdit())">
        <button
          @click="
            setPriceListData(priceList);
            openBottomSheet('PriceListUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasPriceListFinaleDelete())">
        <button
          v-b-modal.PriceListDelete
          :title="$t('delete')"
          @click="setPriceListData(priceList)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasPriceListChangeActivationType())">
        <button
          v-b-modal.PriceListChangeActivationType
          :title="$t('changeActivationType')"
          @click="setPriceListData(priceList)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setPriceListData(priceList);
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
} from "./../../../../../utils/functions";
import {
  hasPriceListEdit,
  hasPriceListFinaleDelete,
  hasPriceListChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import CustomCard from "./../../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["priceListsData", "filterData", "defaultImg"],
  methods: {
    setPriceListData(priceList) {
      this.$emit("setPriceListData", priceList);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasPriceListEdit,
    hasPriceListFinaleDelete,
    hasPriceListChangeActivationType,
  },
};
</script>
