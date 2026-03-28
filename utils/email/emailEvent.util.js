import eventEmitter from 'events';
import AppError from '../appError.util.js';
import logger from '../../config/logger.config.js';
import ActivationTemaplate from './templates/activation.template.js';
import resetTemplate from './templates/resetPassword.template.js';
import { sendEmail } from './sendEmail.util.js';

const emailEvent = new eventEmitter();
// Listen for user registration
emailEvent.on('userRegistered', async (user, token) => {
  try {
    const activationLink = `${process.env.BASE_URL}${process.env.PORT}/api/v1/auth/activate/${token}`;
    await sendEmail(
      user.email,
      'Registeration',
      ActivationTemaplate(
        user.firstName,
        activationLink,
        process.env.JWT_ACTIVATE_EXPIRES_IN,
      ),
    );
    logger.info(`activate email sent to: ${user.email}`);
  } catch (err) {
    logger.error(
      `Failed to send activate email to ${user.email}: ${err.message}`,
    );
    return next(new AppError('Failed to send activate email', 500));
  }
});

// Listen for rest password event
emailEvent.on('passwordReset', async (user, token) => {
  try {
    const resetLink = `${process.env.BASE_URL}${process.env.PORT}/api/v1/auth/reset-password/${token}`;
    await sendEmail(
      user.email,
      'Password Reset',
      resetTemplate(user.firstName, token, resetLink),
    );
    logger.info(`Reset password email sent to: ${user.email}`);
  } catch (err) {
    logger.error(
      `Failed to send reset password email to ${user.email}: ${err.message}`,
    );

    throw new AppError(`Failed to send reset password email ${err}`, 500);
  }
});
export default emailEvent;
