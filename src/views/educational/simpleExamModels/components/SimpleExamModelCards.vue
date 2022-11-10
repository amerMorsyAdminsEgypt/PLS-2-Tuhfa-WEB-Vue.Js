<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(simpleExamModel, index) in simpleExamModelsData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="simpleExamModel.simpleExamModelTitleCurrent"
      :description="simpleExamModel.fullCode"
      :imagePath="simpleExamModel.simpleExamModelImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setSimpleExamModelData(simpleExamModel);
            openBottomSheet('SimpleExamModelInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setSimpleExamModelData(simpleExamModel);
            openBottomSheet('SimpleExamModelQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasSimpleExamModelEdit())">
        <button
          @click="
            setSimpleExamModelData(simpleExamModel);
            openBottomSheet('SimpleExamModelUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasSimpleExamModelFinaleDelete())">
        <button
          v-b-modal.SimpleExamModelDelete
          :title="$t('delete')"
          @click="setSimpleExamModelData(simpleExamModel)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasSimpleExamModelChangeActivationType())">
        <button
          v-b-modal.SimpleExamModelChangeActivationType
          :title="$t('changeActivationType')"
          @click="setSimpleExamModelData(simpleExamModel)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setSimpleExamModelData(simpleExamModel);
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
  hasSimpleExamModelEdit,
  hasSimpleExamModelFinaleDelete,
  hasSimpleExamModelChangeActivationType,
} from "./../../../../utils/privilegeHelper";
import CustomCard from "./../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["simpleExamModelsData", "filterData", "defaultImg"],
  methods: {
    setSimpleExamModelData(simpleExamModel) {
      this.$emit("setSimpleExamModelData", simpleExamModel);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasSimpleExamModelEdit,
    hasSimpleExamModelFinaleDelete,
    hasSimpleExamModelChangeActivationType,
  },
};
</script>
