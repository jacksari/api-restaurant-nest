import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum UserRoles {
    ADMIN = 'ADMIN_ROLE',
    USER  = 'USER_ROLE'
}

@Schema()
export class User extends Document{
    @Prop()
    name: string;

    @Prop({ unique: [true, 'El email debe ser único'] })
    email: string;

    @Prop({ select: false })
    password: string;

    @Prop({
        enum: UserRoles,
        default: UserRoles.USER
    })
    role: UserRoles
}

export const UserSchema = SchemaFactory.createForClass(User);