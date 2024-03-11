import axios from "axios";

const fetchVolunteerData = async () => {
  try {
    const volunteerdata = await axios.get(
      "http://localhost:9000/api/v1/users/volunteers"
    );
    // console.log(volunteerdata);

    return volunteerdata.data.data;
  } catch (error) {
    console.log(error, "Error getting data");
  }
};
// 6599830f52054fed27171e33

const fetchNearestData = async (latitude, longitude) => {
  try {
    const nearestData = await axios.get(
      `http://localhost:9000/api/v1/users/volunteer/location/${latitude}/${longitude}`
    );
    return nearestData.data;
  } catch (error) {
    console.log(error.message);
  }
};

const fetchDataBySkill = async (skill) => {
  try {
    const skillData = await axios.get(
      `http://localhost:9000/api/v1/users/skillData/?skillName=${skill}`
    );

    return skillData.data;
  } catch (error) {
    console.log(error.message);
  }
};

const fetchOnlyVolunteerData = async () => {
  try {
    const volData = await axios.get(
      `http://localhost:9000/api/v1/users/volunteerDataOnly`
    );
    return volData.data;
  } catch (error) {
    console.log(error.message);
  }
};

const fetchOnlyOpportunityData = async () => {
  try {
    const oppData = await axios.get(
      `http://localhost:9000/api/v1/users/opportunityDataOnly`
    );
    return oppData.data;
  } catch (error) {
    console.log(error.message);
  }
};

const fetchDataByOpportunity = async (opp) => {
  try {
    const OpportunityData = await axios.get(
      `http://localhost:9000/api/v1/users/opportunityData/?oppName=${opp}`
    );

    return OpportunityData.data;
  } catch (error) {
    console.log(error.message);
  }
}; 

const fetchLatestData = async () => {
  try {
    const latestData = await axios.get(
      "http://localhost:9000/api/v1/users/latestData"
    );
    return latestData.data;
  } catch (error) {
    console.log(error.message);
  }
};

const fetchUserData = async (userId) => {
  try {
    console.log(userId);

    const userData = await axios.get(
      `http://localhost:9000/api/v1/users/volunteer/${userId}`
    );

    console.log(userData);
    return userData.data;
  } catch (error) {
    console.log(error, "There was an error fetching user data");
  }
};
  
const fetchPostDetails = async (postId) => {
  try {
    const postData = await axios.get(
      `http://localhost:9000/api/v1/users/volunteer/post/${postId}`
    );

    return postData.data;
  } catch (error) {
    console.log(error, "There was an error fetching post data");
  }
};

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Note: Month is zero-based
  const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
  return `${day}/${month}/${year}`;
}

function formatUpdatedAt(updatedAt) {
  // console.log(updatedAt);

  const updatedAtDate = new Date(updatedAt);
  // console.log(updatedAtDate);

  const now = new Date();
  const diffMilliseconds = now - updatedAtDate;

  const diffMinutes = Math.floor(diffMilliseconds / (1000 * 60));

  // console.log(diffMinutes);

  if (diffMinutes < 1) {
    return "Just now";
  } else if (diffMinutes === 1) {
    return "1 minute ago";
  } else if (diffMinutes < 60) {
    return `${diffMinutes} minutes ago`;
  } else if (diffMinutes < 1440) {
    // Less than 24 hours
    const diffHours = Math.floor(diffMinutes / 60);
    return `${diffHours} hours ago`;
  } else {
    const diffDays = Math.floor(diffMinutes / 1440);
    return `${diffDays} days ago`;
  }
}

const handlePostDelete = async (postId) => {
  try {
    console.log(postId);
    
    const data = await axios.delete(
      `http://localhost:9000/api/v1/users/volunteers/${postId}`
    );
    console.log(data);
    
    return data.data
  } catch (error) {
    console.log(error);
  }
};

export {
  fetchVolunteerData,
  fetchUserData,
  fetchPostDetails,
  formatDate,
  formatUpdatedAt,
  fetchNearestData,
  fetchDataBySkill,
  fetchLatestData,
  fetchDataByOpportunity,
  fetchOnlyOpportunityData,
  fetchOnlyVolunteerData,
  handlePostDelete
};
