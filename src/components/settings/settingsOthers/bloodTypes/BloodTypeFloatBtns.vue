<template>
  <div class="fab-container">
    <div class="fab-parent fab-icon-holder">
      <i class="fa fa-chevron-up"></i>
    </div>
    <ul class="fab-options">
      <li v-if="checkPrivilege(hasBloodTypeAdd())">
        <span class="fab-label">
          <router-link :to="{ name: 'BloodTypeAdd' }" class="">
            {{ $t("BloodTypes.add") }}
          </router-link>
        </span>
        <div class="fab-icon-holder">
          <router-link :to="{ name: 'BloodTypeAdd' }" class="">
            <img src="@/assets/images/plus.svg" />
          </router-link>
        </div>
      </li>
      <li>
        <span class="fab-label" @click="open">
          {{ $t("filter") }}
        </span>
        <div class="fab-icon-holder" @click="open">
          <img src="@/assets/images/filter.svg" />
        </div>
      </li>
    </ul>

    <vue-bottom-sheet ref="CustomBottomSheet">
      <CustomBaseEntityFilter
        :className="'row'"
        :value="filterData"
        v-on:changeValue="filterData = $event"
      />

      <div class="form-footer">
        <button
          name="submit"
          type="submit"
          class="btn btn-submit"
          @click.prevent="search"
        >
          {{ $t("search") }}
        </button>
        <button class="btn btn-cancel" @click.prevent="close">
          {{ $t("cancel") }}
        </button>
      </div>
    </vue-bottom-sheet>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { checkPrivilege } from "@/utils/functions";
import { hasBloodTypeAdd } from "@/utils/privilegeHelper";
import CustomBaseEntityFilter from "@/components/general/CustomBaseEntityFilter.vue";

export default {
  props: {
    theFilterData: {
      type: Object,
    },
  },
  data() {
    return {
      filterData: this.theFilterData,
      userTypeTokenOptions: [],
    };
  },
  computed: {
    ...mapGetters([
      "userAuthorizeToken",
      "constantsListsData",
      "usersPrivilegeData",
    ]),
  },
  components: {
    CustomBaseEntityFilter,
  },
  methods: {
    open() {
      this.$refs.CustomBottomSheet.open();
    },
    close() {
      this.$refs.CustomBottomSheet.close();
    },
    search() {
      this.close();
      this.$emit("search", this.filterData);
    },
    checkPrivilege,
    hasBloodTypeAdd,
  },
  async created() {},
};
</script>
