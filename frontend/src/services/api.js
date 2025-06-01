import axios from "axios";

const BASE_URL = "http://localhost:5000";

const api = {
  createNewAccessCode: (phoneNumber) =>
    axios.post(`${BASE_URL}/CreateNewAccessCode`, { phoneNumber }),

  validateAccessCode: (phoneNumber, accessCode) =>
    axios.post(`${BASE_URL}/ValidateAccessCode`, { phoneNumber, accessCode }).then(res => res.data),

  searchGithubUsers: (q, page = 1, perPage = 10) =>
    axios.get(`https://api.github.com/search/users`, {
      params: { q, page, per_page: perPage }
    }).then(res => res.data),

  findGithubUserProfile: (id) =>
    axios.get(`${BASE_URL}/findGithubUserProfile`, {
      params: { github_user_id: id }
    }).then(res => res.data),


  likeGithubUser: (phoneNumber, github_user_id) =>
    axios.post(`${BASE_URL}/likeGithubUser`, { phone_number: phoneNumber, github_user_id }),

  getUserProfile: (phoneNumber) =>
    axios.get(`${BASE_URL}/getUserProfile`, {
      params: { phone_number: phoneNumber }
    }).then(res => res.data),
};

export default api;
