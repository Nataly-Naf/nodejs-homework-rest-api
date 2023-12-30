import User from "../models/users.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import "dotenv/config";

const {JWT_SECRET} = process.env

export const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already exists");
    }
    const hashPassword = await bcrypt.hash(password, 10);
 const newUser = await User.create({...req.body, password: hashPassword});
    res.status(201).json({       
          email: newUser.email,
    subscription: newUser.subscription,
      }
      );
};
export const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, "Email or password invalid")
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
     if (!passwordCompare) {
        throw HttpError(401, "Email or password invalid")
    }
    const { _id: id } = user;
    const payload = {
        id
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, {token})
    res.json({ token });


}

const getCurrent = async (req, res) => {
    const { email, subscription } = req.user;
    res.json({
        email, 
        subscription,
    })
}

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" })
    res.json({
        message: 'Logout success'
    })
    
}

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

export default {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateSubscription: ctrlWrapper(updateSubscription)
    
};
