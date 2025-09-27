// MODEL:

/**
 * User Model:
 * _id
 * first name
 * last name
 * email
 * password
 * role: (SUPER ADMIN / ADMIN / USER)
 * address
 * image
 * contact
 * isVerified: boolean (by email)
 * documents: string[]
 * isActive: boolean
 * isDeactivate: boolean
 * company: company name
 * createdAt: DateTime
 * updatedAt: DateTime
 *
 * ## Super admin can able to do anythings.
 */

/**
 * Category Model
 * _id
 * name
 * description
 * isActive: boolean
 * deletedAt: For soft deleted.
 * createdAt: DateTime
 * updatedAt: DateTime
 */

/**
 * Vehicle Model
 * _id
 * name
 * description
 * model
 * specifications
 * isFeatured: boolean
 * images: vehicle images[]
 * plans: vehicle plans[]
 * model
 * isAvailable: boolean
 * category:
 * location
 * rentalTerms:
 * capacity: in tons, and m3.
 * deletedAt: for soft deleted
 * createdAt: DateTime
 * updatedAt: DateTime
 */

/**
 * Vehicle Images:
 * _id
 * image // image url
 * name // for seo
 * vehicle
 * createdAt: DateTime
 * updatedAt: DateTime
 */

/**
 * Vehicle Plan:
 * _id
 * charge: float
 * package: enum (PER_HOUR / PER_DAY / PER WEEK / PER MONTH / PER YEAR / CUSTOM)
 * description
 * user: ADMIN / SUPER_ADMIN
 * createdById: _id (admin id)
 * updatedById: _id (admin id)
 * createdAt: DateTime
 * updatedAt: DateTime
 */

/**
 * Booking
 * _id
 * vehicle : _id // vehicle can not be deleted.
 * user : _id // user can not be deactivated at that time.
 * vehiclePlan: _id
 * charge: extract which package is prefer by user. // vehicle plan can not be changed.
 * status: PENDING / ACCEPTED / REJECTED
 * isPaid: boolean
 * createdByUser: _id // what if user deleted at that case: I think we need to store in json format.
 * updatedByUser: _id // same as created by user case.
 * contractPaper: url (the contract between admin and user)
 * bookingDate: DateTime
 * startDate: DateTime
 * endDate: DateTime
 * totalAmount: calculate based on vehicle plan and duration:
 * paymentMethod: CASH / BANK_TRANSFER / ONLINE
 * company
 * createdAt: DateTime
 * updatedAt: DateTime
 */

/**
 * History Logs
 * _id
 * title (pre-defined templates)
 * userSnapShot (this is the snapshot who did this.)
 * role: ADMIN / USER
 * type: VEHICLE / VEHICLE PLAN / BOOKING
 * method: "CREATED" / "UPDATED" / "DELETED"
 * description: pre defined templates for those.
 * company
 * createdAt: DateTime
 * updatedAt: DateTime
 *
 * ## Logs are non-mutable even deleted.
 */

/**
 * Feedback (Get feedback from users). : In this case, we will integrate the email so the direct email goes to the admin user email.
 * _id
 * title
 * description
 * isResponded: boolean
 * company
 * createdAt: DateTime
 * updatedAt: DateTime
 *
 * ## User can be give feedback by anonymous.
 */

/**
 * Notification Model
 * _id
 * user: ObjectId (ref: User)
 * title: String
 * message: String
 * type: String (BOOKING, PAYMENT, SYSTEM)
 * isRead: Boolean
 * company
 * createdAt: DateTime
 * updatedAt: DateTime
 *
 * ## Remove notification while deleted users or something else.
 */
