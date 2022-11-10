import { STATUS, BASE_URL } from "@/utils/constants";
import generalMixin from "@/utils/generalMixin";
import GeographicalDistributions from "@/models/settings/settingsOthers/geographicalDistributions/GeographicalDistributions";
import { SYSTEM_TYPE } from "@/utils/constantLists";
import SystemComponents from "@/models/systemConfiguration/systemComponents/SystemComponents";
import SystemComponentsHierarchies from "@/models/systemConfiguration/systemComponentsHierarchies/SystemComponentsHierarchies";

export default {
  mixins: [generalMixin],
  components: {},
  computed: {},
  data() {
    return {
      componentDisabled: true,
      geographicalDisabled: true,
      geographicalDistributions: new GeographicalDistributions(),
      geographicalDistributionTokenOptions: [],
      systemComponents: new SystemComponents(),
      systemComponentTokenOptions: [],
      systemComponentsHierarchies: new SystemComponentsHierarchies(),
      systemComponentsHierarchyTokenOptions: [],
      systemComponentsHierarchiesDetailsList: [],
    };
  },
  methods: {
    async hierarchyTokenChanged(model, token) {
      if (token) {
        this[model].systemComponentHierarchyToken = token;
        this.componentDisabled = false;
        let index = this.systemComponentsHierarchyTokenOptions.findIndex(
          (x) => x.value == token
        );
        // filter system componet
        if (index > -1) {
          let listOfComponent = this.handelSystemComponentDialog(
            this.getSystemComponentDataFromDetailsList(index)
          );
          let options = await this.getValueOfPromise(listOfComponent);
          this.setSystemComponentDialog(options);
        }

        this.geographicalDistributions.filterData.systemComponentHierarchyToken =
          token;
        this.geographicalDistributions.filterData.systemComponentToken =
          this.geographicalDistribution.systemComponentToken;
        this.getGeographicalDistributionDialog();
      } else {
        this[model].systemComponentToken = "";
        this[model].parentGeographicalDistributionToken = "";
        this.componentDisabled = true;
        this.geographicalDisabled = true;
      }
    },
    async componentTokenChanged(model, token) {
      if (token) {
        this[model].systemComponentToken = token;
        this.geographicalDisabled = false;
        let index = this.systemComponentTokenOptions.findIndex(
          (x) => x.value == token
        );
        // filter system componet
        if (index > -1) {
          if (index == 0) {
            this.geographicalDisabled = true;
          } else {
            let FilterSystemComponentToken =
              this.systemComponentTokenOptions[index - 1].value;
            this.geographicalDistributions.filterData.systemComponentToken =
              FilterSystemComponentToken;
            this.getGeographicalDistributionDialog();
          }
        }
      } else {
        this[model].systemComponentToken = "";
        this[model].parentGeographicalDistributionToken = "";
        this.componentDisabled = true;
        this.geographicalDisabled = true;
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
          SYSTEM_TYPE.GeographicalDistribution;
        const response =
          await this.systemComponentsHierarchies.systemComponentsHierarchy.getAllSystemComponentsHierarchies(
            this.systemComponentsHierarchies.pagination,
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
      } catch (error) {
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

    async getGeographicalDistributionDialog() {
      this.isLoading = true;

      try {
        this.geographicalDistributionTokenOptions =
          await this.geographicalDistributions.geographicalDistribution.getGeographicalDistributionDialog(
            this.geographicalDistributions.filterData
          );
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
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
      this.systemComponentsHierarchiesDetailsList = list
        .filter((a) => a.systemComponentsHierarchiesDetailsData)
        .map(function (a) {
          return a.systemComponentsHierarchiesDetailsData;
        });
    },
  },
  async created() {
    this.getAllSystemComponentsHierarchies();
    this.getGeographicalDistributionDialog();
  },
};
