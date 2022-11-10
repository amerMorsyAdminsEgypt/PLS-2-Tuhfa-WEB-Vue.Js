<template>
  <div class="">
    <PreLoader v-if="isLoading" />

    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="country.mediaFile = $event.file"
          :defaultImg="imageSrc"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="'fullCode'"
            :value="country.fullCode"
            v-on:changeValue="country.fullCode = $event"
            :title="$t('Countries.code')"
            :imgName="'code.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="'countryCurrencyToken'"
            :value="country.countryCurrencyToken"
            :options="countryCurrencyTokenOptions"
            v-on:changeValue="country.countryCurrencyToken = $event"
            :title="$t('Countries.selectCurrency')"
            :imgName="'money.svg'"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="'countryNameAr'"
            :value="country.countryNameAr"
            :errors="errors_countryNameAr"
            v-on:changeValue="
              country.countryNameAr = $event;
              $v.country.countryNameAr.$touch();
            "
            :title="$t('Countries.nameAr')"
            :imgName="'countries.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'countryNameEn'"
            :value="country.countryNameEn"
            :errors="errors_countryNameEn"
            v-on:changeValue="
              country.countryNameEn = $event;
              $v.country.countryNameEn.$touch();
            "
            :title="$t('Countries.nameEn')"
            :imgName="'countries.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'countryNameUnd'"
            :value="country.countryNameUnd"
            v-on:changeValue="country.countryNameUnd = $event"
            :title="$t('Countries.nameUnd')"
            :imgName="'countries.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'nationalityNameAr'"
            :errors="errors_nationalityNameAr"
            :value="country.nationalityNameAr"
            v-on:changeValue="
              country.nationalityNameAr = $event;
              $v.country.nationalityNameAr.$touch();
            "
            :title="$t('Countries.nationalityAr')"
            :imgName="'countries.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'nationalityNameEn'"
            :errors="errors_nationalityNameEn"
            :value="country.nationalityNameEn"
            v-on:changeValue="
              country.nationalityNameEn = $event;
              $v.country.nationalityNameEn.$touch();
            "
            :title="$t('Countries.nationalityEn')"
            :imgName="'countries.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'nationalityNameUnd'"
            :value="country.nationalityNameUnd"
            v-on:changeValue="country.nationalityNameUnd = $event"
            :title="$t('Countries.nationalityUnd')"
            :imgName="'countries.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'countryDescriptionAr'"
            :value="country.countryDescriptionAr"
            v-on:changeValue="country.countryDescriptionAr = $event"
            :title="$t('Countries.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'countryDescriptionEn'"
            :value="country.countryDescriptionEn"
            v-on:changeValue="country.countryDescriptionEn = $event"
            :title="$t('Countries.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'countryDescriptionUnd'"
            :value="country.countryDescriptionUnd"
            v-on:changeValue="country.countryDescriptionUnd = $event"
            :title="$t('Countries.descriptionUnd')"
            :imgName="'description.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'countryNotes'"
            :value="country.countryNotes"
            v-on:changeValue="country.countryNotes = $event"
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
          @click.prevent="addOrUpdateCountry"
        >
          {{ submitName }}
        </button>
        <router-link :to="{ name: 'Countries' }" class="btn btn-cancel">
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
import CustomSelectBox from "@/components/general/CustomSelectBox.vue";
import CustomFileInput from "@/components/general/CustomFileInput.vue";
import TextArea from "@/components/general/TextArea.vue";
import generalMixin from "@/utils/generalMixin";
import { setDataMultiLang } from "@/utils/functions";
import { isValidNameAr, isValidNameEn } from "@/utils/validationHelper";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { bottomSheetScrollToTop } from "@/utils/functions";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    PreLoader,
    CustomInput,
    CustomSelectBox,
    CustomFileInput,
    TextArea,
  },

  data() {
    return {
      isLoading: false,
      exceptionMsg: null,
      exceptionImg: null,
      language: localStorage.getItem("userLanguage") || "ar-EG",
      countryCurrencyTokenOptions: [],
      imageSrc: "",
    };
  },
  props: ["country", "submitName"],
  validations: {
    country: {
      countryNameAr: { required, isValidNameAr },
      countryNameEn: { required, isValidNameEn },
      nationalityNameAr: { required, isValidNameAr },
      nationalityNameEn: { required, isValidNameEn },
    },
  },
  computed: {
    ...mapGetters(["userAuthorizeToken", "constantsListsData"]),
    errors_countryNameAr() {
      let errors = [];
      if (this.$v.country.countryNameAr.$error) {
        if (
          !this.$v.country.countryNameAr.required &&
          !this.$v.country.countryNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.country.countryNameAr.required &&
          !this.$v.country.countryNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_countryNameEn() {
      let errors = [];
      if (this.$v.country.countryNameEn.$error) {
        if (
          !this.$v.country.countryNameAr.required &&
          !this.$v.country.countryNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.country.countryNameEn.required &&
          !this.$v.country.countryNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_nationalityNameAr() {
      let errors = [];
      if (this.$v.country.nationalityNameAr.$error) {
        if (
          !this.$v.country.nationalityNameAr.required &&
          !this.$v.country.nationalityNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.country.nationalityNameAr.required &&
          !this.$v.country.nationalityNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_nationalityNameEn() {
      let errors = [];
      if (this.$v.country.nationalityNameEn.$error) {
        if (
          !this.$v.country.nationalityNameAr.required &&
          !this.$v.country.nationalityNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.country.nationalityNameEn.required &&
          !this.$v.country.nationalityNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
  },
  methods: {
    async addOrUpdateCountry() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        ((this.$v.country.countryNameAr.required &&
          this.$v.country.countryNameAr.isValidNameAr) ||
          (this.$v.country.countryNameEn.required &&
            this.$v.country.countryNameEn.isValidNameEn)) &&
        ((this.$v.country.nationalityNameAr.required &&
          this.$v.country.nationalityNameAr.isValidNameAr) ||
          (this.$v.country.nationalityNameEn.required &&
            this.$v.country.nationalityNameEn.isValidNameEn))
      ) {
        this.$emit("addOrUpdateCountry");
      }
    },
    async getDialogOfCurrencies() {
      this.isLoading = true;
      this.countryCurrencyTokenOptions = [];
      let items = this.constantsListsData.listCurrency;
      for (let item in items) {
        this.countryCurrencyTokenOptions.push({
          value: items[item]["itemToken"],
          text: setDataMultiLang(
            this.language,
            items[item]["itemNameAr"],
            items[item]["itemNameEn"]
          ),
        });
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getDialogOfCurrencies();
    this.imageSrc = this.country.countryImagePath
      ? BASE_URL + this.country.countryImagePath
      : this.country.defaultImg;
  },
};
</script>

<style lang="scss"></style>
