import { User } from "./types";

export type messageResponse = {
    message: string;
    success: boolean;
}

export type userResponse = {
    success: boolean;
    user: User;
}