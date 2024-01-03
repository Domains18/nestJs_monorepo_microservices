/**
 * @functions
 * create/register an organization
 */
import { Organization } from "../interfaces/interfaces";
import { createOrganization, getOrganizationByName } from "../controllers/controllers.organization";
import { Request, Response } from "express";

export const signupOrganization = async (req: Request, res: Response) => {
    const { organization } = req.body;
    try {
        const avoidDuplicate = await getOrganizationByName(organization.organizationName);
    } catch (error) {
        
    }    
};
