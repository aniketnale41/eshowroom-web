import { Link, useNavigate } from "react-router-dom";
import { MdDeleteForever, MdCreate } from "react-icons/md";
import { useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Confirm, Loading, Notify } from "notiflix";
import AuthContext from "../Context/AuthContext";

function Dashoboard() {
    const [productList, setProductList] = useState([]);
    const navigate = useNavigate();
    const {isAdmin} = useContext(AuthContext);

    useEffect(() => {
        if(!isAdmin){
            navigate("/")
            return;
        }
        axios.get("/api/products")
            .then((res) => {
                setProductList(res.data);
            }).catch((err) => {
                Notify.failure("Login to access the dashboard");
                // navigate("/login")
            });
    }, []);

    const handleDeleteClick = (id) => {
        Confirm.show("Delete Product", "Are you sure that you want to delete this product?", "Ok", "Cancel",
        // on Ok click
        ()=> {
            Loading.circle();
            axios.delete("/api/products/"+id).then((res)=> {
                Loading.remove();
                Notify.success("Product deleted!")
                axios.get("/api/products")
                    .then((res) => {
                        setProductList(res.data);
                    }).catch((err) => {
                        console.log(err)
                    });
            }).catch((err)=> {
                console.log("Error deleting product", err);
                Loading.remove();
                Notify.failure("Got error deleting product, try again.")
            })
        },
        // on cancel click
        ()=> {
        });
    }

    return (<>
        <div className="flex flex-col items-center mt-5 ml-10 mb-10">
            <div className="flex w-1/3 justify-between">
                <p className="text-orange-600 font-extrabold text-2xl">Products Catlog</p>
                <Link to="/product/add" className="bg-orange-600 p-2 text-white rounded-md">Add Product</Link>
            </div>
            <div className="relative overflow-x-auto mt-3">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Product name 
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Old price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                New Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productList.map((product) =>
                                <tr key={product.name} className="bg-white border-b ">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {<Link to={"/product/"+product.id}>{product.name}</Link>}
                                    </th>
                                    <td className="px-6 py-4">
                                        {product.category}
                                    </td>
                                    <td className="px-6 py-4">
                                        {product.oldPrice}
                                    </td>
                                    <td className="px-6 py-4">
                                        {product.newPrice}
                                    </td>
                                    <td className="px-6 py-4">
                                        <img className="" height={30} width={30} src={"data:image/png;base64," + product.imageData} alt="" />
                                    </td>
                                    <td className="px-6 py-4 flex">
                                        <button className="text-teal-500" onClick={() => navigate("/product/edit/"+product.id)}>
                                            <MdCreate size={20.0} />
                                        </button>
                                        <button className="text-red-600" onClick={() => handleDeleteClick(product.id)}>
                                            <MdDeleteForever size={20.0} />
                                        </button>
                                    </td>
                                </tr>

                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </>);
}

export default Dashoboard;