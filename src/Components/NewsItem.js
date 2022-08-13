 import React, { Component } from 'react'
 
 export class NewsItem extends Component {
  
  
    render() {
let {title,description,imageUrl,newsUrl,author,date,source} = this.props;
 return (
       <div className='container my-3' >
<div className="card" style={{width: "18rem"}}>
   <img src={!imageUrl?"https://d2jx2rerrg6sh3.cloudfront.net/image-handler/picture/2018/7/Brain_cancer%2c_3D_illustration_showing_presence_of_tumor_inside_brain_-_Kateryna_Kon_M1_6704c47fefe0477dbe1cd3351402914f-620x480.jpg":imageUrl} className="card-img-top" alt="..."/> 
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{left : '90% ', zIndex :'1'}} >
    {source}
   
  </span>
    <p className="card-text">{description}</p>
    <p className="card-text"><small class="text-muted">By {!author?'unknown':author} on {new Date(date).toGMTString()}</small></p>

    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read more</a>
  </div>
</div>

       </div>
     )
   }
 }
 
 export default NewsItem