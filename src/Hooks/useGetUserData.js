import { useQueryClient } from "react-query";

const useGetUserData = ()=>{
    const queryclient = useQueryClient();
    const query = queryclient.getQueryData("user-data");

    return query?.data.data
  }

  export default useGetUserData;