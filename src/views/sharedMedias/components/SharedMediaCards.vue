<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(sharedMedia, index) in sharedMediasData"
      :key="index"
      :className="'col-sm-12 col-md-6 col-lg-4'"
      :title="sharedMedia.sharedMediaNameCurrent"
      :description="sharedMedia.fullCode"
      :imagePath="sharedMedia.sharedMediaImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setSharedMediaData(sharedMedia);
            openBottomSheet('SharedMediaInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setSharedMediaData(sharedMedia);
            openBottomSheet('SharedMediaQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasSharedMediaEdit())">
        <button
          @click="
            setSharedMediaData(sharedMedia);
            openBottomSheet('SharedMediaUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasSharedMediaFinaleDelete())">
        <button
          v-b-modal.SharedMediaDelete
          :title="$t('delete')"
          @click="setSharedMediaData(sharedMedia)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasSharedMediaWithSpaceStorageMediaCancel())">
        <button
          @click="
            setSharedMediaData(sharedMedia);
            openBottomSheet('SharedMediaWithSpaceStorageMediaUnshare');
          "
          :title="$t('SharedMediaWithSpaceStorageMedias.unshare')"
        >
          <img src="@/assets/images/unshare.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasSharedMediaChangeActivationType())">
        <button
          v-b-modal.SharedMediaChangeActivationType
          :title="$t('changeActivationType')"
          @click="setSharedMediaData(sharedMedia)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setSharedMediaData(sharedMedia);
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
} from "./../../../utils/functions";
import {
  hasSharedMediaEdit,
  hasSharedMediaFinaleDelete,
  hasSharedMediaWithSpaceStorageMediaCancel,
  hasSharedMediaChangeActivationType,
} from "./../../../utils/privilegeHelper";
import CustomCard from "./../../../components/general/CustomCard.vue";
import generalMixin from "./../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["sharedMediasData", "filterData", "defaultImg"],
  methods: {
    setSharedMediaData(sharedMedia) {
      this.$emit("setSharedMediaData", sharedMedia);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasSharedMediaEdit,
    hasSharedMediaFinaleDelete,
    hasSharedMediaWithSpaceStorageMediaCancel,
    hasSharedMediaChangeActivationType,
  },
};
</script>
