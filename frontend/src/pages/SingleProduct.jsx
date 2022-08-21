import React, { useState, useEffect } from 'react'
import Footer from '../components/jsx/Footer';
import HomeHeader from '../components/jsx/HomeHeader';
import "../components/css/SingleProductStyles.css";
import Img1 from "../images/products/f1.jpg"
import { AiOutlineShoppingCart } from 'react-icons/ai';
import Comment from "../components/jsx/Comment"
import { useParams } from "react-router-dom";
import axios from "axios"

const SingleProduct = () => {
	const [Comments, setComments] = useState([])
	const [review, setreview] = useState({ review: "", user: "User" })
	const [product, setProduct] = useState({})
	const { id, imageid } = useParams()

	useEffect(() => {
		axios.get(`http://localhost:5000/product/getproduct/${id}`).then(({ data }) => {
			setProduct(data)
			console.log(data);
		})
	}, [])

	useEffect(() => {
		axios.get(`http://localhost:5000/product/getcomments/${id}`).then(({ data }) => {
			setComments(data)
		})
	},[])

	const addtocart=()=>{
        alert("Product added to cart ")
	}

	const postcomment = (e) => {
		console.log(review);
		e.preventDefault()
		const arr = Comments;
		arr.push(review)
		setComments(arr)
		console.log(Comments);
		axios.post(`http://localhost:5000/product/postcomment/${id}`, {
			...review
		}).then(({ data }) => {
			if (data) {
				axios.get(`http://localhost:5000/product/getcomments/${id}`).then(({ data }) => {
					setComments(data)
					console.log(Comments);
				})
			}
		})
	}

	const handlecomment = (e) => {
		const { name, value } = e.target
		setreview({
			...review,
			[name]: value,
			date: Date.now()
		})
		console.log(review);
	}

	return (
		<div>
			<HomeHeader />
			<section id="prodetails_singleproduct" className='section-p1_singleproduct'>
				<div className="single-product-image_singleproduct">
					<img src={`http://localhost:5000/product/images/${imageid}`} alt="Our Product" style={{ width: "100%" }} id="MainImg" />
				</div>

				<div className="single-product-details_singleproduct">
					<h5>Category / {product.category}</h5>
					<h4>{product.productname}</h4>
					<h2>&#x20B9; {product.price}</h2>
					<select>
						<option>{product.size}</option>
						<option>Small</option>
						<option>Medium</option>
						<option>Large</option>
						<option>XL</option>
						<option>XXL</option>
					</select>
					<div className='details_cart_singleproduct'>
						<input type="number" defaultValue={1} min="1" max={product.quantity} />
						<button onClick={addtocart}>Add To Cart <AiOutlineShoppingCart size={16} /></button>
					</div>
					<h4>Product Details</h4>
					<br></br>
					<span>{product.description}</span>
				</div>
			</section>
			<div className="SingleProduct-Comment-section">
				<div className='Comment-Reviews'>Comments</div>
				<div className="Comments-List">
					{  Comments.length===0? <div>Be the first to leave a comment ..</div>:Comments.map((Element) => {
							return (<Comment review={Element.review} date={Element.date} user={Element.user} key={Element.date} />)
						})
					}
				</div>
				<div className="SingleProduct-your-comment">Comment ..</div>
				<form action="" className='My-Comment-Section'>
					<textarea name="review" id="comment" cols="20" rows="5" className='My-comment' value={review.review} onChange={handlecomment}></textarea>
					<div className="Comment-Buttons">
						<button type="reset" className='My-Comment-button-reset'> Reset </button>
						<button type="submit" className='My-Comment-button-submit' onClick={postcomment}> Post </button>
					</div>
				</form>
			</div>
			<Footer />
		</div>
	)
}

export default SingleProduct;
