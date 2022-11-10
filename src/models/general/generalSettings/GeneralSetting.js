import GeneralSettingModel from "./GeneralSettingModel";

export default class GeneralSetting {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.banks = new GeneralSettingModel();
    this.mediaPackages = new GeneralSettingModel();
    this.userQualifications = new GeneralSettingModel();
    this.knownMethods = new GeneralSettingModel();
    this.bloodTypes = new GeneralSettingModel();
    this.certificates = new GeneralSettingModel();
    this.cities = new GeneralSettingModel();
    this.countries = new GeneralSettingModel();
    this.districts = new GeneralSettingModel();
    this.governorates = new GeneralSettingModel();
    this.insuranceCompanies = new GeneralSettingModel();
    this.militaryStatusTypes = new GeneralSettingModel();
    this.qualifications = new GeneralSettingModel();
    this.educationalStages = new GeneralSettingModel();
    this.bodyParts = new GeneralSettingModel();
    this.injuryTypes = new GeneralSettingModel();
    this.operationTypes = new GeneralSettingModel();
    this.employeePayrollSettings = new GeneralSettingModel();
    this.religions = new GeneralSettingModel();
    this.installmentBatchTypes = new GeneralSettingModel();
    this.socialStatuses = new GeneralSettingModel();
    this.specialties = new GeneralSettingModel();
    this.users = new GeneralSettingModel();
    this.masterAdmins = new GeneralSettingModel();
    this.employees = new GeneralSettingModel();
    this.students = new GeneralSettingModel();
    this.suppliers = new GeneralSettingModel();
    this.parents = new GeneralSettingModel();
    this.clients = new GeneralSettingModel();
    this.adminsEgypt = new GeneralSettingModel();

    this.adminsEgyptFamily = new GeneralSettingModel();
    this.masterAdminFamily = new GeneralSettingModel();
    this.employeeFamily = new GeneralSettingModel();
    this.studentFamily = new GeneralSettingModel();
    this.supplierFamily = new GeneralSettingModel();
    this.parentFamily = new GeneralSettingModel();
    this.clientFamily = new GeneralSettingModel();

    this.adminsEgyptValidSetting = new GeneralSettingModel();
    this.masterAdminValidSetting = new GeneralSettingModel();
    this.employeeValidSetting = new GeneralSettingModel();
    this.studentValidSetting = new GeneralSettingModel();
    this.supplierValidSetting = new GeneralSettingModel();
    this.parentValidSetting = new GeneralSettingModel();
    this.clientValidSetting = new GeneralSettingModel();

    this.adminsEgyptLoginCode = new GeneralSettingModel();
    this.masterAdminLoginCode = new GeneralSettingModel();
    this.employeeLoginCode = new GeneralSettingModel();
    this.studentLoginCode = new GeneralSettingModel();
    this.supplierLoginCode = new GeneralSettingModel();
    this.parentLoginCode = new GeneralSettingModel();
    this.clientLoginCode = new GeneralSettingModel();

    this.adminsEgyptEstablishmentsRole = new GeneralSettingModel();
    this.masterAdminEstablishmentsRole = new GeneralSettingModel();
    this.employeeEstablishmentsRole = new GeneralSettingModel();
    this.studentEstablishmentsRole = new GeneralSettingModel();
    this.supplierEstablishmentsRole = new GeneralSettingModel();
    this.parentEstablishmentsRole = new GeneralSettingModel();
    this.clientEstablishmentsRole = new GeneralSettingModel();

    this.adminsEgyptQualification = new GeneralSettingModel();
    this.masterAdminQualification = new GeneralSettingModel();
    this.employeeQualification = new GeneralSettingModel();
    this.studentQualification = new GeneralSettingModel();
    this.supplierQualification = new GeneralSettingModel();
    this.parentQualification = new GeneralSettingModel();
    this.clientQualification = new GeneralSettingModel();

    this.adminsEgyptScientificDegree = new GeneralSettingModel();
    this.masterAdminScientificDegree = new GeneralSettingModel();
    this.employeeScientificDegree = new GeneralSettingModel();
    this.studentScientificDegree = new GeneralSettingModel();
    this.supplierScientificDegree = new GeneralSettingModel();
    this.parentScientificDegree = new GeneralSettingModel();
    this.clientScientificDegree = new GeneralSettingModel();

