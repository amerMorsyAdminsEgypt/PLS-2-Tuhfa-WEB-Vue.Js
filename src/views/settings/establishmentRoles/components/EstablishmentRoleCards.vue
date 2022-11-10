<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(establishmentRole, index) in establishmentRolesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="establishmentRole.establishmentRoleNameCurrent"
      :description="establishmentRole.fullCode"
      :imagePath="establishmentRole.establishmentRoleImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setEstablishmentRoleData(establishmentRole);
            openBottomSheet('EstablishmentRoleInfo');
          "
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
              establishmentRoleToken: establishmentRole.establishmentRoleToken,
              modelName: modelName,
            },
          }"
          :title="$t('Privileges.modelName')"
        >
          <img src="@/assets/images/establishment-role.svg" />
        </router-link>
      </li>
    </CustomCard>
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
import CustomCard from "./../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
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
