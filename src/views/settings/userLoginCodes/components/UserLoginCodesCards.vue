<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(userLoginCode, index) in userLoginCodesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="userLoginCode.userLoginCodeNameCurrent"
      :description="userLoginCode.fullCode"
      :imagePath="userLoginCode.userLoginCodeImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setUserLoginCodeData(userLoginCode);
            openBottomSheet('UserLoginCodeInfo');
          "
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
      <li v-if="hasPrivilegeEdit || ableToEdit()">
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
    </CustomCard>
  </div>
</template>

<script>
import {
  checkPrivilege,
  isDataExist,
  fullPathFileFromServer,
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
import CustomCard from "./../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
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
