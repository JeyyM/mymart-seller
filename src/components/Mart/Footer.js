import Link from "next/link"
import { useRouter } from "next/router"

export default function Footer(props) {
    const router = useRouter()
    const numbers = props.details.shopPhone
    const emails = props.details.shopEmails
    const socials = props.details.shopSocials
    const additional = props.details.additionalLinks
    const about = props.details.footerAbout
    const location = props.details.shopLocation

    return <footer className="footer">
        <div className="footer-column">
            <h3 className="heading-tertiary"><strong>Address</strong></h3>
            {/* <h3 className="heading-tertiary">{`${address.street}, ${address.city}, ${address.region}, ${address.zip}, ${address.country},`}</h3> */}
            {location.length !== 0 ? <h3 className="heading-tertiary">{location}</h3> : <h3 className="heading-tertiary">-</h3>}


            <br></br>

            <h3 className="heading-tertiary"><strong>Phone Numbers</strong></h3>
            {numbers.length === 0 ? <h3 className="heading-tertiary">-</h3> : ""}
            {numbers.map((num, index) => {
                return <h3 key={index} className="heading-tertiary">{num}</h3>;
            })}
        </div>
        <div className="footer-column">
            <h3 className="heading-tertiary"><strong>Emails</strong></h3>
            {emails.length === 0 ? <h3 className="heading-tertiary">-</h3> : ""}
            {emails.map((email, index) => {
                return <h3 key={index} className="heading-tertiary">{email}</h3>;
            })}

            <br></br>

            <h3 className="heading-tertiary"><strong>Social Media</strong></h3>
            <div className="socials-container">
                {socials.length === 0 ? <h3 className="heading-tertiary">-</h3> : ""}
                {socials.map((index) => {
                    return <Link key={index.link} href={index.link} target="_blank">
                        <img className="social-icon" src={`/home/${index.type}.webp`} alt={index.type}></img>
                    </Link>
                })}
            </div>
        </div>

        <div className="footer-column">
        <h3 className="heading-tertiary"><strong>Important Links</strong></h3>
            <Link style={{textDecoration:"none"}} href={`/${router.query.shopid}/faq`} className="heading-tertiary">FAQ</Link>
            <Link style={{textDecoration:"none"}} href={`/${router.query.shopid}/about`} className="heading-tertiary">About</Link>
            <Link style={{textDecoration:"none"}} href={`/${router.query.shopid}/policies`} className="heading-tertiary">Terms of Service</Link>
            <Link style={{textDecoration:"none"}} href={`/${router.query.shopid}/policies/privacy`} className="heading-tertiary">Privacy Policy</Link>
            <h3 className="heading-tertiary">Customer Service</h3>

            <br></br>

            <h3 className="heading-tertiary"><strong>Additional Links</strong></h3>
            {additional.length === 0 ? <h3 className="heading-tertiary">-</h3> : ""}
            {additional.map((index) => {
                return <a key={index.label} className="heading-tertiary" href={index.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>{index.label}</a>;
            })}
        </div>
        <div className="footer-column">
            {about.footerImg === "" ? <h3 className="heading-tertiary">-</h3> : <img src={about.footerImg} className={about.borderless ? "footer-img" : "footer-img round-borderer"} alt="Mart Footer Logo"></img>}

            <br></br>

            {about.footerMessage === "" ? <h3 className="heading-tertiary">-</h3> : <h3 className="heading-tertiary">{about.footerMessage}</h3>}

        </div>
        <h3 className="heading-tertiary" style={{ gridColumn: "1/-1", justifySelf: "center" }}><strong>Copyright &copy; YEAR Company Name</strong></h3>
    </footer>
}