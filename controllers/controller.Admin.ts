import express from 'express';
import { Admin } from '../interfaces/interfaces'
import { prisma } from '../constants/index';

export const getAllAdmins = async (req: express.Request, res: express.Response) => {
    try {
        const admins = await prisma.admin.findMany();
        if (!admins) return res.status(400).json({ message: 'No admins found' });
        return res.status(200).json({ admins });
    } catch (error) {
        console.log(error);
    }
};

export const getAdminById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const admin = await prisma.admin.findUnique({ where: { id: Number(id) } });
        if (!admin) return res.status(400).json({ message: 'No admin found' });
        return res.status(200).json({ admin });
    } catch (error) {
        console.log(error);
    }
};

async function isValidOrganization(organizationName: string) {
    return prisma.organization.findUnique({ where: { organizationName } });
}

async function isValidVendor(vendorName: string) {
    return prisma.vendor.findUnique({ where: { vendorName } });
}

async function createNewAdmin(adminDetails: Admin, organizationId: number, vendorName: string) {
    return prisma.admin.create({
        data: {
            ...adminDetails,
            organizationId,
            vendorName,
            organization: { connect: { id: organizationId } },
            vendors: { connect: { vendorName } },
        }  as any
    });
}

export async function createAdmin(req: express.Request, res: express.Response) {
    try {
        const adminDetails: Admin = req.body;
        const organization = await isValidOrganization(adminDetails.organizationName);
        const vendor = await isValidVendor(adminDetails.vendorName);

        if (!organization || !vendor) {
            return res.status(400).json({ message: 'Service Request Failed, Admins may only specify known organizations or vendors' });
        }

        const newAdmin = await createNewAdmin(adminDetails, organization.id, vendor.vendorName);
        return res.status(201).json({ newAdmin });

    } catch (error) {
        // Log the error or handle it appropriately
        return res.status(500).json({ message: 'Internal server error' });
    }
}


export const updateAdmin = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const adminDetails: Admin = req.body;
        const updatedAdmin = await prisma.admin.update({
            where: { id: Number(id) },
            data: adminDetails,
        });
        return res.status(200).json({ updatedAdmin });
    } catch (error) {
        console.log(error);
    }
}
