<template>
  <div class="">
    <DashboardNavbar
      :btnAddTitle="$t('PlaceUsers.add')"
      :btnAddName="'PlaceUserAdd'"
      :btnAddStatus="checkPrivilege(hasPlaceUserAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <UserCardInfo v-if="isUserMain" :userData="users.user" />
      <PlaceCardInfo v-if="isPlaceMain" :placeData="places.place" />
      <template v-if="hasData">
        <template v-if="isUserMain">
          <PlacesTable
            :placesData="getPlacesList"
            :filterData="placeUsers.filterData"
            v-on:setPlaceUserData="placeUsers.placeUser.fillData($event)"
          />
        </template>
        <template v-if="isPlaceMain">
          <UsersTable
            :usersData="getUsersList"
            :filterData="placeUsers.filterData"
            v-on:setPlaceUserData="placeUsers.placeUser.fillData($event)"
          />
        </template>
        <!-- <ActionsData :actionsData="placeUsers.placeUser" /> -->
        <PlaceUserDelete
          :placeUser="placeUsers.placeUser"
          v-on:refresh="refresh()"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="placeUsers.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <PlaceUserFilter
        :theFilterData="placeUsers.filterData"
        v-on:search="search($event)"
      />

      <PlaceUserAdd
        :placeUser="placeUsers.placeUser"
        :mainModel="isPlaceMain ? 'place' : 'user'"
        :placeModelName="placeModelName"
        :userModelName="userModelName"
        :filterData="placeUsers.filterData"
        v-on:refresh="refresh()"
      />
    </div>
  </div>
</template>

<script>
import { STATUS } from "./../../utils/constants";
import DashboardNavbar from "./../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../components/general/ExceptionWithImg.vue";
// import ActionsData from "./../../components/general/ActionsData.vue";
// import CustomBottomSheetQRCode from "./../../components/general/CustomBottomSheetQRCode.vue";
import CustomPagination from "./../../components/general/CustomPagination.vue";

import generalMixin from "./../../utils/generalMixin";
import generalSettingsMixin from "./../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../utils/functions";
import { hasPlaceUserAdd } from "./../../utils/privilegeHelper";
import { PLACE_TYPE_TOKENS, USER_TYPE } from "./../../utils/constantLists";

import PlaceUsers from "./../../models/placeUsers/PlaceUsers";
import apiPlaceUser from "./../../api/placeUser";
import PlaceUserAdd from "./components/PlaceUserAdd.vue";
import PlaceUserFilter from "./components/PlaceUserFilter.vue";
import PlaceUserDelete from "./components/PlaceUserDelete.vue";
// import PlaceFilter from "./components/PlaceFilter.vue";
import UserCardInfo from "./components/UserCardInfo.vue";
import PlaceCardInfo from "./components/PlaceCardInfo.vue";
import PlacesTable from "./components/PlacesTable.vue";
import UsersTable from "./components/UsersTable.vue";

