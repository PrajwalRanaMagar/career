import React from "react"
import "./Home.css"
import Cards from "../../components/cards/Cards"
const Home = () => {
  return (
    <div><div className="Home-page">
<div className="Home-wrapper">
  <div className="Home-first">
  <div className="Home-first-div">

<div className="Home-first-container">We're hiring!
  </div>
  <h1 className="Home-first-heading">
Be part of our misson  </h1>
  <p className="Home-first-paragraph">
We're looking for passionate people to join us on our mission.We value flat hierarchies, clear communication, and full ownership and responsibility.

  </p>
</div>
<div className="Home-image">

</div></div>
   {/* <div className="Home-first-buttons">
      <button className="Home-button">View all</button>
       <button className="Home-button">Development</button>
        <button className="Home-button"> Design</button>
         <button className="Home-button">Marketing 
         </button>
          <button className="Home-button">Customer Service</button>
           <button className="Home-button">Operations</button>
            <button className="Home-button">Finance</button>
             <button className="Home-button">Management</button>

    </div> */}
<Cards/>
    </div>
    </div></div>
  )
}

export default Home