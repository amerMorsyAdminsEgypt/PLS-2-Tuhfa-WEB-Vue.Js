<template>
  <div class="my-card">
    <span class="my-card-title">{{ $t("PropertyTypes.modelName") }}</span>

    <div v-if="propertyTypesData.length == 0" class="my-card-no-content">
      {{ $t("PropertyTypes.thereAreNoOne") }}
    </div>
    <template v-else>
      <div v-for="(item, index) in propertyTypesData" :key="index">
        <b-button
          v-b-toggle="`PropertyTypes-${index}`"
          class="btn btn-lg btn-collapse"
        >
          {{ item.propertyTypeNameCurrent }}
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </b-button>
        <b-collapse :id="`PropertyTypes-${index}`">
          <PropertyDetailsTable
            :propertyDetailsData="item.propertyDetailsData"
          />
        </b-collapse>
      </div>
    </template>
  </div>
</template>

<script>
import PropertyDetailsTable from "./../../propertyTypes/components/PropertyDetailsTable.vue";
import { isDataExist } from "./../../../../utils/functions";

export default {
  components: { PropertyDetailsTable },
  props: { propertyTypesData: { type: Array, default: () => [] } },
  methods: {
    isDataExist,
  },
};
</script>
