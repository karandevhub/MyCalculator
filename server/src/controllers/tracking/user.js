import { Customer, DeliveryPartner } from "../../models/user.js";

export const updateUser = async (req, reply) => {
  const { userId } = req.user;
  const updateData = req.body;
  try {
    let user =
      (await Customer.findById(userId)) ||
      (await DeliveryPartner.findById(userId));

    if (!user) return reply.status(404).send({ message: "User not found" });

    let userModel;

    if (user.role === "Customer") {
      userModel = Customer;
    } else if (user.role === "DeliveryPartner") {
      userModel = DeliveryPartner;
    } else {
      return reply.status(403).send({ message: "Invalid user role" });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updateUser) {
      return reply.status(400).send({ message: "user not found" });
    }

    return reply.send({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return reply.status(500).send({ message: "failed to update user", error });
  }
};
