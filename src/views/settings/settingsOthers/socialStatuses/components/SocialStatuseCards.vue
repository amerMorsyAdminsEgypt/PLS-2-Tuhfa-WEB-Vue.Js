<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(socialStatuse, index) in socialStatusesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="socialStatuse.socialStatuseNameCurrent"
      :description="socialStatuse.fullCode"
      :imagePath="socialStatuse.socialStatuseImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setSocialStatuseData(socialStatuse);
            openBottomSheet('SocialStatuseInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setSocialStatuseData(socialStatuse);
            openBottomSheet('SocialStatuseQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasSocialStatuseEdit())">
        <button
          @click="
            setSocialStatuseData(socialStatuse);
            openBottomSheet('SocialStatuseUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasSocialStatuseFinaleDelete())">
        <button
          v-b-modal.SocialStatuseDelete
          :title="$t('delete')"
          @click="setSocialStatuseData(socialStatuse)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasSocialStatuseChangeActivationType())">
        <button
          v-b-modal.SocialStatuseChangeActivationType
          :title="$t('changeActivationType')"
          @click="setSocialStatuseData(socialStatuse)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setSocialStatuseData(socialStatuse);
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
  hasSocialStatuseEdit,
  hasSocialStatuseFinaleDelete,
  hasSocialStatuseChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import CustomCard from "./../../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["socialStatusesData", "filterData", "defaultImg"],
  methods: {
    setSocialStatuseData(socialStatuse) {
      this.$emit("setSocialStatuseData", socialStatuse);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasSocialStatuseEdit,
    hasSocialStatuseFinaleDelete,
    hasSocialStatuseChangeActivationType,
  },
};
</script>
