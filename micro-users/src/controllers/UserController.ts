import passwordHash from "password-hash";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import crypto from "crypto";

import { User } from "../entity/User";
import { sendVerificationEmail } from "../helpers/send_email";
import { EmailVerifyToken } from "../entity/EmailVerifyToken";
import { PersonalData } from "../entity/PersonalData";
export default class AuthController {
  /*
    
    Create User
  
  */
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
      subscription: Joi.boolean().required(),
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
    // Create a verification token for this user
    const token = new EmailVerifyToken();
    token.email = user.email;
    token.token = crypto.randomBytes(16).toString("hex");
    token.user = user;

    try {
      await sendVerificationEmail(token, req.headers.host, user.email);
      await userRepository.save(user);
      await token.save();
    } catch (e) {
      res.status(400).json({ error: "Couldn't save user" });
      return;
    }
    delete user.password;

    res.status(200).json(user);
    return;
  };

  /*
    
    Email Validation
  
  */
  static email_validation = async (req: Request, res: Response) => {
    const lessThanOneHourAgo = (date) => {
      const HOUR = 1000 * 60 * 60; /* ms */
      const anHourAgo = Date.now() - HOUR;

      return date < anHourAgo;
    };
    // Check token
    const emailTokenRepository = getRepository(EmailVerifyToken);
    const tokenExist = await emailTokenRepository.findOne({
      token: req.params.token,
    });
    if (!tokenExist) {
      res.status(400).json({
        error: `Your Email is Not Registered`,
      });
      return;
    }
    if (lessThanOneHourAgo(tokenExist.updatedAt)) {
      res.status(400).json({ error: "Token Has Expired" });
      return;
    }
    const userRepository = getRepository(User);
    const userExist = await userRepository.findOne({
      email: tokenExist.email,
    });
    if (!userExist) {
      res.status(400).json({
        error: `Could not find any records with id: ${req.params.id}`,
      });
      return;
    }
    if (userExist.verifiedAt !== null) {
      res.status(400).json({
        error: `User Already Verified`,
      });
      return;
    }
    userExist.verifiedAt = new Date();
    try {
      await userRepository.save(userExist);
    } catch (e) {
      res.status(400).json({ error: "Couldn't save user" });
      return;
    }
    delete userExist.password;
    res.status(200).json({ message: "User Email Was Verified" });
  };

  /*
    
    Resend Email Validation
  
  */
  static resend_email = async (req: Request, res: Response) => {
    const data = req.body;
    const Joi = require("joi");
    // Fields which can be used in request
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
    });
    try {
      await schema.validateAsync(data);
    } catch (err) {
      res.status(422).json({ error: "Invalid Request Data" });
      return;
    }
    const userRepository = getRepository(User);
    const userExist = await userRepository.findOne({
      email: data.email,
    });
    if (!userExist) {
      res.status(400).json({
        error: `Could not find any records with email: ${data.email}`,
      });
      return;
    }
    if (userExist.verifiedAt !== null) {
      res.status(400).json({
        error: `User Already Verified`,
      });
      return;
    }
    const emailTokenRepository = getRepository(EmailVerifyToken);
    const tokenExist = await emailTokenRepository.findOne({
      email: data.email,
    });
    if (!tokenExist) {
      res.status(400).json({
        error: `Your Email is Not Registered`,
      });
      return;
    }
    tokenExist.token = crypto.randomBytes(16).toString("hex");
    try {
      await emailTokenRepository.save(tokenExist);
      await sendVerificationEmail(tokenExist, req.headers.host, data.email);
    } catch (e) {
      res.status(400).json({ error: "Couldn't save user" });
      return;
    }
    res.status(200).json({ message: "New Email Was Send" });
  };

  /*
    
    Update User
  
  */
  static updateUser = async (req: Request, res: Response) => {
    const data = req.body;

    // Validation
    const Joi = require("joi");
    const schema = Joi.object().keys({
      email: Joi.string().email(),
      password: Joi.string().min(6).max(30).alphanum(),
      firstName: Joi.string().min(1).max(50).alphanum(),
      lastName: Joi.string().min(1).max(50).alphanum(),
      subscription: Joi.boolean(),
      personal_data: Joi.object().keys({
        profile_picture: Joi.string().max(200),
        about_me: Joi.string().max(250),
        education: Joi.string().max(250),
        country: Joi.string().max(50),
        experience: Joi.string().max(250),
        gender: Joi.string().max(15),
        age: Joi.number(),
        instagram_link: Joi.string().max(200),
        facebook_link: Joi.string().max(200),
      })
    });
    try {
      await schema.validateAsync(data);
    } catch (err) {
      res.status(422).json({ error: "Invalid Request Data" });
      return;
    }

    const userRepository = getRepository(User);

    if (data.password) {
      const hashedPass = passwordHash.generate(data.password);
      data.password = hashedPass;
    }

    let user = await userRepository.findOne({ id: req.params.id });
    if (!user) {
      res.status(422).json({ error: "Invalid Request Data" });
      return;
    }


    // Update Personal Data
    if (data.personal_data !== null && data.personal_data !== undefined) {
      const userDetailsRepository = getRepository(PersonalData);
      let userDetails = await userDetailsRepository.findOne({ user: user });
      userDetails = { ...userDetails, ...req.body.personal_data, user };
      try {
        await userDetailsRepository.save(userDetails);
      } catch (e) {
        res.status(400).json({ error: "Couldn't save user" });
        return;
      }
    }


    user = { ...user, ...req.body };

    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(400).json({ error: "Couldn't save user" });
      return;
    }

    res.status(200).json(user);
  };

  /*
    
    Get User By Id
  
  */
  static getUserByID = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);

    let user = await userRepository.findOne({ id: req.params.id }, {relations: ["personal_data"]});
    if (!user) {
      res.status(422).json({ error: "Invalid Request Data" });
    }
    res.status(200).json(user);
  };

  /*
    
    Get User By Email
  
  */
  static getUserByEmail = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);

    let user = await userRepository.findOne({ email: req.params.email }, {relations: ["personal_data"]});
    if (!user) {
      res.status(422).json({ error: "Invalid Request Data" });
    }
    res.status(200).json(user);
  };
}
