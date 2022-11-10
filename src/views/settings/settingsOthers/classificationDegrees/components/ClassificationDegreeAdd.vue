<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="ClassificationDegreeAdd"
      size="xl"
      :headerText="$t('ClassificationDegrees.add')"
      :headerIcon="classificationDegree.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="classificationDegree.setInitialValue()"
    >
      <ClassificationDegreeForm
        v-if="!isLoading"
        id="add"
        :classificationDegree="classificationDegree"
        v-on:submitForm="addClassificationDegree()"
        bottomSheetName="ClassificationDegreeAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="ClassificationDegreeAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../../components/general/ConfirmClearData.vue";
import ClassificationDegreeForm from "./ClassificationDegreeForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import apiClassificationDegree from "./../../../../../api/settings/settingsOthers/classificationDegrees";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    ClassificationDegreeForm,
  },
  props: ["classificationDegree"],
  methods: {
    async addClassificationDegree() {
      this.isLoading = true;
      let formData = objectToFormData(this.classificationDegree);
      try {
        const response = await apiClassificationDegree.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-ClassificationDegreeAdd");
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
          this.classificationDegree.setInitialValue();
          break;
        case "leave":
          this.classificationDegree.setInitialValue();
          this.closeBottomSheet("ClassificationDegreeAdd");
          break;
      }
    },
  },
};
</script>
