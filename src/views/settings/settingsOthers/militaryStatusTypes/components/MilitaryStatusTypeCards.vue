<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(militaryStatusType, index) in militaryStatusTypesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="militaryStatusType.militaryStatusTypeNameCurrent"
      :description="militaryStatusType.fullCode"
      :imagePath="militaryStatusType.militaryStatusTypeImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setMilitaryStatusTypeData(militaryStatusType);
            openBottomSheet('MilitaryStatusTypeInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setMilitaryStatusTypeData(militaryStatusType);
            openBottomSheet('MilitaryStatusTypeQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasMilitaryStatusTypeEdit())">
        <button
          @click="
            setMilitaryStatusTypeData(militaryStatusType);
            openBottomSheet('MilitaryStatusTypeUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasMilitaryStatusTypeFinaleDelete())">
        <button
          v-b-modal.MilitaryStatusTypeDelete
          :title="$t('delete')"
          @click="setMilitaryStatusTypeData(militaryStatusType)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasMilitaryStatusTypeChangeActivationType())">
        <button
          v-b-modal.MilitaryStatusTypeChangeActivationType
          :title="$t('changeActivationType')"
          @click="setMilitaryStatusTypeData(militaryStatusType)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setMilitaryStatusTypeData(militaryStatusType);
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
  hasMilitaryStatusTypeEdit,
  hasMilitaryStatusTypeFinaleDelete,
  hasMilitaryStatusTypeChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import CustomCard from "./../../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["militaryStatusTypesData", "filterData", "defaultImg"],
  methods: {
    setMilitaryStatusTypeData(militaryStatusType) {
      this.$emit("setMilitaryStatusTypeData", militaryStatusType);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasMilitaryStatusTypeEdit,
    hasMilitaryStatusTypeFinaleDelete,
    hasMilitaryStatusTypeChangeActivationType,
  },
};
</script>
