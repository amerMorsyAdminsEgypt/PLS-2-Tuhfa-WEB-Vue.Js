<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(priorityType, index) in priorityTypesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="priorityType.priorityTypeNameCurrent"
      :description="priorityType.fullCode"
      :imagePath="priorityType.priorityTypeImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setPriorityTypeData(priorityType);
            openBottomSheet('PriorityTypeInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setPriorityTypeData(priorityType);
            openBottomSheet('PriorityTypeQRCode');
          "
          :title="$t('PriorityTypes.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasPriorityTypeEdit())">
        <button
          @click="
            setPriorityTypeData(priorityType);
            openBottomSheet('PriorityTypeUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasPriorityTypeFinaleDelete())">
        <button
          v-b-modal.PriorityTypeDelete
          :title="$t('delete')"
          @click="setPriorityTypeData(priorityType)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasPriorityTypeChangeActivationType())">
        <button
          v-b-modal.PriorityTypeChangeActivationType
          :title="$t('changeActivationType')"
          @click="setPriorityTypeData(priorityType)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setPriorityTypeData(priorityType);
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
  hasPriorityTypeEdit,
  hasPriorityTypeFinaleDelete,
  hasPriorityTypeChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import CustomCard from "./../../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["priorityTypesData", "filterData", "defaultImg"],
  methods: {
    setPriorityTypeData(priorityType) {
      this.$emit("setPriorityTypeData", priorityType);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasPriorityTypeEdit,
    hasPriorityTypeFinaleDelete,
    hasPriorityTypeChangeActivationType,
  },
};
</script>
