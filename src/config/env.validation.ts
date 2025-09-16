// import { z } from 'zod';
// import * as process from 'process';

// export const EnvSchema = z.object({
//   DATABASE_URL: z.string({
//     error: 'Invalid database connection string (DATABASE_URL)',
//   }),

//   JWT_ACCESS_EXPIRES_IN: z.string({
//     error: 'JWT access token expiration time is required',
//   }),

//   JWT_REFRESH_EXPIRES_IN: z.string({
//     error: 'JWT refresh token expiration time is required',
//   }),

//   JWT_SECRET: z.string().min(1, 'JWT access secret is required'),
// });

// //
// export type EnvVariables = z.infer<typeof EnvSchema>;
// export const envConfig: EnvVariables = EnvSchema.parse(process.env);
