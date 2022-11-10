<template>
  <div v-if="employeePayrollSettingsData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("employees.data") }}</th>
          <th colspan="3">{{ $t("EducationalGroups.data") }}</th>
          <th colspan="5">{{ $t("EmployeePayrollSettings.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th>
            {{ $t("EmployeePayrollSettings.employeeSalaryCalculationType") }}
          </th>
          <th>
            {{
              $t("EmployeePayrollSettings.employeeSalaryCalculationCaseType")
            }}
          </th>
          <th>{{ $t("EmployeePayrollSettings.calculationType") }}</th>
          <th>{{ $t("EmployeePayrollSettings.employeeCalculationValue") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(employeePayrollSetting, index) in employeePayrollSettingsData"
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
          <!-- user -->
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  employeePayrollSetting.userInfoData.userImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>
            {{ isDataExist(employeePayrollSetting.userInfoData.fullCode) }}
          </td>
          <td>
            {{
              isDataExist(employeePayrollSetting.userInfoData.userNameCurrent)
            }}
          </td>
          <!-- group -->
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  employeePayrollSetting.educationalGroupInfoData
                    .educationalGroupImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>
            {{
              isDataExist(
                employeePayrollSetting.educationalGroupInfoData.fullCode
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                employeePayrollSetting.educationalGroupInfoData
                  .educationalGroupNameCurrent
              )
            }}
          </td>
          <!-- setting -->
          <td>
            {{ isDataExist(employeePayrollSetting.fullCode) }}
          </td>
          <td>
            {{
              isDataExist(
                employeePayrollSetting.employeeSalaryCalculationTypeNameCurrent
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                employeePayrollSetting.employeeSalaryCalculationCaseTypeNameCurrent
              )
            }}
          </td>
          <td>
            {{ isDataExist(employeePayrollSetting.calculationTypeNameCurrent) }}
          </td>
          <td>
            {{
              isDataExist(employeePayrollSetting.employeeCalculationValueText)
            }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setEmployeePayrollSettingData(employeePayrollSetting);
                    openBottomSheet('EmployeePayrollSettingInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setEmployeePayrollSettingData(employeePayrollSetting);
                    openBottomSheet('EmployeePayrollSettingQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasEmployeePayrollSettingEdit())">
                <!-- setEmployeePayrollSettingDataModel(employeePayrollSetting); -->
                <button
                  @click="openBottomSheet('EmployeePayrollSettingUpdate')"
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li
                v-if="checkPrivilege(hasEmployeePayrollSettingFinaleDelete())"
              >
                <button
                  v-b-modal.EmployeePayrollSettingDelete
                  :title="$t('delete')"
                  @click="setEmployeePayrollSettingData(employeePayrollSetting)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>

              <li>
                <button
                  @click="
                    setEmployeePayrollSettingData(employeePayrollSetting);
                    openBottomSheet('ActionsData');
                  "
                  :title="$t('actionsData.modelName')"
                >
                  <img src="@/assets/images/actions-data.svg" />
                </button>
              </li>
            </FloatingMenu>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {
  checkPrivilege,
  isDataExist,
  fullPathFileFromServer,
} from "./../../../../../utils/functions";
import {
  hasEmployeePayrollSettingEdit,
  hasEmployeePayrollSettingFinaleDelete,
} from "./../../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  name: "EmployeePayrollSettingsTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["employeePayrollSettingsData", "filterData", "defaultImg"],
  methods: {
    setEmployeePayrollSettingData(employeePayrollSetting) {
      this.$emit("setEmployeePayrollSettingData", employeePayrollSetting);
    },
    // setEmployeePayrollSettingDataModel(employeePayrollSetting) {
    //   this.$emit("setEmployeePayrollSettingDataModel", {
    //     educationalGroupToken: employeePayrollSetting.educationalGroupToken,
    //     employeePayrollSettingList: [],
    //   });
    // },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasEmployeePayrollSettingEdit,
    hasEmployeePayrollSettingFinaleDelete,
  },
};
</script>
