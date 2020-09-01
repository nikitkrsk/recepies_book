import passwordHash from "password-hash";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import crypto from "crypto";

import { User } from "../entity/User";
import { sendVerificationEmail } from "../helpers/send_email";
import { EmailToken } from "../entity/EmailToken";
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
    const token = new EmailToken();
    token.email = user.email;
    token.token = crypto.randomBytes(16).toString("hex");
    token.user = user;

    try {
      await userRepository.save(user);
      await token.save();
      await sendVerificationEmail(token, req.headers.host, user.email);
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
      const HOUR = 1000 * 60; /* ms  minute for testing*/
      const anHourAgo = Date.now() - HOUR;

      return date < anHourAgo;
    };
    // Check token
    const emailTokenRepository = getRepository(EmailToken);
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
    res.status(200).json({message: "User Email Was Verified"});
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
    const emailTokenRepository = getRepository(EmailToken);
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
      await sendVerificationEmail(
        tokenExist,
        req.headers.host,
        data.email
      );
    } catch (e) {
      res.status(400).json({ error: "Couldn't save user" });
      return;
    }
    res.status(200).json({ message: "New Email Was Send" });
  };
}
