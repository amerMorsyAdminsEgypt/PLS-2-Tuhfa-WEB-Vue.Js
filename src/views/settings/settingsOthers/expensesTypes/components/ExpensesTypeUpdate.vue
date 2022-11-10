<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="ExpensesTypeUpdate"
      size="xl"
      :headerText="$t('ExpensesTypes.edit')"
      :headerIcon="expensesType.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <ExpensesTypeForm
        v-if="!isLoading"
        id="update"
        :expensesType="expensesType"
        v-on:submitForm="updateExpensesType()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="ExpensesTypeUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ExpensesTypeForm from "./ExpensesTypeForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import GeneralDelete from "./../../../../../models/general/GeneralDelete";
import apiExpensesType from "./../../../../../api/settings/settingsOthers/expensesTypes";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ExpensesTypeForm,
  },
  props: ["expensesType"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateExpensesType() {
      this.isLoading = true;
      let formData = objectToFormData(this.expensesType);
      try {
        const response = await apiExpensesType.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("ExpensesTypeUpdate");
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
          token: this.expensesType.expensesTypeToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiExpensesType.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.expensesType.expensesTypeImagePath = "";
          this.expensesType.expensesTypeImageIsDefault = true;
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
