<template>
  <div class="p-3">
    <h2>Test</h2>

    <!-- <div class="row">
      <CustomCheckboxMultiple
        :className="'col-md-12'"
        :value="currentValues"
        :options="options"
        v-on:changeValue="currentValues = $event"
        :title="$t('general.emergencyContact')"
        :imgName="'days.svg'"
      />
    </div> -->
    <CustomTreeView :treeData="treeData" />
  </div>
</template>

<script>
// import CustomCheckboxMultiple from "./../../components/general/CustomCheckboxMultiple.vue";
import CustomTreeView from "./../../components/general/CustomTreeView.vue";
import { getLanguage } from "./../../utils/functions";
import icon from "@/assets/images/qr-code.svg";
import icon2 from "@/assets/images/type.svg";
import iconOpenFolder from "@/assets/images/open-folder.svg";

export default {
  name: "Test",
  components: {
    // CustomCheckboxMultiple,
    CustomTreeView,
  },
  data() {
    return {
      language: getLanguage(),
      dateTime: new Date(2022, 3, 28, 19, 30, 15),
      activeStatus: true,
      isMale: false,
      options: [
        { text: "zero", value: "zero_value" },
        { text: "shero", value: "shero_value" },
        { text: "hero", value: "hero_value" },
      ],
      currentValues: ["zero_value", "hero_value"],
      treeData: {
        name: "سنه أولي",
        image: icon,
        actions: [
          {
            type: "link",
            title: "zz",
            icon: iconOpenFolder,
            route: { name: "Employees", params: { mainToken: "zzzzz" } },
          },
          {
            type: "bottomSheet",
            title: "zz",
            icon: iconOpenFolder,
            actionName: "bottomSheet",
            data: { token: "zzzzz" },
          },
          {
            type: "modal",
            title: "zz",
            icon: iconOpenFolder,
            actionName: "bottomSheet",
            data: { token: "zzzzz" },
          },
        ],
        children: [
          { name: "عربي", image: icon2 },
          { name: "دراسات", image: icon2 },
          {
            name: "علوم",
            image: icon,
            children: [
              {
                name: "ترم أول",
                image: icon,
                children: [{ name: "شهر أكتوبر" }, { name: "شهر نوفمبر" }],
              },
              { name: "ترم تاني", image: icon2 },
              { name: "ترم تالت", image: icon2 },
              {
                name: "ترم رابع",
                image: icon,
                children: [{ name: "شهر أكتوبر" }, { name: "شهر نوفمبر" }],
              },
            ],
          },
        ],
      },
    };
  },
  // methods: {},
  // computed: {},
  // mounted() {},
  // watch: {},
  // created() {},
};
</script>

<style lang="scss"></style>
