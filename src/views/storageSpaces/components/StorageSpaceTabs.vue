<template>
  <b-tabs v-if="theOptions" content-class="">
    <b-tab
      v-for="(option, index) in theOptions"
      :key="index"
      @click="goTo(option.to)"
      :title-item-class="'custom-tab-outer-li'"
      :active="currentTab == option.currentTab ? true : false"
    >
      <template #title>
        <span v-b-popover.hover.bottomright="`${option.itemName}`">
          <img :src="`${option.itemImagePath}`" class="icon-tab" />
          <span>{{ option.itemName }}</span></span
        >
      </template>
    </b-tab>
  </b-tabs>
</template>

<script>
import imgFolders from "@/assets/images/folder.svg";
import imgMedias from "@/assets/images/media.svg";
// import { checkPrivilege } from "@/utils/functions";
// import UsersEstablishmentPrivilege from "@/models/privileges/establishmentPrivileges/UsersEstablishmentPrivilege";

export default {
  name: "StorageSpaceTabs",
  data() {
    return {
      // usersEstablishmentPrivilegeData:
      //   this.$store.getters.usersEstablishmentPrivilegeData ||
      //   new UsersEstablishmentPrivilege(),
      currentTab: "",
      theOptions: [],
      params: {
        mainToken: this.$route.params.mainToken,
        storageSpaceParentToken: this.$route.params.storageSpaceParentToken,
      },
    };
  },
  methods: {
    // checkPrivilege,
    setOptions() {
      this.theOptions.push({
        to: { name: "StorageSpacesFolderEmployee", params: this.params },
        itemName: this.$t("StorageSpaces.folders"),
        itemImagePath: imgFolders,
        currentTab: "folders",
      });
      this.theOptions.push({
        to: { name: "StorageSpacesMediaEmployee", params: this.params },
        itemName: this.$t("StorageSpaces.medias"),
        itemImagePath: imgMedias,
        currentTab: "medias",
      });
    },
    goTo(path) {
      this.$router.push(path).catch(() => {});
    },
    getPageInfo() {
      this.currentTab = this.$route.meta.currentTab || "";
    },
  },
  watch: {
    $route() {
      this.getPageInfo();
    },
  },
  created() {
    this.setOptions();
    this.getPageInfo();
  },
};
</script>