import Places from "./../../models/places/Places";
import apiPlace from "./../../api/place";
import Users from "./../../models/users/Users";
import apiUser from "./../../api/user";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    // ActionsData,
    // CustomBottomSheetQRCode,
    PlaceUserAdd,
    PlaceUserFilter,
    PlaceUserDelete,
    CustomPagination,
    UserCardInfo,
    PlaceCardInfo,
    PlacesTable,
    UsersTable,
  },
  props: {
    isPlaceMain: {
      type: Boolean,
      default: false,
    },
    isUserMain: {
      type: Boolean,
      default: false,
    },
    placeTypeToken: {
      type: String,
      default: "",
    },
    placeToken: {
      type: String,
      default: "",
    },
    placeModelName: {
      type: String,
      default: "",
    },
    userTypeToken: {
      type: String,
      default: "",
    },
    userToken: {
      type: String,
      default: "",
    },
    userModelName: {
      type: String,
      default: "",
    },
  },
  watch: {},
  computed: {
    hasData() {
      return this.placeUsers.placeUsersData.length != 0;
    },
    getPlacesList() {
      let list = this.placeUsers.placeUsersData.map(function (p) {
        return { ...p.placeInfoData, model: p };
      });
      return list;
    },
    getUsersList() {
      let list = this.placeUsers.placeUsersData.map(function (p) {
        return { ...p.userInfoData, model: p };
      });
      return list;
    },
    getUserTypeToken() {
      let userTypeToken = "";
      switch (this.placeTypeToken) {
        case PLACE_TYPE_TOKENS.MasterAdmin:
          userTypeToken = USER_TYPE.MasterAdmin;
          break;
        case PLACE_TYPE_TOKENS.Employee:
          userTypeToken = USER_TYPE.Employee;
          break;
        case PLACE_TYPE_TOKENS.Student:
          userTypeToken = USER_TYPE.Student;
          break;
        case PLACE_TYPE_TOKENS.Supplier:
          userTypeToken = USER_TYPE.Supplier;
          break;
        case PLACE_TYPE_TOKENS.Parent:
          userTypeToken = USER_TYPE.Parent;
          break;
        case PLACE_TYPE_TOKENS.Client:
          userTypeToken = USER_TYPE.Client;
          break;
        case PLACE_TYPE_TOKENS.VechileOwner:
          userTypeToken = USER_TYPE.VechileOwner;
          break;
        case PLACE_TYPE_TOKENS.Sales:
          userTypeToken = USER_TYPE.Sales;
          break;
        // case PLACE_TYPE_TOKENS.Other:
        //   userTypeToken = USER_TYPE.Other;
        //   break;
      }
      return userTypeToken;
    },
    getPlaceTypeToken() {
      let placeTypeToken = "";
      switch (this.userTypeToken) {
        case USER_TYPE.MasterAdmin:
          placeTypeToken = PLACE_TYPE_TOKENS.MasterAdmin;
          break;
        case USER_TYPE.Employee:
          placeTypeToken = PLACE_TYPE_TOKENS.Employee;
          break;
        case USER_TYPE.Student:
          placeTypeToken = PLACE_TYPE_TOKENS.Student;
          break;
        case USER_TYPE.Supplier:
          placeTypeToken = PLACE_TYPE_TOKENS.Supplier;
          break;
        case USER_TYPE.Parent:
          placeTypeToken = PLACE_TYPE_TOKENS.Parent;
          break;
        case USER_TYPE.Client:
          placeTypeToken = PLACE_TYPE_TOKENS.Client;
          break;
        case USER_TYPE.VechileOwner:
          placeTypeToken = PLACE_TYPE_TOKENS.VechileOwner;
          break;
      }
      return placeTypeToken;
    },
  },
  data() {
    return {
      isLoading: false,
      exceptionMsg: null,
      exceptionImg: null,
      placeUsers: new PlaceUsers(),
      places: new Places(this.placeModelName),
      users: new Users(this.userModelName),
    };
  },

  methods: {
    checkPrivilege,
    hasPlaceUserAdd,
    async changePagination(pagination) {
      this.placeUsers.filterData.fillData(pagination);
      setTimeout(() => {
        this.updateFilterData();
      }, 0);
      setTimeout(() => {
        this.getAllPlaceUsers();
      }, 1);
    },
    refresh() {
      setTimeout(() => {
        this.updateFilterData();
      }, 0);
      setTimeout(() => {
        this.getAllPlaceUsers();
      }, 1);
    },
    search(data) {
      this.placeUsers.filterData.fillData(data);
      this.refresh();
    },
    async getAllPlaceUsers() {
      this.isLoading = true;
      try {
        this.placeUsers.placeUsersData = [];
        const response = await apiPlaceUser.getAll(this.placeUsers.filterData);
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
        } else if (response.data.status == STATUS.NO_INTERNET) {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = "illustrator-noInternet.svg";
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = "illustrator-noData.svg";
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = null;
        }
        this.placeUsers.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
    async updateFilterData() {
      this.placeUsers.placeUser.setInitialValue();
      this.placeUsers.placeUser.placeToken = this.placeToken;
      this.placeUsers.placeUser.userToken = this.userToken;
      this.placeUsers.filterData.placeToken = this.placeToken;
      this.placeUsers.filterData.userToken = this.userToken;
      if (this.isPlaceMain) {
        this.placeUsers.filterData.placeTypeToken = this.placeTypeToken;
        this.placeUsers.filterData.userTypeToken = this.getUserTypeToken;
      } else if (this.isUserMain) {
        this.placeUsers.filterData.userTypeToken = this.userTypeToken;
        this.placeUsers.filterData.placeTypeToken = this.getPlaceTypeToken;
      }
    },

    async getPlaceDetails() {
      this.isLoading = true;
      try {
        this.places.filterData.placeTypeToken =
          this.placeUsers.filterData.placeTypeToken;
        this.places.filterData.token = this.placeUsers.filterData.placeToken;
        const response = await apiPlace.getDetails(this.places.filterData);
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.places.place.fillData(response.data.place);
        } else if (response.data.status == STATUS.NO_INTERNET) {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = "illustrator-noInternet.svg";
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = "illustrator-noData.svg";
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = null;
        }
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
    async getUserDetails() {
      this.isLoading = true;
      try {
        this.users.filterData.userTypeToken =
          this.placeUsers.filterData.userTypeToken;
        this.users.filterData.token = this.placeUsers.filterData.userToken;
        const response = await apiUser.getDetails(this.users.filterData);
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.users.user.fillData(response.data.user);
        } else if (response.data.status == STATUS.NO_INTERNET) {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = "illustrator-noInternet.svg";
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = "illustrator-noData.svg";
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = null;
        }
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    await this.updateFilterData();
    if (this.isUserMain) {
      await this.getUserDetails();
    }
    if (this.isPlaceMain) {
      await this.getPlaceDetails();
    }
    this.getAllPlaceUsers();
  },
};
</script>
