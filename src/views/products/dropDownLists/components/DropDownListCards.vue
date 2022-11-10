<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(dropDownList, index) in dropDownListsData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="dropDownList.dropDownListNameCurrent"
      :description="dropDownList.fullCode"
      :imagePath="dropDownList.dropDownListImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setDropDownListData(dropDownList);
            openBottomSheet('DropDownListInfo');
          "
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
  hasDropDownListEdit,
  hasDropDownListFinaleDelete,
  hasDropDownListChangeActivationType,
} from "./../../../../utils/privilegeHelper";
import CustomCard from "./../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
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
