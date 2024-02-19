import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;
  //validate:
  if (!name) {
    //   return res
    //     .status(400)
    //     .send({ success: false, message: "please provide name " });
    //instead we will use next();:-
    next("name is required");
  }
  if (!email) {
    next("email is required");
  }
  if (!password) {
    next(" greater than 6 character password is required");
  }

  // const existingUser = await userModel.findOne({ email });
  // if (existingUser) {

  //   next("Email Already Registered Please Login");
  // }

  const user = await userModel.create({ name, email, password });
  //creating token:-
  const token = user.createJWT();
  res.status(201).send({
    success: true,
    message: "user created successfully",
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
    },
    token,
  });
};
export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  //validation:-
  if (!email || !password) {
    next("Please Provide All Fields");
  }
  //find user by email:-
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    next("Invalid Username Or Password ");
  }
  //compare password:-
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    next("Invalid Username Or Password");
  }
  user.password = undefined;
  const token = user.createJWT();
  res.status(200).json({
    success: true,
    message: "loged in successfully",
    user,
    token,
  });
};
