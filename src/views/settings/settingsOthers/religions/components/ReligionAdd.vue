<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="ReligionAdd"
      size="xl"
      :headerText="$t('Religions.add')"
      :headerIcon="religion.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="religion.setInitialValue()"
    >
      <ReligionForm
        v-if="!isLoading"
        id="add"
        :religion="religion"
        v-on:submitForm="addReligion()"
        bottomSheetName="ReligionAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="ReligionAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../../components/general/ConfirmClearData.vue";
import ReligionForm from "./ReligionForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import apiReligion from "./../../../../../api/settings/settingsOthers/religions";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    ReligionForm,
  },
  props: ["religion"],
  methods: {
    async addReligion() {
      this.isLoading = true;
      let formData = objectToFormData(this.religion);
      try {
        const response = await apiReligion.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-ReligionAdd");
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
          this.religion.setInitialValue();
          break;
        case "leave":
          this.religion.setInitialValue();
          this.closeBottomSheet("ReligionAdd");
          break;
      }
    },
  },
};
</script>
