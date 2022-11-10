<template>
  <div v-if="insuranceCompaniesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("InsuranceCompanies.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(insuranceCompany, index) in insuranceCompaniesData"
          :key="insuranceCompany.insuranceCompanyToken"
        >
          <td>{{ ++index + pagination.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  insuranceCompany.insuranceCompanyImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(insuranceCompany.fullCode) }}</td>
          <td>
            {{ isDataExist(insuranceCompany.insuranceCompanyNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setInsuranceCompanyData(insuranceCompany);
                    openBottomSheet('InsuranceCompanyInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setInsuranceCompanyData(insuranceCompany);
                    openBottomSheet('InsuranceCompanyQRCode');
                  "
                  :title="$t('InsuranceCompanies.qrCode')"
                >
                  <qrcode-vue
                    :value="insuranceCompany.fullCode"
                    :size="40"
                    level="H"
                  />
                </button>
              </li>
              <li v-if="checkPrivilege(hasInsuranceCompanyEdit())"></li>
              <li>
                <router-link
                  :to="{
                    name: 'InsuranceCompanyEdit',
                    params: {
                      insuranceCompanyToken:
                        insuranceCompany.insuranceCompanyToken,
                    },
                  }"
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </router-link>
              </li>
              <li v-if="checkPrivilege(hasInsuranceCompanyFinaleDelete())">
                <button
                  v-b-modal.InsuranceCompanyDelete
                  :title="$t('delete')"
                  @click="setInsuranceCompanyData(insuranceCompany)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <!-- v-if="
                  checkPrivilege(
                    usersPrivilegeData.usersPrivilegeInsuranceCompany.update
                  )
                " -->
              <li>
                <button
                  :title="$t('actionsData.modelName')"
                  @click="
                    setInsuranceCompanyData(insuranceCompany);
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
import {
  hasInsuranceCompanyEdit,
  hasInsuranceCompanyFinaleDelete,
} from "@/utils/privilegeHelper";
import FloatingMenu from "@/components/general/FloatingMenu.vue";
import QrcodeVue from "qrcode.vue";
import generalMixin from "@/utils/generalMixin";

export default {
  name: "InsuranceCompaniesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
    QrcodeVue,
  },
  data() {
    return {};
  },
  props: [
    "insuranceCompaniesData",
    "insuranceCompanyData",
    "pagination",
    "defaultImg",
  ],
  methods: {
    setInsuranceCompanyData(insuranceCompany) {
      this.$emit("setInsuranceCompanyData", insuranceCompany);
    },
    isDataExist,
    checkPrivilege,
    fullPathFileFromServer,
    hasInsuranceCompanyEdit,
    hasInsuranceCompanyFinaleDelete,
  },
  computed: {
    ...mapGetters(["usersPrivilegeData"]),
  },
};
</script>
