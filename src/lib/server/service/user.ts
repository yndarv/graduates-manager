import { JWT_ACCESS_SECRET } from '$env/static/private';
import { db } from '$lib/server/db/index';
import { user as userTable } from '$lib/server/db/schema';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';

export async function createUser(username: string, password: string): Promise<{ token: string }> {
	try {
		const hashedPassword = await bcrypt.hash(password, 12);

		const existingUsers = await db
			.select({
				id: userTable.id
			})
			.from(userTable)
			.where(eq(userTable.username, username));

		if (existingUsers.length > 0) {
			throw new UserExistsError(username);
		}

		const [insertedUser] = await db
			.insert(userTable)
			.values({
				username,
				password: hashedPassword
			})
			.returning();

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password: _, ...userWithoutPassword } = insertedUser;

		const token = createJWT(userWithoutPassword);

		return { token };
	} catch (error) {
		console.error('error creating user:', error);
		throw error;
	}
}

export async function loginUser(username: string, password: string): Promise<{ token: string }> {
	try {
		const [user] = await db
			.select({
				id: userTable.id,
				username: userTable.username,
				password: userTable.password
			})
			.from(userTable)
			.where(eq(userTable.username, username));

		if (!user) {
			throw new InvalidUserCredentialsError(`Пользователь с именем ${username} не найден`);
		}

		const isValid = await bcrypt.compare(password, user.password);

		if (!isValid) {
			throw new InvalidUserCredentialsError('Неверный пароль');
		}

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password: _, ...userWithoutPassword } = user;

		const token = createJWT(userWithoutPassword);
		return { token };
	} catch (error) {
		console.error('Login error:', error);
		throw error;
	}
}

// Verify, parse and return user info from jwt string.
// If token is not valid or such user does not exists - return null
export async function authenticateUser(token: string | undefined): Promise<UserWithoutPassword> {
	if (!token) {
		throw new Error('no token provided');
	}

	try {
		const decoded = jwt.verify(token, JWT_ACCESS_SECRET) as { id: number } | undefined;
		if (!decoded?.id) throw new Error('Invalid payload');

		const [user] = await db
			.select({
				id: userTable.id,
				username: userTable.username
			})
			.from(userTable)
			.where(eq(userTable.id, decoded.id));

		if (!user) {
			throw new Error('User not found');
		}

		return user;
	} catch (error) {
		console.error('authenticateUser:', error);
		throw error;
	}
}

interface UserWithoutPassword {
	id: number;
	username: string;
}

export class UserExistsError extends Error {
	constructor(username: string) {
		super(`Пользователь с именем ${username} уже существует`);
		this.name = 'UserExistsError';
	}
}

export class InvalidUserCredentialsError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'InvalidUserCredentialsError';
	}
}

function createJWT(user: UserWithoutPassword): string {
	return jwt.sign({ id: user.id, username: user.username }, JWT_ACCESS_SECRET, {
		expiresIn: '1d'
	});
}
