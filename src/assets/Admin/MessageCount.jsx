import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const MessageCount = () => {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const token = import.meta.env.VITE_GITHUB_TOKEN;
      const repoOwner = import.meta.env.VITE_GITHUB_REPO_OWNER;
      const repoName = import.meta.env.VITE_GITHUB_REPO_NAME;
      const filePath = import.meta.env.VITE_GITHUB_FILE_PATH;

      const githubApiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

      try {
        const response = await fetch(githubApiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const fileData = await response.json();
          const decodedContent = JSON.parse(atob(fileData.content));
          setCount(decodedContent.length);
        } else {
          toast.error("Failed to fetch messages count.");
        }
      } catch (error) {
        toast.error("Error fetching message count: " + error.message);
      }
    };

    fetchMessages();
  }, []);

  if (count === null) return <>Loading...</>;

  return <>{count}</>;
};

export default MessageCount;
