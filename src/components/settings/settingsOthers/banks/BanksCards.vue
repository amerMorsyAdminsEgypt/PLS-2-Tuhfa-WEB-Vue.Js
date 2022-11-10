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
          :title="$t('Banks.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasBankEdit())">
        <router-link
          :to="{
            name: 'BankEdit',
            params: {
              bankToken: bank.bankToken,
            },
          }"
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </router-link>
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
      <li>
        <!-- v-if="checkPrivilege(usersPrivilegeData.usersPrivilegeBank.update)" -->
        <button
          :title="$t('actionsData.modelName')"
          @click="
            setBankData(bank);
            openBottomSheet('ActionsData');
          "
        >
          <img src="@/assets/images/actions-data.svg" />
        </button>
      </li>
    </CustomCard>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  isDataExist,
  checkPrivilege,
  fullPathFileFromServer,
} from "@/utils/functions";
import { hasBankEdit, hasBankFinaleDelete } from "@/utils/privilegeHelper";
import CustomCard from "@/components/general/CustomCard.vue";
import generalMixin from "@/utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  data() {
    return {};
  },
  props: ["banksData", "bankData", "pagination", "defaultImg"],
  methods: {
    setBankData(bank) {
      this.$emit("setBankData", bank);
    },
    isDataExist,
    checkPrivilege,
    fullPathFileFromServer,
    hasBankEdit,
    hasBankFinaleDelete,
  },
  computed: {
    ...mapGetters(["usersPrivilegeData"]),
  },
};
</script>
