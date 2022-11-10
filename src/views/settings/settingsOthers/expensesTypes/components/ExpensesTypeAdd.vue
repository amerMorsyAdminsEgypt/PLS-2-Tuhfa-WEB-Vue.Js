<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="ExpensesTypeAdd"
      size="xl"
      :headerText="$t('ExpensesTypes.add')"
      :headerIcon="expensesType.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="expensesType.setInitialValue()"
    >
      <ExpensesTypeForm
        v-if="!isLoading"
        id="add"
        :expensesType="expensesType"
        v-on:submitForm="addExpensesType()"
        bottomSheetName="ExpensesTypeAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="ExpensesTypeAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../../components/general/ConfirmClearData.vue";
import ExpensesTypeForm from "./ExpensesTypeForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import apiExpensesType from "./../../../../../api/settings/settingsOthers/expensesTypes";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    ExpensesTypeForm,
  },
  props: ["expensesType"],
  methods: {
    async addExpensesType() {
      this.isLoading = true;
      let formData = objectToFormData(this.expensesType);
      try {
        const response = await apiExpensesType.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-ExpensesTypeAdd");
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
          this.expensesType.setInitialValue();
          break;
        case "leave":
          this.expensesType.setInitialValue();
          this.closeBottomSheet("ExpensesTypeAdd");
          break;
      }
    },
  },
};
</script>
