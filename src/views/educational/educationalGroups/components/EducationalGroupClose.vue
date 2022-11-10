<template>
  <b-modal id="EducationalGroupChangeCloseType" scrollable centered hide-footer>
    <PreLoader v-if="isLoading" />

    <template #modal-title>
      <h3>
        <img
          v-if="
            educationalGroup.educationalGroupClosedStateTypeToken ==
            CLOSED_STATE_TYPES.Open
          "
          src="@/assets/images/closeGroup.svg"
          class="icon-lg"
        />
        <img
          v-if="
            educationalGroup.educationalGroupClosedStateTypeToken ==
            CLOSED_STATE_TYPES.Closed
          "
          src="@/assets/images/openGroup.svg"
          class="icon-lg"
        />
        {{ $t("changeCloseOpenType") }}
      </h3>
    </template>

    <h4
      class="text-center"
      v-if="
        educationalGroup.educationalGroupClosedStateTypeToken ==
        CLOSED_STATE_TYPES.Open
      "
    >
      {{ $t("areYouSureToCloseStart") }}
      <span class="co-red">
        {{ educationalGroup.educationalGroupNameCurrent }}
      </span>
      {{ $t("areYouSureToCloseEnd") }}
    </h4>
    <h4
      class="text-center"
      v-if="
        educationalGroup.educationalGroupClosedStateTypeToken ==
        CLOSED_STATE_TYPES.Closed
      "
    >
      {{ $t("areYouSureToOpenStart") }}
      <span class="co-red">
        {{ educationalGroup.educationalGroupNameCurrent }}
      </span>
      {{ $t("areYouSureToOpenEnd") }}
    </h4>

    <div class="modal-footer">
      <button
        name="submit"
        type="submit"
        class="btn btn-submit"
        @click.prevent="changeCloseType"
      >
        {{ $t("ok") }}
      </button>
      <button
        name="submit"
        type="submit"
        class="btn btn-cancel"
        @click.prevent="$bvModal.hide('EducationalGroupChangeCloseType')"
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
// import { getDialogOfClosedStateType } from "./../../../../utils/dialogsOfConstantsLists";
import apiEducationalGroup from "./../../../../api/educational/educationalGroups";
import generalMixin from "./../../../../utils/generalMixin";
import { CLOSED_STATE_TYPES } from "./../../../../utils/constantLists";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
  },
  data() {
    return {
      CLOSED_STATE_TYPES,
    };
  },
  props: ["educationalGroup", "currentTab"],
  computed: {
    ...mapGetters(["usersPrivilegeData"]),
  },
  methods: {
    async changeCloseType() {
      this.isLoading = true;
      try {
        let educationalGroupClosedStateTypeToken = "";
        switch (this.educationalGroup.educationalGroupClosedStateTypeToken) {
          case CLOSED_STATE_TYPES.Closed:
            educationalGroupClosedStateTypeToken = CLOSED_STATE_TYPES.Open;
            break;
          case CLOSED_STATE_TYPES.Open:
            educationalGroupClosedStateTypeToken = CLOSED_STATE_TYPES.Closed;
            break;
        }
        let params = {
          educationalGroupToken: this.educationalGroup.educationalGroupToken,
          educationalGroupClosedStateTypeToken:
            educationalGroupClosedStateTypeToken,
        };
        let formData = objectToFormData(params);
        const response = await apiEducationalGroup.changeCloseType(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          setTimeout(() => {
            this.$bvModal.hide("EducationalGroupChangeCloseType");
            this.$emit("refresh");
          }, 1000);
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
