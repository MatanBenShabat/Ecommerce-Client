// import { useMutation } from "react-query";
// import socket from "../../socket/socket";
// import axios from "axios";
// import React, { useRef } from "react";
// import getProducts from "../../Hooks/useGetProducts";



// const DeleteProduct = (id) => {

//   const handleSuccess = React.useCallback(() => {
//     socket.emit("delete_product");
//     getProducts();
//   }, [getProducts]);

//   const mutation = useMutation(
//     () => {
//       return axios.delete(
//         `http://localhost:5000/api-products/products/${id}`
//       );
//     },
//     { withCredentials: true },
//     { onSuccess: handleSuccess }
//   );
//   mutation()

// };

// export default DeleteProduct;
