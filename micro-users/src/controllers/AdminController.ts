import passwordHash from "password-hash";
import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { User, UserStatus } from "../entity/User";
import { UserRole } from "../entity/User";
import user from "../routes/user";
import { sendBlockedAccountEmail } from "../helpers/send_email";

export default class AuthController {
  /*
    
    Create Admin User
  
  */
  static create_admin = async (req: Request, res: Response) => {
    const data = req.body;
    // Validation
    const Joi = require("joi");
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(30).alphanum().required(),
      firstName: Joi.string().min(1).max(50).alphanum().required(),
      lastName: Joi.string().min(1).max(50).alphanum().required(),
    });
    try {
      await schema.validateAsync(data);
    } catch (err) {
      res.status(422).json({ error: "Invalid Request Data" });
      return;
    }

    // Save User
    const userRepository = getRepository(User);
    const userExist = await userRepository.findOne({
      email: data.email,
    });
    if (userExist) {
      res.status(400).json({ error: "User With This Email Already Exist" });
      return;
    }
    let user = new User();
    data.password = passwordHash.generate(data.password);
    user = data;
    user.role = UserRole.ADMIN;
    user.subscription = true;
    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(400).json({ error: "Couldn't save user" });
      return;
    }
    delete user.password;
    res.status(200).json(user);
  };

  /*
    
    Promote User to ADMIN
  
  */
  static user_promoted = async (req: Request, res: Response) => {
    // Update User
    const userRepository = getRepository(User);
    const userExist = await userRepository.findOne({
      id: req.params.id,
    });
    if (!userExist) {
      res.status(400).json({
        error: `Could not find any records with id: ${req.params.id}`,
      });
      return;
    }
    userExist.role = UserRole.ADMIN;
    userExist.subscription = true;

    try {
      await userRepository.save(userExist);
    } catch (e) {
      res.status(400).json({ error: "Couldn't save user" });
      return;
    }
    delete userExist.password;
    res.status(200).json(userExist);
  };

  /*
    
    Change user status to blocked or to active
  
  */
  static change_user_status = async (req: Request, res: Response) => {
    // Update User
    const userRepository = getRepository(User);
    const userExist = await userRepository.findOne({
      id: req.params.id,
    });
    if (!userExist) {
      res.status(400).json({
        error: `Could not find any records with id: ${req.params.id}`,
      });
      return;
    }

    userExist.status =
      userExist.status === UserStatus.ACTIVE
        ? UserStatus.BLOCKED
        : UserStatus.ACTIVE;
    if (userExist.status === UserStatus.BLOCKED) {
      await sendBlockedAccountEmail(userExist.email, userExist.firstName);
    }
    try {
      await userRepository.save(userExist);
    } catch (e) {
      res.status(400).json({ error: "Couldn't save user" });
      return;
    }

    delete userExist.password;
    res.status(200).json(userExist);
  };

  /*
    
    Delete User
  
  */
  static delete_user = async (req: Request, res: Response) => {
    // Delete User
    const userRepository = getRepository(User);
    const userExist = await userRepository.findOne({
      id: req.params.id,
    });
    if (!userExist) {
      res.status(400).json({
        error: `Could not find any records with id: ${req.params.id}`,
      });
      return;
    }

    try {
      await userRepository.delete({ id: req.params.id });
    } catch (e) {
      res.status(400).json({ error: "Couldn't save user" });
      return;
    }
    res.status(200).json({ message: "User Was Deleted" });
  };

  /*
    
    Get All Users
  
  */
  static get_all = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    const users = await userRepository.find({ relations: ["personal_data"] });

    if (!users || users == []) {
      return res.status(204).json({ errors: [{ message: "No Records" }] });
    }
    res.status(200).json(users);
  };
}
