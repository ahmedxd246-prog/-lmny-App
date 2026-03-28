const ActivationTemaplate = (firstName, activationLink, expiryTime) => {
  return `

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Activate Your Account</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #f4f6f8;
        font-family: Arial, Helvetica, sans-serif;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      }
      .header {
        background: #4f46e5;
        color: #ffffff;
        padding: 20px;
        text-align: center;
      }
      .content {
        padding: 30px;
        color: #333333;
        line-height: 1.6;
      }
      .btn {
        display: inline-block;
        margin: 25px 0;
        padding: 14px 28px;
        background: #4f46e5;
        color: #ffffff !important;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
      }
      .footer {
        background: #f4f6f8;
        padding: 15px;
        text-align: center;
        font-size: 12px;
        color: #777777;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Activate Your Account</h1>
      </div>

      <div class="content">
        <h2>Hello ${ firstName },</h2>

        <p>
          Welcome! 🎉 <br />
          Thanks for creating an account with us.
        </p>

        <p>
          Please click the button below to activate your account:
        </p>

        <a href="${ activationLink }" class="btn">Activate Account</a>

        <p>
          This activation link will expire in <strong>${ expiryTime }</strong>.
        </p>

        <p>
          If you did not create this account, you can safely ignore this email.
        </p>

        <p>
          Best regards,<br />
          <strong>Kalmny Team</strong>
        </p>
      </div>

      <div class="footer">
        © {{2026}} {{kalmny}}. All rights reserved.
      </div>
    </div>
  </body>
</html>

`;
};
export default ActivationTemaplate;
