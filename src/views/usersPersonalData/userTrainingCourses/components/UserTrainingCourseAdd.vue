<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="UserTrainingCourseAdd"
      size="xl"
      :headerText="$t('UserTrainingCourses.add')"
      :headerIcon="userTrainingCourse.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="userTrainingCourse.setInitialValue()"
    >
      <UserTrainingCourseForm
        v-if="!isLoading"
        id="add"
        :userTrainingCourse="userTrainingCourse"
        v-on:submitForm="addUserTrainingCourse()"
        bottomSheetName="UserTrainingCourseAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="UserTrainingCourseAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import UserTrainingCourseForm from "./UserTrainingCourseForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import apiUserTrainingCourse from "./../../../../api/usersPersonalData/userTrainingCourses";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    UserTrainingCourseForm,
  },
  props: ["userTrainingCourse", "userToken", "userTypeToken"],
  methods: {
    async addUserTrainingCourse() {
      this.isLoading = true;
      this.userTrainingCourse.userToken = this.userToken;
      this.userTrainingCourse.userTypeToken = this.userTypeToken;
      let formData = objectToFormData(this.userTrainingCourse);
      try {
        const response = await apiUserTrainingCourse.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-UserTrainingCourseAdd");
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
          this.userTrainingCourse.setInitialValue();
          break;
        case "leave":
          this.userTrainingCourse.setInitialValue();
          this.closeBottomSheet("UserTrainingCourseAdd");
          break;
      }
    },
  },
};
</script>
