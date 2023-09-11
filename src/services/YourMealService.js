import { useHttp } from "../hooks/http.hook";

const useYourMealService = () => {
  const { loading, request, serverError, clearServerError } = useHttp();

  const _baseUrl = "http://localhost:4000/";

  const getAllFoodData = async () => {
    const foodArr = await request(`${_baseUrl}categoryItems`);
    return foodArr;
  };

  const isUserNameFree = async (name) => {
    const nicknamesArr = await request(`${_baseUrl}users?name=${name}`);
    if (nicknamesArr.length) {
      return false;
    } else {
      return true;
    }
  };

  const registerNewUser = async (name, password) => {
    const response = await request(
      `${_baseUrl}users`,
      "POST",
      JSON.stringify({ name, password, basket: [] })
    );
    return response;
  };

  return {
    loading,
    serverError,
    clearServerError,
    getAllFoodData,
    isUserNameFree,
    registerNewUser,
  };
};

export default useYourMealService;
