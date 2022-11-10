<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="ScientificDegreeAdd"
      size="xl"
      :headerText="$t('ScientificDegrees.add')"
      :headerIcon="scientificDegree.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="scientificDegree.setInitialValue()"
    >
      <ScientificDegreeForm
        v-if="!isLoading"
        id="add"
        :scientificDegree="scientificDegree"
        v-on:submitForm="addScientificDegree()"
        bottomSheetName="ScientificDegreeAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="ScientificDegreeAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../../components/general/ConfirmClearData.vue";
import ScientificDegreeForm from "./ScientificDegreeForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import apiScientificDegree from "./../../../../../api/settings/settingsOthers/scientificDegrees";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    ScientificDegreeForm,
  },
  props: ["scientificDegree"],
  methods: {
    async addScientificDegree() {
      this.isLoading = true;
      let formData = objectToFormData(this.scientificDegree);
      try {
        const response = await apiScientificDegree.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-ScientificDegreeAdd");
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
          this.scientificDegree.setInitialValue();
          break;
        case "leave":
          this.scientificDegree.setInitialValue();
          this.closeBottomSheet("ScientificDegreeAdd");
          break;
      }
    },
  },
};
</script>
