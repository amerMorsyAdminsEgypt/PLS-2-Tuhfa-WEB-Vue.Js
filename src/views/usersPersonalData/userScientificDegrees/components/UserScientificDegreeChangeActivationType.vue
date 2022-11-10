<template>
  <b-modal
    id="UserScientificDegreeChangeActivationType"
    scrollable
    centered
    hide-footer
  >
    <PreLoader v-if="isLoading" />

    <template #modal-title>
      <h3>
        <img src="@/assets/images/changeActivationType.svg" class="icon-lg" />
        {{ $t("changeActivationType") }}
      </h3>
    </template>

    <h4 class="text-center">
      (
      <span class="co-red">
        {{ userScientificDegree.userScientificDegreeNameCurrent }}
      </span>
      )
    </h4>

    <div class="row">
      <CustomSelectBox
        :className="'col-12'"
        :id="'activationTypeToken'"
        :value="userScientificDegree.activationTypeToken"
        :options="activationTypesTokensOptions"
        v-on:changeValue="userScientificDegree.activationTypeToken = $event"
        :title="$t('general.selectActivationType')"
        :imgName="'changeActivationType.svg'"
        :imgStatus="true"
      />
    </div>

    <div class="modal-footer">
      <button
        name="submit"
        type="submit"
        class="btn btn-submit"
        @click.prevent="changeActivationType"
      >
        {{ $t("ok") }}
      </button>
      <button
        name="submit"
        type="submit"
        class="btn btn-cancel"
        @click.prevent="
          $bvModal.hide('UserScientificDegreeChangeActivationType')
        "
      >
        {{ $t("cancel") }}
      </button>
    </div>
  </b-modal>
</template>

<script>
import { USER_TYPE } from "./../../../../utils/constantLists";
import { mapGetters } from "vuex";
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import { STATUS } from "./../../../../utils/constants";
import { ACTIVATION_TYPE } from "./../../../../utils/constantLists";
import {
  checkPrivilege,
  objectToFormData,
} from "./../../../../utils/functions";
import {
  hasAdminsEgyptScientificDegreeActive,
  hasAdminsEgyptScientificDegreeArchive,
  hasAdminsEgyptScientificDegreeBlocked,
  hasMasterAdminScientificDegreeActive,
  hasMasterAdminScientificDegreeArchive,
  hasMasterAdminScientificDegreeBlocked,
  hasEmployeeScientificDegreeActive,
  hasEmployeeScientificDegreeArchive,
  hasEmployeeScientificDegreeBlocked,
  hasStudentScientificDegreeActive,
  hasStudentScientificDegreeArchive,
  hasStudentScientificDegreeBlocked,
  hasSupplierScientificDegreeActive,
  hasSupplierScientificDegreeArchive,
  hasSupplierScientificDegreeBlocked,
  hasParentScientificDegreeActive,
  hasParentScientificDegreeArchive,
  hasParentScientificDegreeBlocked,
  hasClientScientificDegreeActive,
  hasClientScientificDegreeArchive,
  hasClientScientificDegreeBlocked,
} from "./../../../../utils/privilegeHelper";
import { getDialogOfActivationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import UserDelete from "./../../../../models/users/UserDelete";
import apiUserScientificDegree from "./../../../../api/usersPersonalData/userScientificDegrees";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomSelectBox,
  },
  data() {
    return {
      model: new UserDelete(),
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  props: ["userScientificDegree", "userTypeToken"],
  computed: {
    ...mapGetters(["usersPrivilegeData"]),
    activationTypesTokensOptions: function () {
      let options = [];
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          options = this.getActivationTypeTokenOptionAdminsEgypt();
          break;
        case USER_TYPE.MasterAdmin:
          options = this.getActivationTypeTokenOptionMasterAdmin();
          break;
        case USER_TYPE.Employee:
          options = this.getActivationTypeTokenOptionEmployee();
          break;
        case USER_TYPE.Student:
          options = this.getActivationTypeTokenOptionStudent();
          break;
        case USER_TYPE.Supplier:
          options = this.getActivationTypeTokenOptionSupplier();
          break;
        case USER_TYPE.Parent:
          options = this.getActivationTypeTokenOptionParent();
          break;
        case USER_TYPE.Client:
          options = this.getActivationTypeTokenOptionClient();
          break;
      }
      return options;
    },
  },
  methods: {
    async changeActivationType() {
      this.isLoading = true;
      try {
        this.model.fillData({
          token: this.userScientificDegree.userScientificDegreeToken,
          activationTypeToken: this.userScientificDegree.activationTypeToken,
          userTypeToken: this.userScientificDegree.userTypeToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiUserScientificDegree.changeActivationType(
          formData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.hide("UserScientificDegreeChangeActivationType");
          this.$emit("refresh");
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (e) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },

    getActivationTypeTokenOptionAdminsEgypt() {
      let arr = [];
      if (checkPrivilege(hasAdminsEgyptScientificDegreeActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasAdminsEgyptScientificDegreeArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasAdminsEgyptScientificDegreeBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionMasterAdmin() {
      let arr = [];
      if (checkPrivilege(hasMasterAdminScientificDegreeActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasMasterAdminScientificDegreeArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasMasterAdminScientificDegreeBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionEmployee() {
      let arr = [];
      if (checkPrivilege(hasEmployeeScientificDegreeActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasEmployeeScientificDegreeArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasEmployeeScientificDegreeBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionStudent() {
      let arr = [];
      if (checkPrivilege(hasStudentScientificDegreeActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStudentScientificDegreeArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStudentScientificDegreeBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionSupplier() {
      let arr = [];
      if (checkPrivilege(hasSupplierScientificDegreeActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSupplierScientificDegreeArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSupplierScientificDegreeBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionParent() {
      let arr = [];
      if (checkPrivilege(hasParentScientificDegreeActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasParentScientificDegreeArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasParentScientificDegreeBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionClient() {
      let arr = [];
      if (checkPrivilege(hasClientScientificDegreeActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasClientScientificDegreeArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasClientScientificDegreeBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        if (obj) arr.push(obj);
      }

      return arr;
    },
  },
  async created() {},
};
</script>
