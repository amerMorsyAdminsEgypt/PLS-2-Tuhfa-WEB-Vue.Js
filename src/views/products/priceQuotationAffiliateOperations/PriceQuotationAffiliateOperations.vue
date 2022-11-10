<template>
  <div>
    <DashboardNavbar
      v-on:updateViewType="
        updateViewType('priceQuotationAffiliateOperations', $event)
      "
      :viewType="generalSetting.priceQuotationAffiliateOperations.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="
        generalSetting.priceQuotationAffiliateOperations.activationTypeTokens
      "
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('PriceQuotationAffiliateOperations.add')"
      :btnAddName="'PriceQuotationAffiliateOperationAdd'"
      :btnAddStatus="checkPrivilege(hasPriceQuotationAffiliateOperationAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <!-- item-info -->
      <div class="statistics">
        <b-button v-b-toggle.Details class="btn btn-lg btn-collapse">
          {{ $t("PriceQuotationDetails.data") }}
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </b-button>
        <b-collapse id="Details">
          <template>
            <ExceptionWithImg
              v-if="exceptionMsgDetails"
              :msg="exceptionMsgDetails"
              :image="exceptionImg"
            />
            <table v-else class="my-table">
              <thead>
                <tr>
                  <th>{{ $t("PriceQuotationDetails.code") }}</th>
                  <th>{{ $t("PriceQuotations.code") }}</th>
                  <th>{{ $t("PriceQuotations.clientName") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {{ isDataExist(priceQuotationDetailModel.fullCode) }}
                  </td>
                  <td>
                    {{
                      isDataExist(
                        priceQuotationDetailModel.priceQuotationInfoData
                          .fullCode
                      )
                    }}
                  </td>
                  <td>
                    {{
                      isDataExist(
                        priceQuotationDetailModel.priceQuotationInfoData
                          .requestPlaceInfoData.placeNameCurrent
                      )
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
          </template>
        </b-collapse>
      </div>

      <template v-if="hasData">
        <PriceQuotationAffiliateOperationTable
          v-if="
            generalSetting.priceQuotationAffiliateOperations.viewType ==
            VIEW_TYPES.table
          "
          v-on:setPriceQuotationAffiliateOperationData="
            priceQuotationAffiliateOperations.priceQuotationAffiliateOperation.fillData(
              $event
            )
          "
          :priceQuotationAffiliateOperationsData="
            priceQuotationAffiliateOperations.priceQuotationAffiliateOperationsData
          "
          :defaultImg="
            priceQuotationAffiliateOperations.priceQuotationAffiliateOperation
              .defaultImg
          "
          :filterData="priceQuotationAffiliateOperations.filterData"
        />
        <PriceQuotationAffiliateOperationCards
          v-if="
            generalSetting.priceQuotationAffiliateOperations.viewType ==
            VIEW_TYPES.cards
          "
          v-on:setPriceQuotationAffiliateOperationData="
            priceQuotationAffiliateOperations.priceQuotationAffiliateOperation.fillData(
              $event
            )
          "
          :priceQuotationAffiliateOperationsData="
            priceQuotationAffiliateOperations.priceQuotationAffiliateOperationsData
          "
          :defaultImg="
            priceQuotationAffiliateOperations.priceQuotationAffiliateOperation
              .defaultImg
          "
          :filterData="priceQuotationAffiliateOperations.filterData"
        />

        <ActionsData
          :actionsData="
            priceQuotationAffiliateOperations.priceQuotationAffiliateOperation
          "
        />
        <PriceQuotationAffiliateOperationInfo
          :token="
            priceQuotationAffiliateOperations.priceQuotationAffiliateOperation
              .priceQuotationAffiliateOperationToken
          "
        />
        <PriceQuotationAffiliateOperationDelete
          :priceQuotationAffiliateOperation="
            priceQuotationAffiliateOperations.priceQuotationAffiliateOperation
          "
          v-on:refresh="getAllPriceQuotationAffiliateOperations()"
        />
        <PriceQuotationAffiliateOperationChangeActivationType
          :priceQuotationAffiliateOperation="
            priceQuotationAffiliateOperations.priceQuotationAffiliateOperation
          "
          v-on:refresh="getAllPriceQuotationAffiliateOperations()"
        />
        <CustomBottomSheetQRCode
          :refName="'PriceQuotationAffiliateOperationQRCode'"
          :code="
            priceQuotationAffiliateOperations.priceQuotationAffiliateOperation
              .fullCode
          "
          :codeTitle="$t('PriceQuotationAffiliateOperations.code')"
          :name="
            priceQuotationAffiliateOperations.priceQuotationAffiliateOperation
              .priceQuotationAffiliateOperationTitleCurrent
          "
          :nameTitle="$t('PriceQuotationAffiliateOperations.title')"
          :nameIcon="'PriceQuotationAffiliateOperations.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="priceQuotationAffiliateOperations.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <PriceQuotationAffiliateOperationFilter
        :theFilterData="priceQuotationAffiliateOperations.filterData"
        v-on:search="search($event)"
      />

      <PriceQuotationAffiliateOperationAdd
        :priceQuotationAffiliateOperation="
          priceQuotationAffiliateOperations.priceQuotationAffiliateOperation
        "
        v-on:refresh="getAllPriceQuotationAffiliateOperations()"
      />

      <PriceQuotationAffiliateOperationUpdate
        :token="
          priceQuotationAffiliateOperations.priceQuotationAffiliateOperation
            .priceQuotationAffiliateOperationToken
        "
        v-on:refresh="getAllPriceQuotationAffiliateOperations()"
      />
    </div>
  </div>
</template>

<script>
import DashboardNavbar from "./../../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../components/general/ExceptionWithImg.vue";
import ActionsData from "./../../../components/general/ActionsData.vue";
import CustomBottomSheetQRCode from "./../../../components/general/CustomBottomSheetQRCode.vue";
import CustomPagination from "./../../../components/general/CustomPagination.vue";
import PriceQuotationAffiliateOperationAdd from "./components/PriceQuotationAffiliateOperationAdd.vue";
import PriceQuotationAffiliateOperationUpdate from "./components/PriceQuotationAffiliateOperationUpdate.vue";
import PriceQuotationAffiliateOperationTable from "./components/PriceQuotationAffiliateOperationTable.vue";
import PriceQuotationAffiliateOperationCards from "./components/PriceQuotationAffiliateOperationCards.vue";
import PriceQuotationAffiliateOperationInfo from "./components/PriceQuotationAffiliateOperationInfo.vue";
import PriceQuotationAffiliateOperationChangeActivationType from "./components/PriceQuotationAffiliateOperationChangeActivationType.vue";
import PriceQuotationAffiliateOperationDelete from "./components/PriceQuotationAffiliateOperationDelete.vue";
import PriceQuotationAffiliateOperationFilter from "./components/PriceQuotationAffiliateOperationFilter.vue";
import PriceQuotationAffiliateOperations from "./../../../models/products/priceQuotationAffiliateOperations/PriceQuotationAffiliateOperations";
import apiPriceQuotationAffiliateOperation from "./../../../api/products/priceQuotationAffiliateOperations";
import { STATUS, VIEW_TYPES } from "./../../../utils/constants";
import { ACTIVATION_TYPE } from "./../../../utils/constantLists";
import { checkPrivilege, isDataExist } from "./../../../utils/functions";
import {
  hasPriceQuotationAffiliateOperationAdd,
  hasPriceQuotationAffiliateOperationViewActive,
  hasPriceQuotationAffiliateOperationViewArchive,
  hasPriceQuotationAffiliateOperationViewBlocked,
} from "./../../../utils/privilegeHelper";
import PriceQuotationDetail from "./../../../models/products/priceQuotationDetails/PriceQuotationDetail";
import apiPriceQuotationDetail from "./../../../api/products/priceQuotationDetails";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import generalMixin from "./../../../utils/generalMixin";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";

export default {
  mixins: [generalSettingsMixin, generalMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    ActionsData,
    CustomBottomSheetQRCode,
    CustomPagination,
    PriceQuotationAffiliateOperationAdd,
    PriceQuotationAffiliateOperationUpdate,
    PriceQuotationAffiliateOperationTable,
    PriceQuotationAffiliateOperationCards,
    PriceQuotationAffiliateOperationInfo,
    PriceQuotationAffiliateOperationChangeActivationType,
    PriceQuotationAffiliateOperationDelete,
    PriceQuotationAffiliateOperationFilter,
  },
  computed: {
    hasData() {
      return (
        this.priceQuotationAffiliateOperations
          .priceQuotationAffiliateOperationsData.length != 0
      );
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasPriceQuotationAffiliateOperationViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.priceQuotationAffiliateOperations.activationStatistics
            .totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasPriceQuotationAffiliateOperationViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.priceQuotationAffiliateOperations.activationStatistics
            .totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasPriceQuotationAffiliateOperationViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.priceQuotationAffiliateOperations.activationStatistics
            .totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  props: {
    priceQuotationDetailsToken: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      exceptionMsgDetails: null,
      priceQuotationDetailModel: new PriceQuotationDetail(),
      priceQuotationAffiliateOperations:
        new PriceQuotationAffiliateOperations(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    isDataExist,
    hasPriceQuotationAffiliateOperationAdd,
    setFilter() {
      //#region set_filter
      this.priceQuotationAffiliateOperations.filterData.priceQuotationDetailsToken =
        this.priceQuotationDetailsToken;
      this.priceQuotationAffiliateOperations.priceQuotationAffiliateOperation.priceQuotationDetailsToken =
        this.priceQuotationDetailsToken;
      //#endregion set_filter
    },
    checkHasItemToken() {
      //#region check_has_item_token
      let itemToken =
        this.priceQuotationAffiliateOperations.filterData
          .priceQuotationDetailsToken;
      if (!itemToken) {
        // back to PriceQuotationDetails
        this.$router.push({ name: "PriceQuotationDetails" }).catch(() => {});
      }
      //#endregion check_has_item_token
    },
    changePagination(pagination) {
      this.priceQuotationAffiliateOperations.filterData.fillData(pagination);
      this.getAllPriceQuotationAffiliateOperations();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens(
        "priceQuotationAffiliateOperations",
        data
      );
      this.priceQuotationAffiliateOperations.filterData.activationTypeTokens =
        data;
      this.getAllPriceQuotationAffiliateOperations();
    },

    search(data) {
      this.priceQuotationAffiliateOperations.filterData.fillData(data);
      this.getAllPriceQuotationAffiliateOperations();
    },
    async getPriceQuotationDetails() {
      this.isLoading = true;
      try {
        let filter = { token: this.priceQuotationDetailsToken };
        this.priceQuotationDetailModel.setInitialValue();
        const response = await apiPriceQuotationDetail.getDetails(filter);
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsgDetails = null;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.exceptionMsgDetails = response.data.msg;
          this.exceptionImg = "illustrator-noData.svg";
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.exceptionMsgDetails = response.data.msg;
          this.exceptionImg = null;
        }
        this.priceQuotationDetailModel.fillData(response.data.priceQuotation);
      } catch (e) {
        this.exceptionMsgDetails = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
    async getAllPriceQuotationAffiliateOperations() {
      this.isLoading = true;
      this.priceQuotationAffiliateOperations.filterData.priceQuotationDetailsInfoDataInclude = true;
      try {
        this.priceQuotationAffiliateOperations.priceQuotationAffiliateOperationsData =
          [];
        const response = await apiPriceQuotationAffiliateOperation.getAll(
          this.priceQuotationAffiliateOperations.filterData
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
        this.priceQuotationAffiliateOperations.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.setFilter();
    this.checkHasItemToken();
    this.getPriceQuotationDetails();
    this.getAllPriceQuotationAffiliateOperations();
  },
};
</script>
