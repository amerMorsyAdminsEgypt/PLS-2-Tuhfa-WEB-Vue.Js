<template>
  <div v-if="establishmentRolesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="4">{{ $t("EstablishmentRoles.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
          <th class="cell-lg">{{ $t("general.type") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(establishmentRole, index) in establishmentRolesData"
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  establishmentRole.establishmentRoleImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(establishmentRole.fullCode) }}</td>
          <td>
            {{ isDataExist(establishmentRole.establishmentRoleNameCurrent) }}
          </td>
          <td>
            {{ isDataExist(establishmentRole.userTypeNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setEstablishmentRoleData(establishmentRole);
                    openBottomSheet('EstablishmentRoleInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setEstablishmentRoleData(establishmentRole);
                    openBottomSheet('EstablishmentRoleQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="hasPrivilegeEdit">
                <button
                  @click="
                    setEstablishmentRoleData(establishmentRole);
                    openBottomSheet('EstablishmentRoleUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="hasPrivilegeFinaleDelete">
                <button
                  v-b-modal.EstablishmentRoleDelete
                  :title="$t('delete')"
                  @click="setEstablishmentRoleData(establishmentRole)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li v-if="hasPrivilegeChangeActivationType">
                <button
                  v-b-modal.EstablishmentRoleChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setEstablishmentRoleData(establishmentRole)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setEstablishmentRoleData(establishmentRole);
                    openBottomSheet('ActionsData');
                  "
                  :title="$t('actionsData.modelName')"
                >
                  <img src="@/assets/images/actions-data.svg" />
                </button>
              </li>
              <li v-if="hasPrivilegeEdit">
                <router-link
                  :to="{
                    name: 'Privileges',
                    params: {
                      establishmentRoleToken:
                        establishmentRole.establishmentRoleToken,
                      modelName: modelName,
                    },
                  }"
                  :title="$t('Privileges.modelName')"
                >
                  <img src="@/assets/images/establishment-role.svg" />
                </router-link>
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
} from "./../../../../utils/functions";
import {
  hasAdminsEgyptEstablishmentsRoleEdit,
  hasMasterAdminEstablishmentsRoleEdit,
  hasEmployeeEstablishmentsRoleEdit,
  hasStudentEstablishmentsRoleEdit,
  hasSupplierEstablishmentsRoleEdit,
  hasParentEstablishmentsRoleEdit,
  hasClientEstablishmentsRoleEdit,
  hasAdminsEgyptEstablishmentsRoleFinaleDelete,
  hasMasterAdminEstablishmentsRoleFinaleDelete,
  hasEmployeeEstablishmentsRoleFinaleDelete,
  hasStudentEstablishmentsRoleFinaleDelete,
  hasSupplierEstablishmentsRoleFinaleDelete,
  hasParentEstablishmentsRoleFinaleDelete,
  hasClientEstablishmentsRoleFinaleDelete,
  hasAdminsEgyptEstablishmentsRoleChangeActivationType,
  hasMasterAdminEstablishmentsRoleChangeActivationType,
  hasEmployeeEstablishmentsRoleChangeActivationType,
  hasStudentEstablishmentsRoleChangeActivationType,
  hasSupplierEstablishmentsRoleChangeActivationType,
  hasParentEstablishmentsRoleChangeActivationType,
  hasClientEstablishmentsRoleChangeActivationType,
} from "./../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "EstablishmentRolesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["establishmentRolesData", "filterData", "defaultImg", "modelName"],
  methods: {
    setEstablishmentRoleData(establishmentRole) {
      this.$emit("setEstablishmentRoleData", establishmentRole);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
  },
  computed: {
    hasPrivilegeEdit() {
      let status = false;
      switch (this.modelName) {
        case "adminsEgyptEstablishmentsRole":
          status = checkPrivilege(hasAdminsEgyptEstablishmentsRoleEdit());
          break;
        case "masterAdminEstablishmentsRole":
          status = checkPrivilege(hasMasterAdminEstablishmentsRoleEdit());
          break;
        case "employeeEstablishmentsRole":
          status = checkPrivilege(hasEmployeeEstablishmentsRoleEdit());
          break;
        case "studentEstablishmentsRole":
          status = checkPrivilege(hasStudentEstablishmentsRoleEdit());
          break;
        case "supplierEstablishmentsRole":
          status = checkPrivilege(hasSupplierEstablishmentsRoleEdit());
          break;
        case "parentEstablishmentsRole":
          status = checkPrivilege(hasParentEstablishmentsRoleEdit());
          break;
        case "clientEstablishmentsRole":
          status = checkPrivilege(hasClientEstablishmentsRoleEdit());
          break;
      }
      return status;
    },
    hasPrivilegeFinaleDelete() {
      let status = false;
      switch (this.modelName) {
        case "adminsEgyptEstablishmentsRole":
          status = checkPrivilege(
            hasAdminsEgyptEstablishmentsRoleFinaleDelete()
          );
          break;
        case "masterAdminEstablishmentsRole":
          status = checkPrivilege(
            hasMasterAdminEstablishmentsRoleFinaleDelete()
          );
          break;
        case "employeeEstablishmentsRole":
          status = checkPrivilege(hasEmployeeEstablishmentsRoleFinaleDelete());
          break;
        case "studentEstablishmentsRole":
          status = checkPrivilege(hasStudentEstablishmentsRoleFinaleDelete());
          break;
        case "supplierEstablishmentsRole":
          status = checkPrivilege(hasSupplierEstablishmentsRoleFinaleDelete());
          break;
        case "parentEstablishmentsRole":
          status = checkPrivilege(hasParentEstablishmentsRoleFinaleDelete());
          break;
        case "clientEstablishmentsRole":
          status = checkPrivilege(hasClientEstablishmentsRoleFinaleDelete());
          break;
      }
      return status;
    },
    hasPrivilegeChangeActivationType() {
      let status = false;
      switch (this.modelName) {
        case "adminsEgyptEstablishmentsRole":
          status = checkPrivilege(
            hasAdminsEgyptEstablishmentsRoleChangeActivationType()
          );
          break;
        case "masterAdminEstablishmentsRole":
          status = checkPrivilege(
            hasMasterAdminEstablishmentsRoleChangeActivationType()
          );
          break;
        case "employeeEstablishmentsRole":
          status = checkPrivilege(
            hasEmployeeEstablishmentsRoleChangeActivationType()
          );
          break;
        case "studentEstablishmentsRole":
          status = checkPrivilege(
            hasStudentEstablishmentsRoleChangeActivationType()
          );
          break;
        case "supplierEstablishmentsRole":
          status = checkPrivilege(
            hasSupplierEstablishmentsRoleChangeActivationType()
          );
          break;
        case "parentEstablishmentsRole":
          status = checkPrivilege(
            hasParentEstablishmentsRoleChangeActivationType()
          );
          break;
        case "clientEstablishmentsRole":
          status = checkPrivilege(
            hasClientEstablishmentsRoleChangeActivationType()
          );
          break;
      }
      return status;
    },
  },
};
</script>
