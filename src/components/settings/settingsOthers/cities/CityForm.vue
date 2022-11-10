<template>
  <div class="">
    <PreLoader v-if="isLoading" />

    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="city.mediaFile = $event.file"
          :defaultImg="imageSrc"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            :className="'col-md-6'"
            :id="'countryToken'"
            :value="city.countryToken"
            :options="countryTokenOptions"
            v-on:changeValue="countryChanged($event)"
            :title="$t('Countries.select')"
            :imgName="'countries.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="'governorateToken'"
            :value="city.governorateToken"
            :options="governorateTokenOptions"
            v-on:changeValue="city.governorateToken = $event"
            :title="$t('Governorates.select')"
            :imgName="'governorates.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'fullCode'"
            :value="city.fullCode"
            v-on:changeValue="city.fullCode = $event"
            :title="$t('Cities.code')"
            :imgName="'code.svg'"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="'cityNameAr'"
            :value="city.cityNameAr"
            v-on:changeValue="city.cityNameAr = $event"
            :title="$t('Cities.nameAr')"
            :imgName="'cities.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'cityNameEn'"
            :value="city.cityNameEn"
            v-on:changeValue="city.cityNameEn = $event"
            :title="$t('Cities.nameEn')"
            :imgName="'cities.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'cityNameUnd'"
            :value="city.cityNameUnd"
            v-on:changeValue="city.cityNameUnd = $event"
            :title="$t('Cities.nameUnd')"
            :imgName="'cities.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'cityDescriptionAr'"
            :value="city.cityDescriptionAr"
            v-on:changeValue="city.cityDescriptionAr = $event"
            :title="$t('Cities.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'cityDescriptionEn'"
            :value="city.cityDescriptionEn"
            v-on:changeValue="city.cityDescriptionEn = $event"
            :title="$t('Cities.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'cityDescriptionUnd'"
            :value="city.cityDescriptionUnd"
            v-on:changeValue="city.cityDescriptionUnd = $event"
            :title="$t('Cities.descriptionUnd')"
            :imgName="'description.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'cityNotes'"
            :value="city.cityNotes"
            v-on:changeValue="city.cityNotes = $event"
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
          @click.prevent="addOrUpdateCity"
        >
          {{ submitName }}
        </button>
        <router-link :to="{ name: 'Cities' }" class="btn btn-cancel">
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
import Countries from "@/models/settings/settingsOthers/countries/Countries";
import Governorates from "@/models/settings/settingsOthers/governorates/Governorates";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomInput,
    CustomSelectBox,
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
      countries: new Countries(),
      countryTokenOptions: [],
      governorates: new Governorates(),
      governorateTokenOptions: [],
      imageSrc: "",
    };
  },
  props: ["city", "submitName"],
  methods: {
    async addOrUpdateCity() {
      this.$emit("addOrUpdateCity");
    },

    async getCountryDialog() {
      this.isLoading = true;
      this.countryTokenOptions = await this.countries.country.getCountryDialog(
        this.countries.filterData
      );
      this.isLoading = false;
    },
    countryChanged(token) {
      this.city.countryToken = token;
      this.city.governorateToken = "";
      this.governorates.filterData.countryToken = token;
      this.getGovernorateDialog();
    },
    async getGovernorateDialog() {
      this.isLoading = true;
      this.governorateTokenOptions =
        await this.governorates.governorate.getGovernorateDialog(
          this.governorates.filterData
        );
      this.isLoading = false;
    },
  },
  async created() {
    this.getCountryDialog();
    this.getGovernorateDialog();
    this.imageSrc = this.city.cityImagePath
      ? BASE_URL + this.city.cityImagePath
      : this.city.defaultImg;
  },
};
</script>

<style lang="scss"></style>
