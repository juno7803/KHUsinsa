import axios from "axios";

const url = "/user/cloth"
  // "http://ec2-13-124-127-8.ap-northeast-2.compute.amazonaws.com:3000/api/members";

const getClothsAPI = async () => {
  try {
    const { data } = await axios.get(`${url}`);
    console.log("[SUCCESS] GET CLOTHS", data);
    return data.data;
  } catch (e) {
    console.error("[FAIL] GET CLOTHS", e);
    return e;
  }
};

const getClothsById = async (id) => {
  try {
    const { data } = await axios.get(`${url}/${id}`);
    console.log("[SUCCESS] GET CLOTHS", data);
    return data.data;
  } catch (e) {
    console.error("[FAIL] GET CLOTHS", e);
    throw e;
  }
};

const updateMember = async (id, member) => {
  // body가 들어가야 함
  try {
    const { data } = await axios.put(`${url}/${id}`, member);
    console.log("[SUCCESS] UPDATE MEMBER", data);
    return data.data;
  } catch (e) {
    console.error("[FAIL] UPDATE MEMBER", e);
    throw e;
  }
};

const createMember = async (member) => {
  try {
    const { data } = await axios.post(`${url}`, member);
    return data.data;
  } catch (e) {
    console.error("[FAIL] CREATE MEMBER", e);
    throw e;
  }
};

const deleteMember = async (id) => {
  try {
    const { data } = await axios.delete(`${url}/${id}`);
    console.log("[SUCCESS] DELETE MEMBER", data);
    return data.data;
  } catch (e) {
    console.error("[FAIL] DELETE MEMBER", e);
    throw e;
  }
};

const api = {
  getClothsAPI,
  getClothsById,
  updateMember,
  createMember,
  deleteMember,
};

export default api;
