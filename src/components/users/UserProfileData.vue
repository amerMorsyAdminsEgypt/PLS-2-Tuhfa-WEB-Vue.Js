<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div class="custom-tab-card">
      <div class="row my-card">
        <CustomSelectBox
          :className="'col-md-6'"
          :id="'countryToken'"
          :value="
            !disabledStatus
              ? userProfileData.countryToken
              : userProfileData.countryData.countryNameCurrent
          "
          :options="countryTokenOptions"
          v-on:changeValue="countryChanged($event)"
          :title="$t('Countries.select')"
          :imgName="'countries.svg'"
          :disabledStatus="disabledStatus"
        />
        <CustomSelectBox
          :className="'col-md-6'"
          :id="'governorateToken'"
          :value="
            !disabledStatus
              ? userProfileData.governorateToken
              : userProfileData.governorateData.governorateNameCurrent
          "
          :options="governorateTokenOptions"
          v-on:changeValue="governorateChanged($event)"
          :title="$t('Governorates.select')"
          :imgName="'governorates.svg'"
          :disabledStatus="disabledStatus"
        />
        <CustomSelectBox
          :className="'col-md-6'"
          :id="'cityToken'"
          :value="
            !disabledStatus
              ? userProfileData.cityToken
              : userProfileData.cityData.cityNameCurrent
          "
          :options="cityTokenOptions"
          v-on:changeValue="cityChanged($event)"
          :title="$t('Cities.select')"
          :imgName="'cities.svg'"
          :disabledStatus="disabledStatus"
        />
        <CustomSelectBox
          :className="'col-md-6'"
          :id="'districtToken'"
          :value="
            !disabledStatus
              ? userProfileData.districtToken
              : userProfileData.districtData.districtNameCurrent
          "
          :options="districtTokenOptions"
          v-on:changeValue="userProfileData.districtToken = $event"
          :title="$t('Districts.select')"
          :imgName="'districts.svg'"
          :disabledStatus="disabledStatus"
        />
        <CustomSelectBox
          :className="'col-md-6'"
          :id="'nationalityCountryToken'"
          :value="
            !disabledStatus
              ? userProfileData.nationalityCountryToken
              : userProfileData.nationalityCountryData
                  .nationalityCountryNameCurrent
          "
          :options="nationalityCountryTokenOptions"
          v-on:changeValue="userProfileData.nationalityCountryToken = $event"
          :title="$t('Countries.select')"
          :imgName="'countries.svg'"
          :disabledStatus="disabledStatus"
        />
        <CustomSelectBox
          :className="'col-md-6'"
          :id="'militaryStatusTypeToken'"
          :value="
            !disabledStatus
              ? userProfileData.militaryStatusTypeToken
              : userProfileData.militaryStatusTypeData
                  .militaryStatusTypeNameCurrent
          "
          :options="militaryStatusTypeTokenOptions"
          v-on:changeValue="userProfileData.militaryStatusTypeToken = $event"
          :title="$t('MilitaryStatusTypes.select')"
          :imgName="'militaryStatus.svg'"
          :disabledStatus="disabledStatus"
        />
        <DatePicker
          :className="'col-md-6'"
          :id="'militaryStatuseTypeStartDate'"
          :value="userProfileData.militaryStatuseTypeStartDate"
          :title="$t('Users.militaryStatuseTypeStartDate')"
          :language="language"
          v-on:changeValue="
            userProfileData.militaryStatuseTypeStartDate = $event
          "
          :disabledStatus="disabledStatus"
        />
        <TimePicker
          :className="'col-md-6'"
          :id="'militaryStatuseTypeStartTime'"
          :value="userProfileData.militaryStatuseTypeStartTime"
          v-on:changeValue="
            userProfileData.militaryStatuseTypeStartTime = $event
          "
          :title="$t('Users.militaryStatuseTypeStartTime')"
          :language="language"
          :disabledStatus="disabledStatus"
        />
        <DatePicker
          :className="'col-md-6'"
          :id="'militaryStatuseTypeEndDate'"
          :value="userProfileData.militaryStatuseTypeEndDate"
          :title="$t('Users.militaryStatuseTypeEndDate')"
          :language="language"
          v-on:changeValue="userProfileData.militaryStatuseTypeEndDate = $event"
          :disabledStatus="disabledStatus"
        />
        <TimePicker
          :className="'col-md-6'"
          :id="'militaryStatuseTypeEndTime'"
          :value="userProfileData.militaryStatuseTypeEndTime"
          v-on:changeValue="userProfileData.militaryStatuseTypeEndTime = $event"
          :title="$t('Users.militaryStatuseTypeEndTime')"
          :language="language"
          :disabledStatus="disabledStatus"
        />
        <DatePicker
          :className="'col-md-6'"
          :id="'userBirthDate'"
          :value="userProfileData.userBirthDate"
          :title="$t('Users.userBirthDate')"
          :language="language"
          v-on:changeValue="userProfileData.userBirthDate = $event"
          :disabledStatus="disabledStatus"
        />
        <TimePicker
          :className="'col-md-6'"
          :id="'userBirthTime'"
          :value="userProfileData.userBirthTime"
          v-on:changeValue="userProfileData.userBirthTime = $event"
          :title="$t('Users.userBirthTime')"
          :language="language"
          :disabledStatus="disabledStatus"
        />
        <TextArea
          :className="'col-md-6'"
          :id="'userBirthPlaceNameAr'"
          :value="userProfileData.userBirthPlaceNameAr"
          :title="$t('Users.userBirthPlaceNameAr')"
          :imgName="'address.svg'"
          v-on:changeValue="userProfileData.userBirthPlaceNameAr = $event"
          :disabledStatus="disabledStatus"
        />
        <TextArea
          :className="'col-md-6'"
          :id="'userBirthPlaceNameEn'"
          :value="userProfileData.userBirthPlaceNameEn"
          :title="$t('Users.userBirthPlaceNameEn')"
          :imgName="'address.svg'"
          v-on:changeValue="userProfileData.userBirthPlaceNameEn = $event"
          :disabledStatus="disabledStatus"
        />
        <TextArea
          :className="'col-md-6'"
          :id="'userBirthPlaceNameUnd'"
          :value="userProfileData.userBirthPlaceNameUnd"
          :title="$t('Users.userBirthPlaceNameUnd')"
          :imgName="'address.svg'"
          v-on:changeValue="userProfileData.userBirthPlaceNameUnd = $event"
          :disabledStatus="disabledStatus"
        />
        <TextArea
          :className="'col-md-6'"
          :id="'userAddressAr'"
          :value="userProfileData.userAddressAr"
          :title="$t('Users.addressAr')"
          :imgName="'address.svg'"
          v-on:changeValue="userProfileData.userAddressAr = $event"
          :disabledStatus="disabledStatus"
        />
        <TextArea
          :className="'col-md-6'"
          :id="'userAddressEn'"
          :value="userProfileData.userAddressEn"
          :title="$t('Users.addressEn')"
          :imgName="'address.svg'"
          v-on:changeValue="userProfileData.userAddressEn = $event"
          :disabledStatus="disabledStatus"
        />
        <TextArea
          :className="'col-md-6'"
          :id="'userAddressUnd'"
          :value="userProfileData.userAddressUnd"
          :title="$t('Users.addressUnd')"
          :imgName="'address.svg'"
          v-on:changeValue="userProfileData.userAddressUnd = $event"
          :disabledStatus="disabledStatus"
        />
        <CustomPhonePicker
          :className="'col-md-9'"
          :id="'userPhone1'"
          :countryCodeName="userProfileData.userPhone1CountryCodeName"
          :countryCode="userProfileData.userPhone1CountryCode"
          :phoneNumber="userProfileData.userPhone1"
          :title="$t('Users.phone')"
          :imgName="'phone.svg'"
          v-on:changeValue="setPhone1($event)"
        />
        <CustomCheckbox
          :className="'col-md-3'"
          :value="userProfileData.userPhone1WhatsAppStatus"
          v-on:changeValue="userProfileData.userPhone1WhatsAppStatus = $event"
          :title="$t('Users.whatsAppStatus')"
          :imgName="'type.svg'"
          :disabledStatus="disabledStatus"
        />
        <CustomPhonePicker
          :className="'col-md-9'"
          :id="'userPhone2'"
          :countryCodeName="userProfileData.userPhone2CountryCodeName"
          :countryCode="userProfileData.userPhone2CountryCode"
          :phoneNumber="userProfileData.userPhone2"
          :title="$t('Users.phone')"
          :imgName="'phone.svg'"
          v-on:changeValue="setPhone2($event)"
        />
        <CustomCheckbox
          :className="'col-md-3'"
          :value="userProfileData.userPhone2WhatsAppStatus"
          v-on:changeValue="userProfileData.userPhone2WhatsAppStatus = $event"
          :title="$t('Users.whatsAppStatus')"
          :imgName="'type.svg'"
          :disabledStatus="disabledStatus"
        />
        <CustomPhonePicker
          :className="'col-md-9'"
          :id="'userPhone3'"
          :countryCodeName="userProfileData.userPhone3CountryCodeName"
          :countryCode="userProfileData.userPhone3CountryCode"
          :phoneNumber="userProfileData.userPhone3"
          :title="$t('Users.phone')"
          :imgName="'phone.svg'"
          v-on:changeValue="setPhone3($event)"
        />
        <CustomCheckbox
          :className="'col-md-3'"
          :value="userProfileData.userPhone3WhatsAppStatus"
          v-on:changeValue="userProfileData.userPhone3WhatsAppStatus = $event"
          :title="$t('Users.whatsAppStatus')"
          :imgName="'type.svg'"
          :disabledStatus="disabledStatus"
        />
        <CustomInput
          :className="'col-md-6'"
          :id="'userEmail'"
          :value="userProfileData.userEmail"
          v-on:changeValue="userProfileData.userEmail = $event"
          :title="$t('Users.userEmail')"
          :imgName="'email.svg'"
          :disabledStatus="disabledStatus"
        />
        <CustomSelectBox
          :className="'col-md-6'"
          :id="'socialStatuseToken'"
          :value="
            !disabledStatus
              ? userProfileData.socialStatuseToken
              : userProfileData.socialStatuseData.socialStatuseNameCurrent
          "
          :options="socialStatuseTokenOptions"
          v-on:changeValue="userProfileData.socialStatuseToken = $event"
          :title="$t('SocialStatuses.select')"
          :imgName="'socialStatuses.svg'"
          :disabledStatus="disabledStatus"
        />
        <TextArea
          :className="'col-md-6'"
          :id="'userSocialStatuseNotes'"
          :value="userProfileData.userSocialStatuseNotes"
          :title="$t('Users.userSocialStatuseNotes')"
          :imgName="'notes.svg'"
          v-on:changeValue="userProfileData.userSocialStatuseNotes = $event"
          :disabledStatus="disabledStatus"
        />
        <CustomSelectBox
          :className="'col-md-6'"
          :id="'insuranceCompanyToken'"
          :value="
            !disabledStatus
              ? userProfileData.insuranceCompanyToken
              : userProfileData.insuranceCompanyData.insuranceCompanyNameCurrent
          "
          :options="insuranceCompanyTokenOptions"
          v-on:changeValue="userProfileData.insuranceCompanyToken = $event"
          :title="$t('InsuranceCompanies.select')"
          :imgName="'insuranceCompanies.svg'"
          :disabledStatus="disabledStatus"
        />
        <CustomSelectBox
          :className="'col-md-6'"
          :id="'bankToken'"
          :value="
            !disabledStatus
              ? userProfileData.bankToken
              : userProfileData.bankData.bankNameCurrent
          "
          :options="bankTokenOptions"
          v-on:changeValue="userProfileData.bankToken = $event"
          :title="$t('Banks.select')"
          :imgName="'banks.svg'"
          :disabledStatus="disabledStatus"
        />
        <CustomInput
          :className="'col-md-6'"
          :id="'userBankAccountNumber'"
          :value="userProfileData.userBankAccountNumber"
          v-on:changeValue="userProfileData.userBankAccountNumber = $event"
          :title="$t('Users.bankAccountNumber')"
          :imgName="'number.svg'"
          :disabledStatus="disabledStatus"
        />
        <CustomSelectBox
          :className="'col-md-6'"
          :id="'sectorToken'"
          :value="
            !disabledStatus
              ? userProfileData.jobData.sectorToken
              : userProfileData.jobData.sectorData.sectorNameCurrent
          "
          :options="sectorTokenOptions"
          v-on:changeValue="sectorChanged($event)"
          :title="$t('Sectors.select')"
          :imgName="'sectors.svg'"
          :disabledStatus="disabledStatus"
        />
        <CustomSelectBox
          :className="'col-md-6'"
          :id="'jobToken'"
          :value="
            !disabledStatus
              ? userProfileData.jobToken
              : userProfileData.jobData.jobNameCurrent
          "
          :options="jobTokenOptions"
          v-on:changeValue="userProfileData.jobToken = $event"
          :title="$t('Jobs.select')"
          :imgName="'jobs.svg'"
          :disabledStatus="disabledStatus"
        />
        <CustomSelectBox
          :className="'col-md-6'"
          :id="'userGenderToken'"
          :value="
            !disabledStatus
              ? userProfileData.userGenderToken
              : userProfileData.userGenderNameCurrent
          "
          :options="userGenderTokenOptions"
          v-on:changeValue="userProfileData.userGenderToken = $event"
          :title="$t('Users.gender')"
          :imgName="'gender.svg'"
          :disabledStatus="disabledStatus"
        />
        <CustomSelectBox
          :className="'col-md-6'"
          :id="'userCitizenshipTypeToken'"
          :value="
            !disabledStatus
              ? userProfileData.userCitizenshipTypeToken
              : userProfileData.userCitizenshipTypeNameCurrent
          "
          :options="userCitizenshipTypeTokenOptions"
          v-on:changeValue="userProfileData.userCitizenshipTypeToken = $event"
          :title="$t('Users.citizenship')"
          :imgName="'citizenship.svg'"
          :disabledStatus="disabledStatus"
        />
        <CustomSelectBox
          :className="'col-md-6'"
          :id="'parentsSocialStatusToken'"
          :value="
            !disabledStatus
              ? userProfileData.parentsSocialStatusToken
              : userProfileData.parentsSocialStatusData.socialStatuseNameCurrent
          "
          :options="socialStatuseTokenOptions"
          v-on:changeValue="userProfileData.parentsSocialStatusToken = $event"
          :title="$t('Users.parentsSocialStatus')"
          :imgName="'socialStatuses.svg'"
          :disabledStatus="disabledStatus"
        />
        <CustomSelectBox
          :className="'col-md-6'"
          :id="'fatherDeathTypeToken'"
          :value="
            !disabledStatus
              ? userProfileData.fatherDeathTypeToken
              : userProfileData.fatherDeathTypeNameCurrent
          "
          :options="deathTypeTokenOptions"
          v-on:changeValue="userProfileData.fatherDeathTypeToken = $event"
          :title="$t('Users.fatherDeathType')"
          :imgName="'type.svg'"
          :disabledStatus="disabledStatus"
        />
        <CustomSelectBox
          :className="'col-md-6'"
          :id="'motherDeathTypeToken'"
          :value="
            !disabledStatus
              ? userProfileData.motherDeathTypeToken
              : userProfileData.motherDeathTypeNameCurrent
          "
          :options="deathTypeTokenOptions"
          v-on:changeValue="userProfileData.motherDeathTypeToken = $event"
          :title="$t('Users.motherDeathType')"
          :imgName="'type.svg'"
          :disabledStatus="disabledStatus"
        />
        <TextArea
          :className="'col-md-6'"
          :id="'userGeneralNotes'"
          :value="userProfileData.userGeneralNotes"
          :title="$t('notes')"
          :imgName="'notes.svg'"
          v-on:changeValue="userProfileData.userGeneralNotes = $event"
          :disabledStatus="disabledStatus"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import PreLoader from "@/components/general/PreLoader.vue";
