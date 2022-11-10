<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(jobGrade, index) in jobGradesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="jobGrade.jobGradeNameCurrent"
      :description="jobGrade.fullCode"
      :imagePath="jobGrade.jobGradeImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
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
          :title="$t('info')"
          @click="
            setJobGradeData(jobGrade);
            openBottomSheet('JobGradeInfo');
          "
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
    </CustomCard>
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
import CustomCard from "./../../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
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
