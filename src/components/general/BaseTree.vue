<template>
  <div class="row">
    <CustomSelectBox
      :isDisabled="disableAllinputs"
      :className="showParent ? 'col-md-6 col-lg-4' : 'col-md-6'"
      :id="`systemComponentHierarchyToken${hierarchySystemTypeFilterToken}`"
      :value="model.systemComponentHierarchyToken"
      :options="systemComponentsHierarchyTokenOptions"
      v-on:changeValue="hierarchyTokenChanged($event)"
      :title="model.hierarchyTitle"
      :imgName="'systemComponentsHierarchies.svg'"
    />
    <CustomSelectBox
      :isDisabled="componentDisabled || disableAllinputs"
      :className="showParent ? 'col-md-6 col-lg-4' : 'col-md-6'"
      :id="`systemComponentToken${hierarchySystemTypeFilterToken}`"
      :value="model.systemComponentToken"
      :options="systemComponentTokenOptions"
      v-on:changeValue="componentTokenChanged($event)"
      :title="model.componentTitle"
      :imgName="'systemComponents.svg'"
    />

    <CustomSelectBox
      v-if="showParent"
      :isDisabled="parentDisabled || disableAllinputs"
      :className="'col-md-12 col-lg-4'"
      :id="`parentToken${hierarchySystemTypeFilterToken}`"
      :value="model.parentToken"
      :options="parentTokenOptions"
      v-on:changeValue="parentTokenChanged($event)"
      :title="model.parentTitle"
      :imgName="model.parentImgName || 'geographicalDistributions.svg'"
    />
  </div>
</template>

<script>
import CustomSelectBox from "@/components/general/CustomSelectBox.vue";
import { STATUS, BASE_URL } from "@/utils/constants";
import generalMixin from "@/utils/generalMixin";
import { PLACE_TYPE_TOKENS, SYSTEM_TYPE } from "@/utils/constantLists";
import SystemComponents from "@/models/systemConfiguration/systemComponents/SystemComponents";
import SystemComponentsHierarchies from "@/models/systemConfiguration/systemComponentsHierarchies/SystemComponentsHierarchies";
import apiSystemComponentsHierarchy from "./../../api/systemComponentsHierarchy";
import GeographicalDistributions from "@/models/settings/settingsOthers/geographicalDistributions/GeographicalDistributions";
import PlacesImg from "@/assets/images/places.svg";
import Places from "@/models/places/Places";
import apiPlace from "./../../api/place";
import {
  getEducationalCategoriesDialog,
  getJobGradesDialog,
  getStoreItemsDialog,
  getBodyPartsDialog,
  getGeographicalDistributionsDialog,
} from "./../../utils/dialogsOfApi";

class BaseTreeTokens {
  hierarchyToken = "";
  componentToken = "";
  parentToken = "";
  systemTypeToken = "";
}

