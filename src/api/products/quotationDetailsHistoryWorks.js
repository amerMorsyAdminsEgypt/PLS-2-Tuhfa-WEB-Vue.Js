import { METHOD, request } from "./../../utils/request";
import { QuotationDetailsHistoryWorks } from "./../api";

async function getAll(params) {
  return request(QuotationDetailsHistoryWorks.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(QuotationDetailsHistoryWorks.getDetails, METHOD.GET, params);
}

async function moveToWorkProgres(data) {
  return request(
    QuotationDetailsHistoryWorks.moveToWorkProgres,
    METHOD.POST,
    data
  );
}
async function moveToNewlyWanted(data) {
  return request(
    QuotationDetailsHistoryWorks.moveToNewlyWanted,
    METHOD.POST,
    data
  );
}
async function moveToReviewedByCustomer(data) {
  return request(
    QuotationDetailsHistoryWorks.moveToReviewedByCustomer,
    METHOD.POST,
    data
  );
}
async function moveToRejectedByCustomer(data) {
  return request(
    QuotationDetailsHistoryWorks.moveToRejectedByCustomer,
    METHOD.POST,
    data
  );
}
async function moveToWaitingForQuotes(data) {
  return request(
    QuotationDetailsHistoryWorks.moveToWaitingForQuotes,
    METHOD.POST,
    data
  );
}
async function moveToCanceledbyCustomer(data) {
  return request(
    QuotationDetailsHistoryWorks.moveToCanceledbyCustomer,
    METHOD.POST,
    data
  );
}

export default {
  getAll,
  getDetails,
  moveToWorkProgres,
  moveToNewlyWanted,
  moveToReviewedByCustomer,
  moveToRejectedByCustomer,
  moveToWaitingForQuotes,
  moveToCanceledbyCustomer,
};
