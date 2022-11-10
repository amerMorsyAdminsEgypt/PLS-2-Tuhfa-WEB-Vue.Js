<template>
  <CustomBottomSheet
    :refName="'filterSheet'"
    size="lg"
    :headerText="$t('filter')"
    :headerIcon="icon"
  >
    <div class="row">
      <CustomSelectBox
        v-if="usersStatus"
        :className="'col-md-12'"
        :id="`filter-userToken`"
        :value="filterData.mainToken"
        :options="userTokenOptions"
        v-on:changeValue="filterData.mainToken = $event"
        :title="$t('Users.select')"
        :imgName="'users.svg'"
      />
      <CustomSelectBox
        v-if="placesStatus"
        :className="'col-md-12'"
        :id="`filter-placeToken`"
        :value="filterData.mainToken"
        :options="placeTokenOptions"
        v-on:changeValue="filterData.mainToken = $event"
        :title="$t('Places.select')"
        :imgName="'places.svg'"
      />
    </div>

    <CustomBaseEntityFilter
      :className="'row'"
      :value="filterData"
      v-on:changeValue="filterData.fillData($event)"
    />

    <div class="form-actions">
      <div class="icon-submit" @click.prevent="search">
        <img src="@/assets/images/search-icon.svg" :title="$t('search')" />
      </div>
      <div @click.prevent="closeBottomSheet('filterSheet')" class="icon-cancel">
        <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
      </div>
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../components/general/CustomBottomSheet.vue";
import CustomBaseEntityFilter from "./../../../components/general/CustomBaseEntityFilter.vue";
import CustomSelectBox from "./../../../components/general/CustomSelectBox.vue";
import { getPlacesDialog, getUsersDialog } from "./../../../utils/dialogsOfApi";
import {
  STORAGE_SPACE_TYPE,
  PLACE_TYPE_TOKENS,
} from "./../../../utils/constantLists";
import generalMixin from "./../../../utils/generalMixin";
import icon from "@/assets/images/filter.svg";

export default {
  mixins: [generalMixin],
  props: {
    theFilterData: {
      type: Object,
    },
  },
  data() {
    return {
      filterData: this.theFilterData,
      modelName: this.$route.meta.modelName,
      storageSpaceTypeToken: this.$route.meta.storageSpaceTypeToken,
      userTypeToken: this.$route.meta.userTypeToken,
      usersStatus: false,
      placesStatus: false,
      userTokenOptions: [],
      placeTokenOptions: [],
      icon,
    };
  },
  components: {
    CustomBottomSheet,
    CustomBaseEntityFilter,
    CustomSelectBox,
  },
  computed: {
    placeTypeToken() {
      let storageSpaceTypeToken = this.$route.meta.storageSpaceTypeToken;
      let placeTypeToken = "";
      switch (storageSpaceTypeToken) {
        case STORAGE_SPACE_TYPE.AdminsEgypt:
          placeTypeToken = PLACE_TYPE_TOKENS.AdminsEgypt;
          break;
        case STORAGE_SPACE_TYPE.MasterAdmin:
          placeTypeToken = PLACE_TYPE_TOKENS.MasterAdmin;
          break;
        case STORAGE_SPACE_TYPE.Employee:
          placeTypeToken = PLACE_TYPE_TOKENS.Employee;
          break;
        case STORAGE_SPACE_TYPE.Student:
          placeTypeToken = PLACE_TYPE_TOKENS.Student;
          break;
        case STORAGE_SPACE_TYPE.Supplier:
          placeTypeToken = PLACE_TYPE_TOKENS.Supplier;
          break;
        case STORAGE_SPACE_TYPE.Parent:
          placeTypeToken = PLACE_TYPE_TOKENS.Parent;
          break;
        case STORAGE_SPACE_TYPE.Client:
          placeTypeToken = PLACE_TYPE_TOKENS.Client;
          break;

        default:
          placeTypeToken = PLACE_TYPE_TOKENS.Other;
          break;
      }
      return placeTypeToken;
    },
  },
  methods: {
    search() {
      this.closeBottomSheet("filterSheet");
      this.$emit("search", this.filterData);
    },
    async getUsersDialog() {
      this.isLoading = true;
      let params = {
        modelName: this.modelName,
        userTypeToken: this.userTypeToken,
      };
      this.userTokenOptions = await getUsersDialog(params);
      this.isLoading = false;
    },
    async getPlacesDialog() {
      this.isLoading = true;
      let params = { placeTypeToken: this.placeTypeToken };
      this.placeTokenOptions = await getPlacesDialog(params);
      this.isLoading = false;
    },
    changeStatusToFalse() {
      this.usersStatus = false;
      this.placesStatus = false;
    },
    checkModelStatus() {
      this.changeStatusToFalse();
      let storageSpaceTypeToken = this.$route.meta.storageSpaceTypeToken;
      switch (storageSpaceTypeToken) {
        case STORAGE_SPACE_TYPE.AdminsEgypt:
        case STORAGE_SPACE_TYPE.MasterAdmin:
        case STORAGE_SPACE_TYPE.Employee:
        case STORAGE_SPACE_TYPE.Student:
        case STORAGE_SPACE_TYPE.Supplier:
        case STORAGE_SPACE_TYPE.Parent:
        case STORAGE_SPACE_TYPE.Client:
          this.usersStatus = true;
          this.getUsersDialog();
          break;
        case STORAGE_SPACE_TYPE.Place:
          this.placesStatus = true;
          this.getPlacesDialog();
          break;
        default:
          break;
      }
    },
  },
  watch: {
    $route() {
      this.checkModelStatus();
    },
  },
  async created() {
    this.checkModelStatus();
  },
};
</script>
