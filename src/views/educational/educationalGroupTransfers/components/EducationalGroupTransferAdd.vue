<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="EducationalGroupTransferAdd"
      size="xl"
      :headerText="$t('EducationalGroupTransfers.add')"
      :headerIcon="educationalGroupTransfer.icon"
      @opened="
        bottomSheetOpened = true;
        educationalGroupTransfer.setInitialValue();
        getEducationalGroupStudentsDialog();
      "
      :clickToClose="false"
      :swipeAble="false"
    >
      <form autocomplete="off">
        <div class="my-card">
          <div class="row">
            <CustomSelectBox
              :className="'col-md-12'"
              id="newEducationalGroupToken"
              :value="educationalGroupTransfer.newEducationalGroupToken"
              :options="educationalGroupTokenOptions"
              v-on:changeValue="
                educationalGroupTransfer.newEducationalGroupToken = $event
              "
              :title="$t('EducationalGroupTransfers.newGroup.name')"
              :imgName="'EducationalGroups.svg'"
            />

            <DateTimePicker
              class="col-md-6"
              id="transferDateTime"
              type="dateTime"
              :value="educationalGroupTransfer.allStudentsData.transferDateTime"
              v-on:changeValue="
                educationalGroupTransfer.allStudentsData.transferDateTime =
                  $event.dateTime
              "
              :title="$t('EducationalGroupTransfers.dateTime')"
              :language="language"
            />
            <CustomInputFloat
              :className="'col-md-6'"
              :id="`transfer-transferAmountValue`"
              :value="
                educationalGroupTransfer.allStudentsData.transferAmountValue
              "
              v-on:changeValue="
                educationalGroupTransfer.allStudentsData.transferAmountValue =
                  $event
              "
              :title="$t('EducationalGroupTransfers.amount')"
              :imgName="'money.svg'"
            />

            <TextArea
              :className="'col-md-6'"
              :id="`transfer-reasonForTransferAr`"
              :value="
                educationalGroupTransfer.allStudentsData.reasonForTransferAr
              "
              v-on:changeValue="
                educationalGroupTransfer.allStudentsData.reasonForTransferAr =
                  $event
              "
              :title="$t('general.reasonAr')"
              :imgName="'reason.svg'"
            />
            <TextArea
              :className="'col-md-6'"
              :id="`transfer-reasonForTransferEn`"
              :value="
                educationalGroupTransfer.allStudentsData.reasonForTransferEn
              "
              v-on:changeValue="
                educationalGroupTransfer.allStudentsData.reasonForTransferEn =
                  $event
              "
              :title="$t('general.reasonEn')"
              :imgName="'reason.svg'"
            />
            <TextArea
              :className="'col-md-6'"
              :id="`transfer-reasonForTransferUnd`"
              :value="
                educationalGroupTransfer.allStudentsData.reasonForTransferUnd
              "
              v-on:changeValue="
                educationalGroupTransfer.allStudentsData.reasonForTransferUnd =
                  $event
              "
              :title="$t('general.reasonUnd')"
              :imgName="'reason.svg'"
            />
            <TextArea
              :className="'col-md-6'"
              :id="`transfer-notes`"
              :value="educationalGroupTransfer.allStudentsData.notes"
              v-on:changeValue="
                educationalGroupTransfer.allStudentsData.notes = $event
              "
              :title="$t('notes')"
              :imgName="'notes.svg'"
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
                            filteredEducationalGroupStudentTokensOptions.length >
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
                      <th colspan="3">{{ $t("Users.data") }}</th>
                      <th colspan="3">
                        {{
                          $t("EducationalJoiningApplications.sessions.sessions")
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
                      <th>{{ $t("general.image") }}</th>
                      <th>{{ $t("general.code") }}</th>
                      <th>{{ $t("general.name") }}</th>

                      <th>
                        {{ $t("EducationalJoiningApplications.sessions.type") }}
                      </th>
                      <th>
                        {{
                          $t("EducationalJoiningApplications.sessions.remaning")
                        }}
                      </th>
                      <th>
                        {{
                          $t("EducationalJoiningApplications.sessions.valid")
                        }}
                      </th>

                      <th>{{ $t("date") }}</th>
                      <th>{{ $t("time") }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(
                        item, index
                      ) in filteredEducationalGroupStudentTokensOptions"
                      :key="index"
                    >
                      <td>{{ ++index }}</td>
                      <td>
                        <input
                          type="checkbox"
                          v-model="educationalGroupTransfer.allStudents"
                          :value="item.educationalGroupStudentToken"
                          @click="select(item.educationalGroupStudentToken)"
                          class="checkbox"
                        />
                      </td>
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
                        {{ isDataExist(item.subscriptionTypeNameCurrent) }}
                      </td>
                      <td>
                        {{
                          isDataExist(
                            item.subscriptionRemaningSessionsNumberCount
                          )
                        }}
                      </td>
                      <td>
                        <CustomCheckbox
                          :value="item.canAttendaceStatus"
                          :withOutTitle="true"
                          :centerStatus="true"
                          :showAsInfo="true"
                        />
                      </td>

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
            v-b-modal="`ConfirmCloseSheet-EducationalGroupTransferAdd`"
          >
            <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
          </div>
        </div>
      </form>
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="EducationalGroupTransferAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../../components/general/ExceptionWithImg.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import DateTimePicker from "./../../../../components/general/DateTimePicker.vue";
import CustomInputFloat from "./../../../../components/general/CustomInputFloat.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import CustomCheckbox from "./../../../../components/general/CustomCheckbox.vue";
import CustomInput from "./../../../../components/general/CustomInput.vue";
import EducationalGroupTransfer from "./../../../../models/educational/educationalGroupTransfers/EducationalGroupTransferModel";
import { STATUS } from "./../../../../utils/constants";
import {
  TERMINATION_TYPES,
  CLOSED_STATE_TYPES,
} from "./../../../../utils/constantLists";
import defaultImg from "@/assets/images/users.svg";
import apiEducationalGroupTransfer from "./../../../../api/educational/educationalGroupTransfers";
import {
  getEducationalGroupsDialogCustomized,
  getEducationalGroupStudentsDialog,
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
    CustomSelectBox,
    DateTimePicker,
    CustomInputFloat,
    TextArea,
    CustomCheckbox,
    CustomInput,
  },
  props: ["educationalGroupToken"],
  data() {
    return {
      filterTable: "",
      bottomSheetOpened: false,
      language: getLanguage(),
      educationalGroupTransfer: new EducationalGroupTransfer(),
      selectedAll: false,
      defaultImg,
      educationalGroupStudentTokensOptions: [],
      educationalGroupTokenOptions: [],
      item: {},
    };
  },
  computed: {
    filteredEducationalGroupStudentTokensOptions() {
      const searchableKeys = [
        "userFullCode",
        "userNameCurrent",
        "subscriptionTypeNameCurrent",
        "subscriptionRemaningSessionsNumberCount",
        "subscriptionToDate",
        "subscriptionToTime",
      ];
      return this.educationalGroupStudentTokensOptions.filter((item) => {
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
      this.educationalGroupTransfer.allStudents = [];
      this.selectedAll = !this.selectedAll;
      if (this.selectedAll) {
        for (let ietm in this.educationalGroupStudentTokensOptions) {
          this.educationalGroupTransfer.allStudents.push(
            this.educationalGroupStudentTokensOptions[ietm].value
          );
        }
      }
    },
    select(value) {
      const indexItem =
        this.educationalGroupTransfer.allStudents.indexOf(value);

      if (indexItem > -1) {
        this.educationalGroupTransfer.allStudents.splice(indexItem, 1);
      }
      setTimeout(() => {
        if (
          this.educationalGroupStudentTokensOptions.length ==
          this.educationalGroupTransfer.allStudents.length
        ) {
          this.selectedAll = true;
        } else {
          this.selectedAll = false;
        }
      }, 1000);
    },

    async addStudents() {
      this.isLoading = true;
      let params = this.educationalGroupTransfer.getDTO();
      try {
        const response = await apiEducationalGroupTransfer.add(params);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("EducationalGroupTransferAdd");
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
    async getEducationalGroupStudentsDialog() {
      this.isLoading = true;
      let params = {
        educationalGroupToken: this.educationalGroupToken,
      };

      const [options, error] = await getEducationalGroupStudentsDialog(
        params,
        true
      );

      this.educationalGroupStudentTokensOptions = options;
      this.exceptionMsg = error;
      this.isLoading = false;
    },

    response(data) {
      this.$emit("refresh");
      switch (data) {
        case "yes":
          this.setInitialValue();
          break;
        case "leave":
          this.setInitialValue();
          this.closeBottomSheet("EducationalGroupTransferAdd");
          break;
      }
    },
    isDataExist,
    fullPathFileFromServer,
  },
  watch: {
    bottomSheetOpened: function (val) {
      console.log(this.bottomSheetOpened);
      if (val) this.getEducationalGroupsDialog();
    },
  },
  // created() {
  //   this.getEducationalGroupsDialog();
  // },
};
</script>
