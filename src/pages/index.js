import { Fragment } from "react"
import Head from "next/head"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import sha256 from 'crypto-js/sha256';
import { MongoClient } from "mongodb"

function SignUp(props) {
    const router = useRouter()

    const [currentStep, setCurrentStep] = useState(1);
    // const localStorageKey = `mart_${martID.shopID._id}`;
    let emailList = props.shopCollection.filter(item => item.email?.toLowerCase().trim()).map(item => ({
        email: item.email,
        password: item.password,
        id: item._id
      }));
  
    const [loading, setLoading] = useState(false)
    const [completion, setCompletion] = useState(false)

    const checkmark = (
        <svg viewBox="0 0 100 100" width="7rem" height="7rem">
            <path id="checkmark" d="M25,50 L40,65 L75,30" stroke="#FFFFFF" strokeWidth="8" fill="none"
                strokeDasharray="200" strokeDashoffset="200">
                <animate attributeName="stroke-dashoffset" from="200" to="0" dur="0.5s" begin="indefinite" />
            </path>
        </svg>
    )

    function waitSeconds() {
        return new Promise(resolve => setTimeout(resolve, 2000));
    }

    async function hashString(data) {
        const hashHex = sha256(data).toString();
        return hashHex;
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const appear = {
        hidden: {
            transform: "scale(0)",
            opacity: 0,
        },
        visible: {
            transform: " scale(1)",
            opacity: 1,
            transition: {
                duration: 0.2,
            },
        },
        exit: {
            transform: "scale(0)",
            opacity: 0,
            transition: {
                duration: 0.2,
            },
        },
    };

    const [email, setEmail] = useState("");
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const [password, setPassword] = useState("");
    const handlePassChange = (event) => {
        setPassword(event.target.value);
    };

    const [signValidity, setSignValidity] = useState({
        email: true,
        existing: true,
        pass: true,
        correct: true
    });

    let chosenAcc

    const accountValidate = async (event) => {

        let emailValid = true
        let passValid = true
        let emailExist = false
        let correctInput = false

        emailValid = email.trim() !== ""
        passValid = password.trim() !== ""
        emailExist = emailList.some((item) => item.email.toLowerCase() === email.toLowerCase());        
        const emailIndex = emailList.findIndex((item) => item.email.toLowerCase() === email.toLowerCase());        

        if (!emailExist) {
            emailValid = false
        }

        chosenAcc = emailList[emailIndex]
        

        if (chosenAcc && chosenAcc.password === await hashString(password)){
            correctInput = true
        }

        setSignValidity({
            email: emailValid,
            pass: passValid,
            existing: emailExist,
            correct: correctInput
        })

        const submissionValid = emailValid && passValid && emailExist && correctInput

        if (submissionValid) {
            signIn()
        }

    };

    //       async function passcheck(pass) {
    //     if ( typeof window !== 'undefined'){
    //     const response = await fetch(
    //       `../../../api/read-cart?martid=${router.query.shopid}&email=${email.toLowerCase()}&password=${pass}`,
    //       {
    //         method: "GET",
    //         headers: { "Content-Type": "application/json" },
    //       }
    //     );
    //     const data = await response.json();
    //     return data.shopAccount
    //     }
    //   }

    async function signIn(){
            const authKey = `authAdmin_${chosenAcc.id}`;
            const authData = {email: email.toLowerCase(), password: await hashString(password)}
            localStorage.setItem(authKey, JSON.stringify(authData));
            setLoading(true)
            await waitSeconds();
            setLoading(false)
            setCompletion(true)
            router.push(`/${chosenAcc.id}`).then(() => window.location.reload())
    }

    const emailClasses = `${signValidity.email ? "text-small input-number" : "invalid-form-2 z"}`;
    const passClasses = `${signValidity.pass ? "text-small input-number" : "invalid-form-2 z"}`;

    return (
        <>
            <Head>
                <title>Log-In</title>
                <link rel="icon" type="image/jpeg" href="/light.png" />
            </Head>
            <div className="main-signup-container">

                {currentStep === 1 && <AnimatePresence> <motion.div
                    key={currentStep}
                    className="sign-up-box round-borderer round-borderer-extra"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={{
                        hidden: { scale: 0 },
                        visible: { scale: 1 },
                        exit: { scale: 0 },
                    }}
                    transition={{ duration: 0.2 }}
                    style={{margin:"auto", marginTop:"20vh"}}
                ><div className="sign-step">
                        <img src="/light-2.png" className="mymart-pic" style={{ margin: "0", marginBottom: "1rem" }}></img>

                        <h2 className="heading-secondary">Log-In to Admin</h2>

                        <div className="form-group" style={{ marginTop: "1rem" }}>
                            <input
                                type="text"
                                className={emailClasses}
                                placeholder="Email"
                                autoComplete="off"
                                style={{ width: "100%" }}
                                value={email}
                                onChange={handleEmailChange}
                            ></input>
                            {signValidity.email && signValidity.existing ? <h3 className="form-label">Email</h3> : !signValidity.existing ? <h3 className="form-label inv z">Email does not exist</h3> : <h3 className="form-label inv z">Input a valid email</h3>}

                        </div>
                        <div className="form-group" style={{ marginTop: "0.5rem" }}>
                            <input
                                type="password"
                                className={passClasses}
                                placeholder="Password"
                                autoComplete="off"
                                style={{ width: "100%" }}
                                value={password}
                                onChange={handlePassChange}
                            ></input>
                            {signValidity.pass && signValidity.correct ? <h3 className="form-label">Password</h3> : !signValidity.correct ? <h3 className="form-label inv z">Wrong password</h3> : <h3 className="form-label inv z">Input a valid password</h3>}

                        </div>

                        <div className="form-group" style={{ marginTop: "0.5rem" }}>
                            {/* <button className="product-action-2 flex-row-align sign-page-button" onClick={accountValidate} disabled={loading}>{loading ? <div className="spinner"></div> : (completion ? <div style={{transform:"translateY(20%)"}}>{checkmark}</div> : <h2 className="heading-secondary button-solid-text">Log-in</h2>)}</button> */}
                            <button className="product-action-2 heading-secondary" type="button" style={{ margin: "0 auto", width: "22rem", height: "6rem", display: "block" }} disabled={loading} onClick={accountValidate}>{loading ? <div className="spinner"></div> : (completion ? <div>{checkmark}</div> : "Log-In")}</button>


                        </div>
                        {/* <a className="heading-tertiary" style={{ margin: "1rem auto" }} href={`/${id}/signup`}>Sign-up?</a> */}
                        <a href="/64b7787af81c8adaa29eae4b" className="heading-secondary" style={{marginTop:"1rem"}}>Shop 1</a>

                    </div>
                </motion.div> </AnimatePresence>}
            </div>
        </>
    );
}

export default SignUp

export async function getServerSideProps({ params }) {
    try {
      const client = await MongoClient.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      const db = client.db();
      const shopCollection = await db.collection("shops").find({}).toArray();

      shopCollection.forEach((doc) => {
        doc._id = doc._id.toString();
      });
  
      client.close();
  
      return {
        props: { shopCollection },
      };
    } catch (error) {
      console.error(error);
      return {
        props: {},
      };
    }
  }
  
  