import axios from "axios";
// Define this at the top of your file, or in a types.ts file
type FormDataValue = string | number | boolean | string[];

export type PayloadType = {
  _id?: string | null;
  email: string;
  formData?: Record<string, FormDataValue>;
};

async function getAllExercises(
  limit: number,
  page: number,
  bodyPart: string,
  target: string
) {
  const options = {
    method: "GET",
    url: `http://localhost:5000/api/exercises/`,
    params: { limit, page, bodyPart, target },
    headers: {
      accept: "application/json",
    },
  };

  try {
    const response = await axios.request(options);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    console.log("eeee");

    throw error;
  }
}

async function getUserById(id: string) {
  const options = {
    method: "GET",
    url: `http://localhost:5000/api/users/${id}`,
    params: { id },
    headers: {
      accept: "application/json",
    },
  };

  try {
    const response = await axios.request(options);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    console.log("eeee");

    throw error;
  }
}

// api.js
const registerUser = async (payload: PayloadType) => {
  console.log("reg")
  const response = await fetch("http://localhost:5000/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return response.json();
};

const updateUser = async (payload: PayloadType) => {
  console.log("update")
  const response = await fetch("http://localhost:5000/api/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return response.json();
};

export { getAllExercises, getUserById, updateUser, registerUser };
