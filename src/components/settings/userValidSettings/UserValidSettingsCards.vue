<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(userValidSetting, index) in userValidSettingsData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="userValidSetting.userValidSettingNameCurrent"
      :description="userValidSetting.fullCode"
      :imagePath="userValidSetting.userValidSettingImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setUserValidSettingData(userValidSetting);
            openBottomSheet('UserValidSettingInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setUserValidSettingData(userValidSetting);
            openBottomSheet('UserValidSettingQRCode');
          "
          :title="$t('UserValidSettings.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="hasPrivilegeEdit">
        <button
          @click="
            setUserValidSettingData(userValidSetting);
            openBottomSheet('UserValidSettingUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="hasPrivilegeFinaleDelete">
        <button
          v-b-modal.UserValidSettingDelete
          :title="$t('delete')"
          @click="setUserValidSettingData(userValidSetting)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="hasPrivilegeChangeActivationType">
        <button
          v-b-modal.UserValidSettingChangeActivationType
          :title="$t('changeActivationType')"
          @click="setUserValidSettingData(userValidSetting)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setUserValidSettingData(userValidSetting);
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
} from "./../../../utils/functions";
import {
  hasAdminsEgyptValidSettingEdit,
  hasMasterAdminValidSettingEdit,
  hasEmployeeValidSettingEdit,
  hasStudentValidSettingEdit,
  hasSupplierValidSettingEdit,
  hasParentValidSettingEdit,
  hasClientValidSettingEdit,
  hasAdminsEgyptValidSettingFinaleDelete,
  hasMasterAdminValidSettingFinaleDelete,
  hasEmployeeValidSettingFinaleDelete,
  hasStudentValidSettingFinaleDelete,
  hasSupplierValidSettingFinaleDelete,
  hasParentValidSettingFinaleDelete,
  hasClientValidSettingFinaleDelete,
  hasAdminsEgyptValidSettingChangeActivationType,
  hasMasterAdminValidSettingChangeActivationType,
  hasEmployeeValidSettingChangeActivationType,
  hasStudentValidSettingChangeActivationType,
  hasSupplierValidSettingChangeActivationType,
  hasParentValidSettingChangeActivationType,
  hasClientValidSettingChangeActivationType,
} from "./../../../utils/privilegeHelper";
import CustomCard from "./../../general/CustomCard.vue";
import generalMixin from "./../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["userValidSettingsData", "filterData", "defaultImg", "modelName"],
  methods: {
    setUserValidSettingData(userValidSetting) {
      this.$emit("setUserValidSettingData", userValidSetting);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
  },
  computed: {
    hasPrivilegeEdit() {
      let status = false;
      switch (this.modelName) {
        case "adminsEgyptValidSetting":
          status = checkPrivilege(hasAdminsEgyptValidSettingEdit());
          break;
        case "masterAdminValidSetting":
          status = checkPrivilege(hasMasterAdminValidSettingEdit());
          break;
        case "employeeValidSetting":
          status = checkPrivilege(hasEmployeeValidSettingEdit());
          break;
        case "studentValidSetting":
          status = checkPrivilege(hasStudentValidSettingEdit());
          break;
        case "supplierValidSetting":
          status = checkPrivilege(hasSupplierValidSettingEdit());
          break;
        case "parentValidSetting":
          status = checkPrivilege(hasParentValidSettingEdit());
          break;
        case "clientValidSetting":
          status = checkPrivilege(hasClientValidSettingEdit());
          break;
      }
      return status;
    },
    hasPrivilegeFinaleDelete() {
      let status = false;
      switch (this.modelName) {
        case "adminsEgyptValidSetting":
          status = checkPrivilege(hasAdminsEgyptValidSettingFinaleDelete());
          break;
        case "masterAdminValidSetting":
          status = checkPrivilege(hasMasterAdminValidSettingFinaleDelete());
          break;
        case "employeeValidSetting":
          status = checkPrivilege(hasEmployeeValidSettingFinaleDelete());
          break;
        case "studentValidSetting":
          status = checkPrivilege(hasStudentValidSettingFinaleDelete());
          break;
        case "supplierValidSetting":
          status = checkPrivilege(hasSupplierValidSettingFinaleDelete());
          break;
        case "parentValidSetting":
          status = checkPrivilege(hasParentValidSettingFinaleDelete());
          break;
        case "clientValidSetting":
          status = checkPrivilege(hasClientValidSettingFinaleDelete());
          break;
      }
      return status;
    },
    hasPrivilegeChangeActivationType() {
      let status = false;
      switch (this.modelName) {
        case "adminsEgyptValidSetting":
          status = checkPrivilege(
            hasAdminsEgyptValidSettingChangeActivationType()
          );
          break;
        case "masterAdminValidSetting":
          status = checkPrivilege(
            hasMasterAdminValidSettingChangeActivationType()
          );
          break;
        case "employeeValidSetting":
          status = checkPrivilege(
            hasEmployeeValidSettingChangeActivationType()
          );
          break;
        case "studentValidSetting":
          status = checkPrivilege(hasStudentValidSettingChangeActivationType());
          break;
        case "supplierValidSetting":
          status = checkPrivilege(
            hasSupplierValidSettingChangeActivationType()
          );
          break;
        case "parentValidSetting":
          status = checkPrivilege(hasParentValidSettingChangeActivationType());
          break;
        case "clientValidSetting":
          status = checkPrivilege(hasClientValidSettingChangeActivationType());
          break;
      }
      return status;
    },
  },
};
</script>
