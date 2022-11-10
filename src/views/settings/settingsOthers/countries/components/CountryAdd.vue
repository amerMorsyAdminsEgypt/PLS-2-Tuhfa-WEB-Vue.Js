<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="CountryAdd"
      size="xl"
      :headerText="$t('Countries.add')"
      :headerIcon="country.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="country.setInitialValue()"
    >
      <CountryForm
        v-if="!isLoading"
        id="add"
        :country="country"
        v-on:submitForm="addCountry()"
        bottomSheetName="CountryAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="CountryAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../../components/general/ConfirmClearData.vue";
import CountryForm from "./CountryForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import apiCountry from "./../../../../../api/settings/settingsOthers/countries";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    CountryForm,
  },
  props: ["country"],
  methods: {
    async addCountry() {
      this.isLoading = true;
      let formData = objectToFormData(this.country);
      try {
        const response = await apiCountry.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-CountryAdd");
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
          this.country.setInitialValue();
          break;
        case "leave":
          this.country.setInitialValue();
          this.closeBottomSheet("CountryAdd");
          break;
      }
    },
  },
};
</script>
