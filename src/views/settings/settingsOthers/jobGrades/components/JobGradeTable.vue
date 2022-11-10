<template>
  <div v-if="jobGradesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("JobGrades.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(jobGrade, index) in jobGradesData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(jobGrade.jobGradeImagePath, defaultImg)
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(jobGrade.fullCode) }}</td>
          <td>
            {{ isDataExist(jobGrade.jobGradeNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li v-if="jobGrade.isHaveChildrenStatus">
                <router-link
                  :to="{
                    name: 'JobGrades',
                    params: {
                      parentJobGradeToken: jobGrade.jobGradeToken,
                    },
                  }"
                  :title="$t('JobGrades.modelName')"
                >
                  <img src="@/assets/images/open.svg" />
                </router-link>
              </li>
              <li>
                <button
                  @click="
                    setJobGradeData(jobGrade);
                    openBottomSheet('JobGradeInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setJobGradeData(jobGrade);
                    openBottomSheet('JobGradeQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasJobGradeEdit())">
                <button
                  @click="
                    setJobGradeData(jobGrade);
                    openBottomSheet('JobGradeUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasJobGradeFinaleDelete())">
                <button
                  v-b-modal.JobGradeDelete
                  :title="$t('delete')"
                  @click="setJobGradeData(jobGrade)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasJobGradeChangeActivationType())">
                <button
                  v-b-modal.JobGradeChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setJobGradeData(jobGrade)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setJobGradeData(jobGrade);
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
} from "./../../../../../utils/functions";
import {
  hasJobGradeEdit,
  hasJobGradeFinaleDelete,
  hasJobGradeChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  name: "JobGradesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["jobGradesData", "filterData", "defaultImg"],
  methods: {
    setJobGradeData(jobGrade) {
      this.$emit("setJobGradeData", jobGrade);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasJobGradeEdit,
    hasJobGradeFinaleDelete,
    hasJobGradeChangeActivationType,
  },
};
</script>
