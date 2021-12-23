import React, { useEffect, useState } from "react";
import { dbService } from "fbConfig";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
} from "firebase/firestore";
import Nweet from "components/Nweet";

/**
 *  https://firebase.google.com/docs/firestore/query-data/get-data?authuser=0
 */
const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweetList, setNweetList] = useState([]);

  // const getNweetList = async () => {
  //   const querySnapshot = await getDocs(collection(dbService, "nweet"));
  //   querySnapshot.forEach((document) => {
  //     const nweetObj = {
  //       ...document.data(),
  //       id: document.id,
  //     };
  //     setNweetList((prev) => [nweetObj, ...prev]);
  //   });
  // };

  useEffect(() => {
    // getNweetList();
    const q = query(collection(dbService, "nweet"));
    onSnapshot(q, (snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweetList(nweetArray);
    });
  }, []);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, "nweet"), {
      text: nweet,
      createdAt: serverTimestamp(),
      creatorId: userObj.uid,
    });
    setNweet("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweetList.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
          // <div key={nweet.id}>
          //   <h4>{nweet.text}</h4>
          // </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
