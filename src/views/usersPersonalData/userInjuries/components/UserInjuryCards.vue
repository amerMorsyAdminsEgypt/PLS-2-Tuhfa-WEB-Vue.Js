<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(userInjury, index) in userInjuriesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="userInjury.userInjuryNameCurrent"
      :description="userInjury.fullCode"
      :imagePath="userInjury.userInjuryImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setUserInjuryData(userInjury);
            openBottomSheet('UserInjuryInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setUserInjuryData(userInjury);
            openBottomSheet('UserInjuryQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="hasPrivilegeEdit">
        <button
          @click="
            setUserInjuryData(userInjury);
            openBottomSheet('UserInjuryUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="hasPrivilegeFinaleDelete">
        <button
          v-b-modal.UserInjuryDelete
          :title="$t('delete')"
          @click="setUserInjuryData(userInjury)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="hasPrivilegeChangeActivationType">
        <button
          v-b-modal.UserInjuryChangeActivationType
          :title="$t('changeActivationType')"
          @click="setUserInjuryData(userInjury)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setUserInjuryData(userInjury);
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
  hasAdminsEgyptInjuryEdit,
  hasAdminsEgyptInjuryFinaleDelete,
  hasAdminsEgyptInjuryChangeActivationType,
  hasMasterAdminInjuryEdit,
  hasMasterAdminInjuryFinaleDelete,
  hasMasterAdminInjuryChangeActivationType,
  hasEmployeeInjuryEdit,
  hasEmployeeInjuryFinaleDelete,
  hasEmployeeInjuryChangeActivationType,
  hasStudentInjuryEdit,
  hasStudentInjuryFinaleDelete,
  hasStudentInjuryChangeActivationType,
  hasSupplierInjuryEdit,
  hasSupplierInjuryFinaleDelete,
  hasSupplierInjuryChangeActivationType,
  hasParentInjuryEdit,
  hasParentInjuryFinaleDelete,
  hasParentInjuryChangeActivationType,
  hasClientInjuryEdit,
  hasClientInjuryFinaleDelete,
  hasClientInjuryChangeActivationType,
} from "./../../../../utils/privilegeHelper";
import CustomCard from "./../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["userInjuriesData", "filterData", "defaultImg", "userTypeToken"],
  methods: {
    setUserInjuryData(userInjury) {
      this.$emit("setUserInjuryData", userInjury);
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
          status = checkPrivilege(hasAdminsEgyptInjuryEdit());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminInjuryEdit());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeeInjuryEdit());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentInjuryEdit());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierInjuryEdit());
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentInjuryEdit());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientInjuryEdit());
          break;
      }
      return status;
    },
    hasPrivilegeFinaleDelete() {
      let status = false;
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          status = checkPrivilege(hasAdminsEgyptInjuryFinaleDelete());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminInjuryFinaleDelete());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeeInjuryFinaleDelete());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentInjuryFinaleDelete());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierInjuryFinaleDelete());
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentInjuryFinaleDelete());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientInjuryFinaleDelete());
          break;
      }
      return status;
    },
    hasPrivilegeChangeActivationType() {
      let status = false;
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          status = checkPrivilege(hasAdminsEgyptInjuryChangeActivationType());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminInjuryChangeActivationType());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeeInjuryChangeActivationType());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentInjuryChangeActivationType());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierInjuryChangeActivationType());
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentInjuryChangeActivationType());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientInjuryChangeActivationType());
          break;
      }
      return status;
    },
  },
};
</script>
