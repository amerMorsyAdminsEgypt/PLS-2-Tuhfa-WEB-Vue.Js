<template>
  <div class="row">
    <template v-if="hasData">
      <div class="table-container">
        <table class="my-table">
          <thead>
            <tr>
              <th rowspan="2">#</th>
              <th rowspan="2">
                {{ $t("delete") }}
              </th>
              <th rowspan="2">
                {{ $t("MediaPackages.free") }}
              </th>
              <th colspan="5">{{ $t("SharedMedias.data") }}</th>
            </tr>
            <tr>
              <th>{{ $t("general.code") }}</th>
              <th class="cell-lg">{{ $t("general.name") }}</th>

              <th>{{ $t("SharedMediaFolders.title") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(sharedMedia, index) in mediaPackageMediaData"
              :key="index"
            >
              <td>
                {{ ++index }}
              </td>
              <td>
                <button @click.prevent="deleteItem(index)">
                  <img src="@/assets/images/trash.svg" />
                </button>
              </td>
              <td>
                <input
                  type="checkbox"
                  v-model="sharedMedia.sharedMediaIsFreeStatus"
                  class="checkbox"
                />
              </td>
              <td>{{ isDataExist(sharedMedia.sharedMediaData.fullCode) }}</td>
              <td>
                {{
                  isDataExist(
                    sharedMedia.sharedMediaData.sharedMediaNameCurrent
                  )
                }}
              </td>

              <td>
                {{
                  isDataExist(
                    sharedMedia.sharedMediaData.sharedMediaFolderInfoData
                      .sharedMediaFolderNameCurrent
                  )
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    <template v-else>
      <div class="col-12 center-txt">
        <span> {{ $t("SharedMedias.select") }}</span>
      </div>
    </template>
  </div>
</template>

<script>
import generalMixin from "./../../../utils/generalMixin";
import {
  isDataExist,
  fullPathFileFromServer,
} from "./../../../utils/functions";

export default {
  mixins: [generalMixin],
  components: {},
  data() {
    return {};
  },
  props: {
    mediaPackageMediaData: {
      type: Array,
      default: () => [],
    },

    id: {
      type: String,
      default: "id",
    },
  },
  computed: {
    hasData() {
      return this.mediaPackageMediaData.length;
    },
  },
  methods: {
    isDataExist,
    fullPathFileFromServer,

    // ACTIONS
    deleteItem(index) {
      let i = index - 1;
      let containerFolderTokenMediaTokenDeleted = {
        folderToken:
          this.mediaPackageMediaData[i].sharedMediaData
            .sharedMediaFolderInfoData.sharedMediaFolderToken,
        mediaToken: this.mediaPackageMediaData[i].sharedMediaToken,
      };

      this.$emit(
        "mediaPackageContainerUpdated",
        containerFolderTokenMediaTokenDeleted
      );
      // REMOVE
      this.mediaPackageMediaData.splice(i, 1);
    },
  },
  created() {},
};
</script>
