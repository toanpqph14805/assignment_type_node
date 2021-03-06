import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import toastr from 'toastr';
import "toastr/build/toastr.min.css";
import { getAllCategory } from '../../../api/category';
import { TypeCategory } from '../../../types/category';

type ProductAddProps = {
  onAdd: (product: InputForm) => void
}
type InputForm = {
  name: string,
  price: number,
  details: string,
  category: string,
}

const ProductAdd =  (props: ProductAddProps) => {
  const [category, setCategory] = useState<TypeCategory[]>([]);
  const { register, handleSubmit, formState: { errors } } = useForm<InputForm>();
  const Navigate = useNavigate();
  useEffect(() => {
    const getCategory = async () => {
      const { data } = await getAllCategory();
      setCategory(data);
    }
    getCategory();
  }, []);
  const onSubmit: SubmitHandler<InputForm> = data => {
    try {
      props.onAdd(data);
      toastr.success("Thêm sản phẩm thành công");
      Navigate("/admin/products");
    } catch (error) {
      toastr.error("Thêm sản phẩm không thành công");
      Navigate("/products");
    }

  }
  return (
    <div className="w-180 p-3">
      <p className='text-center'>Form thêm products</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Name</label>
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Name" {...register('name', { required: true } )} />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Price</label>
          <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Price" {...register('price', { required: true} )} />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Detail</label>
          <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Details" {...register('details', { required: true} )} />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Category</label>
          <select className='category' {...register('category')}>
            {category.map( item => {
              return <option value={`${item._id}`}>{item.name}</option>
            })}
          </select>
        </div>
        <button type="submit" className="btn text-primary border border-primary">Add</button>
      </form>
    </div>
  )
}

export default ProductAdd