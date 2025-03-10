import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: integer('id').primaryKey(),
	username: text('username').unique().notNull(),
	password: text('password').notNull()
});

export const graduate = sqliteTable('graduate', {
	id: integer('id').primaryKey().notNull(),
	fullName: text().notNull().unique(),
	address: text(),
	servesArmy: integer({ mode: 'boolean' }).default(false),
	graduationDate: text().$type<Date>(),
	isDistributed: integer({ mode: 'boolean' }).default(false),
	isRedistributed: integer({ mode: 'boolean' }).default(false),
	isUnemployed: integer({ mode: 'boolean' }).default(false)
});
