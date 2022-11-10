<template>
  <div v-if="usersData" class="table-container-custom">
    <PreLoader v-if="isLoading" />

    <div class="row">
      <DataLabelGroup
        :className="'col-lg-5 col-md-4'"
        :value="
          educationalScheduleTime.educationalGroupInfoData
            .educationalGroupNameCurrent
        "
        :title="$t('EducationalGroups.name')"
        :imgName="'EducationalGroups.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-5 col-md-4'"
        :value="educationalScheduleTime.placeInfoData.placeNameCurrent"
        :title="$t('Places.name')"
        :imgName="'places.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-2 col-md-4'"
        :value="educationalScheduleTime.appointmentTypeNameCurrent"
        :title="$t('ConstantsListSelect.AppointmentTypesName')"
        :imgName="'AppointmentTypes.svg'"
      />
      <template v-if="withPayment">
        <CustomSelectBox
          :className="'col-md-9'"
          :id="`priceListToken`"
          :value="educationalGroupAttendance.priceListToken"
          :options="priceListTokenOptions"
          v-on:changeValue="educationalGroupAttendance.priceListToken = $event"
          :title="$t('PriceLists.select')"
          :imgName="'PriceLists.svg'"
        />
        <CustomCheckbox
          :className="'col-md-3'"
          :value="educationalGroupAttendance.payMoneyInAttendanceStatus"
          v-on:changeValue="
            educationalGroupAttendance.payMoneyInAttendanceStatus = $event
          "
          :title="$t('EducationalGroupAttendances.payMoneyInAttendance')"
        />
        <template v-if="educationalGroupAttendance.payMoneyInAttendanceStatus">
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`accountToken`"
            :value="educationalGroupAttendance.accountToken"
            :options="accountTokenOptions"
            v-on:changeValue="educationalGroupAttendance.accountToken = $event"
            :title="$t('Accounts.select')"
            :imgName="'accounts.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`paymentMethodToken`"
            :value="educationalGroupAttendance.paymentMethodToken"
            :options="paymentMethodTokenOptions"
            v-on:changeValue="
              educationalGroupAttendance.paymentMethodToken = $event
            "
            :title="$t('PaymentMethods.select')"
            :imgName="'paymentMethods.svg'"
          />
        </template>
      </template>

      <DateTimePicker
        class="col-lg-5 col-md-4"
        :id="`${employeesStatus ? 'employee' : 'student'}-attendFromDateTime`"
        type="dateTime"
        :value="educationalScheduleTime.dateTimeFrom"
        :title="$t('from')"
        v-on:changeValue="
          educationalScheduleTime.dateTimeFrom = $event.dateTime
        "
        :language="language"
      />
      <DateTimePicker
        class="col-lg-5 col-md-4"
        :id="`${employeesStatus ? 'employee' : 'student'}-attendToDateTime`"
        type="dateTime"
        :value="educationalScheduleTime.dateTimeTo"
        :title="$t('to')"
        v-on:changeValue="educationalScheduleTime.dateTimeTo = $event.dateTime"
        :language="language"
      />
      <button
        :disabled="!hasDataFiltered"
        name="submit"
        type="submit"
        class="col-lg-2 col-md-4 btn btn-submit"
        @click.prevent="addEducationalGroupAttendance"
      >
        {{ $t("EducationalGroupAttendances.attend") }}
      </button>
    </div>

    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th rowspan="2">
            <input
              v-if="hasDataFiltered"
              type="checkbox"
              id="selectAll"
              @click="selectAll('attendance')"
              v-model="attendanceSelectedAll"
              class="checkbox"
            />
            {{ $t("EducationalGroupAttendances.attendance") }}
          </th>
          <th rowspan="2">
            <input
              v-if="hasDataFiltered"
              type="checkbox"
              id="selectAll"
              @click="selectAll('absence')"
              v-model="absenceSelectedAll"
              class="checkbox"
            />
            {{ $t("EducationalGroupAttendances.absence") }}
          </th>
          <template v-if="studentsStatus">
            <th rowspan="2">
              {{ $t("ConstantsListSelect.SubscriptionTypesName") }}
            </th>
            <th rowspan="2">
              {{
                $t(
                  "EducationalJoiningApplications.subscriptionRemaningSessionsNumber"
                )
              }}
            </th>
          </template>
          <th colspan="3">{{ $t("Users.data") }}</th>
          <th rowspan="2">
            {{ $t("ConstantsListSelect.AttendanceTypesName") }}
          </th>
          <th colspan="3">{{ $t("EducationalScheduleTimes.dateTime") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th>{{ $t("general.name") }}</th>
          <th>{{ $t("EducationalScheduleTimes.from") }}</th>
          <th>{{ $t("EducationalScheduleTimes.to") }}</th>
          <th>{{ $t("EducationalScheduleTimes.duration") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in filteredUsersData" :key="index">
          <!-- <template
            v-if="
              studentsStatus &&
              user.activeSubscriptionData &&
              user.activeSubscriptionData.canAttendaceStatus == false
            "
          >
            <td class="bg-red">{{ ++index }}</td>
            <td colspan="2" class="cell-max-md">
              {{
                user.activeSubscriptionData.errorCannotAttendanceReasonCurrent
              }}
            </td>
          </template>
          <template v-else> -->
          <td>{{ ++index }}</td>
          <td>
            <input
              v-if="
                user.attendanceTypeToken == ATTENDANCE_TYPE.Unknown &&
                checkPrivilege(hasEducationalGroupAttendanceAdd())
              "
              type="checkbox"
              v-model="attendanceTokens"
              :value="
                employeesStatus ? user.employeeUserToken : user.studentUserToken
              "
              @click="
                select(
                  'attendance',
                  employeesStatus
                    ? user.employeeUserToken
                    : user.studentUserToken
                )
              "
              class="checkbox"
            />
            <span v-else>-</span>
          </td>
          <td>
            <input
              v-if="
                user.attendanceTypeToken == ATTENDANCE_TYPE.Unknown &&
                checkPrivilege(hasEducationalGroupAttendanceAdd())
              "
              type="checkbox"
              v-model="absenceTokens"
              :value="
                employeesStatus ? user.employeeUserToken : user.studentUserToken
              "
              @click="
                select(
                  'absence',
                  employeesStatus
                    ? user.employeeUserToken
                    : user.studentUserToken
                )
              "
              class="checkbox"
            />
            <span v-else>-</span>
          </td>
          <!-- </template> -->
          <template v-if="studentsStatus">
            <td>
              {{
                isDataExist(
                  user.activeSubscriptionData
                    ? user.activeSubscriptionData.subscriptionTypeNameCurrent
                    : ""
                )
              }}
            </td>
            <td>
              {{
                user.activeSubscriptionData &&
                user.activeSubscriptionData.subscriptionTypeToken ==
                  SUBSCRIPTION_TYPE_TOKENS.Session
                  ? isDataExist(
                      user.activeSubscriptionData
                        .subscriptionRemaningSessionsNumberCount
                    )
                  : "-"
              }}
            </td>
          </template>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  employeesStatus
                    ? user.employeeUserInfoData.userImagePath
                    : user.studentUserInfoData.userImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>
            {{
              isDataExist(
                employeesStatus
                  ? user.employeeUserInfoData.fullCode
                  : user.studentUserInfoData.fullCode
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                employeesStatus
                  ? user.employeeUserInfoData.userNameCurrent
                  : user.studentUserInfoData.userNameCurrent
              )
            }}
          </td>
          <td>{{ isDataExist(user.attendanceTypeNameCurrent) }}</td>
          <td>
            {{
              formateDateTimeLang(
                user.attendanceFromDate,
                user.attendanceFromTime
              )
            }}
          </td>
          <td>
            {{
              formateDateTimeLang(user.attendanceToDate, user.attendanceToTime)
            }}
          </td>
          <td>{{ isDataExist(user.durationCurrent) }}</td>
          <td class="fmenu-item-container">
            <FloatingMenu
              v-if="user.attendanceTypeToken != ATTENDANCE_TYPE.Unknown"
            >
              <li v-if="checkPrivilege(hasEducationalGroupAttendanceEdit())">
                <button
                  @click="
                    setEducationalGroupAttendanceData(user);
                    openBottomSheet('EducationalGroupAttendanceUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li
                v-if="
                  checkPrivilege(hasEducationalGroupAttendanceFinaleDelete())
                "
              >
                <button
                  v-b-modal.EducationalGroupAttendanceDelete
                  :title="$t('delete')"
                  @click="setEducationalGroupAttendanceData(user)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
            </FloatingMenu>
            <span v-else>-</span>
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
  formateDateTimeLang,
  fullPathFileFromServer,
  getLanguage,
} from "./../../../../utils/functions";
import {
  ATTENDANCE_TYPE,
  SUBSCRIPTION_TYPE_TOKENS,
} from "./../../../../utils/constantLists";
import {
  hasEducationalGroupAttendanceAdd,
  hasEducationalGroupAttendanceEdit,
  hasEducationalGroupAttendanceFinaleDelete,
} from "./../../../../utils/privilegeHelper";
import { STATUS } from "./../../../../utils/constants";
import PreLoader from "./../../../../components/general/PreLoader.vue";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";
import DateTimePicker from "./../../../../components/general/DateTimePicker.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import CustomCheckbox from "./../../../../components/general/CustomCheckbox.vue";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import EducationalGroupAttendanceModel from "./../../../../models/educational/educationalGroupAttendances/EducationalGroupAttendanceModel";
import apiEducationalGroupAttendance from "./../../../../api/educational/educationalGroupAttendances";
import generalMixin from "./../../../../utils/generalMixin";
import {
  getPriceListsDialog,
  getAccountsDialog,
  getPaymentMethodsDialog,
} from "./../../../../utils/dialogsOfApi";

export default {
  name: "EducationalScheduleTimesTable",
  mixins: [generalMixin],
  components: {
    PreLoader,
    DataLabelGroup,
    DateTimePicker,
    CustomSelectBox,
    CustomCheckbox,
    FloatingMenu,
  },
  props: {
    educationalScheduleTime: { type: Object },
    usersData: { type: Array, default: () => [] },
    defaultImg: { type: String, default: "" },
    employeesStatus: { type: Boolean, default: false },
    studentsStatus: { type: Boolean, default: false },
    withPayment: { type: Boolean, default: false },
  },
  data() {
    return {
      language: getLanguage(),
      attendFromDateTime: "",
      attendToDateTime: "",
      attendanceSelectedAll: false,
      attendanceTokens: [],
      absenceSelectedAll: false,
      absenceTokens: [],
      filteredUsersData: [],
      usersDataFiltered: [],
      educationalGroupAttendance: new EducationalGroupAttendanceModel(),
      ATTENDANCE_TYPE,
      SUBSCRIPTION_TYPE_TOKENS,
      priceListTokenOptions: [],
      accountTokenOptions: [],
      paymentMethodTokenOptions: [],
    };
  },
  computed: {
    hasDataFiltered() {
      return (
        this.usersDataFiltered.length > 0 &&
        checkPrivilege(hasEducationalGroupAttendanceAdd())
      );
    },
  },
  methods: {
    async getPriceListsDialog() {
      this.isLoading = true;
      this.priceListTokenOptions = await getPriceListsDialog();
      this.isLoading = false;
    },
    async getAccountsDialog() {
      this.$emit("isLoading", true);
      this.accountTokenOptions = await getAccountsDialog();
      this.$emit("isLoading", false);
    },
    async getPaymentMethodsDialog() {
      this.$emit("isLoading", true);
      this.paymentMethodTokenOptions = await getPaymentMethodsDialog();
      this.$emit("isLoading", false);
    },
    selectAll(status = "") {
      this.attendanceTokens = [];
      this.absenceTokens = [];
      switch (status) {
        case "attendance":
          this.attendanceSelectedAll = !this.attendanceSelectedAll;
          this.absenceSelectedAll = false;
          if (this.attendanceSelectedAll) {
            for (let user in this.usersDataFiltered) {
              if (this.employeesStatus) {
                this.attendanceTokens.push(
                  this.usersDataFiltered[user].employeeUserToken
                );
              } else if (this.studentsStatus) {
                this.attendanceTokens.push(
                  this.usersDataFiltered[user].studentUserToken
                );
              }
            }
          }
          break;
        case "absence":
          this.absenceSelectedAll = !this.absenceSelectedAll;
          this.attendanceSelectedAll = false;
          if (this.absenceSelectedAll) {
            for (let user in this.usersDataFiltered) {
              if (this.employeesStatus) {
                this.absenceTokens.push(
                  this.usersDataFiltered[user].employeeUserToken
                );
              } else if (this.studentsStatus) {
                this.absenceTokens.push(
                  this.usersDataFiltered[user].studentUserToken
                );
              }
            }
          }
          break;
        default:
          break;
      }
    },
    select(status, value) {
      const indexAbsence = this.absenceTokens.indexOf(value);
      const indexAttendance = this.attendanceTokens.indexOf(value);

      switch (status) {
        case "attendance":
          if (indexAbsence > -1) {
            this.absenceTokens.splice(indexAbsence, 1);
          }

          setTimeout(() => {
            if (this.usersDataFiltered.length == this.attendanceTokens.length) {
              this.attendanceSelectedAll = true;
              this.absenceSelectedAll = false;
            } else {
              this.attendanceSelectedAll = false;
              this.absenceSelectedAll = false;
            }
          }, 1000);
          break;
        case "absence":
          if (indexAttendance > -1) {
            this.attendanceTokens.splice(indexAttendance, 1);
          }

          setTimeout(() => {
            if (this.usersDataFiltered.length == this.absenceTokens.length) {
              this.absenceSelectedAll = true;
              this.attendanceSelectedAll = false;
            } else {
              this.absenceSelectedAll = false;
              this.attendanceSelectedAll = false;
            }
          }, 1000);
          break;
        default:
          break;
      }
    },
    async addEducationalGroupAttendance() {
      this.educationalGroupAttendance.educationalGroupToken =
        this.educationalScheduleTime.educationalGroupToken;
      this.educationalGroupAttendance.educationalScheduleTimeToken =
        this.educationalScheduleTime.educationalScheduleTimeToken;

      if (this.employeesStatus) {
        this.educationalGroupAttendance.employeesList = [];
        if (
          this.attendanceTokens.length <= 0 &&
          this.absenceTokens.length <= 0
        ) {
          this.showMsg(this.$t("employees.pleaseSelectOne"));
          return;
        }

        if (this.attendanceTokens.length > 0) {
          this.attendanceTokens.forEach((element) => {
            let item = {
              userToken: element,
              attendanceTypeToken: ATTENDANCE_TYPE.Attendance,
              attendFromDateTime: this.educationalScheduleTime.dateTimeFrom,
              attendToDateTime: this.educationalScheduleTime.dateTimeTo,
            };
            this.educationalGroupAttendance.employeesList.push(item);
          });
        }
        if (this.absenceTokens.length > 0) {
          this.absenceTokens.forEach((element) => {
            let item = {
              userToken: element,
              attendanceTypeToken: ATTENDANCE_TYPE.Absence,
              attendFromDateTime: this.educationalScheduleTime.dateTimeFrom,
              attendToDateTime: this.educationalScheduleTime.dateTimeTo,
            };
            this.educationalGroupAttendance.employeesList.push(item);
          });
        }
      } else if (this.studentsStatus) {
        this.educationalGroupAttendance.studentsList = [];
        if (
          this.attendanceTokens.length <= 0 &&
          this.absenceTokens.length <= 0
        ) {
          this.showMsg(this.$t("students.pleaseSelectOne"));
          return;
        }

        if (this.attendanceTokens.length > 0) {
          this.attendanceTokens.forEach((element) => {
            let item = {
              userToken: element,
              attendanceTypeToken: ATTENDANCE_TYPE.Attendance,
              attendFromDateTime: this.educationalScheduleTime.dateTimeFrom,
              attendToDateTime: this.educationalScheduleTime.dateTimeTo,
            };
            this.educationalGroupAttendance.studentsList.push(item);
          });
        }
        if (this.absenceTokens.length > 0) {
          this.absenceTokens.forEach((element) => {
            let item = {
              userToken: element,
              attendanceTypeToken: ATTENDANCE_TYPE.Absence,
              attendFromDateTime: this.educationalScheduleTime.dateTimeFrom,
              attendToDateTime: this.educationalScheduleTime.dateTimeTo,
            };
            this.educationalGroupAttendance.studentsList.push(item);
          });
        }
      }

      this.isLoading = true;
      try {
        let response = "";
        if (this.withPayment) {
          response = await apiEducationalGroupAttendance.addBySession(
            this.educationalGroupAttendance
          );
        } else {
          response = await apiEducationalGroupAttendance.add(
            this.educationalGroupAttendance
          );
        }
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$emit("refresh");
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
          this.showMsg(response.data.msg);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
    filterUsersDataSubscriptionType() {
      if (this.withPayment) {
        this.filteredUsersData = this.usersData.filter(
          (user) =>
            user.activeSubscriptionData.subscriptionTypeToken ==
            SUBSCRIPTION_TYPE_TOKENS.Hour
        );
      } else {
        this.filteredUsersData = this.usersData.filter(
          (user) =>
            user.activeSubscriptionData.subscriptionTypeToken !=
            SUBSCRIPTION_TYPE_TOKENS.Hour
        );
      }
    },
    getUsersDataFiltered() {
      if (this.withPayment) {
        this.usersDataFiltered = this.usersData.filter(
          (user) =>
            user.attendanceTypeToken == ATTENDANCE_TYPE.Unknown &&
            (user.activeSubscriptionData.subscriptionTypeToken ==
              SUBSCRIPTION_TYPE_TOKENS.Hour ||
              !this.studentsStatus)
        );
      } else {
        this.usersDataFiltered = this.usersData.filter(
          (user) =>
            user.attendanceTypeToken == ATTENDANCE_TYPE.Unknown &&
            (user.activeSubscriptionData.subscriptionTypeToken !=
              SUBSCRIPTION_TYPE_TOKENS.Hour ||
              !this.studentsStatus)
        );
      }
    },
    // getUsersDataFiltered() {
    //   this.usersDataFiltered = this.usersData.filter(
    //     (user) =>
    //       user.attendanceTypeToken == ATTENDANCE_TYPE.Unknown &&
    //       ((this.studentsStatus &&
    //         user.activeSubscriptionData &&
    //         user.activeSubscriptionData.canAttendaceStatus) ||
    //         !this.studentsStatus)
    //   );
    // },
    setEducationalGroupAttendanceData(user) {
      console.log(this.employeesStatus);
      console.log(user);
      let obj = {
        educationalGroupAttendanceToken: user.educationalGroupAttendanceToken,
        educationalScheduleTimeToken:
          this.educationalScheduleTime.educationalScheduleTimeToken,
        userToken: this.employeesStatus
          ? user.employeeUserToken
          : user.studentUserToken,
        attendanceTypeToken: user.attendanceTypeToken,
        attendFromDateTime: user.attendanceFromDateTime,
        attendToDateTime: user.attendanceToDateTime,
        educationalGroupAttendanceNotes: user.attendanceNotes,
        userInfoData: {
          userTypeToken:
            this.employeesStatus && user.employeeUserInfoData
              ? user.employeeUserInfoData.userTypeToken
              : user.studentUserInfoData.userTypeToken,
          userNameCurrent:
            this.employeesStatus && user.employeeUserInfoData
              ? user.employeeUserInfoData.userNameCurrent
              : user.studentUserInfoData.userNameCurrent,
        },
      };
      console.log(obj);
      this.$emit("setEducationalGroupAttendanceData", obj);
    },
    checkPrivilege,
    isDataExist,
    formateDateTimeLang,
    fullPathFileFromServer,
    hasEducationalGroupAttendanceAdd,
    hasEducationalGroupAttendanceEdit,
    hasEducationalGroupAttendanceFinaleDelete,
  },
  watch: {
    usersData: function () {
      this.filterUsersDataSubscriptionType();
      this.getUsersDataFiltered();
    },
  },
  created() {
    this.filterUsersDataSubscriptionType();
    this.getUsersDataFiltered();
    this.getPriceListsDialog();
    this.getAccountsDialog();
    this.getPaymentMethodsDialog();
  },
};
</script>
