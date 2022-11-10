<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="EducationalGroupStudentAdd"
      size="xl"
      :headerText="$t('EducationalGroupStudents.add')"
      :headerIcon="educationalGroupStudent.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="setIntioalData()"
    >
      <form autocomplete="off">
        <div class="my-card">
          <div class="row">
            <CustomSelectBox
              :emitObject="true"
              :className="'col-md-12'"
              :id="`addStudents-educationalGroupToken`"
              :value="educationalGroupStudent.educationalGroupToken"
              :options="educationalGroupTokenOptions"
              v-on:changeValue="educationalGroupTokenChanged($event)"
              :title="$t('EducationalGroups.name')"
              :imgName="'EducationalGroups.svg'"
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
                          v-if="
                            filteredEducationalJoiningApplicationTokensOptions.length >
                            0
                          "
                          type="checkbox"
                          id="selectAll"
                          @click="selectAll()"
                          v-model="selectedAll"
                          class="checkbox"
                        />
                        {{ $t("general.all") }}
                      </th>
                      <th colspan="1">
                        {{ $t("EducationalJoiningApplications.data") }}
                      </th>
                      <th colspan="3">{{ $t("Users.data") }}</th>
                      <th rowspan="2">
                        {{ $t("EducationalCategories.name") }}
                      </th>
                      <th colspan="3">
                        {{
                          $t("EducationalJoiningApplications.sessions.sessions")
                        }}
                      </th>
                      <th colspan="2">
                        {{
                          $t(
                            "EducationalJoiningApplications.subscription.validFrom"
                          )
                        }}
                      </th>
                      <th colspan="2">
                        {{
                          $t(
                            "EducationalJoiningApplications.subscription.validTo"
                          )
                        }}
                      </th>
                    </tr>
                    <tr>
                      <th>{{ $t("general.code") }}</th>
                      <th>{{ $t("general.image") }}</th>
                      <th>{{ $t("general.code") }}</th>
                      <th>{{ $t("general.name") }}</th>

                      <th>
                        {{ $t("EducationalJoiningApplications.sessions.type") }}
                      </th>
                      <th>
                        {{ $t("EducationalJoiningApplications.sessions.all") }}
                      </th>
                      <th>
                        {{
                          $t("EducationalJoiningApplications.sessions.remaning")
                        }}
                      </th>

                      <th>{{ $t("date") }}</th>
                      <th>{{ $t("time") }}</th>

                      <th>{{ $t("date") }}</th>
                      <th>{{ $t("time") }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(
                        item, index
                      ) in filteredEducationalJoiningApplicationTokensOptions"
                      :key="index"
                    >
                      <td>{{ ++index }}</td>
                      <td>
                        <input
                          type="checkbox"
                          v-model="
                            educationalGroupStudent.educationalJoiningApplicationTokens
                          "
                          :value="item.value"
                          @click="select(item.value)"
                          class="checkbox"
                        />
                      </td>
                      <td>{{ isDataExist(item.fullCode) }}</td>
                      <td>
                        <img
                          class="item-img-table"
                          :src="fullPathFileFromServer(item.image, defaultImg)"
                          :onerror="`this.src='${defaultImg}'`"
                        />
                      </td>
                      <td>{{ isDataExist(item.userFullCode) }}</td>
                      <td>{{ isDataExist(item.userNameCurrent) }}</td>

                      <td>
                        {{ isDataExist(item.educationalCategoryNameCurrent) }}
                      </td>

                      <td>
                        {{ isDataExist(item.subscriptionTypeNameCurrent) }}
                      </td>
                      <td>
                        {{
                          isDataExist(item.subscriptionRequestSessionsNumber)
                        }}
                      </td>
                      <td>
                        {{
                          isDataExist(
                            item.subscriptionRemaningSessionsNumberCount
                          )
                        }}
                      </td>

                      <td>{{ isDataExist(item.subscriptionFromDate) }}</td>
                      <td>{{ isDataExist(item.subscriptionFromTime) }}</td>
                      <td>{{ isDataExist(item.subscriptionToDate) }}</td>
                      <td>{{ isDataExist(item.subscriptionToTime) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </template>
          </div>
        </div>

        <div class="form-actions">
          <div class="icon-submit" @click.prevent="addStudents()">
            <img src="@/assets/images/check-icon.svg" :title="$t('add')" />
          </div>
          <div
            @click.prevent
            class="icon-cancel"
            v-b-modal="`ConfirmCloseSheet-EducationalGroupStudentAdd`"
          >
            <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
          </div>
        </div>
      </form>
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="EducationalGroupStudentAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PreLoader from "./../../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../../components/general/ExceptionWithImg.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
// import CustomSelectBoxMultiple from "./../../../../components/general/CustomSelectBoxMultiple.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import CustomInput from "./../../../../components/general/CustomInput.vue";
import { STATUS } from "./../../../../utils/constants";
import defaultImg from "@/assets/images/users.svg";
import {
  APPROVAL_TYPE_TOKENS,
  RELATED_TYPE_TOKENS,
  TERMINATION_TYPES,
  CLOSED_STATE_TYPES,
} from "./../../../../utils/constantLists";
import apiEducationalGroupStudent from "./../../../../api/educational/educationalGroupStudents";
import {
  getEducationalGroupsDialogCustomized,
  getEducationalJoiningApplicationsDialogCustomized,
} from "./../../../../utils/dialogsOfApi";
import generalMixin from "./../../../../utils/generalMixin";
import {
  getLanguage,
  isDataExist,
  fullPathFileFromServer,
} from "./../../../../utils/functions";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomBottomSheet,
    ConfirmClearData,
    // CustomSelectBoxMultiple,
    CustomInput,
    CustomSelectBox,
  },
  props: ["educationalGroupStudent", "tokensData"],
  data() {
    return {
      filterTable: "",
      language: getLanguage(),
      selectedAll: false,
      defaultImg,
      educationalJoiningApplicationTokensOptions: [],
      educationalGroupTokenOptions: [],
      educationalCategoryToken: "",
      item: {},
    };
  },

  computed: {
    ...mapGetters(["userAuthorizeToken"]),
    filteredEducationalJoiningApplicationTokensOptions() {
      const searchableKeys = [
        "fullCode",
        "userFullCode",
        "userNameCurrent",
        "educationalCategoryNameCurrent",
        "subscriptionTypeNameCurrent",
        "subscriptionRequestSessionsNumber",
        "subscriptionRemaningSessionsNumberCount",
        "subscriptionFromDate",
        "subscriptionFromTime",
        "subscriptionToDate",
        "subscriptionToTime",
      ];
      return this.educationalJoiningApplicationTokensOptions.filter((item) => {
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
  },
  methods: {
    selectAll() {
      this.filterTable = "";
      this.educationalGroupStudent.educationalJoiningApplicationTokens = [];
      this.selectedAll = !this.selectedAll;
      if (this.selectedAll) {
        for (let ietm in this.educationalJoiningApplicationTokensOptions) {
          this.educationalGroupStudent.educationalJoiningApplicationTokens.push(
            this.educationalJoiningApplicationTokensOptions[ietm].value
          );
        }
      }
    },
    select(value) {
      const indexItem =
        this.educationalGroupStudent.educationalJoiningApplicationTokens.indexOf(
          value
        );

      if (indexItem > -1) {
        this.educationalGroupStudent.educationalJoiningApplicationTokens.splice(
          indexItem,
          1
        );
      }
      setTimeout(() => {
        if (
          this.educationalJoiningApplicationTokensOptions.length ==
          this.educationalGroupStudent.educationalJoiningApplicationTokens
            .length
        ) {
          this.selectedAll = true;
        } else {
          this.selectedAll = false;
        }
      }, 1000);
    },

    async addStudents() {
      this.isLoading = true;
      let params = {
        userAuthorizeToken: this.userAuthorizeToken,
        educationalGroupToken:
          this.educationalGroupStudent.educationalGroupToken,
        educationalJoiningApplicationTokens:
          this.educationalGroupStudent.educationalJoiningApplicationTokens,
      };

      try {
        const response = await apiEducationalGroupStudent.addStudents(params);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("EducationalGroupStudentAdd");
          this.$emit("refresh");
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

    async getEducationalGroupsDialog() {
      this.isLoading = true;
      let params = {
        educationalGroupTerminationTypeToken: TERMINATION_TYPES.NotFinished,
        educationalGroupClosedStateTypeToken: CLOSED_STATE_TYPES.Open,
      };
      this.educationalGroupTokenOptions =
        await getEducationalGroupsDialogCustomized(params);
      this.isLoading = false;
    },
    async educationalGroupTokenChanged(item) {
      this.isLoading = true;
      this.educationalGroupStudent.educationalGroupToken = item.value;
      this.educationalGroupStudent.educationalJoiningApplicationTokens = [];
      if (item) {
        this.educationalCategoryToken = item.educationalCategoryToken;
        await this.getEducationalJoiningApplicationsDialog();
      } else {
        this.educationalJoiningApplicationTokensOptions = [];
      }

      this.isLoading = false;
    },
    async getEducationalJoiningApplicationsDialog() {
      this.isLoading = true;
      let params = {
        educationalCategoryToken: this.educationalCategoryToken,
        approvalTypeToken: APPROVAL_TYPE_TOKENS.Accepted,
        relatedTypeToken: RELATED_TYPE_TOKENS.NotRelated, //غير مرتبط بمجموعة(فلتر غير مضاف)
      };

      // this.educationalJoiningApplicationTokensOptions =
      //   await getEducationalJoiningApplicationsDialogCustomized(params);
      const [options, error] =
        await getEducationalJoiningApplicationsDialogCustomized(params);

      this.educationalJoiningApplicationTokensOptions = options;
      this.exceptionMsg = error;
      this.isLoading = false;
    },
    async setIntioalData() {
      this.educationalGroupStudent.setInitialValue();
      this.educationalGroupStudent.educationalGroupToken =
        this.tokensData.educationalGroupToken;
      this.educationalCategoryToken = this.tokensData.educationalCategoryToken;
    },

    response(data) {
      this.$emit("refresh");
      switch (data) {
        case "yes":
          this.setInitialValue();
          break;
        case "leave":
          this.setInitialValue();
          this.closeBottomSheet("EducationalGroupStudentAdd");
          break;
      }
    },
    isDataExist,
    fullPathFileFromServer,
  },
  async created() {
    await this.setIntioalData();
    await this.getEducationalGroupsDialog();
    this.getEducationalJoiningApplicationsDialog();
  },
};
</script>
