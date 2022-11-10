<template>
  <b-modal
    id="StorageSpaceMediaChangeActivationType"
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
        {{ storageSpaceMedia.storageSpaceMediaNameCurrent }}
      </span>
      )
    </h4>

    <div class="row">
      <CustomSelectBox
        :className="'col-12'"
        :id="'activationTypeToken'"
        :value="storageSpaceMedia.activationTypeToken"
        :options="activationTypesTokensOptions"
        v-on:changeValue="storageSpaceMedia.activationTypeToken = $event"
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
        @click.prevent="$bvModal.hide('StorageSpaceMediaChangeActivationType')"
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
import StorageSpaceMediaDelete from "./../../../models/storageSpaceMedias/StorageSpaceMediaDelete";
import apiStorageSpaceMedia from "./../../../api/storageSpaceMedia";
import generalMixin from "./../../../utils/generalMixin";
import {
  hasStorageSpaceMediaAdminsEgyptActive,
  hasStorageSpaceMediaAdminsEgyptArchive,
  hasStorageSpaceMediaAdminsEgyptBlocked,
  hasStorageSpaceMediaMasterAdminActive,
  hasStorageSpaceMediaMasterAdminArchive,
  hasStorageSpaceMediaMasterAdminBlocked,
  hasStorageSpaceMediaEmployeeActive,
  hasStorageSpaceMediaEmployeeArchive,
  hasStorageSpaceMediaEmployeeBlocked,
  hasStorageSpaceMediaStudentActive,
  hasStorageSpaceMediaStudentArchive,
  hasStorageSpaceMediaStudentBlocked,
  hasStorageSpaceMediaSupplierActive,
  hasStorageSpaceMediaSupplierArchive,
  hasStorageSpaceMediaSupplierBlocked,
  hasStorageSpaceMediaParentActive,
  hasStorageSpaceMediaParentArchive,
  hasStorageSpaceMediaParentBlocked,
  hasStorageSpaceMediaClientActive,
  hasStorageSpaceMediaClientArchive,
  hasStorageSpaceMediaClientBlocked,
  hasStorageSpaceMediaEducationalGroupActive,
  hasStorageSpaceMediaEducationalGroupArchive,
  hasStorageSpaceMediaEducationalGroupBlocked,
  // ## place ##
  hasStorageSpaceMediaPlaceMasterAdminActive,
  hasStorageSpaceMediaPlaceMasterAdminArchive,
  hasStorageSpaceMediaPlaceMasterAdminBlocked,
  hasStorageSpaceMediaPlaceEmployeeActive,
  hasStorageSpaceMediaPlaceEmployeeArchive,
  hasStorageSpaceMediaPlaceEmployeeBlocked,
  hasStorageSpaceMediaPlaceStudentActive,
  hasStorageSpaceMediaPlaceStudentArchive,
  hasStorageSpaceMediaPlaceStudentBlocked,
  hasStorageSpaceMediaPlaceSupplierActive,
  hasStorageSpaceMediaPlaceSupplierArchive,
  hasStorageSpaceMediaPlaceSupplierBlocked,
  hasStorageSpaceMediaPlaceParentActive,
  hasStorageSpaceMediaPlaceParentArchive,
  hasStorageSpaceMediaPlaceParentBlocked,
  hasStorageSpaceMediaPlaceClientActive,
  hasStorageSpaceMediaPlaceClientArchive,
  hasStorageSpaceMediaPlaceClientBlocked,
  hasStorageSpaceMediaPlaceOtherActive,
  hasStorageSpaceMediaPlaceOtherArchive,
  hasStorageSpaceMediaPlaceOtherBlocked,
} from "./../../../utils/privilegeHelper";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomSelectBox,
  },
  data() {
    return {
      model: new StorageSpaceMediaDelete(),
      activationTypesTokenOptions: getDialogOfActivationTypes(),
      modelName: this.$route.meta.modelName,
    };
  },
  props: ["storageSpaceMedia"],
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
        case "storageSpaceMediasAdminsEgypt":
          status = checkPrivilege(hasStorageSpaceMediaAdminsEgyptActive());
          break;
        case "storageSpaceMediasMasterAdmin":
          status = checkPrivilege(hasStorageSpaceMediaMasterAdminActive());
          break;
        case "storageSpaceMediasEmployees":
          status = checkPrivilege(hasStorageSpaceMediaEmployeeActive());
          break;
        case "storageSpaceMediasStudents":
          status = checkPrivilege(hasStorageSpaceMediaStudentActive());
          break;
        case "storageSpaceMediasSuppliers":
          status = checkPrivilege(hasStorageSpaceMediaSupplierActive());
          break;
        case "storageSpaceMediasParents":
          status = checkPrivilege(hasStorageSpaceMediaParentActive());
          break;
        case "storageSpaceMediasClients":
          status = checkPrivilege(hasStorageSpaceMediaClientActive());
          break;
        case "storageSpaceMediasEducationalGroup":
          status = checkPrivilege(hasStorageSpaceMediaEducationalGroupActive());
          break;
        // ## place ##
        case "storageSpaceMediasPlaceMasterAdmin":
          status = checkPrivilege(hasStorageSpaceMediaPlaceMasterAdminActive());
          break;
        case "storageSpaceMediasPlaceEmployees":
          status = checkPrivilege(hasStorageSpaceMediaPlaceEmployeeActive());
          break;
        case "storageSpaceMediasPlaceStudents":
          status = checkPrivilege(hasStorageSpaceMediaPlaceStudentActive());
          break;
        case "storageSpaceMediasPlaceSuppliers":
          status = checkPrivilege(hasStorageSpaceMediaPlaceSupplierActive());
          break;
        case "storageSpaceMediasPlaceParents":
          status = checkPrivilege(hasStorageSpaceMediaPlaceParentActive());
          break;
        case "storageSpaceMediasPlaceClients":
          status = checkPrivilege(hasStorageSpaceMediaPlaceClientActive());
          break;
        case "storageSpaceMediasPlaceOthers":
          status = checkPrivilege(hasStorageSpaceMediaPlaceOtherActive());
          break;
        default:
          break;
      }
      return status;
    },
    hasPrivilegeArchive() {
      let status = false;
      switch (this.modelName) {
        case "storageSpaceMediasAdminsEgypt":
          status = checkPrivilege(hasStorageSpaceMediaAdminsEgyptArchive());
          break;
        case "storageSpaceMediasMasterAdmin":
          status = checkPrivilege(hasStorageSpaceMediaMasterAdminArchive());
          break;
        case "storageSpaceMediasEmployees":
          status = checkPrivilege(hasStorageSpaceMediaEmployeeArchive());
          break;
        case "storageSpaceMediasStudents":
          status = checkPrivilege(hasStorageSpaceMediaStudentArchive());
          break;
        case "storageSpaceMediasSuppliers":
          status = checkPrivilege(hasStorageSpaceMediaSupplierArchive());
          break;
        case "storageSpaceMediasParents":
          status = checkPrivilege(hasStorageSpaceMediaParentArchive());
          break;
        case "storageSpaceMediasClients":
          status = checkPrivilege(hasStorageSpaceMediaClientArchive());
          break;
        case "storageSpaceMediasEducationalGroup":
          status = checkPrivilege(
            hasStorageSpaceMediaEducationalGroupArchive()
          );
          break;
        // ## place ##
        case "storageSpaceMediasPlaceMasterAdmin":
          status = checkPrivilege(
            hasStorageSpaceMediaPlaceMasterAdminArchive()
          );
          break;
        case "storageSpaceMediasPlaceEmployees":
          status = checkPrivilege(hasStorageSpaceMediaPlaceEmployeeArchive());
          break;
        case "storageSpaceMediasPlaceStudents":
          status = checkPrivilege(hasStorageSpaceMediaPlaceStudentArchive());
          break;
        case "storageSpaceMediasPlaceSuppliers":
          status = checkPrivilege(hasStorageSpaceMediaPlaceSupplierArchive());
          break;
        case "storageSpaceMediasPlaceParents":
          status = checkPrivilege(hasStorageSpaceMediaPlaceParentArchive());
          break;
        case "storageSpaceMediasPlaceClients":
          status = checkPrivilege(hasStorageSpaceMediaPlaceClientArchive());
          break;
        case "storageSpaceMediasPlaceOthers":
          status = checkPrivilege(hasStorageSpaceMediaPlaceOtherArchive());
          break;
        default:
          break;
      }
      return status;
    },
    hasPrivilegeBlocked() {
      let status = false;
      switch (this.modelName) {
        case "storageSpaceMediasAdminsEgypt":
          status = checkPrivilege(hasStorageSpaceMediaAdminsEgyptBlocked());
          break;
        case "storageSpaceMediasMasterAdmin":
          status = checkPrivilege(hasStorageSpaceMediaMasterAdminBlocked());
          break;
        case "storageSpaceMediasEmployees":
          status = checkPrivilege(hasStorageSpaceMediaEmployeeBlocked());
          break;
        case "storageSpaceMediasStudents":
          status = checkPrivilege(hasStorageSpaceMediaStudentBlocked());
          break;
        case "storageSpaceMediasSuppliers":
          status = checkPrivilege(hasStorageSpaceMediaSupplierBlocked());
          break;
        case "storageSpaceMediasParents":
          status = checkPrivilege(hasStorageSpaceMediaParentBlocked());
          break;
        case "storageSpaceMediasClients":
          status = checkPrivilege(hasStorageSpaceMediaClientBlocked());
          break;
        case "storageSpaceMediasEducationalGroup":
          status = checkPrivilege(
            hasStorageSpaceMediaEducationalGroupBlocked()
          );
          break;
        // ## place ##
        case "storageSpaceMediasPlaceMasterAdmin":
          status = checkPrivilege(
            hasStorageSpaceMediaPlaceMasterAdminBlocked()
          );
          break;
        case "storageSpaceMediasPlaceEmployees":
          status = checkPrivilege(hasStorageSpaceMediaPlaceEmployeeBlocked());
          break;
        case "storageSpaceMediasPlaceStudents":
          status = checkPrivilege(hasStorageSpaceMediaPlaceStudentBlocked());
          break;
        case "storageSpaceMediasPlaceSuppliers":
          status = checkPrivilege(hasStorageSpaceMediaPlaceSupplierBlocked());
          break;
        case "storageSpaceMediasPlaceParents":
          status = checkPrivilege(hasStorageSpaceMediaPlaceParentBlocked());
          break;
        case "storageSpaceMediasPlaceClients":
          status = checkPrivilege(hasStorageSpaceMediaPlaceClientBlocked());
          break;
        case "storageSpaceMediasPlaceOthers":
          status = checkPrivilege(hasStorageSpaceMediaPlaceOtherBlocked());
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
          token: this.storageSpaceMedia.storageSpaceMediaToken,
          activationTypeToken: this.storageSpaceMedia.activationTypeToken,
          storageSpaceMediaTypeToken:
            this.storageSpaceMedia.storageSpaceMediaTypeToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiStorageSpaceMedia.changeActivationType(
          formData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.hide("StorageSpaceMediaChangeActivationType");
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
