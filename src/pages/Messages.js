import React, { useEffect } from "react";
import { usechatStore } from "../lib/chatStore";
import { useUserStore } from "../lib/userStore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import List from "../components/Chat/list/List";
import Chat from "../components/Chat/chat/Chat";
import Detail from "../components/Chat/detail/Detail";
import { useSelector } from "react-redux";

const Messages = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { user } = useSelector((state) => state.profile);
  console.log("user", user);
  const { chatId } = usechatStore();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, () => {
      fetchUserInfo(user?._id);
    });

    return () => {
      unsub();
    };
  }, [fetchUserInfo]);

  console.log("currentUser", currentUser, chatId);
  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <div className="w-9/12 h-full mx-auto flex items-start justify-center">
      <div className="w-10/12 mx-auto h-full flex flex-1 items-start justify-start bg-[#111928bf] rounded-xl mt-10">
        <List />
        {chatId && <Chat />}
        {chatId && <Detail />}
        {!chatId && (
          <div className="blankDiv">
            <div className="h-[800px] w-max mx-auto flex  items-center justify-center">
              <h1 className="text-white text-4xl text-center">
                Select a chat to start messaging
              </h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
