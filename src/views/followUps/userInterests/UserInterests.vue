<template>
  <div class="">
    <DashboardNavbar
      :btnAddTitle="$t('FollowInterests.add')"
      :btnAddName="'FollowInterestAdd'"
      :btnAddStatus="checkPrivilege(hasFollowInterestAdd())"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <UsersTable
          :usersData="users.usersData"
          :defaultImg="users.user.defaultImg"
          :filterData="users.filterData"
        />

        <!-- <UserInfo :userToken="users.user.userToken" /> -->
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="users.filterData"
        v-on:changePagination="changePagination($event)"
      />

      <FollowInterestAdd
        :followInterest="followInterestModel"
        v-on:refresh="getAllUsers()"
      />
    </div>
  </div>
</template>

<script>
import DashboardNavbar from "./../../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../../components/general/PreLoader.vue";
import UsersTable from "./components/UsersTable.vue";
import ExceptionWithImg from "./../../../components/general/ExceptionWithImg.vue";
import CustomPagination from "./../../../components/general/CustomPagination.vue";
import FollowInterestAdd from "./../followInterests/components/FollowInterestAdd.vue";
import { hasFollowInterestAdd } from "./../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../utils/functions";
import { STATUS } from "./../../../utils/constants";
import FollowInterestModel from "./../../../models/followUps/followInterests/FollowInterestModel";
import Users from "./../../../models/users/Users";
import apiUser from "./../../../api/user";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { USER_TYPE } from "./../../../utils/constantLists";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    UsersTable,
    ExceptionWithImg,
    CustomPagination,
    FollowInterestAdd,
  },
  computed: {
    hasData() {
      return this.users.usersData.length != 0;
    },
  },
  data() {
    return {
      users: new Users("students"),
      followInterestModel: new FollowInterestModel(),
    };
  },
  methods: {
    async getAllUsers() {
      this.isLoading = true;
      try {
        this.users.usersData = [];
        const response = await apiUser.getAll(this.users.filterData);
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = "illustrator-noData.svg";
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = null;
        }
        this.users.fillData(response.data);
      } catch (e) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
    async updateFilterData() {
      this.users.filterData.userInterestStatisticDataInclude = true;
      this.users.filterData.totalCountInterestsFrom = 1;
      this.users.filterData.userTypeToken = USER_TYPE.Student;
      this.users.user.userTypeToken = USER_TYPE.Student;
    },

    checkPrivilege,
    hasFollowInterestAdd,
  },
  async created() {
    this.updateFilterData();
    this.getAllUsers();
  },
  watch: {},
};
</script>
