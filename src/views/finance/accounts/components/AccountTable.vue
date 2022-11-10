<template>
  <div v-if="accountsData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="4">{{ $t("Accounts.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
          <th>{{ $t("Accounts.balance") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(account, index) in accountsData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(account.accountImagePath, defaultImg)
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(account.fullCode) }}</td>
          <td>
            {{ isDataExist(account.accountNameCurrent) }}
          </td>
          <td>
            {{ isDataExist(account.accountMoneyBalanceWithCurrency) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setAccountData(account);
                    openBottomSheet('AccountInfo');
                  "
                  :title="$t('info')"
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
} from "./../../../../utils/functions";
import {
  hasAccountEdit,
  hasAccountFinaleDelete,
  hasAccountChangeActivationType,
} from "./../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "AccountsTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
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
