import { Fragment, useState } from "react";
import NavbarItems from "./Navbar-Items";
import { useRouter } from "next/router";
import Head from "next/head";
import Footer from "../Mart/Footer";
import CartModal from "../cart/CartModal";

function NavbarLayout(props) {
    const router = useRouter()

    function hexToRgb(hex) {
        hex = hex.replace('#', '');

        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        return { r, g, b };
    }

    const primaryDarkHex = hexToRgb(`${props.color["color-primary-dark"]}`)

    let placeholder = {}
    let colormode = ""

    if (props.mode === false) {
        placeholder = `{color: ${props.color["bg-item"]};
opacity: 0.8;
filter: brightness(200%);}`

        colormode = "/dark"
    }
    if (props.mode === true) {
        placeholder = `{color: ${props.color["bg-item"]};
opacity: 0.8;
filter: brightness(50%);}`

        colormode = "/light"
    }

    const id = router.query.shopid

    const [CartStatus, setCartStatus] = useState(false)
    const CartHandler = () => {
        setCartStatus(!CartStatus)
    }

    return (
        <Fragment>
            <Head>
                <style>
                    {` 
::selection{background-color: ${props.color["color-primary-dark"]};}                    

body{background-color: ${props.color["bg-body"]} !important;}

.maincontainer, .category-container, .setting-grid {filter: drop-shadow(-4px 4px 0px ${props.color["color-primary-dark"]}) !important;}

.heading-primary {font-family: ${props.color["text-primary-font"]} !important;
    color: ${props.color["text-primary-color"]} !important;}

.heading-primary-notif {font-family: ${props.color["text-primary-font"]} !important;}

.heading-secondary, input[type="text"].text-full, input[type="number"].text-full, input[type="text"].invalid-form, input[type="number"].text-small, input[type="text"].text-small, input[type="password"].text-small, input[type="number"].invalid-form-2, input[type="text"].invalid-form-2, input[type="password"].invalid-form-2  {font-family: ${props.color["text-secondary-font"]} !important;
    color: ${props.color["text-secondary-color"]} !important;
    font-weight: 700 !important;}

    input[type="number"].text-small-white {font-family: ${props.color["text-secondary-font"]} !important;
    color: black !important;
    font-weight: 700 !important;}

.heading-secondary-notif {font-family: ${props.color["text-secondary-font"]} !important;}

.heading-tertiary, .desc-text-area, .invalid-form-box, .form-label {font-family: ${props.color["text-tertiary-font"]} !important;
    color: ${props.color["text-tertiary-color"]} !important;}

.heading-tertiary-notif {font-family: ${props.color["text-tertiary-font"]} !important;}

.empty-text {color: ${props.color["color-primary-dark"]} !important;}

.navbar, .navmenu, .navmenu-item, .menu-decoy, .footer, .footer-column, .cart-bottom, .dark-underline {background-color: ${props.color["bg-item"]} !important;
border-image: linear-gradient(
      45deg,
      ${props.color["color-primary-dark"]},
      ${props.color["color-primary-light"]}
    )
    1 !important;}


.homepage-button, .add-categ-init, .add-prod-init, .category, .product-image, .side-img, .varItem-sub, .detail-slot, .detail-slot-carousel, .detail-slot-about, .top-notif{border-radius: ${props.color["border-tl"]} ${props.color["border-tr"]} ${props.color["border-br"]} ${props.color["border-bl"]} !important;}

.homepage-button:hover.x, .category:hover {
    filter: drop-shadow(-6px 6px 0px ${props.color["color-primary-dark"]}) !important}

.homepage-button:active.x, .category:active, .theme-pack:active {
    transform: translateY(0rem) translateX(0rem) !important;
    filter: drop-shadow(-1px 1px 0px ${props.color["color-primary-dark"]}) brightness(120%) drop-shadow(0px 0px 10px ${props.color["color-primary-light"]}) !important;}

.navitem, .image-container{border-image: linear-gradient(
      45deg,
      ${props.color["color-primary-dark"]},
      ${props.color["color-primary-light"]}
    )
    1 !important;
    background-color:${props.color["bg-item"]} !important;}

.navitem:active{
    filter: drop-shadow(-1px 1px 0px ${props.color["color-primary-dark"]}) brightness(120%) drop-shadow(0px 0px 10px ${props.color["color-primary-light"]}) !important;
    transform: scale(0.95)
}

.svg-color, input:checked + .toggle-label{
    background-image: linear-gradient(
    to right,
    ${props.color["color-primary-dark"]},
    ${props.color["color-primary-light"]}
  ) !important;}

  .sign-color {
    background-image: linear-gradient(
    270deg,
    ${props.color["color-primary-dark"]},
    ${props.color["color-primary-light"]}
  ) !important;}

  .svg-sold{
    background-image: linear-gradient(
    to right,
    #16ff00,
    #ffde00
  ) !important;}

.svg-decolor, .slick-dot{
    background-image: linear-gradient(
    to right,
    ${props.color["bg-item"]},
    ${props.color["bg-item"]}
  ) !important;}

.company-logo-med {
    border-image: linear-gradient(
      45deg,
      ${props.color["color-primary-dark"]},
      ${props.color["color-primary-light"]}
    )
    1 !important;}

.navbutton, .theme-button { background-image: linear-gradient(${props.color["bg-item"]}, ${props.color["bg-item"]}),
    linear-gradient(to right, ${props.color["color-primary-dark"]}, ${props.color["color-primary-light"]}) !important;
    filter: drop-shadow(-2px 2px 0px ${props.color["color-primary-dark"]}) !important;}

.navbutton:hover.x, .theme-button:hover {
    filter: drop-shadow(-6px 6px 0px ${props.color["color-primary-dark"]}) !important}

.navbutton:active.x, .theme-button:active {
    transform: translateY(0rem) translateX(0rem) !important;
    filter: drop-shadow(-1px 1px 0px ${props.color["color-primary-dark"]}) !important}

.navbutton__hr, .navbutton__hr::before, .navbutton__hr::after, .navbutton:hover .navbutton__hr-2, .navbutton:hover .navbutton__hr-2::after, .navbutton:hover .navbutton__hr-2::before, .add-categ-init, .add-prod-init {
    background-image: linear-gradient(${props.color["bg-item"]}, ${props.color["bg-item"]}),
    linear-gradient(to right, ${props.color["color-primary-dark"]}, ${props.color["color-primary-light"]}) !important;
}

.categ-modal, .confirm-modal, .set-container, .category, .categ-edit-button, .product-edit-button, .add-img, .help-button, .side-img, .add-prod-img, .product-image, .varItem-sub, .footer, .detail-slot, .detail-slot-about, .detail-slot-carousel, .round-borderer{
    background-image: linear-gradient(${props.color["bg-item"]}, ${props.color["bg-item"]}),
    linear-gradient(to right, ${props.color["color-primary-dark"]}, ${props.color["color-primary-light"]}) !important;}

.navbutton__hr-2, .navbutton__hr-2::before, .navbutton__hr-2::after {
    background-image: linear-gradient(to right, ${props.color["color-primary-dark"]}, ${props.color["color-primary-light"]}) !important;
}

.navmenu {
    box-shadow: 0 0 0 2px ${props.color["color-primary-dark"]}, 0 0 0 4px ${props.color["bg-item"]} !important;
}

.navmenu-logo {margin-left: 10rem !important;}

.heading-icon-dropshadow{
    filter: drop-shadow(-2px 2px 0px ${props.color["text-primary-color"]}) !important;
}

.backdrop {background-color: rgba(${primaryDarkHex.r}, ${primaryDarkHex.g}, ${primaryDarkHex.b}, 0.7) !important;}

.navmenu-item:hover, .min-button:hover {
  filter: brightness(120%) !important;
}

.add-categ-init:focus, .add-prod-init:focus, .categ-modal, .confirm-modal, .set-container, .text-full, input[type="text"].text-full:focus, .desc-text-area, input[type="text"].desc-text-area:focus, .text-small, .invalid-form, .invalid-form-2, .invalid-form-box, .detail-slot, .detail-slot-about, .detail-slot-carousel, .round-borderer-extra{
    box-shadow: inset 0 0 0 2rem ${props.color["bg-item"]}, 0 0 0 2px ${props.color["color-primary-dark"]},
    0 0 0 4px ${props.color["bg-item"]} !important;
}

.text-small-white{
box-shadow: inset 0 0 0 2rem white, 0 0 0 2px ${props.color["color-primary-dark"]},
    0 0 0 4px ${props.color["bg-item"]} !important;
}

.text-options {box-shadow: inset 0 0 0 2rem white, 0 0 0 2px ${props.color["color-primary-dark"]},
    0 0 0 4px ${props.color["bg-item"]} !important;
}

.add-button, .minus-button{
    box-shadow: 0 0 0 2px ${props.color["color-primary-dark"]},
    0 0 0 4px ${props.color["bg-item"]} !important;
}

.text-full, .desc-text-area, .add-categ-img, .text-small, .minus-button{
    background-image: linear-gradient(${props.color["bg-item"]}, ${props.color["bg-item"]}),
    linear-gradient(to right, ${props.color["color-primary-dark"]}, ${props.color["color-primary-light"]}) !important;
    filter: brightness(120%) !important
    }

.text-small-white{
    background-image: linear-gradient(white, white),
    linear-gradient(to right, ${props.color["color-primary-dark"]}, ${props.color["color-primary-light"]}) !important;
    filter: brightness(120%) !important
    }

.invalid-form, .invalid-form-2, .invalid-form-box{
    background-image: linear-gradient(${props.color["bg-item"]}, ${props.color["bg-item"]}),
    linear-gradient(to right, red, darkred) !important;
    filter: brightness(120%) !important
    }


.text-options {background-image: linear-gradient(white, white),
    linear-gradient(to right, ${props.color["color-primary-dark"]}, ${props.color["color-primary-light"]}) !important;
    filter: brightness(120%) !important
    }

    .text-options.invalid-dropdown {background-image: linear-gradient(white, white),
    linear-gradient(to right, red, darkred) !important;
    filter: brightness(120%) !important
    }

input[type="text"].text-full:focus, input[type="number"].text-small:focus, input[type="text"].text-small:focus, input[type="password"].text-small:focus, .text-options:focus, .desc-text-area:focus, .add-button:active, .minus-button:active {
    filter: brightness(150%) !important;
  outline-color: ${props.color["color-primary-dark"]} !important;
}

.text-small-white{
    filter: brightness(150%) !important;
  outline-color: ${props.color["color-primary-dark"]} !important;
}

::placeholder ${placeholder}

.invalid-form, .invalid-form-box, .invalid-form-2{
    background-image: linear-gradient(${props.color["bg-item"]}, ${props.color["bg-item"]}),
    linear-gradient(to right, red, darkred ) !important;
    filter: brightness(120%) !important
    }

.invalid-form-2.z{margin-top: 0rem !important}
.form-label.inv.z{margin-top: 0.5rem !important; transform: translateY(-0.2rem)}

.form-label.inv{
    color: red !important;
}

.categ-edit-button:active, .product-edit-button:active, .add-img:active, .help-button:active, .side-img.active-var, .varItem-sub.active-var, .car-button:active{
    filter: brightness(120%) !important;
  box-shadow: inset 0 0 0 10px ${props.color["bg-item"]}, 0 0 0 2px ${props.color["color-primary-dark"]},
    0 0 0 4px ${props.color["bg-item"]} !important;
}


.product-action-1{
    background-image: linear-gradient(${props.color["bg-item"]}, ${props.color["bg-item"]}),
    linear-gradient(to right, ${props.color["button-outline-dark"]}, ${props.color["button-outline-light"]} ) !important;
    box-shadow: inset 0 0 0 2rem ${props.color["bg-item"]} !important;
    color: ${props.color["button-outline-text"]} !important;
}

.product-action-1:active{
    filter: brightness(120%) !important;
  box-shadow: inset 0 0 0 10px ${props.color["bg-item"]}, 0 0 0 2px ${props.color["button-outline-dark"]},
    0 0 0 4px ${props.color["bg-item"]} !important;
}

.product-action-2, .product-action-2-small{
    background-image: linear-gradient(${props.color["button-solid-light"]}, ${props.color["button-solid-dark"]}),
    linear-gradient(to right, ${props.color["button-solid-dark"]}, ${props.color["button-solid-light"]} ) !important;
    color: ${props.color["button-solid-text"]} !important;
}

.product-action-2:active, .product-action-2-small:active{
    filter: brightness(120%) !important;
    box-shadow: 0 0 0 2px ${props.color["bg-item"]}, 0 0 0 4px ${props.color["button-solid-dark"]} !important;
}

.checkbox-container:hover {
    filter: brightness(120%) !important;
}

.category-content{
    background-color:${props.color["bg-item"]} !important;
}

.white{color: white !important;}

.body-color{color:${props.color["bg-item"]} !important;}
.button-solid-color{color:${props.color["button-solid-text"]} !important;}


.green{color: #285430 !important;}

.yellow{color: #3b2f01 !important;}

.red{color: #540804 !important;}

.home-label{text-align: center}

::-webkit-scrollbar {
  width: 1.2rem;
}

::-webkit-scrollbar-track {
  background-color: ${props.color["bg-item"]};
}

::-webkit-scrollbar-thumb {
  background-color: ${props.color["color-primary-dark"]};
  border-radius: 10px;
  border: 3px solid ${props.color["text-primary-color"]};
  filter: brightness(120%) !important;
}

.item-setup, .images-column, .pop-up-prev, .pop-up-img, .checkout-column{
    background-image: linear-gradient(${props.color["bg-item"]}, ${props.color["bg-item"]}),
    linear-gradient(to right, ${props.color["color-primary-dark"]}, ${props.color["color-primary-light"]}) !important;
    box-shadow: inset 0 0 0 2rem ${props.color["bg-item"]} !important;
}

.svg-down, .slick-dot.active {background-image: linear-gradient(
    to bottom,
    ${props.color["color-primary-dark"]},
    ${props.color["color-primary-light"]}
  ) !important;
  }

  .slick-dots li.slick-active button:before, .slick-dots li button:before {
    opacity: 1;
    color: ${props.color["color-primary-light"]} !important;
    transform: scale(2);
}

.slick-dots{bottom: 10px !important;}

.cartbob {
    filter: drop-shadow(-1px 1px 0px ${props.color["color-primary-dark"]}) brightness(120%) drop-shadow(0px 0px 10px ${props.color["color-primary-light"]}) !important;}

.cart-row{
    border-bottom: 5px solid ${props.color["color-primary-dark"]};
}

.dark-underline{
    border-bottom: 5px solid ${props.color["color-primary-dark"]};
}

.dark-underline-upper{
    border-top: 5px solid ${props.color["color-primary-dark"]};
}

.Mui-error{
    color: ${props.color["text-tertiary-color"]} !important;
}

.signup-progress{
    background-color: ${props.color["bg-body"]} !important;
}

.total-progress{
    background-image: linear-gradient(to left, ${props.color["color-primary-dark"]}, ${props.color["color-primary-light"]});
}

    ` }
                </style>
            </Head>

            <NavbarItems shopid={router.query.shopid} colormode={colormode} navicon={props.icons.logo} cartOpen={CartHandler} user={props.user}/>
            <CartModal modalStatus={CartStatus} cartOpen={CartHandler} currency={props.curr} user={props.user}></CartModal>
            <div>{props.children}</div>
            {router.asPath !== `/${id}/mart/details` && router.asPath !== "/" ? <Footer details={props.contents} address={props.address}></Footer> : <Fragment></Fragment>}

        </Fragment>
    );
}

export default NavbarLayout;
