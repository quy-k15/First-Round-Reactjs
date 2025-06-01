import { useEffect, useState } from "react";
import { Table, Avatar, message, pagination } from "antd";
import api from "../../services/api";
import { HeartTwoTone, HeartOutlined } from "@ant-design/icons";
import "./ProfilePage.css";
import UserProfileCard from "../../components/userProfileCard/UserProfileCard";

const ProfilePage = () => {
  const phone = localStorage.getItem("phone_number");
  const [usersLiked, setUsersLiked] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLikedUsers = async () => {
    setLoading(true);
    try {
      const res = await api.getUserProfile(phone);
      const favoriteIds = Object.values(res.favorite_github_users || {});
      const ids = favoriteIds.map((user) => user.id);
      const detailedUsers = await Promise.all(
        ids.map(async (id) => {
          const user = await api.findGithubUserProfile(id);
          return user;
        })
      );
      setUsersLiked(detailedUsers);
      console.log("usersLiked", detailedUsers);
    } catch (err) {
      console.error(err);
      message.error("Không thể tải danh sách yêu thích");
    } finally {
      setLoading(false);
    }
  };
  const toggleLike = async (userId) => {
    try {
      await api.likeGithubUser(phone, userId);
      setUsersLiked((prev) => {
        const exists = prev.find((user) => user.id === userId);
        if (exists) {
          return prev.filter((user) => user.id !== userId);
        } 
      });
    } catch {
      message.error("Không thể like");
    }
  };

  useEffect(() => {
    fetchLikedUsers();
  }, []);

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar_url",
      render: (url) => <Avatar src={url} />,
    },
    { title: "Login", dataIndex: "login" },
    {
      title: "GitHub URL",
      dataIndex: "html_url",
      responsive: ["sm"],
      render: (url) => (
        <a href={url} target="_blank" rel="noreferrer">
          Link
        </a>
      ),
    },
    { title: "Repos", dataIndex: "public_repos", responsive: ["sm"] },
    { title: "Followers", dataIndex: "followers", responsive: ["sm"] },
    {
      title: "Like",
      render: (_, record) =>
        usersLiked.some((user) => user.id === record.id) ? (
          <HeartTwoTone
            twoToneColor="#eb2f96"
            onClick={() => toggleLike(record.id)}
          />
        ) : (
          <HeartOutlined onClick={() => toggleLike(record.id)} />
        ),
    },
  ];
  return (
    <div className="profilePage">
      <UserProfileCard />
      <h2>List of liked GitHub users</h2>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={usersLiked}
        loading={loading}
        expandable={{
          expandedRowRender: (record) => (
            <div style={{ lineHeight: "1.6" }}>
              <div>
                <strong>GitHub URL:</strong>{" "}
                <a href={record.html_url} target="_blank" rel="noreferrer">
                  {record.html_url}
                </a>
              </div>
              <div>
                <strong>Repos:</strong> {record.public_repos}
              </div>
              <div>
                <strong>Followers:</strong> {record.followers}
              </div>
            </div>
          ),
          rowExpandable: () => true,
        }}
        pagination={{
          pageSize: 5, 
          showSizeChanger: true, 
          pageSizeOptions: [5, 10, 20, 50],
          showQuickJumper: true, 
        }}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};
export default ProfilePage;
