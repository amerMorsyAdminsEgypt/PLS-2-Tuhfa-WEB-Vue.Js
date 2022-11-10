<template>
  <b-modal
    id="PriceQuotationAffiliateOperationChangeActivationType"
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
        {{
          priceQuotationAffiliateOperation.priceQuotationAffiliateOperationTitleCurrent
        }}
      </span>
      )
    </h4>

    <div class="row">
      <CustomSelectBox
        :className="'col-12'"
        :id="'activationTypeToken'"
        :value="priceQuotationAffiliateOperation.activationTypeToken"
        :options="activationTypesTokensOptions"
        v-on:changeValue="
          priceQuotationAffiliateOperation.activationTypeToken = $event
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
          $bvModal.hide('PriceQuotationAffiliateOperationChangeActivationType')
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
import { ACTIVATION_TYPE } from "./../../../../utils/constantLists";
import {
  checkPrivilege,
  objectToFormData,
} from "./../../../../utils/functions";
import { getDialogOfActivationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import GeneralDelete from "./../../../../models/general/GeneralDelete";
import apiPriceQuotationAffiliateOperation from "./../../../../api/products/priceQuotationAffiliateOperations";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomSelectBox,
  },
  data() {
    return {
      model: new GeneralDelete(),
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  props: ["priceQuotationAffiliateOperation"],
  computed: {
    ...mapGetters(["usersPrivilegeData"]),
    activationTypesTokensOptions: function () {
      let arr = [];
      if (
        checkPrivilege(
          this.usersPrivilegeData.PriceQuotationAffiliateOperation.itemActive
        )
      ) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        if (obj) arr.push(obj);
      }
      if (
        checkPrivilege(
          this.usersPrivilegeData.PriceQuotationAffiliateOperation.itemArchived
        )
      ) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        if (obj) arr.push(obj);
      }
      if (
        checkPrivilege(
          this.usersPrivilegeData.PriceQuotationAffiliateOperation.itemBlocked
        )
      ) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  methods: {
    async changeActivationType() {
      this.isLoading = true;
      try {
        this.model.fillData({
          token:
            this.priceQuotationAffiliateOperation
              .priceQuotationAffiliateOperationToken,
          activationTypeToken:
            this.priceQuotationAffiliateOperation.activationTypeToken,
        });
        let formData = objectToFormData(this.model);
        const response =
          await apiPriceQuotationAffiliateOperation.changeActivationType(
            formData
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.hide(
            "PriceQuotationAffiliateOperationChangeActivationType"
          );
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
