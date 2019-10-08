import models from '../database/models';
// import * as services from '../services';
import {
	status,
	messages,
	hashPassword,
	generateToken,
	successResponse,
	errorResponse,
	conflictResponse,
	Jwt,
	bcrypt,
	getCallbackUrls
} from '../utils';

const { baseUrl } = getCallbackUrls;

/**
 * @class UserController
 * @description Controllers for Users
 * @exports UsersController
 */
export default class UsersController {
	/**
	 * @method registerUser
	 * @description Method for user registration
	 * @param {object} req - The Request Object
	 * @param {object} res - The Response Object
	 * @returns {object} response body object
	 */
	static async registerUser(req, res) {
		console.log('arrived');
		try {
			const { email, password, firstName, lastName } = req.body;
			const userExits = await models.Users.findOne({ where: { email } });
			if (userExits) {
				return conflictResponse(res, status.conflict, messages.signUp.conflict);
			}

			const hashedPassword = await hashPassword(password);
			const newUser = { email, password: hashedPassword, lastName, firstName };
			const user = await models.Users.create(newUser);
			const response = user.toJSON();
			delete response.password;
			const { id: userId } = user;
			const token = await generateToken({ userId });
			const url = `${baseUrl}/users/confirmAccount?token=${token}`;
			// await services.sendEmail(email, 'confirmAccount', { firstName, url });
			return successResponse(res, status.created, messages.signUp.success, { ...response, url }, token);
		} catch (error) {
			console.log(error);
			return errorResponse(res, status.error, messages.signUp.error);
		}
	}

	/**
	 * @method signInUser
	 * @description Method for user sign in
	 * @param {object} req - The Request Object
	 * @param {object} res - The Response Object
	 * @returns {object} response body object
	 */
	static async signInUser(req, res) {
		try {
			const { email, password } = req.body;
			const user = await models.Users.findOne({ where: { email } });
			if (!user) {
				return errorResponse(res, status.unauthorized, messages.signIn.invalid);
			}
			const { firstName, lastName, isVerified, id: userId } = user;

			if (!isVerified) {
				return errorResponse(res, status.unauthorized, messages.signIn.unverified);
			}
			const isPasswordValid = await bcrypt.comparePassword(user.password, password);

			if (!isPasswordValid) {
				return errorResponse(res, status.unauthorized, messages.signIn.invalid);
			}

			const response = {
				firstName,
				lastName
			};
			const token = await Jwt.generateToken({ userId });
			return successResponse(res, status.success, messages.signIn.success, response, token);
		} catch (error) {
			return errorResponse(res, status.error, messages.signIn.error);
		}
	}

	/**
	 * @method confirmUser
	 * @description Method for account confirmation
	 * @param {object} req - The Request Object
	 * @param {object} res - The Response Object
	 * @returns {object} response body object
	 */
	static async confirmUser(req, res) {
		const { token } = req.query;
		try {
			const { userId } = await Jwt.verifyToken(token);
			const userData = await models.Users.update(
				{ isVerified: true },
				{
					where: { id: userId }
				}
			);
			if (userData) {
				return successResponse(res, 200, 'Verification successful. login to update your profile');
			}
		} catch (error) {
			errorResponse(res, 403, 'Account confirmation link Invalid');
		}
	}
}
