<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(expensesType, index) in expensesTypesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="expensesType.expensesTypeNameCurrent"
      :description="expensesType.fullCode"
      :imagePath="expensesType.expensesTypeImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setExpensesTypeData(expensesType);
            openBottomSheet('ExpensesTypeInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setExpensesTypeData(expensesType);
            openBottomSheet('ExpensesTypeQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasExpensesTypeEdit())">
        <button
          @click="
            setExpensesTypeData(expensesType);
            openBottomSheet('ExpensesTypeUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasExpensesTypeFinaleDelete())">
        <button
          v-b-modal.ExpensesTypeDelete
          :title="$t('delete')"
          @click="setExpensesTypeData(expensesType)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasExpensesTypeChangeActivationType())">
        <button
          v-b-modal.ExpensesTypeChangeActivationType
          :title="$t('changeActivationType')"
          @click="setExpensesTypeData(expensesType)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setExpensesTypeData(expensesType);
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
  hasExpensesTypeEdit,
  hasExpensesTypeFinaleDelete,
  hasExpensesTypeChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import CustomCard from "./../../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["expensesTypesData", "filterData", "defaultImg"],
  methods: {
    setExpensesTypeData(expensesType) {
      this.$emit("setExpensesTypeData", expensesType);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasExpensesTypeEdit,
    hasExpensesTypeFinaleDelete,
    hasExpensesTypeChangeActivationType,
  },
};
</script>
