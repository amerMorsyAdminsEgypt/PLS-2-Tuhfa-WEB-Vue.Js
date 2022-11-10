<template>
  <div class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="7">
            {{ $t("PropertyTypes.listItems.modelName") }}
          </th>
        </tr>
        <tr>
          <th>{{ $t("PropertyTypes.listItems.nameAr") }}</th>
          <th>{{ $t("PropertyTypes.listItems.nameEn") }}</th>
          <th>{{ $t("PropertyTypes.listItems.nameUnd") }}</th>
          <th>{{ $t("ConstantsListSelect.PropertyFieldTypesName") }}</th>
          <th>{{ $t("PropertyTypes.listItems.defaultValueAr") }}</th>
          <th>{{ $t("PropertyTypes.listItems.defaultValueEn") }}</th>
          <th>{{ $t("PropertyTypes.listItems.defaultValueUnd") }}</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="propertyDetailsData.length == 0">
          <tr>
            <th colspan="8">
              {{ $t("PropertyTypes.listItems.noItems") }}
            </th>
          </tr>
        </template>
        <template v-else>
          <tr v-for="(item, index) in propertyDetailsData" :key="index">
            <td>{{ ++index }}</td>
            <td>{{ isDataExist(item.propertyNameAr) }}</td>
            <td>{{ isDataExist(item.propertyNameEn) }}</td>
            <td>{{ isDataExist(item.propertyNameUnd) }}</td>
            <td>{{ isDataExist(item.propertyFieldTypeNameCurrent) }}</td>
            <td>{{ isDataExist(item.propertyFieldDefaultValueAr) }}</td>
            <td>{{ isDataExist(item.propertyFieldDefaultValueEn) }}</td>
            <td>{{ isDataExist(item.propertyFieldDefaultValueUnd) }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import { isDataExist } from "./../../../../utils/functions";

export default {
  props: ["propertyDetailsData"],
  methods: {
    isDataExist,
  },
};
</script>
