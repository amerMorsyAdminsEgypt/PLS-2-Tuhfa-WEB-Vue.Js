<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(scientificDegree, index) in scientificDegreesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="scientificDegree.scientificDegreeNameCurrent"
      :description="scientificDegree.fullCode"
      :imagePath="scientificDegree.scientificDegreeImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setScientificDegreeData(scientificDegree);
            openBottomSheet('ScientificDegreeInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setScientificDegreeData(scientificDegree);
            openBottomSheet('ScientificDegreeQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasScientificDegreeEdit())">
        <button
          @click="
            setScientificDegreeData(scientificDegree);
            openBottomSheet('ScientificDegreeUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasScientificDegreeFinaleDelete())">
        <button
          v-b-modal.ScientificDegreeDelete
          :title="$t('delete')"
          @click="setScientificDegreeData(scientificDegree)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasScientificDegreeChangeActivationType())">
        <button
          v-b-modal.ScientificDegreeChangeActivationType
          :title="$t('changeActivationType')"
          @click="setScientificDegreeData(scientificDegree)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setScientificDegreeData(scientificDegree);
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
  hasScientificDegreeEdit,
  hasScientificDegreeFinaleDelete,
  hasScientificDegreeChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import CustomCard from "./../../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["scientificDegreesData", "filterData", "defaultImg"],
  methods: {
    setScientificDegreeData(scientificDegree) {
      this.$emit("setScientificDegreeData", scientificDegree);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasScientificDegreeEdit,
    hasScientificDegreeFinaleDelete,
    hasScientificDegreeChangeActivationType,
  },
};
</script>
