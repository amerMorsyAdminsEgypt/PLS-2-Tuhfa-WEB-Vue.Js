<template>
  <div v-if="banksData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("Banks.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(bank, index) in banksData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="fullPathFileFromServer(bank.bankImagePath, defaultImg)"
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(bank.fullCode) }}</td>
          <td>
            {{ isDataExist(bank.bankNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setBankData(bank);
                    openBottomSheet('BankInfo');
                  "
                  :title="$t('info')"
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
            </FloatingMenu>
          </td>
        </tr>
      </tbody>
    </table>
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
import FloatingMenu from "./../../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  name: "BanksTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
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
