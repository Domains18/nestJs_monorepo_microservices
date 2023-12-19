import {PrismaClient} from '@prisma/client';
import {values} from "lodash";

const prisma = new PrismaClient();

export const getAdmins = async () => {
    try {
        return await prisma.admin.findMany();
    } catch (err) {
        console.log(err);
        return [];
    }
}

export const getAdminByEmail = async (email: string) => {
    try {
        return await prisma.admin.findUnique({
            where: {
                email: email
            }
        });
    } catch (err) {
        console.log(err);
        return null;
    }
}

export const getAdminById = async (id: number) => {
    try {
        return await prisma.admin.findUnique({
            where: {
                id: id
            }
        });
    } catch (err) {
        console.log(err);
        return null;
    }
}

export const getAdminByToken = async (token: string) => {
    try {
        return await prisma.admin.findUnique({
            where: {
                sessionToken: token
            }
        });
    } catch (err) {
        console.log(err);
        return null;
    }
}

export const createAdmin = async (values: Record<string, any>) => {
    try {
        return await prisma.admin.create({
            data: {
                username: values.username,
                email: values.email,
                password: values.password,
                sessionToken: values.sessionToken,
                salt: values.salt,
            }
        });
    } catch (err) {
        console.log(err);
        return null;
    }
}

export const updateAdmin = async (id: number, values: Record<string, any>) => {
    try {
        return await prisma.admin.update({
            where: {
                id: id
            },
            data: {
                username: values.username,
                email: values.email,
                password: values.password,
                sessionToken: values.sessionToken,
                salt: values.salt,
            }
        });
    } catch (err) {
        console.log(err);
        return null;
    }
}
