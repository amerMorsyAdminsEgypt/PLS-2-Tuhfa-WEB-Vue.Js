<template>
  <div v-if="storageSpacesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("StorageSpaces.data") }}</th>
          <th rowspan="2">{{ $t("general.showStatus") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(storageSpace, index) in storageSpacesData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table no-border"
              :src="
                fullPathFileFromServer(
                  storageSpace.storageSpaceImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(storageSpace.fullCode) }}</td>
          <td>
            {{ isDataExist(storageSpace.storageSpaceNameCurrent) }}
          </td>
          <td>
            {{
              isDataExist(storageSpace.storageSpaceShowStatusTypeNameCurrent)
            }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <router-link
                  :to="{
                    name: storageSpacesMediaRoute,
                    params: {
                      mainToken: storageSpace.userToken || ' ',
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
                  @click="
                    setStorageSpaceData(storageSpace);
                    openBottomSheet('StorageSpaceInfo');
                  "
                  :title="$t('info')"
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
import FloatingMenu from "./../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../utils/generalMixin";

export default {
  name: "StorageSpacesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
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
