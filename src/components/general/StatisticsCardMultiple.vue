<template>
  <div>
    <div class="statistics-card-multiple">
      <div class="statistics-card-multiple-content" v-if="itemsList.length > 0">
        <table class="my-table">
          <thead>
            <tr>
              <th v-for="(item, index) in itemsList" :key="index">
                {{ item.title }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td v-for="(item, index) in itemsList" :key="index">
                {{ isDataExist(item.value) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        class="statistics-card-multiple-bar"
        v-if="percentageList.length > 0"
      >
        <b-progress>
          <b-progress-bar
            v-for="(item, index) in percentageList"
            :key="index"
            :value="item.value"
            :label="item.label"
            :title="item.title"
          ></b-progress-bar>
        </b-progress>
      </div>
    </div>
  </div>
</template>

<script>
import { isDataExist } from "./../../utils/functions";
export default {
  name: "StatisticsCardMultiple",
  props: {
    itemsList: {
      type: Array,
      default: () => [],
    },
    percentageList: {
      type: Array,
      default: () => [],
    },
  },
  components: {},
  data() {
    return {};
  },
  methods: { isDataExist },
  async created() {},
};
</script>
