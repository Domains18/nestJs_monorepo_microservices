import { Request, Response } from "express";
import { prisma } from "../constants";
// import { Organization } from "@prisma/client";
import { Organization } from "../interfaces/interfaces";

export const getOrganizations = async (req: Request, res: Response) => {
  try {
    const organizations = await prisma.organization.findMany();
    res.status(200).json(organizations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export async function getOrganizationById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const organization = await prisma.organization.findUnique({
      where: { id: Number(id) },
    });
    res.status(200).json(organization);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getOrganizationByName(req: Request, res: Response) {
  try {
    const { organizationName } = req.body
    const organization = await prisma.organization.findUnique({
      where: { organizationName },
    });
    res.status(200).json(organization);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createOrganization(organizationDetails: Organization, res: Response) {
  const {
    organizationName,
    description,
    address,
    website,
    email,
    phone,
    
  }: Organization = organizationDetails;
  try {
    const organization = await prisma.organization.create({
      data: {
        organizationName,
        description,
        address,
        website,
        email,
        phone,
      } as any
    });
    organization && res.status(201).json(organization);
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
}

export async function updateOrganization(req: Request, res: Response) {
  const { id } = req.params;
  const {
    organizationName,
    description,
    address,
    website,
    email,
    phone,
    logo,
  }: Organization = req.body;
  try {
    const organization = await prisma.organization.update({
      where: { id: Number(id) },
      data: {
        organizationName,
        description,
        address,
        website,
        email,
        phone,
        logo,
      },
    });
    organization && res.status(200).json(organization);
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
}

export async function deleteOrganization(req: Request, res: Response) {
  const { id } = req.params;
  try {
    await prisma.organization.delete({
      where: { id: Number(id) },
    });
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
}
