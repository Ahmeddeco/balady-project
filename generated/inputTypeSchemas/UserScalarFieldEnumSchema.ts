import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','emailVerified','image','createdAt','updatedAt','role','banned','banReason','banExpires','personalId','primaryMobile','secondaryMobile','country','state','city','detailedAddress']);

export default UserScalarFieldEnumSchema;
