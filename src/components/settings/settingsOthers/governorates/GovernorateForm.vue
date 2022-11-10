<template>
  <div class="">
    <PreLoader v-if="isLoading" />

    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="governorate.mediaFile = $event.file"
          :defaultImg="imageSrc"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            :className="'col-md-6'"
            :id="'countryToken'"
            :value="governorate.countryToken"
            :options="countryTokenOptions"
            v-on:changeValue="governorate.countryToken = $event"
            :title="$t('Countries.select')"
            :imgName="'countries.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'fullCode'"
            :value="governorate.fullCode"
            v-on:changeValue="governorate.fullCode = $event"
            :title="$t('Governorates.code')"
            :imgName="'code.svg'"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="'governorateNameAr'"
            :value="governorate.governorateNameAr"
            v-on:changeValue="governorate.governorateNameAr = $event"
            :title="$t('Governorates.nameAr')"
            :imgName="'governorates.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'governorateNameEn'"
            :value="governorate.governorateNameEn"
            v-on:changeValue="governorate.governorateNameEn = $event"
            :title="$t('Governorates.nameEn')"
            :imgName="'governorates.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'governorateNameUnd'"
            :value="governorate.governorateNameUnd"
            v-on:changeValue="governorate.governorateNameUnd = $event"
            :title="$t('Governorates.nameUnd')"
            :imgName="'governorates.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'governorateDescriptionAr'"
            :value="governorate.governorateDescriptionAr"
            v-on:changeValue="governorate.governorateDescriptionAr = $event"
            :title="$t('Governorates.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'governorateDescriptionEn'"
            :value="governorate.governorateDescriptionEn"
            v-on:changeValue="governorate.governorateDescriptionEn = $event"
            :title="$t('Governorates.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'governorateDescriptionUnd'"
            :value="governorate.governorateDescriptionUnd"
            v-on:changeValue="governorate.governorateDescriptionUnd = $event"
            :title="$t('Governorates.descriptionUnd')"
            :imgName="'description.svg'"
          />

          <TextArea
            :className="'col-md-12'"
            :id="'governorateNotes'"
            :value="governorate.governorateNotes"
            v-on:changeValue="governorate.governorateNotes = $event"
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
          @click.prevent="addOrUpdateGovernorate"
        >
          {{ submitName }}
        </button>
        <router-link :to="{ name: 'Governorates' }" class="btn btn-cancel">
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
      imageSrc: "",
    };
  },
  props: ["governorate", "submitName"],
  methods: {
    async addOrUpdateGovernorate() {
      this.$emit("addOrUpdateGovernorate");
    },
    async getCountryDialog() {
      this.isLoading = true;
      this.countryTokenOptions = await this.countries.country.getCountryDialog(
        this.countries.filterData
      );
      this.isLoading = false;
    },
  },
  async created() {
    this.getCountryDialog();
    this.imageSrc = this.governorate.governorateImagePath
      ? BASE_URL + this.governorate.governorateImagePath
      : this.governorate.defaultImg;
  },
};
</script>

<style lang="scss"></style>
