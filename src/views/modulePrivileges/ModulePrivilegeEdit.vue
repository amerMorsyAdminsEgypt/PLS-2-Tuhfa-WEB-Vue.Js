<template>
  <div class="">
    <DashboardNavbar />
    <PreLoader v-if="isLoading" />

    <div class="app-content content">
      <CustomSelectBox
        :className="'col-md-12'"
        :id="'establishmentRoleToken'"
        :value="modulePrivileges.modulePrivilege.establishmentRoleToken"
        :options="establishmentRoleTokenOptions"
        v-on:changeValue="establishmentRoleChanged($event)"
        :title="$t('EstablishmentRoles.select')"
        :imgName="'establishment-role.svg'"
      />
      <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

      <ModulePrivilegeForm
        v-if="
          modulePrivileges.modulePrivilegeData != undefined &&
          modulePrivileges.modulePrivilegeData.length != 0 &&
          !isLoading
        "
        :modulePrivilege="modulePrivileges.modulePrivilegeData"
        v-on:updateModulePrivilege="updateModulePrivilege($event)"
        :submitName="$t('edit')"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DashboardNavbar from "./../../layouts/components/DashboardNavbar.vue";
import generalMixin from "@/utils/generalMixin";
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import ModulePrivilegeForm from "@/components/modulePrivileges/ModulePrivilegeForm.vue";
import CustomSelectBox from "@/components/general/CustomSelectBox.vue";
import ModulePrivileges from "@/models/modulePrivileges/ModulePrivileges";
// import EstablishmentRoles from "@/models/settings/establishmentRoles/EstablishmentRoles";
import { getEstablishmentRolesDialog } from "@/utils/dialogsOfApi";

export default {
  mixins: [generalMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    CustomSelectBox,
    ModulePrivilegeForm,
  },
  computed: {
    ...mapGetters(["userAuthorizeToken"]),
  },
  data() {
    return {
      isLoading: false,
      exceptionMsg: null,
      exceptionImg: null,
      modulePrivileges: new ModulePrivileges(),
      // establishmentRoles: new EstablishmentRoles(),
      establishmentRoleTokenOptions: [],
    };
  },
  props: {
    establishmentRoleToken: {
      type: String,
      default: "",
    },
    modelName: {
      type: String,
      default: "",
    },
  },
  methods: {
    async getEstablishmentRolesDialog() {
      // let modelName = this.modelName || this.$route.params.modelName;
      this.isLoading = true;
      this.establishmentRoleTokenOptions = await getEstablishmentRolesDialog(
        this.modelName
      );
      this.isLoading = false;
    },
    async establishmentRoleChanged(data) {
      this.modulePrivileges.modulePrivilege.establishmentRoleToken = data;
      if (data) {
        await this.getModulePrivilegeDetails();
      } else {
        this.modulePrivileges.modulePrivilegeData = [];
      }
    },
    async getModulePrivilegeDetails() {
      this.isLoading = true;
      this.exceptionMsg = null;
      try {
        let response =
          await this.modulePrivileges.modulePrivilege.getModulePrivilegeDetails();
        if (response.data.status == STATUS.SUCCESS) {
          this.modulePrivileges.fillData(response.data);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.modulePrivileges.modulePrivilegeData = [];
          this.exceptionMsg = response.data.msg;
        }
      } catch (e) {
        this.modulePrivileges.modulePrivilegeData = [];
        this.exceptionMsg = this.$t("errorCatch");
      }

      this.isLoading = false;
    },
    async updateModulePrivilege(data) {
      this.isLoading = true;
      try {
        const response =
          await this.modulePrivileges.modulePrivilege.updateModulePrivilege(
            data
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.modulePrivileges.modulePrivilege.setInitialValue();
          this.showMsg(response.data.msg, true);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
          this.showMsg(response.data.msg);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
  },
  async created() {
    if (this.establishmentRoleToken && this.modelName) {
      this.isLoading = true;
      await this.establishmentRoleChanged(this.establishmentRoleToken);
      await this.getEstablishmentRolesDialog();
    } else {
      this.exceptionMsg = this.$t("UserValidSettings.select");
      this.isLoading = false;
    }
  },
};
</script>