export default {
  name: "BaseTree",
  mixins: [generalMixin],
  components: { CustomSelectBox },
  props: {
    placeTypeToken: {
      type: String,
      default: "",
    },
    hierarchySystemTypeFilterToken: {
      type: String,
      default: SYSTEM_TYPE.GeographicalDistribution,
    },
    treeModel: {
      type: Object,
    },
    showParent: {
      type: Boolean,
      default: true,
    },
    filterParentDirect: {
      type: Boolean,
      default: false,
    },
    enableEdit: {
      type: Boolean,
      default: false,
    },
    disableAllinputs: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    treeModel: function (val) {
      this.model = val;
      this.filterParent();
    },
  },
  data() {
    return {
      model: this.treeModel,
      baseTreeTokens: new BaseTreeTokens(),
      parentTokenOptions: [],
      geographicalDistributions: new GeographicalDistributions(),
      places: "",
      systemComponents: "",
      systemComponentTokenOptions: [],
      systemComponentsHierarchies: "",
      systemComponentsHierarchyTokenOptions: [],
      systemComponentsHierarchiesDetailsList: [],
    };
  },
  computed: {
    placeType() {
      let modelName = "";
      switch (this.placeTypeToken) {
        case PLACE_TYPE_TOKENS.MasterAdmin:
          modelName = "placeMasterAdmin";
          break;
        case PLACE_TYPE_TOKENS.Employee:
          modelName = "placeEmployees";
          break;
        case PLACE_TYPE_TOKENS.Student:
          modelName = "placeStudents";
          break;
        case PLACE_TYPE_TOKENS.Client:
          modelName = "placeClients";
          break;
        case PLACE_TYPE_TOKENS.Other:
          modelName = "placeOthers";
          break;
      }
      return modelName;
    },
    systemComponentType() {
      let modelName = "";
      switch (this.hierarchySystemTypeFilterToken) {
        case SYSTEM_TYPE.EducationalActivity:
          modelName = "systemComponentEducationalCategory";
          break;
        case SYSTEM_TYPE.Place:
          modelName = "systemComponentPlace";
          break;
        case SYSTEM_TYPE.GeographicalDistribution:
          modelName = "systemComponentGeographicalDistribution";
          break;
        case SYSTEM_TYPE.JobGrade:
          modelName = "systemComponentJobGrade";
          break;
        case SYSTEM_TYPE.StoreItem:
          modelName = "systemComponentStoreItem";
          break;
        case SYSTEM_TYPE.BodyPart:
          modelName = "systemComponentBodyPart";
          break;
      }
      return modelName;
    },
    systemComponentsHierarchyType() {
      let modelName = "";
      switch (this.hierarchySystemTypeFilterToken) {
        case SYSTEM_TYPE.EducationalActivity:
          modelName = "systemComponentsHierarchyEducationalCategory";
          break;
        case SYSTEM_TYPE.Place:
          modelName = "systemComponentsHierarchyPlace";
          break;
        case SYSTEM_TYPE.GeographicalDistribution:
          modelName = "systemComponentsHierarchyGeographicalDistribution";
          break;
        case SYSTEM_TYPE.JobGrade:
          modelName = "systemComponentsHierarchyJobGrade";
          break;
        case SYSTEM_TYPE.StoreItem:
          modelName = "systemComponentsHierarchyStoreItem";
          break;
        case SYSTEM_TYPE.BodyPart:
          modelName = "systemComponentsHierarchyBodyPart";
          break;
      }
      return modelName;
    },
    componentDisabled() {
      return this.model.systemComponentHierarchyToken ? false : true;
    },
    componetIndex() {
      return this.systemComponentTokenOptions.findIndex(
        (x) => x.value == this.model.systemComponentToken
      );
    },
    parentDisabled() {
      if (this.filterParentDirect) {
        return this.model.systemComponentToken ? false : true;
      } else {
        return this.model.systemComponentToken && this.componetIndex
          ? false
          : true;
      }
    },
  },
  methods: {
    emitChanges() {
      this.baseTreeTokens.hierarchyToken =
        this.model.systemComponentHierarchyToken;
      this.baseTreeTokens.componentToken = this.model.systemComponentToken;

      this.baseTreeTokens.parentToken = this.model.parentToken;

      this.baseTreeTokens.systemTypeToken = this.hierarchySystemTypeFilterToken;

      this.$emit("changeValue", this.baseTreeTokens);
    },
    async hierarchyTokenChanged(token) {
      this.model.systemComponentHierarchyToken = token;
      this.baseTreeTokens.hierarchyToken = token;
      this.model.systemComponentToken = "";
      this.baseTreeTokens.componentToken = "";
      this.model.parentToken = "";
      this.baseTreeTokens.parentToken = "";
      if (token) {
        await this.hierarchyFilterParent(token);
        this.getParentDialog();
      }

      this.emitChanges();
    },
    async componentTokenChanged(token) {
      if (this.model.systemComponentToken != token) {
        this.model.systemComponentToken = token;
        this.model.parentToken = "";
        this.parentTokenOptions = [];
      }
      if (token) {
        await this.componentFilterParent(token);
        this.getParentDialog();
      }
      this.emitChanges();
    },
    async parentTokenChanged(token) {
      this.model.parentToken = token;
      this.emitChanges();
    },
    async hierarchyFilterParent(token) {
      let index = this.systemComponentsHierarchyTokenOptions.findIndex(
        (x) => x.value == token
      );

      if (index > -1) {
        let listOfComponent = this.handelSystemComponentDialog(
          this.getSystemComponentDataFromDetailsList(index)
        );
        let options = await this.getValueOfPromise(listOfComponent);
        this.setSystemComponentDialog(options);
      }
      this.model.FilterSystemComponentToken = this.model.systemComponentToken;
    },
    async componentFilterParent(token) {
      let index = this.systemComponentTokenOptions.findIndex(
        (x) => x.value == token
      );

      if (index > -1) {
        if (index == 0) {
          this.model.FilterSystemComponentToken = "";
        } else {
          this.model.FilterSystemComponentToken =
            this.systemComponentTokenOptions[index - 1].value;
        }
      }
    },

    async getValueOfPromise(promise) {
      let val = promise.then(
        function (result) {
          return result;
        },
        function (err) {
          console.log(err);
          return false;
        }
      );
      return val;
    },
    getSystemComponentDataFromDetailsList(index = null) {
      let list = [];

      if (index != null) {
        this.systemComponentsHierarchiesDetailsList[index]
          .filter((a) => a.systemComponentData)
          .map(function (a) {
            list.push(a.systemComponentData);
          });
      } else {
        this.systemComponentsHierarchiesDetailsList.forEach((element) => {
          element
            .filter((b) => b.systemComponentData)
            .map(function (b) {
              list.push(b.systemComponentData);
            });
        });
      }

      return list;
    },

    async getAllSystemComponentsHierarchies() {
      this.isLoading = true;
      let options = [];
      try {
        this.systemComponentsHierarchies.systemComponentsHierarchiesData = [];
        this.systemComponentsHierarchies.filterData.systemTypeToken =
          this.hierarchySystemTypeFilterToken;
        const response = await apiSystemComponentsHierarchy.getAll(
          this.systemComponentsHierarchies.filterData
        );
        if (response.data.status == STATUS.SUCCESS) {
          let apiData = response.data.systemComponentsHierarchiesData;
          let listOfHierarchy =
            this.handelSystemComponentHierarchyDialog(apiData);
          options = await this.getValueOfPromise(listOfHierarchy);
          this.setSystemComponentHierarchyDialog(options);

          await this.setSystemComponentsHierarchiesDetailsList(apiData);

          let allSystemComponents =
            this.getSystemComponentDataFromDetailsList();

          let listOfComponent =
            this.handelSystemComponentDialog(allSystemComponents);
          options = await this.getValueOfPromise(listOfComponent);
          this.setSystemComponentDialog(options);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          options.push({
            value: "",
            text: response.data.msg,
            image: "illustrator-something-wrong.svg",
          });
          this.setSystemComponentHierarchyDialog(options);
          this.setSystemComponentDialog(options);
        }
      } catch (e) {
        options.push({
          value: "",
          text: this.$t("errorCatch"),
          image: "illustrator-something-wrong.svg",
        });
        this.setSystemComponentHierarchyDialog(options);
        this.setSystemComponentDialog(options);
      }
      this.isLoading = false;
    },

    async getParentDialog() {
      this.isLoading = true;
      if (this.showParent) {
        if (this.filterParentDirect) {
          this.model.FilterSystemComponentToken =
            this.model.systemComponentToken;
        }
        switch (this.hierarchySystemTypeFilterToken) {
          case SYSTEM_TYPE.GeographicalDistribution:
            this.getGeographicalDistributionDialog();
            break;
          case SYSTEM_TYPE.Place:
            this.getPlaceDialog();
            break;
          case SYSTEM_TYPE.EducationalActivity:
            this.getEducationalCategoriesDialog();
            break;
          case SYSTEM_TYPE.JobGrade:
            this.getJobGradesDialog();
            break;
          case SYSTEM_TYPE.StoreItem:
            this.getStoreItemsDialog();
            break;
          case SYSTEM_TYPE.BodyPart:
            this.getBodyPartsDialog();
            break;
          default:
            break;
        }
      } else {
        this.parentTokenOptions = [];
      }

      this.isLoading = false;
    },
    async getGeographicalDistributionDialog() {
      this.isLoading = true;
      let params = {
        systemComponentHierarchyToken: this.model.systemComponentHierarchyToken,
        systemComponentToken: this.model.FilterSystemComponentToken,
      };
      this.parentTokenOptions = await getGeographicalDistributionsDialog(
        params
      );

      this.isLoading = false;
    },
    async getPlaceDialog() {
      this.isLoading = true;
      this.places.filterData.systemComponentHierarchyToken =
        this.model.systemComponentHierarchyToken;
      this.places.filterData.systemComponentToken =
        this.model.FilterSystemComponentToken;
      this.places.filterData.placeTypeToken = this.placeTypeToken;

      let options = [];
      try {
        let response = await apiPlace.getDialog(this.places.filterData);
        if (response.data.status == STATUS.SUCCESS) {
          const itemsData = response.data.itemsData;
          for (let item in itemsData) {
            options.push({
              value: itemsData[item]["itemToken"],
              text: itemsData[item]["itemName"],
              image: itemsData[item]["itemImagePath"]
                ? BASE_URL + itemsData[item]["itemImagePath"]
                : PlacesImg,
            });
          }
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          options.push({
            value: "",
            text: response.data.msg,
            image: PlacesImg,
          });
        }
      } catch (error) {
        options.push({
          value: "",
          text: this.t("errorCatch"),
          image: PlacesImg,
        });
      }
      this.parentTokenOptions = options;
      this.isLoading = false;
    },
    async getEducationalCategoriesDialog() {
      this.isLoading = true;
      let params = {
        systemComponentHierarchyToken: this.model.systemComponentHierarchyToken,
        systemComponentToken: this.model.FilterSystemComponentToken,
      };
      this.parentTokenOptions = await getEducationalCategoriesDialog(params);
      this.isLoading = false;
    },
    async getJobGradesDialog() {
      this.isLoading = true;
      let params = {
        systemComponentHierarchyToken: this.model.systemComponentHierarchyToken,
        systemComponentToken: this.model.FilterSystemComponentToken,
      };
      this.parentTokenOptions = await getJobGradesDialog(params);
      this.isLoading = false;
    },
    async getStoreItemsDialog() {
      this.isLoading = true;
      let params = {
        systemComponentHierarchyToken: this.model.systemComponentHierarchyToken,
        systemComponentToken: this.model.FilterSystemComponentToken,
      };
      this.parentTokenOptions = await getStoreItemsDialog(params);
      this.isLoading = false;
    },
    async getBodyPartsDialog() {
      this.isLoading = true;
      let params = {
        systemComponentHierarchyToken: this.model.systemComponentHierarchyToken,
        systemComponentToken: this.model.FilterSystemComponentToken,
      };
      this.parentTokenOptions = await getBodyPartsDialog(params);
      this.isLoading = false;
    },

    async handelSystemComponentDialog(list) {
      let options = [];
      list.forEach((item) => {
        options.push({
          value: item.systemComponentToken,
          text: `${item.fullCode} - ${item.systemComponentNameCurrent}`,
          image: item.systemComponentImagePath
            ? BASE_URL + item.systemComponentImagePath
            : this.systemComponents.systemComponent.defaultImg,
        });
      });

      return options;
    },
    async handelSystemComponentHierarchyDialog(list) {
      let options = [];
      list.forEach((item) => {
        options.push({
          value: item.systemComponentsHierarchyToken,
          text: `${item.fullCode} - ${item.systemComponentsHierarchyNameCurrent}`,
          image: item.systemComponentsHierarchyImagePath
            ? BASE_URL + item.systemComponentsHierarchyImagePath
            : this.systemComponentsHierarchies.systemComponentsHierarchy
                .defaultImg,
        });
      });
      return options;
    },
    async setSystemComponentDialog(options) {
      this.systemComponentTokenOptions = [];
      this.systemComponentTokenOptions = options;
    },
    async setSystemComponentHierarchyDialog(options) {
      this.systemComponentsHierarchyTokenOptions = options;
    },
    async setSystemComponentsHierarchiesDetailsList(list) {
      this.systemComponentsHierarchiesDetailsList = [];
      this.systemComponentsHierarchiesDetailsList = list
        .filter((a) => a.systemComponentsHierarchiesDetailsData)
        .map(function (a) {
          return a.systemComponentsHierarchiesDetailsData;
        });
    },
    setBaseTreeInit() {
      this.baseTreeTokens.hierarchyToken =
        this.model.systemComponentHierarchyToken;
      this.baseTreeTokens.componentToken = this.model.systemComponentToken;
      this.baseTreeTokens.parentToken = this.model.parentToken;
      this.baseTreeTokens.systemTypeToken = this.hierarchySystemTypeFilterToken;
    },
    async filterParent() {
      if (this.model.systemComponentHierarchyToken) {
        await this.hierarchyFilterParent(
          this.model.systemComponentHierarchyToken
        );
      }
      if (this.model.systemComponentToken) {
        await this.componentFilterParent(this.model.systemComponentToken);
      }
      await this.getParentDialog();
    },
  },

  async created() {
    this.places = new Places(this.placeType);
    this.systemComponents = new SystemComponents(this.systemComponentType);
    this.systemComponentsHierarchies = new SystemComponentsHierarchies(
      this.systemComponentsHierarchyType
    );
    await this.setBaseTreeInit();
    await this.getAllSystemComponentsHierarchies();
    await this.filterParent();
    await this.getParentDialog();
  },
};
</script>

<style lang="scss" scoped></style>
