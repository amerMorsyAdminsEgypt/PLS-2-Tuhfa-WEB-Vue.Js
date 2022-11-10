<template>
  <div class="">
    <PreLoader v-if="isLoading" />

    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="insuranceCompany.mediaFile = $event.file"
          :defaultImg="imageSrc"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="'fullCode'"
            :value="insuranceCompany.fullCode"
            v-on:changeValue="insuranceCompany.fullCode = $event"
            :title="$t('InsuranceCompanies.code')"
            :imgName="'code.svg'"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="'insuranceCompanyNameAr'"
            :value="insuranceCompany.insuranceCompanyNameAr"
            v-on:changeValue="insuranceCompany.insuranceCompanyNameAr = $event"
            :title="$t('InsuranceCompanies.nameAr')"
            :imgName="'insuranceCompanies.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'insuranceCompanyNameEn'"
            :value="insuranceCompany.insuranceCompanyNameEn"
            v-on:changeValue="insuranceCompany.insuranceCompanyNameEn = $event"
            :title="$t('InsuranceCompanies.nameEn')"
            :imgName="'insuranceCompanies.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'insuranceCompanyNameUnd'"
            :value="insuranceCompany.insuranceCompanyNameUnd"
            v-on:changeValue="insuranceCompany.insuranceCompanyNameUnd = $event"
            :title="$t('InsuranceCompanies.nameUnd')"
            :imgName="'insuranceCompanies.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'insuranceCompanyDescriptionAr'"
            :value="insuranceCompany.insuranceCompanyDescriptionAr"
            v-on:changeValue="
              insuranceCompany.insuranceCompanyDescriptionAr = $event
            "
            :title="$t('InsuranceCompanies.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'insuranceCompanyDescriptionEn'"
            :value="insuranceCompany.insuranceCompanyDescriptionEn"
            v-on:changeValue="
              insuranceCompany.insuranceCompanyDescriptionEn = $event
            "
            :title="$t('InsuranceCompanies.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'insuranceCompanyDescriptionUnd'"
            :value="insuranceCompany.insuranceCompanyDescriptionUnd"
            v-on:changeValue="
              insuranceCompany.insuranceCompanyDescriptionUnd = $event
            "
            :title="$t('InsuranceCompanies.descriptionUnd')"
            :imgName="'description.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'insuranceCompanyAddressAr'"
            :value="insuranceCompany.insuranceCompanyAddressAr"
            v-on:changeValue="
              insuranceCompany.insuranceCompanyAddressAr = $event
            "
            :title="$t('InsuranceCompanies.addressAr')"
            :imgName="'address.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'insuranceCompanyAddressEn'"
            :value="insuranceCompany.insuranceCompanyAddressEn"
            v-on:changeValue="
              insuranceCompany.insuranceCompanyAddressEn = $event
            "
            :title="$t('InsuranceCompanies.addressEn')"
            :imgName="'address.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'insuranceCompanyAddressUnd'"
            :value="insuranceCompany.insuranceCompanyAddressUnd"
            v-on:changeValue="
              insuranceCompany.insuranceCompanyAddressUnd = $event
            "
            :title="$t('InsuranceCompanies.addressUnd')"
            :imgName="'address.svg'"
          />

          <CustomPhonePicker
            :className="'col-md-6'"
            :id="'phone'"
            :countryCodeName="insuranceCompany.insuranceCompanyCountryCodeName"
            :countryCode="insuranceCompany.insuranceCompanyCountryCode"
            :phoneNumber="insuranceCompany.insuranceCompanyPhone"
            :title="$t('InsuranceCompanies.phone')"
            :imgName="'phone.svg'"
            v-on:changeValue="setPhone($event)"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'insuranceCompanyNotes'"
            :value="insuranceCompany.insuranceCompanyNotes"
            v-on:changeValue="insuranceCompany.insuranceCompanyNotes = $event"
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
          @click.prevent="addOrUpdateInsuranceCompany"
        >
          {{ submitName }}
        </button>
        <router-link
          :to="{ name: 'InsuranceCompanies' }"
          class="btn btn-cancel"
        >
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
import CustomPhonePicker from "@/components/general/CustomPhonePicker.vue";
import generalMixin from "@/utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomInput,
    CustomFileInput,
    TextArea,
    CustomPhonePicker,
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
  props: ["insuranceCompany", "submitName"],
  methods: {
    async addOrUpdateInsuranceCompany() {
      this.$emit("addOrUpdateInsuranceCompany");
    },
    setPhone(data) {
      this.insuranceCompany.insuranceCompanyCountryCodeName =
        data.countryCodeName;
      this.insuranceCompany.insuranceCompanyCountryCode = data.countryCode;
      this.insuranceCompany.insuranceCompanyPhone = data.phoneNumber;
      this.insuranceCompany.insuranceCompanyPhoneWithCC = data.CCWithCCName;
    },
  },
  async created() {
    this.imageSrc = this.insuranceCompany.insuranceCompanyImagePath
      ? BASE_URL + this.insuranceCompany.insuranceCompanyImagePath
      : this.insuranceCompany.defaultImg;
  },
};
</script>

<style lang="scss"></style>
