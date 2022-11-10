<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="EducationalGroupAttendanceAdd"
      size="xl"
      :headerText="$t('EducationalGroupAttendances.add')"
      :headerIcon="educationalGroupAttendance.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="educationalGroupAttendance.setInitialValue()"
    >
      <EducationalGroupAttendanceForm
        id="add"
        :educationalGroupAttendance="educationalGroupAttendance"
        v-on:submitForm="addEducationalGroupAttendance()"
        bottomSheetName="EducationalGroupAttendanceAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="EducationalGroupAttendanceAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import EducationalGroupAttendanceForm from "./EducationalGroupAttendanceForm.vue";
import { STATUS } from "./../../../../utils/constants";
import apiEducationalGroupAttendance from "./../../../../api/educational/educationalGroupAttendances";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    EducationalGroupAttendanceForm,
  },
  props: ["educationalGroupAttendance"],
  methods: {
    async addEducationalGroupAttendance() {
      this.isLoading = true;
      try {
        const response = await apiEducationalGroupAttendance.add(
          this.educationalGroupAttendance
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-EducationalGroupAttendanceAdd");
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

    response(data) {
      this.$emit("refresh");
      switch (data) {
        case "yes":
          this.educationalGroupAttendance.setInitialValue();
          break;
        case "leave":
          this.educationalGroupAttendance.setInitialValue();
          this.closeBottomSheet("EducationalGroupAttendanceAdd");
          break;
      }
    },
  },
};
</script>
