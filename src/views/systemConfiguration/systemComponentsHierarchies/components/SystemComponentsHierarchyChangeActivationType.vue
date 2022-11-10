<template>
  <b-modal
    id="SystemComponentsHierarchyChangeActivationType"
    scrollable
    centered
    hide-footer
  >
    <PreLoader v-if="isLoading" />

    <template #modal-title>
      <h3>
        <img src="@/assets/images/changeActivationType.svg" class="icon-lg" />
        {{ $t("changeActivationType") }}
      </h3>
    </template>

    <h4 class="text-center">
      (
      <span class="co-red">
        {{ systemComponentsHierarchy.systemComponentsHierarchyNameCurrent }}
      </span>
      )
    </h4>

    <div class="row">
      <CustomSelectBox
        :className="'col-12'"
        :id="'activationTypeToken'"
        :value="systemComponentsHierarchy.activationTypeToken"
        :options="activationTypesTokenOptions"
        v-on:changeValue="
          systemComponentsHierarchy.activationTypeToken = $event
        "
        :title="$t('general.selectActivationType')"
        :imgName="'changeActivationType.svg'"
        :imgStatus="true"
      />
    </div>

    <div class="modal-footer">
      <button
        name="submit"
        type="submit"
        class="btn btn-submit"
        @click.prevent="changeActivationType"
      >
        {{ $t("ok") }}
      </button>
      <button
        name="submit"
        type="submit"
        class="btn btn-cancel"
        @click.prevent="
          $bvModal.hide('SystemComponentsHierarchyChangeActivationType')
        "
      >
        {{ $t("cancel") }}
      </button>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters } from "vuex";
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";

import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import { getDialogOfActivationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../../utils/generalMixin";

import apiSystemComponentsHierarchy from "./../../../../api/systemComponentsHierarchy";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomSelectBox,
  },
  data() {
    return {
      model: {},
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  props: ["systemComponentsHierarchy"],
  computed: {
    ...mapGetters(["usersPrivilegeData"]),
  },
  methods: {
    async changeActivationType() {
      this.isLoading = true;
      try {
        this.model = {
          token: this.systemComponentsHierarchy.systemComponentsHierarchyToken,
          activationTypeToken:
            this.systemComponentsHierarchy.activationTypeToken,
          systemTypeToken: this.systemComponentsHierarchy.systemTypeToken,
        };
        let formData = objectToFormData(this.model);
        const response =
          await apiSystemComponentsHierarchy.changeActivationType(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.hide("SystemComponentsHierarchyChangeActivationType");
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
