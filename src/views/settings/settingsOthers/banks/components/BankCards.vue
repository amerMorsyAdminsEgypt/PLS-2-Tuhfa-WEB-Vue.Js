<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(bank, index) in banksData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="bank.bankNameCurrent"
      :description="bank.fullCode"
      :imagePath="bank.bankImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setBankData(bank);
            openBottomSheet('BankInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setBankData(bank);
            openBottomSheet('BankQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasBankEdit())">
        <button
          @click="
            setBankData(bank);
            openBottomSheet('BankUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasBankFinaleDelete())">
        <button
          v-b-modal.BankDelete
          :title="$t('delete')"
          @click="setBankData(bank)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasBankChangeActivationType())">
        <button
          v-b-modal.BankChangeActivationType
          :title="$t('changeActivationType')"
          @click="setBankData(bank)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setBankData(bank);
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
  hasBankEdit,
  hasBankFinaleDelete,
  hasBankChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import CustomCard from "./../../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["banksData", "filterData", "defaultImg"],
  methods: {
    setBankData(bank) {
      this.$emit("setBankData", bank);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasBankEdit,
    hasBankFinaleDelete,
    hasBankChangeActivationType,
  },
};
</script>
