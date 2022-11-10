<template>
  <div v-if="userPersonalCardsData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="5">{{ $t("UserPersonalCards.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
          <th class="cell-lg">{{ $t("general.type") }}</th>
          <th class="cell-lg">{{ $t("UserPersonalCards.cardNumber") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(userPersonalCard, index) in userPersonalCardsData"
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  userPersonalCard.userPersonalCardImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(userPersonalCard.fullCode) }}</td>
          <td>
            {{ isDataExist(userPersonalCard.userPersonalCardNameCurrent) }}
          </td>
          <td>
            {{
              isDataExist(
                userPersonalCard.personalCardTypeData
                  .personalCardTypeNameCurrent
              )
            }}
          </td>
          <td>
            {{ isDataExist(userPersonalCard.userPersonalCardNumber) }}
          </td>

          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setUserPersonalCardData(userPersonalCard);
                    openBottomSheet('UserPersonalCardInfo');
                  "
                  :title="$t('info')"
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
            </FloatingMenu>
          </td>
        </tr>
      </tbody>
    </table>
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
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "UserPersonalCardsTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
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
