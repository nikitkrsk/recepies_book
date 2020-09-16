import { Request, Response } from "express";
import crypto from "crypto";
import passwordHash from "password-hash";
import { getRepository } from "typeorm";

import { User } from "../entity/User";
import { EmailResetPassToken } from "../entity/EmailResetPassToken";
import { sendResetPasswordEmail } from "../helpers/send_email";
import { PasswordChangedLog } from "../entity/PasswordChangedLog";

class ResetPassController {
  /*
    
    Send Forgot Password Email
  
  */
  static forgot_password = async (req: Request, res: Response) => {
    const data = req.body;
    // Validation
    const Joi = require("joi");
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

    let user = await userRepository.findOne(
      { email: data.email },
      { relations: ["email_sended"] }
    );
    if (!user) {
      res.status(422).json({ error: "Invalid Request Data" });
    }

    if (user.email_sended === null) {
      // Create a verification token for this user
      const token = new EmailResetPassToken();
      token.email = data.email;
      token.token = crypto.randomBytes(16).toString("hex");
      token.user = user;
      try {
        await token.save();
        await sendResetPasswordEmail(token, req.headers.host, data.email);
      } catch (e) {
        res.status(400).json({ error: "Couldn't Send Email" });
        return;
      }
    } else {
      const emailTokenRepository = getRepository(EmailResetPassToken);
      const resetToken = await emailTokenRepository.findOne({
        email: user.email,
      });
      resetToken.token_used = false;
      resetToken.token = crypto.randomBytes(16).toString("hex");
      try {
        await resetToken.save();
        await sendResetPasswordEmail(resetToken, req.headers.host, data.email);
      } catch (e) {
        res.status(400).json({ error: "Couldn't Send Email" });
        return;
      }
    }

    res.status(200).json({ message: `Email was send to ${data.email}` });
    return;
  };

  /*
    
    Reset Password
  
  */
  static reset_password = async (req: Request, res: Response) => {
    const data = req.body;

    // Validation
    const Joi = require("joi");
    const schema = Joi.object().keys({
      password: Joi.string().min(6).max(30).alphanum().required(),
    });
    try {
      await schema.validateAsync(data);
    } catch (err) {
      res.status(422).json({ error: "Invalid Request Data" });
      return;
    }

    const moreThanOneHourAgo = (date) => {
      const HOUR = 1000 * 60 * 60; /* ms */
      const anHourAgo = Date.now() - HOUR;
      return date < anHourAgo;
    };

    // Check token
    const emailTokenRepository = getRepository(EmailResetPassToken);
    const tokenExist = await emailTokenRepository.findOne({
      token: req.params.token,
    });
    if (!tokenExist) {
      res.status(400).json({ error: "Something Went Wrong. Please Try Again" });
      return;
    }
    if (tokenExist.token_used) {
      res.status(400).json({ error: "Token Has Expired" });
      return;
    }
    if (moreThanOneHourAgo(tokenExist.updatedAt)) {
      res.status(400).json({ error: "Token Has Expired" });
      return;
    }
    // Update Password
    const userRepository = getRepository(User);
    const userExist = await userRepository.findOne({
      email: tokenExist.email,
    });
    if (!userExist) {
      res
        .status(400)
        .json({
          error: `Could not find any records with email: ${tokenExist.email}`,
        });
      return;
    }
    userExist.password = passwordHash.generate(data.password);
    tokenExist.token_used = true;
    const changePassRepo = getRepository(PasswordChangedLog);
    let changePass = new PasswordChangedLog();
    changePass.email = tokenExist.email;
    changePass.record = tokenExist;
    try {
      await changePassRepo.save(changePass);
      await userRepository.save(userExist);
      await emailTokenRepository.save(tokenExist);
    } catch (e) {
      res.status(400).json({ error: `Couldn't update the user` });
      return;
    }

    res.status(200).json({ message: "Password was successfully updated" });
  };

  /*
    
    Get All Records of Password Changes
  
  */
  static get_all_reset_password = async (req: Request, res: Response) => {
    const emailTokenRepository = getRepository(EmailResetPassToken);
    const usersChanges = await emailTokenRepository.find({
      relations: ["entries"],
    });
    res.status(200).json({ usersChanges });
  };
}

export default ResetPassController;
