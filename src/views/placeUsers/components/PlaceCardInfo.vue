<template>
  <div class="user-card-info mt-4">
    <span v-b-toggle.placeData class="collapse-title">
      {{ $t("Places.data") }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </span>
    <b-collapse id="placeData">
      <div class="row">
        <div class="user-img-container col-lg-4">
          <img
            class="user-img"
            :src="fullPathFileFromServer(placeData.placeImagePath, placeImg)"
            :onerror="`this.src='${placeImg}'`"
          />
        </div>
        <div class="col-lg-4 col-md-6">
          <DataLabelGroup
            :value="placeData.fullCode"
            :title="$t('Places.code')"
            :imgName="'code.svg'"
          />
          <DataLabelGroup
            :value="placeData.placeNameCurrent"
            :title="$t('Places.name')"
            :imgName="'places.svg'"
          />
          <DataLabelGroup
            :class="'phone-number'"
            :value="placeData.placePhone1WithCC"
            :title="$t('phoneNumber')"
            :imgName="'phone.svg'"
          />
          <DataLabelGroup
            :value="placeData.placeAddressCurrent"
            :title="$t('Places.address')"
            :imgName="'address.svg'"
          />
        </div>
        <div class="col-lg-4 col-md-6">
          <DataLabelGroup
            :value="placeData.placeActivityTypeNameCurrent"
            :title="$t('Places.activityType')"
            :imgName="'activity-types.svg'"
          />
          <DataLabelGroup
            v-if="placeData.systemComponentsHierarchyData"
            :value="
              placeData.systemComponentsHierarchyData
                .systemComponentsHierarchyNameCurrent
            "
            :title="$t('SystemComponentsHierarchies.place')"
            :imgName="'systemComponentsHierarchies.svg'"
          />
          <DataLabelGroup
            v-if="placeData.systemComponentData"
            :value="placeData.systemComponentData.systemComponentNameCurrent"
            :title="$t('SystemComponents.place')"
            :imgName="'systemComponents.svg'"
          />
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
import { BASE_URL } from "./../../../utils/constants";
import { fullPathFileFromServer } from "./../../../utils/functions";
import DataLabelGroup from "./../../../components/general/DataLabelGroup.vue";
import placeImg from "@/assets/images/places.svg";

export default {
  data() {
    return {
      BASE_URL,
      placeImg,
    };
  },
  components: {
    DataLabelGroup,
  },
  props: ["placeData"],
  methods: {
    fullPathFileFromServer,
  },
  computed: {},
};
</script>
