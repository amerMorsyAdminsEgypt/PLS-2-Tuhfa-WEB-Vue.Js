<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(place, index) in placesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="place.placeNameCurrent"
      :description="place.fullCode"
      :imagePath="place.placeImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li v-if="checkPrivilege(hasPlaceUser())">
        <router-link
          :to="{
            name: 'PlaceUser',
            params: {
              placeTypeToken: place.placeTypeToken,
              placeToken: place.placeToken,
              placeModelName: modelName,
              userTypeToken: ' ',
              userToken: ' ',
              userModelName: ' ',
            },
          }"
          :title="$t('PlaceUsers.modelName')"
        >
          <img src="@/assets/images/users.svg" />
        </router-link>
      </li>
      <li v-if="checkPrivilege(hasEducationalScheduleTimeReport())">
        <button
          @click="
            setPlaceData(place);
            openBottomSheet('EducationalScheduleTimePlaceReportFilter');
          "
          :title="$t('Reports.educationalScheduleTimePlaceReport')"
        >
          <img src="@/assets/images/reports.svg" />
        </button>
      </li>
      <li v-if="place.isHaveChildrenStatus">
        <router-link
          :to="{
            name: childPlaceRoute,
            params: {
              parentPlaceToken: place.placeToken,
            },
          }"
          :title="$t('Places.modelName')"
        >
          <img src="@/assets/images/open.svg" />
        </router-link>
      </li>
      <li v-if="checkPrivilege(hasStorageSpacePlace)">
        <router-link
          :to="{
            name: StorageSpacesPlaceRouteName,
            params: {
              mainToken: place.placeToken,
            },
          }"
          :title="$t('StorageSpaces.modelName')"
        >
          <img src="@/assets/images/StorageSpaces.svg" />
        </router-link>
      </li>
      <li>
        <button
          :title="$t('info')"
          @click="
            setPlaceData(place);
            openBottomSheet('PlaceInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setPlaceData(place);
            openBottomSheet('PlaceQRCode');
          "
          :title="$t('Places.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasPrivilegeEdit)">
        <button
          @click="
            setPlaceData(place);
            openBottomSheet('PlaceUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasPrivilegeFinaleDelete)">
        <button
          v-b-modal.PlaceDelete
          :title="$t('delete')"
          @click="setPlaceData(place)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasPrivilegeChangeActivationType)">
        <button
          v-b-modal.PlaceChangeActivationType
          :title="$t('changeActivationType')"
          @click="setPlaceData(place)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setPlaceData(place);
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
  hasPlaceMasterAdminEdit,
  hasPlaceEmployeeEdit,
  hasPlaceStudentEdit,
  hasPlaceClientEdit,
  hasPlaceSupplierEdit,
  hasPlaceParentEdit,
  hasPlaceOtherEdit,
  hasPlaceMasterAdminFinaleDelete,
  hasPlaceEmployeeFinaleDelete,
  hasPlaceStudentFinaleDelete,
  hasPlaceClientFinaleDelete,
  hasPlaceSupplierFinaleDelete,
  hasPlaceParentFinaleDelete,
  hasPlaceOtherFinaleDelete,
  hasPlaceMasterAdminChangeActivationType,
  hasPlaceEmployeeChangeActivationType,
  hasPlaceStudentChangeActivationType,
  hasPlaceClientChangeActivationType,
  hasPlaceSupplierChangeActivationType,
  hasPlaceParentChangeActivationType,
  hasPlaceOtherChangeActivationType,
  hasStorageSpacePlaceMasterAdmin,
  hasStorageSpacePlaceEmployee,
  hasStorageSpacePlaceStudent,
  hasStorageSpacePlaceSupplier,
  hasStorageSpacePlaceParent,
  hasStorageSpacePlaceClient,
  hasStorageSpacePlaceOther,
  hasEducationalScheduleTimeReport,
  hasPlaceUser,
} from "./../../../utils/privilegeHelper";
import CustomCard from "./../../../components/general/CustomCard.vue";
import generalMixin from "./../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["placesData", "filterData", "defaultImg", "modelName"],
  methods: {
    setPlaceData(place) {
      this.$emit("setPlaceData", place);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasEducationalScheduleTimeReport,
    hasPlaceUser,
  },
  computed: {
    StorageSpacesPlaceRouteName() {
      let route = "";
      switch (this.modelName) {
        case "placeMasterAdmin":
          route = "StorageSpacesPlaceMasterAdmin";
          break;
        case "placeEmployees":
          route = "StorageSpacesPlaceEmployees";
          break;
        case "placeStudents":
          route = "StorageSpacesPlaceStudents";
          break;
        case "placeClients":
          route = "StorageSpacesPlaceClients";
          break;
        case "placeSuppliers":
          route = "StorageSpacesPlaceSuppliers";
          break;
        case "placeParents":
          route = "StorageSpacesPlaceParents";
          break;
        case "placeOthers":
          route = "StorageSpacesPlaceOthers";
          break;
      }
      return route;
    },
    hasStorageSpacePlace() {
      let status = false;
      switch (this.modelName) {
        case "placeMasterAdmin":
          status = checkPrivilege(hasStorageSpacePlaceMasterAdmin());
          break;
        case "placeEmployees":
          status = checkPrivilege(hasStorageSpacePlaceEmployee());
          break;
        case "placeStudents":
          status = checkPrivilege(hasStorageSpacePlaceStudent());
          break;
        case "placeClients":
          status = checkPrivilege(hasStorageSpacePlaceClient());
          break;
        case "placeSuppliers":
          status = checkPrivilege(hasStorageSpacePlaceSupplier());
          break;
        case "placeParents":
          status = checkPrivilege(hasStorageSpacePlaceParent());
          break;
        case "placeOthers":
          status = checkPrivilege(hasStorageSpacePlaceOther());
          break;
      }
      return status;
    },
    childPlaceRoute() {
      let route = "";
      switch (this.modelName) {
        case "placeMasterAdmin":
          route = "PlaceMasterAdmin";
          break;
        case "placeEmployees":
          route = "PlaceEmployees";
          break;
        case "placeStudents":
          route = "PlaceStudents";
          break;
        case "placeClients":
          route = "PlaceClients";
          break;
        case "placeSuppliers":
          route = "PlaceSuppliers";
          break;
        case "placeParents":
          route = "PlaceParents";
          break;
        case "placeOthers":
          route = "PlaceOthers";
          break;
      }
      return route;
    },
    hasPrivilegeEdit() {
      let status = false;
      switch (this.modelName) {
        case "placeMasterAdmin":
          status = checkPrivilege(hasPlaceMasterAdminEdit());
          break;
        case "placeEmployees":
          status = checkPrivilege(hasPlaceEmployeeEdit());
          break;
        case "placeStudents":
          status = checkPrivilege(hasPlaceStudentEdit());
          break;
        case "placeClients":
          status = checkPrivilege(hasPlaceClientEdit());
          break;
        case "placeSuppliers":
          status = checkPrivilege(hasPlaceSupplierEdit());
          break;
        case "placeParents":
          status = checkPrivilege(hasPlaceParentEdit());
          break;
        case "placeOthers":
          status = checkPrivilege(hasPlaceOtherEdit());
          break;
      }
      return status;
    },
    hasPrivilegeFinaleDelete() {
      let status = false;
      switch (this.modelName) {
        case "placeMasterAdmin":
          status = checkPrivilege(hasPlaceMasterAdminFinaleDelete());
          break;
        case "placeEmployees":
          status = checkPrivilege(hasPlaceEmployeeFinaleDelete());
          break;
        case "placeStudents":
          status = checkPrivilege(hasPlaceStudentFinaleDelete());
          break;
        case "placeClients":
          status = checkPrivilege(hasPlaceClientFinaleDelete());
          break;
        case "placeSuppliers":
          status = checkPrivilege(hasPlaceSupplierFinaleDelete());
          break;
        case "placeParents":
          status = checkPrivilege(hasPlaceParentFinaleDelete());
          break;
        case "placeOthers":
          status = checkPrivilege(hasPlaceOtherFinaleDelete());
          break;
      }
      return status;
    },
    hasPrivilegeChangeActivationType() {
      let status = false;
      switch (this.modelName) {
        case "placeMasterAdmin":
          status = checkPrivilege(hasPlaceMasterAdminChangeActivationType());
          break;
        case "placeEmployees":
          status = checkPrivilege(hasPlaceEmployeeChangeActivationType());
          break;
        case "placeStudents":
          status = checkPrivilege(hasPlaceStudentChangeActivationType());
          break;
        case "placeClients":
          status = checkPrivilege(hasPlaceClientChangeActivationType());
          break;
        case "placeSuppliers":
          status = checkPrivilege(hasPlaceSupplierChangeActivationType());
          break;
        case "placeParents":
          status = checkPrivilege(hasPlaceParentChangeActivationType());
          break;
        case "placeOthers":
          status = checkPrivilege(hasPlaceOtherChangeActivationType());
          break;
      }
      return status;
    },
  },
};
</script>
