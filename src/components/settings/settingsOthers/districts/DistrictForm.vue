<template>
  <div class="">
    <PreLoader v-if="isLoading" />

    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="district.mediaFile = $event.file"
          :defaultImg="imageSrc"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            :className="'col-md-6'"
            :id="'countryToken'"
            :value="district.countryToken"
            :options="countryTokenOptions"
            v-on:changeValue="countryChanged($event)"
            :title="$t('Countries.select')"
            :imgName="'countries.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="'governorateToken'"
            :value="district.governorateToken"
            :options="governorateTokenOptions"
            v-on:changeValue="governorateChanged($event)"
            :title="$t('Governorates.select')"
            :imgName="'governorates.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="'cityToken'"
            :value="district.cityToken"
            :options="cityTokenOptions"
            v-on:changeValue="district.cityToken = $event"
            :title="$t('Cities.select')"
            :imgName="'cities.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'fullCode'"
            :value="district.fullCode"
            v-on:changeValue="district.fullCode = $event"
            :title="$t('Districts.code')"
            :imgName="'code.svg'"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="'districtNameAr'"
            :value="district.districtNameAr"
            v-on:changeValue="district.districtNameAr = $event"
            :title="$t('Districts.nameAr')"
            :imgName="'districts.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'districtNameEn'"
            :value="district.districtNameEn"
            v-on:changeValue="district.districtNameEn = $event"
            :title="$t('Districts.nameEn')"
            :imgName="'districts.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'districtNameUnd'"
            :value="district.districtNameUnd"
            v-on:changeValue="district.districtNameUnd = $event"
            :title="$t('Districts.nameUnd')"
            :imgName="'districts.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'districtDescriptionAr'"
            :value="district.districtDescriptionAr"
            v-on:changeValue="district.districtDescriptionAr = $event"
            :title="$t('Districts.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'districtDescriptionEn'"
            :value="district.districtDescriptionEn"
            v-on:changeValue="district.districtDescriptionEn = $event"
            :title="$t('Districts.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'districtDescriptionUnd'"
            :value="district.districtDescriptionUnd"
            v-on:changeValue="district.districtDescriptionUnd = $event"
            :title="$t('Districts.descriptionUnd')"
            :imgName="'description.svg'"
          />

          <TextArea
            :className="'col-md-12'"
            :id="'districtNotes'"
            :value="district.districtNotes"
            v-on:changeValue="district.districtNotes = $event"
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
          @click.prevent="addOrUpdateDistrict"
        >
          {{ submitName }}
        </button>
        <router-link :to="{ name: 'Districts' }" class="btn btn-cancel">
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
import Cities from "@/models/settings/settingsOthers/cities/Cities";

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
      cities: new Cities(),
      cityTokenOptions: [],
      imageSrc: "",
    };
  },
  props: ["district", "submitName"],
  methods: {
    async addOrUpdateDistrict() {
      this.$emit("addOrUpdateDistrict");
    },
    async getCountryDialog() {
      this.isLoading = true;
      this.countryTokenOptions = await this.countries.country.getCountryDialog(
        this.countries.filterData
      );
      this.isLoading = false;
    },
    countryChanged(token) {
      this.district.countryToken = token;
      this.district.governorateToken = "";
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
    governorateChanged(token) {
      this.district.governorateToken = token;
      this.district.cityToken = "";
      this.cities.filterData.governorateToken = token;
      this.getCityDialog();
    },
    async getCityDialog() {
      this.isLoading = true;
      this.cityTokenOptions = await this.cities.city.getCityDialog(
        this.cities.filterData
      );
      this.isLoading = false;
    },
  },
  async created() {
    this.getCountryDialog();
    this.getGovernorateDialog();
    this.getCityDialog();
    this.imageSrc = this.district.districtImagePath
      ? BASE_URL + this.district.districtImagePath
      : this.district.defaultImg;
  },
};
</script>

<style lang="scss"></style>
