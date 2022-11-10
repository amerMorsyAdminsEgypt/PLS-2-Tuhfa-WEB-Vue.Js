<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="PlaceAdd"
      size="xl"
      :headerText="$t('Places.add')"
      :headerIcon="place.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="place.setInitialValue(place.placeTypeToken)"
    >
      <PlaceForm
        v-if="!isLoading"
        id="add"
        :place="place"
        :placeTypeToken="placeTypeToken"
        :modelName="modelName"
        v-on:submitForm="addPlace()"
        bottomSheetName="PlaceAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData dialogName="PlaceAdd" v-on:response="response($event)" />
  </div>
</template>

<script>
import PreLoader from "./../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../components/general/ConfirmClearData.vue";
import PlaceForm from "./PlaceForm.vue";
import { STATUS } from "./../../../utils/constants";
import { objectToFormData } from "./../../../utils/functions";
import apiPlace from "./../../../api/place";
import generalMixin from "./../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    PlaceForm,
  },
  props: ["place", "placeTypeToken", "modelName"],
  methods: {
    async addPlace() {
      this.isLoading = true;
      let formData = objectToFormData(this.place);
      try {
        const response = await apiPlace.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-PlaceAdd");
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
          this.place.setInitialValue();
          break;
        case "leave":
          this.place.setInitialValue();
          this.closeBottomSheet("PlaceAdd");
          break;
      }
    },
  },
};
</script>
