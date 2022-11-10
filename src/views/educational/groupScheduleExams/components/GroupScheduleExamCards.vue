<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(groupScheduleExam, index) in groupScheduleExamsData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="
        groupScheduleExam.simpleExamModelInfoData.simpleExamModelTitleCurrent
      "
      :description="groupScheduleExam.fullCode"
      :imagePath="groupScheduleExam.groupScheduleExamImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li v-if="checkPrivilege(hasStudentScheduleExamTimeReport())">
        <button
          @click="
            setGroupScheduleExamData(groupScheduleExam);
            openBottomSheet('GroupScheduleExamReport');
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
              educationalGroupToken: groupScheduleExam.educationalGroupToken,
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
              simpleExamModelToken: groupScheduleExam.simpleExamModelToken,
            },
          }"
          :title="$t('SimpleExamModels.data')"
        >
          <img src="@/assets/images/SimpleExamModels.svg" />
        </router-link>
      </li>
      <li>
        <button
          :title="$t('info')"
          @click="
            setGroupScheduleExamData(groupScheduleExam);
            openBottomSheet('GroupScheduleExamInfo');
          "
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
    </CustomCard>
  </div>
</template>

<script>
import {
  checkPrivilege,
  isDataExist,
  fullPathFileFromServer,
} from "./../../../../utils/functions";
import {
  hasGroupScheduleExamEdit,
  hasGroupScheduleExamFinaleDelete,
  hasEducationalGroup,
  hasSimpleExamModel,
  hasStudentScheduleExamTimeReport,
} from "./../../../../utils/privilegeHelper";
import CustomCard from "./../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["groupScheduleExamsData", "filterData", "defaultImg"],
  methods: {
    setGroupScheduleExamData(groupScheduleExam) {
      this.$emit("setGroupScheduleExamData", groupScheduleExam);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasGroupScheduleExamEdit,
    hasGroupScheduleExamFinaleDelete,
    hasEducationalGroup,
    hasSimpleExamModel,
    hasStudentScheduleExamTimeReport,
  },
};
</script>
