<template>
  <CustomBottomSheet
    :refName="'knownMethodsFilter'"
    size="xl"
    :headerText="$t('Reports.knownMethods')"
    :headerIcon="icon"
  >
    <div class="row">
      <CustomInput
        :className="'col-md-12'"
        :id="`sendTo`"
        :value="knownMethods.filterData.sendTo"
        v-on:changeValue="knownMethods.filterData.sendTo = $event"
        :title="$t('Reports.sendTo')"
        :imgName="'email.svg'"
      />

      <DateTimePicker
        class="col-md-6"
        id="dateTimeFrom"
        type="dateTime"
        :value="knownMethods.filterData.dateTimeFrom"
        v-on:changeValue="
          knownMethods.filterData.dateTimeFrom = $event.dateTime
        "
        :title="$t('Reports.dateTimeFrom')"
        :language="language"
      />
      <DateTimePicker
        class="col-md-6"
        id="dateTimeTo"
        type="dateTime"
        :value="knownMethods.filterData.dateTimeTo"
        v-on:changeValue="knownMethods.filterData.dateTimeTo = $event.dateTime"
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
        @click.prevent="closeBottomSheet('knownMethodsFilter')"
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
import generalMixin from "@/utils/generalMixin";
import icon from "@/assets/images/knownMethods.svg";
import { STATUS } from "@/utils/constants";
import KnownMethods from "@/models/settings/settingsOthers/knownMethods/KnownMethods";
import apiKnownMethod from "@/api/settings/settingsOthers/knownMethods";
import { getLanguage, viewFileFromServer } from "@/utils/functions";

export default {
  mixins: [generalMixin],
  data() {
    return {
      isLoading: false,
      language: getLanguage(),
      knownMethods: new KnownMethods(),
      icon,
    };
  },
  components: {
    CustomBottomSheet,
    CustomInput,
    DateTimePicker,
  },
  methods: {
    async getReport() {
      this.$emit("isLoading", true);
      try {
        const response = await apiKnownMethod.getReport(
          this.knownMethods.filterData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("knownMethodsFilter");
          viewFileFromServer(response.data.reportPath);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.$emit("isLoading", false);
    },
    async created() {},
  },
};
</script>
