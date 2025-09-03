import React, { useEffect, useState, useRef } from "react";
import { ref, runTransaction, get } from "firebase/database";
import { db } from "../../firebaseConfig";

const VisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState(null);
  const hasIncremented = useRef(false); // Ref to track increment

  useEffect(() => {
    if (hasIncremented.current) return; // Agar already increment ho chuka, toh return

    hasIncremented.current = true; // Mark incremented

    const visitorRef = ref(db, "visitorCount");

    runTransaction(visitorRef, (currentCount) => {
      return (currentCount || 0) + 1;
    })
      .then(() => get(visitorRef))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setVisitorCount(snapshot.val());
        }
      })
      .catch((error) => {
        console.error("Firebase error:", error);
      });
  }, []);

  if (visitorCount === null) return <div className="h-6 small">Loading visitor count...</div>;

  return (
    <>{visitorCount}</>
  );
};

export default VisitorCounter;
