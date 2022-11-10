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
      :index="++index + filterData.currentIndex"
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
      <li v-if="checkPrivilege(hasInsuranceCompanyChangeActivationType())">
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
  hasInsuranceCompanyEdit,
  hasInsuranceCompanyFinaleDelete,
  hasInsuranceCompanyChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import CustomCard from "./../../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
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
