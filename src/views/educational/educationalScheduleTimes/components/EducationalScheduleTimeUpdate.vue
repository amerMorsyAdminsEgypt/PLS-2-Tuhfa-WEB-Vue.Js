<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="EducationalScheduleTimeUpdate"
      size="xl"
      :headerText="$t('EducationalScheduleTimes.edit')"
      :headerIcon="educationalScheduleTime.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <EducationalScheduleTimeForm
        v-if="!isLoading"
        id="update"
        :educationalScheduleTime="educationalScheduleTime"
        :enquiryStatus="false"
        v-on:submitForm="updateEducationalScheduleTime()"
        :deleteFileStatus="false"
        bottomSheetName="EducationalScheduleTimeUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import EducationalScheduleTimeForm from "./EducationalScheduleTimeForm.vue";
import { STATUS } from "./../../../../utils/constants";
// import { objectToFormData } from "./../../../../utils/functions";
import apiEducationalScheduleTime from "./../../../../api/educational/educationalScheduleTimes";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    EducationalScheduleTimeForm,
  },
  props: ["educationalScheduleTime"],
  data() {
    return {};
  },
  methods: {
    async updateEducationalScheduleTime() {
      this.isLoading = true;
      // let formData = objectToFormData(this.educationalScheduleTime);
      try {
        const response = await apiEducationalScheduleTime.update(
          this.educationalScheduleTime
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("EducationalScheduleTimeUpdate");
          this.$emit("refresh");
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
          this.showMsg(response.data.msg);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
  },
};
</script>