import generalMixin from "@/utils/generalMixin";
import { setDataMultiLang } from "@/utils/functions";

import CustomInput from "@/components/general/CustomInput.vue";
import CustomSelectBox from "@/components/general/CustomSelectBox.vue";
import CustomCheckbox from "@/components/general/CustomCheckbox.vue";
import CustomPhonePicker from "@/components/general/CustomPhonePicker.vue";
import DatePicker from "@/components/general/DatePicker.vue";
import TextArea from "@/components/general/TextArea.vue";
import TimePicker from "@/components/general/TimePicker.vue";

import Countries from "@/models/settings/settingsOthers/countries/Countries";
import Governorates from "@/models/settings/settingsOthers/governorates/Governorates";
import Cities from "@/models/settings/settingsOthers/cities/Cities";
import Districts from "@/models/settings/settingsOthers/districts/Districts";
import MilitaryStatusTypes from "@/models/settings/settingsOthers/militaryStatusTypes/MilitaryStatusTypes";
import SocialStatuses from "@/models/settings/settingsOthers/socialStatuses/SocialStatuses";
import InsuranceCompanies from "@/models/settings/settingsOthers/insuranceCompanies/InsuranceCompanies";
import Banks from "@/models/settings/settingsOthers/banks/Banks";
import Sectors from "@/models/settings/settingsOthers/sectors/Sectors";
import Jobs from "@/models/settings/settingsOthers/jobs/Jobs";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomInput,
    CustomSelectBox,
    CustomCheckbox,
    CustomPhonePicker,
    DatePicker,
    TextArea,
    TimePicker,
  },
  computed: {
    ...mapGetters(["userAuthorizeToken", "constantsListsData"]),
  },
  data() {
    return {
      isLoading: true,
      exceptionMsg: null,
      exceptionImg: null,
      language: localStorage.getItem("userLanguage") || "ar-EG",
      countries: new Countries(),
      countryTokenOptions: [],
      governorates: new Governorates(),
      governorateTokenOptions: [],
      cities: new Cities(),
      cityTokenOptions: [],
      districts: new Districts(),
      districtTokenOptions: [],
      nationalityCountryTokenOptions: [],
      militaryStatusTypes: new MilitaryStatusTypes(),
      militaryStatusTypeTokenOptions: [],
      socialStatuses: new SocialStatuses(),
      socialStatuseTokenOptions: [],
      insuranceCompanies: new InsuranceCompanies(),
      insuranceCompanyTokenOptions: [],
      banks: new Banks(),
      bankTokenOptions: [],
      sectors: new Sectors(),
      sectorTokenOptions: [],
      jobs: new Jobs(),
      jobTokenOptions: [],
      userGenderTokenOptions: [],
      userCitizenshipTypeTokenOptions: [],
      deathTypeTokenOptions: [],
    };
  },
  props: {
    userProfileData: {
      type: Object,
    },

    disabledStatus: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    setPhone1(data) {
      this.userProfileData.userPhone1CountryCodeName = data.countryCodeName;
      this.userProfileData.userPhone1CountryCode = data.countryCode;
      this.userProfileData.userPhone1 = data.phoneNumber;
      this.userProfileData.userPhone1WithCC = data.CCWithCCName;
    },
    setPhone2(data) {
      this.userProfileData.userPhone2CountryCodeName = data.countryCodeName;
      this.userProfileData.userPhone2CountryCode = data.countryCode;
      this.userProfileData.userPhone2 = data.phoneNumber;
      this.userProfileData.userPhone2WithCC = data.CCWithCCName;
    },
    setPhone3(data) {
      this.userProfileData.userPhone3CountryCodeName = data.countryCodeName;
      this.userProfileData.userPhone3CountryCode = data.countryCode;
      this.userProfileData.userPhone3 = data.phoneNumber;
      this.userProfileData.userPhone3WithCC = data.CCWithCCName;
    },
    async getCountryDialog() {
      this.isLoading = true;
      this.countryTokenOptions = await this.countries.country.getCountryDialog(
        this.countries.filterData
      );
      this.isLoading = false;
    },
    countryChanged(token) {
      this.userProfileData.countryToken = token;
      this.userProfileData.governorateToken = "";
      this.userProfileData.cityToken = "";
      this.userProfileData.districtToken = "";
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
      this.userProfileData.governorateToken = token;
      this.userProfileData.cityToken = "";
      this.userProfileData.districtToken = "";
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
    cityChanged(token) {
      this.userProfileData.cityToken = token;
      this.userProfileData.districtToken = "";
      this.districts.filterData.cityToken = token;
      this.getDistrictDialog();
    },
    async getDistrictDialog() {
      this.isLoading = true;
      this.districtTokenOptions =
        await this.districts.district.getDistrictDialog(
          this.districts.filterData
        );
      this.isLoading = false;
    },
    async getNationalityDialog() {
      this.isLoading = true;
      this.nationalityCountryTokenOptions =
        await this.countries.country.getNationalityDialog(
          this.countries.filterData
        );
      this.isLoading = false;
    },
    async getMilitaryStatusTypeDialog() {
      this.isLoading = true;
      this.militaryStatusTypeTokenOptions =
        await this.militaryStatusTypes.militaryStatusType.getMilitaryStatusTypeDialog(
          this.militaryStatusTypes.filterData
        );
      this.isLoading = false;
    },
    async getSocialStatuseDialog() {
      this.isLoading = true;
      this.socialStatuseTokenOptions =
        await this.socialStatuses.socialStatuse.getSocialStatuseDialog(
          this.socialStatuses.filterData
        );
      this.isLoading = false;
    },
    async getInsuranceCompanyDialog() {
      this.isLoading = true;
      this.insuranceCompanyTokenOptions =
        await this.insuranceCompanies.insuranceCompany.getInsuranceCompanyDialog(
          this.insuranceCompanies.filterData
        );
      this.isLoading = false;
    },
    async getBankDialog() {
      this.isLoading = true;
      this.bankTokenOptions = await this.banks.bank.getBankDialog(
        this.banks.filterData
      );
      this.isLoading = false;
    },
    async getSectorDialog() {
      this.isLoading = true;
      this.sectorTokenOptions = await this.sectors.sector.getSectorDialog(
        this.sectors.filterData
      );
      this.isLoading = false;
    },
    sectorChanged(token) {
      this.userProfileData.jobData.sectorToken = token;
      this.userProfileData.jobToken = "";
      this.jobs.filterData.sectorToken = token;
      this.getJobDialog();
    },
    async getJobDialog() {
      this.isLoading = true;
      this.jobTokenOptions = await this.jobs.job.getJobDialog(
        this.jobs.filterData
      );
      this.isLoading = false;
    },
    async getDialogOfGenders() {
      this.isLoading = true;
      this.userGenderTokenOptions = [];
      let genders = this.constantsListsData.listGender || [];
      if (genders.length) {
        for (let item in genders) {
          this.userGenderTokenOptions.push({
            value: genders[item]["itemToken"],
            text: setDataMultiLang(
              this.language,
              genders[item]["itemNameAr"],
              genders[item]["itemNameEn"]
            ),
          });
        }
      }
      this.isLoading = false;
    },
    async getDialogOfCitizenshipTypes() {
      this.isLoading = true;
      this.userCitizenshipTypeTokenOptions = [];
      let citizenshipTypes = this.constantsListsData.listCitizenshipType || [];
      if (citizenshipTypes.length) {
        for (let item in citizenshipTypes) {
          this.userCitizenshipTypeTokenOptions.push({
            value: citizenshipTypes[item]["itemToken"],
            text: setDataMultiLang(
              this.language,
              citizenshipTypes[item]["itemNameAr"],
              citizenshipTypes[item]["itemNameEn"]
            ),
          });
        }
      }
      this.isLoading = false;
    },
    async getDialogOfDeathTypes() {
      this.isLoading = true;
      this.deathTypeTokenOptions = [];
      let deathTypes = this.constantsListsData.listDeathType || [];
      if (deathTypes.length) {
        for (let item in deathTypes) {
          this.deathTypeTokenOptions.push({
            value: deathTypes[item]["itemToken"],
            text: setDataMultiLang(
              this.language,
              deathTypes[item]["itemNameAr"],
              deathTypes[item]["itemNameEn"]
            ),
          });
        }
      }
      this.isLoading = false;
    },
  },
  watch: {},
  async created() {
    this.getCountryDialog();
    this.getGovernorateDialog();
    this.getCityDialog();
    this.getDistrictDialog();
    this.getNationalityDialog();
    this.getMilitaryStatusTypeDialog();
    this.getSocialStatuseDialog();
    this.getInsuranceCompanyDialog();
    this.getBankDialog();
    this.getSectorDialog();
    this.getJobDialog();
    this.getDialogOfGenders();
    this.getDialogOfCitizenshipTypes();
    this.getDialogOfDeathTypes();
  },
};
</script>

<style lang="scss"></style>
