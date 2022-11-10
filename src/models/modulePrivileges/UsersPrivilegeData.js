import { ModulesPrivilege, LoginGeneralFunctions } from "./privilegeTokens";

export default class UsersPrivilegeData {
  initialFunctions = {
    changeActivationType: false,
    viewActive: false,
    viewArchived: false,
    viewBlocked: false,
    view: false,
    viewDialogActive: false,
    viewDialogArchived: false,
    viewDialogBlocked: false,
    viewDialog: false,
    viewReportActive: false,
    viewReportArchived: false,
    viewReportBlocked: false,
    viewReport: false,
    itemAdd: false,
    itemUpdate: false,
    itemActive: false,
    itemArchived: false,
    itemBlocked: false,
    itemDeleteImage: false,
    itemFinaleDelete: false,
    notificationView: false,
    notificationRead: false,
    notificationOpen: false,
    notificationArchive: false,
    notificationAdd: false,
    accountTransactionDeposit: false,
    accountTransactionDropdown: false,
    accountTransactionPayExpenses: false,
    accountTransactionRefundExpenses: false,
    accountTransactionAccrualRevenues: false,
    accountTransactionRefundRevenues: false,
    payExpenses: false,
    refundExpenses: false,
    accrualRevenues: false,
    refundRevenues: false,
    accrualServiceEntitlement: false,
    refundServiceEntitlement: false,
    closeComplaint: false,
    changeApproveApplications: false,
    resetUserloginCode: false,
    resetUserDeviceCode: false,
    // installmentPaymentView: false,
    addPayments: false,
    refundPayments: false,
    view_WorkProgress: false,
    view_WaitingForQuotes: false,
    view_WaitingForCustomerAccept: false,
    view_RejectedQuotesFormCustomer: false,
    view_AcceptQuotesFormCustomer: false,
    view_InJobOrder: false,
    view_FinishJobOrderNotCustomerReceive: false,
    view_FinishJobOrderCustomerReceive: false,
    view_Canceled: false,
    sendPriceQuotationToClient: false,
    resendPriceQuotations: false,
    moveToRejected: false,
    moveToApproved: false,
    moveToCanceled: false,
  };
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.hasPrivilegeData = false;
  }
  fillData(data) {
    if (data.length) {
      this.hasPrivilegeData = true;
      this.setModulePrivilege(data);
    } else {
      this.setInitialModulePrivilegeValue();
    }
  }
  setModulePrivilege(privilegeData) {
    for (const module in ModulesPrivilege) {
      let modulePrivilegeItem = "";
      modulePrivilegeItem = privilegeData.find(
        (element) => element.moduleToken == ModulesPrivilege[module]
      );

      if (modulePrivilegeItem) {
        this[module] = {};
        for (const privilegeFunction in LoginGeneralFunctions) {
          let functionItem = modulePrivilegeItem.modulePrivilegeFuncations.find(
            (func) =>
              func.funcationToken == LoginGeneralFunctions[privilegeFunction]
          );

          if (functionItem) {
            this[module][privilegeFunction] =
              functionItem.funcationPrivilegeStatus;
          }
        }

        if (this[module]) {
          if (
            this[module]["viewActive"] != undefined &&
            this[module]["viewArchived"] != undefined &&
            this[module]["viewBlocked"] != undefined
          ) {
            this[module]["view"] =
              this[module]["viewActive"] ||
              this[module]["viewArchived"] ||
              this[module]["viewBlocked"];
          }

          if (
            this[module]["viewDialogActive"] != undefined &&
            this[module]["viewDialogArchived"] != undefined &&
            this[module]["viewDialogBlocked"] != undefined
          ) {
            this[module]["viewDialog"] =
              this[module]["viewDialogActive"] ||
              this[module]["viewDialogArchived"] ||
              this[module]["viewDialogBlocked"];
          }

          if (
            this[module]["viewReportActive"] != undefined &&
            this[module]["viewReportArchived"] != undefined &&
            this[module]["viewReportBlocked"] != undefined
          ) {
            this[module]["viewReport"] =
              this[module]["viewReportActive"] ||
              this[module]["viewReportArchived"] ||
              this[module]["viewReportBlocked"];
          }

          if (
            this[module]["itemActive"] != undefined &&
            this[module]["itemArchived"] != undefined &&
            this[module]["itemBlocked"] != undefined
          ) {
            this[module]["changeActivationType"] =
              this[module]["itemActive"] ||
              this[module]["itemArchived"] ||
              this[module]["itemBlocked"];
          }
        }
      } else {
        this[module] = this.initialFunctions;
      }
    }
  }

  setInitialModulePrivilegeValue() {
    for (const module in ModulesPrivilege) {
      this[module] = {};
      this[module] = this.initialFunctions;
    }
  }
}
