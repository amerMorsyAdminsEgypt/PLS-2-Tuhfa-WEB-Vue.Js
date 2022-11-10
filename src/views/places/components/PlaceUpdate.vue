<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="PlaceUpdate"
      size="xl"
      :headerText="$t('Places.edit')"
      :headerIcon="place.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <PlaceForm
        v-if="!isLoading"
        id="update"
        :place="place"
        :modelName="modelName"
        :placeTypeToken="placeTypeToken"
        v-on:submitForm="updatePlace()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="PlaceUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../components/general/CustomBottomSheet.vue";
import PlaceForm from "./PlaceForm.vue";
import { STATUS } from "./../../../utils/constants";
import { objectToFormData } from "./../../../utils/functions";
import PlaceDelete from "./../../../models/general/GeneralDelete";
import apiPlace from "./../../../api/place";
import generalMixin from "./../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    PlaceForm,
  },
  props: ["place", "placeTypeToken", "modelName"],
  data() {
    return {
      model: new PlaceDelete(),
    };
  },
  methods: {
    async updatePlace() {
      this.isLoading = true;
      let formData = objectToFormData(this.place);
      try {
        const response = await apiPlace.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("PlaceUpdate");
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
        this.model.fillGeneralDeleteData({
          token: this.place.placeToken,
          userTypeToken: this.place.userTypeToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiPlace.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.place.placeImagePath = "";
          this.place.placeImageIsDefault = true;
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
