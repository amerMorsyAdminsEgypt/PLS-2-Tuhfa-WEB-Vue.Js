<template>
  <div v-if="userTrainingCoursesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="4">{{ $t("UserTrainingCourses.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
          <th class="cell-lg">{{ $t("Certificates.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(userTrainingCourse, index) in userTrainingCoursesData"
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  userTrainingCourse.userTrainingCourseImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(userTrainingCourse.fullCode) }}</td>
          <td>
            {{ isDataExist(userTrainingCourse.userTrainingCourseNameCurrent) }}
          </td>
          <td>
            {{
              isDataExist(
                userTrainingCourse.certificateData.certificateNameCurrent
              )
            }}
          </td>

          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setUserTrainingCourseData(userTrainingCourse);
                    openBottomSheet('UserTrainingCourseInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setUserTrainingCourseData(userTrainingCourse);
                    openBottomSheet('UserTrainingCourseQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="hasPrivilegeEdit">
                <button
                  @click="
                    setUserTrainingCourseData(userTrainingCourse);
                    openBottomSheet('UserTrainingCourseUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="hasPrivilegeFinaleDelete">
                <button
                  v-b-modal.UserTrainingCourseDelete
                  :title="$t('delete')"
                  @click="setUserTrainingCourseData(userTrainingCourse)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li v-if="hasPrivilegeChangeActivationType">
                <button
                  v-b-modal.UserTrainingCourseChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setUserTrainingCourseData(userTrainingCourse)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setUserTrainingCourseData(userTrainingCourse);
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
  hasAdminsEgyptTrainingCourseEdit,
  hasAdminsEgyptTrainingCourseFinaleDelete,
  hasAdminsEgyptTrainingCourseChangeActivationType,
  hasMasterAdminTrainingCourseEdit,
  hasMasterAdminTrainingCourseFinaleDelete,
  hasMasterAdminTrainingCourseChangeActivationType,
  hasEmployeeTrainingCourseEdit,
  hasEmployeeTrainingCourseFinaleDelete,
  hasEmployeeTrainingCourseChangeActivationType,
  hasStudentTrainingCourseEdit,
  hasStudentTrainingCourseFinaleDelete,
  hasStudentTrainingCourseChangeActivationType,
  hasSupplierTrainingCourseEdit,
  hasSupplierTrainingCourseFinaleDelete,
  hasSupplierTrainingCourseChangeActivationType,
  hasParentTrainingCourseEdit,
  hasParentTrainingCourseFinaleDelete,
  hasParentTrainingCourseChangeActivationType,
  hasClientTrainingCourseEdit,
  hasClientTrainingCourseFinaleDelete,
  hasClientTrainingCourseChangeActivationType,
} from "./../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "UserTrainingCoursesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: [
    "userTrainingCoursesData",
    "filterData",
    "defaultImg",
    "userTypeToken",
  ],
  methods: {
    setUserTrainingCourseData(userTrainingCourse) {
      this.$emit("setUserTrainingCourseData", userTrainingCourse);
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
          status = checkPrivilege(hasAdminsEgyptTrainingCourseEdit());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminTrainingCourseEdit());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeeTrainingCourseEdit());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentTrainingCourseEdit());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierTrainingCourseEdit());
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentTrainingCourseEdit());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientTrainingCourseEdit());
          break;
      }
      return status;
    },
    hasPrivilegeFinaleDelete() {
      let status = false;
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          status = checkPrivilege(hasAdminsEgyptTrainingCourseFinaleDelete());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminTrainingCourseFinaleDelete());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeeTrainingCourseFinaleDelete());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentTrainingCourseFinaleDelete());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierTrainingCourseFinaleDelete());
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentTrainingCourseFinaleDelete());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientTrainingCourseFinaleDelete());
          break;
      }
      return status;
    },
    hasPrivilegeChangeActivationType() {
      let status = false;
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          status = checkPrivilege(
            hasAdminsEgyptTrainingCourseChangeActivationType()
          );
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(
            hasMasterAdminTrainingCourseChangeActivationType()
          );
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(
            hasEmployeeTrainingCourseChangeActivationType()
          );
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(
            hasStudentTrainingCourseChangeActivationType()
          );
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(
            hasSupplierTrainingCourseChangeActivationType()
          );
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(
            hasParentTrainingCourseChangeActivationType()
          );
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(
            hasClientTrainingCourseChangeActivationType()
          );
          break;
      }
      return status;
    },
  },
};
</script>
