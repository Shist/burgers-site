import { useHttp } from "../hooks/http.hook";

const useYourMealService = () => {
  const { loading, request, error, clearError } = useHttp();

  const _baseUrl = "http://localhost:4000/";

  const getAllFoodData = async () => {
    const result = await request(`${_baseUrl}categoryItems`);
    return result;
  };

  const getAllUsersData = async () => {
    const result = await request(`${_baseUrl}users`);
    return result;
  };

  return {
    loading,
    error,
    clearError,
    getAllFoodData,
    getAllUsersData,
  };
};

export default useYourMealService;
