<template>
  <div class="user-card-info mt-4">
    <span v-b-toggle.userData class="collapse-title">
      {{ $t("Users.data") }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </span>
    <b-collapse id="userData">
      <div class="row">
        <div class="user-img-container col-lg-4">
          <img
            class="user-img"
            :src="fullPathFileFromServer(userData.userImagePath, userImg)"
            :onerror="`this.src='${userImg}'`"
          />
        </div>
        <div class="col-lg-4 col-md-6">
          <DataLabelGroup
            :value="userData.fullCode"
            :title="$t('Users.code')"
            :imgName="'code.svg'"
          />
          <DataLabelGroup
            :value="userData.userNameCurrent"
            :title="$t('Users.name')"
            :imgName="'users.svg'"
          />
          <DataLabelGroup
            :value="userData.userProfileData.userBirthDateTime"
            :title="$t('Users.userBirthDateTime')"
            :imgName="'dateAndTime.svg'"
          />
          <DataLabelGroup
            :value="userData.userProfileData.userNationalNumber"
            :title="$t('Users.nationalID')"
            :imgName="'nationalNumber.svg'"
          />
        </div>
        <div class="col-lg-4 col-md-6">
          <DataLabelGroup
            :class="'phone-number'"
            :value="userData.userPhoneWithCC"
            :title="$t('Users.phone')"
            :imgName="'phone.svg'"
          />
          <DataLabelGroup
            :value="userData.userEmail"
            :title="$t('Users.email')"
            :imgName="'email.svg'"
          />
          <DataLabelGroup
            :value="userData.userName"
            :title="$t('Users.userName')"
            :imgName="'users.svg'"
          />
          <DataLabelGroup
            :value="userData.userProfileData.userAddressCurrent"
            :title="$t('Users.address')"
            :imgName="'address.svg'"
          />
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
import { fullPathFileFromServer } from "./../../../utils/functions";
import DataLabelGroup from "./../../../components/general/DataLabelGroup.vue";
import userImg from "@/assets/images/users.svg";

export default {
  data() {
    return {
      userImg,
    };
  },
  components: {
    DataLabelGroup,
  },
  props: ["userData"],
  methods: {
    fullPathFileFromServer,
  },
  computed: {},
};
</script>
