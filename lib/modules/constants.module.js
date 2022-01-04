/********************************

  Constants:

********************************/

/**

  the purpose of a otp sms:
    - confirm existing phone number when creating a user
    - confirming existing phone number when updating to a new one
    - confirming the new phone number when updating older one

**/

const typeOTP = Object.freeze({
  LOGIN: "LOGIN", // 0
  CREATE_USER: "CREATE_USER", // 1
  UPDATE_PHONE: "UPDATE_PHONE" // 2
});

// sent : sent to the uses's phone
// confirmed
// pending  : confirmed but waiting to be verified for delete
//  marked to avoid deletion until verified by the service needed
// verified
//

const statusOTP = Object.freeze({
  SENT: "SENT", // 0
  CONFIRMED: "CONFIRMED", // 1
  PENDING: "PENDING", // 2
  VERIFIED: "VERIFIED" // 3
});

module.exports = { ...typeOTP, ...statusOTP, typeOTP, statusOTP };
