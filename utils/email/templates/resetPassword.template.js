const resetTemplate = (userName, resetToken, resetLink) => {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Password</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    h2 {
      color: #333333;
    }
    p {
      color: #555555;
      line-height: 1.5;
    }
    .token {
      display: inline-block;
      background-color: #f0f0f0;
      padding: 10px 20px;
      font-size: 18px;
      font-weight: bold;
      letter-spacing: 1px;
      border-radius: 5px;
      margin: 20px 0;
      color: #333333;
    }
    .footer {
      font-size: 12px;
      color: #999999;
      margin-top: 30px;
      text-align: center;
    }
    a.button {
      display: inline-block;
      text-decoration: none;
      background-color: #007BFF;
      color: white;
      padding: 12px 25px;
      border-radius: 5px;
      margin-top: 15px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Password Reset Request</h2>
    <p>Hello ${userName},</p>
    <p>We received a request to reset your password. Use the token below to reset it. The token is valid for <strong>10 minutes</strong> only.</p>
    
    <div class="token">${resetToken}</div>

    <p>If you did not request a password reset, please ignore this email. Your account is safe.</p>

    <!-- Optional: button to reset password page -->
    <a href="${resetLink}" class="button">Reset Password</a>

    <div class="footer">
      &copy; 2026 KALMNY APP. All rights reserved.
    </div>
  </div>
</body>
</html>
`;
};

export default resetTemplate;
