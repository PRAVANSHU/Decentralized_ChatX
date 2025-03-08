import React, { useContext, useState } from 'react';
import Image from "next/image";
import Link from "next/link";

// Internal imports
import Style from './NavBar.module.css';
import { ChatAppContext } from '../../Context/ChatAppContext';
import { Model, Error } from "../index1";
import images from "../../assets";

const NavBar = () => {
   const menuItems = [
      { menu: "All Users", link: "alluser" },
      { menu: "CHAT", link: "/" },
      { menu: "CONTACT", link: "/" },
      { menu: "SETTING", link: "/" },
      { menu: "FAQS", link: "/" },
      { menu: "TERMS OF USE", link: "/" },
   ];

   // State
   const [active, setActive] = useState(2);
   const [open, setOpen] = useState(false);
   const [openModel, setOpenModel] = useState(false);

   const { account, userName, connectWallet } = useContext(ChatAppContext);

   return (
      <div className={Style.NavBar}>
         <div className={Style.NavBar_box}>
            <div className={Style.NavBar_box_left}>
               <Image src={images.logo} alt="logo" width={50} height={50} />
            </div>
            <div className={Style.NavBar_box_right}>
              {/*//desktop */}
               <div className={Style.NavBar_box_right_menu}>
                  {menuItems.map((el, i) => (
                     <div
                        key={i} // Fix duplicate key issue
                        onClick={() => setActive(i + 1)}
                        className={`${Style.NavBar_box_right_menu_item} ${active === i + 1 ? Style.active_btn : ""}`}
                     >
                        <Link className={Style.NavBar_box_right_menu_item_link} href={el.link}>
                           {el.menu}
                        </Link>
                     </div>
                  ))}
               </div>
                {/*//mobile */}
                {open && ( <div className={mobile_menu}>
                  {menuItems.map((el, i) => (
                     <div
                        key={i} // Fix duplicate key issue
                        onClick={() => setActive(i + 1)}
                        className={`${mobile_menu_item} ${active === i + 1 ? Style.active_btn : ""}`}
                     >
                        <Link className={mobile_menu_item_link} href={el.link}>
                           {el.menu}
                        </Link>
                     </div>
                  ))}
                  <p className={Style.mobile_menu_btn}>
                    <Image src={images.close} alt="close" width={50} height={50}
                    onClick={()=>setOpen(false)}/>
                  </p>
               </div>     
                )}

                {/*//connect wallet */}
                <div className={Style.NavBar_box_right_connect}>
                  {account == ""?(<button onClick={()=> connectWallet()}>
                   <span>Connect Wallet</span>
                  </button>):(
                    <button onClick={()=>setOpenModel(true)}>
                      {""}
                      <Image src={userName?images.accountName:images.create2}
                      alt="Account image"
                      width={20}
                      height={20}/>
                      {""}
                      <small>{userName ||"Create Account"}</small>
                    </button>
                  )}
                </div>
              <div className={Style.NavBar_box_right_open}
              onClick={()=>setOpen(true)}>
                <Image src={images.open} alt="open"
                width={30}
                height={30}/>
              </div>
            </div>
         </div>
      </div>
   );
};

export default NavBar;
