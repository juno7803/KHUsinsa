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

const updateCloths = async (id, cloths) => {
  // body가 들어가야 함
  try {
    const { data } = await axios.put(`${url}/${id}`, cloths);
    console.log("[SUCCESS] UPDATE CLOTHS", data);
    return data.data;
  } catch (e) {
    console.error("[FAIL] UPDATE C₩LOTHS", e);
    throw e;
  }
};

const createCloths = async (member) => {
  try {
    const { data } = await axios.post(`${url}`, member);
    return data.data;
  } catch (e) {
    console.error("[FAIL] CREATE CLOTHS", e);
    throw e;
  }
};

const deleteCloths = async (id) => {
  try {
    const { data } = await axios.delete(`${url}/${id}`);
    console.log("[SUCCESS] DELETE CLOTHS", data);
    return data.data;
  } catch (e) {
    console.error("[FAIL] DELETE CLOTHS", e);
    throw e;
  }
};

const api = {
  getClothsAPI,
  getClothsById,
  updateCloths,
  createCloths,
  deleteCloths,
};

export default api;
