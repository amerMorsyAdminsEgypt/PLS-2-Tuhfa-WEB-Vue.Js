<template>
  <div v-if="storageSpaceMediaData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("StorageSpaces.media.data") }}</th>
          <th rowspan="2">{{ $t("general.showStatus") }}</th>
          <th rowspan="2">{{ $t("general.shareStatus") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(storageSpaceMedia, index) in storageSpaceMediaData"
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table no-border"
              :src="
                fullPathFileFromServer(
                  storageSpaceMedia.storageSpaceMediaFilePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(storageSpaceMedia.fullCode) }}</td>
          <td>
            {{ isDataExist(storageSpaceMedia.storageSpaceMediaNameCurrent) }}
          </td>
          <td>
            {{
              isDataExist(
                storageSpaceMedia.storageSpaceMediaFileShowStatusTypeNameCurrent
              )
            }}
          </td>
          <td>
            <span v-if="storageSpaceMedia.sharedMediaToken">{{
              $t("yes")
            }}</span>
            <span v-else>{{ $t("no") }}</span>
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setStorageSpaceMediaData(storageSpaceMedia);
                    openBottomSheet('StorageSpaceMediaInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setStorageSpaceMediaData(storageSpaceMedia);
                    openBottomSheet('StorageSpaceMediaQRCode');
                  "
                  :title="$t('QR.modelName')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li
                v-if="hasPrivilegeEdit && !storageSpaceMedia.sharedMediaToken"
              >
                <button
                  @click="
                    setStorageSpaceMediaData(storageSpaceMedia);
                    openBottomSheet('StorageSpaceMediaUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>

              <li
                v-if="
                  hasPrivilegeFinaleDelete &&
                  !storageSpaceMedia.sharedMediaToken
                "
              >
                <button
                  v-b-modal.StorageSpaceMediaDelete
                  :title="$t('delete')"
                  @click="setStorageSpaceMediaData(storageSpaceMedia)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li
                v-if="
                  hasPrivilegeChangeActivationType &&
                  !storageSpaceMedia.sharedMediaToken
                "
              >
                <button
                  v-b-modal.StorageSpaceMediaChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setStorageSpaceMediaData(storageSpaceMedia)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setStorageSpaceMediaData(storageSpaceMedia);
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
  hasStorageSpaceMediaAdminsEgyptEdit,
  hasStorageSpaceMediaAdminsEgyptFinaleDelete,
  hasStorageSpaceMediaAdminsEgyptChangeActivationType,
  hasStorageSpaceMediaMasterAdminEdit,
  hasStorageSpaceMediaMasterAdminFinaleDelete,
  hasStorageSpaceMediaMasterAdminChangeActivationType,
  hasStorageSpaceMediaEmployeeEdit,
  hasStorageSpaceMediaEmployeeFinaleDelete,
  hasStorageSpaceMediaEmployeeChangeActivationType,
  hasStorageSpaceMediaStudentEdit,
  hasStorageSpaceMediaStudentFinaleDelete,
  hasStorageSpaceMediaStudentChangeActivationType,
  hasStorageSpaceMediaSupplierEdit,
  hasStorageSpaceMediaSupplierFinaleDelete,
  hasStorageSpaceMediaSupplierChangeActivationType,
  hasStorageSpaceMediaParentEdit,
  hasStorageSpaceMediaParentFinaleDelete,
  hasStorageSpaceMediaParentChangeActivationType,
  hasStorageSpaceMediaClientEdit,
  hasStorageSpaceMediaClientFinaleDelete,
  hasStorageSpaceMediaClientChangeActivationType,
  hasStorageSpaceMediaEducationalGroupEdit,
  hasStorageSpaceMediaEducationalGroupFinaleDelete,
  hasStorageSpaceMediaEducationalGroupChangeActivationType,
  hasStorageSpaceMediaEducationalCategoryEdit,
  hasStorageSpaceMediaEducationalCategoryFinaleDelete,
  hasStorageSpaceMediaEducationalCategoryChangeActivationType,
  // ## place ##
  hasStorageSpaceMediaPlaceMasterAdminEdit,
  hasStorageSpaceMediaPlaceEmployeeEdit,
  hasStorageSpaceMediaPlaceStudentEdit,
  hasStorageSpaceMediaPlaceSupplierEdit,
  hasStorageSpaceMediaPlaceParentEdit,
  hasStorageSpaceMediaPlaceClientEdit,
  hasStorageSpaceMediaPlaceOtherEdit,
  hasStorageSpaceMediaPlaceMasterAdminFinaleDelete,
  hasStorageSpaceMediaPlaceEmployeeFinaleDelete,
  hasStorageSpaceMediaPlaceStudentFinaleDelete,
  hasStorageSpaceMediaPlaceSupplierFinaleDelete,
  hasStorageSpaceMediaPlaceParentFinaleDelete,
  hasStorageSpaceMediaPlaceClientFinaleDelete,
  hasStorageSpaceMediaPlaceOtherFinaleDelete,
  hasStorageSpaceMediaPlaceMasterAdminChangeActivationType,
  hasStorageSpaceMediaPlaceEmployeeChangeActivationType,
  hasStorageSpaceMediaPlaceStudentChangeActivationType,
  hasStorageSpaceMediaPlaceSupplierChangeActivationType,
  hasStorageSpaceMediaPlaceParentChangeActivationType,
  hasStorageSpaceMediaPlaceClientChangeActivationType,
  hasStorageSpaceMediaPlaceOtherChangeActivationType,
} from "./../../../utils/privilegeHelper";
import FloatingMenu from "./../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../utils/generalMixin";

export default {
  name: "StorageSpaceMediasTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["storageSpaceMediaData", "filterData", "defaultImg"],
  data() {
    return {
      modelName: this.$route.meta.modelName,
    };
  },
  methods: {
    setStorageSpaceMediaData(storageSpaceMedia) {
      this.$emit("setStorageSpaceMediaData", storageSpaceMedia);
    },
    isDataExist,
    fullPathFileFromServer,
  },
  computed: {
    hasPrivilegeEdit() {
      let status = false;
      switch (this.modelName) {
        case "storageSpaceMediasAdminsEgypt":
          status = checkPrivilege(hasStorageSpaceMediaAdminsEgyptEdit());
          break;
        case "storageSpaceMediasMasterAdmin":
          status = checkPrivilege(hasStorageSpaceMediaMasterAdminEdit());
          break;
        case "storageSpaceMediasEmployees":
          status = checkPrivilege(hasStorageSpaceMediaEmployeeEdit());
          break;
        case "storageSpaceMediasStudents":
          status = checkPrivilege(hasStorageSpaceMediaStudentEdit());
          break;
        case "storageSpaceMediasSuppliers":
          status = checkPrivilege(hasStorageSpaceMediaSupplierEdit());
          break;
        case "storageSpaceMediasParents":
          status = checkPrivilege(hasStorageSpaceMediaParentEdit());
          break;
        case "storageSpaceMediasClients":
          status = checkPrivilege(hasStorageSpaceMediaClientEdit());
          break;
        case "storageSpaceMediasEducationalGroup":
          status = checkPrivilege(hasStorageSpaceMediaEducationalGroupEdit());
          break;
        case "storageSpaceMediasEducationalCategory":
          status = checkPrivilege(
            hasStorageSpaceMediaEducationalCategoryEdit()
          );
          break;
        // ## place ##
        case "storageSpaceMediasPlaceMasterAdmin":
          status = checkPrivilege(hasStorageSpaceMediaPlaceMasterAdminEdit());
          break;
        case "storageSpaceMediasPlaceEmployees":
          status = checkPrivilege(hasStorageSpaceMediaPlaceEmployeeEdit());
          break;
        case "storageSpaceMediasPlaceStudents":
          status = checkPrivilege(hasStorageSpaceMediaPlaceStudentEdit());
          break;
        case "storageSpaceMediasPlaceSuppliers":
          status = checkPrivilege(hasStorageSpaceMediaPlaceSupplierEdit());
          break;
        case "storageSpaceMediasPlaceParents":
          status = checkPrivilege(hasStorageSpaceMediaPlaceParentEdit());
          break;
        case "storageSpaceMediasPlaceClients":
          status = checkPrivilege(hasStorageSpaceMediaPlaceClientEdit());
          break;
        case "storageSpaceMediasPlaceOthers":
          status = checkPrivilege(hasStorageSpaceMediaPlaceOtherEdit());
          break;
        default:
          break;
      }
      return status;
    },
    hasPrivilegeFinaleDelete() {
      let status = false;
      switch (this.modelName) {
        case "storageSpaceMediasAdminsEgypt":
          status = checkPrivilege(
            hasStorageSpaceMediaAdminsEgyptFinaleDelete()
          );
          break;
        case "storageSpaceMediasMasterAdmin":
          status = checkPrivilege(
            hasStorageSpaceMediaMasterAdminFinaleDelete()
          );
          break;
        case "storageSpaceMediasEmployees":
          status = checkPrivilege(hasStorageSpaceMediaEmployeeFinaleDelete());
          break;
        case "storageSpaceMediasStudents":
          status = checkPrivilege(hasStorageSpaceMediaStudentFinaleDelete());
          break;
        case "storageSpaceMediasSuppliers":
          status = checkPrivilege(hasStorageSpaceMediaSupplierFinaleDelete());
          break;
        case "storageSpaceMediasParents":
          status = checkPrivilege(hasStorageSpaceMediaParentFinaleDelete());
          break;
        case "storageSpaceMediasClients":
          status = checkPrivilege(hasStorageSpaceMediaClientFinaleDelete());
          break;
        case "storageSpaceMediasEducationalGroup":
          status = checkPrivilege(
            hasStorageSpaceMediaEducationalGroupFinaleDelete()
          );
          break;
        case "storageSpaceMediasEducationalCategory":
          status = checkPrivilege(
            hasStorageSpaceMediaEducationalCategoryFinaleDelete()
          );
          break;
        // ## place ##
        case "storageSpaceMediasPlaceMasterAdmin":
          status = checkPrivilege(
            hasStorageSpaceMediaPlaceMasterAdminFinaleDelete()
          );
          break;
        case "storageSpaceMediasPlaceEmployees":
          status = checkPrivilege(
            hasStorageSpaceMediaPlaceEmployeeFinaleDelete()
          );
          break;
        case "storageSpaceMediasPlaceStudents":
          status = checkPrivilege(
            hasStorageSpaceMediaPlaceStudentFinaleDelete()
          );
          break;
        case "storageSpaceMediasPlaceSuppliers":
          status = checkPrivilege(
            hasStorageSpaceMediaPlaceSupplierFinaleDelete()
          );
          break;
        case "storageSpaceMediasPlaceParents":
          status = checkPrivilege(
            hasStorageSpaceMediaPlaceParentFinaleDelete()
          );
          break;
        case "storageSpaceMediasPlaceClients":
          status = checkPrivilege(
            hasStorageSpaceMediaPlaceClientFinaleDelete()
          );
          break;
        case "storageSpaceMediasPlaceOthers":
          status = checkPrivilege(hasStorageSpaceMediaPlaceOtherFinaleDelete());
          break;
        default:
          break;
      }
      return status;
    },
    hasPrivilegeChangeActivationType() {
      let status = false;
      switch (this.modelName) {
        case "storageSpaceMediasAdminsEgypt":
          status = checkPrivilege(
            hasStorageSpaceMediaAdminsEgyptChangeActivationType()
          );
          break;
        case "storageSpaceMediasMasterAdmin":
          status = checkPrivilege(
            hasStorageSpaceMediaMasterAdminChangeActivationType()
          );
          break;
        case "storageSpaceMediasEmployees":
          status = checkPrivilege(
            hasStorageSpaceMediaEmployeeChangeActivationType()
          );
          break;
        case "storageSpaceMediasStudents":
          status = checkPrivilege(
            hasStorageSpaceMediaStudentChangeActivationType()
          );
          break;
        case "storageSpaceMediasSuppliers":
          status = checkPrivilege(
            hasStorageSpaceMediaSupplierChangeActivationType()
          );
          break;
        case "storageSpaceMediasParents":
          status = checkPrivilege(
            hasStorageSpaceMediaParentChangeActivationType()
          );
          break;
        case "storageSpaceMediasClients":
          status = checkPrivilege(
            hasStorageSpaceMediaClientChangeActivationType()
          );
          break;
        case "storageSpaceMediasEducationalGroup":
          status = checkPrivilege(
            hasStorageSpaceMediaEducationalGroupChangeActivationType()
          );
          break;
        case "storageSpaceMediasEducationalCategory":
          status = checkPrivilege(
            hasStorageSpaceMediaEducationalCategoryChangeActivationType()
          );
          break;
        // ## place ##
        case "storageSpaceMediasPlaceMasterAdmin":
          status = checkPrivilege(
            hasStorageSpaceMediaPlaceMasterAdminChangeActivationType()
          );
          break;
        case "storageSpaceMediasPlaceEmployees":
          status = checkPrivilege(
            hasStorageSpaceMediaPlaceEmployeeChangeActivationType()
          );
          break;
        case "storageSpaceMediasPlaceStudents":
          status = checkPrivilege(
            hasStorageSpaceMediaPlaceStudentChangeActivationType()
          );
          break;
        case "storageSpaceMediasPlaceSuppliers":
          status = checkPrivilege(
            hasStorageSpaceMediaPlaceSupplierChangeActivationType()
          );
          break;
        case "storageSpaceMediasPlaceParents":
          status = checkPrivilege(
            hasStorageSpaceMediaPlaceParentChangeActivationType()
          );
          break;
        case "storageSpaceMediasPlaceClients":
          status = checkPrivilege(
            hasStorageSpaceMediaPlaceClientChangeActivationType()
          );
          break;
        case "storageSpaceMediasPlaceOthers":
          status = checkPrivilege(
            hasStorageSpaceMediaPlaceOtherChangeActivationType()
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
