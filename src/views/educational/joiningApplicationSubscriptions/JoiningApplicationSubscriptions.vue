<template>
  <div class="">
    <DashboardNavbar
      :btnAddTitle="$t('JoiningApplicationSubscriptions.add')"
      :btnAddName="'JoiningApplicationSubscriptionAdd'"
      :btnAddStatus="checkPrivilege(hasJoiningApplicationSubscriptionAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <JoiningApplicationSubscriptionStatistics
          :statistics="
            joiningApplicationSubscriptions.joiningApplicationSubscriptionStatistics
          "
        />
        <JoiningApplicationSubscriptionTable
          v-on:setJoiningApplicationSubscriptionData="
            joiningApplicationSubscriptions.joiningApplicationSubscription.fillData(
              $event
            )
          "
          :joiningApplicationSubscriptionsData="
            joiningApplicationSubscriptions.joiningApplicationSubscriptionsData
          "
          :defaultImg="
            joiningApplicationSubscriptions.joiningApplicationSubscription
              .defaultImg
          "
          :filterData="joiningApplicationSubscriptions.filterData"
        />

        <ActionsData
          :actionsData="
            joiningApplicationSubscriptions.joiningApplicationSubscription
          "
        />
        <CustomBottomSheetQRCode
          :refName="'JoiningApplicationSubscriptionQRCode'"
          :code="
            joiningApplicationSubscriptions.joiningApplicationSubscription
              .fullCode
          "
          :codeTitle="$t('JoiningApplicationSubscriptions.code')"
          :name="
            joiningApplicationSubscriptions.joiningApplicationSubscription
              .joiningApplicationSubscriptionNameCurrent
          "
          :nameTitle="$t('JoiningApplicationSubscriptions.name')"
          :nameIcon="'JoiningApplicationSubscriptions.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="joiningApplicationSubscriptions.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <JoiningApplicationSubscriptionFilter
        :theFilterData="joiningApplicationSubscriptions.filterData"
        v-on:search="search($event)"
      />

      <JoiningApplicationSubscriptionAdd
        :joiningApplicationSubscription="
          joiningApplicationSubscriptions.joiningApplicationSubscription
        "
        v-on:refresh="getAllJoiningApplicationSubscriptions()"
      />
    </div>
  </div>
</template>

<script>
import { STATUS } from "./../../../utils/constants";
import DashboardNavbar from "./../../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../components/general/ExceptionWithImg.vue";
import ActionsData from "./../../../components/general/ActionsData.vue";
import CustomBottomSheetQRCode from "./../../../components/general/CustomBottomSheetQRCode.vue";
import CustomPagination from "./../../../components/general/CustomPagination.vue";
import JoiningApplicationSubscriptionAdd from "./components/JoiningApplicationSubscriptionAdd.vue";
import JoiningApplicationSubscriptionStatistics from "./components/JoiningApplicationSubscriptionStatistics.vue";
import JoiningApplicationSubscriptionTable from "./components/JoiningApplicationSubscriptionTable.vue";
import JoiningApplicationSubscriptionFilter from "./components/JoiningApplicationSubscriptionFilter.vue";
import JoiningApplicationSubscriptions from "./../../../models/educational/joiningApplicationSubscriptions/JoiningApplicationSubscriptions";
import apiJoiningApplicationSubscription from "./../../../api/educational/joiningApplicationSubscriptions";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../utils/functions";
import { hasJoiningApplicationSubscriptionAdd } from "./../../../utils/privilegeHelper";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    ActionsData,
    CustomBottomSheetQRCode,
    CustomPagination,
    JoiningApplicationSubscriptionAdd,
    JoiningApplicationSubscriptionStatistics,
    JoiningApplicationSubscriptionTable,
    JoiningApplicationSubscriptionFilter,
  },
  props: {
    userStudentToken: { type: String, default: "" },
    educationalJoiningApplicationToken: { type: String, default: "" },
  },
  computed: {
    hasData() {
      return (
        this.joiningApplicationSubscriptions.joiningApplicationSubscriptionsData
          .length != 0
      );
    },
  },
  data() {
    return {
      joiningApplicationSubscriptions: new JoiningApplicationSubscriptions(),
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasJoiningApplicationSubscriptionAdd,
    changePagination(pagination) {
      this.joiningApplicationSubscriptions.filterData.fillData(pagination);
      this.getAllJoiningApplicationSubscriptions();
    },
    search(data) {
      this.joiningApplicationSubscriptions.filterData.fillData(data);
      this.getAllJoiningApplicationSubscriptions();
    },
    async getAllJoiningApplicationSubscriptions() {
      this.isLoading = true;
      try {
        this.joiningApplicationSubscriptions.filterData.userStudentInfoDataInclude = true;
        this.joiningApplicationSubscriptions.joiningApplicationSubscriptions =
          [];
        const response = await apiJoiningApplicationSubscription.getAll(
          this.joiningApplicationSubscriptions.filterData
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
        this.joiningApplicationSubscriptions.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.joiningApplicationSubscriptions.filterData.educationalJoiningApplicationToken =
      this.educationalJoiningApplicationToken;
    this.joiningApplicationSubscriptions.joiningApplicationSubscription.educationalJoiningApplicationToken =
      this.educationalJoiningApplicationToken;
    this.getAllJoiningApplicationSubscriptions();
  },
};
</script>
