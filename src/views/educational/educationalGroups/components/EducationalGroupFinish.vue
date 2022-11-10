<template>
  <b-modal
    id="EducationalGroupChangeFinishType"
    scrollable
    centered
    hide-footer
  >
    <PreLoader v-if="isLoading" />

    <template #modal-title>
      <h3>
        <img
          v-if="
            educationalGroup.educationalGroupTerminationTypeToken ==
            TERMINATION_TYPES.NotFinished
          "
          src="@/assets/images/finish.svg"
          class="icon-lg"
        />
        <img
          v-if="
            educationalGroup.educationalGroupTerminationTypeToken ==
            TERMINATION_TYPES.Finished
          "
          src="@/assets/images/unfinish.svg"
          class="icon-lg"
        />
        {{ $t("changeFinishType") }}
      </h3>
    </template>

    <h4
      class="text-center"
      v-if="
        educationalGroup.educationalGroupTerminationTypeToken ==
        TERMINATION_TYPES.NotFinished
      "
    >
      {{ $t("areYouSureToFinishStart") }}
      <span class="co-red">
        {{ educationalGroup.educationalGroupNameCurrent }}
      </span>
      {{ $t("areYouSureToFinishEnd") }}
    </h4>

    <h4
      class="text-center"
      v-if="
        educationalGroup.educationalGroupTerminationTypeToken ==
        TERMINATION_TYPES.Finished
      "
    >
      {{ $t("areYouSureToUnfinishStart") }}
      <span class="co-red">
        {{ educationalGroup.educationalGroupNameCurrent }}
      </span>
      {{ $t("areYouSureToUnfinishEnd") }}
    </h4>

    <div class="modal-footer">
      <button
        name="submit"
        type="submit"
        class="btn btn-submit"
        @click.prevent="changeFinishType"
      >
        {{ $t("ok") }}
      </button>
      <button
        name="submit"
        type="submit"
        class="btn btn-cancel"
        @click.prevent="$bvModal.hide('EducationalGroupChangeFinishType')"
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
import apiEducationalGroup from "./../../../../api/educational/educationalGroups";
import generalMixin from "./../../../../utils/generalMixin";
import { TERMINATION_TYPES } from "./../../../../utils/constantLists";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
  },
  data() {
    return {
      TERMINATION_TYPES,
    };
  },
  props: ["educationalGroup"],
  computed: {
    ...mapGetters(["usersPrivilegeData"]),
    filteredEducationalGroupFinishdStateTypeTokenOptions() {
      return this.educationalGroupTerminationTypeTokenOptions.filter((item) => {
        return (
          this.educationalGroup.oldEducationalGroupTerminationTypeToken !=
          item.value
        );
      });
    },
  },
  methods: {
    async changeFinishType() {
      this.isLoading = true;
      try {
        let educationalGroupTerminationTypeToken = "";
        switch (this.educationalGroup.educationalGroupTerminationTypeToken) {
          case TERMINATION_TYPES.NotFinished:
            educationalGroupTerminationTypeToken = TERMINATION_TYPES.Finished;
            break;
          case TERMINATION_TYPES.Finished:
            educationalGroupTerminationTypeToken =
              TERMINATION_TYPES.NotFinished;
            break;
        }
        let params = {
          educationalGroupToken: this.educationalGroup.educationalGroupToken,
          educationalGroupTerminationTypeToken:
            educationalGroupTerminationTypeToken,
        };
        let formData = objectToFormData(params);
        const response = await apiEducationalGroup.changeFinishType(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          setTimeout(() => {
            this.$bvModal.hide("EducationalGroupChangeFinishType");
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