    this.adminsEgyptPersonalCard = new GeneralSettingModel();
    this.masterAdminPersonalCard = new GeneralSettingModel();
    this.employeePersonalCard = new GeneralSettingModel();
    this.studentPersonalCard = new GeneralSettingModel();
    this.supplierPersonalCard = new GeneralSettingModel();
    this.parentPersonalCard = new GeneralSettingModel();
    this.clientPersonalCard = new GeneralSettingModel();

    this.adminsEgyptTrainingCourse = new GeneralSettingModel();
    this.masterAdminTrainingCourse = new GeneralSettingModel();
    this.employeeTrainingCourse = new GeneralSettingModel();
    this.studentTrainingCourse = new GeneralSettingModel();
    this.supplierTrainingCourse = new GeneralSettingModel();
    this.parentTrainingCourse = new GeneralSettingModel();
    this.clientTrainingCourse = new GeneralSettingModel();

    this.adminsEgyptExperience = new GeneralSettingModel();
    this.masterAdminExperience = new GeneralSettingModel();
    this.employeeExperience = new GeneralSettingModel();
    this.studentExperience = new GeneralSettingModel();
    this.supplierExperience = new GeneralSettingModel();
    this.parentExperience = new GeneralSettingModel();
    this.clientExperience = new GeneralSettingModel();

    this.adminsEgyptInjury = new GeneralSettingModel();
    this.masterAdminInjury = new GeneralSettingModel();
    this.employeeInjury = new GeneralSettingModel();
    this.studentInjury = new GeneralSettingModel();
    this.supplierInjury = new GeneralSettingModel();
    this.parentInjury = new GeneralSettingModel();
    this.clientInjury = new GeneralSettingModel();

    this.adminsEgyptOperation = new GeneralSettingModel();
    this.masterAdminOperation = new GeneralSettingModel();
    this.employeeOperation = new GeneralSettingModel();
    this.studentOperation = new GeneralSettingModel();
    this.supplierOperation = new GeneralSettingModel();
    this.parentOperation = new GeneralSettingModel();
    this.clientOperation = new GeneralSettingModel();

    this.geographicalDistributions = new GeneralSettingModel();

    this.educationalPeriods = new GeneralSettingModel();
    this.discussions = new GeneralSettingModel();
    this.discussionComments = new GeneralSettingModel();
    this.educationalCategories = new GeneralSettingModel();
    this.educationalJoiningApplications = new GeneralSettingModel();
    this.joiningApplicationSubscriptions = new GeneralSettingModel();
    this.educationalGroups = new GeneralSettingModel();
    this.educationalGroupAttendances = new GeneralSettingModel();
    this.educationalScheduleTimes = new GeneralSettingModel();
    this.simpleExamModels = new GeneralSettingModel();
    this.groupScheduleExams = new GeneralSettingModel();
    this.studentScheduleExamTimes = new GeneralSettingModel();

    this.systemComponentPlace = new GeneralSettingModel();
    this.systemComponentEducationalCategory = new GeneralSettingModel();
    this.systemComponentGeographicalDistribution = new GeneralSettingModel();
    this.systemComponentJobGrade = new GeneralSettingModel();
    this.systemComponentStoreItem = new GeneralSettingModel();
    this.systemComponentBodyPart = new GeneralSettingModel();

    this.systemComponentsHierarchyPlace = new GeneralSettingModel();
    this.systemComponentsHierarchyEducationalCategory =
      new GeneralSettingModel();
    this.systemComponentsHierarchyGeographicalDistribution =
      new GeneralSettingModel();
    this.systemComponentsHierarchyJobGrade = new GeneralSettingModel();
    this.systemComponentsHierarchyStoreItem = new GeneralSettingModel();
    this.systemComponentsHierarchyBodyPart = new GeneralSettingModel();

    // this.places = new GeneralSettingModel();

    this.storageSpacesAdminsEgypt = new GeneralSettingModel();
    this.storageSpacesMasterAdmin = new GeneralSettingModel();
    this.storageSpacesEmployees = new GeneralSettingModel();
    this.storageSpacesStudents = new GeneralSettingModel();
    this.storageSpacesSuppliers = new GeneralSettingModel();
    this.storageSpacesParents = new GeneralSettingModel();
    this.storageSpacesClients = new GeneralSettingModel();

