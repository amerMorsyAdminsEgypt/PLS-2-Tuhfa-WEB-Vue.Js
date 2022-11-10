<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(userQualification, index) in userQualificationsData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="userQualification.userQualificationNameCurrent"
      :description="userQualification.fullCode"
      :imagePath="userQualification.userQualificationImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setUserQualificationData(userQualification);
            openBottomSheet('UserQualificationInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setUserQualificationData(userQualification);
            openBottomSheet('UserQualificationQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="hasPrivilegeEdit">
        <button
          @click="
            setUserQualificationData(userQualification);
            openBottomSheet('UserQualificationUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="hasPrivilegeFinaleDelete">
        <button
          v-b-modal.UserQualificationDelete
          :title="$t('delete')"
          @click="setUserQualificationData(userQualification)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="hasPrivilegeChangeActivationType">
        <button
          v-b-modal.UserQualificationChangeActivationType
          :title="$t('changeActivationType')"
          @click="setUserQualificationData(userQualification)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setUserQualificationData(userQualification);
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
import { USER_TYPE } from "./../../../../utils/constantLists";
import {
  checkPrivilege,
  isDataExist,
  fullPathFileFromServer,
} from "./../../../../utils/functions";
import {
  hasAdminsEgyptQualificationEdit,
  hasAdminsEgyptQualificationFinaleDelete,
  hasAdminsEgyptQualificationChangeActivationType,
  hasMasterAdminQualificationEdit,
  hasMasterAdminQualificationFinaleDelete,
  hasMasterAdminQualificationChangeActivationType,
  hasEmployeeQualificationEdit,
  hasEmployeeQualificationFinaleDelete,
  hasEmployeeQualificationChangeActivationType,
  hasStudentQualificationEdit,
  hasStudentQualificationFinaleDelete,
  hasStudentQualificationChangeActivationType,
  hasSupplierQualificationEdit,
  hasSupplierQualificationFinaleDelete,
  hasSupplierQualificationChangeActivationType,
  hasParentQualificationEdit,
  hasParentQualificationFinaleDelete,
  hasParentQualificationChangeActivationType,
  hasClientQualificationEdit,
  hasClientQualificationFinaleDelete,
  hasClientQualificationChangeActivationType,
} from "./../../../../utils/privilegeHelper";
import CustomCard from "./../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: [
    "userQualificationsData",
    "filterData",
    "defaultImg",
    "userTypeToken",
  ],
  methods: {
    setUserQualificationData(userQualification) {
      this.$emit("setUserQualificationData", userQualification);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
  },
  computed: {
    hasPrivilegeEdit() {
      let status = false;
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          status = checkPrivilege(hasAdminsEgyptQualificationEdit());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminQualificationEdit());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeeQualificationEdit());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentQualificationEdit());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierQualificationEdit());
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentQualificationEdit());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientQualificationEdit());
          break;
      }
      return status;
    },
    hasPrivilegeFinaleDelete() {
      let status = false;
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          status = checkPrivilege(hasAdminsEgyptQualificationFinaleDelete());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminQualificationFinaleDelete());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeeQualificationFinaleDelete());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentQualificationFinaleDelete());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierQualificationFinaleDelete());
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentQualificationFinaleDelete());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientQualificationFinaleDelete());
          break;
      }
      return status;
    },
    hasPrivilegeChangeActivationType() {
      let status = false;
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          status = checkPrivilege(
            hasAdminsEgyptQualificationChangeActivationType()
          );
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(
            hasMasterAdminQualificationChangeActivationType()
          );
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(
            hasEmployeeQualificationChangeActivationType()
          );
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(
            hasStudentQualificationChangeActivationType()
          );
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(
            hasSupplierQualificationChangeActivationType()
          );
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentQualificationChangeActivationType());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientQualificationChangeActivationType());
          break;
      }
      return status;
    },
  },
};
</script>
