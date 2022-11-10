<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(generalJob, index) in generalJobsData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="generalJob.generalJobNameCurrent"
      :description="generalJob.fullCode"
      :imagePath="generalJob.generalJobImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setGeneralJobData(generalJob);
            openBottomSheet('GeneralJobInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setGeneralJobData(generalJob);
            openBottomSheet('GeneralJobQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasGeneralJobEdit())">
        <button
          @click="
            setGeneralJobData(generalJob);
            openBottomSheet('GeneralJobUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasGeneralJobFinaleDelete())">
        <button
          v-b-modal.GeneralJobDelete
          :title="$t('delete')"
          @click="setGeneralJobData(generalJob)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasGeneralJobChangeActivationType())">
        <button
          v-b-modal.GeneralJobChangeActivationType
          :title="$t('changeActivationType')"
          @click="setGeneralJobData(generalJob)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setGeneralJobData(generalJob);
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
  hasGeneralJobEdit,
  hasGeneralJobFinaleDelete,
  hasGeneralJobChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import CustomCard from "./../../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["generalJobsData", "filterData", "defaultImg"],
  methods: {
    setGeneralJobData(generalJob) {
      this.$emit("setGeneralJobData", generalJob);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasGeneralJobEdit,
    hasGeneralJobFinaleDelete,
    hasGeneralJobChangeActivationType,
  },
};
</script>
