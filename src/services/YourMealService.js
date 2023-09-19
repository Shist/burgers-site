import { useHttp } from "../hooks/http.hook";

const useYourMealService = () => {
  const { loading, request, serverError, clearServerError } = useHttp();

  const _baseUrl = "http://localhost:4000/";

  const getAllFoodData = async () => {
    const foodArr = await request(`${_baseUrl}categoryItems`);
    return foodArr;
  };

  const getFoodCategoryById = async (uniqueCategoryId) => {
    const categoryData = await request(
      `${_baseUrl}categoryItems?uniqueCategoryId=${uniqueCategoryId}`
    );
    return categoryData[0];
  };

  const getUserById = async (userId) => {
    const user = await request(`${_baseUrl}users/${userId}`);
    return Object.keys(user).length ? user : null;
  };

  const getUserByName = async (name) => {
    const usersArr = await request(`${_baseUrl}users?name=${name}`);
    if (usersArr.length) {
      return usersArr[0];
    } else {
      return null;
    }
  };

  const registerNewUser = async (name, password) => {
    const response = await request(
      `${_baseUrl}users`,
      "POST",
      JSON.stringify({ name, password, basket: {} })
    );
    return response;
  };

  const updateUserBasketOnServer = async (userId, newDataObj) => {
    const response = await request(
      `${_baseUrl}users/${userId}`,
      "PUT",
      JSON.stringify(newDataObj)
    );
    return response;
  };

  return {
    loading,
    serverError,
    clearServerError,
    getAllFoodData,
    getFoodCategoryById,
    getUserById,
    getUserByName,
    registerNewUser,
    updateUserBasketOnServer,
  };
};

export default useYourMealService;
