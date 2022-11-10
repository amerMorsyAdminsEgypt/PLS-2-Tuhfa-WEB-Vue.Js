<template>
  <div class="">
    <PreLoader v-if="isLoading" />

    <form autocomplete="off">
      <!-- #region inputs -->
      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-4'"
            :id="`${id}-fullCode`"
            :value="userSysteamInterest.fullCode"
            v-on:changeValue="userSysteamInterest.fullCode = $event"
            :title="$t('UserSysteamInterests.code')"
            :imgName="'code.svg'"
          />
          <CustomSelectBox
            :className="'col-md-4'"
            :id="`${id}-communicationTypeToken`"
            :errors="errors_communicationTypeToken"
            :value="userSysteamInterest.communicationTypeToken"
            :options="communicationTypeTokenOptions"
            v-on:changeValue="
              userSysteamInterest.communicationTypeToken = $event;
              $v.userSysteamInterest.communicationTypeToken.$touch();
            "
            :title="$t('CommunicationTypes.select')"
            :imgName="'communicationTypes.svg'"
          />
          <CustomSelectBox
            :className="'col-md-4'"
            :id="`${id}-replyStatusTypeToken`"
            :errors="errors_replyStatusTypeToken"
            :value="userSysteamInterest.replyStatusTypeToken"
            :options="replyStatusTypeTokenOptions"
            v-on:changeValue="
              userSysteamInterest.replyStatusTypeToken = $event;
              $v.userSysteamInterest.replyStatusTypeToken.$touch();
            "
            :title="$t('ConstantsListSelect.ReplyStatusTypes')"
            :imgName="'ReplyStatusTypes.svg'"
          />

          <!-- #region UserData -->
          <CustomSelectBox
            :className="'col-md-12'"
            :id="`${id}-userToken`"
            :value="userSysteamInterest.userToken"
            :options="userTokenOptions"
            v-on:changeValue="
              userSysteamInterest.userToken = $event;
              userSysteamInterest.followUpByUserTokenStatus =
                userSysteamInterest.userToken ? true : false;
            "
            :title="$t('students.select')"
            :imgName="'students.svg'"
          />

          <div
            class="col-12"
            v-show="!userSysteamInterest.followUpByUserTokenStatus"
          >
            <b-button v-b-toggle.StudentData class="btn btn-lg btn-collapse">
              {{ $t("students.data") }}
              <i class="fa fa-angle-down" aria-hidden="true"></i>
            </b-button>
            <b-collapse id="StudentData" class="row">
              <CustomInput
                :className="'col-md-6 col-lg-4'"
                :id="`${id}-userNameAr`"
                :value="userSysteamInterest.newUserData.userNameAr"
                v-on:changeValue="
                  userSysteamInterest.newUserData.userNameAr = $event
                "
                :title="$t('Users.nameAr')"
                :imgName="'students.svg'"
              />
              <CustomInput
                :className="'col-md-6 col-lg-4'"
                :id="`${id}-userNameEn`"
                :value="userSysteamInterest.newUserData.userNameEn"
                v-on:changeValue="
                  userSysteamInterest.newUserData.userNameEn = $event
                "
                :title="$t('Users.nameEn')"
                :imgName="'students.svg'"
              />
              <CustomInput
                :className="'col-md-6 col-lg-4'"
                :id="`${id}-userNameUnd`"
                :value="userSysteamInterest.newUserData.userNameUnd"
                v-on:changeValue="
                  userSysteamInterest.newUserData.userNameUnd = $event
                "
                :title="$t('Users.nameUnd')"
                :imgName="'students.svg'"
              />

              <CustomPhonePicker
                :className="'col-md-6 col-lg-4'"
                :id="`${id}-userPhone`"
                :countryCodeName="
                  userSysteamInterest.newUserData.userPhoneCountryCodeName
                "
                :countryCode="
                  userSysteamInterest.newUserData.userPhoneCountryCode
                "
                :phoneNumber="userSysteamInterest.newUserData.userPhone"
                v-on:changeValue="
                  userSysteamInterest.newUserData.userPhoneCountryCodeName =
                    $event.countryCodeName;
                  userSysteamInterest.newUserData.userPhoneCountryCode =
                    $event.countryCode;
                  userSysteamInterest.newUserData.userPhone =
                    $event.phoneNumber;
                "
                :title="$t('Users.phone')"
                :imgName="'phone.svg'"
              />
              <CustomInput
                :className="'col-md-6 col-lg-4'"
                :id="`${id}-userEmail`"
                :value="userSysteamInterest.newUserData.userEmail"
                v-on:changeValue="
                  userSysteamInterest.newUserData.userEmail = $event
                "
                :title="$t('Users.email')"
                :imgName="'email.svg'"
              />
              <CustomInput
                :className="'col-md-6 col-lg-4'"
                :id="`${id}-userNationalNumber`"
                :value="
                  userSysteamInterest.newUserData.userProfileData
                    .userNationalNumber
                "
                v-on:changeValue="
                  userSysteamInterest.newUserData.userProfileData.userNationalNumber =
                    $event
                "
                :title="$t('Users.nationalID')"
                :imgName="'nationalNumber.svg'"
              />

              <TextArea
                :className="'col-md-6 col-lg-4'"
                :id="`${id}-userAddressAr`"
                :value="
                  userSysteamInterest.newUserData.userProfileData.userAddressAr
                "
                v-on:changeValue="
                  userSysteamInterest.newUserData.userProfileData.userAddressAr =
                    $event
                "
                :title="$t('Users.addressAr')"
                :imgName="'address.svg'"
              />
              <TextArea
                :className="'col-md-6 col-lg-4'"
                :id="`${id}-userAddressEn`"
                :value="
                  userSysteamInterest.newUserData.userProfileData.userAddressEn
                "
                v-on:changeValue="
                  userSysteamInterest.newUserData.userProfileData.userAddressEn =
                    $event
                "
                :title="$t('Users.addressEn')"
                :imgName="'address.svg'"
              />
              <TextArea
                :className="'col-md-6 col-lg-4'"
                :id="`${id}-userAddressUnd`"
                :value="
                  userSysteamInterest.newUserData.userProfileData.userAddressUnd
                "
                v-on:changeValue="
                  userSysteamInterest.newUserData.userProfileData.userAddressUnd =
                    $event
                "
                :title="$t('Users.addressUnd')"
                :imgName="'address.svg'"
              />

              <CustomPhonePicker
                :className="'col-md-6 col-lg-4'"
                :id="`${id}-userPhone1`"
                :countryCodeName="
                  userSysteamInterest.newUserData.userProfileData
                    .userPhone1CountryCodeName
                "
                :countryCode="
                  userSysteamInterest.newUserData.userProfileData
                    .userPhone1CountryCode
                "
                :phoneNumber="
                  userSysteamInterest.newUserData.userProfileData.userPhone1
                "
                v-on:changeValue="
                  userSysteamInterest.newUserData.userProfileData.userPhone1CountryCodeName =
                    $event.countryCodeName;
                  userSysteamInterest.newUserData.userProfileData.userPhone1CountryCode =
                    $event.countryCode;
                  userSysteamInterest.newUserData.userProfileData.userPhone1 =
                    $event.phoneNumber;
                "
                :title="$t('Users.userPhone1')"
                :imgName="'phone.svg'"
              />
              <CustomPhonePicker
                :className="'col-md-6 col-lg-4'"
                :id="`${id}-userPhone2`"
                :countryCodeName="
                  userSysteamInterest.newUserData.userProfileData
                    .userPhone2CountryCodeName
                "
                :countryCode="
                  userSysteamInterest.newUserData.userProfileData
                    .userPhone2CountryCode
                "
                :phoneNumber="
                  userSysteamInterest.newUserData.userProfileData.userPhone2
                "
                v-on:changeValue="
                  userSysteamInterest.newUserData.userProfileData.userPhone2CountryCodeName =
                    $event.countryCodeName;
                  userSysteamInterest.newUserData.userProfileData.userPhone2CountryCode =
                    $event.countryCode;
                  userSysteamInterest.newUserData.userProfileData.userPhone2 =
                    $event.phoneNumber;
                "
                :title="$t('Users.userPhone2')"
                :imgName="'phone.svg'"
              />
              <CustomPhonePicker
                :className="'col-md-6 col-lg-4'"
                :id="`${id}-userPhone3`"
                :countryCodeName="
                  userSysteamInterest.newUserData.userProfileData
                    .userPhone3CountryCodeName
                "
                :countryCode="
                  userSysteamInterest.newUserData.userProfileData
                    .userPhone3CountryCode
                "
                :phoneNumber="
                  userSysteamInterest.newUserData.userProfileData.userPhone3
                "
                v-on:changeValue="
                  userSysteamInterest.newUserData.userProfileData.userPhone3CountryCodeName =
                    $event.countryCodeName;
                  userSysteamInterest.newUserData.userProfileData.userPhone3CountryCode =
                    $event.countryCode;
                  userSysteamInterest.newUserData.userProfileData.userPhone3 =
                    $event.phoneNumber;
                "
                :title="$t('Users.userPhone3')"
                :imgName="'phone.svg'"
              />

              <TextArea
                :className="'col-md-6'"
                :id="`${id}-userBirthPlaceNameAr`"
                :value="
                  userSysteamInterest.newUserData.userProfileData
                    .userBirthPlaceNameAr
                "
                v-on:changeValue="
                  userSysteamInterest.newUserData.userProfileData.userBirthPlaceNameAr =
                    $event
                "
                :title="$t('Users.userBirthPlaceNameAr')"
                :imgName="'address.svg'"
              />
              <TextArea
                :className="'col-md-6'"
                :id="`${id}-userBirthPlaceNameEn`"
                :value="
                  userSysteamInterest.newUserData.userProfileData
                    .userBirthPlaceNameEn
                "
                v-on:changeValue="
                  userSysteamInterest.newUserData.userProfileData.userBirthPlaceNameEn =
                    $event
                "
                :title="$t('Users.userBirthPlaceNameEn')"
                :imgName="'address.svg'"
              />
              <TextArea
                :className="'col-md-6'"
                :id="`${id}-userBirthPlaceNameUnd`"
                :value="
                  userSysteamInterest.newUserData.userProfileData
                    .userBirthPlaceNameUnd
                "
                v-on:changeValue="
                  userSysteamInterest.newUserData.userProfileData.userBirthPlaceNameUnd =
                    $event
                "
                :title="$t('Users.userBirthPlaceNameUnd')"
                :imgName="'address.svg'"
              />
              <DateTimePicker
                class="col-md-6"
                :id="`${id}-userBirthDateTime`"
                type="dateTime"
                :value="
                  userSysteamInterest.newUserData.userProfileData
                    .userBirthDateTime
                "
                :title="$t('Users.userBirthDateTime')"
                v-on:changeValue="
                  userSysteamInterest.newUserData.userProfileData.userBirthDateTime =
                    $event.dateTime
                "
                :language="language"
              />
            </b-collapse>
          </div>
          <!-- #endregion UserData -->
        </div>
      </div>
      <!-- #endregion inputs -->

      <!-- #region SysteamInterests -->
      <div class="my-card">
        <span class="my-card-title">{{
          $t("UserSysteamInterests.systeamInterests.modelName")
        }}</span>

        <div
          v-if="userSysteamInterest.systeamInterestsData.length == 0"
          class="my-card-no-content"
        >
          {{ $t("UserSysteamInterests.noInterests") }}
        </div>
        <template v-else>
          <div
            class="my-card"
            v-for="(item, index) in userSysteamInterest.systeamInterestsData"
            :key="index"
          >
            <span class="my-card-title">{{ index + 1 }}</span>

            <span class="remove-slice-container">
              <button
                @click="removeSliceSysteamInterest(index)"
                type="button"
                class="btn btn-remove-slice"
              >
                ×
              </button>
            </span>

            <div class="row">
              <!-- <CustomInput
                :className="'col-md-6'"
                :id="`${id}-[${index}]-fullCode`"
                :value="item.fullCode"
                v-on:changeValue="item.fullCode = $event"
                :title="$t('general.code')"
                :imgName="'code.svg'"
              /> -->
              <CustomSelectBox
                :className="'col-md-6'"
                :id="`${id}-[${index}]-interestTypeToken`"
                :value="item.interestTypeToken"
                :options="interestTypeTokenOptions"
                v-on:changeValue="item.interestTypeToken = $event"
                :title="$t('ConstantsListSelect.InterestTypes')"
                :imgName="'type.svg'"
              />
              <CustomSelectBox
                :className="'col-md-6'"
                :id="`${id}-[${index}]-priorityTypeToken`"
                :value="item.priorityTypeToken"
                :options="priorityTypeTokenOptions"
                v-on:changeValue="item.priorityTypeToken = $event"
                :title="$t('PriorityTypes.select')"
                :imgName="'priorityTypes.svg'"
              />

              <template v-if="item.interestTypeToken == INTEREST_TYPES.Place">
                <CustomSelectBox
                  :className="'col-md-6'"
                  :id="`${id}-[${index}]-placeTypeToken`"
                  :value="item.placeTypeToken"
                  :options="placeTypeTokenOptions"
                  v-on:changeValue="
                    item.placeTypeToken = $event;
                    getPlacesDialog(item.placeTypeToken, index);
                  "
                  :title="$t('Places.type')"
                  :imgName="'type.svg'"
                />
                <CustomSelectBox
                  :className="'col-md-6'"
                  :id="`${id}-[${index}]-placeToken`"
                  :value="item.placeToken"
                  :options="item.placeTokenOptions"
                  v-on:changeValue="item.placeToken = $event"
                  :title="$t('Places.select')"
                  :imgName="'places.svg'"
                />
              </template>

              <!-- <CustomSelectBox
                v-else-if="
                  item.interestTypeToken == INTEREST_TYPES.EducationalCategory
                "
                :className="'col-md-12'"
                :id="`${id}-[${index}]-educationalCategoryToken`"
                :value="item.educationalCategoryToken"
                :options="educationalCategoryTokenOptions"
                v-on:changeValue="item.educationalCategoryToken = $event"
                :title="$t('EducationalCategories.select')"
                :imgName="'EducationalCategories.svg'"
              /> -->
              <BaseTree
                v-else-if="
                  item.interestTypeToken == INTEREST_TYPES.EducationalCategory
                "
                :hierarchySystemTypeFilterToken="
                  SYSTEM_TYPE.EducationalActivity
                "
                :treeModel="{
                  systemComponentHierarchyToken:
                    item.educationalCategorySystemComponentHierarchyToken,
                  hierarchyTitle: $t(
                    'SystemComponentsHierarchies.selectEducationalActivity'
                  ),
                  systemComponentToken:
                    item.educationalCategorySystemComponentToken,
                  componentTitle: $t(
                    'SystemComponents.selectEducationalActivity'
                  ),
                  parentToken: item.educationalCategoryToken,
                  parentTitle: $t('EducationalCategories.select'),
                  parentImgName: 'EducationalCategories.svg',
                }"
                v-on:changeValue="
                  item.educationalCategorySystemComponentHierarchyToken =
                    $event.hierarchyToken;
                  item.educationalCategorySystemComponentToken =
                    $event.componentToken;
                  item.educationalCategoryToken = $event.parentToken;
                "
                :showParent="true"
                :filterParentDirect="true"
              />

              <CustomSelectBox
                v-else-if="
                  item.interestTypeToken == INTEREST_TYPES.EducationalGroup
                "
                :className="'col-md-12'"
                :id="`${id}-[${index}]-educationalGroupToken`"
                :value="item.educationalGroupToken"
                :options="educationalGroupTokenOptions"
                v-on:changeValue="item.educationalGroupToken = $event"
                :title="$t('EducationalGroups.select')"
                :imgName="'EducationalGroups.svg'"
              />

              <CustomSelectBox
                v-else-if="item.interestTypeToken == INTEREST_TYPES.Service"
                :className="'col-md-12'"
                :id="`${id}-[${index}]-serviceToken`"
                :value="item.serviceToken"
                :options="serviceTokenOptions"
                v-on:changeValue="item.serviceToken = $event"
                :title="$t('Services.select')"
                :imgName="'services.svg'"
              />

              <TextArea
                :className="'col-md-6'"
                :id="`${id}-[${index}]-systeamInterestDescriptionAr`"
                :value="item.systeamInterestDescriptionAr"
                v-on:changeValue="item.systeamInterestDescriptionAr = $event"
                :title="$t('descriptionAr')"
                :imgName="'description.svg'"
              />
              <TextArea
                :className="'col-md-6'"
                :id="`${id}-[${index}]-systeamInterestDescriptionEn`"
                :value="item.systeamInterestDescriptionEn"
                v-on:changeValue="item.systeamInterestDescriptionEn = $event"
                :title="$t('descriptionEn')"
                :imgName="'description.svg'"
              />
              <TextArea
                :className="'col-md-6'"
                :id="`${id}-[${index}]-systeamInterestDescriptionUnd`"
                :value="item.systeamInterestDescriptionUnd"
                v-on:changeValue="item.systeamInterestDescriptionUnd = $event"
                :title="$t('descriptionUnd')"
                :imgName="'description.svg'"
              />
              <TextArea
                :className="'col-md-6'"
                :id="`${id}-[${index}]-systeamInterestNotes`"
                :value="item.systeamInterestNotes"
                v-on:changeValue="item.systeamInterestNotes = $event"
                :title="$t('notes')"
                :imgName="'notes.svg'"
              />

              <DateTimePicker
                class="col-md-6"
                :id="`${id}-[${index}]-systeamInterestDateTimeFrom`"
                type="dateTime"
                :value="item.systeamInterestDateTimeFrom"
                :title="$t('UserSysteamInterests.dateTimeFrom')"
                v-on:changeValue="
                  item.systeamInterestDateTimeFrom = $event.dateTime
                "
                :language="language"
              />
              <DateTimePicker
                class="col-md-6"
                :id="`${id}-[${index}]-systeamInterestDateTimeTo`"
                type="dateTime"
                :value="item.systeamInterestDateTimeTo"
                :title="$t('UserSysteamInterests.dateTimeTo')"
                v-on:changeValue="
                  item.systeamInterestDateTimeTo = $event.dateTime
                "
                :language="language"
              />
            </div>
          </div>
        </template>
        <div class="add-slice-container">
          <button
            @click="addSliceSysteamInterest()"
            type="button"
            class="btn btn-add-slice"
            :title="$t('UserSysteamInterests.addInterest')"
          >
            +
          </button>
        </div>
      </div>
      <!-- #endregion SysteamInterests -->

      <!-- #region OtherInterests -->
      <div class="my-card">
        <span class="my-card-title">{{
          $t("UserSysteamInterests.otherInterests.modelName")
        }}</span>

        <div
          v-if="userSysteamInterest.otherInterestsData.length == 0"
          class="my-card-no-content"
        >
          {{ $t("UserSysteamInterests.noInterests") }}
        </div>
        <template v-else>
          <div
            class="my-card"
            v-for="(item, index) in userSysteamInterest.otherInterestsData"
            :key="index"
          >
            <span class="my-card-title">{{ index + 1 }}</span>

            <span class="remove-slice-container">
              <button
                @click="removeSliceOtherInterest(index)"
                type="button"
                class="btn btn-remove-slice"
              >
                ×
              </button>
            </span>

            <div class="row">
              <CustomSelectBox
                :className="'col-md-6'"
                :id="`${id}-[${index}]-interestTypeToken`"
                :value="item.interestTypeToken"
                :options="interestTypeTokenOptions"
                v-on:changeValue="item.interestTypeToken = $event"
                :title="$t('ConstantsListSelect.InterestTypes')"
                :imgName="'type.svg'"
              />
              <CustomInput
                :className="'col-md-6'"
                :id="`${id}-[${index}]-otherInterestNameAr`"
                :value="item.otherInterestNameAr"
                v-on:changeValue="item.otherInterestNameAr = $event"
                :title="$t('nameAr')"
                :imgName="'UserSysteamOtherInterests.svg'"
              />
              <CustomInput
                :className="'col-md-6'"
                :id="`${id}-[${index}]-otherInterestNameEn`"
                :value="item.otherInterestNameEn"
                v-on:changeValue="item.otherInterestNameEn = $event"
                :title="$t('nameEn')"
                :imgName="'UserSysteamOtherInterests.svg'"
              />
              <CustomInput
                :className="'col-md-6'"
                :id="`${id}-[${index}]-otherInterestNameUnd`"
                :value="item.otherInterestNameUnd"
                v-on:changeValue="item.otherInterestNameUnd = $event"
                :title="$t('nameUnd')"
                :imgName="'UserSysteamOtherInterests.svg'"
              />

              <TextArea
                :className="'col-md-6'"
                :id="`${id}-[${index}]-otherInterestDescriptionAr`"
                :value="item.otherInterestDescriptionAr"
                v-on:changeValue="item.otherInterestDescriptionAr = $event"
                :title="$t('descriptionAr')"
                :imgName="'description.svg'"
              />
              <TextArea
                :className="'col-md-6'"
                :id="`${id}-[${index}]-otherInterestDescriptionEn`"
                :value="item.otherInterestDescriptionEn"
                v-on:changeValue="item.otherInterestDescriptionEn = $event"
                :title="$t('descriptionEn')"
                :imgName="'description.svg'"
              />
              <TextArea
                :className="'col-md-6'"
                :id="`${id}-[${index}]-otherInterestDescriptionUnd`"
                :value="item.otherInterestDescriptionUnd"
                v-on:changeValue="item.otherInterestDescriptionUnd = $event"
                :title="$t('descriptionUnd')"
                :imgName="'description.svg'"
              />
              <TextArea
                :className="'col-md-6'"
                :id="`${id}-[${index}]-otherInterestNotes`"
                :value="item.otherInterestNotes"
                v-on:changeValue="item.otherInterestNotes = $event"
                :title="$t('notes')"
                :imgName="'notes.svg'"
              />

              <DateTimePicker
                class="col-md-6"
                :id="`${id}-[${index}]-otherInterestDateTimeFrom`"
                type="dateTime"
                :value="item.otherInterestDateTimeFrom"
                :title="$t('UserSysteamInterests.dateTimeFrom')"
                v-on:changeValue="
                  item.otherInterestDateTimeFrom = $event.dateTime
                "
                :language="language"
              />
              <DateTimePicker
                class="col-md-6"
                :id="`${id}-[${index}]-otherInterestDateTimeTo`"
                type="dateTime"
                :value="item.otherInterestDateTimeTo"
                :title="$t('UserSysteamInterests.dateTimeTo')"
                v-on:changeValue="
                  item.otherInterestDateTimeTo = $event.dateTime
                "
                :language="language"
              />
            </div>
          </div>
        </template>
        <div class="add-slice-container">
          <button
            @click="addSliceOtherInterest()"
            type="button"
            class="btn btn-add-slice"
            :title="$t('UserSysteamInterests.addInterest')"
          >
            +
          </button>
        </div>
      </div>
      <!-- #endregion OtherInterests -->

      <div class="form-actions">
        <div class="icon-submit" @click.prevent="submitForm">
          <img src="@/assets/images/check-icon.svg" :title="submitName" />
        </div>
        <div
          @click.prevent
          class="icon-cancel"
          v-b-modal="`ConfirmCloseSheet-${bottomSheetName}`"
        >
          <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomInput from "./../../../../components/general/CustomInput.vue";
