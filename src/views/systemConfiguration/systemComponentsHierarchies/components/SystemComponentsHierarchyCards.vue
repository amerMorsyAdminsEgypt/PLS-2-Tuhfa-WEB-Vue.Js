<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(
        systemComponentsHierarchy, index
      ) in systemComponentsHierarchiesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="systemComponentsHierarchy.systemComponentsHierarchyNameCurrent"
      :description="systemComponentsHierarchy.fullCode"
      :imagePath="systemComponentsHierarchy.systemComponentsHierarchyImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setSystemComponentsHierarchyData(systemComponentsHierarchy);
            openBottomSheet('SystemComponentsHierarchyInfo');
          "
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
          @click="setSystemComponentsHierarchyData(systemComponentsHierarchy)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="hasPrivilegeChangeActivationType">
        <button
          v-b-modal.SystemComponentsHierarchyChangeActivationType
          :title="$t('changeActivationType')"
          @click="setSystemComponentsHierarchyData(systemComponentsHierarchy)"
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
    </CustomCard>
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
import CustomCard from "./../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
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
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
  },
};
</script>
