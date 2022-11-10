<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(userFamily, index) in userFamiliesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="userFamily.userFamilyNameCurrent"
      :description="userFamily.fullCode"
      :imagePath="userFamily.userFamilyImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setUserFamilyData(userFamily);
            openBottomSheet('UserFamilyInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setUserFamilyData(userFamily);
            openBottomSheet('UserFamilyQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="hasPrivilegeFinaleDelete">
        <button
          v-b-modal.UserFamilyDelete
          :title="$t('delete')"
          @click="setUserFamilyData(userFamily)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="hasPrivilegeChangeActivationType">
        <button
          v-b-modal.UserFamilyChangeActivationType
          :title="$t('changeActivationType')"
          @click="setUserFamilyData(userFamily)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setUserFamilyData(userFamily);
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
  hasAdminsEgyptFamilyFinaleDelete,
  hasAdminsEgyptFamilyChangeActivationType,
  hasMasterAdminFamilyFinaleDelete,
  hasMasterAdminFamilyChangeActivationType,
  hasEmployeeFamilyFinaleDelete,
  hasEmployeeFamilyChangeActivationType,
  hasStudentFamilyFinaleDelete,
  hasStudentFamilyChangeActivationType,
  hasSupplierFamilyFinaleDelete,
  hasSupplierFamilyChangeActivationType,
  hasClientFamilyFinaleDelete,
  hasClientFamilyChangeActivationType,
} from "./../../../../utils/privilegeHelper";
import CustomCard from "./../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["userFamiliesData", "filterData", "defaultImg", "userTypeToken"],
  methods: {
    setUserFamilyData(userFamily) {
      this.$emit("setUserFamilyData", userFamily);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
  },
  computed: {
    hasPrivilegeFinaleDelete() {
      let status = false;
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          status = checkPrivilege(hasAdminsEgyptFamilyFinaleDelete());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminFamilyFinaleDelete());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeeFamilyFinaleDelete());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentFamilyFinaleDelete());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierFamilyFinaleDelete());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientFamilyFinaleDelete());
          break;
      }
      return status;
    },
    hasPrivilegeChangeActivationType() {
      let status = false;
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          status = checkPrivilege(hasAdminsEgyptFamilyChangeActivationType());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminFamilyChangeActivationType());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeeFamilyChangeActivationType());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentFamilyChangeActivationType());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierFamilyChangeActivationType());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientFamilyChangeActivationType());
          break;
      }
      return status;
    },
  },
};
</script>
