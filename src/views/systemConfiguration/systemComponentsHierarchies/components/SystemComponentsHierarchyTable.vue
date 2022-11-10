<template>
  <div v-if="systemComponentsHierarchiesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("SystemComponentsHierarchies.data") }}</th>
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
          v-for="(
            systemComponentsHierarchy, index
          ) in systemComponentsHierarchiesData"
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  systemComponentsHierarchy.systemComponentsHierarchyImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(systemComponentsHierarchy.fullCode) }}</td>
          <td>
            {{
              isDataExist(
                systemComponentsHierarchy.systemComponentsHierarchyNameCurrent
              )
            }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setSystemComponentsHierarchyData(systemComponentsHierarchy);
                    openBottomSheet('SystemComponentsHierarchyInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setSystemComponentsHierarchyData(systemComponentsHierarchy);
                    openBottomSheet('SystemComponentsHierarchyQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="hasPrivilegeEdit">
                <button
                  @click="
                    setSystemComponentsHierarchyData(systemComponentsHierarchy);
                    openBottomSheet('SystemComponentsHierarchyUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="hasPrivilegeFinaleDelete">
                <button
                  v-b-modal.SystemComponentsHierarchyDelete
                  :title="$t('delete')"
                  @click="
                    setSystemComponentsHierarchyData(systemComponentsHierarchy)
                  "
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li v-if="hasPrivilegeChangeActivationType">
                <button
                  v-b-modal.SystemComponentsHierarchyChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="
                    setSystemComponentsHierarchyData(systemComponentsHierarchy)
                  "
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setSystemComponentsHierarchyData(systemComponentsHierarchy);
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
} from "./../../../../utils/functions";
import {
  hasSystemComponentsHierarchyPlaceEdit,
  hasSystemComponentsHierarchyEducationalCategoryEdit,
  hasSystemComponentsHierarchyGeographicalDistributionEdit,
  hasSystemComponentsHierarchyJobGradeEdit,
  hasSystemComponentsHierarchyStoreItemEdit,
  hasSystemComponentsHierarchyBodyPartEdit,
  hasSystemComponentsHierarchyPlaceFinaleDelete,
  hasSystemComponentsHierarchyEducationalCategoryFinaleDelete,
  hasSystemComponentsHierarchyGeographicalDistributionFinaleDelete,
  hasSystemComponentsHierarchyJobGradeFinaleDelete,
  hasSystemComponentsHierarchyStoreItemFinaleDelete,
  hasSystemComponentsHierarchyBodyPartFinaleDelete,
  hasSystemComponentsHierarchyPlaceChangeActivationType,
  hasSystemComponentsHierarchyEducationalCategoryChangeActivationType,
  hasSystemComponentsHierarchyGeographicalDistributionChangeActivationType,
  hasSystemComponentsHierarchyJobGradeChangeActivationType,
  hasSystemComponentsHierarchyStoreItemChangeActivationType,
  hasSystemComponentsHierarchyBodyPartChangeActivationType,
} from "./../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "SystemComponentsHierarchiesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: [
    "systemComponentsHierarchiesData",
    "filterData",
    "defaultImg",
    "modelName",
  ],
  computed: {
    hasPrivilegeEdit() {
      let status = false;
      switch (this.modelName) {
        case "systemComponentsHierarchyPlace":
          status = checkPrivilege(hasSystemComponentsHierarchyPlaceEdit());
          break;
        case "systemComponentsHierarchyEducationalCategory":
          status = checkPrivilege(
            hasSystemComponentsHierarchyEducationalCategoryEdit()
          );
          break;
        case "systemComponentsHierarchyGeographicalDistribution":
          status = checkPrivilege(
            hasSystemComponentsHierarchyGeographicalDistributionEdit()
          );
          break;
        case "systemComponentsHierarchyJobGrade":
          status = checkPrivilege(hasSystemComponentsHierarchyJobGradeEdit());
          break;
        case "systemComponentsHierarchyStoreItem":
          status = checkPrivilege(hasSystemComponentsHierarchyStoreItemEdit());
          break;
        case "systemComponentsHierarchyBodyPart":
          status = checkPrivilege(hasSystemComponentsHierarchyBodyPartEdit());
          break;
      }
      return status;
    },
    hasPrivilegeFinaleDelete() {
      let status = false;
      switch (this.modelName) {
        case "systemComponentsHierarchyPlace":
          status = checkPrivilege(
            hasSystemComponentsHierarchyPlaceFinaleDelete()
          );
          break;
        case "systemComponentsHierarchyEducationalCategory":
          status = checkPrivilege(
            hasSystemComponentsHierarchyEducationalCategoryFinaleDelete()
          );
          break;
        case "systemComponentsHierarchyGeographicalDistribution":
          status = checkPrivilege(
            hasSystemComponentsHierarchyGeographicalDistributionFinaleDelete()
          );
          break;
        case "systemComponentsHierarchyJobGrade":
          status = checkPrivilege(
            hasSystemComponentsHierarchyJobGradeFinaleDelete()
          );
          break;
        case "systemComponentsHierarchyStoreItem":
          status = checkPrivilege(
            hasSystemComponentsHierarchyStoreItemFinaleDelete()
          );
          break;
        case "systemComponentsHierarchyBodyPart":
          status = checkPrivilege(
            hasSystemComponentsHierarchyBodyPartFinaleDelete()
          );
          break;
      }
      return status;
    },
    hasPrivilegeChangeActivationType() {
      let status = false;
      switch (this.modelName) {
        case "systemComponentsHierarchyPlace":
          status = checkPrivilege(
            hasSystemComponentsHierarchyPlaceChangeActivationType()
          );
          break;
        case "systemComponentsHierarchyEducationalCategory":
          status = checkPrivilege(
            hasSystemComponentsHierarchyEducationalCategoryChangeActivationType()
          );
          break;
        case "systemComponentsHierarchyGeographicalDistribution":
          status = checkPrivilege(
            hasSystemComponentsHierarchyGeographicalDistributionChangeActivationType()
          );
          break;
        case "systemComponentsHierarchyJobGrade":
          status = checkPrivilege(
            hasSystemComponentsHierarchyJobGradeChangeActivationType()
          );
          break;
        case "systemComponentsHierarchyStoreItem":
          status = checkPrivilege(
            hasSystemComponentsHierarchyStoreItemChangeActivationType()
          );
          break;
        case "systemComponentsHierarchyBodyPart":
          status = checkPrivilege(
            hasSystemComponentsHierarchyBodyPartChangeActivationType()
          );
          break;
      }
      return status;
    },
  },
  methods: {
    setSystemComponentsHierarchyData(systemComponentsHierarchy) {
      this.$emit("setSystemComponentsHierarchyData", systemComponentsHierarchy);
    },
    isDataExist,
    fullPathFileFromServer,
  },
};
</script>
