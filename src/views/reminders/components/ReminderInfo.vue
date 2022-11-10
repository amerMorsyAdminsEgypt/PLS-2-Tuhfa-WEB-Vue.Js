<template>
  <CustomBottomSheet
    :refName="'ReminderInfo'"
    size="xl"
    :headerText="$t('Reminders.data')"
    :headerIcon="reminder.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="reminder.fullCode"
        :title="$t('Reminders.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="reminder.reminderTitleAr"
        :title="$t('Reminders.titleAr')"
        :imgName="'reminders.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="reminder.reminderTitleEn"
        :title="$t('Reminders.titleEn')"
        :imgName="'reminders.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="reminder.reminderTitleUnd"
        :title="$t('Reminders.titleUnd')"
        :imgName="'reminders.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="reminder.reminderDescriptionAr"
        :title="$t('Reminders.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="reminder.reminderDescriptionEn"
        :title="$t('Reminders.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="reminder.reminderDescriptionUnd"
        :title="$t('Reminders.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="reminder.reminderNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-12'"
        :value="
          formateDateTimeLang(reminder.reminderDate, reminder.reminderTime)
        "
        :title="$t('actionsData.dateTime')"
        :imgName="'dateAndTime.svg'"
      />
      <!-- lists -->
      <div class="my-card row">
        <span class="my-card-title">{{ $t("Places.data") }}</span>
        <div
          v-if="reminder.placeInfoData.length == 0"
          class="my-card-no-content"
        >
          {{ $t("general.thereAreNoDetails") }}
        </div>
        <table v-else class="my-table mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>{{ $t("code") }}</th>
              <th>{{ $t("name") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in reminder.placeInfoData" :key="index">
              <td>{{ ++index }}</td>
              <td>{{ isDataExist(item.fullCode) }}</td>
              <td>{{ isDataExist(item.placeNameCurrent) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="my-card row">
        <span class="my-card-title">{{
          $t("EducationalCategories.data")
        }}</span>
        <div
          v-if="reminder.educationalCategoryInfoData.length == 0"
          class="my-card-no-content"
        >
          {{ $t("general.thereAreNoDetails") }}
        </div>
        <table v-else class="my-table mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>{{ $t("code") }}</th>
              <th>{{ $t("name") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in reminder.educationalCategoryInfoData"
              :key="index"
            >
              <td>{{ ++index }}</td>
              <td>{{ isDataExist(item.fullCode) }}</td>
              <td>{{ isDataExist(item.educationalCategoryNameCurrent) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="my-card row">
        <span class="my-card-title">{{ $t("EducationalGroups.data") }}</span>
        <div
          v-if="reminder.educationalGroupInfoData.length == 0"
          class="my-card-no-content"
        >
          {{ $t("general.thereAreNoDetails") }}
        </div>
        <table v-else class="my-table mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>{{ $t("name") }}</th>
              <th>{{ $t("EducationalGroups.duration") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in reminder.educationalGroupInfoData"
              :key="index"
            >
              <td>{{ ++index }}</td>
              <td>{{ isDataExist(item.educationalGroupNameCurrent) }}</td>
              <td>{{ isDataExist(item.educationalGroupDurationCurrent) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="my-card row">
        <span class="my-card-title">{{ $t("Users.data") }}</span>
        <div
          v-if="reminder.reminderUsersData.length == 0"
          class="my-card-no-content"
        >
          {{ $t("general.thereAreNoDetails") }}
        </div>
        <table v-else class="my-table mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>{{ $t("code") }}</th>
              <th>{{ $t("name") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in reminder.reminderUsersData"
              :key="index"
            >
              <td>{{ ++index }}</td>
              <td>{{ isDataExist(item.userInfoData.fullCode) }}</td>
              <td>{{ isDataExist(item.userInfoData.userNameCurrent) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="my-card row">
        <span class="my-card-title">{{ $t("PriorityTypes.data") }}</span>
        <div
          v-if="!reminder.priorityTypeInfoDataCurrent.priorityTypeToken"
          class="my-card-no-content"
        >
          {{ $t("general.thereAreNoDetails") }}
        </div>
        <table v-else class="my-table mt-3">
          <thead>
            <tr>
              <th>{{ $t("Colors.name") }}</th>
              <th>{{ $t("name") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {{
                  isDataExist(
                    reminder.priorityTypeInfoDataCurrent.colorNameCurrent
                  )
                }}
              </td>
              <td>
                {{
                  isDataExist(
                    reminder.priorityTypeInfoDataCurrent.priorityTypeNameCurrent
                  )
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../components/general/DataLabelGroup.vue";
import {
  isDataExist,
  formateDateTimeLang,
  fullPathFileFromServer,
} from "./../../../utils/functions";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
  },
  props: ["reminder"],
  data() {
    return {};
  },
  methods: {
    isDataExist,
    fullPathFileFromServer,
    formateDateTimeLang,
  },
};
</script>
