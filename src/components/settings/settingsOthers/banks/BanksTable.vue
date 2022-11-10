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
        <tr v-for="(bank, index) in banksData" :key="bank.bankToken">
          <td>{{ ++index + pagination.currentIndex }}</td>
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
            </FloatingMenu>
          </td>
        </tr>
      </tbody>
    </table>
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
import FloatingMenu from "@/components/general/FloatingMenu.vue";
import generalMixin from "@/utils/generalMixin";

export default {
  name: "BanksTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
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
