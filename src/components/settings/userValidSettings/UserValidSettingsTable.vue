<template>
  <div v-if="userValidSettingsData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("UserValidSettings.data") }}</th>
          <th rowspan="2">{{ $t("Users.type") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(userValidSetting, index) in userValidSettingsData"
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  userValidSetting.userValidSettingImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(userValidSetting.fullCode) }}</td>
          <td>
            {{ isDataExist(userValidSetting.userValidSettingNameCurrent) }}
          </td>
          <td>
            {{ isDataExist(userValidSetting.userTypeNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setUserValidSettingData(userValidSetting);
                    openBottomSheet('UserValidSettingInfo');
                  "
                  :title="$t('info')"
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
import FloatingMenu from "./../../general/FloatingMenu.vue";
import generalMixin from "./../../../utils/generalMixin";

export default {
  name: "UserValidSettingsTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
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
