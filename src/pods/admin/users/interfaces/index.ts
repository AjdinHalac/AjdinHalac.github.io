export interface IUser {
    uuid: string;
    email: string;
    emailVerified: boolean;
    firstName: string;
    lastName: string;
    profileImage: string;
    gender: number;
    bio: string;
    country: string;
    state: string;
    area: string;
    city: string;
    address: string;
    postCode: string;
    birthDate: Date | string;
    invitedByUserID: number;
    tosAccepted: boolean;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
}

export interface IRole {
    id: number;
    createdAt: Date | string;
    updatedAt: Date | string;
    description: string;
    name: string;
}
