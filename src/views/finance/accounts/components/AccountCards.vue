<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(account, index) in accountsData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="account.accountNameCurrent"
      :description="account.fullCode"
      :imagePath="account.accountImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setAccountData(account);
            openBottomSheet('AccountInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setAccountData(account);
            openBottomSheet('AccountQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasAccountEdit())">
        <button
          @click="
            setAccountData(account);
            openBottomSheet('AccountUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasAccountFinaleDelete())">
        <button
          v-b-modal.AccountDelete
          :title="$t('delete')"
          @click="setAccountData(account)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasAccountChangeActivationType())">
        <button
          v-b-modal.AccountChangeActivationType
          :title="$t('changeActivationType')"
          @click="setAccountData(account)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setAccountData(account);
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
  hasAccountEdit,
  hasAccountFinaleDelete,
  hasAccountChangeActivationType,
} from "./../../../../utils/privilegeHelper";
import CustomCard from "./../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["accountsData", "filterData", "defaultImg"],
  methods: {
    setAccountData(account) {
      this.$emit("setAccountData", account);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasAccountEdit,
    hasAccountFinaleDelete,
    hasAccountChangeActivationType,
  },
};
</script>
