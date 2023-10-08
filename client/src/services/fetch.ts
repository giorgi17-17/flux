import axios from "axios";

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

export { getAllExercises, getUserById };
