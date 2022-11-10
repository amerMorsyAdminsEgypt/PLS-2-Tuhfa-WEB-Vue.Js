<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(installmentBatchType, index) in installmentBatchTypesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="installmentBatchType.installmentBatchTypeNameCurrent"
      :description="installmentBatchType.fullCode"
      :imagePath="installmentBatchType.installmentBatchTypeImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setInstallmentBatchTypeData(installmentBatchType);
            openBottomSheet('InstallmentBatchTypeInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setInstallmentBatchTypeData(installmentBatchType);
            openBottomSheet('InstallmentBatchTypeQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasInstallmentBatchTypeEdit())">
        <button
          @click="
            setInstallmentBatchTypeData(installmentBatchType);
            openBottomSheet('InstallmentBatchTypeUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasInstallmentBatchTypeFinaleDelete())">
        <button
          v-b-modal.InstallmentBatchTypeDelete
          :title="$t('delete')"
          @click="setInstallmentBatchTypeData(installmentBatchType)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasInstallmentBatchTypeChangeActivationType())">
        <button
          v-b-modal.InstallmentBatchTypeChangeActivationType
          :title="$t('changeActivationType')"
          @click="setInstallmentBatchTypeData(installmentBatchType)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setInstallmentBatchTypeData(installmentBatchType);
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
  hasInstallmentBatchTypeEdit,
  hasInstallmentBatchTypeFinaleDelete,
  hasInstallmentBatchTypeChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import CustomCard from "./../../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["installmentBatchTypesData", "filterData", "defaultImg"],
  methods: {
    setInstallmentBatchTypeData(installmentBatchType) {
      this.$emit("setInstallmentBatchTypeData", installmentBatchType);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasInstallmentBatchTypeEdit,
    hasInstallmentBatchTypeFinaleDelete,
    hasInstallmentBatchTypeChangeActivationType,
  },
};
</script>
