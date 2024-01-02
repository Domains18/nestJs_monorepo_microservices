import { authentication, generateRandomString } from "../helpers/validators";
import { createAdmin, getAdminByEmail } from "../controllers/controllers.Admin";
import { Request, Response } from "express";


export async function login(req: Request, res: Response) { 
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({ message: 'Service Request Failed, Login Requires a valid email and password' });
        }
        const admin = await getAdminByEmail(email, res);
        if(!admin) {
            return res.status(404).json({ message: 'Service Request Failed, Emails can only specify known/Registered Admins' });
        }
        const expectedHash = await authentication(password, admin.salt);
        if(admin.password !== expectedHash) {
            return res.status(401).json({ message: 'Service Request Failed, Invalid Password' });
        }
        const salt = generateRandomString();
        admin.sessionToken = authentication(salt as undefined as string, admin.id.toString());
        //FIXME: potential bug
        res.cookie('sessionToken', admin.sessionToken, { domain: 'localhost', path: '/', httpOnly: true, secure: true, sameSite: 'strict' });
        res.status(200).json({ message: 'Login Successful', admin });
    } catch (error) {
        res.sendStatus(500);
        console.log(error);
    }
}
