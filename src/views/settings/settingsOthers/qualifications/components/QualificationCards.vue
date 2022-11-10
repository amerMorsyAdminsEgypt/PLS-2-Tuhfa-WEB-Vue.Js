<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(qualification, index) in qualificationsData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="qualification.qualificationNameCurrent"
      :description="qualification.fullCode"
      :imagePath="qualification.qualificationImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setQualificationData(qualification);
            openBottomSheet('QualificationInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setQualificationData(qualification);
            openBottomSheet('QualificationQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasQualificationEdit())">
        <button
          @click="
            setQualificationData(qualification);
            openBottomSheet('QualificationUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasQualificationFinaleDelete())">
        <button
          v-b-modal.QualificationDelete
          :title="$t('delete')"
          @click="setQualificationData(qualification)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasQualificationChangeActivationType())">
        <button
          v-b-modal.QualificationChangeActivationType
          :title="$t('changeActivationType')"
          @click="setQualificationData(qualification)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setQualificationData(qualification);
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
  hasQualificationEdit,
  hasQualificationFinaleDelete,
  hasQualificationChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import CustomCard from "./../../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["qualificationsData", "filterData", "defaultImg"],
  methods: {
    setQualificationData(qualification) {
      this.$emit("setQualificationData", qualification);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasQualificationEdit,
    hasQualificationFinaleDelete,
    hasQualificationChangeActivationType,
  },
};
</script>
