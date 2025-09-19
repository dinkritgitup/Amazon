import React, { useContext } from "react";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch, BsChevronDown } from "react-icons/bs";
import { Link } from "react-router-dom";
import { BiCart } from "react-icons/bi";
import classes from "./Header.module.css";
import LowerHeader from "./LowerHeader";
import { DataContext } from "./DataProvider/DataProvider";
import {auth} from "../../Utility/firebase"

const Header = () => {
  const [state, dispatch] = useContext(DataContext)
  console.log(state.basket.length)
  const totalItem = state.basket?.reduce((amount,item)=>{
    return item.amount + amount
  },0)
  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header_container}>
          <div className={classes.logo_container}>
            {/* logo */}
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/small/amazon_PNG11.png"
                alt="amazon logo"
              />
            </Link>
            <div className={classes.delivery}>
              {/* delivery */}
              <span>
                {/* icon */}
                <SlLocationPin />
              </span>
              <div>
                <p>Delivered to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>
          <div className={classes.search}>
            {/* search */}
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" placeholder="search product" />
            <BsSearch size={38} />
          </div>

          {/* right side link */}

          <div className={classes.order_container}>
            <Link to="" className={classes.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_States.svg.png"
                alt=""
              />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </Link>

            {/* three components */}

            <Link to={!state.user && "/auth"}>
              <div>
                {state.user ? (
                  <>
                    <p>Hello {state.user?.email?.split("@")[0]}</p>
                    <span onClick={()=>auth.signOut()}>Sign Out</span>
                  </>
                ) : (
                  <>
                    <p>Hello, sign in</p>
                    <span>
                      Account & Lists
                      {/*  <BsChevronDown size={12} /> */}
                    </span>
                  </>
                )}
              </div>

      
            </Link>
            {/* orders */}
            <Link to="/orders">
              <p>Returns</p>
              <span>
                & Orders
                {/* <BsChevronDown size={12} /> */}
              </span>
            </Link>

            {/* cart */}
            <Link to="/cart" className={classes.cart}>
              {/* icon */}
              <BiCart size={35} />
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
};

export default Header;
