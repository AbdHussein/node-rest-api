import { DocumentDefinition, LeanDocument, FilterQuery, UpdateQuery } from 'mongoose';
import config from 'config';
import Session, {SessionDocument} from '../model/session.model';
import { UserDocument } from '../model/user.model';
import { decode, sign } from '../utils/jwt.utils';
import { get } from 'lodash';
import { findUser } from './user.service';

export const createSession = async (user_id: string, userAgent: string) => {
    const session = await Session.create({
        user: user_id,
        userAgent
    });
    return session.toJSON();
} 

export const createAccessToken = async({
    user, 
    session
}: {
    user:
    | Omit<UserDocument, "password">
    | LeanDocument<Omit<UserDocument, "password">>;
  session:
    | Omit<SessionDocument, "password">
    | LeanDocument<Omit<SessionDocument, "password">>;
}) => {
    const accessToken = sign(
        {...user, session: session._id},
        {expiresIn: config.get('accessTokenTtl')}
        );
    return accessToken;
}

export const reIssueAccessToken = async (
    { refreshToken }: { refreshToken: string }) => {
    //Decode the refresh token
    const { decoded } = decode(refreshToken);
    if (!decoded || !get(decoded, '_id')) return false;

    // Get the session
    const session = await Session.findById(get(decoded, '_id'));

    // Make sure session is still valid
    if(!session || !session.valid) return false;

    //@ts-ignore
    const user = await findUser({_id: session.user});

    if(!user) return false;

    const accessToken = createAccessToken({user, session});
    return accessToken;
}

export const updateSession = async(
    query: FilterQuery<SessionDocument>,
    update: UpdateQuery<SessionDocument>
) => {
    return Session.updateOne(query, update);
}

export const findSessions = async( query: FilterQuery<SessionDocument>) => {
    return Session.find(query).lean();
}