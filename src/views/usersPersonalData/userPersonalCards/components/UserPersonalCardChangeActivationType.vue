<template>
  <b-modal
    id="UserPersonalCardChangeActivationType"
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
        {{ userPersonalCard.userPersonalCardNameCurrent }}
      </span>
      )
    </h4>

    <div class="row">
      <CustomSelectBox
        :className="'col-12'"
        :id="'activationTypeToken'"
        :value="userPersonalCard.activationTypeToken"
        :options="activationTypesTokensOptions"
        v-on:changeValue="userPersonalCard.activationTypeToken = $event"
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
        @click.prevent="$bvModal.hide('UserPersonalCardChangeActivationType')"
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
  hasAdminsEgyptPersonalCardActive,
  hasAdminsEgyptPersonalCardArchive,
  hasAdminsEgyptPersonalCardBlocked,
  hasMasterAdminPersonalCardActive,
  hasMasterAdminPersonalCardArchive,
  hasMasterAdminPersonalCardBlocked,
  hasEmployeePersonalCardActive,
  hasEmployeePersonalCardArchive,
  hasEmployeePersonalCardBlocked,
  hasStudentPersonalCardActive,
  hasStudentPersonalCardArchive,
  hasStudentPersonalCardBlocked,
  hasSupplierPersonalCardActive,
  hasSupplierPersonalCardArchive,
  hasSupplierPersonalCardBlocked,
  hasParentPersonalCardActive,
  hasParentPersonalCardArchive,
  hasParentPersonalCardBlocked,
  hasClientPersonalCardActive,
  hasClientPersonalCardArchive,
  hasClientPersonalCardBlocked,
} from "./../../../../utils/privilegeHelper";
import { getDialogOfActivationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import UserDelete from "./../../../../models/users/UserDelete";
import apiUserPersonalCard from "./../../../../api/usersPersonalData/userPersonalCards";
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
  props: ["userPersonalCard", "userTypeToken"],
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
          token: this.userPersonalCard.userPersonalCardToken,
          activationTypeToken: this.userPersonalCard.activationTypeToken,
          userTypeToken: this.userPersonalCard.userTypeToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiUserPersonalCard.changeActivationType(
          formData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.hide("UserPersonalCardChangeActivationType");
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
      if (checkPrivilege(hasAdminsEgyptPersonalCardActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasAdminsEgyptPersonalCardArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasAdminsEgyptPersonalCardBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionMasterAdmin() {
      let arr = [];
      if (checkPrivilege(hasMasterAdminPersonalCardActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasMasterAdminPersonalCardArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasMasterAdminPersonalCardBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionEmployee() {
      let arr = [];
      if (checkPrivilege(hasEmployeePersonalCardActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasEmployeePersonalCardArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasEmployeePersonalCardBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionStudent() {
      let arr = [];
      if (checkPrivilege(hasStudentPersonalCardActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStudentPersonalCardArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStudentPersonalCardBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionSupplier() {
      let arr = [];
      if (checkPrivilege(hasSupplierPersonalCardActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSupplierPersonalCardArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSupplierPersonalCardBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionParent() {
      let arr = [];
      if (checkPrivilege(hasParentPersonalCardActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasParentPersonalCardArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasParentPersonalCardBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionClient() {
      let arr = [];
      if (checkPrivilege(hasClientPersonalCardActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasClientPersonalCardArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasClientPersonalCardBlocked())) {
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
