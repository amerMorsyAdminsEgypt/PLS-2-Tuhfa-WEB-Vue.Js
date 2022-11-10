<template>
  <CustomBottomSheet
    :refName="'EducationalScheduleTimeInfo'"
    size="xl"
    :headerText="$t('EducationalScheduleTimes.data')"
    :headerIcon="educationalScheduleTime.icon"
  >
    <template>
      <b-button v-b-toggle.EducationalGroups class="btn btn-lg btn-collapse">
        {{ $t("EducationalGroups.data") }}
        <i class="fa fa-angle-down" aria-hidden="true"></i>
      </b-button>
      <b-collapse id="EducationalGroups">
        <div class="my-card row">
          <DataLabelGroup
            :className="'col-md-6'"
            :value="
              educationalScheduleTime.educationalGroupInfoData
                .educationalGroupNameCurrent
            "
            :title="$t('EducationalGroups.name')"
            :imgName="'EducationalGroups.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="educationalScheduleTime.placeInfoData.placeNameCurrent"
            :title="$t('Places.name')"
            :imgName="'places.svg'"
          />

          <DataLabelGroup
            :className="'col-md-6'"
            :value="
              formateDateTimeLang(
                educationalScheduleTime.dateTimeFromDate,
                educationalScheduleTime.dateTimeFromTime
              )
            "
            :title="$t('EducationalScheduleTimes.from')"
            :imgName="'dateAndTime.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="
              formateDateTimeLang(
                educationalScheduleTime.dateTimeToDate,
                educationalScheduleTime.dateTimeToTime
              )
            "
            :title="$t('EducationalScheduleTimes.to')"
            :imgName="'dateAndTime.svg'"
          />

          <DataLabelGroup
            :className="'col-md-6'"
            :value="educationalScheduleTime.durationCurrent"
            :title="$t('EducationalScheduleTimes.duration')"
            :imgName="'dateAndTime.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="educationalScheduleTime.appointmentTypeNameCurrent"
            :title="$t('ConstantsListSelect.AppointmentTypesName')"
            :imgName="'AppointmentTypes.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="educationalScheduleTime.fullCode"
            :title="$t('EducationalScheduleTimes.code')"
            :imgName="'code.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="educationalScheduleTime.educationalScheduleTimeNameAr"
            :title="$t('EducationalScheduleTimes.nameAr')"
            :imgName="'EducationalScheduleTimes.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="educationalScheduleTime.educationalScheduleTimeNameEn"
            :title="$t('EducationalScheduleTimes.nameEn')"
            :imgName="'EducationalScheduleTimes.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="educationalScheduleTime.educationalScheduleTimeNameUnd"
            :title="$t('EducationalScheduleTimes.nameUnd')"
            :imgName="'EducationalScheduleTimes.svg'"
          />

          <DataLabelGroup
            :className="'col-md-6'"
            :value="
              educationalScheduleTime.educationalScheduleTimeDescriptionAr
            "
            :title="$t('EducationalScheduleTimes.descriptionAr')"
            :imgName="'description.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="
              educationalScheduleTime.educationalScheduleTimeDescriptionEn
            "
            :title="$t('EducationalScheduleTimes.descriptionEn')"
            :imgName="'description.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="
              educationalScheduleTime.educationalScheduleTimeDescriptionUnd
            "
            :title="$t('EducationalScheduleTimes.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="educationalScheduleTime.educationalScheduleTimeNotes"
            :title="$t('EducationalScheduleTimes.link')"
            :imgName="'link.svg'"
          />
        </div>
      </b-collapse>
    </template>

    <!-- lists -->
    <template>
      <b-button v-b-toggle.lecturers class="btn btn-lg btn-collapse">
        {{ $t("lecturers.data") }}
        <i class="fa fa-angle-down" aria-hidden="true"></i>
      </b-button>
      <b-collapse id="lecturers">
        <div class="my-card row">
          <!-- <span class="my-card-title">{{ $t("lecturers.data") }}</span> -->
          <table
            v-if="hasList(educationalScheduleTime.employeesData)"
            class="my-table"
          >
            <thead>
              <tr>
                <th>#</th>
                <th>{{ $t("name") }}</th>
                <th>{{ $t("Users.phone") }}</th>
                <th v-if="checkPrivilege(hasEmployee())">{{ $t("info") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(
                  employee, index
                ) in educationalScheduleTime.employeesData"
                :key="index"
              >
                <td>{{ ++index }}</td>
                <td>
                  {{
                    isDataExist(employee.employeeUserInfoData.userNameCurrent)
                  }}
                </td>
                <td class="table-phone-number">
                  {{
                    isDataExist(employee.employeeUserInfoData.userPhoneWithCC)
                  }}
                </td>
                <td v-if="checkPrivilege(hasEmployee())">
                  <router-link
                    :to="{
                      name: 'Employees',
                      params: {
                        userToken: employee.employeeUserToken,
                      },
                    }"
                    :title="$t('info')"
                  >
                    <img src="@/assets/images/info.svg" />
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else class="my-card-no-content">
            {{ $t("general.thereAreNoDetails") }}
          </div>
        </div>
      </b-collapse>
    </template>

    <template>
      <b-button v-b-toggle.students class="btn btn-lg btn-collapse">
        {{ $t("students.data") }}
        <i class="fa fa-angle-down" aria-hidden="true"></i>
      </b-button>
      <b-collapse id="students">
        <div class="my-card row">
          <!-- <span class="my-card-title">{{ $t("students.data") }}</span> -->
          <table
            v-if="hasList(educationalScheduleTime.studentsData)"
            class="my-table"
          >
            <thead>
              <tr>
                <th>#</th>
                <th>{{ $t("name") }}</th>
                <th>{{ $t("Users.phone") }}</th>
                <th v-if="checkPrivilege(hasStudent())">{{ $t("info") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(student, index) in educationalScheduleTime.studentsData"
                :key="index"
              >
                <td>{{ ++index }}</td>
                <td>
                  {{ isDataExist(student.studentUserInfoData.userNameCurrent) }}
                </td>
                <td class="table-phone-number">
                  {{ isDataExist(student.studentUserInfoData.userPhoneWithCC) }}
                </td>
                <td v-if="checkPrivilege(hasStudent())">
                  <router-link
                    :to="{
                      name: 'Students',
                      params: {
                        userToken: student.studentUserToken,
                      },
                    }"
                    :title="$t('info')"
                  >
                    <img src="@/assets/images/info.svg" />
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else class="my-card-no-content">
            {{ $t("general.thereAreNoDetails") }}
          </div>
        </div>
      </b-collapse>
    </template>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";
import {
  formateDateTimeLang,
  checkPrivilege,
} from "./../../../../utils/functions";
import { isDataExist } from "./../../../../utils/functions";
import { hasEmployee, hasStudent } from "./../../../../utils/privilegeHelper";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
  },
  props: ["educationalScheduleTime"],
  methods: {
    hasEmployee,
    hasStudent,
    formateDateTimeLang,
    checkPrivilege,
    isDataExist,
    hasList(list) {
      if (list) {
        return list.length ? true : false;
      } else {
        return false;
      }
    },
  },
};
</script>
