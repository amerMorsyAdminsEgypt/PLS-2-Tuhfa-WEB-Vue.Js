<template>
  <div class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th>#</th>
          <th>{{ $t("general.code") }}</th>
          <th>{{ $t("general.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="SalesData.length == 0">
          <tr>
            <th colspan="8">
              {{ $t("sales.thereAreNoOne") }}
            </th>
          </tr>
        </template>
        <template v-else>
          <tr v-for="(item, index) in SalesData" :key="index">
            <td>{{ ++index }}</td>
            <td>
              {{
                isDataExist(
                  item.userSalesInfoData ? item.userSalesInfoData.fullCode : ""
                )
              }}
            </td>
            <td>
              {{
                isDataExist(
                  item.userSalesInfoData
                    ? item.userSalesInfoData.userNameCurrent
                    : ""
                )
              }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import { isDataExist } from "./../../../../utils/functions";

export default {
  props: ["SalesData"],
  methods: {
    isDataExist,
  },
};
</script>
