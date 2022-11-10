<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="SharedMediaWithSpaceStorageMediaUnshare"
      size="xl"
      :headerText="$t('SharedMediaWithSpaceStorageMedias.unshare')"
      :headerIcon="
        sharedMediaWithSpaceStorageMedias.sharedMediaWithSpaceStorageMedia.icon
      "
      :clickToClose="false"
      :swipeAble="false"
      @opened="
        sharedMediaWithSpaceStorageMedias.sharedMediaWithSpaceStorageMedia.setInitialValue();
        getAllSharedMediaWithSpaceStorageMedias();
      "
    >
      <SharedMediaWithSpaceStorageMediaForm
        v-if="!isLoading"
        id="unshare"
        :sharedMediaWithSpaceStorageMedia="
          sharedMediaWithSpaceStorageMedias.sharedMediaWithSpaceStorageMedia
        "
        :storageSpaceDataListCategory="storageSpaceDataListCategory"
        :storageSpaceDataListGroup="storageSpaceDataListGroup"
        v-on:submitForm="unshareSharedMediaWithSpaceStorageMedia()"
        bottomSheetName="SharedMediaWithSpaceStorageMediaUnshare"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PreLoader from "./../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../components/general/CustomBottomSheet.vue";
import SharedMediaWithSpaceStorageMediaForm from "./SharedMediaWithSpaceStorageMediaForm.vue";
import { STATUS } from "./../../utils/constants";
import { objectToFormData } from "./../../utils/functions";
import SharedMediaWithSpaceStorageMedias from "./../../models/sharedMediaWithSpaceStorageMedias/SharedMediaWithSpaceStorageMedias";
import apiSharedMediaWithSpaceStorageMedia from "./../../api/sharedMediaWithSpaceStorageMedia";
import generalMixin from "./../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    SharedMediaWithSpaceStorageMediaForm,
  },
  props: {
    sharedMediaToken: {
      type: String,
      default: "",
    },
  },
  computed: {
    ...mapGetters(["userAuthorizeToken"]),
  },
  data() {
    return {
      sharedMediaWithSpaceStorageMedias:
        new SharedMediaWithSpaceStorageMedias(),
      storageSpaceDataListCategory: [],
      storageSpaceDataListGroup: [],
      storageSpaceDataListObject: [],
    };
  },
  methods: {
    async getAllSharedMediaWithSpaceStorageMedias() {
      this.isLoading = true;
      this.sharedMediaWithSpaceStorageMedias.filterData.sharedMediaToken =
        this.sharedMediaToken;
      try {
        const response = await apiSharedMediaWithSpaceStorageMedia.getAll(
          this.sharedMediaWithSpaceStorageMedias.filterData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.sharedMediaWithSpaceStorageMedias.sharedMediaWithSpaceStorageMedia.sharedMediaData.fillData(
            response.data.sharedMediaWithSpaceStorageMediaData[0]
              .sharedMediaData
          );

          this.storageSpaceDataListCategory =
            response.data.sharedMediaWithSpaceStorageMediaData
              .map((x) => x.storageSpaceData)
              .filter((c) => c.educationalCategoryToken);

          this.storageSpaceDataListGroup =
            response.data.sharedMediaWithSpaceStorageMediaData
              .map((x) => x.storageSpaceData)
              .filter((g) => g.educationalGroupToken);

          // set main list to unshift sharedMediaWithSpaceStorageMediaTokens
          this.storageSpaceDataListObject =
            response.data.sharedMediaWithSpaceStorageMediaData.map(function (
              x
            ) {
              let i = x.storageSpaceToken;
              let v = x.sharedMediaWithSpaceStorageMediaToken;

              return {
                storageSpaceToken: i,
                sharedMediaWithSpaceStorageMediaToken: v,
              };
            });
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.showMsg(response.data.msg);
          this.closeBottomSheet("SharedMediaWithSpaceStorageMediaUnshare");
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.showMsg(response.data.msg);
          this.closeBottomSheet("SharedMediaWithSpaceStorageMediaUnshare");
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));

        this.closeBottomSheet("SharedMediaWithSpaceStorageMediaUnshare");
      }
      this.isLoading = false;
    },

    async getSharedMediaWithSpaceStorageMediaTokens(storageSpaceTokens) {
      let list = [];
      storageSpaceTokens.forEach((storageSpaceToken) => {
        this.storageSpaceDataListObject
          .filter((o) => o.storageSpaceToken == storageSpaceToken)
          .map(function (o) {
            list.push(o.sharedMediaWithSpaceStorageMediaToken);
          });
      });
      return list;
    },

    async getFormData(storageSpaceTokens) {
      let sharedMediaWithSpaceStorageMediaTokens =
        await this.getSharedMediaWithSpaceStorageMediaTokens(
          storageSpaceTokens
        );

      let model = {
        sharedMediaWithSpaceStorageMediaTokens:
          sharedMediaWithSpaceStorageMediaTokens,
      };

      return model;
    },

    async unshareSharedMediaWithSpaceStorageMedia() {
      this.isLoading = true;
      let storageSpaceTokens = [
        ...this.sharedMediaWithSpaceStorageMedias
          .sharedMediaWithSpaceStorageMedia.storageSpaceTokensCategory,
        ...this.sharedMediaWithSpaceStorageMedias
          .sharedMediaWithSpaceStorageMedia.storageSpaceTokensGroup,
      ];

      let model = await this.getFormData(storageSpaceTokens);

      let formData = objectToFormData(model);

      try {
        const response = await apiSharedMediaWithSpaceStorageMedia.finalDelete(
          formData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("SharedMediaWithSpaceStorageMediaUnshare");
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
          this.showMsg(response.data.msg);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
  },
};
</script>
