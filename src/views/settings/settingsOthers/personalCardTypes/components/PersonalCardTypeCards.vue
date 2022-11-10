<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(personalCardType, index) in personalCardTypesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="personalCardType.personalCardTypeNameCurrent"
      :description="personalCardType.fullCode"
      :imagePath="personalCardType.personalCardTypeImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setPersonalCardTypeData(personalCardType);
            openBottomSheet('PersonalCardTypeInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setPersonalCardTypeData(personalCardType);
            openBottomSheet('PersonalCardTypeQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasPersonalCardTypeEdit())">
        <button
          @click="
            setPersonalCardTypeData(personalCardType);
            openBottomSheet('PersonalCardTypeUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasPersonalCardTypeFinaleDelete())">
        <button
          v-b-modal.PersonalCardTypeDelete
          :title="$t('delete')"
          @click="setPersonalCardTypeData(personalCardType)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasPersonalCardTypeChangeActivationType())">
        <button
          v-b-modal.PersonalCardTypeChangeActivationType
          :title="$t('changeActivationType')"
          @click="setPersonalCardTypeData(personalCardType)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setPersonalCardTypeData(personalCardType);
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
  hasPersonalCardTypeEdit,
  hasPersonalCardTypeFinaleDelete,
  hasPersonalCardTypeChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import CustomCard from "./../../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["personalCardTypesData", "filterData", "defaultImg"],
  methods: {
    setPersonalCardTypeData(personalCardType) {
      this.$emit("setPersonalCardTypeData", personalCardType);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasPersonalCardTypeEdit,
    hasPersonalCardTypeFinaleDelete,
    hasPersonalCardTypeChangeActivationType,
  },
};
</script>
