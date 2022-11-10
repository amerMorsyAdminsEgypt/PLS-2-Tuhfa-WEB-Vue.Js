<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(sharedMediaFolder, index) in sharedMediaFoldersData"
      :key="index"
      :className="'col-sm-12 col-md-6 col-lg-4'"
      :title="sharedMediaFolder.sharedMediaFolderNameCurrent"
      :description="sharedMediaFolder.fullCode"
      :imagePath="sharedMediaFolder.sharedMediaFolderImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li v-if="checkPrivilege(hasSharedMedia())">
        <router-link
          :to="{
            name: 'SharedMedias',
            params: {
              sharedMediaFolderToken: sharedMediaFolder.sharedMediaFolderToken,
            },
          }"
          :title="$t('SharedMedias.modelName')"
        >
          <img src="@/assets/images/media.svg" />
        </router-link>
      </li>
      <li>
        <button
          :title="$t('info')"
          @click="
            setSharedMediaFolderData(sharedMediaFolder);
            openBottomSheet('SharedMediaFolderInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setSharedMediaFolderData(sharedMediaFolder);
            openBottomSheet('SharedMediaFolderQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasSharedMediaFolderEdit())">
        <button
          @click="
            setSharedMediaFolderData(sharedMediaFolder);
            openBottomSheet('SharedMediaFolderUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasSharedMediaFolderFinaleDelete())">
        <button
          v-b-modal.SharedMediaFolderDelete
          :title="$t('delete')"
          @click="setSharedMediaFolderData(sharedMediaFolder)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasSharedMediaFolderChangeActivationType())">
        <button
          v-b-modal.SharedMediaFolderChangeActivationType
          :title="$t('changeActivationType')"
          @click="setSharedMediaFolderData(sharedMediaFolder)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setSharedMediaFolderData(sharedMediaFolder);
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
  hasSharedMediaFolderEdit,
  hasSharedMedia,
  hasSharedMediaFolderFinaleDelete,
  hasSharedMediaFolderChangeActivationType,
} from "./../../../utils/privilegeHelper";
import CustomCard from "./../../../components/general/CustomCard.vue";
import generalMixin from "./../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["sharedMediaFoldersData", "filterData", "defaultImg"],
  methods: {
    setSharedMediaFolderData(sharedMediaFolder) {
      this.$emit("setSharedMediaFolderData", sharedMediaFolder);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasSharedMediaFolderEdit,
    hasSharedMedia,
    hasSharedMediaFolderFinaleDelete,
    hasSharedMediaFolderChangeActivationType,
  },
};
</script>
