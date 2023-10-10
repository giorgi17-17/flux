import mongoose from "mongoose";

const UsersSchema = mongoose.Schema({
  _id: String,
  email: String,
  formData: Object,
});

const Users = mongoose.model("Users", UsersSchema, "users");
export default Users;
