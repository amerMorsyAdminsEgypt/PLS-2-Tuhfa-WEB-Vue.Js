<template>
  <div v-if="userLoginCodesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("UserLoginCodes.data") }}</th>
          <th rowspan="2">{{ $t("UserLoginCodes.loginCode") }}</th>
          <th colspan="3">{{ $t("UserLoginCodes.codeIsActive") }}</th>
          <th rowspan="2">{{ $t("PlatFroms.modelName") }}</th>
          <th colspan="2">{{ $t("UserLoginCodes.loginCodeStatus") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
          <th>{{ $t("UserLoginCodes.codeIsActiveFrom") }}</th>
          <th>{{ $t("UserLoginCodes.codeIsActiveTo") }}</th>
          <th>{{ $t("UserLoginCodes.codeIsActiveDuration") }}</th>

          <th>{{ $t("UserLoginCodes.loginCodeStatusUsed") }}</th>
          <th>{{ $t("UserLoginCodes.loginCodeStatusExpired") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(userLoginCode, index) in userLoginCodesData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  userLoginCode.userLoginCodeImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(userLoginCode.fullCode) }}</td>
          <td>
            {{ isDataExist(userLoginCode.userLoginCodeNameCurrent) }}
          </td>
          <td>
            <span class="font-en">{{
              isDataExist(userLoginCode.loginCode)
            }}</span>
          </td>
          <td>
            {{
              formateDateTimeLang(
                userLoginCode.codeActiveFromDate,
                userLoginCode.codeActiveFromTime
              )
            }}
          </td>
          <td>
            {{
              formateDateTimeLang(
                userLoginCode.codeActiveToDate,
                userLoginCode.codeActiveToTime
              )
            }}
          </td>
          <td>{{ isDataExist(userLoginCode.codeActiveDurationCurrent) }}</td>
          <td>
            {{ isDataExist(userLoginCode.userLoginCodePlatFromNameCurrent) }}
          </td>
          <td>
            {{ userLoginCode.loginCodeIsUsedStatus ? $t("yes") : $t("no") }}
          </td>
          <td>
            {{ userLoginCode.loginCodeIsExpiredStatus ? $t("yes") : $t("no") }}
          </td>

          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setUserLoginCodeData(userLoginCode);
                    openBottomSheet('UserLoginCodeInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setUserLoginCodeData(userLoginCode);
                    openBottomSheet('UserLoginCodeQRCode');
                  "
                  :title="$t('UserLoginCodes.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="hasPrivilegeEdit || ableToEdit(userLoginCode)">
                <button
                  @click="
                    setUserLoginCodeData(userLoginCode);
                    openBottomSheet('UserLoginCodeUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="hasPrivilegeFinaleDelete">
                <button
                  v-b-modal.UserLoginCodeDelete
                  :title="$t('delete')"
                  @click="setUserLoginCodeData(userLoginCode)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li v-if="hasPrivilegeChangeActivationType">
                <button
                  v-b-modal.UserLoginCodeChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setUserLoginCodeData(userLoginCode)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setUserLoginCodeData(userLoginCode);
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
  formateDateTimeLang,
} from "./../../../../utils/functions";
import {
  hasAdminsEgyptLoginCodeEdit,
  hasMasterAdminLoginCodeEdit,
  hasEmployeeLoginCodeEdit,
  hasStudentLoginCodeEdit,
  hasSupplierLoginCodeEdit,
  hasParentLoginCodeEdit,
  hasClientLoginCodeEdit,
  hasAdminsEgyptLoginCodeFinaleDelete,
  hasMasterAdminLoginCodeFinaleDelete,
  hasEmployeeLoginCodeFinaleDelete,
  hasStudentLoginCodeFinaleDelete,
  hasSupplierLoginCodeFinaleDelete,
  hasParentLoginCodeFinaleDelete,
  hasClientLoginCodeFinaleDelete,
  hasAdminsEgyptLoginCodeChangeActivationType,
  hasMasterAdminLoginCodeChangeActivationType,
  hasEmployeeLoginCodeChangeActivationType,
  hasStudentLoginCodeChangeActivationType,
  hasSupplierLoginCodeChangeActivationType,
  hasParentLoginCodeChangeActivationType,
  hasClientLoginCodeChangeActivationType,
} from "./../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "UserLoginCodesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["userLoginCodesData", "filterData", "defaultImg", "modelName"],
  methods: {
    ableToEdit(userLoginCode) {
      let status = true;
      if (
        userLoginCode.loginCodeIsUsedStatus ||
        userLoginCode.loginCodeIsExpiredStatus
      ) {
        status = false;
      }
      return status;
    },
    setUserLoginCodeData(userLoginCode) {
      this.$emit("setUserLoginCodeData", userLoginCode);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    formateDateTimeLang,
  },
  computed: {
    hasPrivilegeEdit() {
      let status = false;
      switch (this.modelName) {
        case "adminsEgyptLoginCode":
          status = checkPrivilege(hasAdminsEgyptLoginCodeEdit());
          break;
        case "masterAdminLoginCode":
          status = checkPrivilege(hasMasterAdminLoginCodeEdit());
          break;
        case "employeeLoginCode":
          status = checkPrivilege(hasEmployeeLoginCodeEdit());
          break;
        case "studentLoginCode":
          status = checkPrivilege(hasStudentLoginCodeEdit());
          break;
        case "supplierLoginCode":
          status = checkPrivilege(hasSupplierLoginCodeEdit());
          break;
        case "parentLoginCode":
          status = checkPrivilege(hasParentLoginCodeEdit());
          break;
        case "clientLoginCode":
          status = checkPrivilege(hasClientLoginCodeEdit());
          break;
      }
      return status;
    },
    hasPrivilegeFinaleDelete() {
      let status = false;
      switch (this.modelName) {
        case "adminsEgyptLoginCode":
          status = checkPrivilege(hasAdminsEgyptLoginCodeFinaleDelete());
          break;
        case "masterAdminLoginCode":
          status = checkPrivilege(hasMasterAdminLoginCodeFinaleDelete());
          break;
        case "employeeLoginCode":
          status = checkPrivilege(hasEmployeeLoginCodeFinaleDelete());
          break;
        case "studentLoginCode":
          status = checkPrivilege(hasStudentLoginCodeFinaleDelete());
          break;
        case "supplierLoginCode":
          status = checkPrivilege(hasSupplierLoginCodeFinaleDelete());
          break;
        case "parentLoginCode":
          status = checkPrivilege(hasParentLoginCodeFinaleDelete());
          break;
        case "clientLoginCode":
          status = checkPrivilege(hasClientLoginCodeFinaleDelete());
          break;
      }
      return status;
    },
    hasPrivilegeChangeActivationType() {
      let status = false;
      switch (this.modelName) {
        case "adminsEgyptLoginCode":
          status = checkPrivilege(
            hasAdminsEgyptLoginCodeChangeActivationType()
          );
          break;
        case "masterAdminLoginCode":
          status = checkPrivilege(
            hasMasterAdminLoginCodeChangeActivationType()
          );
          break;
        case "employeeLoginCode":
          status = checkPrivilege(hasEmployeeLoginCodeChangeActivationType());
          break;
        case "studentLoginCode":
          status = checkPrivilege(hasStudentLoginCodeChangeActivationType());
          break;
        case "supplierLoginCode":
          status = checkPrivilege(hasSupplierLoginCodeChangeActivationType());
          break;
        case "parentLoginCode":
          status = checkPrivilege(hasParentLoginCodeChangeActivationType());
          break;
        case "clientLoginCode":
          status = checkPrivilege(hasClientLoginCodeChangeActivationType());
          break;
      }
      return status;
    },
  },
};
</script>
