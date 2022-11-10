<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="PlaceUserAdd"
      size="xl"
      :headerText="$t('PlaceUsers.add')"
      :headerIcon="placeUser.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="placeUser.setInitialValue()"
    >
      main model {{ mainModel }}
      <!-- <PlaceUserForm
        v-if="!isLoading"
        id="add"  
        :placeUser="placeUser"
        v-on:submitForm="addPlaceUser()"
        bottomSheetName="PlaceUserAdd"
        :submitName="$t('add')"
      /> -->
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="PlaceUserAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../components/general/ConfirmClearData.vue";
// import PlaceUserForm from "./PlaceUserForm.vue";
import { STATUS } from "./../../../utils/constants";
import { objectToFormData } from "./../../../utils/functions";
import apiPlaceUser from "./../../../api/placeUser";
import generalMixin from "./../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    // PlaceUserForm,
  },
  props: ["placeUser", "mainModel"],
  methods: {
    async addPlaceUser() {
      this.isLoading = true;
      let formData = objectToFormData(this.placeUser);
      try {
        const response = await apiPlaceUser.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-PlaceUserAdd");
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
          this.placeUser.setInitialValue();
          break;
        case "leave":
          this.placeUser.setInitialValue();
          this.closeBottomSheet("PlaceUserAdd");
          break;
      }
    },
  },
};
</script>
