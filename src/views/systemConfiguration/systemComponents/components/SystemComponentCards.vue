<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(systemComponent, index) in systemComponentsData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="systemComponent.systemComponentNameCurrent"
      :description="systemComponent.fullCode"
      :imagePath="systemComponent.systemComponentImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setSystemComponentData(systemComponent);
            openBottomSheet('SystemComponentInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setSystemComponentData(systemComponent);
            openBottomSheet('SystemComponentQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="hasPrivilegeEdit">
        <button
          @click="
            setSystemComponentData(systemComponent);
            openBottomSheet('SystemComponentUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="hasPrivilegeFinaleDelete">
        <button
          v-b-modal.SystemComponentDelete
          :title="$t('delete')"
          @click="setSystemComponentData(systemComponent)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="hasPrivilegeChangeActivationType">
        <button
          v-b-modal.SystemComponentChangeActivationType
          :title="$t('changeActivationType')"
          @click="setSystemComponentData(systemComponent)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setSystemComponentData(systemComponent);
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
  hasSystemComponentPlaceEdit,
  hasSystemComponentEducationalCategoryEdit,
  hasSystemComponentGeographicalDistributionEdit,
  hasSystemComponentJobGradeEdit,
  hasSystemComponentStoreItemEdit,
  hasSystemComponentBodyPartEdit,
  hasSystemComponentPlaceFinaleDelete,
  hasSystemComponentEducationalCategoryFinaleDelete,
  hasSystemComponentGeographicalDistributionFinaleDelete,
  hasSystemComponentJobGradeFinaleDelete,
  hasSystemComponentStoreItemFinaleDelete,
  hasSystemComponentBodyPartFinaleDelete,
  hasSystemComponentPlaceChangeActivationType,
  hasSystemComponentEducationalCategoryChangeActivationType,
  hasSystemComponentGeographicalDistributionChangeActivationType,
  hasSystemComponentJobGradeChangeActivationType,
  hasSystemComponentStoreItemChangeActivationType,
  hasSystemComponentBodyPartChangeActivationType,
} from "./../../../../utils/privilegeHelper";
import CustomCard from "./../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["systemComponentsData", "filterData", "defaultImg", "modelName"],
  computed: {
    hasPrivilegeEdit() {
      let status = false;
      switch (this.modelName) {
        case "systemComponentPlace":
          status = checkPrivilege(hasSystemComponentPlaceEdit());
          break;
        case "systemComponentEducationalCategory":
          status = checkPrivilege(hasSystemComponentEducationalCategoryEdit());
          break;
        case "systemComponentGeographicalDistribution":
          status = checkPrivilege(
            hasSystemComponentGeographicalDistributionEdit()
          );
          break;
        case "systemComponentJobGrade":
          status = checkPrivilege(hasSystemComponentJobGradeEdit());
          break;
        case "systemComponentStoreItem":
          status = checkPrivilege(hasSystemComponentStoreItemEdit());
          break;
        case "systemComponentBodyPart":
          status = checkPrivilege(hasSystemComponentBodyPartEdit());
          break;
      }
      return status;
    },
    hasPrivilegeFinaleDelete() {
      let status = false;
      switch (this.modelName) {
        case "systemComponentPlace":
          status = checkPrivilege(hasSystemComponentPlaceFinaleDelete());
          break;
        case "systemComponentEducationalCategory":
          status = checkPrivilege(
            hasSystemComponentEducationalCategoryFinaleDelete()
          );
          break;
        case "systemComponentGeographicalDistribution":
          status = checkPrivilege(
            hasSystemComponentGeographicalDistributionFinaleDelete()
          );
          break;
        case "systemComponentJobGrade":
          status = checkPrivilege(hasSystemComponentJobGradeFinaleDelete());
          break;
        case "systemComponentStoreItem":
          status = checkPrivilege(hasSystemComponentStoreItemFinaleDelete());
          break;
        case "systemComponentBodyPart":
          status = checkPrivilege(hasSystemComponentBodyPartFinaleDelete());
          break;
      }
      return status;
    },
    hasPrivilegeChangeActivationType() {
      let status = false;
      switch (this.modelName) {
        case "systemComponentPlace":
          status = checkPrivilege(
            hasSystemComponentPlaceChangeActivationType()
          );
          break;
        case "systemComponentEducationalCategory":
          status = checkPrivilege(
            hasSystemComponentEducationalCategoryChangeActivationType()
          );
          break;
        case "systemComponentGeographicalDistribution":
          status = checkPrivilege(
            hasSystemComponentGeographicalDistributionChangeActivationType()
          );
          break;
        case "systemComponentJobGrade":
          status = checkPrivilege(
            hasSystemComponentJobGradeChangeActivationType()
          );
          break;
        case "systemComponentStoreItem":
          status = checkPrivilege(
            hasSystemComponentStoreItemChangeActivationType()
          );
          break;
        case "systemComponentBodyPart":
          status = checkPrivilege(
            hasSystemComponentBodyPartChangeActivationType()
          );
          break;
      }
      return status;
    },
  },
  methods: {
    setSystemComponentData(systemComponent) {
      this.$emit("setSystemComponentData", systemComponent);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
  },
};
</script>
