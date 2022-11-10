<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="CountryUpdate"
      size="xl"
      :headerText="$t('Countries.edit')"
      :headerIcon="country.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <CountryForm
        v-if="!isLoading"
        id="update"
        :country="country"
        v-on:submitForm="updateCountry()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="CountryUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import CountryForm from "./CountryForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import GeneralDelete from "./../../../../../models/general/GeneralDelete";
import apiCountry from "./../../../../../api/settings/settingsOthers/countries";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    CountryForm,
  },
  props: ["country"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateCountry() {
      this.isLoading = true;
      let formData = objectToFormData(this.country);
      try {
        const response = await apiCountry.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("CountryUpdate");
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
          token: this.country.countryToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiCountry.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.country.countryImagePath = "";
          this.country.countryImageIsDefault = true;
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
