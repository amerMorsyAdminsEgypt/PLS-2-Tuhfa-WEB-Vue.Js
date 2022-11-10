<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="EmployeePayrollSettingUpdate"
      size="xl"
      :headerText="$t('EmployeePayrollSettings.edit')"
      :headerIcon="employeePayrollSetting.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <EmployeePayrollSettingForm
        v-if="!isLoading"
        id="update"
        :employeePayrollSetting="employeePayrollSetting"
        v-on:submitForm="updateEmployeePayrollSetting()"
        bottomSheetName="EmployeePayrollSettingUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import EmployeePayrollSettingForm from "./EmployeePayrollSettingForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import GeneralDelete from "./../../../../../models/general/GeneralDelete";
import apiEmployeePayrollSetting from "./../../../../../api/settings/settingsOthers/employeePayrollSettings";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    EmployeePayrollSettingForm,
  },
  computed: {
    ...mapGetters(["userAuthorizeToken"]),
  },
  props: ["employeePayrollSetting"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateEmployeePayrollSetting() {
      this.isLoading = true;
      let params = {
        userAuthorizeToken: this.userAuthorizeToken,
        employeePayrollSettingList:
          this.employeePayrollSetting.employeePayrollSettingList,
      };
      try {
        const response = await apiEmployeePayrollSetting.update(params);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("EmployeePayrollSettingUpdate");
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
  },
};
</script>
