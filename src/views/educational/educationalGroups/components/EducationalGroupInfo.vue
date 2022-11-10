<template>
  <CustomBottomSheet
    :refName="'EducationalGroupInfo'"
    size="xl"
    :headerText="$t('EducationalGroups.data')"
    :headerIcon="educationalGroup.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalGroup.fullCode"
        :title="$t('EducationalGroups.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalGroup.educationalGroupNameAr"
        :title="$t('EducationalGroups.nameAr')"
        :imgName="'EducationalGroups.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalGroup.educationalGroupNameEn"
        :title="$t('EducationalGroups.nameEn')"
        :imgName="'EducationalGroups.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalGroup.educationalGroupNameUnd"
        :title="$t('EducationalGroups.nameUnd')"
        :imgName="'EducationalGroups.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalGroup.educationalGroupDescriptionAr"
        :title="$t('EducationalGroups.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalGroup.educationalGroupDescriptionEn"
        :title="$t('EducationalGroups.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalGroup.educationalGroupDescriptionUnd"
        :title="$t('EducationalGroups.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalGroup.educationalGroupNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          formateDateTimeLang(
            educationalGroup.educationalGroupStartDate,
            educationalGroup.educationalGroupStartTime
          )
        "
        :title="$t('EducationalGroups.startDateTime')"
        :imgName="'dateAndTime.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          formateDateTimeLang(
            educationalGroup.educationalGroupEndDate,
            educationalGroup.educationalGroupEndTime
          )
        "
        :title="$t('EducationalGroups.endDateTime')"
        :imgName="'dateAndTime.svg'"
      />

      <DataLabelGroup
        :className="'col-md-12'"
        :value="educationalGroup.educationalGroupTimeZoneNameCurrent"
        :title="$t('ConstantsListSelect.TimeZonesName')"
        :imgName="'TimeZones.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalGroup.educationalGroupMaximumStudentsNumber"
        :title="$t('EducationalGroups.maximumNumberOfStudents')"
        :imgName="'number.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalGroup.educationalGroupMinimumStudentsNumber"
        :title="$t('EducationalGroups.minimumNumberOfStudents')"
        :imgName="'number.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalGroup.educationalGroupClosedStateTypeNameCurrent"
        :title="$t('general.state')"
        :imgName="'type.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalGroup.educationalGroupTerminationTypeNameCurrent"
        :title="$t('general.type')"
        :imgName="'type.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          educationalGroup.educationalCategoryData.systemComponentsHierarchyData
            .systemComponentsHierarchyNameCurrent
        "
        :title="$t('SystemComponentsHierarchies.educationalActivity')"
        :imgName="'systemComponentsHierarchies.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          educationalGroup.educationalCategoryData.systemComponentData
            .systemComponentNameCurrent
        "
        :title="$t('SystemComponents.educationalActivity')"
        :imgName="'systemComponents.svg'"
      />
      <DataLabelGroup
        :className="'col-md-12'"
        :value="
          educationalGroup.educationalCategoryData
            .educationalCategoryNameCurrent
        "
        :title="$t('EducationalCategories.name')"
        :imgName="'EducationalCategories.svg'"
      />
    </div>

    <div
      v-for="(weekDay, index) in educationalGroup.educationalGroupWeekDayData"
      :key="index"
      class="container-collapse"
    >
      <b-button
        v-b-toggle="`id-${index}`"
        class="btn btn-lg btn-collapse collapse-data"
      >
        {{ `${weekDay.dayNameCurrent} - (${weekDay.dayWorkTypeNameCurrent})` }}
        <i class="fa fa-angle-down" aria-hidden="true"></i>
      </b-button>
      <b-collapse :id="`id-${index}`">
        <div class="my-card">
          <div
            v-if="weekDay.educationalGroupPlacesData.length == 0"
            class="my-card-no-content"
          >
            {{ $t("EducationalGroups.thereAreNoSlidesPlaces") }}
          </div>
          <template v-else>
            <div
              class="my-card"
              v-for="(
                educationalGroupPlace, indexPlace
              ) in weekDay.educationalGroupPlacesData"
              :key="indexPlace"
            >
              <span class="my-card-title">{{ indexPlace + 1 }}</span>

              <div class="row">
                <DataLabelGroup
                  :className="'col-md-12'"
                  :value="educationalGroupPlace.placeInfoData.placeNameCurrent"
                  :title="$t('Places.name')"
                  :imgName="'places.svg'"
                />
              </div>

              <div
                v-if="
                  educationalGroupPlace.educationalGroupTimesData.length == 0
                "
                class="my-card-no-content"
              >
                {{ $t("EducationalGroups.thereAreNoSlidesTimes") }}
              </div>
              <template v-else>
                <div
                  class="my-card"
                  v-for="(
                    groupTime, indexGroupTime
                  ) in educationalGroupPlace.educationalGroupTimesData"
                  :key="indexGroupTime"
                >
                  <span class="my-card-title">{{ indexGroupTime + 1 }}</span>

                  <div class="row">
                    <DataLabelGroup
                      :className="'col-md-6'"
                      :value="groupTime.timeFromByRequestTimeZone"
                      :title="$t('EducationalGroups.time.from')"
                      :imgName="'time.svg'"
                    />
                    <DataLabelGroup
                      :className="'col-md-6'"
                      :value="groupTime.timeToByRequestTimeZone"
                      :title="$t('EducationalGroups.time.to')"
                      :imgName="'time.svg'"
                    />

                    <DataLabelGroup
                      :className="'col-md-6'"
                      :value="groupTime.timeZoneNameCurrent"
                      :title="$t('ConstantsListSelect.TimeZonesName')"
                      :imgName="'TimeZones.svg'"
                    />
                    <DataLabelGroup
                      :className="'col-md-6'"
                      :value="groupTime.appointmentTypeNameCurrent"
                      :title="$t('ConstantsListSelect.AppointmentTypesName')"
                      :imgName="'AppointmentTypes.svg'"
                    />

                    <div class="my-card col-md-12">
                      <span class="my-card-title">{{
                        $t("lecturers.modelName")
                      }}</span>

                      <div
                        v-if="groupTime.employeesInfoData.length == 0"
                        class="my-card-no-content"
                      >
                        {{ $t("EducationalGroups.thereAreNoLecturers") }}
                      </div>
                      <template v-else>
                        <div
                          v-for="(
                            employee, indexEmployee
                          ) in groupTime.employeesInfoData"
                          :key="indexEmployee"
                          class="row"
                        >
                          <DataLabelGroup
                            :className="'col-md-12'"
                            :value="employee.userNameCurrent"
                            :title="$t('lecturers.name')"
                            :imgName="'lecturers.svg'"
                          />
                        </div>
                      </template>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </template>
        </div>
      </b-collapse>
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";
// import CustomCheckbox from "./../../../../components/general/CustomCheckbox.vue";
import { formateDateTimeLang } from "./../../../../utils/functions";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
    // CustomCheckbox,
  },
  props: ["educationalGroup"],
  methods: {
    formateDateTimeLang,
  },
};
</script>
