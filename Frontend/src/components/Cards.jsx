import React from 'react'

function Cards({item}) {
  console.log(item);
 return (
  <>
  <div className="card bg-base-92 w-92 h-{400px} mb-7   shadow-sm  mt-8 m-auto hover:shadow-red-700 duration-300 transition-shadow hover:scale-105 duration-300 transition-transform">
  <figure className='overflow-hidden'>
    <img
      src= {item.image}
      alt={item.name}
        />  
  </figure>
  <div className="card-body">
    <h2 className="card-title ">
      {item.name}
      {item.category === "Free" && (
              <div className="badge badge-secondary">FREE</div>
            )}
            </h2>

      <div className="badge badge-secondary">NEW</div>
  
    <p>{item.title}</p>
   <div className="card-actions justify-end">
      <div className="badge badge-outline">${item.price}</div>
      <div className="badge badge-outline text-black-500  cursor-pointer  hover:bg-red-500 duration-500 hover:text-white hover:rounded-2xl hover:px-4 hover:py-2 duration -200 ">Buy Now</div>
    </div>
  </div>
</div>

  </>
  )
}

export default Cards