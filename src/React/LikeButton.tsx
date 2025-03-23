import { useState, useEffect } from "react";
import { collection, doc, onSnapshot, updateDoc, increment, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const LikeButton = () => {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkUserLike = localStorage.getItem("websiteIsLiked");
    setIsLiked(checkUserLike === "true");

    const initializeLikes = async () => {
      try {
        const likeDocRef = doc(db, "likes", "counter");
        const docSnap = await getDoc(likeDocRef);
        
        if (!docSnap.exists()) {
          await setDoc(likeDocRef, { count: 0 });
        }

        // Set up real-time listener
        const unsubscribe = onSnapshot(likeDocRef, (doc) => {
          if (doc.exists()) {
            setLikes(doc.data().count || 0);
          }
        });

        return unsubscribe;
      } catch (error) {
        console.error("Error initializing likes:", error);
      }
    };

    const unsubscribe = initializeLikes();
    return () => {
      if (unsubscribe) {
        unsubscribe.then(unsub => unsub && unsub());
      }
    };
  }, []);

  const handleLike = async () => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);
      const likeDocRef = doc(db, "likes", "counter");

      // Update the like count
      await updateDoc(likeDocRef, {
        count: increment(1)
      });

      // Save to localStorage and update state
      localStorage.setItem("websiteIsLiked", "true");
      setIsLiked(true);
      
      // Trigger animation
      setTriggerAnimation(true);
      setTimeout(() => setTriggerAnimation(false), 300);
    } catch (error) {
      console.error("Error updating likes:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isClient) return null;

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleLike}
        disabled={isProcessing}
        className={`
          group flex items-center gap-2 px-4 py-2 rounded-xl 
          transition-all duration-300 bg-[#1414149c] border
          ${isLiked ? 'border-[var(--sec)]' : 'border-[var(--white-icon-tr)] hover:border-[var(--white)]'}
        `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`
            w-6 h-6 transition-all duration-300 ease-in-out
            ${isLiked ? 'text-[var(--sec)]' : 'text-[var(--white-icon)] group-hover:text-[var(--white)]'}
            ${triggerAnimation ? 'animate-bounce' : ''}
          `}
        >
          <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z" />
        </svg>
        <span className={`
          text-sm transition-colors duration-300
          ${isLiked ? 'text-[var(--sec)]' : 'text-[var(--white-icon)] group-hover:text-[var(--white)]'}
        `}>
          {likes} Likes
        </span>
      </button>
    </div>
  );
};

export default LikeButton;
