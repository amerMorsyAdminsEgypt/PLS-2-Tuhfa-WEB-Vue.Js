<template>
  <div class="">
    <DashboardNavbar />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <!-- <EducationalScheduleTimeDetailsMainData
          :educationalScheduleTime="educationalScheduleTime"
        /> -->

        <b-tabs>
          <b-tab :title-item-class="'custom-tab-outer-li tab-container-media'">
            <template #title>
              <span
                v-b-popover.hover.bottom="
                  $t('EducationalGroupAttendances.attendWithQR')
                "
              >
                <img :src="qrCodeImg" class="icon-tab" />
                <span>{{
                  $t("EducationalGroupAttendances.attendWithQR")
                }}</span>
              </span>
            </template>
            <EducationalScheduleTimeDetailsQRCodeAttend
              v-on:refresh="getEducationalScheduleTimeDetails()"
              :educationalScheduleTime="educationalScheduleTime"
              :withPayment="withPayment"
            />
          </b-tab>
          <b-tab :title-item-class="'custom-tab-outer-li tab-container-media'">
            <template #title>
              <span v-b-popover.hover.bottom="$t('students.modelName')">
                <!-- <b-badge variant="danger" class="count-notifications">{{
                  educationalScheduleTime.studentsData.length
                }}</b-badge> -->
                <img :src="studentsImg" class="icon-tab" />
                <span>{{ $t("students.modelName") }}</span>
              </span>
            </template>
            <EducationalScheduleTimeDetailsUserTable
              v-if="educationalScheduleTime.studentsData.length > 0"
              v-on:setEducationalGroupAttendanceData="
                educationalGroupAttendance.fillData($event)
              "
              v-on:refresh="getEducationalScheduleTimeDetails()"
              :educationalScheduleTime="educationalScheduleTime"
              :usersData="educationalScheduleTime.studentsData"
              :defaultImg="studentsImg"
              :studentsStatus="true"
              :withPayment="withPayment"
            />
            <ExceptionWithImg v-else :msg="$t('students.thereAreNoOne')" />
          </b-tab>
          <b-tab
            v-if="!withPayment"
            :title-item-class="'custom-tab-outer-li tab-container-media'"
          >
            <template #title>
              <span v-b-popover.hover.bottom="$t('employees.modelName')">
                <!-- <b-badge variant="danger" class="count-notifications">{{
                  educationalScheduleTime.employeesData.length
                }}</b-badge> -->
                <img :src="employeesImg" class="icon-tab" />
                <span>{{ $t("employees.modelName") }}</span>
              </span>
            </template>
            <EducationalScheduleTimeDetailsUserTable
              v-if="educationalScheduleTime.employeesData.length > 0"
              v-on:setEducationalGroupAttendanceData="
                educationalGroupAttendance.fillData($event)
              "
              v-on:refresh="getEducationalScheduleTimeDetails()"
              :educationalScheduleTime="educationalScheduleTime"
              :usersData="educationalScheduleTime.employeesData"
              :defaultImg="employeesImg"
              :employeesStatus="true"
            />
            <ExceptionWithImg v-else :msg="$t('employees.thereAreNoOne')" />
          </b-tab>
        </b-tabs>
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />

      <EducationalGroupAttendanceUpdate
        :educationalGroupAttendance="educationalGroupAttendance"
        v-on:refresh="getEducationalScheduleTimeDetails()"
      />
      <EducationalGroupAttendanceDelete
        :educationalGroupAttendance="educationalGroupAttendance"
        v-on:refresh="getEducationalScheduleTimeDetails()"
      />
    </div>
  </div>
</template>

<script>
import { STATUS } from "./../../../utils/constants";
import DashboardNavbar from "./../../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../components/general/ExceptionWithImg.vue";
// import EducationalScheduleTimeDetailsMainData from "./components/EducationalScheduleTimeDetailsMainData.vue";
import EducationalScheduleTimeDetailsUserTable from "./components/EducationalScheduleTimeDetailsUserTable.vue";
import EducationalScheduleTimeDetailsQRCodeAttend from "./components/EducationalScheduleTimeDetailsQRCodeAttend.vue";
import EducationalScheduleTime from "./../../../models/educational/educationalScheduleTimes/EducationalScheduleTime";
import apiEducationalScheduleTime from "./../../../api/educational/educationalScheduleTimes";
import EducationalGroupAttendanceUpdate from "./../educationalGroupAttendances/components/EducationalGroupAttendanceUpdate.vue";
import EducationalGroupAttendanceDelete from "./../educationalGroupAttendances/components/EducationalGroupAttendanceDelete.vue";
import EducationalGroupAttendanceModelUpdate from "./../../../models/educational/educationalGroupAttendances/EducationalGroupAttendanceModelUpdate";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../utils/functions";
import { hasEducationalScheduleTimeAdd } from "./../../../utils/privilegeHelper";
import employeesImg from "@/assets/images/employees.svg";
import studentsImg from "@/assets/images/students.svg";
import qrCodeImg from "@/assets/images/qr-code.svg";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    // EducationalScheduleTimeDetailsMainData,
    EducationalScheduleTimeDetailsUserTable,
    EducationalScheduleTimeDetailsQRCodeAttend,
    EducationalGroupAttendanceUpdate,
    EducationalGroupAttendanceDelete,
  },
  props: {
    educationalScheduleTimeToken: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      educationalScheduleTime: new EducationalScheduleTime(),
      educationalGroupAttendance: new EducationalGroupAttendanceModelUpdate(),
      hasData: false,
      // withPayment: this.$route.meta.withPayment,
      withPayment: "",
      employeesImg,
      studentsImg,
      qrCodeImg,
    };
  },
  methods: {
    checkPrivilege,
    hasEducationalScheduleTimeAdd,
    async getEducationalScheduleTimeDetails() {
      this.isLoading = true;
      this.hasData = false;
      try {
        this.educationalScheduleTime.setInitialValue();
        const response = await apiEducationalScheduleTime.getDetails({
          token: this.educationalScheduleTimeToken,
        });
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.hasData = true;
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
        this.educationalScheduleTime.fillData(
          response.data.educationalScheduleTime
        );
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.withPayment = this.$route.meta.withPayment;
    this.getEducationalScheduleTimeDetails();
  },
};
</script>
