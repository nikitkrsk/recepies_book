import passwordHash from "password-hash";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import "express-async-errors";
import { User, UserStatus } from "../entity/User";
import { UserRole } from "../entity/User";

export default class AuthController {
  //
  //   Create User
  //
  //
  static signup = async (req: Request, res: Response) => {
    const data = req.body;

    // Validation
    const Joi = require("joi");
    // Fields which can be used in request
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
    user = data;
    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(400).json({ error: "Couldn't save user" });
      return;
    }

    res.status(200).json(user);
  };

  //
  //   Create Admin User
  //
  //
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
    user = data;
    user.role = UserRole.ADMIN;
    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(400).json({ error: "Couldn't save user" });
      return;
    }

    res.status(200).json(user);
  };

  //
  //   Promote User to ADMIN
  //
  //
  static user_promoted = async (req: Request, res: Response) => {
    const data = req.body;

    // Update User
    const userRepository = getRepository(User);
    const userExist = await userRepository.findOne({
      id: req.params.id,
    });
    if (!userExist) {
      res.status(400).json({ error: `Could not find any records with id: ${req.params.uuid}` });
      return;
    }
    userExist.role = UserRole.ADMIN;
    try {
      await userRepository.save(userExist);
    } catch (e) {
      res.status(400).json({ error: "Couldn't save user" });
      return;
    }

    res.status(200).json(userExist);
  };

  //
  //   Promote User to ADMIN
  //
  //
  static change_user_status = async (req: Request, res: Response) => {
    const data = req.body;

    // Update User
    const userRepository = getRepository(User);
    const userExist = await userRepository.findOne({
      id: req.params.id,
    });
    if (!userExist) {
      res.status(400).json({ error: `Could not find any records with id: ${req.params.uuid}` });
      return;
    }
    userExist.status = userExist.status === UserStatus.ACTIVE ? UserStatus.BLOCKED : UserStatus.ACTIVE;
    try {
      await userRepository.save(userExist);
    } catch (e) {
      res.status(400).json({ error: "Couldn't save user" });
      return;
    }

    res.status(200).json(userExist);
  };

  //
  //   Get All Users
  //
  //
  static get_all = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    const users = await userRepository.find({
      select: ["id", "email", "createdAt"], //the fields to be seen in the reponse
    });

    if (!users || users == []) {
      return res.status(204).json({ errors: [{ message: "No Records" }] });
    }
    res.status(200).json(users);
  };
}
