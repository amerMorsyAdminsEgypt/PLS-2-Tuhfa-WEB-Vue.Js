<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(userPersonalCard, index) in userPersonalCardsData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="userPersonalCard.userPersonalCardNameCurrent"
      :description="userPersonalCard.fullCode"
      :imagePath="userPersonalCard.userPersonalCardImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setUserPersonalCardData(userPersonalCard);
            openBottomSheet('UserPersonalCardInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setUserPersonalCardData(userPersonalCard);
            openBottomSheet('UserPersonalCardQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="hasPrivilegeEdit">
        <button
          @click="
            setUserPersonalCardData(userPersonalCard);
            openBottomSheet('UserPersonalCardUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="hasPrivilegeFinaleDelete">
        <button
          v-b-modal.UserPersonalCardDelete
          :title="$t('delete')"
          @click="setUserPersonalCardData(userPersonalCard)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="hasPrivilegeChangeActivationType">
        <button
          v-b-modal.UserPersonalCardChangeActivationType
          :title="$t('changeActivationType')"
          @click="setUserPersonalCardData(userPersonalCard)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setUserPersonalCardData(userPersonalCard);
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
import { USER_TYPE } from "./../../../../utils/constantLists";
import {
  checkPrivilege,
  isDataExist,
  fullPathFileFromServer,
} from "./../../../../utils/functions";
import {
  hasAdminsEgyptPersonalCardEdit,
  hasAdminsEgyptPersonalCardFinaleDelete,
  hasAdminsEgyptPersonalCardChangeActivationType,
  hasMasterAdminPersonalCardEdit,
  hasMasterAdminPersonalCardFinaleDelete,
  hasMasterAdminPersonalCardChangeActivationType,
  hasEmployeePersonalCardEdit,
  hasEmployeePersonalCardFinaleDelete,
  hasEmployeePersonalCardChangeActivationType,
  hasStudentPersonalCardEdit,
  hasStudentPersonalCardFinaleDelete,
  hasStudentPersonalCardChangeActivationType,
  hasSupplierPersonalCardEdit,
  hasSupplierPersonalCardFinaleDelete,
  hasSupplierPersonalCardChangeActivationType,
  hasParentPersonalCardEdit,
  hasParentPersonalCardFinaleDelete,
  hasParentPersonalCardChangeActivationType,
  hasClientPersonalCardEdit,
  hasClientPersonalCardFinaleDelete,
  hasClientPersonalCardChangeActivationType,
} from "./../../../../utils/privilegeHelper";
import CustomCard from "./../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["userPersonalCardsData", "filterData", "defaultImg", "userTypeToken"],
  methods: {
    setUserPersonalCardData(userPersonalCard) {
      this.$emit("setUserPersonalCardData", userPersonalCard);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
  },
  computed: {
    hasPrivilegeEdit() {
      let status = false;
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          status = checkPrivilege(hasAdminsEgyptPersonalCardEdit());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminPersonalCardEdit());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeePersonalCardEdit());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentPersonalCardEdit());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierPersonalCardEdit());
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentPersonalCardEdit());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientPersonalCardEdit());
          break;
      }
      return status;
    },
    hasPrivilegeFinaleDelete() {
      let status = false;
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          status = checkPrivilege(hasAdminsEgyptPersonalCardFinaleDelete());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminPersonalCardFinaleDelete());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeePersonalCardFinaleDelete());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentPersonalCardFinaleDelete());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierPersonalCardFinaleDelete());
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentPersonalCardFinaleDelete());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientPersonalCardFinaleDelete());
          break;
      }
      return status;
    },
    hasPrivilegeChangeActivationType() {
      let status = false;
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          status = checkPrivilege(
            hasAdminsEgyptPersonalCardChangeActivationType()
          );
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(
            hasMasterAdminPersonalCardChangeActivationType()
          );
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(
            hasEmployeePersonalCardChangeActivationType()
          );
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentPersonalCardChangeActivationType());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(
            hasSupplierPersonalCardChangeActivationType()
          );
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentPersonalCardChangeActivationType());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientPersonalCardChangeActivationType());
          break;
      }
      return status;
    },
  },
};
</script>
