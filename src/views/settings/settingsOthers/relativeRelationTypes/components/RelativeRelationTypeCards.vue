<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(relativeRelationType, index) in relativeRelationTypesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="relativeRelationType.relativeRelationTypeNameCurrent"
      :description="relativeRelationType.fullCode"
      :imagePath="relativeRelationType.relativeRelationTypeImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setRelativeRelationTypeData(relativeRelationType);
            openBottomSheet('RelativeRelationTypeInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setRelativeRelationTypeData(relativeRelationType);
            openBottomSheet('RelativeRelationTypeQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasRelativeRelationTypeEdit())">
        <button
          @click="
            setRelativeRelationTypeData(relativeRelationType);
            openBottomSheet('RelativeRelationTypeUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasRelativeRelationTypeFinaleDelete())">
        <button
          v-b-modal.RelativeRelationTypeDelete
          :title="$t('delete')"
          @click="setRelativeRelationTypeData(relativeRelationType)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasRelativeRelationTypeChangeActivationType())">
        <button
          v-b-modal.RelativeRelationTypeChangeActivationType
          :title="$t('changeActivationType')"
          @click="setRelativeRelationTypeData(relativeRelationType)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setRelativeRelationTypeData(relativeRelationType);
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
  hasRelativeRelationTypeEdit,
  hasRelativeRelationTypeFinaleDelete,
  hasRelativeRelationTypeChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import CustomCard from "./../../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["relativeRelationTypesData", "filterData", "defaultImg"],
  methods: {
    setRelativeRelationTypeData(relativeRelationType) {
      this.$emit("setRelativeRelationTypeData", relativeRelationType);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasRelativeRelationTypeEdit,
    hasRelativeRelationTypeFinaleDelete,
    hasRelativeRelationTypeChangeActivationType,
  },
};
</script>
