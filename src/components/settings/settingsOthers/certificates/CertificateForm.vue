<template>
  <div class="">
    <PreLoader v-if="isLoading" />

    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="certificate.mediaFile = $event.file"
          :defaultImg="imageSrc"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="'fullCode'"
            :value="certificate.fullCode"
            v-on:changeValue="certificate.fullCode = $event"
            :title="$t('Certificates.code')"
            :imgName="'code.svg'"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="'certificateNameAr'"
            :value="certificate.certificateNameAr"
            v-on:changeValue="certificate.certificateNameAr = $event"
            :title="$t('Certificates.nameAr')"
            :imgName="'certificates.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'certificateNameEn'"
            :value="certificate.certificateNameEn"
            v-on:changeValue="certificate.certificateNameEn = $event"
            :title="$t('Certificates.nameEn')"
            :imgName="'certificates.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'certificateNameUnd'"
            :value="certificate.certificateNameUnd"
            v-on:changeValue="certificate.certificateNameUnd = $event"
            :title="$t('Certificates.nameUnd')"
            :imgName="'certificates.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'certificateDescriptionAr'"
            :value="certificate.certificateDescriptionAr"
            v-on:changeValue="certificate.certificateDescriptionAr = $event"
            :title="$t('Certificates.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'certificateDescriptionEn'"
            :value="certificate.certificateDescriptionEn"
            v-on:changeValue="certificate.certificateDescriptionEn = $event"
            :title="$t('Certificates.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'certificateDescriptionUnd'"
            :value="certificate.certificateDescriptionUnd"
            v-on:changeValue="certificate.certificateDescriptionUnd = $event"
            :title="$t('Certificates.descriptionUnd')"
            :imgName="'description.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'certificateNotes'"
            :value="certificate.certificateNotes"
            v-on:changeValue="certificate.certificateNotes = $event"
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
          @click.prevent="addOrUpdateCertificate"
        >
          {{ submitName }}
        </button>
        <router-link :to="{ name: 'Certificates' }" class="btn btn-cancel">
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
  props: ["certificate", "submitName"],
  methods: {
    async addOrUpdateCertificate() {
      this.$emit("addOrUpdateCertificate");
    },
  },
  async created() {
    this.imageSrc = this.certificate.certificateImagePath
      ? BASE_URL + this.certificate.certificateImagePath
      : this.certificate.defaultImg;
  },
};
</script>

<style lang="scss"></style>
