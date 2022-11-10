<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(injuryType, index) in injuryTypesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="injuryType.injuryTypeNameCurrent"
      :description="injuryType.fullCode"
      :imagePath="injuryType.injuryTypeImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setInjuryTypeData(injuryType);
            openBottomSheet('InjuryTypeInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setInjuryTypeData(injuryType);
            openBottomSheet('InjuryTypeQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasInjuryTypeEdit())">
        <button
          @click="
            setInjuryTypeData(injuryType);
            openBottomSheet('InjuryTypeUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasInjuryTypeFinaleDelete())">
        <button
          v-b-modal.InjuryTypeDelete
          :title="$t('delete')"
          @click="setInjuryTypeData(injuryType)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasInjuryTypeChangeActivationType())">
        <button
          v-b-modal.InjuryTypeChangeActivationType
          :title="$t('changeActivationType')"
          @click="setInjuryTypeData(injuryType)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setInjuryTypeData(injuryType);
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
  hasInjuryTypeEdit,
  hasInjuryTypeFinaleDelete,
  hasInjuryTypeChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import CustomCard from "./../../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["injuryTypesData", "filterData", "defaultImg"],
  methods: {
    setInjuryTypeData(injuryType) {
      this.$emit("setInjuryTypeData", injuryType);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasInjuryTypeEdit,
    hasInjuryTypeFinaleDelete,
    hasInjuryTypeChangeActivationType,
  },
};
</script>
