<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <form autocomplete="off">
      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            :className="'col-md-12'"
            :id="`${id}-educationalGroupToken`"
            :value="employeePayrollSetting.educationalGroupToken"
            :options="educationalGroupTokenOptions"
            v-on:changeValue="
              employeePayrollSetting.educationalGroupToken = $event;
              getEducationalGroupEmployeesDialog($event);
            "
            :title="$t('EducationalGroups.select')"
            :imgName="'EducationalGroups.svg'"
          />
          <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />
          <template v-else>
            <div
              v-if="employeePayrollSetting.employeePayrollSettingList"
              class="col-12"
            >
              <div
                class="my-card"
                v-for="(
                  item, index
                ) in employeePayrollSetting.employeePayrollSettingList"
                :key="index"
              >
                <span class="my-card-title">{{ index + 1 }}</span>

                <div class="row">
                  <!-- <CustomSelectBox
                    :className="'col-md-6'"
                    :id="`${id}-[${index}][userToken]`"
                    :value="item.userToken"
                    :options="userEmployeeTokenOptions"
                    v-on:changeValue="
                      item.userToken = $event;
                      item.itemUpdated = true;
                    "
                    :title="$t('employees.select')"
                    :imgName="'user.svg'"
                  /> -->
                  <DataLabelGroup
                    :className="'col-md-6'"
                    :value="item.userNameCurrent"
                    :title="$t('employees.name')"
                    :imgName="'user.svg'"
                  />
                  <CustomSelectBox
                    :className="'col-6'"
                    :id="`${id}-[${index}][employeeSalaryCalculationTypeToken]`"
                    :value="item.employeeSalaryCalculationTypeToken"
                    :options="employeeSalaryCalculationTypeTokenOptions"
                    v-on:changeValue="
                      item.employeeSalaryCalculationTypeToken = $event;
                      item.itemUpdated = true;
                    "
                    :title="
                      $t(
                        'EmployeePayrollSettings.employeeSalaryCalculationType'
                      )
                    "
                    :imgName="'type.svg'"
                    :imgStatus="true"
                  />
                  <CustomSelectBox
                    :className="'col-6'"
                    :id="`${id}-[${index}][employeeSalaryCalculationCaseTypeToken]`"
                    :value="item.employeeSalaryCalculationCaseTypeToken"
                    :options="employeeSalaryCalculationCaseTypeTokenOptions"
                    v-on:changeValue="
                      item.employeeSalaryCalculationCaseTypeToken = $event;
                      item.itemUpdated = true;
                    "
                    :title="
                      $t(
                        'EmployeePayrollSettings.employeeSalaryCalculationCaseType'
                      )
                    "
                    :imgName="'type.svg'"
                    :imgStatus="true"
                  />
                  <CustomSelectBox
                    :className="'col-6'"
                    :id="`${id}-[${index}][calculationTypeToken]`"
                    :value="item.calculationTypeToken"
                    :options="calculationTypeTokenOptions"
                    v-on:changeValue="
                      item.calculationTypeToken = $event;
                      item.itemUpdated = true;
                    "
                    :title="$t('EmployeePayrollSettings.calculationType')"
                    :imgName="'type.svg'"
                    :imgStatus="true"
                  />
                  <CustomInputFloat
                    :className="'col-md-6'"
                    :id="`${id}-[${index}][employeeCalculationValue]`"
                    :value="item.employeeCalculationValue"
                    v-on:changeValue="
                      item.employeeCalculationValue = $event;
                      item.itemUpdated = true;
                    "
                    :title="
                      $t('EmployeePayrollSettings.employeeCalculationValue')
                    "
                    :imgName="'number.svg'"
                  />

                  <TextArea
                    :className="'col-md-6'"
                    :id="`${id}-[${index}][employeePayrollSettingDescriptionAr]`"
                    :value="
                      employeePayrollSetting.employeePayrollSettingDescriptionAr
                    "
                    v-on:changeValue="
                      employeePayrollSetting.employeePayrollSettingDescriptionAr =
                        $event;
                      item.itemUpdated = true;
                    "
                    :title="$t('EmployeePayrollSettings.descriptionAr')"
                    :imgName="'description.svg'"
                  />
                  <TextArea
                    :className="'col-md-6'"
                    :id="`${id}-[${index}][employeePayrollSettingDescriptionEn]`"
                    :value="
                      employeePayrollSetting.employeePayrollSettingDescriptionEn
                    "
                    v-on:changeValue="
                      employeePayrollSetting.employeePayrollSettingDescriptionEn =
                        $event;
                      item.itemUpdated = true;
                    "
                    :title="$t('EmployeePayrollSettings.descriptionEn')"
                    :imgName="'description.svg'"
                  />
                  <TextArea
                    :className="'col-md-6'"
                    :id="`${id}-[${index}][employeePayrollSettingDescriptionUnd]`"
                    :value="
                      employeePayrollSetting.employeePayrollSettingDescriptionUnd
                    "
                    v-on:changeValue="
                      employeePayrollSetting.employeePayrollSettingDescriptionUnd =
                        $event;
                      item.itemUpdated = true;
                    "
                    :title="$t('EmployeePayrollSettings.descriptionUnd')"
                    :imgName="'description.svg'"
                  />
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>

      <div class="form-actions">
        <div class="icon-submit" @click.prevent="submitForm">
          <img src="@/assets/images/check-icon.svg" :title="submitName" />
        </div>
        <div
          @click.prevent
          class="icon-cancel"
          v-b-modal="`ConfirmCloseSheet-${bottomSheetName}`"
        >
          <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {
  // USER_TYPE,
  TERMINATION_TYPES,
} from "./../../../../../utils/constantLists";
// import UserActiveSettingInfoData from "./../../../../../models/settings/settingsOthers/employeePayrollSettings/UserActiveSettingInfoData";
import {
  // getUsersDialog,
  getEducationalGroupEmployeesDialog,
  getEducationalGroupsDialog,
} from "./../../../../../utils/dialogsOfApi";
import {
  getDialogOfSalaryCalculationType,
  getDialogOfSalaryCalculationCaseType,
  getDialogOfCalculationType,
} from "./../../../../../utils/dialogsOfConstantsLists";
import {
  fullPathFileFromServer,
  // bottomSheetScrollToTop,
} from "./../../../../../utils/functions";
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../../../components/general/ExceptionWithImg.vue";
import CustomInputFloat from "./../../../../../components/general/CustomInputFloat.vue";
import DataLabelGroup from "./../../../../../components/general/DataLabelGroup.vue";
import CustomSelectBox from "./../../../../../components/general/CustomSelectBox.vue";
import TextArea from "./../../../../../components/general/TextArea.vue";
import { checkPrivilege } from "./../../../../../utils/functions";
import generalMixin from "./../../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
// import { required } from "vuelidate/lib/validators";
// import {
//   isValidTextAr,
//   isValidTextEn,
// } from "./../../../../../utils/validationHelper";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomInputFloat,
    DataLabelGroup,
    CustomSelectBox,
    TextArea,
  },
  data() {
    return {
      isLoading: false,
      exceptionMsg: null,
      userEmployeeTokenOptions: [],
      educationalGroupTokenOptions: [],
      employeeSalaryCalculationTypeTokenOptions:
        getDialogOfSalaryCalculationType(),
      employeeSalaryCalculationCaseTypeTokenOptions:
        getDialogOfSalaryCalculationCaseType(),
      calculationTypeTokenOptions: getDialogOfCalculationType(),
    };
  },
  props: {
    employeePayrollSetting: {
      type: Object,
    },
    submitName: {
      type: String,
    },
    id: {
      type: String,
      default: "id",
    },
    bottomSheetName: {
      type: String,
      default: "",
    },
  },
  // validations: {
  //   employeePayrollSetting: {
  //     employeePayrollSettingDescriptionAr: { isValidTextAr },
  //     employeePayrollSettingDescriptionEn: { isValidTextEn },
  //   },
  // },
  computed: {
    // errors_employeePayrollSettingDescriptionAr() {
    //   let errors = [];
    //   if (
    //     this.$v.employeePayrollSetting.employeePayrollSettingDescriptionAr
    //       .$error
    //   ) {
    //     if (
    //       !this.$v.employeePayrollSetting.employeePayrollSettingDescriptionAr
    //         .isValidTextAr
    //     )
    //       errors.push(this.$t("validation.fieldIsRequiredInAr"));
    //   }
    //   return errors;
    // },
    // errors_employeePayrollSettingDescriptionEn() {
    //   let errors = [];
    //   if (
    //     this.$v.employeePayrollSetting.employeePayrollSettingDescriptionEn
    //       .$error
    //   ) {
    //     if (
    //       !this.$v.employeePayrollSetting.employeePayrollSettingDescriptionEn
    //         .isValidTextEn
    //     )
    //       errors.push(this.$t("validation.fieldIsRequiredInEn"));
    //   }
    //   return errors;
    // },
  },
  methods: {
    async getEducationalGroupsDialog() {
      this.isLoading = true;
      let params = {
        educationalGroupTerminationTypeToken: TERMINATION_TYPES.NotFinished,
      };
      this.educationalGroupTokenOptions = await getEducationalGroupsDialog(
        params
      );
      this.isLoading = false;
    },
    async getEducationalGroupEmployeesDialog(educationalGroupToken) {
      this.isLoading = true;
      let params = {
        educationalGroupToken: educationalGroupToken,
      };
      const [options, error] = await getEducationalGroupEmployeesDialog(
        params,
        true
      );
      this.userEmployeeTokenOptions = options;
      this.exceptionMsg = error;

      if (!error) {
        let listUserActiveSettingInfoData = options
          .filter((item) => item.userActiveSettingInfoData)
          .map(function (item) {
            return item.userActiveSettingInfoData;
          });

        this.employeePayrollSetting.fillData({
          educationalGroupToken: educationalGroupToken,
          employeePayrollSettingList: listUserActiveSettingInfoData,
        });
      }

      this.isLoading = false;
    },

    async submitForm() {
      this.$emit("submitForm");
    },
    checkPrivilege,
    fullPathFileFromServer,
  },
  created() {
    this.getEducationalGroupsDialog();
  },
};
</script>
