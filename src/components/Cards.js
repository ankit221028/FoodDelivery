import React, { useRef, useState, useEffect } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';
export default function Cards(props) {
    let dispatch = useDispatchCart();
    let data = useCart()
    const priceRef = useRef();
    let options = props.options;
    let priceOption = Object.keys(options)
    const [qty,setQty] = useState(1)
    const [size, setSize] = useState("")
    const handleAddtocart = async ()=>{
        let food = []
        for (const item of data){
            if(item.id === props.foodItem._id){
                food = item;
                break;
            }
        }
        if(food !== []){
            if(food.size === size){
                await dispatch({type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty : qty})
                return
            }
            else if(food.size !== size){
                await dispatch({type:"ADD",id:props.foodItem._id,name: props.foodItem.name, price:finalPrice, qty: qty,size:size})
                return
            }
            return
        }
        await dispatch({type:"ADD",id:props.foodItem._id,name: props.foodItem.name, price:finalPrice, qty: qty,size:size})
        
    }
    let finalPrice = qty * parseInt(options[size]); 
    useEffect(() =>{
        setSize(priceRef.current.value)
    },[])

  return (
    <div>
        <div className="card mt-3" style={{"width": "18rem","maxHeight":"360 px"}}>
                <img className="card-img-top" src={props.foodItem.img} alt={props.foodName} style={{height:"175px", objectFit:"fill"}}/>
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    {/* <p className="card-text">{props.foodDescription}</p> */}
                    <div className="container w-100">
                        <select className="m-2 h-100 bg-success rounded" onChange={(e)=> setQty(e.target.value)}>
                            {Array.from(Array(6),(e,i)=>{
                                return (
                                    <option key={i+1} value={i+1}> {i+1} </option>
                                )
                            })}
                        </select>
                        <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e)=> setSize(e.target.value)}>
                            {priceOption.map((data)=>{
                                return <option key={data} value={data}>{data}</option>
                            })}
                        </select>
                        <div className='d-inline fs-5'>₹{finalPrice}/-</div>
                    </div>
                    <hr />
                    <button className='btn btn-success justify-center ms-2' onClick={handleAddtocart}>Add to Cart</button>
                </div>
        </div>
    </div>
  )
}
