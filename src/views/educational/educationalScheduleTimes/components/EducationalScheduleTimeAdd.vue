<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="EducationalScheduleTimeAdd"
      size="xl"
      :headerText="$t('EducationalScheduleTimes.add')"
      :headerIcon="educationalScheduleTime.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="educationalScheduleTime.setInitialValue()"
    >
      <EducationalScheduleTimeForm
        v-if="!isLoading"
        id="add"
        :educationalScheduleTime="educationalScheduleTime"
        :enquiryStatus="true"
        :filterEnquiry="filterEnquiry"
        v-on:submitForm="addEducationalScheduleTime()"
        v-on:enquiry="enquiry()"
        bottomSheetName="EducationalScheduleTimeAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="EducationalScheduleTimeAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import EducationalScheduleTimeForm from "./EducationalScheduleTimeForm.vue";
import { STATUS } from "./../../../../utils/constants";
import apiEducationalScheduleTime from "./../../../../api/educational/educationalScheduleTimes";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    EducationalScheduleTimeForm,
  },
  props: ["educationalScheduleTime", "filterEnquiry"],
  methods: {
    async enquiry() {
      this.isLoading = true;
      try {
        this.educationalScheduleTime.educationalScheduleTimesData = [];
        const response = await apiEducationalScheduleTime.enquiry(
          this.filterEnquiry
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.educationalScheduleTime.fillData(response.data);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
    async addEducationalScheduleTime() {
      this.isLoading = true;
      this.educationalScheduleTime.handelEmployeesData();
      console.log(
        "addEducationalScheduleTime",
        this.educationalScheduleTime.educationalScheduleTimesData
      );
      try {
        const response = await apiEducationalScheduleTime.add(
          this.educationalScheduleTime
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-EducationalScheduleTimeAdd");
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
          this.showMsg(response.data.msg);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch") + error);
      }
      this.isLoading = false;
    },

    response(data) {
      this.$emit("refresh");
      switch (data) {
        case "yes":
          this.educationalScheduleTime.setInitialValue();
          break;
        case "leave":
          this.educationalScheduleTime.setInitialValue();
          this.closeBottomSheet("EducationalScheduleTimeAdd");
          break;
      }
    },
  },
};
</script>
