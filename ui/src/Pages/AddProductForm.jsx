import axios from "axios";
import { Loading, Notify } from "notiflix";

function AddProductForm() {

    const submitClicked = (event) => {
        event.preventDefault();
        Loading.arrows();
        axios.post("/api/products", {
            name: event.target.name.value,
            oldPrice: event.target.oldPrice.value,
            newPrice: event.target.newPrice.value,
            category: event.target.category.value,
            image: event.target.image.files[0]
        }, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then((res) => {
                Loading.remove();
                Notify.success("Product Added!")
                event.target.reset();
            }).catch((err) => {
                Loading.remove();
                console.log("error occured", err);
                Notify.failure("Failed to add new product, try again.")
            });
    }

    return (<div className="flex justify-center m-5">
        <form className="flex flex-col md:w-1/2 sm:w-full xl:w-1/3" onSubmit={submitClicked}>
            <div className="flex justify-center">
                <span className="text-orange-600 font-serif font-extrabold text-2xl"> Add Product </span>
            </div>
            <input className="p-2 m-2 bg-slate-200 rounded-md" name="name" type="text" placeholder="Enter Product Name" />
            <input className="p-2 m-2 bg-slate-200 rounded-md" type="number" step="0.01" name="oldPrice" placeholder="Enter Old Price" />
            <input className="p-2 m-2 bg-slate-200 rounded-md" type="number" step="0.01" name="newPrice" placeholder="Enter New Price" />
            <label className="p-2 m-2 bg-slate-200 rounded-md">Select Product Image:
                <input className="p-2 m-2" type="file" name="image" placeholder="Select image" accept="image/*" />
            </label>
            <div className="m-2 p-2 bg-slate-200 rounded-md">
                <label className="ml-5 mt-5">Select Product Category: </label>
                <div className="ml-9">
                    <input type="radio" id="cat1" name="category" value="car" />
                    <label htmlFor="cat1">  Car</label> <br />
                    <input type="radio" id="cat2" name="category" value="motorcycle" />
                    <label htmlFor="cat2">  Motorcycle</label> <br />
                    <input type="radio" id="cat3" name="category" value="bicycle" />
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

export default AddProductForm;