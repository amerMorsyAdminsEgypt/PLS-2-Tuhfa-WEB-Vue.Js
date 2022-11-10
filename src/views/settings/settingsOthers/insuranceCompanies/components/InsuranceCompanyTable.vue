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
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
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
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasInsuranceCompanyEdit())">
                <button
                  @click="
                    setInsuranceCompanyData(insuranceCompany);
                    openBottomSheet('InsuranceCompanyUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
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
              <li
                v-if="checkPrivilege(hasInsuranceCompanyChangeActivationType())"
              >
                <button
                  v-b-modal.InsuranceCompanyChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setInsuranceCompanyData(insuranceCompany)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setInsuranceCompanyData(insuranceCompany);
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
  hasInsuranceCompanyEdit,
  hasInsuranceCompanyFinaleDelete,
  hasInsuranceCompanyChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  name: "InsuranceCompaniesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["insuranceCompaniesData", "filterData", "defaultImg"],
  methods: {
    setInsuranceCompanyData(insuranceCompany) {
      this.$emit("setInsuranceCompanyData", insuranceCompany);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasInsuranceCompanyEdit,
    hasInsuranceCompanyFinaleDelete,
    hasInsuranceCompanyChangeActivationType,
  },
};
</script>
