<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="SharedMediaWithSpaceStorageMediaAdd"
      size="xl"
      :headerText="$t('SharedMediaWithSpaceStorageMedias.add')"
      :headerIcon="
        sharedMediaWithSpaceStorageMedias.sharedMediaWithSpaceStorageMedia.icon
      "
      :clickToClose="false"
      :swipeAble="false"
      @opened="
        sharedMediaWithSpaceStorageMedias.sharedMediaWithSpaceStorageMedia.setInitialValue()
      "
    >
      <SharedMediaWithSpaceStorageMediaForm
        v-if="!isLoading"
        id="add"
        :sharedMediaWithSpaceStorageMedia="
          sharedMediaWithSpaceStorageMedias.sharedMediaWithSpaceStorageMedia
        "
        v-on:submitForm="addSharedMediaWithSpaceStorageMedia()"
        bottomSheetName="SharedMediaWithSpaceStorageMediaAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="SharedMediaWithSpaceStorageMediaAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PreLoader from "./../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../components/general/ConfirmClearData.vue";
import SharedMediaWithSpaceStorageMediaForm from "./SharedMediaWithSpaceStorageMediaForm.vue";
import { STATUS } from "./../../utils/constants";
import SharedMediaWithSpaceStorageMedias from "./../../models/sharedMediaWithSpaceStorageMedias/SharedMediaWithSpaceStorageMedias";
import apiSharedMediaWithSpaceStorageMedia from "./../../api/sharedMediaWithSpaceStorageMedia";
import generalMixin from "./../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    SharedMediaWithSpaceStorageMediaForm,
  },

  computed: {
    ...mapGetters(["userAuthorizeToken"]),
  },
  data() {
    return {
      sharedMediaWithSpaceStorageMedias:
        new SharedMediaWithSpaceStorageMedias(),
    };
  },
  methods: {
    async addSharedMediaWithSpaceStorageMedia() {
      this.isLoading = true;
      let params = {
        userAuthorizeToken: this.userAuthorizeToken,
        sharedMediaTokens:
          this.sharedMediaWithSpaceStorageMedias
            .sharedMediaWithSpaceStorageMedia.sharedMediaTokens,
        storageSpaceTokens: [
          ...this.sharedMediaWithSpaceStorageMedias
            .sharedMediaWithSpaceStorageMedia.storageSpaceTokensCategory,
          ...this.sharedMediaWithSpaceStorageMedias
            .sharedMediaWithSpaceStorageMedia.storageSpaceTokensGroup,
        ],
      };

      try {
        const response = await apiSharedMediaWithSpaceStorageMedia.add(params);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show(
            "ConfirmClearData-SharedMediaWithSpaceStorageMediaAdd"
          );
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

    response(data) {
      this.sharedMediaWithSpaceStorageMedias.sharedMediaWithSpaceStorageMedia.storageSpaceTokensCategory =
        [];
      this.sharedMediaWithSpaceStorageMedias.sharedMediaWithSpaceStorageMedia.storageSpaceTokensGroup =
        [];
      switch (data) {
        case "yes":
          this.sharedMediaWithSpaceStorageMedias.sharedMediaWithSpaceStorageMedia.setInitialValue();
          break;
        case "leave":
          this.sharedMediaWithSpaceStorageMedias.sharedMediaWithSpaceStorageMedia.setInitialValue();
          this.closeBottomSheet("SharedMediaWithSpaceStorageMediaAdd");
          break;
      }
    },
  },
};
</script>
