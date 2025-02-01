import { UsergroupDeleteOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, MenuProps, Dropdown } from "antd";
import React, { useEffect, useState } from "react";
import { User } from "../App";
import keycloak from "../keycloak";

export interface UserDisplayProps {
  connectedUsers: User[];
  onKick: (user: User) => void;
  onBan: (user: User) => void;
  kickedMessage?: string | undefined;
}

export const UserDisplay: React.FC<UserDisplayProps> = ({
  connectedUsers,
  onKick,
  onBan,
  kickedMessage,
}) => {
  const [list, setList] = useState<User[]>([]);

  useEffect(() => {
    setList(connectedUsers);
  }, [connectedUsers]);

  const items: MenuProps["items"] = [];

  list.map((user: User, i: number) => {
    items.push({
      key: i,
      label: (
        <div key={i} className="flex items-center">
          <div className="mr-8 flex items-center space-x-2">
            <Avatar icon={<UserOutlined />} />
            <span>{user.username}</span>
          </div>
          {String(user.id) === keycloak.tokenParsed?.sub ? (
            <span>(You)</span>
          ) : (
            <div className="ml-auto space-x-2">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onKick(user);
                }}
              >
                Kick
              </Button>
              <Button
                danger
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onBan(user);
                }}
              >
                Ban
              </Button>
            </div>
          )}
        </div>
      ),
    });
  });

  return (
    <Dropdown
      menu={{ items }}
      trigger={["click"]}
      disabled={kickedMessage ? true : false}
    >
      <Button>
        Connected Users / <b>{list.length}</b>
        <UsergroupDeleteOutlined />
      </Button>
    </Dropdown>
  );
};
