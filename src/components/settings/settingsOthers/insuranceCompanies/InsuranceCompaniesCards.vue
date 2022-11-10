<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(insuranceCompany, index) in insuranceCompaniesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="insuranceCompany.insuranceCompanyNameCurrent"
      :description="insuranceCompany.fullCode"
      :imagePath="insuranceCompany.insuranceCompanyImagePath"
      :defaultImg="defaultImg"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setInsuranceCompanyData(insuranceCompany);
            openBottomSheet('InsuranceCompanyInfo');
          "
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
          <qrcode-vue :value="insuranceCompany.fullCode" :size="40" level="H" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasInsuranceCompanyEdit())">
        <router-link
          :to="{
            name: 'InsuranceCompanyEdit',
            params: {
              insuranceCompanyToken: insuranceCompany.insuranceCompanyToken,
            },
          }"
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </router-link>
      </li>
      <li>
        <!-- v-if="
            checkPrivilege(
              usersPrivilegeData.usersPrivilegeInsuranceCompany.archive
            )
          " -->
        <button
          v-b-modal.InsuranceCompanyDelete
          :title="$t('delete')"
          @click="setInsuranceCompanyData(insuranceCompany)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasInsuranceCompanyFinaleDelete())">
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
import {
  hasInsuranceCompanyEdit,
  hasInsuranceCompanyFinaleDelete,
} from "@/utils/privilegeHelper";
import CustomCard from "@/components/general/CustomCard.vue";
import QrcodeVue from "qrcode.vue";
import generalMixin from "@/utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
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
