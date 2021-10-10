import mongoose, { Date } from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

export interface UserDocument extends mongoose.Document{
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
    {
        email: {type: String, required: true, unique: true},
        name: {type: String, required: true},
        password: {type: String, required: true}
    },
    { timestamps: true }
)

userSchema.pre('save', async function(next: Function){
    let user = this as UserDocument;
    
    // only hash the password if it has been modified ( or it's new )
    if(!user.isModified("password")) return next();
    
    // add random salt
    const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'));
    const hash = await bcrypt.hashSync(user.password, salt);

    // Replace the password with the hash
    user.password = hash;
    
    return next();
});

userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
    const user = this as UserDocument;
    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
}

const User =  mongoose.model<UserDocument>("User", userSchema);
export default User;
