import { LoginOutlined, UserOutlined } from "@ant-design/icons";
import { useKeycloak } from "@react-keycloak/web";
import { Avatar, Button, Dropdown, MenuProps, Modal } from "antd";
import { useState } from "react";

export const Header = () => {
  const { keycloak, initialized } = useKeycloak();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    keycloak.logout();
    handleOk();
  };

  const items: MenuProps["items"] = [
    {
      type: "divider",
    },
    {
      label: (
        <div className="flex items-center gap-2" onClick={showModal}>
          <LoginOutlined className="text-red-500" />
          <span className="text-red-500 font-bold">Logout</span>
        </div>
      ),
      key: "0",
    },
  ];


  return (
    <>
      <div className="w-full h-16 bg-slate-500 shadow-md text-white flex items-center justify-center">
        <div className="mr-auto px-5 flex items-center gap-3">
          <div>
            <h1 className="text-xl">Chat App</h1>
          </div>
          <div className="text-sm text-gray-300">
            <span>M321</span>
          </div>
        </div>

        <Dropdown menu={{ items }} trigger={["click"]}>
          <div className="h-full cursor-pointer hover:bg-slate-600 duration-200 select-none">
            <div className="h-full px-5 flex items-center gap-3 ml-auto">
              <div className="flex flex-col items-end">
                <span>
                  {keycloak.tokenParsed?.preferred_username || "Unknown User"}
                </span>
                <span className="text-xs text-gray-300">Authenticated</span>
              </div>
              <div>
                <Avatar size={32} icon={<UserOutlined />} />
              </div>
            </div>
          </div>
        </Dropdown>
      </div>

      <Modal
        title="Logout"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button onClick={handleCancel}>Cancel</Button>,
          <Button variant="solid" color="danger" onClick={handleLogout}>Logout</Button>
        ]}
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
    </>
  );
};
