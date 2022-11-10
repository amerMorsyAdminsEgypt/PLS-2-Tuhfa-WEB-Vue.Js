<template>
  <div class="">
    <PreLoader v-if="isLoading" />

    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="militaryStatusType.mediaFile = $event.file"
          :defaultImg="imageSrc"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="'fullCode'"
            :value="militaryStatusType.fullCode"
            v-on:changeValue="militaryStatusType.fullCode = $event"
            :title="$t('MilitaryStatusTypes.code')"
            :imgName="'code.svg'"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="'militaryStatusTypeNameAr'"
            :value="militaryStatusType.militaryStatusTypeNameAr"
            v-on:changeValue="
              militaryStatusType.militaryStatusTypeNameAr = $event
            "
            :title="$t('MilitaryStatusTypes.nameAr')"
            :imgName="'militaryStatus.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'militaryStatusTypeNameEn'"
            :value="militaryStatusType.militaryStatusTypeNameEn"
            v-on:changeValue="
              militaryStatusType.militaryStatusTypeNameEn = $event
            "
            :title="$t('MilitaryStatusTypes.nameEn')"
            :imgName="'militaryStatus.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'militaryStatusTypeNameUnd'"
            :value="militaryStatusType.militaryStatusTypeNameUnd"
            v-on:changeValue="
              militaryStatusType.militaryStatusTypeNameUnd = $event
            "
            :title="$t('MilitaryStatusTypes.nameUnd')"
            :imgName="'militaryStatus.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'militaryStatusTypeDescriptionAr'"
            :value="militaryStatusType.militaryStatusTypeDescriptionAr"
            v-on:changeValue="
              militaryStatusType.militaryStatusTypeDescriptionAr = $event
            "
            :title="$t('MilitaryStatusTypes.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'militaryStatusTypeDescriptionEn'"
            :value="militaryStatusType.militaryStatusTypeDescriptionEn"
            v-on:changeValue="
              militaryStatusType.militaryStatusTypeDescriptionEn = $event
            "
            :title="$t('MilitaryStatusTypes.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'militaryStatusTypeDescriptionUnd'"
            :value="militaryStatusType.militaryStatusTypeDescriptionUnd"
            v-on:changeValue="
              militaryStatusType.militaryStatusTypeDescriptionUnd = $event
            "
            :title="$t('MilitaryStatusTypes.descriptionUnd')"
            :imgName="'description.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'militaryStatusTypeNotes'"
            :value="militaryStatusType.militaryStatusTypeNotes"
            v-on:changeValue="
              militaryStatusType.militaryStatusTypeNotes = $event
            "
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />
        </div>
      </div>

      <div class="form-footer">
        <button
          name="submit"
          type="submit"
          class="btn btn-submit"
          @click.prevent="addOrUpdateMilitaryStatusType"
        >
          {{ submitName }}
        </button>
        <router-link
          :to="{ name: 'MilitaryStatusTypes' }"
          class="btn btn-cancel"
        >
          {{ $t("cancel") }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PreLoader from "@/components/general/PreLoader.vue";
import { BASE_URL } from "@/utils/constants";
import CustomInput from "@/components/general/CustomInput.vue";
import CustomFileInput from "@/components/general/CustomFileInput.vue";
import TextArea from "@/components/general/TextArea.vue";
import generalMixin from "@/utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomInput,
    CustomFileInput,
    TextArea,
  },
  computed: {
    ...mapGetters(["userAuthorizeToken", "constantsListsData"]),
  },
  data() {
    return {
      isLoading: false,
      exceptionMsg: null,
      exceptionImg: null,
      imageSrc: "",
    };
  },
  props: ["militaryStatusType", "submitName"],
  methods: {
    async addOrUpdateMilitaryStatusType() {
      this.$emit("addOrUpdateMilitaryStatusType");
    },
  },
  async created() {
    this.imageSrc = this.militaryStatusType.militaryStatusTypeImagePath
      ? BASE_URL + this.militaryStatusType.militaryStatusTypeImagePath
      : this.militaryStatusType.defaultImg;
  },
};
</script>

<style lang="scss"></style>
