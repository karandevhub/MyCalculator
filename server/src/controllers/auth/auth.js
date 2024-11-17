import jwt from "jsonwebtoken";
import { Customer, DeliveryPartner } from "../../models/user.js";

const generateToken = (user) => {
  const accessToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  const refreshToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  return { accessToken, refreshToken };
};

export const loginCustomer = async (req, reply) => {
  console.log("called")
  try {
    const { phone } = req.body;
    let customer = await Customer.findOne({ phone });

    if (!customer) {
      customer = new Customer({
        phone: phone,
        role: "Customer",
        isActivated: true,
      });

      await customer.save();
    }

    const { accessToken, refreshToken } = generateToken(customer);
    return reply.send({
      message: customer ? "Login Successfully" : "user created and logged in",
      accessToken,
      refreshToken,
      customer,
    });
  } catch (error) {
    console.log("customer", error);
    return reply.status(500).send({ message: "An error occurred", error });
  }
};

export const loginDeliveryPartner = async (req, reply) => {
  try {
    const { email, password } = req.body;
    const deliveryPartner = await DeliveryPartner.findOne({ email });

    if (!deliveryPartner) {
      return reply
        .status(404)
        .send({ message: "Delivery partner not found", error });
    }
    const isPasswordMatch = password === deliveryPartner.password;
    if (!isPasswordMatch) {
      return reply.status(401).send({ message: "Invalid password" });
    }
    const { accessToken, refreshToken } = generateToken(deliveryPartner);
    return reply.send({
      message: "Login Successfully",
      accessToken,
      refreshToken,
      deliveryPartner,
    });
  } catch (error) {
    return reply.status(500).send({ message: "An error occurred", error });
  }
};

export const refreshToken = async (req, reply) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return reply.status(401).send({ message: "Refresh token is required" });

  try {
    const decodedToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    let user;

    if (decodedToken.role === "Customer")
      user = await Customer.findById(decodedToken.userId);
    else if (decodedToken.role === "DeliveryPartner")
      user = await DeliveryPartner.findById(decodedToken.userId);
    else return reply.status(403).send({ message: "Invalid refresh token" });

    if (!user)
      return reply.status(403).send({ message: "Invalid refresh token" });

    // Check if the user is activated
    if (!user.isActivated)
      return reply.status(403).send({ message: "Account is not activated" });

    const { accessToken, refreshToken: newRefreshToken } = generateToken(user);
    return reply.send({
      message: "Refresh token successfully generated",
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    return reply.status(403).send({ message: "Invalid refresh token" });
  }
};

export const fetchUser = async (req, reply) => {
  const { userId, role } = req.user;
  try {
    let user;

    if (role === "Customer") user = await Customer.findById(userId);
    else if (role === "DeliveryPartner")
      user = await DeliveryPartner.findById(userId);
    else return reply.status(403).send({ message: "Invalid role" });

    if (!user) return reply.status(403).send({ message: "User not found" });

    return reply
      .status(403)
      .send({ message: "User fetched successfully", user });
  } catch (error) {
    return reply.status(500).send({ message: "An error occurred", error });
  }
};
