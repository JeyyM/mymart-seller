import Link from "next/link"

export default function Footer(props) {

    const address = props.address.shopAddress
    const numbers = props.details.shopPhone
    const emails = props.details.shopEmails
    const socials = props.details.shopSocials
    const additional = props.details.additionalLinks
    const about = props.details.footerAbout
    console.log(props.details, props.address)


    return <footer className="footer">
        <div className="footer-column">
            <h3 className="heading-tertiary"><strong>Address</strong></h3>
            <h3 className="heading-tertiary">{`${address.street}, ${address.city}, ${address.region}, ${address.zip}, ${address.country},`}</h3>

            <br></br>

            <h3 className="heading-tertiary"><strong>Phone Numbers</strong></h3>
            {numbers.map((num, index) => {
                return <h3 key={index} className="heading-tertiary">{num}</h3>;
            })}
        </div>
        <div className="footer-column">
            <h3 className="heading-tertiary"><strong>Emails</strong></h3>
            {emails.map((email, index) => {
                return <h3 key={index} className="heading-tertiary">{email}</h3>;
            })}

            <br></br>

            <h3 className="heading-tertiary"><strong>Social Media</strong></h3>
            <div className="socials-container">
            {socials.map((index) => {
                return <Link key={index.link} href={index.link} target="_blank">
                <img className="social-icon" src={`/socials/${index.type}.webp`}></img>
                </Link>
            })}
            </div>;
        </div>

        <div className="footer-column">
            <h3 className="heading-tertiary"><strong>Important Links</strong></h3>
            <h3 className="heading-tertiary">About</h3>
            <h3 className="heading-tertiary">FAQ</h3>
            <h3 className="heading-tertiary">Terms of Service</h3>
            <h3 className="heading-tertiary">Privacy Policy</h3>
            <h3 className="heading-tertiary">Customer Service</h3>

            <br></br>

            <h3 className="heading-tertiary"><strong>Additional Links</strong></h3>
            {additional.map((index) => {
                return <a key={index.label} className="heading-tertiary" href={index.link} style={{textDecoration: "none"}}>{index.label}</a>;
            })}
        </div>
        <div className="footer-column">
            <img src={about.footerImg} className="footer-img"></img>

            <br></br>

        <h3 className="heading-tertiary">{about.footerMessage}</h3>
        </div>
        <h3 className="heading-tertiary" style={{gridColumn:"1/-1", justifySelf:"center"}}><strong>Copyright &copy; YEAR Company Name</strong></h3>
    </footer>
}

