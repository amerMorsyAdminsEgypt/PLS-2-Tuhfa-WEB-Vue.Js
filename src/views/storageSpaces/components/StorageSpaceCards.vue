<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(storageSpace, index) in storageSpacesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="storageSpace.storageSpaceNameCurrent"
      :description="storageSpace.fullCode"
      :imagePath="storageSpace.storageSpaceImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <router-link
          :to="{
            name: storageSpacesMediaRoute,
            params: {
              mainToken: storageSpace.userToken,
              storageSpaceToken: storageSpace.storageSpaceToken,
            },
          }"
          :title="$t('StorageSpaces.open')"
        >
          <img src="@/assets/images/media.svg" />
        </router-link>
      </li>
      <li>
        <button
          :title="$t('info')"
          @click="
            setStorageSpaceData(storageSpace);
            openBottomSheet('StorageSpaceInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setStorageSpaceData(storageSpace);
            openBottomSheet('StorageSpaceQRCode');
          "
          :title="$t('QR.modelName')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="hasPrivilegeEdit">
        <button
          @click="
            setStorageSpaceData(storageSpace);
            openBottomSheet('StorageSpaceUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="hasPrivilegeFinaleDelete">
        <button
          v-b-modal.StorageSpaceDelete
          :title="$t('delete')"
          @click="setStorageSpaceData(storageSpace)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="hasPrivilegeChangeActivationType">
        <button
          v-b-modal.StorageSpaceChangeActivationType
          :title="$t('changeActivationType')"
          @click="setStorageSpaceData(storageSpace)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setStorageSpaceData(storageSpace);
            openBottomSheet('ActionsData');
          "
          :title="$t('actionsData.modelName')"
        >
          <img src="@/assets/images/actions-data.svg" />
        </button>
      </li>
    </CustomCard>
  </div>
</template>

<script>
import {
  checkPrivilege,
  isDataExist,
  fullPathFileFromServer,
} from "./../../../utils/functions";
import {
  hasStorageSpaceAdminsEgyptEdit,
  hasStorageSpaceAdminsEgyptFinaleDelete,
  hasStorageSpaceAdminsEgyptChangeActivationType,
  hasStorageSpaceMasterAdminEdit,
  hasStorageSpaceMasterAdminFinaleDelete,
  hasStorageSpaceMasterAdminChangeActivationType,
  hasStorageSpaceEmployeeEdit,
  hasStorageSpaceEmployeeFinaleDelete,
  hasStorageSpaceEmployeeChangeActivationType,
  hasStorageSpaceStudentEdit,
  hasStorageSpaceStudentFinaleDelete,
  hasStorageSpaceStudentChangeActivationType,
  hasStorageSpaceSupplierEdit,
  hasStorageSpaceSupplierFinaleDelete,
  hasStorageSpaceSupplierChangeActivationType,
  hasStorageSpaceParentEdit,
  hasStorageSpaceParentFinaleDelete,
  hasStorageSpaceParentChangeActivationType,
  hasStorageSpaceClientEdit,
  hasStorageSpaceClientFinaleDelete,
  hasStorageSpaceClientChangeActivationType,
  hasStorageSpaceEducationalGroupEdit,
  hasStorageSpaceEducationalGroupFinaleDelete,
  hasStorageSpaceEducationalGroupChangeActivationType,
  hasStorageSpaceEducationalCategoryEdit,
  hasStorageSpaceEducationalCategoryFinaleDelete,
  hasStorageSpaceEducationalCategoryChangeActivationType,
  // ## place ##
  hasStorageSpacePlaceMasterAdminEdit,
  hasStorageSpacePlaceEmployeeEdit,
  hasStorageSpacePlaceStudentEdit,
  hasStorageSpacePlaceSupplierEdit,
  hasStorageSpacePlaceParentEdit,
  hasStorageSpacePlaceClientEdit,
  hasStorageSpacePlaceOtherEdit,
  hasStorageSpacePlaceMasterAdminFinaleDelete,
  hasStorageSpacePlaceEmployeeFinaleDelete,
  hasStorageSpacePlaceStudentFinaleDelete,
  hasStorageSpacePlaceSupplierFinaleDelete,
  hasStorageSpacePlaceParentFinaleDelete,
  hasStorageSpacePlaceClientFinaleDelete,
  hasStorageSpacePlaceOtherFinaleDelete,
  hasStorageSpacePlaceMasterAdminChangeActivationType,
  hasStorageSpacePlaceEmployeeChangeActivationType,
  hasStorageSpacePlaceStudentChangeActivationType,
  hasStorageSpacePlaceSupplierChangeActivationType,
  hasStorageSpacePlaceParentChangeActivationType,
  hasStorageSpacePlaceClientChangeActivationType,
  hasStorageSpacePlaceOtherChangeActivationType,
} from "./../../../utils/privilegeHelper";
import CustomCard from "./../../../components/general/CustomCard.vue";
import generalMixin from "./../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["storageSpacesData", "filterData", "defaultImg"],
  data() {
    return {
      modelName: this.$route.meta.modelName,
      storageSpacesMediaRoute: this.$route.meta.storageSpacesMediaRoute,
    };
  },
  methods: {
    setStorageSpaceData(storageSpace) {
      this.$emit("setStorageSpaceData", storageSpace);
    },
    isDataExist,
    fullPathFileFromServer,
  },
  computed: {
    hasPrivilegeEdit() {
      let status = false;
      switch (this.modelName) {
        case "storageSpacesAdminsEgypt":
          status = checkPrivilege(hasStorageSpaceAdminsEgyptEdit());
          break;
        case "storageSpacesMasterAdmin":
          status = checkPrivilege(hasStorageSpaceMasterAdminEdit());
          break;
        case "storageSpacesEmployees":
          status = checkPrivilege(hasStorageSpaceEmployeeEdit());
          break;
        case "storageSpacesStudents":
          status = checkPrivilege(hasStorageSpaceStudentEdit());
          break;
        case "storageSpacesSuppliers":
          status = checkPrivilege(hasStorageSpaceSupplierEdit());
          break;
        case "storageSpacesParents":
          status = checkPrivilege(hasStorageSpaceParentEdit());
          break;
        case "storageSpacesClients":
          status = checkPrivilege(hasStorageSpaceClientEdit());
          break;
        case "storageSpacesEducationalGroup":
          status = checkPrivilege(hasStorageSpaceEducationalGroupEdit());
          break;
        case "storageSpacesEducationalCategory":
          status = checkPrivilege(hasStorageSpaceEducationalCategoryEdit());
          break;
        // ## place ##
        case "storageSpacesPlaceMasterAdmin":
          status = checkPrivilege(hasStorageSpacePlaceMasterAdminEdit());
          break;
        case "storageSpacesPlaceEmployees":
          status = checkPrivilege(hasStorageSpacePlaceEmployeeEdit());
          break;
        case "storageSpacesPlaceStudents":
          status = checkPrivilege(hasStorageSpacePlaceStudentEdit());
          break;
        case "storageSpacesPlaceSuppliers":
          status = checkPrivilege(hasStorageSpacePlaceSupplierEdit());
          break;
        case "storageSpacesPlaceParents":
          status = checkPrivilege(hasStorageSpacePlaceParentEdit());
          break;
        case "storageSpacesPlaceClients":
          status = checkPrivilege(hasStorageSpacePlaceClientEdit());
          break;
        case "storageSpacesPlaceOthers":
          status = checkPrivilege(hasStorageSpacePlaceOtherEdit());
          break;
        default:
          break;
      }
      return status;
    },
    hasPrivilegeFinaleDelete() {
      let status = false;
      switch (this.modelName) {
        case "storageSpacesAdminsEgypt":
          status = checkPrivilege(hasStorageSpaceAdminsEgyptFinaleDelete());
          break;
        case "storageSpacesMasterAdmin":
          status = checkPrivilege(hasStorageSpaceMasterAdminFinaleDelete());
          break;
        case "storageSpacesEmployees":
          status = checkPrivilege(hasStorageSpaceEmployeeFinaleDelete());
          break;
        case "storageSpacesStudents":
          status = checkPrivilege(hasStorageSpaceStudentFinaleDelete());
          break;
        case "storageSpacesSuppliers":
          status = checkPrivilege(hasStorageSpaceSupplierFinaleDelete());
          break;
        case "storageSpacesParents":
          status = checkPrivilege(hasStorageSpaceParentFinaleDelete());
          break;
        case "storageSpacesClients":
          status = checkPrivilege(hasStorageSpaceClientFinaleDelete());
          break;
        case "storageSpacesEducationalGroup":
          status = checkPrivilege(
            hasStorageSpaceEducationalGroupFinaleDelete()
          );
          break;
        case "storageSpacesEducationalCategory":
          status = checkPrivilege(
            hasStorageSpaceEducationalCategoryFinaleDelete()
          );
          break;

        // ## place ##
        case "storageSpacesPlaceMasterAdmin":
          status = checkPrivilege(
            hasStorageSpacePlaceMasterAdminFinaleDelete()
          );
          break;
        case "storageSpacesPlaceEmployees":
          status = checkPrivilege(hasStorageSpacePlaceEmployeeFinaleDelete());
          break;
        case "storageSpacesPlaceStudents":
          status = checkPrivilege(hasStorageSpacePlaceStudentFinaleDelete());
          break;
        case "storageSpacesPlaceSuppliers":
          status = checkPrivilege(hasStorageSpacePlaceSupplierFinaleDelete());
          break;
        case "storageSpacesPlaceParents":
          status = checkPrivilege(hasStorageSpacePlaceParentFinaleDelete());
          break;
        case "storageSpacesPlaceClients":
          status = checkPrivilege(hasStorageSpacePlaceClientFinaleDelete());
          break;
        case "storageSpacesPlaceOthers":
          status = checkPrivilege(hasStorageSpacePlaceOtherFinaleDelete());
          break;
        default:
          break;
      }
      return status;
    },
    hasPrivilegeChangeActivationType() {
      let status = false;
      switch (this.modelName) {
        case "storageSpacesAdminsEgypt":
          status = checkPrivilege(
            hasStorageSpaceAdminsEgyptChangeActivationType()
          );
          break;
        case "storageSpacesMasterAdmin":
          status = checkPrivilege(
            hasStorageSpaceMasterAdminChangeActivationType()
          );
          break;
        case "storageSpacesEmployees":
          status = checkPrivilege(
            hasStorageSpaceEmployeeChangeActivationType()
          );
          break;
        case "storageSpacesStudents":
          status = checkPrivilege(hasStorageSpaceStudentChangeActivationType());
          break;
        case "storageSpacesSuppliers":
          status = checkPrivilege(
            hasStorageSpaceSupplierChangeActivationType()
          );
          break;
        case "storageSpacesParents":
          status = checkPrivilege(hasStorageSpaceParentChangeActivationType());
          break;
        case "storageSpacesClients":
          status = checkPrivilege(hasStorageSpaceClientChangeActivationType());
          break;
        case "storageSpacesEducationalGroup":
          status = checkPrivilege(
            hasStorageSpaceEducationalGroupChangeActivationType()
          );
          break;
        case "storageSpacesEducationalCategory":
          status = checkPrivilege(
            hasStorageSpaceEducationalCategoryChangeActivationType()
          );
          break;

        // ## place ##
        case "storageSpacesPlaceMasterAdmin":
          status = checkPrivilege(
            hasStorageSpacePlaceMasterAdminChangeActivationType()
          );
          break;
        case "storageSpacesPlaceEmployees":
          status = checkPrivilege(
            hasStorageSpacePlaceEmployeeChangeActivationType()
          );
          break;
        case "storageSpacesPlaceStudents":
          status = checkPrivilege(
            hasStorageSpacePlaceStudentChangeActivationType()
          );
          break;
        case "storageSpacesPlaceSuppliers":
          status = checkPrivilege(
            hasStorageSpacePlaceSupplierChangeActivationType()
          );
          break;
        case "storageSpacesPlaceParents":
          status = checkPrivilege(
            hasStorageSpacePlaceParentChangeActivationType()
          );
          break;
        case "storageSpacesPlaceClients":
          status = checkPrivilege(
            hasStorageSpacePlaceClientChangeActivationType()
          );
          break;
        case "storageSpacesPlaceOthers":
          status = checkPrivilege(
            hasStorageSpacePlaceOtherChangeActivationType()
          );
          break;
        default:
          break;
      }
      return status;
    },
  },
};
</script>
