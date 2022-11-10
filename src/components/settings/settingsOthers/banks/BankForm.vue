<template>
  <div class="">
    <PreLoader v-if="isLoading" />

    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="bank.mediaFile = $event.file"
          :defaultImg="imageSrc"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="'fullCode'"
            :value="bank.fullCode"
            v-on:changeValue="bank.fullCode = $event"
            :title="$t('Banks.code')"
            :imgName="'code.svg'"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="'bankNameAr'"
            :value="bank.bankNameAr"
            v-on:changeValue="bank.bankNameAr = $event"
            :title="$t('Banks.nameAr')"
            :imgName="'banks.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'bankNameEn'"
            :value="bank.bankNameEn"
            v-on:changeValue="bank.bankNameEn = $event"
            :title="$t('Banks.nameEn')"
            :imgName="'banks.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'bankNameUnd'"
            :value="bank.bankNameUnd"
            v-on:changeValue="bank.bankNameUnd = $event"
            :title="$t('Banks.nameUnd')"
            :imgName="'banks.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'bankDescriptionAr'"
            :value="bank.bankDescriptionAr"
            v-on:changeValue="bank.bankDescriptionAr = $event"
            :title="$t('Banks.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'bankDescriptionEn'"
            :value="bank.bankDescriptionEn"
            v-on:changeValue="bank.bankDescriptionEn = $event"
            :title="$t('Banks.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'bankDescriptionUnd'"
            :value="bank.bankDescriptionUnd"
            v-on:changeValue="bank.bankDescriptionUnd = $event"
            :title="$t('Banks.descriptionUnd')"
            :imgName="'description.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'bankNotes'"
            :value="bank.bankNotes"
            v-on:changeValue="bank.bankNotes = $event"
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />
        </div>
      </div>

      <div class="form-footer">
        <button
          name="submit"
          type="submit"
          class="btn btn-submit"
          @click.prevent="addOrUpdateBank"
        >
          {{ submitName }}
        </button>
        <router-link :to="{ name: 'Banks' }" class="btn btn-cancel">
          {{ $t("cancel") }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PreLoader from "@/components/general/PreLoader.vue";
import { BASE_URL } from "@/utils/constants";
import CustomInput from "@/components/general/CustomInput.vue";
import CustomFileInput from "@/components/general/CustomFileInput.vue";
import TextArea from "@/components/general/TextArea.vue";
import generalMixin from "@/utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomInput,
    CustomFileInput,
    TextArea,
  },
  computed: {
    ...mapGetters(["userAuthorizeToken", "constantsListsData"]),
  },
  data() {
    return {
      isLoading: false,
      exceptionMsg: null,
      exceptionImg: null,
      imageSrc: "",
    };
  },
  props: ["bank", "submitName"],
  methods: {
    async addOrUpdateBank() {
      this.$emit("addOrUpdateBank");
    },
  },
  async created() {
    this.imageSrc = this.bank.bankImagePath
      ? BASE_URL + this.bank.bankImagePath
      : this.bank.defaultImg;
  },
};
</script>

<style lang="scss"></style>
