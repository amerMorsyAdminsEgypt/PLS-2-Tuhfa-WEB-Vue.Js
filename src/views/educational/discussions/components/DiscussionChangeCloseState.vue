<template>
  <b-modal id="DiscussionChangeCloseState" scrollable centered hide-footer>
    <PreLoader v-if="isLoading" />

    <template #modal-title>
      <h3>
        <img src="@/assets/images/type.svg" class="icon-lg" />
        {{ $t("Discussions.changeClosedState") }}
      </h3>
    </template>

    <h4 class="text-center">
      (
      <span class="co-red">
        {{ discussion.discussionTitleCurrent }}
      </span>
      )
    </h4>

    <div class="modal-footer">
      <button
        name="submit"
        type="submit"
        class="btn btn-submit"
        @click.prevent="changeClosedState"
      >
        {{ $t("ok") }}
      </button>
      <button
        name="submit"
        type="submit"
        class="btn btn-cancel"
        @click.prevent="$bvModal.hide('DiscussionChangeCloseState')"
      >
        {{ $t("cancel") }}
      </button>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters } from "vuex";
import PreLoader from "./../../../../components/general/PreLoader.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import apiDiscussion from "./../../../../api/educational/discussions";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
  },
  data() {
    return {};
  },
  props: ["discussion"],
  computed: {
    ...mapGetters(["usersPrivilegeData"]),
  },
  methods: {
    async changeClosedState() {
      this.isLoading = true;
      try {
        let formData = objectToFormData({
          token: this.discussion.discussionToken,
        });
        const response = await apiDiscussion.changeClosedState(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.hide("DiscussionChangeCloseState");
          this.$emit("refresh");
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (e) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
  },
  async created() {},
};
</script>
