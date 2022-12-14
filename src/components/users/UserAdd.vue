<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="UserAdd"
      size="xl"
      :headerText="$t('Users.add')"
      :headerIcon="user.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="user.setInitialValue()"
    >
      <UserForm
        v-if="!isLoading"
        :id="`${user.userTypeToken}Add`"
        :user="user"
        :userTypeToken="userTypeToken"
        v-on:submitForm="addUser()"
        bottomSheetName="UserAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData dialogName="UserAdd" v-on:response="response($event)" />
  </div>
</template>

<script>
import PreLoader from "./../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../components/general/ConfirmClearData.vue";
import UserForm from "./UserForm.vue";
import { STATUS } from "./../../utils/constants";
import { objectToFormData } from "./../../utils/functions";
import apiUser from "./../../api/user";
import generalMixin from "./../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    UserForm,
  },
  props: ["user", "userTypeToken"],
  methods: {
    async addUser() {
      this.isLoading = true;
      this.user.userTypeToken = this.userTypeToken;
      let formData = objectToFormData(this.user);
      try {
        const response = await apiUser.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-UserAdd");
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
          this.user.setInitialValue();
          break;
        case "leave":
          this.user.setInitialValue();
          this.closeBottomSheet("UserAdd");
          break;
      }
    },
  },
  created() {},
};
</script>
