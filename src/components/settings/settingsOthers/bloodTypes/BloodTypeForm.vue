<template>
  <div class="">
    <PreLoader v-if="isLoading" />

    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="qualification.mediaFile = $event.file"
          :defaultImg="imageSrc"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="'fullCode'"
            :value="bloodType.fullCode"
            v-on:changeValue="bloodType.fullCode = $event"
            :title="$t('BloodTypes.code')"
            :imgName="'code.svg'"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="'bloodTypeNameAr'"
            :value="bloodType.bloodTypeNameAr"
            v-on:changeValue="bloodType.bloodTypeNameAr = $event"
            :title="$t('BloodTypes.nameAr')"
            :imgName="'BloodTypes.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'bloodTypeNameEn'"
            :value="bloodType.bloodTypeNameEn"
            v-on:changeValue="bloodType.bloodTypeNameEn = $event"
            :title="$t('BloodTypes.nameEn')"
            :imgName="'BloodTypes.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'bloodTypeNameUnd'"
            :value="bloodType.bloodTypeNameUnd"
            v-on:changeValue="bloodType.bloodTypeNameUnd = $event"
            :title="$t('BloodTypes.nameUnd')"
            :imgName="'BloodTypes.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'bloodTypeDescriptionAr'"
            :value="bloodType.bloodTypeDescriptionAr"
            v-on:changeValue="bloodType.bloodTypeDescriptionAr = $event"
            :title="$t('BloodTypes.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'bloodTypeDescriptionEn'"
            :value="bloodType.bloodTypeDescriptionEn"
            v-on:changeValue="bloodType.bloodTypeDescriptionEn = $event"
            :title="$t('BloodTypes.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'bloodTypeDescriptionUnd'"
            :value="bloodType.bloodTypeDescriptionUnd"
            v-on:changeValue="bloodType.bloodTypeDescriptionUnd = $event"
            :title="$t('BloodTypes.descriptionUnd')"
            :imgName="'description.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'bloodTypeNotes'"
            :value="bloodType.bloodTypeNotes"
            v-on:changeValue="bloodType.bloodTypeNotes = $event"
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
          @click.prevent="addOrUpdateBloodType"
        >
          {{ submitName }}
        </button>
        <router-link :to="{ name: 'BloodTypes' }" class="btn btn-cancel">
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
  props: ["bloodType", "submitName"],
  methods: {
    async addOrUpdateBloodType() {
      this.$emit("addOrUpdateBloodType");
    },
  },
  async created() {
    this.imageSrc = this.bloodType.bloodTypeImagePath
      ? BASE_URL + this.bloodType.bloodTypeImagePath
      : this.bloodType.defaultImg;
  },
};
</script>

<style lang="scss"></style>
