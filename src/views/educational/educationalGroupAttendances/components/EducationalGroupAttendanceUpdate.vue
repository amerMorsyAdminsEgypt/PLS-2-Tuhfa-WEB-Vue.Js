<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="EducationalGroupAttendanceUpdate"
      size="xl"
      :headerText="$t('EducationalGroupAttendances.edit')"
      :headerIcon="educationalGroupAttendance.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <EducationalGroupAttendanceFormUpdate
        id="update"
        :educationalGroupAttendance="educationalGroupAttendance"
        v-on:submitForm="updateEducationalGroupAttendance()"
        :deleteFileStatus="false"
        bottomSheetName="EducationalGroupAttendanceUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import EducationalGroupAttendanceFormUpdate from "./EducationalGroupAttendanceFormUpdate.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import GeneralDelete from "./../../../../models/general/GeneralDelete";
import apiEducationalGroupAttendance from "./../../../../api/educational/educationalGroupAttendances";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    EducationalGroupAttendanceFormUpdate,
  },
  props: ["educationalGroupAttendance"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateEducationalGroupAttendance() {
      this.isLoading = true;
      let formData = objectToFormData(this.educationalGroupAttendance);
      try {
        const response = await apiEducationalGroupAttendance.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("EducationalGroupAttendanceUpdate");
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
