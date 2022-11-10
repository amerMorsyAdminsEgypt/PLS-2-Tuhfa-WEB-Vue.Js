<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="PlaceUserAdd"
      size="xl"
      :headerText="$t('PlaceUsers.add')"
      :headerIcon="placeUser.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="getDialogs()"
      @closed="$emit('refresh')"
    >
      <form autocomplete="off">
        <div class="my-card">
          <!-- PlaceMainModel -->
          <template v-if="mainModel == 'place'">
            <div class="row">
              <CustomSelectBox
                :className="'col-md-12'"
                :id="`place-placeToken`"
                :value="placeUser.placeToken"
                :options="placeTokenOptions"
                v-on:changeValue="placeTokenChanged($event)"
                :title="$t('Places.select')"
                :imgName="'places.svg'"
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
                            v-if="filteredListOfUsersNotInPlace.length > 0"
                            type="checkbox"
                            id="place-selectAll"
                            @click="selectAll()"
                            v-model="selectedAll"
                            class="checkbox"
                          />
                          {{ $t("general.all") }}
                        </th>
                        <th colspan="4">{{ $t("Users.data") }}</th>
                      </tr>
                      <tr>
                        <th>{{ $t("general.image") }}</th>
                        <th>{{ $t("general.code") }}</th>
                        <th>{{ $t("general.name") }}</th>
                        <th>{{ $t("phoneNumber") }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in filteredListOfUsersNotInPlace"
                        :key="index"
                      >
                        <td>{{ ++index }}</td>
                        <td>
                          <input
                            type="checkbox"
                            v-model="placeUser.usersTokensList"
                            :value="item.value"
                            @click="select(item.value)"
                            class="checkbox"
                          />
                        </td>
                        <td>
                          <img
                            class="item-img-table"
                            :src="
                              fullPathFileFromServer(item.image, defaultImgUser)
                            "
                            :onerror="`this.src='${defaultImgUser}'`"
                          />
                        </td>
                        <td>{{ isDataExist(item.fullCode) }}</td>
                        <td>{{ isDataExist(item.userNameCurrent) }}</td>
                        <td class="table-phone-number">
                          {{ isDataExist(item.phone) }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </template>
            </div>
          </template>
          <!-- UserMainModel -->
          <template v-if="mainModel == 'user'">
            <div class="row">
              <CustomSelectBox
                :className="'col-md-12'"
                :id="`user-userToken`"
                :value="placeUser.userToken"
                :options="userTokenOptions"
                v-on:changeValue="userTokenChanged($event)"
                :title="$t('Users.select')"
                :imgName="'users.svg'"
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
                            v-if="filteredListOfPlacesNotInUser.length > 0"
                            type="checkbox"
                            id="user-selectAll"
                            @click="selectAll()"
                            v-model="selectedAll"
                            class="checkbox"
                          />
                          {{ $t("general.all") }}
                        </th>
                        <th colspan="4">{{ $t("Places.data") }}</th>
                      </tr>
                      <tr>
                        <th>{{ $t("general.image") }}</th>
                        <th>{{ $t("general.code") }}</th>
                        <th>{{ $t("general.name") }}</th>
                        <th>{{ $t("phoneNumber") }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in filteredListOfPlacesNotInUser"
                        :key="index"
                      >
                        <td>{{ ++index }}</td>
                        <td>
                          <input
                            type="checkbox"
                            v-model="placeUser.placesTokensList"
                            :value="item.value"
                            @click="select(item.value)"
                            class="checkbox"
                          />
                        </td>
                        <td>
                          <img
                            class="item-img-table"
                            :src="
                              fullPathFileFromServer(
                                item.image,
                                defaultImgPlace
                              )
                            "
                            :onerror="`this.src='${defaultImgPlace}'`"
                          />
                        </td>
                        <td>{{ isDataExist(item.fullCode) }}</td>
                        <td>{{ isDataExist(item.placeNameCurrent) }}</td>
                        <td class="table-phone-number">
                          {{ isDataExist(item.phone) }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </template>
            </div>
          </template>
        </div>

        <div class="form-actions">
          <div class="icon-submit" @click.prevent="add()">
            <img src="@/assets/images/check-icon.svg" :title="$t('add')" />
          </div>
          <div
            @click.prevent
            class="icon-cancel"
            v-b-modal="`ConfirmCloseSheet-PlaceUserAdd`"
          >
            <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
          </div>
        </div>
      </form>
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="PlaceUserAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PreLoader from "./../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../components/general/ConfirmClearData.vue";
import CustomSelectBox from "./../../../components/general/CustomSelectBox.vue";
import CustomInput from "./../../../components/general/CustomInput.vue";
import ExceptionWithImg from "./../../../components/general/ExceptionWithImg.vue";
import {
  getUsersDialog,
  getPlacesDialog,
  getUsersDialogCustomized,
  getPlacesDialogCustomized,
} from "./../../../utils/dialogsOfApi";
import { STATUS } from "./../../../utils/constants";
import {
  fullPathFileFromServer,
  isDataExist,
} from "./../../../utils/functions";
import apiPlaceUser from "./../../../api/placeUser";
import generalMixin from "./../../../utils/generalMixin";
import defaultImgUser from "@/assets/images/users.svg";
import defaultImgPlace from "@/assets/images/places.svg";
// import { PLACE_TYPE_TOKENS, USER_TYPE } from "./../../../utils/constantLists";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    CustomSelectBox,
    CustomInput,
    ExceptionWithImg,
  },
  props: [
    "placeUser",
    "mainModel",
    "filterData",
    "placeModelName",
    "userModelName",
  ],
  data() {
    return {
      isLoading: false,
      exceptionMsg: null,
      filterTable: "",
      selectedAll: false,
      //#region PlaceMainModel
      placeTokenOptions: [],
      listOfUsersNotInPlace: [],
      defaultImgUser,
      //#endregion PlaceMainModel
      //#region UserMainModel
      userTokenOptions: [],
      listOfPlacesNotInUser: [],
      defaultImgPlace,
      //#endregion UserMainModel
    };
  },
  computed: {
    ...mapGetters(["userAuthorizeToken"]),
    //#region UserMainModel
    filteredListOfPlacesNotInUser() {
      const searchableKeys = ["fullCode", "placeNameCurrent", "phone"];
      return this.listOfPlacesNotInUser.filter((item) => {
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
    //#endregion UserMainModel

    //#region PlaceMainModel
    filteredListOfUsersNotInPlace() {
      const searchableKeys = ["fullCode", "userNameCurrent", "phone"];
      return this.listOfUsersNotInPlace.filter((item) => {
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
    //#endregion PlaceMainModel
  },
  methods: {
    fullPathFileFromServer,
    isDataExist,
    //#region dialogs
    async getDialogs() {
      this.selectedAll = false;
      switch (this.mainModel) {
        case "place":
          await this.getPlacesDialog();
          await this.getUsersDialogList();
          break;
        case "user":
          await this.getUsersDialog();
          await this.getPlacesDialogList();
          break;
      }
    },
    //#region UserMainModel
    async userTokenChanged(userToken) {
      this.isLoading = true;
      this.placeUser.userToken = userToken;
      await this.getPlacesDialogList();

      this.isLoading = false;
    },
    async getUsersDialog() {
      this.isLoading = true;
      let params = {
        modelName: this.userModelName,
        userTypeToken: this.filterData.userTypeToken,
      };
      this.userTokenOptions = await getUsersDialog(params);
      this.isLoading = false;
    },
    async getPlacesDialogList() {
      this.isLoading = true;
      let params = {
        modelName: this.placeModelName,
        placeTypeToken: this.filterData.placeTypeToken,
        notWithUserToken: this.placeUser.userToken,
      };
      const [options, error] = await getPlacesDialogCustomized(params);
      this.listOfPlacesNotInUser = options;
      this.exceptionMsg = error;
      this.isLoading = false;
    },
    //#endregion UserMainModel

    //#region PlaceMainModel
    async placeTokenChanged(placeToken) {
      this.isLoading = true;
      this.placeUser.placeToken = placeToken;
      await this.getUsersDialogList();

      this.isLoading = false;
    },
    async getPlacesDialog() {
      this.isLoading = true;
      let params = { placeTypeToken: this.filterData.placeTypeToken };
      this.placeTokenOptions = await getPlacesDialog(params);
      this.isLoading = false;
    },
    async getUsersDialogList() {
      this.isLoading = true;
      let params = {
        modelName: this.userModelName,
        userTypeToken: this.filterData.userTypeToken,
        notInPlaceToken: this.placeUser.placeToken,
      };
      const [options, error] = await getUsersDialogCustomized(params);
      this.listOfUsersNotInPlace = options;
      this.exceptionMsg = error;
      this.isLoading = false;
    },
    //#endregion PlaceMainModel
    //#endregion dialogs

    selectAll() {
      this.filterTable = "";
      switch (this.mainModel) {
        case "place":
          this.placeUser.usersTokensList = [];
          this.selectedAll = !this.selectedAll;
          if (this.selectedAll) {
            for (let ietm in this.listOfUsersNotInPlace) {
              this.placeUser.usersTokensList.push(
                this.listOfUsersNotInPlace[ietm].value
              );
            }
          }
          break;
        case "user":
          this.placeUser.placesTokensList = [];
          this.selectedAll = !this.selectedAll;
          if (this.selectedAll) {
            for (let ietm in this.listOfPlacesNotInUser) {
              this.placeUser.placesTokensList.push(
                this.listOfPlacesNotInUser[ietm].value
              );
            }
          }
          break;
      }
    },
    select(value) {
      const indexItemPlace = this.placeUser.usersTokensList.indexOf(value);
      const indexItemUser = this.placeUser.placesTokensList.indexOf(value);
      switch (this.mainModel) {
        case "place":
          if (indexItemPlace > -1) {
            this.placeUser.usersTokensList.splice(indexItemPlace, 1);
          }
          setTimeout(() => {
            if (
              this.listOfUsersNotInPlace.length ==
              this.placeUser.usersTokensList.length
            ) {
              this.selectedAll = true;
            } else {
              this.selectedAll = false;
            }
          }, 1000);

          break;
        case "user":
          if (indexItemUser > -1) {
            this.placeUser.placesTokensList.splice(indexItemUser, 1);
          }
          setTimeout(() => {
            if (
              this.listOfPlacesNotInUser.length ==
              this.placeUser.placesTokensList.length
            ) {
              this.selectedAll = true;
            } else {
              this.selectedAll = false;
            }
          }, 1000);

          break;
      }
    },

    async add() {
      this.isLoading = true;
      let params = {};
      switch (this.mainModel) {
        case "place":
          params = {
            userAuthorizeToken: this.userAuthorizeToken,
            placeToken: this.placeUser.placeToken,
            usersTokensList: this.placeUser.usersTokensList,
          };
          break;
        case "user":
          params = {
            userAuthorizeToken: this.userAuthorizeToken,
            userToken: this.placeUser.userToken,
            placesTokensList: this.placeUser.placesTokensList,
          };
          break;
      }

      try {
        let response = {};
        switch (this.mainModel) {
          case "place":
            response = await apiPlaceUser.addPlaceUsers(params);
            break;
          case "user":
            response = await apiPlaceUser.addUserPlaces(params);
            break;
        }
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-PlaceUserAdd");
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
          this.showMsg(response.data.msg);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
    response(data) {
      switch (data) {
        case "yes":
        case "no":
          this.selectedAll = false;
          this.placeUser.setInitialValue();
          break;
        case "leave":
          this.$emit("refresh");
          this.placeUser.setInitialValue();
          this.closeBottomSheet("PlaceUserAdd");
          break;
      }
    },
  },
  async created() {},
};
</script>
