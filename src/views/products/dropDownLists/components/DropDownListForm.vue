<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="dropDownList.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              dropDownList.dropDownListImagePath,
              dropDownList.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !dropDownList.dropDownListImageIsDefault &&
            checkPrivilege(hasDropDownListDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="dropDownList.fullCode"
            v-on:changeValue="dropDownList.fullCode = $event"
            :title="$t('DropDownLists.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-dropDownListNameAr`"
            :errors="errors_dropDownListNameAr"
            :value="dropDownList.dropDownListNameAr"
            v-on:changeValue="
              dropDownList.dropDownListNameAr = $event;
              $v.dropDownList.dropDownListNameAr.$touch();
            "
            :title="$t('DropDownLists.nameAr')"
            :imgName="'DropDownLists.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-dropDownListNameEn`"
            :errors="errors_dropDownListNameEn"
            :value="dropDownList.dropDownListNameEn"
            v-on:changeValue="
              dropDownList.dropDownListNameEn = $event;
              $v.dropDownList.dropDownListNameEn.$touch();
            "
            :title="$t('DropDownLists.nameEn')"
            :imgName="'DropDownLists.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-dropDownListNameUnd`"
            :value="dropDownList.dropDownListNameUnd"
            v-on:changeValue="dropDownList.dropDownListNameUnd = $event"
            :title="$t('DropDownLists.nameUnd')"
            :imgName="'DropDownLists.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-dropDownListDescriptionAr`"
            :value="dropDownList.dropDownListDescriptionAr"
            v-on:changeValue="dropDownList.dropDownListDescriptionAr = $event"
            :title="$t('DropDownLists.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-dropDownListDescriptionEn`"
            :value="dropDownList.dropDownListDescriptionEn"
            v-on:changeValue="dropDownList.dropDownListDescriptionEn = $event"
            :title="$t('DropDownLists.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-dropDownListDescriptionUnd`"
            :value="dropDownList.dropDownListDescriptionUnd"
            v-on:changeValue="dropDownList.dropDownListDescriptionUnd = $event"
            :title="$t('DropDownLists.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-dropDownListNotes`"
            :value="dropDownList.dropDownListNotes"
            v-on:changeValue="dropDownList.dropDownListNotes = $event"
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />
        </div>
      </div>

      <div class="my-card">
        <span class="my-card-title">
          {{ $t("DropDownLists.listItems.modelName") }}
        </span>

        <div
          v-if="dropDownList.dropDownListItemsData.length == 0"
          class="my-card-no-content"
        >
          {{ $t("DropDownLists.listItems.noItems") }}
        </div>
        <template v-else>
          <div
            class="my-card"
            v-for="(item, index) in dropDownList.dropDownListItemsData"
            :key="index"
          >
            <span class="my-card-title">{{ index + 1 }}</span>

            <span class="remove-slice-container">
              <button
                @click="removeSlice(index)"
                type="button"
                class="btn btn-remove-slice"
              >
                ×
              </button>
            </span>

            <div class="row">
              <CustomInput
                :className="'col-md-4'"
                :id="`${id}-[${index}][dropDownListItemNameAr]`"
                :value="item.dropDownListItemNameAr"
                v-on:changeValue="item.dropDownListItemNameAr = $event"
                :title="$t('DropDownLists.listItems.nameAr')"
                :imgName="'DropDownLists.svg'"
              />
              <CustomInput
                :className="'col-md-4'"
                :id="`${id}-[${index}][dropDownListItemNameEn]`"
                :value="item.dropDownListItemNameEn"
                v-on:changeValue="item.dropDownListItemNameEn = $event"
                :title="$t('DropDownLists.listItems.nameEn')"
                :imgName="'DropDownLists.svg'"
              />
              <CustomInput
                :className="'col-md-4'"
                :id="`${id}-[${index}][dropDownListItemNameUnd]`"
                :value="item.dropDownListItemNameUnd"
                v-on:changeValue="item.dropDownListItemNameUnd = $event"
                :title="$t('DropDownLists.listItems.nameUnd')"
                :imgName="'DropDownLists.svg'"
              />
            </div>
          </div>
        </template>
        <div class="add-slice-container">
          <button
            @click="addSlice()"
            type="button"
            class="btn btn-add-slice"
            :title="$t('add')"
          >
            +
          </button>
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
  fullPathFileFromServer,
  bottomSheetScrollToTop,
} from "./../../../../utils/functions";
import CustomFileInput from "./../../../../components/general/CustomFileInput.vue";
import CustomInput from "./../../../../components/general/CustomInput.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import DropDownListItemsData from "./../../../../models/products/dropDownLists/DropDownListItemsData";
import { hasDropDownListDeleteImage } from "./../../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../../utils/functions";
import generalMixin from "./../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomFileInput,
    CustomInput,
    TextArea,
  },
  // data() {
  //   return {};
  // },
  props: {
    dropDownList: {
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
    dropDownList: {
      dropDownListNameAr: { required },
      dropDownListNameEn: { required },
    },
  },
  computed: {
    errors_dropDownListNameAr() {
      let errors = [];
      if (this.$v.dropDownList.dropDownListNameAr.$error) {
        if (
          !this.$v.dropDownList.dropDownListNameAr.required &&
          !this.$v.dropDownList.dropDownListNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_dropDownListNameEn() {
      let errors = [];
      if (this.$v.dropDownList.dropDownListNameEn.$error) {
        if (
          !this.$v.dropDownList.dropDownListNameAr.required &&
          !this.$v.dropDownList.dropDownListNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
  },
  methods: {
    addSlice() {
      this.dropDownList.dropDownListItemsData.push(new DropDownListItemsData());
    },
    removeSlice(index) {
      this.dropDownList.dropDownListItemsData.splice(index, 1);
    },
    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        this.$v.dropDownList.dropDownListNameAr.required ||
        this.$v.dropDownList.dropDownListNameEn.required
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasDropDownListDeleteImage,
    fullPathFileFromServer,
  },
};
</script>
