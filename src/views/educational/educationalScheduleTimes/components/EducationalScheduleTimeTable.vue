<template>
  <div v-if="educationalScheduleTimesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th rowspan="2">{{ $t("EducationalScheduleTimes.code") }}</th>
          <th rowspan="2">{{ $t("EducationalGroups.name") }}</th>
          <th colspan="3">{{ $t("EducationalScheduleTimes.dateTime") }}</th>
          <th rowspan="2">{{ $t("Places.name") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("EducationalScheduleTimes.from") }}</th>
          <th>{{ $t("EducationalScheduleTimes.to") }}</th>
          <th>{{ $t("EducationalScheduleTimes.duration") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(
            educationalScheduleTime, index
          ) in educationalScheduleTimesData"
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>{{ isDataExist(educationalScheduleTime.fullCode) }}</td>
          <td>
            {{
              isDataExist(
                educationalScheduleTime.educationalGroupInfoData
                  .educationalGroupNameCurrent
              )
            }}
          </td>
          <td>
            {{
              formateDateTimeLang(
                educationalScheduleTime.dateTimeFromDate,
                educationalScheduleTime.dateTimeFromTime
              )
            }}
          </td>
          <td>
            {{
              formateDateTimeLang(
                educationalScheduleTime.dateTimeToDate,
                educationalScheduleTime.dateTimeToTime
              )
            }}
          </td>
          <td>{{ isDataExist(educationalScheduleTime.durationCurrent) }}</td>
          <td>
            {{
              isDataExist(
                educationalScheduleTime.placeInfoData.placeNameCurrent
              )
            }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li v-if="checkPrivilege(hasEducationalScheduleTimeReport())">
                <button
                  @click="
                    setEducationalScheduleTimeData(educationalScheduleTime);
                    openBottomSheet('EducationalScheduleTimeGroupReportFilter');
                  "
                  :title="$t('Reports.educationalScheduleTimeReport')"
                >
                  <img src="@/assets/images/reports.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasEducationalScheduleTimeReport())">
                <button
                  @click="
                    setEducationalScheduleTimeData(educationalScheduleTime);
                    openBottomSheet('EducationalScheduleTimeReportFilter');
                  "
                  :title="$t('Reports.educationalScheduleTimesReport')"
                >
                  <img src="@/assets/images/attendance.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasEducationalScheduleTimeReport())">
                <button
                  @click="
                    setEducationalScheduleTimeData(educationalScheduleTime);
                    openBottomSheet('EducationalScheduleTimeNameReportFilter');
                  "
                  :title="$t('Reports.educationalScheduleTimeNamesReport')"
                >
                  <img src="@/assets/images/report-attend.svg" />
                </button>
              </li>
              <li>
                <router-link
                  :to="{
                    name: 'EducationalScheduleTimeDetails',
                    params: {
                      educationalScheduleTimeToken:
                        educationalScheduleTime.educationalScheduleTimeToken,
                    },
                  }"
                  :title="$t('EducationalScheduleTimeDetails.attendance')"
                >
                  <img
                    src="@/assets/images/EducationalScheduleTimeDetails.svg"
                  />
                </router-link>
              </li>
              <li>
                <router-link
                  :to="{
                    name: 'EducationalScheduleTimeDetailsWithPayment',
                    params: {
                      educationalScheduleTimeToken:
                        educationalScheduleTime.educationalScheduleTimeToken,
                    },
                  }"
                  :title="
                    $t('EducationalScheduleTimeDetails.attendanceWithPayment')
                  "
                >
                  <img src="@/assets/images/paymentMethods.svg" />
                </router-link>
              </li>
              <li v-if="checkPrivilege(hasDiscussion())">
                <router-link
                  :to="{
                    name: 'Discussions',
                    params: {
                      discussionTypeToken:
                        EDUCATIONAL_RATING_TYPE_TOKENS.EducationalScheduleTime,
                      mainToken:
                        educationalScheduleTime.educationalScheduleTimeToken,
                      educationalGroupToken:
                        educationalScheduleTime.educationalGroupInfoData
                          .educationalGroupToken,
                    },
                  }"
                  :title="$t('Discussions.modelName')"
                >
                  <img src="@/assets/images/discussions.svg" />
                </router-link>
              </li>
              <li>
                <button
                  @click="
                    setEducationalScheduleTimeData(educationalScheduleTime);
                    openBottomSheet('EducationalScheduleTimeInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setEducationalScheduleTimeData(educationalScheduleTime);
                    openBottomSheet('EducationalScheduleTimeQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasEducationalScheduleTimeEdit())">
                <button
                  @click="
                    setEducationalScheduleTimeData(educationalScheduleTime);
                    openBottomSheet('EducationalScheduleTimeUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li
                v-if="checkPrivilege(hasEducationalScheduleTimeFinaleDelete())"
              >
                <button
                  v-b-modal.EducationalScheduleTimeDelete
                  :title="$t('delete')"
                  @click="
                    setEducationalScheduleTimeData(educationalScheduleTime)
                  "
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setEducationalScheduleTimeData(educationalScheduleTime);
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
  formateDateTimeLang,
} from "./../../../../utils/functions";
import {
  hasEducationalScheduleTimeEdit,
  hasEducationalScheduleTimeReport,
  hasEducationalScheduleTimeFinaleDelete,
  hasDiscussion,
} from "./../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";
import { EDUCATIONAL_RATING_TYPE_TOKENS } from "./../../../../utils/constantLists";

export default {
  name: "EducationalScheduleTimesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  data() {
    return {
      EDUCATIONAL_RATING_TYPE_TOKENS,
    };
  },
  props: ["educationalScheduleTimesData", "filterData", "defaultImg"],
  methods: {
    setEducationalScheduleTimeData(educationalScheduleTime) {
      this.$emit("setEducationalScheduleTimeData", educationalScheduleTime);
    },
    checkPrivilege,
    isDataExist,
    formateDateTimeLang,
    hasEducationalScheduleTimeEdit,
    hasEducationalScheduleTimeReport,
    hasEducationalScheduleTimeFinaleDelete,
    hasDiscussion,
  },
};
</script>
