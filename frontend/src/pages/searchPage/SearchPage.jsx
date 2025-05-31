import { useEffect, useState } from "react";
import { Input, Table, Avatar, Pagination, message } from "antd";
import api from "../../services/api";
import { HeartTwoTone, HeartOutlined } from "@ant-design/icons";
import "./SearchPage.css";

const SearchPage =({ query })=> {
//   const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [liked, setLiked] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const phone = localStorage.getItem("phone_number");

  const fetchLikes = async () => {
    try {
      const res = await api.getUserProfile(phone);
      const likedIds = res.favorite_github_users?.map((u) => u.id) || [];
      setLiked(new Set(likedIds));
      console.log("like",liked);
    } catch {
      message.error("Không thể tải danh sách yêu thích");
    }
  };

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await api.searchGithubUsers(query, page, perPage);
      const detailedUsers = await Promise.all(
        res.items.map(async (user) => {
          const details = await api.findGithubUserProfile(user.id);
          return { ...user, ...details };
        })
      );
      setUsers(detailedUsers);
      setTotal(Math.min(res.total_count, 1000));
    } catch (error) {
      console.error(error);
      message.error("Lỗi tìm kiếm GitHub");
    }finally{
        setLoading(false);
    }

  };

  const toggleLike = async (userId) => {
    try {
      await api.likeGithubUser(phone, userId);
      setLiked((prev) => {
        const copy = new Set(prev);
        copy.has(userId) ? copy.delete(userId) : copy.add(userId);
        return copy;
      });
      console.log("liked:", liked);
    } catch {
      message.error("Không thể like");
    }
  };

  useEffect(() => {
    fetchLikes();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [query, page, perPage]);

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
      render: (url) => (
        <a href={url} target="_blank" rel="noreferrer">
          Link
        </a>
      ),
    },
    { title: "Repos", dataIndex: "public_repos" },
    { title: "Followers", dataIndex: "followers" },
    {
      title: "Like",
      render: (_, record) =>
        liked.has(record.id) ? (
          <HeartTwoTone twoToneColor="#eb2f96" onClick={() => toggleLike(record.id)} />
        ) : (
          <HeartOutlined onClick={() => toggleLike(record.id)} />
        ),
    },
  ];

  return (
    <div className="searchPage">

      <Table rowKey="id" columns={columns} dataSource={users} pagination={false}  loading={loading}/>

      <div style={{ marginTop: 20, textAlign: "right" }}>
        <Pagination
          current={page}
          pageSize={perPage}
          total={total}
          onChange={(p, size) => {
            setPage(p);
            setPerPage(size);
          }}
          showSizeChanger
        />
      </div>
    </div>
  );
}
export default SearchPage;