<template>
  <div>
    <CustomBottomSheet :refName="'GeographicalDistributionInfo'">
      <h3 class="text-center mb-3">
        <img
          src="@/assets/images/geographicalDistributions.svg"
          class="icon-lg"
        />
        {{ $t("GeographicalDistributions.data") }}
      </h3>

      <div class="row">
        <DataLabelGroup
          :className="'col-md-6'"
          :value="geographicalDistribution.fullCode"
          :title="$t('GeographicalDistributions.code')"
          :imgName="'code.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6'"
          :value="geographicalDistribution.geographicalDistributionNameAr"
          :title="$t('GeographicalDistributions.nameAr')"
          :imgName="'geographicalDistributions.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="geographicalDistribution.geographicalDistributionNameEn"
          :title="$t('GeographicalDistributions.nameEn')"
          :imgName="'geographicalDistributions.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="geographicalDistribution.geographicalDistributionNameUnd"
          :title="$t('GeographicalDistributions.nameUnd')"
          :imgName="'geographicalDistributions.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="geographicalDistribution.geographicalDistributionCountryCode"
          :title="$t('GeographicalDistributions.countryCode')"
          :imgName="'number.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            geographicalDistribution.geographicalDistributionCountryCodeName
          "
          :title="$t('GeographicalDistributions.countryCodeName')"
          :imgName="'geographicalDistributions.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="geographicalDistribution.geographicalDistributionLatitude"
          :title="$t('GeographicalDistributions.latitude')"
          :imgName="'latitude.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="geographicalDistribution.geographicalDistributionEndLatitude"
          :title="$t('GeographicalDistributions.endLatitude')"
          :imgName="'latitude.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="geographicalDistribution.geographicalDistributionlongitude"
          :title="$t('GeographicalDistributions.longitude')"
          :imgName="'longitude.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="geographicalDistribution.geographicalDistributionEndlongitude"
          :title="$t('GeographicalDistributions.endLongitude')"
          :imgName="'longitude.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6'"
          :value="geographicalDistribution.geographicalDistributionMapLink"
          :title="$t('GeographicalDistributions.mapLink')"
          :imgName="'location.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            geographicalDistribution.geographicalDistributionDescriptionAr
          "
          :title="$t('GeographicalDistributions.descriptionAr')"
          :imgName="'description.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            geographicalDistribution.geographicalDistributionDescriptionEn
          "
          :title="$t('GeographicalDistributions.descriptionEn')"
          :imgName="'description.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            geographicalDistribution.geographicalDistributionDescriptionUnd
          "
          :title="$t('GeographicalDistributions.descriptionUnd')"
          :imgName="'description.svg'"
        />

        <DataLabelGroup
          :className="'col-md-12'"
          :value="geographicalDistribution.geographicalDistributionNotes"
          :title="$t('notes')"
          :imgName="'notes.svg'"
        />
      </div>
    </CustomBottomSheet>
  </div>
</template>

<script>
import CustomBottomSheet from "@/components/general/CustomBottomSheet.vue";
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
  },
  data() {
    return {};
  },
  props: ["geographicalDistribution"],
  methods: {},
};
</script>
