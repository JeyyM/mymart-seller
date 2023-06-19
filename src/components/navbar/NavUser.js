import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function NavUser(props) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
    function setActive(){
        setIsActive(!isActive)
    }

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const slideDown = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -150, opacity: 0 }
  };

  const working = isHovered || isActive

  return (
    <div
      title={props.title}
      style={{ textDecoration: "none" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="navitem" onClick={setActive}>
        <div className="heading-icon-profile svg-color">&nbsp;</div>
        <h3 className="heading-tertiary">My Profile</h3>
      </button>
      <AnimatePresence>
        {working && (
          <motion.div
            className="hover-box round-borderer-extra wtf"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideDown}
          >
            <Link
              href={`${router.query.shopid}/account`}
              style={{ textDecoration: "none" }}
              className="profile-item dark-underline"
            >
              <div
                className="heading-icon-manage-account svg-color"
                style={{ margin: "0 0.5rem" }}
              >
                &nbsp;
              </div>
              <h3 className="heading-tertiary">Profile Details</h3>
            </Link>

            <Link
              href={`${router.query.shopid}/orders`}
              style={{ textDecoration: "none" }}
              className="profile-item svg-decolor"
            >
              <div
                className="heading-icon-receipt svg-color"
                style={{ margin: "0 0.5rem" }}
              >
                &nbsp;
              </div>
              <h3 className="heading-tertiary">My Orders</h3>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NavUser;
