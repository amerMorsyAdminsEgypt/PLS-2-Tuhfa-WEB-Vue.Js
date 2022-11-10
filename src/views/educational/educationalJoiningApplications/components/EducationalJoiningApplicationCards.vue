<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(
        educationalJoiningApplication, index
      ) in educationalJoiningApplicationsData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="
        educationalJoiningApplication.educationalJoiningApplicationNameCurrent
      "
      :description="educationalJoiningApplication.fullCode"
      :imagePath="
        educationalJoiningApplication.educationalJoiningApplicationImagePath
      "
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li v-if="hasJoiningApplicationSubscription">
        <router-link
          :to="{
            name: 'JoiningApplicationSubscriptions',
            params: {
              userStudentToken: '',
              educationalJoiningApplicationToken:
                educationalJoiningApplication.educationalJoiningApplicationToken,
            },
          }"
          :title="$t('JoiningApplicationSubscriptions.modelName')"
          :target="linkTarget"
        >
          <img src="@/assets/images/JoiningApplicationSubscriptions.svg" />
        </router-link>
      </li>
      <li>
        <button
          v-b-modal.EducationalJoiningApplicationGetStatement
          @click="
            setEducationalJoiningApplicationData(educationalJoiningApplication);
            openBottomSheet('EducationalJoiningApplicationGetStatement');
          "
          :title="$t('EducationalCategories.getStatement')"
        >
          <img src="@/assets/images/statement.svg" />
        </button>
      </li>
      <li>
        <button
          :title="$t('info')"
          @click="
            setEducationalJoiningApplicationData(educationalJoiningApplication);
            openBottomSheet('EducationalJoiningApplicationInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setEducationalJoiningApplicationData(educationalJoiningApplication);
            openBottomSheet('EducationalJoiningApplicationQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li
        v-if="
          checkPrivilege(hasEducationalJoiningApplicationChangeApprove()) &&
          educationalJoiningApplication.approvalTypeToken ==
            APPROVAL_TYPE_TOKENS.UnderReview
        "
      >
        <button
          @click="
            setEducationalJoiningApplicationData(educationalJoiningApplication);
            openBottomSheet(
              'EducationalJoiningApplicationChangeApproveAccepted'
            );
          "
          :title="$t('EducationalJoiningApplications.approve')"
        >
          <img src="@/assets/images/ApprovalTypes.svg" />
        </button>
      </li>
      <li
        v-if="
          checkPrivilege(hasEducationalJoiningApplicationChangeApprove()) &&
          educationalJoiningApplication.approvalTypeToken ==
            APPROVAL_TYPE_TOKENS.UnderReview
        "
      >
        <button
          @click="
            setEducationalJoiningApplicationData(educationalJoiningApplication);
            openBottomSheet(
              'EducationalJoiningApplicationChangeApproveRejected'
            );
          "
          :title="$t('EducationalJoiningApplications.reject')"
        >
          <img src="@/assets/images/cancel.svg" />
        </button>
      </li>
      <li
        v-if="
          checkPrivilege(hasEducationalJoiningApplicationEdit()) &&
          educationalJoiningApplication.approvalTypeToken ==
            APPROVAL_TYPE_TOKENS.UnderReview
        "
      >
        <button
          @click="
            setEducationalJoiningApplicationData(educationalJoiningApplication);
            openBottomSheet('EducationalJoiningApplicationUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setEducationalJoiningApplicationData(educationalJoiningApplication);
            openBottomSheet('ActionsData');
          "
          :title="$t('actionsData.modelName')"
        >
          <img src="@/assets/images/actions-data.svg" />
        </button>
      </li>
    </CustomCard>
  </div>
</template>

<script>
import {
  checkPrivilege,
  isDataExist,
  fullPathFileFromServer,
} from "./../../../../utils/functions";
import { APPROVAL_TYPE_TOKENS } from "./../../../../utils/constantLists";
import {
  hasEducationalJoiningApplicationEdit,
  hasJoiningApplicationSubscription,
} from "./../../../../utils/privilegeHelper";
import CustomCard from "./../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["educationalJoiningApplicationsData", "filterData", "defaultImg"],
  data() {
    return {
      APPROVAL_TYPE_TOKENS,
    };
  },
  methods: {
    setEducationalJoiningApplicationData(educationalJoiningApplication) {
      this.$emit(
        "setEducationalJoiningApplicationData",
        educationalJoiningApplication
      );
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasEducationalJoiningApplicationEdit,
    hasJoiningApplicationSubscription,
  },
};
</script>
