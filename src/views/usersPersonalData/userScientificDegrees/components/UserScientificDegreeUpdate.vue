<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="UserScientificDegreeUpdate"
      size="xl"
      :headerText="$t('UserScientificDegrees.edit')"
      :headerIcon="userScientificDegree.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <UserScientificDegreeForm
        v-if="!isLoading"
        id="update"
        :userTypeToken="userScientificDegree.userTypeToken"
        :userScientificDegree="userScientificDegree"
        v-on:submitForm="updateUserScientificDegree()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="UserScientificDegreeUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import UserScientificDegreeForm from "./UserScientificDegreeForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import UserDelete from "./../../../../models/users/UserDelete";
import apiUserScientificDegree from "./../../../../api/usersPersonalData/userScientificDegrees";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    UserScientificDegreeForm,
  },
  props: ["userScientificDegree"],
  data() {
    return {
      model: new UserDelete(),
    };
  },
  methods: {
    async updateUserScientificDegree() {
      this.isLoading = true;
      let formData = objectToFormData(this.userScientificDegree);
      try {
        const response = await apiUserScientificDegree.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("UserScientificDegreeUpdate");
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
          token: this.userScientificDegree.userScientificDegreeToken,
          userTypeToken: this.userScientificDegree.userTypeToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiUserScientificDegree.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.userScientificDegree.userScientificDegreeImagePath = "";
          this.userScientificDegree.userScientificDegreeImageIsDefault = true;
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
