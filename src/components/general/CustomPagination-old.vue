<template>
  <div class="pagination-container">
    <div class="pagination-select">
      <!-- <CustomSelectBox
        :className="'sortTokensSelectBox selectBox'"
        :id="'sortTokens'"
        :value="paginationData.sortTokens"
        :options="sortTokensOptions"
        v-on:changeValue="changeSortTokens($event)"
        :title="$t('pagination.selectSortType')"
        :imgName="'type.svg'"
      /> -->
      <CustomSelectBox
        :className="'pageSizeSelectBox selectBox'"
        :id="'pageSize'"
        :value="paginationData.pageSize"
        :options="pageSizeOptions"
        v-on:changeValue="changePageSize($event)"
        :title="$t('pagination.selectPageSize')"
        :imgName="'number.svg'"
      />
    </div>
    <div class="pagination-inputs">
      <button
        class="btn-pagination"
        :title="$t('pagination.firstPage')"
        @click="goToFirstItem()"
      >
        {{ $t("pagination.paginationFirstItem") }}
      </button>
      <button
        class="btn-pagination"
        :title="$t('pagination.prevPage')"
        @click="goToPrevItem()"
      >
        {{ $t("pagination.paginationPrevItem") }}
      </button>
      <div class="search-selfPage">
        <CustomInputInt
          :className="'search-Input'"
          :id="'selfPage'"
          :value="currentPage"
          :title="$t('search')"
          :imgName="'search.svg'"
          v-on:changeValue="currentPage = $event"
        />
        <button
          class="btn-pagination-search"
          :title="$t('search')"
          @click="searchSelfPage()"
        >
          <img src="@/assets/images/search.svg" class="icon-lg" />
        </button>
      </div>

      <button
        class="btn-pagination"
        :title="$t('pagination.nextPage')"
        @click="goToNextItem()"
      >
        {{ $t("pagination.paginationNextItem") }}
      </button>
      <button
        class="btn-pagination"
        :title="$t('pagination.lastPage')"
        @click="goToLastItem()"
      >
        {{ $t("pagination.paginationLastItem") }}
      </button>
    </div>
    <div class="pagination-total">
      <div class="pages total">
        <span class="label-count"
          >{{ $t("pagination.currentPage") }} :
          {{ paginationData.selfPage }}</span
        >
        <span class="label-count"
          >{{ $t("pagination.totalPages") }} :
          {{ paginationData.totalPages }}</span
        >
      </div>
      <div class="items total">
        <span class="label-count"
          >{{ $t("pagination.currentItems") }} :
          {{ paginationData.countItemsInPage }}</span
        >
        <span class="label-count"
          >{{ $t("pagination.totalItems") }} :
          {{ paginationData.totalItems }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
import CustomSelectBox from "./CustomSelectBox.vue";
import CustomInputInt from "./CustomInputInt.vue";
import { PAGE_SIZE, VIEW_TYPES } from "../../utils/constants";
import i18n from "../../i18n";
import {
  getLanguage,
  setDataMultiLang,
  appContentScrollToTop,
} from "../../utils/functions";
import generalMixin from "../../utils/generalMixin";

export default {
  name: "CustomPagination",
  mixins: [generalMixin],
  props: {
    paginationData: {
      type: Object,
    },
  },
  components: {
    CustomSelectBox,
    CustomInputInt,
  },
  // computed: {
  //   ...mapGetters(["constantsListsData"]),
  // },
  data() {
    return {
      language: getLanguage(),
      VIEW_TYPES,

      currentPage: this.paginationData.selfPage,
      sortTokensOptions: [],
      pageSizeOptions: [
        {
          value: PAGE_SIZE,
          text: PAGE_SIZE,
        },
        {
          value: "100",
          text: "100",
        },
        {
          value: "500",
          text: "500",
        },
        {
          value: "1000",
          text: "1000",
        },
        {
          value: this.paginationData.totalItems,
          text: i18n.t("pagination.total"),
        },
      ],
    };
  },
  methods: {
    appContentScrollToTop,
    changePagination() {
      this.appContentScrollToTop();
      this.$emit("changePagination", this.paginationData);
    },
    goToFirstItem() {
      if (this.currentPage > this.paginationData.firstPage) {
        this.paginationData.selfPage = this.paginationData.firstPage;
        this.currentPage = this.paginationData.firstPage;
        this.searchSelfPage();
      }
    },
    goToPrevItem() {
      if (this.currentPage > this.paginationData.firstPage) {
        this.currentPage--;
        this.searchSelfPage();
      }
    },
    searchSelfPage() {
      this.paginationData.selfPage = this.currentPage;
      this.changePagination();
    },
    goToNextItem() {
      if (this.currentPage < this.paginationData.lastPage) {
        this.currentPage++;
        this.searchSelfPage();
      }
    },
    goToLastItem() {
      if (this.currentPage < this.paginationData.lastPage) {
        this.paginationData.selfPage = this.paginationData.lastPage;
        this.currentPage = this.paginationData.lastPage;
        this.searchSelfPage();
      }
    },
    changeSortTokens(token) {
      this.paginationData.sortTokens = [];
      this.paginationData.sortTokens.push(token);
      this.changePagination();
    },
    changePageSize(pageSize) {
      this.paginationData.pageSize = pageSize;
      if (this.paginationData.pageSize == this.paginationData.totalItems) {
        this.paginationData.paginationStatus = false;
        // this.paginationData.pageSize = 0;
      }
      this.changePagination();
    },
    getDialogOfSortTokens() {
      this.sortTokensOptions = [];

      let sortTokens = this.paginationData.listSort;
      for (let item in sortTokens) {
        this.sortTokensOptions.push({
          value: sortTokens[item]["sortToken"],
          text: setDataMultiLang(
            this.language,
            sortTokens[item]["sortNameAr"],
            sortTokens[item]["sortNameEn"]
          ),
        });
      }
    },
  },
  watch: {},
  async created() {
    this.getDialogOfSortTokens();
  },
};
</script>
