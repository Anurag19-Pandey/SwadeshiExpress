import React,{useEffect,useState} from 'react'
import Header from "../components/jsx/HomeHeader"
import "../components/css/SellerDashboardStyles.css"
import ProductCard from '../components/jsx/ProductCard'
import Footer from "../components/jsx/Footer"
import {useNavigate,useParams} from 'react-router-dom'
 import {useCookies} from 'react-cookie'
import axios from 'axios'

const SellerDashboard = () => {

      const [cookies,setCookie,removeCookie] = useCookies([])

       const navigate = useNavigate();


       const [userDetail,setUserDetail] = useState({})

       const [cartLength,setcartLength] = useState()

    const {id} = useParams()

    // const [product,setpostProduct] = useState({
    //     id:id,
    //     productname:"",
    //     category:"",
    //     size:"",
    //     quantity:"",
    //     description:"",
    //     price:""
    //    })

    useEffect(()=>{
        const verifyUser = async()=>{
            if(!cookies.jwt){
               navigate('/login')
            }else{
               const {data} = await axios.post('http://localhost:5000/seller/sellerdashboard',{},{withCredentials:true})   
              if(data.id !== id){
                removeCookie("jwt")
                navigate('/login')
              }else{
                const {data} = await axios.get(`http://localhost:5000/seller/sellerdetails/${id}`)
                setUserDetail(data)
                setcartLength(data.addtoCart.length)
                navigate(`/sellerdashboard/${id}`)
              }
            }
        }
        verifyUser()
    },[])

    // const handleForm = (e) => {
    //     const {name, value} = e.target;
    //     setpostProduct({
    //       ...product,
    //       [name]: value
    //     })
    //     console.log(name,value)
    //   }
    

//    const postProduct = async(e)=>{
//        e.preventDefault();
//        const {data} = await axios.post(`http://localhost:5000/product/upload`,{
//         ...product
//        })

//        console.log(data)
//    }

  return (
      <div className='SellerDashboard'>
        <Header id ={id} cartlength={cartLength}/>
        <div className="Seller_info_Seller">
            <div className="Seller_info_image">
                <img src="https://pbs.twimg.com/media/E2JJMJsVIAE9Aq4.jpg:large" alt="Selle" />
            </div>
            <div className="Seller_info">
                <div className="Seller_info_name">
                   {userDetail.name}
                </div>
                <div className="Seller_info_location">
                {userDetail.email}
                </div>
                <div className="Seller_info_contacts">
                   <button className="Seller_info_Contact">{userDetail.phoneno}</button>
                </div>
            </div>
        </div>

        <div className="Seller_Products">
            <div className="Seller_Heading">
                Products
            </div>
            <div className="Product_wrapper_seller">
               <ProductCard/>
            </div>
        </div>
        <h1 className='Seller_product_post_head'> Post Product </h1> 
        <div className="Seller_Product_post">
            <form action={`http://localhost:5000/product/upload/${id}`} method='POST' encType='multipart/form-data' className='Seller_Postform'>
                <div className="post_product">
                <label>Name</label>
                <input type="text"  id='Name' name='productname' placeholder='Product Name' />
                <p className="post_product_error"></p>
                </div>
                <div className="post_product">
                <label>Category</label>
                <select name="category">
                    <option value="Clothing">Clothing</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Crokery">Crokery</option>
                </select>
                <p className="post_product_error"></p>
                </div>
                <div className="post_product">
                <label>Description</label>
                <input type="text" name="description" placeholder='Description'  />
                <p className="post_product_error"></p>
                </div>
               <div className="post_product">
               <label>Price</label>
                <input type="number" name="price" placeholder='Price' />
                <p className="post_product_error"></p>
               </div>
              <div className="post_product">
              <label>Size</label>
                <select name="size" id="size" placeholder='Size'  defaultValue="null">
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                </select>
                <p className="post_product_error"></p>
              </div>
                <div className="post_product">
                <label>Quantity</label>
                <input type="number" min={1} name="quantity" placeholder='Quantity'/>
                <p className="post_product_error"></p>
                </div>
               <div className="post_product">
               <label>Image</label>
                <input type="file" name="file"/>
                <p className="post_product_error"></p>
               </div>
               <div className="post_product">
               <button type="submit" className='submit_btn_post'>Post Product</button>
               <p className="post_product_error"></p>
               </div>
            </form>
        </div>
        <Footer/>
    </div>
  )
}

export default SellerDashboard