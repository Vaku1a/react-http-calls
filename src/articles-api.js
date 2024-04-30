import axios from "axios";

export async function fetchArticlesWithTopic(topic) {
  try {
    const response = await axios.get(
      `https://hn.algolia.com/api/v1/search?query=${topic}`
    );
    return response.data.hits;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
}