    this.storageSpacesPlaceMasterAdmin = new GeneralSettingModel();
    this.storageSpacesPlaceEmployees = new GeneralSettingModel();
    this.storageSpacesPlaceStudents = new GeneralSettingModel();
    this.storageSpacesPlaceSuppliers = new GeneralSettingModel();
    this.storageSpacesPlaceParents = new GeneralSettingModel();
    this.storageSpacesPlaceClients = new GeneralSettingModel();
    this.storageSpacesPlaceOthers = new GeneralSettingModel();

    this.storageSpacesEducationalGroup = new GeneralSettingModel();
    this.storageSpacesEducationalCategory = new GeneralSettingModel();

    this.storageSpaceMediasAdminsEgypt = new GeneralSettingModel();
    this.storageSpaceMediasMasterAdmin = new GeneralSettingModel();
    this.storageSpaceMediasEmployees = new GeneralSettingModel();
    this.storageSpaceMediasStudents = new GeneralSettingModel();
    this.storageSpaceMediasSuppliers = new GeneralSettingModel();
    this.storageSpaceMediasParents = new GeneralSettingModel();
    this.storageSpaceMediasClients = new GeneralSettingModel();

    this.storageSpaceMediasPlaceMasterAdmin = new GeneralSettingModel();
    this.storageSpaceMediasPlaceEmployees = new GeneralSettingModel();
    this.storageSpaceMediasPlaceStudents = new GeneralSettingModel();
    this.storageSpaceMediasPlaceSuppliers = new GeneralSettingModel();
    this.storageSpaceMediasPlaceParents = new GeneralSettingModel();
    this.storageSpaceMediasPlaceClients = new GeneralSettingModel();
    this.storageSpaceMediasPlaceOthers = new GeneralSettingModel();

    this.storageSpaceMediasEducationalGroup = new GeneralSettingModel();
    this.storageSpaceMediasEducationalCategory = new GeneralSettingModel();

    this.sharedMediaFolders = new GeneralSettingModel();
    this.sharedMedias = new GeneralSettingModel();

    this.jobGrades = new GeneralSettingModel();
    this.colors = new GeneralSettingModel();
    this.priorityTypes = new GeneralSettingModel();
    this.communicationTypes = new GeneralSettingModel();
    this.complaintTypes = new GeneralSettingModel();
    this.newsCategories = new GeneralSettingModel();
    this.complaintSectors = new GeneralSettingModel();
    this.reminderPlans = new GeneralSettingModel();
    this.expensesTypes = new GeneralSettingModel();
    this.revenuesTypes = new GeneralSettingModel();
    this.paymentMethods = new GeneralSettingModel();
    this.gradingPlans = new GeneralSettingModel();
    this.priceLists = new GeneralSettingModel();
    this.relativeRelationTypes = new GeneralSettingModel();

    //#region Products
    this.storeItems = new GeneralSettingModel();
    this.dropDownLists = new GeneralSettingModel();
    this.propertyTypes = new GeneralSettingModel();
    this.priceQuotationAffiliateOperations = new GeneralSettingModel();
    this.quotationPriceHistories = new GeneralSettingModel();
    this.priceQuotationJobOrders = new GeneralSettingModel();
    //#endregion Products

    this.accounts = new GeneralSettingModel();
    this.accountTransactions = new GeneralSettingModel();
    this.countedServiceTransactions = new GeneralSettingModel();
    this.expenses = new GeneralSettingModel();
    this.revenues = new GeneralSettingModel();
    this.serviceTypes = new GeneralSettingModel();
    this.countedServiceTypes = new GeneralSettingModel();
    this.services = new GeneralSettingModel();
    this.countedServices = new GeneralSettingModel();
    this.newss = new GeneralSettingModel();
    this.complaints = new GeneralSettingModel();
    this.complaintFollowUps = new GeneralSettingModel();
    this.educationalRatings = new GeneralSettingModel();
    this.debts = new GeneralSettingModel();
    this.installments = new GeneralSettingModel();
    this.installmentPayments = new GeneralSettingModel();
    this.serviceEntitlements = new GeneralSettingModel();
    this.interests = new GeneralSettingModel();
    this.interestFollowUps = new GeneralSettingModel();
    this.userInterests = new GeneralSettingModel();
    this.followInterests = new GeneralSettingModel();
    this.userOtherInterests = new GeneralSettingModel();
    this.userSysteamInterests = new GeneralSettingModel();

