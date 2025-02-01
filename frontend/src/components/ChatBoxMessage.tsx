import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { Message } from "../App";

export const ChatBoxMessage: React.FC<Message> = ({
  message,
  created_at,
  user,
  id,
}) => {
  const selfID = -1;

  const checkUser = () => {
    if (id === selfID) return true;

    return false;
  };

  return (
    <div
      className={`max-w-48 my-2 rounded p-2 ${
        checkUser() ? "ml-auto" : ""
      } text-white ${checkUser() ? "bg-blue-400" : "bg-blue-500"}`}
    >
      <div>{message}</div>
      <div className="mt-4 flex items-end">
        <div className="text-sm">{new Date(created_at).toLocaleString()}</div>
        {checkUser() ? (
          <></>
        ) : (
          <div className="flex gap-2 ml-auto">
            <span>{user.username}</span>
            <Avatar size={24} icon={<UserOutlined />} />
          </div>
        )}
      </div>
    </div>
  );
};
