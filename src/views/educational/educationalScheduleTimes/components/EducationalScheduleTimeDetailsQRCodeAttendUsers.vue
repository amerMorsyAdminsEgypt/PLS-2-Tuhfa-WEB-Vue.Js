<template>
  <table v-if="usersList.length > 0" class="my-table">
    <thead>
      <tr>
        <th rowspan="2">#</th>
        <th colspan="3">
          {{ UsersDataMsg ? UsersDataMsg : $t("Users.data") }}
        </th>
        <th colspan="3">{{ $t("EducationalScheduleTimes.dateTime") }}</th>
      </tr>
      <tr>
        <th>{{ $t("general.image") }}</th>
        <th>{{ $t("general.code") }}</th>
        <th>{{ $t("general.name") }}</th>
        <th>{{ $t("EducationalScheduleTimes.from") }}</th>
        <th>{{ $t("EducationalScheduleTimes.to") }}</th>
        <th>{{ $t("delete") }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(user, index) in usersList" :key="index">
        <td>{{ ++index }}</td>
        <td>
          <img
            class="item-img-table"
            :src="fullPathFileFromServer(user.userImagePath, usersImg)"
            :onerror="`this.src='${usersImg}'`"
          />
        </td>
        <td>{{ isDataExist(user.fullCode) }}</td>
        <td>{{ isDataExist(user.userNameCurrent) }}</td>
        <td>{{ isDataExist(user.attendFromDateTime) }}</td>
        <td>{{ isDataExist(user.attendToDateTime) }}</td>
        <td>
          <button @click="deleteItem(index)">
            <img src="@/assets/images/trash.svg" />
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import {
  isDataExist,
  fullPathFileFromServer,
} from "./../../../../utils/functions";
import usersImg from "@/assets/images/users.svg";

export default {
  name: "EducationalScheduleTimeDetailsQRCodeAttendUsers",
  props: {
    usersList: { type: Array, default: () => [] },
    UsersDataMsg: { type: String, default: "" },
  },
  data() {
    return {
      usersImg,
    };
  },

  methods: {
    isDataExist,
    fullPathFileFromServer,
    deleteItem(index) {
      this.usersList.splice(index - 1, 1);
    },
  },
};
</script>
