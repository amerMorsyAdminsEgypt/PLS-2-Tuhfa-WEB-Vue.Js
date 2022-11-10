<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(bloodType, index) in bloodTypesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="bloodType.bloodTypeNameCurrent"
      :description="bloodType.fullCode"
      :imagePath="bloodType.bloodTypeImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setBloodTypeData(bloodType);
            openBottomSheet('BloodTypeInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setBloodTypeData(bloodType);
            openBottomSheet('BloodTypeQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasBloodTypeEdit())">
        <button
          @click="
            setBloodTypeData(bloodType);
            openBottomSheet('BloodTypeUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasBloodTypeFinaleDelete())">
        <button
          v-b-modal.BloodTypeDelete
          :title="$t('delete')"
          @click="setBloodTypeData(bloodType)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasBloodTypeChangeActivationType())">
        <button
          v-b-modal.BloodTypeChangeActivationType
          :title="$t('changeActivationType')"
          @click="setBloodTypeData(bloodType)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setBloodTypeData(bloodType);
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
  hasBloodTypeEdit,
  hasBloodTypeFinaleDelete,
  hasBloodTypeChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import CustomCard from "./../../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["bloodTypesData", "filterData", "defaultImg"],
  methods: {
    setBloodTypeData(bloodType) {
      this.$emit("setBloodTypeData", bloodType);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasBloodTypeEdit,
    hasBloodTypeFinaleDelete,
    hasBloodTypeChangeActivationType,
  },
};
</script>
