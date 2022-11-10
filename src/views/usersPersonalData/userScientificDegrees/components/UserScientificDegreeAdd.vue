<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="UserScientificDegreeAdd"
      size="xl"
      :headerText="$t('UserScientificDegrees.add')"
      :headerIcon="userScientificDegree.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="userScientificDegree.setInitialValue()"
    >
      <UserScientificDegreeForm
        v-if="!isLoading"
        id="add"
        :userScientificDegree="userScientificDegree"
        v-on:submitForm="addUserScientificDegree()"
        bottomSheetName="UserScientificDegreeAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="UserScientificDegreeAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import UserScientificDegreeForm from "./UserScientificDegreeForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import apiUserScientificDegree from "./../../../../api/usersPersonalData/userScientificDegrees";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    UserScientificDegreeForm,
  },
  props: ["userScientificDegree", "userToken", "userTypeToken"],
  methods: {
    async addUserScientificDegree() {
      this.isLoading = true;
      this.userScientificDegree.userToken = this.userToken;
      this.userScientificDegree.userTypeToken = this.userTypeToken;
      let formData = objectToFormData(this.userScientificDegree);
      try {
        const response = await apiUserScientificDegree.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-UserScientificDegreeAdd");
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
          this.userScientificDegree.setInitialValue();
          break;
        case "leave":
          this.userScientificDegree.setInitialValue();
          this.closeBottomSheet("UserScientificDegreeAdd");
          break;
      }
    },
  },
};
</script>
