<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="UserPersonalCardUpdate"
      size="xl"
      :headerText="$t('UserPersonalCards.edit')"
      :headerIcon="userPersonalCard.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <UserPersonalCardForm
        v-if="!isLoading"
        id="update"
        :userTypeToken="userPersonalCard.userTypeToken"
        :userPersonalCard="userPersonalCard"
        v-on:submitForm="updateUserPersonalCard()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="UserPersonalCardUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import UserPersonalCardForm from "./UserPersonalCardForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import UserDelete from "./../../../../models/users/UserDelete";
import apiUserPersonalCard from "./../../../../api/usersPersonalData/userPersonalCards";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    UserPersonalCardForm,
  },
  props: ["userPersonalCard"],
  data() {
    return {
      model: new UserDelete(),
    };
  },
  methods: {
    async updateUserPersonalCard() {
      this.isLoading = true;
      let formData = objectToFormData(this.userPersonalCard);
      try {
        const response = await apiUserPersonalCard.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("UserPersonalCardUpdate");
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
          token: this.userPersonalCard.userPersonalCardToken,
          userTypeToken: this.userPersonalCard.userTypeToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiUserPersonalCard.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.userPersonalCard.userPersonalCardImagePath = "";
          this.userPersonalCard.userPersonalCardImageIsDefault = true;
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
