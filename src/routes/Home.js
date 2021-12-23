import React, { useEffect, useState } from "react";
import { dbService, storageService } from "fbConfig";
import { collection, onSnapshot, query } from "firebase/firestore";
import Nweet from "components/Nweet";
import { ref, uploadString } from "@firebase/storage";
import { v4 as uuidv4 } from "uuid";

/**
 *  https://firebase.google.com/docs/firestore/query-data/get-data?authuser=0
 */
const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweetList, setNweetList] = useState([]);
  const [attachment, setAttachment] = useState();

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
    const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
    const response = await uploadString(fileRef, attachment, "data_url");
    console.log(response);

    // await addDoc(collection(dbService, "nweet"), {
    //   text: nweet,
    //   createdAt: serverTimestamp(),
    //   creatorId: userObj.uid,
    // });
    // setNweet("");
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const imageFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(imageFile);
  };

  const clearPhoto = () => setAttachment(null);

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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Nweet" />
        {attachment && (
          <div>
            <img src={attachment} width=" 50px" height="50px" />
            <button onClick={clearPhoto}>Clear</button>
          </div>
        )}
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
