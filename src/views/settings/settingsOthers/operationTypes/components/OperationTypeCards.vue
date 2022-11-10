<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(operationType, index) in operationTypesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="operationType.operationTypeNameCurrent"
      :description="operationType.fullCode"
      :imagePath="operationType.operationTypeImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setOperationTypeData(operationType);
            openBottomSheet('OperationTypeInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setOperationTypeData(operationType);
            openBottomSheet('OperationTypeQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasOperationTypeEdit())">
        <button
          @click="
            setOperationTypeData(operationType);
            openBottomSheet('OperationTypeUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasOperationTypeFinaleDelete())">
        <button
          v-b-modal.OperationTypeDelete
          :title="$t('delete')"
          @click="setOperationTypeData(operationType)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasOperationTypeChangeActivationType())">
        <button
          v-b-modal.OperationTypeChangeActivationType
          :title="$t('changeActivationType')"
          @click="setOperationTypeData(operationType)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setOperationTypeData(operationType);
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
  hasOperationTypeEdit,
  hasOperationTypeFinaleDelete,
  hasOperationTypeChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import CustomCard from "./../../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["operationTypesData", "filterData", "defaultImg"],
  methods: {
    setOperationTypeData(operationType) {
      this.$emit("setOperationTypeData", operationType);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasOperationTypeEdit,
    hasOperationTypeFinaleDelete,
    hasOperationTypeChangeActivationType,
  },
};
</script>
