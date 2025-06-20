import React from "react"
import "./Home.css"
import Cards from "../../components/cards/cards" 
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
  
<Cards/>
    </div>
    </div></div>
  )
}

export default Home