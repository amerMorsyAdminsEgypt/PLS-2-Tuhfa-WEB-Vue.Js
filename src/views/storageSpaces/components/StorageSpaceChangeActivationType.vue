<template>
  <b-modal
    id="StorageSpaceChangeActivationType"
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
        {{ storageSpace.storageSpaceNameCurrent }}
      </span>
      )
    </h4>

    <div class="row">
      <CustomSelectBox
        :className="'col-12'"
        :id="'activationTypeToken'"
        :value="storageSpace.activationTypeToken"
        :options="activationTypesTokensOptions"
        v-on:changeValue="storageSpace.activationTypeToken = $event"
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
        @click.prevent="$bvModal.hide('StorageSpaceChangeActivationType')"
      >
        {{ $t("cancel") }}
      </button>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters } from "vuex";
import PreLoader from "./../../../components/general/PreLoader.vue";
import CustomSelectBox from "./../../../components/general/CustomSelectBox.vue";
import { STATUS } from "./../../../utils/constants";
import { ACTIVATION_TYPE } from "./../../../utils/constantLists";
import { checkPrivilege, objectToFormData } from "./../../../utils/functions";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import StorageSpaceDelete from "./../../../models/storageSpaces/StorageSpaceDelete";
import apiStorageSpace from "./../../../api/storageSpace";
import generalMixin from "./../../../utils/generalMixin";
import {
  hasStorageSpaceAdminsEgyptActive,
  hasStorageSpaceAdminsEgyptArchive,
  hasStorageSpaceAdminsEgyptBlocked,
  hasStorageSpaceMasterAdminActive,
  hasStorageSpaceMasterAdminArchive,
  hasStorageSpaceMasterAdminBlocked,
  hasStorageSpaceEmployeeActive,
  hasStorageSpaceEmployeeArchive,
  hasStorageSpaceEmployeeBlocked,
  hasStorageSpaceStudentActive,
  hasStorageSpaceStudentArchive,
  hasStorageSpaceStudentBlocked,
  hasStorageSpaceSupplierActive,
  hasStorageSpaceSupplierArchive,
  hasStorageSpaceSupplierBlocked,
  hasStorageSpaceParentActive,
  hasStorageSpaceParentArchive,
  hasStorageSpaceParentBlocked,
  hasStorageSpaceClientActive,
  hasStorageSpaceClientArchive,
  hasStorageSpaceClientBlocked,
  hasStorageSpaceEducationalGroupActive,
  hasStorageSpaceEducationalGroupArchive,
  hasStorageSpaceEducationalGroupBlocked,
  // ## place ##
  hasStorageSpacePlaceMasterAdminActive,
  hasStorageSpacePlaceMasterAdminArchive,
  hasStorageSpacePlaceMasterAdminBlocked,
  hasStorageSpacePlaceEmployeeActive,
  hasStorageSpacePlaceEmployeeArchive,
  hasStorageSpacePlaceEmployeeBlocked,
  hasStorageSpacePlaceStudentActive,
  hasStorageSpacePlaceStudentArchive,
  hasStorageSpacePlaceStudentBlocked,
  hasStorageSpacePlaceSupplierActive,
  hasStorageSpacePlaceSupplierArchive,
  hasStorageSpacePlaceSupplierBlocked,
  hasStorageSpacePlaceParentActive,
  hasStorageSpacePlaceParentArchive,
  hasStorageSpacePlaceParentBlocked,
  hasStorageSpacePlaceClientActive,
  hasStorageSpacePlaceClientArchive,
  hasStorageSpacePlaceClientBlocked,
  hasStorageSpacePlaceOtherActive,
  hasStorageSpacePlaceOtherArchive,
  hasStorageSpacePlaceOtherBlocked,
} from "./../../../utils/privilegeHelper";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomSelectBox,
  },
  data() {
    return {
      model: new StorageSpaceDelete(),
      activationTypesTokenOptions: getDialogOfActivationTypes(),
      modelName: this.$route.meta.modelName,
    };
  },
  props: ["storageSpace"],
  computed: {
    ...mapGetters(["usersPrivilegeData"]),
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(this.hasPrivilegeActive)) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(this.hasPrivilegeArchive)) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(this.hasPrivilegeBlocked)) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        if (obj) arr.push(obj);
      }
      return arr;
    },

    hasPrivilegeActive() {
      let status = false;
      switch (this.modelName) {
        case "storageSpacesAdminsEgypt":
          status = checkPrivilege(hasStorageSpaceAdminsEgyptActive());
          break;
        case "storageSpacesMasterAdmin":
          status = checkPrivilege(hasStorageSpaceMasterAdminActive());
          break;
        case "storageSpacesEmployees":
          status = checkPrivilege(hasStorageSpaceEmployeeActive());
          break;
        case "storageSpacesStudents":
          status = checkPrivilege(hasStorageSpaceStudentActive());
          break;
        case "storageSpacesSuppliers":
          status = checkPrivilege(hasStorageSpaceSupplierActive());
          break;
        case "storageSpacesParents":
          status = checkPrivilege(hasStorageSpaceParentActive());
          break;
        case "storageSpacesClients":
          status = checkPrivilege(hasStorageSpaceClientActive());
          break;
        case "storageSpacesEducationalGroup":
          status = checkPrivilege(hasStorageSpaceEducationalGroupActive());
          break;
        // ## place ##
        case "storageSpacesPlaceMasterAdmin":
          status = checkPrivilege(hasStorageSpacePlaceMasterAdminActive());
          break;
        case "storageSpacesPlaceEmployees":
          status = checkPrivilege(hasStorageSpacePlaceEmployeeActive());
          break;
        case "storageSpacesPlaceStudents":
          status = checkPrivilege(hasStorageSpacePlaceStudentActive());
          break;
        case "storageSpacesPlaceSuppliers":
          status = checkPrivilege(hasStorageSpacePlaceSupplierActive());
          break;
        case "storageSpacesPlaceParents":
          status = checkPrivilege(hasStorageSpacePlaceParentActive());
          break;
        case "storageSpacesPlaceClients":
          status = checkPrivilege(hasStorageSpacePlaceClientActive());
          break;
        case "storageSpacesPlaceOthers":
          status = checkPrivilege(hasStorageSpacePlaceOtherActive());
          break;
        default:
          break;
      }
      return status;
    },
    hasPrivilegeArchive() {
      let status = false;
      switch (this.modelName) {
        case "storageSpacesAdminsEgypt":
          status = checkPrivilege(hasStorageSpaceAdminsEgyptArchive());
          break;
        case "storageSpacesMasterAdmin":
          status = checkPrivilege(hasStorageSpaceMasterAdminArchive());
          break;
        case "storageSpacesEmployees":
          status = checkPrivilege(hasStorageSpaceEmployeeArchive());
          break;
        case "storageSpacesStudents":
          status = checkPrivilege(hasStorageSpaceStudentArchive());
          break;
        case "storageSpacesSuppliers":
          status = checkPrivilege(hasStorageSpaceSupplierArchive());
          break;
        case "storageSpacesParents":
          status = checkPrivilege(hasStorageSpaceParentArchive());
          break;
        case "storageSpacesClients":
          status = checkPrivilege(hasStorageSpaceClientArchive());
          break;
        case "storageSpacesEducationalGroup":
          status = checkPrivilege(hasStorageSpaceEducationalGroupArchive());
          break;
        // ## place ##
        case "storageSpacesPlaceMasterAdmin":
          status = checkPrivilege(hasStorageSpacePlaceMasterAdminArchive());
          break;
        case "storageSpacesPlaceEmployees":
          status = checkPrivilege(hasStorageSpacePlaceEmployeeArchive());
          break;
        case "storageSpacesPlaceStudents":
          status = checkPrivilege(hasStorageSpacePlaceStudentArchive());
          break;
        case "storageSpacesPlaceSuppliers":
          status = checkPrivilege(hasStorageSpacePlaceSupplierArchive());
          break;
        case "storageSpacesPlaceParents":
          status = checkPrivilege(hasStorageSpacePlaceParentArchive());
          break;
        case "storageSpacesPlaceClients":
          status = checkPrivilege(hasStorageSpacePlaceClientArchive());
          break;
        case "storageSpacesPlaceOthers":
          status = checkPrivilege(hasStorageSpacePlaceOtherArchive());
          break;
        default:
          break;
      }
      return status;
    },
    hasPrivilegeBlocked() {
      let status = false;
      switch (this.modelName) {
        case "storageSpacesAdminsEgypt":
          status = checkPrivilege(hasStorageSpaceAdminsEgyptBlocked());
          break;
        case "storageSpacesMasterAdmin":
          status = checkPrivilege(hasStorageSpaceMasterAdminBlocked());
          break;
        case "storageSpacesEmployees":
          status = checkPrivilege(hasStorageSpaceEmployeeBlocked());
          break;
        case "storageSpacesStudents":
          status = checkPrivilege(hasStorageSpaceStudentBlocked());
          break;
        case "storageSpacesSuppliers":
          status = checkPrivilege(hasStorageSpaceSupplierBlocked());
          break;
        case "storageSpacesParents":
          status = checkPrivilege(hasStorageSpaceParentBlocked());
          break;
        case "storageSpacesClients":
          status = checkPrivilege(hasStorageSpaceClientBlocked());
          break;
        case "storageSpacesEducationalGroup":
          status = checkPrivilege(hasStorageSpaceEducationalGroupBlocked());
          break;
        // ## place ##
        case "storageSpacesPlaceMasterAdmin":
          status = checkPrivilege(hasStorageSpacePlaceMasterAdminBlocked());
          break;
        case "storageSpacesPlaceEmployees":
          status = checkPrivilege(hasStorageSpacePlaceEmployeeBlocked());
          break;
        case "storageSpacesPlaceStudents":
          status = checkPrivilege(hasStorageSpacePlaceStudentBlocked());
          break;
        case "storageSpacesPlaceSuppliers":
          status = checkPrivilege(hasStorageSpacePlaceSupplierBlocked());
          break;
        case "storageSpacesPlaceParents":
          status = checkPrivilege(hasStorageSpacePlaceParentBlocked());
          break;
        case "storageSpacesPlaceClients":
          status = checkPrivilege(hasStorageSpacePlaceClientBlocked());
          break;
        case "storageSpacesPlaceOthers":
          status = checkPrivilege(hasStorageSpacePlaceOtherBlocked());
          break;
        default:
          break;
      }
      return status;
    },
  },
  methods: {
    async changeActivationType() {
      this.isLoading = true;
      try {
        this.model.fillData({
          token: this.storageSpace.storageSpaceToken,
          activationTypeToken: this.storageSpace.activationTypeToken,
          storageSpaceTypeToken: this.storageSpace.storageSpaceTypeToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiStorageSpace.changeActivationType(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.hide("StorageSpaceChangeActivationType");
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
  },
  // async created() {},
};
</script>
