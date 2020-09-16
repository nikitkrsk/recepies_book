import passwordHash from "password-hash";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import { User, UserStatus } from "../entity/User";
import { Refresh } from "../entity/Refresh";

export default class AuthController {
  static signin = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).json({ error: "Invalid Credentials" });
      return;
    }
    const passwordsMatch = passwordHash.verify(
      req.body.password,
      user.password
    );

    if (!passwordsMatch) {
      res.status(400).json({ error: "Invalid Credentials" });
      return;
    }
    if (user.verifiedAt === null) {
      res.status(400).json({ error: "Account is Not Verified" });
      return;
    }
    if (user.status === UserStatus.BLOCKED) {
      res.status(400).json({ error: "Your Account is Blocked, Please Contact the Administrator" });
      return;
    }

    const JWTData = {
      userId: user.id,
      role: user.role,
    };

    const token = jwt.sign(JWTData, process.env.JWT_KEY!, { expiresIn: "30s" });

    // Refreshing the token
    const refreshToken = jwt.sign(JWTData, process.env.JWT_KEY!);
    const refreshTokens = getRepository(Refresh);

    const refresh = await refreshTokens.findOne({ email: user.email });
    if (refresh) {
      refresh.refresh_token = refreshToken;
      try {
        refresh.save();
      } catch (e) {
        console.log(e);
      }
    } else {
      let newRefresh = new Refresh();
      newRefresh.refresh_token = refreshToken;
      newRefresh.email = user.email;
      newRefresh.user = user;
      try {
        await refreshTokens.save(newRefresh);
      } catch (e) {
        console.log(e);
      }
    }
    delete user.password;

    res.status(200).json({ user, token, refreshToken });
  };

  static refreshToken = async (req: Request, res: Response) => {
    const postData = req.body;
    const email = postData.email;
    const refreshTokenCheck = await Refresh.findOne({ email });
    if (!refreshTokenCheck) {
      res.status(400).json({ error: "Invalid Credentials" });
      return;
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(400).json({ error: "Invalid Credentials" });
      return;
    }
    if (refreshTokenCheck.refresh_token !== postData.refreshToken) {
      res.status(400).json({ error: "Refresh Token is Incorrect" });
      return;
    }
    if (existingUser.id !== postData.UUID) {
      res.status(400).json({ error: "Invalid Credentials" });
      return;
    }
    const { exp } = jwt_decode(refreshTokenCheck.refresh_token);
    if (Date.now() >= exp * 1000) {
      await Refresh.delete({ email });
      res.status(400).json({ error: "Your Session has Expired" });
      return;
    }
    const JWTData = {
      UUID: postData.UUID,
      email: email,
    };
    const token = jwt.sign(JWTData, process.env.JWT_KEY!, {
      expiresIn: "1m",
    });
    res.status(200).send({ message: "Token was successfully updated", token });
  };
  static signout = async (req: Request, res: Response) => {
    const refreshTokenCheck = await Refresh.delete({ email: req.body.email });
    if (!refreshTokenCheck) {
      res.status(400).json({ error: "Invalid Credentials" });
      return;
    }
    const existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser) {
      res.status(400).json({ error: "Invalid Credentials" });
      return;
    }
    res.status(200).send({ message: "Logged Out" });
  };
}
