<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="EducationalGroupAdd"
      size="xl"
      :headerText="$t('EducationalGroups.add')"
      :headerIcon="educationalGroup.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="educationalGroup.setInitialValue()"
    >
      <EducationalGroupForm
        v-if="!isLoading"
        id="add"
        :educationalGroup="educationalGroup"
        v-on:submitForm="chooseAddType()"
        bottomSheetName="EducationalGroupAdd"
        :submitName="$t('add')"
        :fixedScheduleStatus="true"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="EducationalGroupAdd"
      v-on:response="response($event)"
    />
    <EducationalGroupChooseAddType
      v-on:addType="
        addType = $event;
        addEducationalGroup();
      "
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import EducationalGroupChooseAddType from "./EducationalGroupChooseAddType.vue";
import EducationalGroupForm from "./EducationalGroupForm.vue";
import { STATUS } from "./../../../../utils/constants";
// import { objectToFormData } from "./../../../../utils/functions";
import apiEducationalGroup from "./../../../../api/educational/educationalGroups";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    EducationalGroupChooseAddType,
    EducationalGroupForm,
  },
  props: ["educationalGroup"],
  data() {
    return {
      addType: "",
    };
  },
  methods: {
    chooseAddType() {
      this.$bvModal.show(`EducationalGroupChooseAddType`);
    },
    async addEducationalGroup() {
      this.isLoading = true;
      try {
        let obj = this.educationalGroup.handleBeforeAdd();
        let response = "";
        switch (this.addType) {
          case "addWithoutTime":
          default:
            response = await apiEducationalGroup.add(obj);
            break;
          case "addWithTime":
            response = await apiEducationalGroup.addWithScheduleTimes(obj);
            break;
        }
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-EducationalGroupAdd");
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
          this.showMsg(response.data.msg);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      // empty list
      this.educationalGroup.fixedScheduleDays = [];
      this.isLoading = false;
    },

    response(data) {
      this.$emit("refresh");
      switch (data) {
        case "yes":
          this.educationalGroup.setInitialValue();
          break;
        case "leave":
          this.educationalGroup.setInitialValue();
          this.closeBottomSheet("EducationalGroupAdd");
          break;
      }
    },
  },
};
</script>
