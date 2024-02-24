import axios from "axios";
import { Loading, Notify } from "notiflix";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditProductForm() {

    const [name, setName] = useState();
    const [oldPrice, setOldPrice] = useState();
    const [newPrice, setNewPrice] = useState();
    const [category, setCategory] = useState();
    const [imageData, setImageData] = useState();
    const [imagePreiew, setImagePreview] = useState();
    const [imageUpdated, setUpdated] = useState(false);

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("/api/products/" + id).then((res) => {
            console.log("prod", res.data)
            setName(res.data.name)
            setOldPrice(res.data.oldPrice)
            setNewPrice(res.data.newPrice)
            setCategory(res.data.category)
            setImageData(res.data.imageData)
        }).catch((err) => {
            console.error(err);
        })
    }, [])

    const updateImage = (event) => {
        const imageSrc = URL.createObjectURL(event.target.files[0])
        setImagePreview(imageSrc);
        setUpdated(true);
    }

    const submitClicked = (event) => {
        event.preventDefault();
        Loading.arrows();
        axios.put("/api/products/"+id, {
            id: id,
            name: name,
            oldPrice: oldPrice,
            newPrice: newPrice,
            category: category,
            image: event.target.image.files[0]
        }, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then((res) => {
                Loading.remove();
                Notify.success("Product Updated!")
                event.target.reset();
                navigate("/dashboard")
            }).catch((err) => {
                Loading.remove();
                console.log("error occured", err);
                Notify.failure("Failed to update product data, try again.")
            });
    }

    return (<div className="flex justify-center m-5">
        <form className="flex flex-col md:w-1/2 sm:w-full xl:w-1/3" onSubmit={submitClicked}>
            <div className="flex justify-center">
                <span className="text-orange-600 font-serif font-extrabold text-2xl"> Edit Product </span>
            </div>
            <input className="p-2 m-2 bg-slate-200 rounded-md" name="name" onChange={(e)=> setName(e.target.value)} value={name} type="text" placeholder="Enter Product Name" />
            <input className="p-2 m-2 bg-slate-200 rounded-md" type="number" onChange={(e)=> setOldPrice(e.target.value)} value={oldPrice} step="0.01" name="oldPrice" placeholder="Enter Old Price" />
            <input className="p-2 m-2 bg-slate-200 rounded-md" type="number" onChange={(e)=> setNewPrice(e.target.value)} value={newPrice} step="0.01" name="newPrice" placeholder="Enter New Price" />
            <label className="p-2 m-2 bg-slate-200 rounded-md">Update Product Image:
            <div className="flex justify-center w-full">
               {imageUpdated ? <img className='' src={imagePreiew}  height={50} alt="" /> : <img className='' src={"data:image/png;base64," + imageData}  height={50} alt="" /> }
            </div>
                <input className="p-2 m-2" type="file" name="image" onChange={(e)=> {updateImage(e)}} placeholder="Select image" accept="image/*" />
            </label>
            <div className="m-2 p-2 bg-slate-200 rounded-md">
                <label className="ml-5 mt-5" >Update Product Category: </label>
                <div className="ml-9">
                    <input type="radio" id="cat1" name="category" onChange={(e)=> setCategory(e.target.value)} value="car" checked={category == "car"}/>
                    <label htmlFor="cat1">  Car</label> <br />
                    <input type="radio" id="cat2" name="category" onChange={(e)=> setCategory(e.target.value)} value="motorcycle" checked={category == "motorcycle"}/>
                    <label htmlFor="cat2">  Motorcycle</label> <br />
                    <input type="radio" id="cat3" name="category" onChange={(e)=> setCategory(e.target.value)} value="bicycle" checked={category == "bicycle"}/>
                    <label htmlFor="cat3">  Bicycle</label> <br />
                </div>
            </div>
            <div className="flex justify-center">
                <input className="bg-orange-600 w-max p-2 rounded-md text-white" type="submit" placeholder="Add" />
            </div>
        </form>
    </div>
    );
}

export default EditProductForm;