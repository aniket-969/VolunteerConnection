import axios from "axios";

const fetchUserDetails = async (userId) => {
  try {
    const userData = await axios.get(
      `http://localhost:9000/api/v1/users/user?userId=${userId}`
    );

    console.log(userData);
    return userData.data;
  } catch (error) {
    console.log(error);
      return error.response.status
  }
};

const refresh = async (userId) => {
  console.log('This is userId',userId);
  
  const response = await axios.post(
    "http://localhost:9000/api/v1/users/refreshTokens",
    { userId }
  );

  console.log("New token:", response.data.data);
  return response.data.data.accessToken
};

const isTokenExpired = (expirationTime)=>{
    const currentTime = Math.floor(Date.now() / 1000); 
    return expirationTime <= currentTime;
}

export { fetchUserDetails,refresh ,isTokenExpired};
