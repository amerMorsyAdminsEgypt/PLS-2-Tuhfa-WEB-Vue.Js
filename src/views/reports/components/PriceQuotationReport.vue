<template>
  <CustomBottomSheet
    :refName="'PriceQuotationReport'"
    size="xl"
    :headerText="$t('Reports.PriceQuotationsReport')"
    :headerIcon="priceQuotations.priceQuotation.icon"
    @opened="getDialogs"
  >
    <div class="row">
      <CustomSelectBox
        :className="'col-md-12'"
        :id="`PriceQuotations-report-reportTemplateToken`"
        :value="priceQuotations.filterData.reportTemplateToken"
        :options="reportTemplateTokenOptions"
        v-on:changeValue="
          priceQuotations.filterData.reportTemplateToken = $event
        "
        :title="$t('ConstantsListSelect.ReportTemplates')"
        :imgName="'ReportTemplates.svg'"
      />

      <CustomInput
        :className="'col-md-12'"
        :id="`PriceQuotations-report-sendTo`"
        :value="priceQuotations.filterData.sendTo"
        v-on:changeValue="priceQuotations.filterData.sendTo = $event"
        :title="$t('Reports.sendTo')"
        :imgName="'email.svg'"
      />
    </div>

    <div class="form-actions">
      <div
        v-if="exportStatus"
        class="icon-submit"
        @click.prevent="getReportExport"
      >
        <img
          src="@/assets/images/check-icon.svg"
          :title="$t('Reports.print')"
        />
      </div>
      <div v-else class="icon-submit" @click.prevent="getReport">
        <img
          src="@/assets/images/check-icon.svg"
          :title="$t('Reports.print')"
        />
      </div>

      <div
        @click.prevent="closeBottomSheet('PriceQuotationReport')"
        class="icon-cancel"
      >
        <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
      </div>
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../components/general/CustomBottomSheet.vue";
import CustomSelectBox from "./../../../components/general/CustomSelectBox.vue";
import CustomInput from "./../../../components/general/CustomInput.vue";
import { STATUS } from "./../../../utils/constants";
import { viewFileFromServer } from "./../../../utils/functions";
import { getReportTemplatesDialog } from "./../../../utils/dialogsOfApi";
import PriceQuotations from "./../../../models/products/priceQuotations/PriceQuotations";
import apiPriceQuotation from "./../../../api/products/priceQuotations";
import generalMixin from "./../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  data() {
    return {
      bottomSheetOpened: false,
      priceQuotations: new PriceQuotations(),
      reportTemplateTokenOptions: [],
    };
  },
  components: {
    CustomBottomSheet,
    CustomSelectBox,
    CustomInput,
  },
  props: {
    token: {
      type: String,
      default: "",
    },
    exportStatus: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    async getDialogs() {
      this.priceQuotations.filterData.token = this.token;
      if (!this.bottomSheetOpened) {
        this.getReportTemplatesDialog();
        this.bottomSheetOpened = true;
      }
    },
    async getReportTemplatesDialog() {
      this.$emit("isLoading", true);
      this.reportTemplateTokenOptions = await getReportTemplatesDialog();
      this.$emit("isLoading", false);
    },

    async getReport() {
      this.$emit("isLoading", true);
      try {
        const response = await apiPriceQuotation.getReport(
          this.priceQuotations.filterData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("PriceQuotationReport");
          viewFileFromServer(response.data.reportPath);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.$emit("isLoading", false);
    },
    async getReportExport() {
      this.$emit("isLoading", true);
      try {
        const response = await apiPriceQuotation.getReportExport(
          this.priceQuotations.filterData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("PriceQuotationReport");
          viewFileFromServer(response.data.reportPath);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.$emit("isLoading", false);
    },
  },
};
</script>
