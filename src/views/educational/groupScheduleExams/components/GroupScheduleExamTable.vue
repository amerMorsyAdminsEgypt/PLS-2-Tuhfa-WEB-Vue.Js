<template>
  <div v-if="groupScheduleExamsData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="5">{{ $t("GroupScheduleExams.data") }}</th>
          <th rowspan="2">{{ $t("EducationalGroups.name") }}</th>
          <th colspan="3">{{ $t("SimpleExamModels.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th>{{ $t("from") }}</th>
          <th>{{ $t("to") }}</th>
          <th>{{ $t("general.duration") }}</th>
          <th>{{ $t("SimpleExamModels.title") }}</th>
          <th>{{ $t("ConstantsListSelect.ExamTypesName") }}</th>
          <th>{{ $t("SimpleExamModels.examDegree") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(groupScheduleExam, index) in groupScheduleExamsData"
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  groupScheduleExam.groupScheduleExamImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(groupScheduleExam.fullCode) }}</td>
          <td>
            {{
              formateDateTimeLang(
                groupScheduleExam.startExamDate,
                groupScheduleExam.startExamTime
              )
            }}
          </td>
          <td>
            {{
              formateDateTimeLang(
                groupScheduleExam.endExamDate,
                groupScheduleExam.endExamTime
              )
            }}
          </td>
          <td>
            {{ isDataExist(groupScheduleExam.durationCurrent) }}
          </td>
          <td>
            <span class="cut-3line">
              {{
                isDataExist(
                  groupScheduleExam.educationalGroupInfoData
                    .educationalGroupNameCurrent
                )
              }}
            </span>
          </td>
          <td>
            {{
              isDataExist(
                groupScheduleExam.simpleExamModelInfoData
                  .simpleExamModelTitleCurrent
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                groupScheduleExam.simpleExamModelInfoData.examTypeNameCurrent
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                groupScheduleExam.simpleExamModelInfoData.simpleExamModelDegree
              )
            }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li v-if="checkPrivilege(hasStudentScheduleExamTimeReport())">
                <button
                  @click="
                    setGroupScheduleExamData(groupScheduleExam);
                    openBottomSheet('GroupScheduleExamReportFilter');
                  "
                  :title="$t('general.print')"
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
                        groupScheduleExam.educationalGroupToken,
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
                        groupScheduleExam.simpleExamModelToken,
                    },
                  }"
                  :title="$t('SimpleExamModels.data')"
                >
                  <img src="@/assets/images/SimpleExamModels.svg" />
                </router-link>
              </li>
              <li>
                <button
                  @click="
                    setGroupScheduleExamData(groupScheduleExam);
                    openBottomSheet('GroupScheduleExamInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setGroupScheduleExamData(groupScheduleExam);
                    openBottomSheet('GroupScheduleExamQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasGroupScheduleExamEdit())">
                <button
                  @click="
                    setGroupScheduleExamData(groupScheduleExam);
                    openBottomSheet('GroupScheduleExamUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasGroupScheduleExamFinaleDelete())">
                <button
                  v-b-modal.GroupScheduleExamDelete
                  :title="$t('delete')"
                  @click="setGroupScheduleExamData(groupScheduleExam)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setGroupScheduleExamData(groupScheduleExam);
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
  fullPathFileFromServer,
  formateDateTimeLang,
} from "./../../../../utils/functions";
import {
  hasGroupScheduleExamEdit,
  hasGroupScheduleExamFinaleDelete,
  hasEducationalGroup,
  hasSimpleExamModel,
  hasStudentScheduleExamTimeReport,
} from "./../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "GroupScheduleExamsTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["groupScheduleExamsData", "filterData", "defaultImg"],

  data() {
    return {};
  },
  methods: {
    setGroupScheduleExamData(groupScheduleExam) {
      this.$emit("setGroupScheduleExamData", groupScheduleExam);
    },
    checkPrivilege,
    isDataExist,
    formateDateTimeLang,
    fullPathFileFromServer,
    hasGroupScheduleExamEdit,
    hasGroupScheduleExamFinaleDelete,
    hasEducationalGroup,
    hasSimpleExamModel,
    hasStudentScheduleExamTimeReport,
  },
};
</script>
