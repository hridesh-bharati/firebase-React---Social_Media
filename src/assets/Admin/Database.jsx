import axios from 'axios';

// Base URL for GitHub API
const API_BASE_URL = 'https://api.github.com/users/hridesh-bharati';

const githubApi = {
  // Fetch all user data (user info, repos, followers, following, etc.)
  getAllUserData: async () => {
    try {
      const [
        userInfo,
        userRepos,
        userFollowers,
        userFollowing,
        userGists,
        userStarredRepos,
        userOrgs,
        userEvents,
        userPackages
      ] = await Promise.all([
        axios.get(API_BASE_URL), // Get user info
        axios.get(`${API_BASE_URL}/repos`), // Get repositories
        axios.get(`${API_BASE_URL}/followers`), // Get followers
        axios.get(`${API_BASE_URL}/following`), // Get following
        axios.get(`${API_BASE_URL}/gists`), // Get gists
        axios.get(`${API_BASE_URL}/starred`), // Get starred repositories
        axios.get(`${API_BASE_URL}/orgs`), // Get organizations
        axios.get(`${API_BASE_URL}/events`), // Get public events
        axios.get(`${API_BASE_URL}/packages`), // Get package data (if available)
      ]);

      // Return all data as an object
      return {
        userInfo: userInfo.data,
        userRepos: userRepos.data,
        userFollowers: userFollowers.data,
        userFollowing: userFollowing.data,
        userGists: userGists.data,
        userStarredRepos: userStarredRepos.data,
        userOrgs: userOrgs.data,
        userEvents: userEvents.data,
        userPackages: userPackages.data,
      };
    } catch (error) {
      console.error('Error fetching all user data:', error);
      throw error;
    }
  },

  // Fetch specific data types
  getUserInfo: async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw error;
    }
  },

  getUserRepos: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/repos`);
      return response.data;
    } catch (error) {
      console.error('Error fetching repositories:', error);
      throw error;
    }
  },

  getUserFollowers: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/followers`);
      return response.data;
    } catch (error) {
      console.error('Error fetching followers:', error);
      throw error;
    }
  },

  getUserFollowing: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/following`);
      return response.data;
    } catch (error) {
      console.error('Error fetching following:', error);
      throw error;
    }
  },

  getUserGists: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/gists`);
      return response.data;
    } catch (error) {
      console.error('Error fetching gists:', error);
      throw error;
    }
  },

  getUserStarredRepos: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/starred`);
      return response.data;
    } catch (error) {
      console.error('Error fetching starred repos:', error);
      throw error;
    }
  },

  getUserOrgs: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/orgs`);
      return response.data;
    } catch (error) {
      console.error('Error fetching organizations:', error);
      throw error;
    }
  },

  getUserEvents: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/events`);
      return response.data;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },

  getUserPackages: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/packages`);
      return response.data;
    } catch (error) {
      console.error('Error fetching packages:', error);
      throw error;
    }
  },
};

export default githubApi;
