<template>
  <div v-if="userExperiencesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="4">{{ $t("UserExperiences.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
          <th class="cell-lg">{{ $t("GeneralJobs.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(userExperience, index) in userExperiencesData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  userExperience.userExperienceImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(userExperience.fullCode) }}</td>
          <td>
            {{ isDataExist(userExperience.userExperienceNameCurrent) }}
          </td>
          <td>
            {{
              isDataExist(userExperience.generalJobData.generalJobNameCurrent)
            }}
          </td>

          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setUserExperienceData(userExperience);
                    openBottomSheet('UserExperienceInfo');
                  "
                  :title="$t('info')"
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
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "UserExperiencesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
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
