<template>
  <div class="">
    <PreLoader v-if="isLoading" />

    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="geographicalDistribution.mediaFile = $event.file"
          :defaultImg="imageSrc"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <BaseTree
            :hierarchySystemTypeFilterToken="hierarchySystemTypeFilterToken"
            :treeModel="treeModelObject"
            v-on:changeValue="baseTreeChanged($event)"
            :showParent="true"
            :filterParentDirect="false"
            :enableEdit="isEditting"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'fullCode'"
            :value="geographicalDistribution.fullCode"
            v-on:changeValue="geographicalDistribution.fullCode = $event"
            :title="$t('GeographicalDistributions.code')"
            :imgName="'code.svg'"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="'geographicalDistributionNameAr'"
            :value="geographicalDistribution.geographicalDistributionNameAr"
            v-on:changeValue="
              geographicalDistribution.geographicalDistributionNameAr = $event
            "
            :title="$t('GeographicalDistributions.nameAr')"
            :imgName="'geographicalDistributions.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'geographicalDistributionNameEn'"
            :value="geographicalDistribution.geographicalDistributionNameEn"
            v-on:changeValue="
              geographicalDistribution.geographicalDistributionNameEn = $event
            "
            :title="$t('GeographicalDistributions.nameEn')"
            :imgName="'geographicalDistributions.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'geographicalDistributionNameUnd'"
            :value="geographicalDistribution.geographicalDistributionNameUnd"
            v-on:changeValue="
              geographicalDistribution.geographicalDistributionNameUnd = $event
            "
            :title="$t('GeographicalDistributions.nameUnd')"
            :imgName="'geographicalDistributions.svg'"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="'geographicalDistributionCountryCodeName'"
            :value="
              geographicalDistribution.geographicalDistributionCountryCodeName
            "
            v-on:changeValue="
              geographicalDistribution.geographicalDistributionCountryCodeName =
                $event
            "
            :title="$t('GeographicalDistributions.countryCodeName')"
            :imgName="'geographicalDistributions.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'geographicalDistributionCountryCode'"
            :value="
              geographicalDistribution.geographicalDistributionCountryCode
            "
            v-on:changeValue="
              geographicalDistribution.geographicalDistributionCountryCode =
                $event
            "
            :title="$t('GeographicalDistributions.countryCode')"
            :imgName="'number.svg'"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="'geographicalDistributionMapLink'"
            :value="geographicalDistribution.geographicalDistributionMapLink"
            v-on:changeValue="
              geographicalDistribution.geographicalDistributionMapLink = $event
            "
            :title="$t('GeographicalDistributions.mapLink')"
            :imgName="'location.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'geographicalDistributionLatitude'"
            :value="geographicalDistribution.geographicalDistributionLatitude"
            v-on:changeValue="
              geographicalDistribution.geographicalDistributionLatitude = $event
            "
            :title="$t('GeographicalDistributions.latitude')"
            :imgName="'latitude.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'geographicalDistributionEndLatitude'"
            :value="
              geographicalDistribution.geographicalDistributionEndLatitude
            "
            v-on:changeValue="
              geographicalDistribution.geographicalDistributionEndLatitude =
                $event
            "
            :title="$t('GeographicalDistributions.endLatitude')"
            :imgName="'latitude.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'geographicalDistributionlongitude'"
            :value="geographicalDistribution.geographicalDistributionlongitude"
            v-on:changeValue="
              geographicalDistribution.geographicalDistributionlongitude =
                $event
            "
            :title="$t('GeographicalDistributions.longitude')"
            :imgName="'longitude.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'geographicalDistributionEndlongitude'"
            :value="
              geographicalDistribution.geographicalDistributionEndlongitude
            "
            v-on:changeValue="
              geographicalDistribution.geographicalDistributionEndlongitude =
                $event
            "
            :title="$t('GeographicalDistributions.endLongitude')"
            :imgName="'longitude.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'geographicalDistributionDescriptionAr'"
            :value="
              geographicalDistribution.geographicalDistributionDescriptionAr
            "
            v-on:changeValue="
              geographicalDistribution.geographicalDistributionDescriptionAr =
                $event
            "
            :title="$t('GeographicalDistributions.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'geographicalDistributionDescriptionEn'"
            :value="
              geographicalDistribution.geographicalDistributionDescriptionEn
            "
            v-on:changeValue="
              geographicalDistribution.geographicalDistributionDescriptionEn =
                $event
            "
            :title="$t('GeographicalDistributions.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'geographicalDistributionDescriptionUnd'"
            :value="
              geographicalDistribution.geographicalDistributionDescriptionUnd
            "
            v-on:changeValue="
              geographicalDistribution.geographicalDistributionDescriptionUnd =
                $event
            "
            :title="$t('GeographicalDistributions.descriptionUnd')"
            :imgName="'description.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'geographicalDistributionNotes'"
            :value="geographicalDistribution.geographicalDistributionNotes"
            v-on:changeValue="
              geographicalDistribution.geographicalDistributionNotes = $event
            "
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
          @click.prevent="addOrUpdateGeographicalDistribution"
        >
          {{ submitName }}
        </button>
        <router-link
          :to="{ name: 'GeographicalDistributions' }"
          class="btn btn-cancel"
        >
          {{ $t("cancel") }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import { BASE_URL } from "@/utils/constants";
import CustomInput from "@/components/general/CustomInput.vue";
import BaseTree from "@/components/general/BaseTree.vue";
import CustomFileInput from "@/components/general/CustomFileInput.vue";
import TextArea from "@/components/general/TextArea.vue";
import { SYSTEM_TYPE } from "@/utils/constantLists";

class BaseTreeTokensOptions {
  systemComponentHierarchyToken = "";
  hierarchyTitle = "";
  systemComponentToken = "";
  componentTitle = "";
  parentToken = "";
  parentTitle = "";
  parentImgName = "";
}

export default {
  components: {
    PreLoader,
    CustomInput,
    BaseTree,
    CustomFileInput,
    TextArea,
  },
  computed: {
    hierarchySystemTypeFilterToken() {
      return SYSTEM_TYPE.GeographicalDistribution;
    },
    isEditting() {
      return this.submitName == this.$t("edit") ? true : false;
    },
  },
  data() {
    return {
      isLoading: false,
      exceptionMsg: null,
      exceptionImg: null,
      imageSrc: "",
      treeModelObject: new BaseTreeTokensOptions(),
    };
  },
  props: ["geographicalDistribution", "submitName"],
  methods: {
    setTreeModel() {
      this.treeModelObject.systemComponentHierarchyToken =
        this.geographicalDistribution.systemComponentHierarchyToken;
      this.treeModelObject.hierarchyTitle = this.$t(
        "SystemComponentsHierarchies.selectGeographicalDistribution"
      );
      this.treeModelObject.systemComponentToken =
        this.geographicalDistribution.systemComponentToken;
      this.treeModelObject.componentTitle = this.$t(
        "SystemComponents.selectGeographicalDistribution"
      );

      this.treeModelObject.parentToken =
        this.geographicalDistribution.parentGeographicalDistributionToken;
      this.treeModelObject.parentTitle = this.$t(
        "GeographicalDistributions.selectParent"
      );
      this.treeModelObject.parentImgName = "systemComponents.svg";
    },
    baseTreeChanged(data) {
      this.geographicalDistribution.systemComponentHierarchyToken =
        data.hierarchyToken;
      this.geographicalDistribution.systemComponentToken = data.componentToken;
      this.geographicalDistribution.parentGeographicalDistributionToken =
        data.parentToken;
    },
    setImageSrc() {
      this.imageSrc = this.geographicalDistribution
        .geographicalDistributionImagePath
        ? BASE_URL +
          this.geographicalDistribution.geographicalDistributionImagePath
        : this.geographicalDistribution.defaultImg;
    },
    async addOrUpdateGeographicalDistribution() {
      this.$emit("addOrUpdateGeographicalDistribution");
    },
  },
  async created() {
    this.setImageSrc();

    this.setTreeModel();
  },
};
</script>

<style lang="scss"></style>
