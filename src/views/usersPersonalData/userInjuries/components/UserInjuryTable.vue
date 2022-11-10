<template>
  <div v-if="userInjuriesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="4">{{ $t("UserInjuries.data") }}</th>
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
        <tr v-for="(userInjury, index) in userInjuriesData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  userInjury.userInjuryImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(userInjury.fullCode) }}</td>
          <td>
            {{ isDataExist(userInjury.userInjuryNameCurrent) }}
          </td>
          <td>
            {{
              formateDateTimeLang(userInjury.injuryDate, userInjury.injuryTime)
            }}
          </td>

          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setUserInjuryData(userInjury);
                    openBottomSheet('UserInjuryInfo');
                  "
                  :title="$t('info')"
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
  formateDateTimeLang,
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
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "UserInjuriesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["userInjuriesData", "filterData", "defaultImg", "userTypeToken"],
  methods: {
    setUserInjuryData(userInjury) {
      this.$emit("setUserInjuryData", userInjury);
    },
    checkPrivilege,
    formateDateTimeLang,
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
