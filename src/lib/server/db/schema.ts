import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: integer('id').primaryKey(),
	username: text('username').unique().notNull(),
	password: text('password').notNull()
});

export const graduate = sqliteTable('graduate', {
	id: integer('id').primaryKey(),
	fullName: text().notNull(),
	// address: text().notNull(),
	// phoneNumber: text(),
	// spec: text(),
	// specCode: text(),
	// faculty: text(),
	// formEducation: text(),
	// educationLevel: text(),
	// yearOfGraduation: integer(),
	servesArmy: integer().default(0)

	// // Info about distribution
	// isDistributed: integer(),
	// profiling: text(),
	// companyName: text(),
	// basedNameCompany: text(),
	// requestOfDistribution: text(),
	// requestOfDistributionIP: text(),
	// targetAgreement: text(),
	// olympiadParticipance: text(),
	// arrivalConfirmation: text(),
	// jobTitle: text(),
	// working: integer(),
	// servesArmy: integer(),
	// onMaternityLeave: text(),
	// worked: text(),
	// letterDate: text(),
	// periodOfCompulsoryService: text(),
	// selfCare: text(),
	//
	// // Info about reassignment
	// isReassigned: integer(),
	// newCompanyName: text(),
	//
	// // Info about unemployed state
	// isUnemployed: integer(),
	// distributionRefReturned: text(),
	// companyNotified: text(),
	// notificationDate: text(),
	// paysTutitionFee: text(),
	// notes: text(),
	// consolidation: text()
	// // conscriptionEmployment: text(), TODO: tf is this
});
