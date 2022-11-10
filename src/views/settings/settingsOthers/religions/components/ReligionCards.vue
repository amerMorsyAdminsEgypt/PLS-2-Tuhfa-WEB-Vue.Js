<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(religion, index) in religionsData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="religion.religionNameCurrent"
      :description="religion.fullCode"
      :imagePath="religion.religionImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setReligionData(religion);
            openBottomSheet('ReligionInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setReligionData(religion);
            openBottomSheet('ReligionQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasReligionEdit())">
        <button
          @click="
            setReligionData(religion);
            openBottomSheet('ReligionUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasReligionFinaleDelete())">
        <button
          v-b-modal.ReligionDelete
          :title="$t('delete')"
          @click="setReligionData(religion)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasReligionChangeActivationType())">
        <button
          v-b-modal.ReligionChangeActivationType
          :title="$t('changeActivationType')"
          @click="setReligionData(religion)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setReligionData(religion);
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
  hasReligionEdit,
  hasReligionFinaleDelete,
  hasReligionChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import CustomCard from "./../../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["religionsData", "filterData", "defaultImg"],
  methods: {
    setReligionData(religion) {
      this.$emit("setReligionData", religion);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasReligionEdit,
    hasReligionFinaleDelete,
    hasReligionChangeActivationType,
  },
};
</script>
