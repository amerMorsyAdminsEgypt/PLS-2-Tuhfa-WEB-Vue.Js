<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="SimpleExamModelAdd"
      size="xl"
      :headerText="$t('SimpleExamModels.add')"
      :headerIcon="simpleExamModel.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="simpleExamModel.setInitialValue()"
    >
      <SimpleExamModelForm
        v-if="!isLoading"
        id="add"
        :simpleExamModel="simpleExamModel"
        v-on:submitForm="addSimpleExamModel()"
        bottomSheetName="SimpleExamModelAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="SimpleExamModelAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import SimpleExamModelForm from "./SimpleExamModelForm.vue";
import { STATUS } from "./../../../../utils/constants";
// import { objectToFormData } from "./../../../../utils/functions";
import apiSimpleExamModel from "./../../../../api/educational/simpleExamModels";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    SimpleExamModelForm,
  },
  props: ["simpleExamModel"],
  methods: {
    async addSimpleExamModel() {
      this.isLoading = true;
      // let formData = objectToFormData(this.simpleExamModel);
      try {
        const response = await apiSimpleExamModel.add(this.simpleExamModel);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-SimpleExamModelAdd");
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
          this.simpleExamModel.setInitialValue();
          break;
        case "leave":
          this.simpleExamModel.setInitialValue();
          this.closeBottomSheet("SimpleExamModelAdd");
          break;
      }
    },
  },
};
</script>
