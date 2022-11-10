<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="UserPersonalCardAdd"
      size="xl"
      :headerText="$t('UserPersonalCards.add')"
      :headerIcon="userPersonalCard.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="userPersonalCard.setInitialValue()"
    >
      <UserPersonalCardForm
        v-if="!isLoading"
        id="add"
        :userPersonalCard="userPersonalCard"
        v-on:submitForm="addUserPersonalCard()"
        bottomSheetName="UserPersonalCardAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="UserPersonalCardAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import UserPersonalCardForm from "./UserPersonalCardForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import apiUserPersonalCard from "./../../../../api/usersPersonalData/userPersonalCards";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    UserPersonalCardForm,
  },
  props: ["userPersonalCard", "userToken", "userTypeToken"],
  methods: {
    async addUserPersonalCard() {
      this.isLoading = true;
      this.userPersonalCard.userToken = this.userToken;
      this.userPersonalCard.userTypeToken = this.userTypeToken;
      let formData = objectToFormData(this.userPersonalCard);
      try {
        const response = await apiUserPersonalCard.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-UserPersonalCardAdd");
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
          this.userPersonalCard.setInitialValue();
          break;
        case "leave":
          this.userPersonalCard.setInitialValue();
          this.closeBottomSheet("UserPersonalCardAdd");
          break;
      }
    },
  },
};
</script>
