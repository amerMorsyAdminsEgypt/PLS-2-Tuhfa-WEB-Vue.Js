<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('certificates', $event)"
      :viewType="generalSetting.certificates.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="generalSetting.certificates.activationTypeTokens"
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('Certificates.add')"
      :btnAddName="'CertificateAdd'"
      :btnAddStatus="checkPrivilege(hasCertificateAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <CertificateTable
          v-if="generalSetting.certificates.viewType == VIEW_TYPES.table"
          v-on:setCertificateData="certificates.certificate.fillData($event)"
          :certificatesData="certificates.certificatesData"
          :defaultImg="certificates.certificate.defaultImg"
          :filterData="certificates.filterData"
        />

        <CertificateCards
          v-else-if="generalSetting.certificates.viewType == VIEW_TYPES.cards"
          v-on:setCertificateData="certificates.certificate.fillData($event)"
          :certificatesData="certificates.certificatesData"
          :defaultImg="certificates.certificate.defaultImg"
          :filterData="certificates.filterData"
        />

        <ActionsData :actionsData="certificates.certificate" />
        <CertificateInfo :certificate="certificates.certificate" />
        <CertificateDelete
          :certificate="certificates.certificate"
          v-on:refresh="getAllCertificates()"
        />
        <CertificateChangeActivationType
          :certificate="certificates.certificate"
          v-on:refresh="getAllCertificates()"
        />
        <CustomBottomSheetQRCode
          :refName="'CertificateQRCode'"
          :code="certificates.certificate.fullCode"
          :codeTitle="$t('Certificates.code')"
          :name="certificates.certificate.certificateNameCurrent"
          :nameTitle="$t('Certificates.name')"
          :nameIcon="'certificates.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="certificates.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <CertificateFilter
        :theFilterData="certificates.filterData"
        v-on:search="search($event)"
      />

      <CertificateAdd
        :certificate="certificates.certificate"
        v-on:refresh="getAllCertificates()"
      />
      <CertificateUpdate
        :certificate="certificates.certificate"
        v-on:refresh="getAllCertificates()"
      />
    </div>
  </div>
</template>

<script>
import { STATUS, VIEW_TYPES } from "./../../../../utils/constants";
import { ACTIVATION_TYPE } from "./../../../../utils/constantLists";
import DashboardNavbar from "./../../../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../../components/general/ExceptionWithImg.vue";
import ActionsData from "./../../../../components/general/ActionsData.vue";
import CustomBottomSheetQRCode from "./../../../../components/general/CustomBottomSheetQRCode.vue";
import CustomPagination from "./../../../../components/general/CustomPagination.vue";
import CertificateAdd from "./components/CertificateAdd.vue";
import CertificateUpdate from "./components/CertificateUpdate.vue";
import CertificateCards from "./components/CertificateCards.vue";
import CertificateTable from "./components/CertificateTable.vue";
import CertificateInfo from "./components/CertificateInfo.vue";
import CertificateDelete from "./components/CertificateDelete.vue";
import CertificateChangeActivationType from "./components/CertificateChangeActivationType.vue";
import CertificateFilter from "./components/CertificateFilter.vue";
import Certificates from "./../../../../models/settings/settingsOthers/certificates/Certificates";
import apiCertificate from "./../../../../api/settings/settingsOthers/certificates";
import { getDialogOfActivationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../../utils/generalMixin";
import generalSettingsMixin from "./../../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasCertificateAdd,
  hasCertificateViewActive,
  hasCertificateViewArchive,
  hasCertificateViewBlocked,
} from "./../../../../utils/privilegeHelper";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    ActionsData,
    CustomBottomSheetQRCode,
    CustomPagination,
    CertificateAdd,
    CertificateUpdate,
    CertificateCards,
    CertificateTable,
    CertificateInfo,
    CertificateDelete,
    CertificateChangeActivationType,
    CertificateFilter,
  },
  computed: {
    hasData() {
      return this.certificates.certificatesData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasCertificateViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.certificates.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasCertificateViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.certificates.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasCertificateViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.certificates.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      certificates: new Certificates(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasCertificateAdd,
    changePagination(pagination) {
      this.certificates.filterData.fillData(pagination);
      this.getAllCertificates();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("certificates", data);
      this.certificates.filterData.activationTypeTokens = data;
      this.getAllCertificates();
    },
    search(data) {
      this.certificates.filterData.fillData(data);
      this.getAllCertificates();
    },
    async getAllCertificates() {
      this.isLoading = true;
      try {
        this.certificates.certificatesData = [];
        const response = await apiCertificate.getAll(
          this.certificates.filterData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
        } else if (response.data.status == STATUS.NO_INTERNET) {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = "illustrator-noInternet.svg";
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = "illustrator-noData.svg";
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = null;
        }
        this.certificates.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllCertificates();
  },
};
</script>
