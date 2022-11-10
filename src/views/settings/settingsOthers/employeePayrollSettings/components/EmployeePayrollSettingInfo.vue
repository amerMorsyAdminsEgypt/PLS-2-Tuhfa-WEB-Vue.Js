<template>
  <CustomBottomSheet
    :refName="'EmployeePayrollSettingInfo'"
    size="xl"
    :headerText="$t('EmployeePayrollSettings.data')"
    :headerIcon="employeePayrollSetting.icon"
  >
    <div class="row">
      <!-- user -->
      <DataLabelGroup
        :className="'col-md-6'"
        :value="employeePayrollSetting.userInfoData.fullCode"
        :title="$t('Users.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="employeePayrollSetting.userInfoData.userNameCurrent"
        :title="$t('Users.name')"
        :imgName="'user.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="employeePayrollSetting.educationalGroupInfoData.fullCode"
        :title="$t('EducationalGroups.code')"
        :imgName="'EducationalGroups.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          employeePayrollSetting.educationalGroupInfoData
            .educationalGroupNameCurrent
        "
        :title="$t('EducationalGroups.name')"
        :imgName="'EducationalGroups.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="employeePayrollSetting.fullCode"
        :title="$t('EmployeePayrollSettings.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="employeePayrollSetting.employeeSalaryCalculationTypeNameCurrent"
        :title="$t('EmployeePayrollSettings.employeeSalaryCalculationType')"
        :imgName="'type.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          employeePayrollSetting.employeeSalaryCalculationCaseTypeNameCurrent
        "
        :title="$t('EmployeePayrollSettings.employeeSalaryCalculationCaseType')"
        :imgName="'dateAndTime.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="employeePayrollSetting.calculationTypeNameCurrent"
        :title="$t('EmployeePayrollSettings.calculationType')"
        :imgName="'type.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="employeePayrollSetting.employeeCalculationValueText"
        :title="$t('EmployeePayrollSettings.employeeCalculationValue')"
        :imgName="'number.svg'"
      />
      <!-- settings -->
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../../../components/general/DataLabelGroup.vue";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
  },
  props: ["employeePayrollSetting"],
};
</script>
