<template>
  <div class="">
    <DashboardNavbar />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <NotificationsTable
          :notificationsData="this.notifications.notificationsData"
          :notificationData="this.notifications.notification"
          v-on:setNotificationData="
            this.notifications.notification.fillData($event)
          "
          v-on:readNotification="readNotification($event)"
          v-on:readAllNotifications="readAllNotifications()"
        />
        <NotificationBaseInfo :notification="this.notifications.notification" />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="notifications.filterData"
        v-on:changePagination="changePagination($event)"
      />
    </div>
  </div>
</template>

<script>
import { STATUS } from "./../../utils/constants";
import DashboardNavbar from "./../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../components/general/PreLoader.vue";
import NotificationsTable from "./components/NotificationsTable.vue";
import NotificationBaseInfo from "./components/NotificationBaseInfo.vue";
import ExceptionWithImg from "./../../components/general/ExceptionWithImg.vue";
import CustomPagination from "./../../components/general/CustomPagination.vue";
import Notifications from "./../../models/notifications/Notifications";
import apiNotification from "./../../api/notification/notifications";
import generalMixin from "./../../utils/generalMixin";
import generalSettingsMixin from "./../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../utils/functions";
import {
  hasNotificationRead,
  // hasNotificationOpen,
} from "./../../utils/privilegeHelper";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    NotificationsTable,
    NotificationBaseInfo,
    CustomPagination,
  },
  computed: {
    hasData() {
      return this.notifications.notificationsData.length != 0;
    },
  },
  data() {
    return {
      notifications: new Notifications(),
    };
  },
  methods: {
    changePagination(pagination) {
      this.notifications.filterData.fillData(pagination);
      this.getAllNotifications();
    },

    async getAllNotifications() {
      this.isLoading = true;
      try {
        this.notifications.notificationsData = [];
        const response = await apiNotification.getAll(
          this.notifications.filterData
        );
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
        this.notifications.fillData(response.data);
      } catch (error) {
        console.log(error);
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },

    async readAllNotifications() {
      if (checkPrivilege(hasNotificationRead())) {
        this.isLoading = true;
        try {
          let params = {
            statusRead: this.notifications.filterData.statusRead,
          };
          let response = await apiNotification.readAll(params);
          if (response.data.status == STATUS.SUCCESS) {
            this.showMsg(response.data.msg, true);
            this.getAllNotifications();
          } else {
            this.showMsg(response.data.msg);
          }
        } catch (e) {
          this.showMsg(this.$t("errorCatch"));
        }
        this.isLoading = false;
      }
    },

    async readNotification(notification) {
      if (checkPrivilege(hasNotificationRead())) {
        this.isLoading = true;
        try {
          this.notifications.notification.fillData(notification);
          this.notifications.filterData.token =
            this.notifications.notification.notificationToken;
          let params = {
            token: this.notifications.filterData.token,
            statusRead: this.notifications.filterData.statusRead,
          };
          let response = await apiNotification.read(params);
          if (response.data.status == STATUS.SUCCESS) {
            this.openBottomSheet("NotificationBaseInfo");
          }
        } catch (e) {
          this.showMsg(this.$t("errorCatch"));
        }
        this.isLoading = false;
      }
    },
    // goToDetails(notification) {
    //   console.log(notification);
    // },
  },
  async created() {
    this.getAllNotifications();
  },
};
</script>
