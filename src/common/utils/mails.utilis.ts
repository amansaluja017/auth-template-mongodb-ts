export function verificationMail(name: string, verificationLink: string) {
  const mailString = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Email Verification</title>
      </head>
      <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">

        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4; padding:20px 0;">
          <tr>
            <td align="center">

              <!-- Container -->
              <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">

                <!-- Header -->
                <tr>
                  <td style="background:#4CAF50; padding:20px; text-align:center; color:#ffffff; font-size:24px; font-weight:bold;">
                    Verify Your Email
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:30px; color:#333333;">

                    <p style="font-size:16px;">Hi <strong>"${name}"</strong>,</p>

                    <p style="font-size:15px; line-height:1.6;">
                      Thanks for signing up! Please confirm your email address by clicking the button below.
                    </p>

                    <!-- Button -->
                    <p style="text-align:center; margin:30px 0;">
                      <a href="${verificationLink}"
                         style="background:#4CAF50; color:#ffffff; padding:12px 25px; text-decoration:none; border-radius:5px; font-size:16px; display:inline-block;">
                        Verify Email
                      </a>
                    </p>

                    <p style="font-size:14px; color:#555;">
                      This link will expire in <strong>15 minutes</strong>.
                    </p>

                    <p style="font-size:14px; color:#555;">
                      If you didn’t create this account, you can safely ignore this email.
                    </p>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background:#f1f1f1; padding:15px; text-align:center; font-size:12px; color:#777;">
                    © 2026 Your App. All rights reserved.
                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>

      </body>
    </html>
    `;

  return mailString;
}

export function forgotPasswordMail(name: string, verificationLink: string) {
  const mailString = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Reset Your Password</title>
      </head>
      <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">

        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4; padding:20px 0;">
          <tr>
            <td align="center">

              <!-- Container -->
              <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">

                <!-- Header -->
                <tr>
                  <td style="background:#ff6b6b; padding:20px; text-align:center; color:#ffffff; font-size:24px; font-weight:bold;">
                    Reset Your Password
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:30px; color:#333333;">

                    <p style="font-size:16px;">Hi <strong>"${name}"</strong>,</p>

                    <p style="font-size:15px; line-height:1.6;">
                      We received a request to reset your password. Click the button below to set a new password.
                    </p>

                    <!-- Button -->
                    <p style="text-align:center; margin:30px 0;">
                      <a href="${verificationLink}"
                         style="background:#ff6b6b; color:#ffffff; padding:12px 25px; text-decoration:none; border-radius:5px; font-size:16px; display:inline-block;">
                        Reset Password
                      </a>
                    </p>

                    <p style="font-size:14px; color:#555;">
                      This link will expire in <strong>15 minutes</strong> for security reasons.
                    </p>

                    <p style="font-size:14px; color:#555;">
                      If you didn’t request a password reset, you can safely ignore this email. Your password will not be changed.
                    </p>

                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="padding:0 30px;">
                    <hr style="border:none; border-top:1px solid #eee;" />
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background:#f9f9f9; padding:20px; text-align:center; font-size:12px; color:#777;">
                    <p style="margin:0;">Need help? Contact our support team.</p>
                    <p style="margin:5px 0 0;">© 2026 Your App. All rights reserved.</p>
                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>

      </body>
    </html>
    `;

  return mailString;
}
