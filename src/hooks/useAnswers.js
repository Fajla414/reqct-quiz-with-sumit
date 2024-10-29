import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

const useAnswers = (videoID) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [answer, setAnswer] = useState([]);

  useEffect(() => {
    const fetchAnswers = async () => {
      // database related works
      const db = getDatabase();
      const answerRef = ref(db, "answers/" + videoID + "/questions");
      const answerQuery = query(answerRef, orderByKey());

      try {
        setError(false);
        setLoading(true);
        //request firebase database
        const snapShot = await get(answerQuery);
        setLoading(false);
        if (snapShot.exists()) {
          setAnswer((prevAnswers) => {
            return [...prevAnswers, ...Object.values(snapShot.val())];
          });
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    };
    fetchAnswers();
  }, [videoID]);

  return {
    loading,
    error,
    answers: answer,
  };
};

export default useAnswers;
