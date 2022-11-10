<template>
  <CustomBottomSheet
    :refName="'InstallmentScheduleTimesFilter'"
    size="xl"
    :headerText="$t('Reports.installmentScheduleTimes')"
    :headerIcon="icon"
    @opened="getInstallmentBatchTypesDialog"
  >
    <div class="row">
      <CustomSelectBox
        :className="'col-md-12'"
        :id="'installmentBatchTypeToken'"
        :value="installments.filterData.installmentBatchTypeToken"
        v-on:changeValue="
          installments.filterData.installmentBatchTypeToken = $event
        "
        :options="installmentBatchTypeTokenOptions"
        :title="$t('InstallmentBatchTypes.select')"
        :imgName="'installmentBatchTypes.svg'"
      />
      <CustomInput
        :className="'col-md-12'"
        :id="`sendTo`"
        :value="installments.filterData.sendTo"
        v-on:changeValue="installments.filterData.sendTo = $event"
        :title="$t('Reports.sendTo')"
        :imgName="'email.svg'"
      />

      <DateTimePicker
        class="col-md-6"
        id="dateTimeStartSearch"
        type="dateTime"
        :value="installments.filterData.dateTimeStartSearch"
        v-on:changeValue="
          installments.filterData.dateTimeStartSearch = $event.dateTime
        "
        :title="$t('Reports.dateTimeFrom')"
        :language="language"
      />
      <DateTimePicker
        class="col-md-6"
        id="dateTimeEndSearch"
        type="dateTime"
        :value="installments.filterData.dateTimeEndSearch"
        v-on:changeValue="
          installments.filterData.dateTimeEndSearch = $event.dateTime
        "
        :title="$t('Reports.dateTimeTo')"
        :language="language"
      />
    </div>

    <div class="form-actions">
      <div class="icon-submit" @click.prevent="getReport">
        <img
          src="@/assets/images/check-icon.svg"
          :title="$t('Reports.print')"
        />
      </div>
      <div
        @click.prevent="closeBottomSheet('InstallmentScheduleTimesFilter')"
        class="icon-cancel"
      >
        <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
      </div>
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "@/components/general/CustomBottomSheet.vue";
import CustomInput from "@/components/general/CustomInput.vue";
import DateTimePicker from "@/components/general/DateTimePicker.vue";
import CustomSelectBox from "@/components/general/CustomSelectBox.vue";
import generalMixin from "@/utils/generalMixin";
import icon from "@/assets/images/installments.svg";
import { STATUS } from "@/utils/constants";
import Installments from "@/models/joiningApplications/installments/Installments";
import apiInstallment from "@/api/joiningApplications/installments";
import { getLanguage, viewFileFromServer } from "@/utils/functions";
import { getInstallmentBatchTypesDialog } from "@/utils/dialogsOfApi";

export default {
  mixins: [generalMixin],
  data() {
    return {
      isLoading: false,
      language: getLanguage(),
      installments: new Installments(),
      icon,
      installmentBatchTypeTokenOptions: [],
    };
  },
  components: {
    CustomBottomSheet,
    CustomInput,
    DateTimePicker,
    CustomSelectBox,
  },
  methods: {
    async getInstallmentBatchTypesDialog() {
      this.isLoading = true;
      this.installmentBatchTypeTokenOptions =
        await getInstallmentBatchTypesDialog();
      this.isLoading = false;
    },
    async getReport() {
      this.$emit("isLoading", true);
      try {
        const response = await apiInstallment.getReport(
          this.installments.filterData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("InstallmentScheduleTimesFilter");
          viewFileFromServer(response.data.reportPath);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.$emit("isLoading", false);
    },
    async created() {
      await this.getInstallmentBatchTypesDialog();
    },
  },
};
</script>
