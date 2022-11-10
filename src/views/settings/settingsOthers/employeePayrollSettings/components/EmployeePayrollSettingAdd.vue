<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="EmployeePayrollSettingAdd"
      size="xl"
      :headerText="$t('EmployeePayrollSettings.add')"
      :headerIcon="employeePayrollSetting.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="employeePayrollSetting.setInitialValue()"
    >
      <EmployeePayrollSettingForm
        v-if="!isLoading"
        id="add"
        :employeePayrollSetting="employeePayrollSetting"
        v-on:submitForm="addEmployeePayrollSetting()"
        bottomSheetName="EmployeePayrollSettingAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="EmployeePayrollSettingAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../../components/general/ConfirmClearData.vue";
import EmployeePayrollSettingForm from "./EmployeePayrollSettingForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import apiEmployeePayrollSetting from "./../../../../../api/settings/settingsOthers/employeePayrollSettings";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    EmployeePayrollSettingForm,
  },
  computed: {
    ...mapGetters(["userAuthorizeToken"]),
  },
  props: ["employeePayrollSetting"],
  methods: {
    async addEmployeePayrollSetting() {
      this.isLoading = true;
      let params = {
        userAuthorizeToken: this.userAuthorizeToken,
        employeePayrollSettingList:
          this.employeePayrollSetting.employeePayrollSettingList,
      };

      try {
        const response = await apiEmployeePayrollSetting.add(params);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-EmployeePayrollSettingAdd");
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
          this.employeePayrollSetting.setInitialValue();
          break;
        case "leave":
          this.employeePayrollSetting.setInitialValue();
          this.closeBottomSheet("EmployeePayrollSettingAdd");
          break;
      }
    },
  },
};
</script>
