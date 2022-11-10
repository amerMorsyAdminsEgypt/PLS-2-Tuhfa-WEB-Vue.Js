<template>
  <b-modal id="UserInjuryChangeActivationType" scrollable centered hide-footer>
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
        {{ userInjury.userInjuryNameCurrent }}
      </span>
      )
    </h4>

    <div class="row">
      <CustomSelectBox
        :className="'col-12'"
        :id="'activationTypeToken'"
        :value="userInjury.activationTypeToken"
        :options="activationTypesTokensOptions"
        v-on:changeValue="userInjury.activationTypeToken = $event"
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
        @click.prevent="$bvModal.hide('UserInjuryChangeActivationType')"
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
  hasAdminsEgyptInjuryActive,
  hasAdminsEgyptInjuryArchive,
  hasAdminsEgyptInjuryBlocked,
  hasMasterAdminInjuryActive,
  hasMasterAdminInjuryArchive,
  hasMasterAdminInjuryBlocked,
  hasEmployeeInjuryActive,
  hasEmployeeInjuryArchive,
  hasEmployeeInjuryBlocked,
  hasStudentInjuryActive,
  hasStudentInjuryArchive,
  hasStudentInjuryBlocked,
  hasSupplierInjuryActive,
  hasSupplierInjuryArchive,
  hasSupplierInjuryBlocked,
  hasParentInjuryActive,
  hasParentInjuryArchive,
  hasParentInjuryBlocked,
  hasClientInjuryActive,
  hasClientInjuryArchive,
  hasClientInjuryBlocked,
} from "./../../../../utils/privilegeHelper";
import { getDialogOfActivationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import UserDelete from "./../../../../models/users/UserDelete";
import apiUserInjury from "./../../../../api/usersPersonalData/userInjuries";
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
  props: ["userInjury", "userTypeToken"],
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
          token: this.userInjury.userInjuryToken,
          activationTypeToken: this.userInjury.activationTypeToken,
          userTypeToken: this.userTypeToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiUserInjury.changeActivationType(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.hide("UserInjuryChangeActivationType");
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
      if (checkPrivilege(hasAdminsEgyptInjuryActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasAdminsEgyptInjuryArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasAdminsEgyptInjuryBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionMasterAdmin() {
      let arr = [];
      if (checkPrivilege(hasMasterAdminInjuryActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasMasterAdminInjuryArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasMasterAdminInjuryBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionEmployee() {
      let arr = [];
      if (checkPrivilege(hasEmployeeInjuryActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasEmployeeInjuryArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasEmployeeInjuryBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionStudent() {
      let arr = [];
      if (checkPrivilege(hasStudentInjuryActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStudentInjuryArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStudentInjuryBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionSupplier() {
      let arr = [];
      if (checkPrivilege(hasSupplierInjuryActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSupplierInjuryArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSupplierInjuryBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionParent() {
      let arr = [];
      if (checkPrivilege(hasParentInjuryActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasParentInjuryArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasParentInjuryBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionClient() {
      let arr = [];
      if (checkPrivilege(hasClientInjuryActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasClientInjuryArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasClientInjuryBlocked())) {
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
