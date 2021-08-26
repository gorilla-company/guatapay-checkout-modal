let currentStatus = "STARTED";

function getCurrentStatus() {
  return currentStatus;
}

function getCurrentInternalStatus(status) {
    return getInternalStatus(currentStatus);
  }

function setCurrentStatus(status) {
  currentStatus = status;
}

function getInternalStatus(status) {
  switch (status) {
    case "CREATED":
      return "STARTED";
    case "SCANNED":
      return "PROCESSING";
    case "PROCESSING":
      return "PAYING";
    case "ACCEPTED":
      return "PAYMENT_READY";
    case "REJECTED":
    case "CANCELLED":
    case "ERROR":
      return "PAYMENT_DENIED";
    case "VOIDED":
      return "EXPIRED";
  }
}

export default {
  getCurrentStatus,
  setCurrentStatus,
  getCurrentInternalStatus
};
