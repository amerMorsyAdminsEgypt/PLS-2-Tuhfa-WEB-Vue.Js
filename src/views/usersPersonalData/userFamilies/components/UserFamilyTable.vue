<template>
  <div v-if="userFamiliesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="4">{{ $t("UserFamilies.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
          <th>{{ $t("RelativeRelationTypes.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(userFamily, index) in userFamiliesData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  userFamily.userFamilyImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(userFamily.fullCode) }}</td>
          <td>{{ isDataExist(userFamily.userFamilyNameCurrent) }}</td>
          <td>
            {{
              isDataExist(
                userFamily.relativeRelationTypeData
                  .relativeRelationTypeNameCurrent
              )
            }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setUserFamilyData(userFamily);
                    openBottomSheet('UserFamilyInfo');
                  "
                  :title="$t('info')"
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
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "UserFamiliesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
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
