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

    const {id} = useParams()

    const [product,setpostProduct] = useState({
        id:id,
        productname:"",
        category:"",
        size:"",
        quantity:"",
        description:"",
        price:"",
        file:""
       })

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
                navigate(`/sellerdashboard/${id}`)
              }
            }
        }
        verifyUser()
    },[])

    const handleForm = (e) => {
        const {name, value} = e.target;
        setpostProduct({
          ...product,
          [name]: value
        })
        console.log(name,value)
      }
    

   const postProduct = ()=>{

   }

  return (
      <div className='SellerDashboard'>
        <Header/>
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
            <form className='Seller_Postform'>
                <div>
                <label>Name</label>
                <input type="text" id='Name' name='productname' placeholder='Product Name' onChange={handleForm}/>
                </div>
                <div>
                <label>Category</label>
                <select name="category" id="size" onChange={handleForm}>
                    <option value="Clothing">Clothing</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Crokery">Crokery</option>
                </select>
                </div>

                <div>
                <label>Desctiption</label>
                <input type="text" name="description" placeholder='Description' onChange={handleForm} />
                </div>
               <div>
               <label>Price</label>
                <input type="number" name="price" placeholder='Price' onChange={handleForm}/>
               </div>
              <div>
              <label>Size</label>
                <select name="size" id="size" placeholder='Size' onChange={handleForm} defaultValue="null">
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                </select>
              </div>
                <div>
                <label>Quantity</label>
                <input type="number" name="quantity" placeholder='Quantity' onChange={handleForm}/>
                </div>
               <div>
               <label>Image</label>
                <input type="file" name='file' onChange={handleForm}/>
               </div>
            </form>
               <button type="submit" className='submit_btn_post' onClick={postProduct}>Post Product</button>
        </div>
        <Footer/>
    </div>
  )
}

export default SellerDashboard