<template>
  <div v-if="userOperationsData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="4">{{ $t("UserOperations.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
          <th class="cell-lg">{{ $t("general.dateTime") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(userOperation, index) in userOperationsData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  userOperation.userOperationImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(userOperation.fullCode) }}</td>
          <td>
            {{ isDataExist(userOperation.userOperationNameCurrent) }}
          </td>
          <td>
            {{
              formateDateTimeLang(
                userOperation.operationDate,
                userOperation.operationTime
              )
            }}
          </td>

          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setUserOperationData(userOperation);
                    openBottomSheet('UserOperationInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setUserOperationData(userOperation);
                    openBottomSheet('UserOperationQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="hasPrivilegeEdit">
                <button
                  @click="
                    setUserOperationData(userOperation);
                    openBottomSheet('UserOperationUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="hasPrivilegeFinaleDelete">
                <button
                  v-b-modal.UserOperationDelete
                  :title="$t('delete')"
                  @click="setUserOperationData(userOperation)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li v-if="hasPrivilegeChangeActivationType">
                <button
                  v-b-modal.UserOperationChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setUserOperationData(userOperation)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setUserOperationData(userOperation);
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
  formateDateTimeLang,
  fullPathFileFromServer,
} from "./../../../../utils/functions";
import {
  hasAdminsEgyptOperationEdit,
  hasAdminsEgyptOperationFinaleDelete,
  hasAdminsEgyptOperationChangeActivationType,
  hasMasterAdminOperationEdit,
  hasMasterAdminOperationFinaleDelete,
  hasMasterAdminOperationChangeActivationType,
  hasEmployeeOperationEdit,
  hasEmployeeOperationFinaleDelete,
  hasEmployeeOperationChangeActivationType,
  hasStudentOperationEdit,
  hasStudentOperationFinaleDelete,
  hasStudentOperationChangeActivationType,
  hasSupplierOperationEdit,
  hasSupplierOperationFinaleDelete,
  hasSupplierOperationChangeActivationType,
  hasParentOperationEdit,
  hasParentOperationFinaleDelete,
  hasParentOperationChangeActivationType,
  hasClientOperationEdit,
  hasClientOperationFinaleDelete,
  hasClientOperationChangeActivationType,
} from "./../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "UserOperationsTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["userOperationsData", "filterData", "defaultImg", "userTypeToken"],
  methods: {
    setUserOperationData(userOperation) {
      this.$emit("setUserOperationData", userOperation);
    },
    checkPrivilege,
    isDataExist,
    formateDateTimeLang,
    fullPathFileFromServer,
  },
  computed: {
    hasPrivilegeEdit() {
      let status = false;
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          status = checkPrivilege(hasAdminsEgyptOperationEdit());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminOperationEdit());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeeOperationEdit());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentOperationEdit());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierOperationEdit());
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentOperationEdit());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientOperationEdit());
          break;
      }
      return status;
    },
    hasPrivilegeFinaleDelete() {
      let status = false;
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          status = checkPrivilege(hasAdminsEgyptOperationFinaleDelete());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminOperationFinaleDelete());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeeOperationFinaleDelete());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentOperationFinaleDelete());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierOperationFinaleDelete());
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentOperationFinaleDelete());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientOperationFinaleDelete());
          break;
      }
      return status;
    },
    hasPrivilegeChangeActivationType() {
      let status = false;
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          status = checkPrivilege(
            hasAdminsEgyptOperationChangeActivationType()
          );
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(
            hasMasterAdminOperationChangeActivationType()
          );
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeeOperationChangeActivationType());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentOperationChangeActivationType());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierOperationChangeActivationType());
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentOperationChangeActivationType());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientOperationChangeActivationType());
          break;
      }
      return status;
    },
  },
};
</script>
