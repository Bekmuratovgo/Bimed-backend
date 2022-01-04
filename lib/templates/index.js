/**********************************************
  templates
***********************************************/

const htmlemailutcarrequest = data => {
  const { name, phone, license } = data;
  return `<!DOCTYPE html>
  <html lang="en" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title>upgrade to a commercial account request</title>
      <style media="screen">
        .info {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          padding: 50px;
          flex-direction: column;
          font-family: sans-serif;
        }
        .info-wrapper {
          padding: 5px 0;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        }

        .info-tag {
          color: #1987fc;
        }

        .info-value {}
      </style>
    </head>
    <body>
      <h1>upgrade to a commercial account request</h1>

      <div class="info">
        <div class="info-wrapper">
          <span class="info-tag">NAME:</span>
          <p class="info-value">${name}</p>
        </div>
        <div class="info-wrapper">
          <span class="info-tag">PHONE NUMBER:</span>
          <p class="info-value">${phone}</p>
        </div>
        <div class="info-wrapper">
          <span class="info-tag">LICENSE:</span>
          <p class="info-value">${license}</p>
        </div>
      </div>

    </body>
  </html>`;
};

const htmlemailutcarnotification = data => {
  return `<!DOCTYPE html>
  <html lang="en" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title>upgrade to a commercial account request</title>
      <style media="screen">
        .msg-wrapper {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          padding: 50px;
          font-family: sans-serif;
        }
      </style>
    </head>

    <body>

      <div class="msg-wrapper">
        <p>Thank you for requesting an upgrade to a commercial account!</p>
        <p>Your request has been received.</p>
        <p>We will get back to you as soon as we review and process your request.</p>
      </div>
    </body>
  </html>`;
};

module.exports = {
  html: {
    email: {
      utcar: {
        request: htmlemailutcarrequest,
        notification: htmlemailutcarnotification
      }
    }
  }
};
