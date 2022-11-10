<template>
  <div v-if="studentScheduleExamTimesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th rowspan="2" class="cell-md">{{ $t("students.name") }}</th>
          <th colspan="8">{{ $t("StudentScheduleExamTimes.data") }}</th>
          <th rowspan="2">{{ $t("EducationalGroups.name") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th class="cell-md">{{ $t("general.name") }}</th>
          <th class="cell-sm">{{ $t("from") }}</th>
          <th class="cell-sm">{{ $t("to") }}</th>
          <th>{{ $t("general.duration") }}</th>
          <th>{{ $t("status") }}</th>
          <th>{{ $t("SimpleExamModels.examDegree") }}</th>
          <th>{{ $t("SimpleExamModels.studentDegree") }}</th>
          <th>{{ $t("SimpleExamModels.studentPercentage") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(
            studentScheduleExamTime, index
          ) in studentScheduleExamTimesData"
          :key="index"
        >
          <td
            :class="getClass(studentScheduleExamTime.examSubmissionStatusToken)"
          >
            {{ ++index + filterData.currentIndex }}
          </td>
          <td>
            {{
              isDataExist(
                studentScheduleExamTime.studentUserInfoData.userNameCurrent
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                studentScheduleExamTime.studentScheduleExamTimeNameCurrent
              )
            }}
          </td>
          <td>
            {{
              formateDateTimeLang(
                studentScheduleExamTime.startExamDate,
                studentScheduleExamTime.startExamTime
              )
            }}
          </td>
          <td>
            {{
              formateDateTimeLang(
                studentScheduleExamTime.endExamDate,
                studentScheduleExamTime.endExamTime
              )
            }}
          </td>
          <td>{{ isDataExist(studentScheduleExamTime.durationCurrent) }}</td>
          <td>
            {{
              isDataExist(
                studentScheduleExamTime.examSubmissionStatusNameCurrent
              )
            }}
          </td>
          <td>{{ isDataExist(studentScheduleExamTime.examFinalDegrees) }}</td>
          <td>
            {{ isDataExist(studentScheduleExamTime.studentDegreesInExam) }}
          </td>
          <td>
            {{
              isDataExist(studentScheduleExamTime.studentSuccessPercentageText)
            }}
          </td>

          <td>
            <span
              class="cut-3line"
              :title="
                studentScheduleExamTime.educationalGroupInfoData
                  .educationalGroupNameCurrent
              "
              >{{
                isDataExist(
                  studentScheduleExamTime.educationalGroupInfoData
                    .educationalGroupNameCurrent
                )
              }}</span
            >
          </td>

          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setStudentScheduleExamTimeData(studentScheduleExamTime);
                    openBottomSheet('StudentScheduleExamTimeReport');
                  "
                  :title="$t('general.printCertificate')"
                >
                  <img src="@/assets/images/print.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasEducationalGroup())">
                <router-link
                  :to="{
                    name: 'EducationalGroups',
                    params: {
                      educationalGroupToken:
                        studentScheduleExamTime.educationalGroupToken,
                    },
                  }"
                  :title="$t('EducationalGroups.data')"
                >
                  <img src="@/assets/images/EducationalGroups.svg" />
                </router-link>
              </li>
              <li v-if="checkPrivilege(hasSimpleExamModel())">
                <router-link
                  :to="{
                    name: 'SimpleExamModels',
                    params: {
                      simpleExamModelToken:
                        studentScheduleExamTime.simpleExamModelToken,
                    },
                  }"
                  :title="$t('SimpleExamModels.data')"
                >
                  <img src="@/assets/images/SimpleExamModels.svg" />
                </router-link>
              </li>
              <li v-if="checkPrivilege(hasStudent())">
                <router-link
                  :to="{
                    name: 'Students',
                    params: {
                      userToken: studentScheduleExamTime.studentUserToken,
                    },
                  }"
                  :title="$t('students.data')"
                >
                  <img src="@/assets/images/students.svg" />
                </router-link>
              </li>
              <li>
                <button
                  @click="
                    setStudentScheduleExamTimeData(studentScheduleExamTime);
                    openBottomSheet('StudentScheduleExamTimeInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setStudentScheduleExamTimeData(studentScheduleExamTime);
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
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import {
  hasEducationalGroup,
  hasSimpleExamModel,
  hasStudent,
} from "./../../../../utils/privilegeHelper";
import generalMixin from "./../../../../utils/generalMixin";
import { EXAM_SUBMIT_STATUS_TYPE } from "./../../../../utils/constantLists";

export default {
  name: "StudentScheduleExamTimesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["studentScheduleExamTimesData", "filterData"],

  data() {
    return {};
  },
  methods: {
    getClass(statusToken) {
      if (statusToken == EXAM_SUBMIT_STATUS_TYPE.Submit) {
        return "bg-green";
      } else {
        return "bg-red";
      }
    },
    setStudentScheduleExamTimeData(studentScheduleExamTime) {
      this.$emit("setStudentScheduleExamTimeData", studentScheduleExamTime);
    },
    isDataExist,
    formateDateTimeLang,
    checkPrivilege,
    hasEducationalGroup,
    hasSimpleExamModel,
    hasStudent,
  },
};
</script>
