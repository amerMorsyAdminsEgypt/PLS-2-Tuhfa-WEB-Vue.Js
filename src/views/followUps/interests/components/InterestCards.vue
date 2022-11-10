<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(interest, index) in interestsData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="interest.interestTitleCurrent"
      :description="interest.fullCode"
      :imagePath="interest.interestImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setInterestData(interest);
            openBottomSheet('InterestInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setInterestData(interest);
            openBottomSheet('InterestQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasInterestEdit())">
        <button
          @click="
            setInterestData(interest);
            openBottomSheet('InterestUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasInterestFinaleDelete())">
        <button
          v-b-modal.InterestDelete
          :title="$t('delete')"
          @click="setInterestData(interest)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasInterestChangeActivationType())">
        <button
          v-b-modal.InterestChangeActivationType
          :title="$t('changeActivationType')"
          @click="setInterestData(interest)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setInterestData(interest);
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
  hasInterestEdit,
  hasInterestFinaleDelete,
  hasInterestChangeActivationType,
} from "./../../../../utils/privilegeHelper";
import CustomCard from "./../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["interestsData", "filterData", "defaultImg"],
  methods: {
    setInterestData(interest) {
      this.$emit("setInterestData", interest);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasInterestEdit,
    hasInterestFinaleDelete,
    hasInterestChangeActivationType,
  },
};
</script>
