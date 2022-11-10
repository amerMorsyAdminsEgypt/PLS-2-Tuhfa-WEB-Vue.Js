<template>
  <div v-if="usersData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="5">{{ $t("Users.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
          <th>{{ $t("phone1") }}</th>
          <th>{{ $t("Users.type") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in usersData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="fullPathFileFromServer(user.userImagePath, userImg)"
              :onerror="`this.src='${userImg}'`"
            />
          </td>
          <td>{{ isDataExist(user.fullCode) }}</td>
          <td>
            {{ isDataExist(user.userNameCurrent) }}
          </td>
          <td class="table-phone-number">
            {{ isDataExist(user.userPhoneWithCC) }}
          </td>
          <td>
            {{ isDataExist(user.userTypeNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li v-if="checkPrivilege(hasPlaceUserFinaleDelete())">
                <button
                  v-b-modal.PlaceUserDelete
                  :title="$t('delete')"
                  @click="setPlaceUserData(user.model)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <!-- <li>
                <button
                  @click="
                    setPlaceUserData(user.model);
                    openBottomSheet('ActionsData');
                  "
                  :title="$t('actionsData.modelName')"
                >
                  <img src="@/assets/images/actions-data.svg" />
                </button>
              </li> -->
            </FloatingMenu>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {
  isDataExist,
  fullPathFileFromServer,
} from "./../../../utils/functions";
import userImg from "@/assets/images/users.svg";
import generalMixin from "./../../../utils/generalMixin";
import FloatingMenu from "./../../../components/general/FloatingMenu.vue";
import { checkPrivilege } from "./../../../utils/functions";
import { hasPlaceUserFinaleDelete } from "./../../../utils/privilegeHelper";

export default {
  name: "UsersTable",
  mixins: [generalMixin],
  components: { FloatingMenu },
  props: ["usersData", "filterData"],
  methods: {
    setPlaceUserData(placeUser) {
      this.$emit("setPlaceUserData", placeUser);
    },
    checkPrivilege,
    hasPlaceUserFinaleDelete,
    isDataExist,
    fullPathFileFromServer,
  },
  data() {
    return {
      userImg,
    };
  },
  computed: {},
};
</script>
