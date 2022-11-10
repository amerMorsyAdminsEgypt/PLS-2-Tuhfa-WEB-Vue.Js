<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(revenuesType, index) in revenuesTypesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="revenuesType.revenuesTypeNameCurrent"
      :description="revenuesType.fullCode"
      :imagePath="revenuesType.revenuesTypeImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setRevenuesTypeData(revenuesType);
            openBottomSheet('RevenuesTypeInfo');
          "
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
  hasRevenuesTypeEdit,
  hasRevenuesTypeFinaleDelete,
  hasRevenuesTypeChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import CustomCard from "./../../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
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