    this.notifications = new GeneralSettingModel();
    this.reminders = new GeneralSettingModel();
    this.educationalGroupStudents = new GeneralSettingModel();
    this.educationalGroupEmployees = new GeneralSettingModel();
    this.educationalGroupPlaces = new GeneralSettingModel();
    this.educationalGroupTransfers = new GeneralSettingModel();
    this.classificationDegrees = new GeneralSettingModel();
    this.generalJobs = new GeneralSettingModel();
    this.personalCardTypes = new GeneralSettingModel();
    this.scientificDegrees = new GeneralSettingModel();
    this.placeUsers = new GeneralSettingModel();
    this.placeMasterAdmin = new GeneralSettingModel();
    this.placeEmployees = new GeneralSettingModel();
    this.placeStudents = new GeneralSettingModel();
    this.placeSuppliers = new GeneralSettingModel();
    this.placeParents = new GeneralSettingModel();
    this.placeClients = new GeneralSettingModel();
    this.placeOthers = new GeneralSettingModel();
  }
  fillData(data) {
    if (data) {
      // this.establishmentRoles.fillData(data.establishmentRoles);
      this.banks.fillData(data.banks);
      this.mediaPackages.fillData(data.mediaPackages);
      this.userQualifications.fillData(data.userQualifications);
      this.knownMethods.fillData(data.knownMethods);
      this.bloodTypes.fillData(data.bloodTypes);
      this.certificates.fillData(data.certificates);
      this.cities.fillData(data.cities);
      this.countries.fillData(data.countries);
      this.districts.fillData(data.districts);
      this.governorates.fillData(data.governorates);
      this.insuranceCompanies.fillData(data.insuranceCompanies);
      this.militaryStatusTypes.fillData(data.militaryStatusTypes);
      this.qualifications.fillData(data.qualifications);
      this.educationalStages.fillData(data.educationalStages);
      this.bodyParts.fillData(data.bodyParts);
      this.injuryTypes.fillData(data.injuryTypes);
      this.operationTypes.fillData(data.operationTypes);
      this.employeePayrollSettings.fillData(data.employeePayrollSettings);
      this.religions.fillData(data.religions);
      this.installmentBatchTypes.fillData(data.installmentBatchTypes);
      this.socialStatuses.fillData(data.socialStatuses);
      this.specialties.fillData(data.specialties);
      // this.userValidSettings.fillData(data.userValidSettings);
      this.users.fillData(data.users);
      this.masterAdmins.fillData(data.masterAdmins);
      this.employees.fillData(data.employees);
      this.students.fillData(data.students);
      this.suppliers.fillData(data.suppliers);
      this.parents.fillData(data.parents);
      this.clients.fillData(data.clients);
      this.adminsEgypt.fillData(data.adminsEgypt);

      this.adminsEgyptFamily.fillData(data.adminsEgyptFamily);
      this.masterAdminFamily.fillData(data.masterAdminFamily);
      this.employeeFamily.fillData(data.employeeFamily);
      this.studentFamily.fillData(data.studentFamily);
      this.supplierFamily.fillData(data.supplierFamily);
      this.parentFamily.fillData(data.parentFamily);
      this.clientFamily.fillData(data.clientFamily);

      this.adminsEgyptValidSetting.fillData(data.adminsEgyptValidSetting);
      this.masterAdminValidSetting.fillData(data.masterAdminValidSetting);
      this.employeeValidSetting.fillData(data.employeeValidSetting);
      this.studentValidSetting.fillData(data.studentValidSetting);
      this.supplierValidSetting.fillData(data.supplierValidSetting);
      this.parentValidSetting.fillData(data.parentValidSetting);
      this.clientValidSetting.fillData(data.clientValidSetting);

      this.adminsEgyptLoginCode.fillData(data.adminsEgyptLoginCode);
      this.masterAdminLoginCode.fillData(data.masterAdminLoginCode);
      this.employeeLoginCode.fillData(data.employeeLoginCode);
      this.studentLoginCode.fillData(data.studentLoginCode);
      this.supplierLoginCode.fillData(data.supplierLoginCode);
      this.parentLoginCode.fillData(data.parentLoginCode);
      this.clientLoginCode.fillData(data.clientLoginCode);

      this.adminsEgyptEstablishmentsRole.fillData(
        data.adminsEgyptEstablishmentsRole
      );
      this.masterAdminEstablishmentsRole.fillData(
        data.masterAdminEstablishmentsRole
      );
      this.employeeEstablishmentsRole.fillData(data.employeeEstablishmentsRole);
      this.studentEstablishmentsRole.fillData(data.studentEstablishmentsRole);
      this.supplierEstablishmentsRole.fillData(data.supplierEstablishmentsRole);
      this.parentEstablishmentsRole.fillData(data.parentEstablishmentsRole);
      this.clientEstablishmentsRole.fillData(data.clientEstablishmentsRole);

      this.adminsEgyptQualification.fillData(data.adminsEgyptQualification);
      this.masterAdminQualification.fillData(data.masterAdminQualification);
      this.employeeQualification.fillData(data.employeeQualification);
      this.studentQualification.fillData(data.studentQualification);
      this.supplierQualification.fillData(data.supplierQualification);
      this.parentQualification.fillData(data.parentQualification);
      this.clientQualification.fillData(data.clientQualification);

      this.adminsEgyptScientificDegree.fillData(
        data.adminsEgyptScientificDegree
      );
      this.masterAdminScientificDegree.fillData(
        data.masterAdminScientificDegree
      );
      this.employeeScientificDegree.fillData(data.employeeScientificDegree);
      this.studentScientificDegree.fillData(data.studentScientificDegree);
      this.supplierScientificDegree.fillData(data.supplierScientificDegree);
      this.parentScientificDegree.fillData(data.parentScientificDegree);
      this.clientScientificDegree.fillData(data.clientScientificDegree);

      this.adminsEgyptPersonalCard.fillData(data.adminsEgyptPersonalCard);
      this.masterAdminPersonalCard.fillData(data.masterAdminPersonalCard);
      this.employeePersonalCard.fillData(data.employeePersonalCard);
      this.studentPersonalCard.fillData(data.studentPersonalCard);
      this.supplierPersonalCard.fillData(data.supplierPersonalCard);
      this.parentPersonalCard.fillData(data.parentPersonalCard);
      this.clientPersonalCard.fillData(data.clientPersonalCard);

      this.adminsEgyptTrainingCourse.fillData(data.adminsEgyptTrainingCourse);
      this.masterAdminTrainingCourse.fillData(data.masterAdminTrainingCourse);
      this.employeeTrainingCourse.fillData(data.employeeTrainingCourse);
      this.studentTrainingCourse.fillData(data.studentTrainingCourse);
      this.supplierTrainingCourse.fillData(data.supplierTrainingCourse);
      this.parentTrainingCourse.fillData(data.parentTrainingCourse);
      this.clientTrainingCourse.fillData(data.clientTrainingCourse);

      this.adminsEgyptExperience.fillData(data.adminsEgyptExperience);
      this.masterAdminExperience.fillData(data.masterAdminExperience);
      this.employeeExperience.fillData(data.employeeExperience);
      this.studentExperience.fillData(data.studentExperience);
      this.supplierExperience.fillData(data.supplierExperience);
      this.parentExperience.fillData(data.parentExperience);
      this.clientExperience.fillData(data.clientExperience);

      this.adminsEgyptInjury.fillData(data.adminsEgyptInjury);
      this.masterAdminInjury.fillData(data.masterAdminInjury);
      this.employeeInjury.fillData(data.employeeInjury);
      this.studentInjury.fillData(data.studentInjury);
      this.supplierInjury.fillData(data.supplierInjury);
      this.parentInjury.fillData(data.parentInjury);
      this.clientInjury.fillData(data.clientInjury);

      this.adminsEgyptOperation.fillData(data.adminsEgyptOperation);
      this.masterAdminOperation.fillData(data.masterAdminOperation);
      this.employeeOperation.fillData(data.employeeOperation);
      this.studentOperation.fillData(data.studentOperation);
      this.supplierOperation.fillData(data.supplierOperation);
      this.parentOperation.fillData(data.parentOperation);
      this.clientOperation.fillData(data.clientOperation);

      this.geographicalDistributions.fillData(data.geographicalDistributions);

      this.educationalPeriods.fillData(data.educationalPeriods);
      this.discussions.fillData(data.discussions);
      this.discussionComments.fillData(data.discussionComments);
      this.educationalCategories.fillData(data.educationalCategories);
      this.educationalJoiningApplications.fillData(
        data.educationalJoiningApplications
      );
      this.joiningApplicationSubscriptions.fillData(
        data.joiningApplicationSubscriptions
      );
      this.educationalGroups.fillData(data.educationalGroups);
      this.educationalGroupAttendances.fillData(
        data.educationalGroupAttendances
      );
      this.educationalScheduleTimes.fillData(data.educationalScheduleTimes);
      this.simpleExamModels.fillData(data.simpleExamModels);
      this.groupScheduleExams.fillData(data.groupScheduleExams);
      this.studentScheduleExamTimes.fillData(data.studentScheduleExamTimes);

      this.systemComponentPlace.fillData(data.systemComponentPlace);
      this.systemComponentEducationalCategory.fillData(
        data.systemComponentEducationalCategory
      );
      this.systemComponentGeographicalDistribution.fillData(
        data.systemComponentGeographicalDistribution
      );
      this.systemComponentJobGrade.fillData(data.systemComponentJobGrade);
      this.systemComponentStoreItem.fillData(data.systemComponentStoreItem);
      this.systemComponentBodyPart.fillData(data.systemComponentBodyPart);

      this.systemComponentsHierarchyPlace.fillData(
        data.systemComponentsHierarchyPlace
      );
      this.systemComponentsHierarchyEducationalCategory.fillData(
        data.systemComponentsHierarchyEducationalCategory
      );
      this.systemComponentsHierarchyGeographicalDistribution.fillData(
        data.systemComponentsHierarchyGeographicalDistribution
      );
      this.systemComponentsHierarchyJobGrade.fillData(
        data.systemComponentsHierarchyJobGrade
      );
      this.systemComponentsHierarchyStoreItem.fillData(
        data.systemComponentsHierarchyStoreItem
      );
      this.systemComponentsHierarchyBodyPart.fillData(
        data.systemComponentsHierarchyBodyPart
      );

      // this.places.fillData(data.places);

      this.storageSpacesAdminsEgypt.fillData(data.storageSpacesAdminsEgypt);
      this.storageSpacesMasterAdmin.fillData(data.storageSpacesMasterAdmin);
      this.storageSpacesEmployees.fillData(data.storageSpacesEmployees);
      this.storageSpacesStudents.fillData(data.storageSpacesStudents);
      this.storageSpacesSuppliers.fillData(data.storageSpacesSuppliers);
      this.storageSpacesParents.fillData(data.storageSpacesParents);
      this.storageSpacesClients.fillData(data.storageSpacesClients);

      this.storageSpacesPlaceMasterAdmin.fillData(
        data.storageSpacesPlaceMasterAdmin
      );
      this.storageSpacesPlaceEmployees.fillData(
        data.storageSpacesPlaceEmployees
      );
      this.storageSpacesPlaceStudents.fillData(data.storageSpacesPlaceStudents);
      this.storageSpacesPlaceSuppliers.fillData(
        data.storageSpacesPlaceSuppliers
      );
      this.storageSpacesPlaceParents.fillData(data.storageSpacesPlaceParents);
      this.storageSpacesPlaceClients.fillData(data.storageSpacesPlaceClients);
      this.storageSpacesPlaceOthers.fillData(data.storageSpacesPlaceOthers);

      this.storageSpacesEducationalGroup.fillData(
        data.storageSpacesEducationalGroup
      );
      this.storageSpacesEducationalCategory.fillData(
        data.storageSpacesEducationalCategory
      );

      this.storageSpaceMediasAdminsEgypt.fillData(
        data.storageSpaceMediasAdminsEgypt
      );
      this.storageSpaceMediasMasterAdmin.fillData(
        data.storageSpaceMediasMasterAdmin
      );
      this.storageSpaceMediasEmployees.fillData(
        data.storageSpaceMediasEmployees
      );
      this.storageSpaceMediasStudents.fillData(data.storageSpaceMediasStudents);
      this.storageSpaceMediasSuppliers.fillData(
        data.storageSpaceMediasSuppliers
      );
      this.storageSpaceMediasParents.fillData(data.storageSpaceMediasParents);
      this.storageSpaceMediasClients.fillData(data.storageSpaceMediasClients);

      this.storageSpaceMediasPlaceMasterAdmin.fillData(
        data.storageSpaceMediasPlaceMasterAdmin
      );
      this.storageSpaceMediasPlaceEmployees.fillData(
        data.storageSpaceMediasPlaceEmployees
      );
      this.storageSpaceMediasPlaceStudents.fillData(
        data.storageSpaceMediasPlaceStudents
      );
      this.storageSpaceMediasPlaceSuppliers.fillData(
        data.storageSpaceMediasPlaceSuppliers
      );
      this.storageSpaceMediasPlaceParents.fillData(
        data.storageSpaceMediasPlaceParents
      );
      this.storageSpaceMediasPlaceClients.fillData(
        data.storageSpaceMediasPlaceClients
      );
      this.storageSpaceMediasPlaceOthers.fillData(
        data.storageSpaceMediasPlaceOthers
      );

      this.storageSpaceMediasEducationalGroup.fillData(
        data.storageSpaceMediasEducationalGroup
      );

      this.storageSpaceMediasEducationalCategory.fillData(
        data.storageSpaceMediasEducationalCategory
      );

      this.sharedMediaFolders.fillData(data.sharedMediaFolders);
      this.sharedMedias.fillData(data.sharedMedias);

      this.jobGrades.fillData(data.jobGrades);
      this.colors.fillData(data.colors);
      this.priorityTypes.fillData(data.priorityTypes);
      this.communicationTypes.fillData(data.communicationTypes);
      this.complaintTypes.fillData(data.complaintTypes);
      this.newsCategories.fillData(data.newsCategories);
      this.complaintSectors.fillData(data.complaintSectors);
      this.reminderPlans.fillData(data.reminderPlans);
      this.expensesTypes.fillData(data.expensesTypes);
      this.revenuesTypes.fillData(data.revenuesTypes);
      this.paymentMethods.fillData(data.paymentMethods);
      this.gradingPlans.fillData(data.gradingPlans);
      this.priceLists.fillData(data.priceLists);
      this.relativeRelationTypes.fillData(data.relativeRelationTypes);

      this.storeItems.fillData(data.storeItems);
      this.dropDownLists.fillData(data.dropDownLists);
      this.propertyTypes.fillData(data.propertyTypes);
      this.priceQuotationAffiliateOperations.fillData(
        data.priceQuotationAffiliateOperations
      );
      this.quotationPriceHistories.fillData(data.quotationPriceHistories);
      this.priceQuotationJobOrders.fillData(data.priceQuotationJobOrders);

      this.accounts.fillData(data.accounts);
      this.accountTransactions.fillData(data.accountTransactions);
      this.countedServiceTransactions.fillData(data.countedServiceTransactions);
      this.expenses.fillData(data.expenses);
      this.revenues.fillData(data.revenues);
      this.serviceTypes.fillData(data.serviceTypes);
      this.countedServiceTypes.fillData(data.countedServiceTypes);
      this.services.fillData(data.services);
      this.countedServices.fillData(data.countedServices);
      this.newss.fillData(data.newss);
      this.complaints.fillData(data.complaints);
      this.complaints.fillData(data.complaints);
      this.complaintFollowUps.fillData(data.complaintFollowUps);
      this.educationalRatings.fillData(data.educationalRatings);
      this.debts.fillData(data.debts);
      this.installments.fillData(data.installments);
      this.installmentPayments.fillData(data.installmentPayments);
      this.serviceEntitlements.fillData(data.serviceEntitlements);
      this.interests.fillData(data.interests);
      this.interestFollowUps.fillData(data.interestFollowUps);
      this.userInterests.fillData(data.userInterests);
      this.followInterests.fillData(data.followInterests);
      this.userOtherInterests.fillData(data.userOtherInterests);
      this.userSysteamInterests.fillData(data.userSysteamInterests);

      this.notifications.fillData(data.notifications);
      this.reminders.fillData(data.reminders);
      this.educationalGroupStudents.fillData(data.educationalGroupStudents);
      this.educationalGroupEmployees.fillData(data.educationalGroupEmployees);
      this.educationalGroupPlaces.fillData(data.educationalGroupPlaces);
      this.educationalGroupTransfers.fillData(data.educationalGroupTransfers);
      this.classificationDegrees.fillData(data.classificationDegrees);
      this.generalJobs.fillData(data.generalJobs);
      this.personalCardTypes.fillData(data.personalCardTypes);
      this.scientificDegrees.fillData(data.scientificDegrees);
      this.placeUsers.fillData(data.placeUsers);
      this.placeMasterAdmin.fillData(data.placeMasterAdmin);
      this.placeEmployees.fillData(data.placeEmployees);
      this.placeStudents.fillData(data.placeStudents);
      this.placeSuppliers.fillData(data.placeSuppliers);
      this.placeParents.fillData(data.placeParents);
      this.placeClients.fillData(data.placeClients);
      this.placeOthers.fillData(data.placeOthers);
    } else {
      this.setInitialValue();
    }
  }
}
