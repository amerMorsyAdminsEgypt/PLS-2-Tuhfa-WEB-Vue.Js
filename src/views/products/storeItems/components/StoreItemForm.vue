<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="storeItem.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              storeItem.storeItemImagePath,
              storeItem.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !storeItem.storeItemImageIsDefault &&
            checkPrivilege(hasStoreItemDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <BaseTree
            :hierarchySystemTypeFilterToken="hierarchySystemTypeFilterToken"
            :treeModel="getTreeModel"
            v-on:changeValue="baseTreeChanged($event)"
            :showParent="true"
            :filterParentDirect="false"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="storeItem.fullCode"
            v-on:changeValue="storeItem.fullCode = $event"
            :title="$t('StoreItems.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-storeItemNameAr`"
            :errors="errors_storeItemNameAr"
            :value="storeItem.storeItemNameAr"
            v-on:changeValue="
              storeItem.storeItemNameAr = $event;
              $v.storeItem.storeItemNameAr.$touch();
            "
            :title="$t('StoreItems.nameAr')"
            :imgName="'StoreItems.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-storeItemNameEn`"
            :errors="errors_storeItemNameEn"
            :value="storeItem.storeItemNameEn"
            v-on:changeValue="
              storeItem.storeItemNameEn = $event;
              $v.storeItem.storeItemNameEn.$touch();
            "
            :title="$t('StoreItems.nameEn')"
            :imgName="'StoreItems.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-storeItemNameUnd`"
            :value="storeItem.storeItemNameUnd"
            v-on:changeValue="storeItem.storeItemNameUnd = $event"
            :title="$t('StoreItems.nameUnd')"
            :imgName="'StoreItems.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-storeItemDescriptionAr`"
            :value="storeItem.storeItemDescriptionAr"
            v-on:changeValue="storeItem.storeItemDescriptionAr = $event"
            :title="$t('StoreItems.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-storeItemDescriptionEn`"
            :value="storeItem.storeItemDescriptionEn"
            v-on:changeValue="storeItem.storeItemDescriptionEn = $event"
            :title="$t('StoreItems.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-storeItemDescriptionUnd`"
            :value="storeItem.storeItemDescriptionUnd"
            v-on:changeValue="storeItem.storeItemDescriptionUnd = $event"
            :title="$t('StoreItems.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-storeItemNotes`"
            :value="storeItem.storeItemNotes"
            v-on:changeValue="storeItem.storeItemNotes = $event"
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />

          <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />
          <template v-else>
            <CustomInput
              :className="'col-md-12'"
              :id="'filterTable'"
              :value="filterTable"
              :title="$t('search')"
              :imgName="'search.svg'"
              v-on:changeValue="filterTable = $event"
            />
            <div class="table-container">
              <table class="my-table">
                <thead>
                  <tr>
                    <th rowspan="2">#</th>
                    <th rowspan="2">
                      <input
                        v-if="filteredPropertyTypeTokenOptions.length > 0"
                        type="checkbox"
                        id="selectAll"
                        @click="selectAll()"
                        v-model="selectedAll"
                        class="checkbox"
                      />
                      {{ $t("general.all") }}
                    </th>
                    <th colspan="2">{{ $t("PropertyTypes.data") }}</th>
                    <th rowspan="2">
                      <li>
                        <img
                          :title="$t('selectBox.synchronization')"
                          @click="
                            storeItem.propertyTypeTokens = [];
                            getPropertyTypesDialog();
                          "
                          src="@/assets/images/sync.svg"
                        />
                      </li>
                    </th>
                  </tr>
                  <tr>
                    <th>{{ $t("general.code") }}</th>
                    <th class="cell-lg">{{ $t("general.name") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in filteredPropertyTypeTokenOptions"
                    :key="index"
                  >
                    <td>{{ ++index }}</td>
                    <td>
                      <input
                        type="checkbox"
                        v-model="storeItem.propertyTypeTokens"
                        :value="item.value"
                        @click="select(item.value)"
                        class="checkbox"
                      />
                    </td>

                    <td>{{ isDataExist(item.code) }}</td>
                    <td>
                      {{ isDataExist(item.text) }}
                    </td>

                    <td>
                      <router-link
                        :to="{
                          name: 'PropertyTypes',
                          params: {
                            propertyTypeToken: item.value,
                          },
                        }"
                        :title="$t('info')"
                        :target="linkTarget"
                      >
                        <img src="@/assets/images/info.svg" />
                      </router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
        </div>
      </div>

      <div class="form-actions">
        <div class="icon-submit" @click.prevent="submitForm">
          <img src="@/assets/images/check-icon.svg" :title="submitName" />
        </div>
        <div
          @click.prevent
          class="icon-cancel"
          v-b-modal="`ConfirmCloseSheet-${bottomSheetName}`"
        >
          <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {
  isDataExist,
  fullPathFileFromServer,
  bottomSheetScrollToTop,
} from "./../../../../utils/functions";
import CustomFileInput from "./../../../../components/general/CustomFileInput.vue";
import PreLoader from "./../../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../../components/general/ExceptionWithImg.vue";
import BaseTree from "./../../../../components/general/BaseTree.vue";
import CustomInput from "./../../../../components/general/CustomInput.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
// import CustomSelectBoxMultiple from "./../../../../components/general/CustomSelectBoxMultiple.vue";
import { getPropertyTypesDialogCustomized } from "./../../../../utils/dialogsOfApi";
import { hasStoreItemDeleteImage } from "./../../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../../utils/functions";
import generalMixin from "./../../../../utils/generalMixin";
import { SYSTEM_TYPE } from "./../../../../utils/constantLists";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomFileInput,
    PreLoader,
    ExceptionWithImg,
    BaseTree,
    CustomInput,
    TextArea,
    // CustomSelectBoxMultiple,
  },
  data() {
    return {
      filterTable: "",
      isLoading: false,
      selectedAll: false,
      propertyTypeTokenOptions: [],
    };
  },
  props: {
    storeItem: {
      type: Object,
    },
    submitName: {
      type: String,
    },
    id: {
      type: String,
      default: "id",
    },
    deleteFileStatus: {
      type: Boolean,
      default: false,
    },
    bottomSheetName: {
      type: String,
      default: "",
    },
  },
  validations: {
    storeItem: {
      storeItemNameAr: { required },
      storeItemNameEn: { required },
    },
  },
  computed: {
    hierarchySystemTypeFilterToken() {
      return SYSTEM_TYPE.StoreItem;
    },
    filteredPropertyTypeTokenOptions() {
      const searchableKeys = ["code", "text"];
      return this.propertyTypeTokenOptions.filter((item) => {
        if (this.filterTable == "") return true;

        return searchableKeys.some((key) => {
          return (
            item[key]
              .toString()
              .toLowerCase()
              .indexOf(this.filterTable.toLowerCase()) >= 0
          );
        });
      });
    },
    getTreeModel() {
      let treeModelObject = {
        systemComponentHierarchyToken:
          this.storeItem.systemComponentHierarchyToken,
        hierarchyTitle: this.$t("SystemComponentsHierarchies.selectStoreItem"),
        systemComponentToken: this.storeItem.systemComponentToken,
        componentTitle: this.$t("SystemComponents.selectStoreItem"),
        parentToken: this.storeItem.parentStoreItemToken,
        parentTitle: this.$t("StoreItems.select"),
        parentImgName: "StoreItems.svg",
      };
      return treeModelObject;
    },
    errors_storeItemNameAr() {
      let errors = [];
      if (this.$v.storeItem.storeItemNameAr.$error) {
        if (
          !this.$v.storeItem.storeItemNameAr.required &&
          !this.$v.storeItem.storeItemNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_storeItemNameEn() {
      let errors = [];
      if (this.$v.storeItem.storeItemNameEn.$error) {
        if (
          !this.$v.storeItem.storeItemNameAr.required &&
          !this.$v.storeItem.storeItemNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
  },
  methods: {
    selectAll() {
      this.filterTable = "";
      this.storeItem.propertyTypeTokens = [];
      this.selectedAll = !this.selectedAll;
      if (this.selectedAll) {
        for (let ietm in this.propertyTypeTokenOptions) {
          this.storeItem.propertyTypeTokens.push(
            this.propertyTypeTokenOptions[ietm].value
          );
        }
      }
    },
    select(value) {
      const indexItem = this.storeItem.propertyTypeTokens.indexOf(value);

      if (indexItem > -1) {
        this.storeItem.propertyTypeTokens.splice(indexItem, 1);
      }
      setTimeout(() => {
        if (
          this.propertyTypeTokenOptions.length ==
          this.storeItem.propertyTypeTokens.length
        ) {
          this.selectedAll = true;
        } else {
          this.selectedAll = false;
        }
      }, 1000);
    },

    baseTreeChanged(data) {
      this.storeItem.systemComponentHierarchyToken = data.hierarchyToken;
      this.storeItem.systemComponentToken = data.componentToken;
      this.storeItem.parentStoreItemToken = data.parentToken;
    },
    async getPropertyTypesDialog() {
      this.isLoading = true;
      const [options, error] = await getPropertyTypesDialogCustomized();
      this.propertyTypeTokenOptions = options;
      this.exceptionMsg = error;
      this.isLoading = false;
    },

    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        this.$v.storeItem.storeItemNameAr.required ||
        this.$v.storeItem.storeItemNameEn.required
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasStoreItemDeleteImage,
    fullPathFileFromServer,
    isDataExist,
  },
  created() {
    this.getPropertyTypesDialog();
  },
};
</script>
