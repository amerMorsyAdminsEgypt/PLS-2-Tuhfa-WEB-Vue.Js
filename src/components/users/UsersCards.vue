<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(user, index) in usersData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="user.userNameCurrent"
      :description="user.fullCode"
      :imagePath="user.userImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li v-if="checkPrivilege(hasPlaceUser())">
        <router-link
          :to="{
            name: 'PlaceUser',
            params: {
              placeTypeToken: ' ',
              placeToken: ' ',
              placeModelName: ' ',
              userTypeToken: user.userTypeToken,
              userToken: user.userToken,
              userModelName: modelName,
            },
          }"
          :title="$t('PlaceUsers.modelName')"
        >
          <img src="@/assets/images/placeUsers.svg" />
        </router-link>
      </li>
      <li
        v-if="
          modelName == 'students' &&
          checkPrivilege(hasStudentScheduleExamTimeReport())
        "
      >
        <button
          @click="
            setUserData(user);
            openBottomSheet('StudentScheduleExamTimesReportFilter');
          "
          :title="$t('Reports.studentScheduleExamTimesReport')"
        >
          <img src="@/assets/images/GroupScheduleExams.svg" />
        </button>
      </li>
      <li
        v-if="
          modelName == 'students' && checkPrivilege(hasStudentCardIdReport())
        "
      >
        <button
          @click="
            setUserData(user);
            openBottomSheet('StudentCardIdsReportFilter');
          "
          :title="$t('Reports.studentCardIdsReport')"
        >
          <img src="@/assets/images/cards.svg" />
        </button>
      </li>
      <li
        v-if="
          modelName == 'employees' &&
          checkPrivilege(hasEducationalScheduleTimeReport())
        "
      >
        <button
          @click="
            setUserData(user);
            openBottomSheet('EducationalScheduleTimeEmployeeReportFilter');
          "
          :title="$t('Reports.educationalScheduleTimeEmployeeReport')"
        >
          <img src="@/assets/images/reports.svg" />
        </button>
      </li>
      <li
        v-if="
          modelName == 'students' &&
          checkPrivilege(hasEducationalScheduleTimeReport())
        "
      >
        <button
          @click="
            setUserData(user);
            openBottomSheet('EducationalScheduleTimeStudentReportFilter');
          "
          :title="$t('Reports.educationalScheduleTimeStudentReport')"
        >
          <img src="@/assets/images/reports.svg" />
        </button>
      </li>
      <li>
        <button
          @click="setUserData(user)"
          v-b-modal.UserChangePassword
          :title="$t('changePassword')"
        >
          <img src="@/assets/images/changePassword.svg" />
        </button>
      </li>
      <li v-if="hasResetCode">
        <button
          @click="
            setUserTokenReset(user.userToken);
            setIsResetTypeLoginCode(true);
          "
          v-b-modal.UserLoginCodeReset
          :title="$t('UserLoginCodes.resetCode')"
        >
          <img src="@/assets/images/UserLoginCodes.svg" />
        </button>
      </li>
      <li v-if="hasResetDevice">
        <button
          @click="
            setUserTokenReset(user.userToken);
            setIsResetTypeLoginCode(false);
          "
          v-b-modal.UserLoginCodeReset
          :title="$t('UserLoginCodes.resetDevice')"
        >
          <img src="@/assets/images/pc.svg" />
        </button>
      </li>

      <li>
        <button
          @click="goToUserProfileTabs(user)"
          :title="$t('UsersPersonalData.modelName')"
        >
          <img src="@/assets/images/UsersPersonalData.svg" />
        </button>
      </li>
      <li v-if="hasStorageSpace">
        <router-link
          :to="{
            name: storageSpacesRoute,
            params: {
              mainToken: user.userToken,
            },
          }"
          :title="$t('StorageSpaces.modelName')"
        >
          <img src="@/assets/images/StorageSpaces.svg" />
        </router-link>
      </li>
      <li>
        <button
          @click="updateAndGetUserFinanceStatistic(user.userToken)"
          :title="$t('FinanceStatistic.modelName')"
        >
          <img src="@/assets/images/FinanceStatistic.svg" />
        </button>
      </li>
      <li>
        <button
          :title="$t('info')"
          @click="
            setUserData(user);
            openBottomSheet('UserInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setUserData(user);
            openBottomSheet('UserQRCode');
          "
          :title="$t('QR.modelName')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasPrivilegeEdit)">
        <button
          @click="
            setUserData(user);
            openBottomSheet('UserUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasPrivilegeFinaleDelete)">
        <button
          v-b-modal.UserDelete
          :title="$t('delete')"
          @click="setUserData(user)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasPrivilegeChangeActivationType)">
        <button
          v-b-modal.UserChangeActivationType
          :title="$t('changeActivationType')"
          @click="setUserData(user)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setUserData(user);
            openBottomSheet('ActionsData');
          "
          :title="$t('actionsData.modelName')"
        >
          <img src="@/assets/images/actions-data.svg" />
        </button>
      </li>
      <li
        v-if="
          modelName == 'students' &&
          checkPrivilege(hasEducationalJoiningApplication())
        "
      >
        <router-link
          :to="{
            name: 'EducationalJoiningApplications',
            params: {
              userStudentToken: user.userToken,
            },
          }"
          :title="$t('EducationalJoiningApplications.modelName')"
        >
          <img src="@/assets/images/EducationalJoiningApplications.svg" />
        </router-link>
      </li>
    </CustomCard>
  </div>
</template>

<script>
import {
  checkPrivilege,
  isDataExist,
  fullPathFileFromServer,
} from "./../../utils/functions";
import {
  hasStudentScheduleExamTimeReport,
  hasStudentCardIdReport,
  hasPlaceUser,
  hasEducationalScheduleTimeReport,
  hasAdminsEgyptEdit,
  hasAdminsEgyptFinaleDelete,
  hasAdminsEgyptChangeActivationType,
  hasMasterAdminEdit,
  hasMasterAdminFinaleDelete,
  hasMasterAdminChangeActivationType,
  hasEmployeeEdit,
  hasEmployeeFinaleDelete,
  hasEmployeeChangeActivationType,
  hasStudentEdit,
  hasStudentFinaleDelete,
  hasStudentChangeActivationType,
  hasSupplierEdit,
  hasSupplierFinaleDelete,
  hasSupplierChangeActivationType,
  hasParentEdit,
  hasParentFinaleDelete,
  hasParentChangeActivationType,
  hasClientEdit,
  hasClientFinaleDelete,
  hasClientChangeActivationType,
  hasStorageSpaceAdminsEgypt,
  hasStorageSpaceMasterAdmin,
  hasStorageSpaceEmployee,
  hasStorageSpaceStudent,
  hasStorageSpaceSupplier,
  hasStorageSpaceParent,
  hasStorageSpaceClient,
  hasEducationalJoiningApplication,
  hasAdminsEgyptLoginCodeResetCode,
  hasAdminsEgyptLoginCodeResetDevice,
  hasMasterAdminLoginCodeResetCode,
  hasMasterAdminLoginCodeResetDevice,
  hasEmployeeLoginCodeResetCode,
  hasEmployeeLoginCodeResetDevice,
  hasStudentLoginCodeResetCode,
  hasStudentLoginCodeResetDevice,
  hasSupplierLoginCodeResetCode,
  hasSupplierLoginCodeResetDevice,
  hasParentLoginCodeResetCode,
  hasParentLoginCodeResetDevice,
  hasClientLoginCodeResetCode,
  hasClientLoginCodeResetDevice,
} from "./../../utils/privilegeHelper";
import CustomCard from "./../general/CustomCard.vue";
import generalMixin from "./../../utils/generalMixin";
import { USER_TYPE } from "./../../utils/constantLists";
import {
  hasAdminsEgyptFamily,
  hasMasterAdminFamily,
  hasEmployeeFamily,
  hasStudentFamily,
  hasSupplierFamily,
  hasClientFamily,
  hasAdminsEgyptQualification,
  hasMasterAdminQualification,
  hasEmployeeQualification,
  hasStudentQualification,
  hasSupplierQualification,
  hasParentQualification,
  hasClientQualification,
  hasAdminsEgyptPersonalCard,
  hasMasterAdminPersonalCard,
  hasEmployeePersonalCard,
  hasStudentPersonalCard,
  hasSupplierPersonalCard,
  hasParentPersonalCard,
  hasClientPersonalCard,
  hasAdminsEgyptTrainingCourse,
  hasMasterAdminTrainingCourse,
  hasEmployeeTrainingCourse,
  hasStudentTrainingCourse,
  hasSupplierTrainingCourse,
  hasParentTrainingCourse,
  hasClientTrainingCourse,
  hasAdminsEgyptExperience,
  hasMasterAdminExperience,
  hasEmployeeExperience,
  hasStudentExperience,
  hasSupplierExperience,
  hasParentExperience,
  hasClientExperience,
  hasAdminsEgyptScientificDegree,
  hasMasterAdminScientificDegree,
  hasEmployeeScientificDegree,
  hasStudentScientificDegree,
  hasSupplierScientificDegree,
  hasParentScientificDegree,
  hasClientScientificDegree,
} from "./../../utils/privilegeHelper";

export default {
  name: "UsersCards",
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["usersData", "filterData", "defaultImg", "modelName"],
  data() {
    return {
      storageSpacesRoute: this.$route.meta.StorageSpacesRoute,
      userTypeToken: "",
    };
  },
  methods: {
    async updateAndGetUserFinanceStatistic(userToken) {
      this.$emit("updateAndGetUserFinanceStatistic", userToken);
    },
    setUserTokenReset(token) {
      this.$emit("setUserTokenReset", token);
    },
    setUserData(user) {
      this.$emit("setUserData", user);
    },
    goToUserProfileTabs(user) {
      this.userTypeToken = user.userTypeToken;
      let routeName = "";

      if (this.hasUserFamily()) {
        routeName = "UserFamilies";
      } else if (this.hasUserQualification()) {
        routeName = "UserQualifications";
      } else if (this.hasUserPersonalCard()) {
        routeName = "UserPersonalCards";
      } else if (this.hasUserTrainingCourse()) {
        routeName = "UserTrainingCourses";
      } else if (this.hasUserExperience()) {
        routeName = "UserExperiences";
      } else if (this.hasUserScientificDegree()) {
        routeName = "UserScientificDegrees";
      }

      this.$router
        .push({
          name: routeName,
          params: {
            userTypeToken: user.userTypeToken,
            userToken: user.userToken,
          },
        })
        .catch(() => {});
    },
    hasUserFamily() {
      let status = false;
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          status = checkPrivilege(hasAdminsEgyptFamily());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminFamily());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeeFamily());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentFamily());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierFamily());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientFamily());
          break;
      }
      return status;
    },
    hasUserQualification() {
      let status = false;
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          status = checkPrivilege(hasAdminsEgyptQualification());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminQualification());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeeQualification());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentQualification());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierQualification());
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentQualification());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientQualification());
          break;
      }
      return status;
    },
    hasUserPersonalCard() {
      let status = false;
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          status = checkPrivilege(hasAdminsEgyptPersonalCard());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminPersonalCard());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeePersonalCard());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentPersonalCard());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierPersonalCard());
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentPersonalCard());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientPersonalCard());
          break;
      }
      return status;
    },
    hasUserTrainingCourse() {
      let status = false;
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          status = checkPrivilege(hasAdminsEgyptTrainingCourse());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminTrainingCourse());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeeTrainingCourse());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentTrainingCourse());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierTrainingCourse());
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentTrainingCourse());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientTrainingCourse());
          break;
      }
      return status;
    },
    hasUserExperience() {
      let status = false;
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          status = checkPrivilege(hasAdminsEgyptExperience());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminExperience());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeeExperience());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentExperience());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierExperience());
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentExperience());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientExperience());
          break;
      }
      return status;
    },
    hasUserScientificDegree() {
      let status = false;
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          status = checkPrivilege(hasAdminsEgyptScientificDegree());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminScientificDegree());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeeScientificDegree());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentScientificDegree());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierScientificDegree());
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentScientificDegree());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientScientificDegree());
          break;
      }
      return status;
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasStudentScheduleExamTimeReport,
    hasStudentCardIdReport,
    hasPlaceUser,
    hasEducationalScheduleTimeReport,
    hasAdminsEgyptEdit,
    hasAdminsEgyptFinaleDelete,
    hasAdminsEgyptChangeActivationType,
    hasMasterAdminEdit,
    hasMasterAdminFinaleDelete,
    hasMasterAdminChangeActivationType,
    hasEmployeeEdit,
    hasEmployeeFinaleDelete,
    hasEmployeeChangeActivationType,
    hasStudentEdit,
    hasStudentFinaleDelete,
    hasStudentChangeActivationType,
    hasSupplierEdit,
    hasSupplierFinaleDelete,
    hasSupplierChangeActivationType,
    hasParentEdit,
    hasParentFinaleDelete,
    hasParentChangeActivationType,
    hasClientEdit,
    hasClientFinaleDelete,
    hasClientChangeActivationType,
    hasEducationalJoiningApplication,
  },
  computed: {
    hasPrivilegeEdit() {
      let status = false;
      switch (this.modelName) {
        case "adminsEgypt":
          status = checkPrivilege(this.hasAdminsEgyptEdit());
          break;
        case "masterAdmins":
          status = checkPrivilege(this.hasMasterAdminEdit());
          break;
        case "employees":
          status = checkPrivilege(this.hasEmployeeEdit());
          break;
        case "students":
          status = checkPrivilege(this.hasStudentEdit());
          break;
        case "suppliers":
          status = checkPrivilege(this.hasSupplierEdit());
          break;
        case "parents":
          status = checkPrivilege(this.hasParentEdit());
          break;
        case "clients":
          status = checkPrivilege(this.hasClientEdit());
          break;
      }
      return status;
    },
    hasPrivilegeFinaleDelete() {
      let status = false;
      switch (this.modelName) {
        case "adminsEgypt":
          status = checkPrivilege(this.hasAdminsEgyptFinaleDelete());
          break;
        case "masterAdmins":
          status = checkPrivilege(this.hasMasterAdminFinaleDelete());
          break;
        case "employees":
          status = checkPrivilege(this.hasEmployeeFinaleDelete());
          break;
        case "students":
          status = checkPrivilege(this.hasStudentFinaleDelete());
          break;
        case "suppliers":
          status = checkPrivilege(this.hasSupplierFinaleDelete());
          break;
        case "parents":
          status = checkPrivilege(this.hasParentFinaleDelete());
          break;
        case "clients":
          status = checkPrivilege(this.hasClientFinaleDelete());
          break;
      }
      return status;
    },
    hasPrivilegeChangeActivationType() {
      let status = false;
      switch (this.modelName) {
        case "adminsEgypt":
          status = checkPrivilege(this.hasAdminsEgyptChangeActivationType());
          break;
        case "masterAdmins":
          status = checkPrivilege(this.hasMasterAdminChangeActivationType());
          break;
        case "employees":
          status = checkPrivilege(this.hasEmployeeChangeActivationType());
          break;
        case "students":
          status = checkPrivilege(this.hasStudentChangeActivationType());
          break;
        case "suppliers":
          status = checkPrivilege(this.hasSupplierChangeActivationType());
          break;
        case "parents":
          status = checkPrivilege(this.hasParentChangeActivationType());
          break;
        case "clients":
          status = checkPrivilege(this.hasClientChangeActivationType());
          break;
      }
      return status;
    },
    hasStorageSpace() {
      let status = false;
      switch (this.modelName) {
        case "adminsEgypt":
          status = checkPrivilege(hasStorageSpaceAdminsEgypt());
          break;
        case "masterAdmins":
          status = checkPrivilege(hasStorageSpaceMasterAdmin());
          break;
        case "employees":
          status = checkPrivilege(hasStorageSpaceEmployee());
          break;
        case "students":
          status = checkPrivilege(hasStorageSpaceStudent());
          break;
        case "suppliers":
          status = checkPrivilege(hasStorageSpaceSupplier());
          break;
        case "parents":
          status = checkPrivilege(hasStorageSpaceParent());
          break;
        case "clients":
          status = checkPrivilege(hasStorageSpaceClient());
          break;
      }
      return status;
    },
    hasResetCode() {
      let status = false;
      switch (this.modelName) {
        case "adminsEgypt":
          status = checkPrivilege(hasAdminsEgyptLoginCodeResetCode());
          break;
        case "masterAdmins":
          status = checkPrivilege(hasMasterAdminLoginCodeResetCode());
          break;
        case "employees":
          status = checkPrivilege(hasEmployeeLoginCodeResetCode());
          break;
        case "students":
          status = checkPrivilege(hasStudentLoginCodeResetCode());
          break;
        case "suppliers":
          status = checkPrivilege(hasSupplierLoginCodeResetCode());
          break;
        case "parents":
          status = checkPrivilege(hasParentLoginCodeResetCode());
          break;
        case "clients":
          status = checkPrivilege(hasClientLoginCodeResetCode());
          break;
      }
      return status;
    },
    hasResetDevice() {
      let status = false;
      switch (this.modelName) {
        case "adminsEgypt":
          status = checkPrivilege(hasAdminsEgyptLoginCodeResetDevice());
          break;
        case "masterAdmins":
          status = checkPrivilege(hasMasterAdminLoginCodeResetDevice());
          break;
        case "employees":
          status = checkPrivilege(hasEmployeeLoginCodeResetDevice());
          break;
        case "students":
          status = checkPrivilege(hasStudentLoginCodeResetDevice());
          break;
        case "suppliers":
          status = checkPrivilege(hasSupplierLoginCodeResetDevice());
          break;
        case "parents":
          status = checkPrivilege(hasParentLoginCodeResetDevice());
          break;
        case "clients":
          status = checkPrivilege(hasClientLoginCodeResetDevice());
          break;
      }
      return status;
    },
  },
};
</script>
