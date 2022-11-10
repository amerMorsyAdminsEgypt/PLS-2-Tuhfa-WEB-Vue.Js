<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(classificationDegree, index) in classificationDegreesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="classificationDegree.classificationDegreeNameCurrent"
      :description="classificationDegree.fullCode"
      :imagePath="classificationDegree.classificationDegreeImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setClassificationDegreeData(classificationDegree);
            openBottomSheet('ClassificationDegreeInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setClassificationDegreeData(classificationDegree);
            openBottomSheet('ClassificationDegreeQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasClassificationDegreeEdit())">
        <button
          @click="
            setClassificationDegreeData(classificationDegree);
            openBottomSheet('ClassificationDegreeUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasClassificationDegreeFinaleDelete())">
        <button
          v-b-modal.ClassificationDegreeDelete
          :title="$t('delete')"
          @click="setClassificationDegreeData(classificationDegree)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasClassificationDegreeChangeActivationType())">
        <button
          v-b-modal.ClassificationDegreeChangeActivationType
          :title="$t('changeActivationType')"
          @click="setClassificationDegreeData(classificationDegree)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setClassificationDegreeData(classificationDegree);
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
  hasClassificationDegreeEdit,
  hasClassificationDegreeFinaleDelete,
  hasClassificationDegreeChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import CustomCard from "./../../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["classificationDegreesData", "filterData", "defaultImg"],
  methods: {
    setClassificationDegreeData(classificationDegree) {
      this.$emit("setClassificationDegreeData", classificationDegree);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasClassificationDegreeEdit,
    hasClassificationDegreeFinaleDelete,
    hasClassificationDegreeChangeActivationType,
  },
};
</script>
