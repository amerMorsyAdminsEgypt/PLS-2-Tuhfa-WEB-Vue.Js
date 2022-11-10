<template>
  <div v-if="userQualificationsData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="4">{{ $t("UserQualifications.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
          <th class="cell-lg">{{ $t("general.estimate") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(userQualification, index) in userQualificationsData"
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  userQualification.userQualificationImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(userQualification.fullCode) }}</td>
          <td>
            {{
              isDataExist(
                userQualification.qualificationData.qualificationNameCurrent
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                userQualification.classificationDegreeData
                  .classificationDegreeNameCurrent
              )
            }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setUserQualificationData(userQualification);
                    openBottomSheet('UserQualificationInfo');
                  "
                  :title="$t('info')"
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
            </FloatingMenu>
          </td>
        </tr>
      </tbody>
    </table>
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
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "UserQualificationsTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
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
