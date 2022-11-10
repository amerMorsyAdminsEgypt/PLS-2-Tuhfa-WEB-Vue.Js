<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(userScientificDegree, index) in userScientificDegreesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="userScientificDegree.userScientificDegreeNameCurrent"
      :description="userScientificDegree.fullCode"
      :imagePath="userScientificDegree.userScientificDegreeImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setUserScientificDegreeData(userScientificDegree);
            openBottomSheet('UserScientificDegreeInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setUserScientificDegreeData(userScientificDegree);
            openBottomSheet('UserScientificDegreeQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="hasPrivilegeEdit">
        <button
          @click="
            setUserScientificDegreeData(userScientificDegree);
            openBottomSheet('UserScientificDegreeUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="hasPrivilegeFinaleDelete">
        <button
          v-b-modal.UserScientificDegreeDelete
          :title="$t('delete')"
          @click="setUserScientificDegreeData(userScientificDegree)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="hasPrivilegeChangeActivationType">
        <button
          v-b-modal.UserScientificDegreeChangeActivationType
          :title="$t('changeActivationType')"
          @click="setUserScientificDegreeData(userScientificDegree)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setUserScientificDegreeData(userScientificDegree);
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
  hasAdminsEgyptScientificDegreeEdit,
  hasAdminsEgyptScientificDegreeFinaleDelete,
  hasAdminsEgyptScientificDegreeChangeActivationType,
  hasMasterAdminScientificDegreeEdit,
  hasMasterAdminScientificDegreeFinaleDelete,
  hasMasterAdminScientificDegreeChangeActivationType,
  hasEmployeeScientificDegreeEdit,
  hasEmployeeScientificDegreeFinaleDelete,
  hasEmployeeScientificDegreeChangeActivationType,
  hasStudentScientificDegreeEdit,
  hasStudentScientificDegreeFinaleDelete,
  hasStudentScientificDegreeChangeActivationType,
  hasSupplierScientificDegreeEdit,
  hasSupplierScientificDegreeFinaleDelete,
  hasSupplierScientificDegreeChangeActivationType,
  hasParentScientificDegreeEdit,
  hasParentScientificDegreeFinaleDelete,
  hasParentScientificDegreeChangeActivationType,
  hasClientScientificDegreeEdit,
  hasClientScientificDegreeFinaleDelete,
  hasClientScientificDegreeChangeActivationType,
} from "./../../../../utils/privilegeHelper";
import CustomCard from "./../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: [
    "userScientificDegreesData",
    "filterData",
    "defaultImg",
    "userTypeToken",
  ],
  methods: {
    setUserScientificDegreeData(userScientificDegree) {
      this.$emit("setUserScientificDegreeData", userScientificDegree);
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
          status = checkPrivilege(hasAdminsEgyptScientificDegreeEdit());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminScientificDegreeEdit());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeeScientificDegreeEdit());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentScientificDegreeEdit());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierScientificDegreeEdit());
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentScientificDegreeEdit());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientScientificDegreeEdit());
          break;
      }
      return status;
    },
    hasPrivilegeFinaleDelete() {
      let status = false;
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          status = checkPrivilege(hasAdminsEgyptScientificDegreeFinaleDelete());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminScientificDegreeFinaleDelete());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeeScientificDegreeFinaleDelete());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentScientificDegreeFinaleDelete());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierScientificDegreeFinaleDelete());
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentScientificDegreeFinaleDelete());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientScientificDegreeFinaleDelete());
          break;
      }
      return status;
    },
    hasPrivilegeChangeActivationType() {
      let status = false;
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          status = checkPrivilege(
            hasAdminsEgyptScientificDegreeChangeActivationType()
          );
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(
            hasMasterAdminScientificDegreeChangeActivationType()
          );
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(
            hasEmployeeScientificDegreeChangeActivationType()
          );
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(
            hasStudentScientificDegreeChangeActivationType()
          );
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(
            hasSupplierScientificDegreeChangeActivationType()
          );
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(
            hasParentScientificDegreeChangeActivationType()
          );
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(
            hasClientScientificDegreeChangeActivationType()
          );
          break;
      }
      return status;
    },
  },
};
</script>
