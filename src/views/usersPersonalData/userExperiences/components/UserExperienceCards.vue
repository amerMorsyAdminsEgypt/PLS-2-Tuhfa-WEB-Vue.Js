<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(userExperience, index) in userExperiencesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="userExperience.userExperienceNameCurrent"
      :description="userExperience.fullCode"
      :imagePath="userExperience.userExperienceImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setUserExperienceData(userExperience);
            openBottomSheet('UserExperienceInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setUserExperienceData(userExperience);
            openBottomSheet('UserExperienceQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="hasPrivilegeEdit">
        <button
          @click="
            setUserExperienceData(userExperience);
            openBottomSheet('UserExperienceUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="hasPrivilegeFinaleDelete">
        <button
          v-b-modal.UserExperienceDelete
          :title="$t('delete')"
          @click="setUserExperienceData(userExperience)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="hasPrivilegeChangeActivationType">
        <button
          v-b-modal.UserExperienceChangeActivationType
          :title="$t('changeActivationType')"
          @click="setUserExperienceData(userExperience)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setUserExperienceData(userExperience);
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
  hasAdminsEgyptExperienceEdit,
  hasAdminsEgyptExperienceFinaleDelete,
  hasAdminsEgyptExperienceChangeActivationType,
  hasMasterAdminExperienceEdit,
  hasMasterAdminExperienceFinaleDelete,
  hasMasterAdminExperienceChangeActivationType,
  hasEmployeeExperienceEdit,
  hasEmployeeExperienceFinaleDelete,
  hasEmployeeExperienceChangeActivationType,
  hasStudentExperienceEdit,
  hasStudentExperienceFinaleDelete,
  hasStudentExperienceChangeActivationType,
  hasSupplierExperienceEdit,
  hasSupplierExperienceFinaleDelete,
  hasSupplierExperienceChangeActivationType,
  hasParentExperienceEdit,
  hasParentExperienceFinaleDelete,
  hasParentExperienceChangeActivationType,
  hasClientExperienceEdit,
  hasClientExperienceFinaleDelete,
  hasClientExperienceChangeActivationType,
} from "./../../../../utils/privilegeHelper";
import CustomCard from "./../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["userExperiencesData", "filterData", "defaultImg", "userTypeToken"],
  methods: {
    setUserExperienceData(userExperience) {
      this.$emit("setUserExperienceData", userExperience);
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
          status = checkPrivilege(hasAdminsEgyptExperienceEdit());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminExperienceEdit());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeeExperienceEdit());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentExperienceEdit());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierExperienceEdit());
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentExperienceEdit());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientExperienceEdit());
          break;
      }
      return status;
    },
    hasPrivilegeFinaleDelete() {
      let status = false;
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          status = checkPrivilege(hasAdminsEgyptExperienceFinaleDelete());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminExperienceFinaleDelete());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeeExperienceFinaleDelete());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentExperienceFinaleDelete());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierExperienceFinaleDelete());
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentExperienceFinaleDelete());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientExperienceFinaleDelete());
          break;
      }
      return status;
    },
    hasPrivilegeChangeActivationType() {
      let status = false;
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          status = checkPrivilege(
            hasAdminsEgyptExperienceChangeActivationType()
          );
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(
            hasMasterAdminExperienceChangeActivationType()
          );
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeeExperienceChangeActivationType());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentExperienceChangeActivationType());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierExperienceChangeActivationType());
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentExperienceChangeActivationType());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientExperienceChangeActivationType());
          break;
      }
      return status;
    },
  },
};
</script>
