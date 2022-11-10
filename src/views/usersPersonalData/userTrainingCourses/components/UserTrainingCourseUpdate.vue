<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="UserTrainingCourseUpdate"
      size="xl"
      :headerText="$t('UserTrainingCourses.edit')"
      :headerIcon="userTrainingCourse.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <UserTrainingCourseForm
        v-if="!isLoading"
        id="update"
        :userTypeToken="userTrainingCourse.userTypeToken"
        :userTrainingCourse="userTrainingCourse"
        v-on:submitForm="updateUserTrainingCourse()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="UserTrainingCourseUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import UserTrainingCourseForm from "./UserTrainingCourseForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import UserDelete from "./../../../../models/users/UserDelete";
import apiUserTrainingCourse from "./../../../../api/usersPersonalData/userTrainingCourses";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    UserTrainingCourseForm,
  },
  props: ["userTrainingCourse"],
  data() {
    return {
      model: new UserDelete(),
    };
  },
  methods: {
    async updateUserTrainingCourse() {
      this.isLoading = true;
      let formData = objectToFormData(this.userTrainingCourse);
      try {
        const response = await apiUserTrainingCourse.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("UserTrainingCourseUpdate");
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
    async deleteFile() {
      this.isLoading = true;
      try {
        this.model.fillData({
          token: this.userTrainingCourse.userTrainingCourseToken,
          userTypeToken: this.userTrainingCourse.userTypeToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiUserTrainingCourse.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.userTrainingCourse.userTrainingCourseImagePath = "";
          this.userTrainingCourse.userTrainingCourseImageIsDefault = true;
          this.$emit("refresh");
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
  },
};
</script>