import DateTimePicker from "./../../../../components/general/DateTimePicker.vue";
import CustomPhonePicker from "./../../../../components/general/CustomPhonePicker.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import BaseTree from "./../../../../components/general/BaseTree.vue";
import SysteamInterestData from "./../../../../models/followUps/userSysteamInterests/SysteamInterestData";
import OtherInterestData from "./../../../../models/followUps/userOtherInterests/OtherInterestData";
import { hasUserSysteamInterestDeleteImage } from "./../../../../utils/privilegeHelper";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import {
  getUsersDialog,
  getCommunicationTypesDialog,
  getPlacesDialog,
  getPriorityTypesDialog,
  // getEducationalCategoriesDialog,
  getEducationalGroupsDialog,
  getServicesDialog,
} from "./../../../../utils/dialogsOfApi";
import {
  getDialogOfReplyStatusTypes,
  getDialogOfInterestTypes,
  getDialogOfPlaceType,
} from "./../../../../utils/dialogsOfConstantsLists";
import {
  USER_TYPE,
  PRIORITY_SCOPE_TYPE_TOKENS,
  INTEREST_TYPES,
  SYSTEM_TYPE,
} from "./../../../../utils/constantLists";
import {
  checkPrivilege,
  getLanguage,
  fullPathFileFromServer,
  bottomSheetScrollToTop,
} from "./../../../../utils/functions";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    PreLoader,
    CustomInput,
    DateTimePicker,
    CustomPhonePicker,
    CustomSelectBox,
    TextArea,
    BaseTree,
  },
  data() {
    return {
      language: getLanguage(),
      userTokenOptions: [],
      communicationTypeTokenOptions: [],
      replyStatusTypeTokenOptions: getDialogOfReplyStatusTypes(),
      interestTypeTokenOptions: getDialogOfInterestTypes(),
      placeTypeTokenOptions: getDialogOfPlaceType(),
      priorityTypeTokenOptions: [],
      // educationalCategoryTokenOptions: [],
      educationalGroupTokenOptions: [],
      serviceTokenOptions: [],
      INTEREST_TYPES,
      SYSTEM_TYPE,
    };
  },
  props: {
    userSysteamInterest: {
      type: Object,
    },
    submitName: {
      type: String,
    },
    id: {
      type: String,
      default: "id",
    },
    bottomSheetName: {
      type: String,
      default: "",
    },
  },
  validations: {
    userSysteamInterest: {
      communicationTypeToken: { required },
      replyStatusTypeToken: { required },
    },
  },
  computed: {
    errors_communicationTypeToken() {
      let errors = [];
      if (this.$v.userSysteamInterest.communicationTypeToken.$error) {
        if (!this.$v.userSysteamInterest.communicationTypeToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_replyStatusTypeToken() {
      let errors = [];
      if (this.$v.userSysteamInterest.replyStatusTypeToken.$error) {
        if (!this.$v.userSysteamInterest.replyStatusTypeToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
  },
  methods: {
    addSliceSysteamInterest() {
      this.userSysteamInterest.systeamInterestsData.push(
        new SysteamInterestData()
      );
    },
    removeSliceSysteamInterest(index) {
      this.userSysteamInterest.systeamInterestsData.splice(index, 1);
    },
    addSliceOtherInterest() {
      this.userSysteamInterest.otherInterestsData.push(new OtherInterestData());
    },
    removeSliceOtherInterest(index) {
      this.userSysteamInterest.otherInterestsData.splice(index, 1);
    },
    async getStudentsDialog() {
      this.isLoading = true;
      let params = {
        modelName: "students",
        userTypeToken: USER_TYPE.Student,
      };
      this.userTokenOptions = await getUsersDialog(params);
      this.isLoading = false;
    },
    async getCommunicationTypesDialog() {
      this.isLoading = true;
      this.communicationTypeTokenOptions = await getCommunicationTypesDialog();
      this.isLoading = false;
    },

    async getPlacesDialog(placeTypeToken, index) {
      this.isLoading = true;
      let params = { placeTypeToken: placeTypeToken };
      this.userSysteamInterest.systeamInterestsData[index].placeTokenOptions =
        await getPlacesDialog(params);
      this.isLoading = false;
    },
    async getPriorityTypesDialog() {
      this.isLoading = true;
      let params = {
        priorityTypeTokenOptions: PRIORITY_SCOPE_TYPE_TOKENS.FollowUps,
      };
      this.priorityTypeTokenOptions = await getPriorityTypesDialog(params);
      this.isLoading = false;
    },
    // async getEducationalCategoriesDialog() {
    //   this.isLoading = true;
    //   this.educationalCategoryTokenOptions =
    //     await getEducationalCategoriesDialog();
    //   this.isLoading = false;
    // },
    async getEducationalGroupsDialog() {
      this.isLoading = true;
      this.educationalGroupTokenOptions = await getEducationalGroupsDialog();
      this.isLoading = false;
    },
    async getServicesDialog() {
      this.isLoading = true;
      this.serviceTokenOptions = await getServicesDialog();
      this.isLoading = false;
    },

    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        this.$v.userSysteamInterest.communicationTypeToken.required &&
        this.$v.userSysteamInterest.replyStatusTypeToken.required
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasUserSysteamInterestDeleteImage,
    fullPathFileFromServer,
  },
  created() {
    this.getStudentsDialog();
    this.getCommunicationTypesDialog();
    // this.getEducationalCategoriesDialog();
    this.getEducationalGroupsDialog();
  },
};
</script>
