<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="UserInjuryAdd"
      size="xl"
      :headerText="$t('UserInjuries.add')"
      :headerIcon="userInjury.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="userInjury.setInitialValue()"
    >
      <UserInjuryForm
        v-if="!isLoading"
        id="add"
        :userInjury="userInjury"
        v-on:submitForm="addUserInjury()"
        bottomSheetName="UserInjuryAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="UserInjuryAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import UserInjuryForm from "./UserInjuryForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import apiUserInjury from "./../../../../api/usersPersonalData/userInjuries";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    UserInjuryForm,
  },
  props: ["userInjury", "userToken", "userTypeToken"],
  methods: {
    async addUserInjury() {
      this.isLoading = true;
      this.userInjury.userToken = this.userToken;
      this.userInjury.userTypeToken = this.userTypeToken;
      let formData = objectToFormData(this.userInjury);
      try {
        const response = await apiUserInjury.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-UserInjuryAdd");
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
          this.userInjury.setInitialValue();
          break;
        case "leave":
          this.userInjury.setInitialValue();
          this.closeBottomSheet("UserInjuryAdd");
          break;
      }
    },
  },
};
</script>
