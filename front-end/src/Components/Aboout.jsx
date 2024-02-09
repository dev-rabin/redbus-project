import { Container } from "react-bootstrap";
import NavbarWidget from "../Widgets/navbar";
import Footer from "../Widgets/footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faSignalMessenger } from '@fortawesome/free-brands-svg-icons'; // Import the necessary icons

function AboutPage() {
    return (
        <>
        <NavbarWidget/>
        <Container className="border my-2 p-5 shadow">
        <h1 className="text-center text-danger text-decoration-underline">About Me</h1>
        <div className="mb-5">
        <p>
        <strong>About me</strong><br/>
        Welcome to Redbus Clone ! I'm <strong>Robin Mandhotia</strong>, a passionate full-stack developer and Flutter developer. I specialize in crafting innovative digital solutions to help businesses and individuals achieve their goals.
        </p>
        <p>
        <strong>My Mission</strong><br/>
        At Redbus Clone, my mission is to provide exceptional development services that empower clients to succeed in the digital world. I believe in leveraging the latest technologies and best practices to deliver high-quality solutions that exceed expectations.
        </p>
        <p>
        <strong>What I Do</strong><br/>
        As a solo developer, I offer a comprehensive range of services to meet your development needs. From building dynamic web applications using the MERN (MongoDB, Express.js, React.js, Node.js) stack to creating seamless and intuitive mobile apps with Flutter, I have the expertise to bring your ideas to life.
        </p>
        <p>
        <strong>Get in Touch</strong><br/>
        Ready to bring your digital project to life? I'd love to hear from you! Whether you have a specific project in mind or just want to learn more about how I can help, don't hesitate to reach out.
        Contact Me to get started!
        </p>
        </div>
        <div className="text-center">
        <a href="https://github.com/dev-rabin" className="m-5 text-decoration-none text-black "><FontAwesomeIcon icon={faGithub} size="3x" color="black" /> GitHub</a>
        <a href="https://www.linkedin.com/in/robin-mandhotia-560579289?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="m-5 text-decoration-none text-black "><FontAwesomeIcon icon={faLinkedin} size="3x" color="blue" /> LinkedIn</a>
        <a href="mailto:robinmandhotia@gmail.com" className="m-5 text-decoration-none text-black "><FontAwesomeIcon icon={faSignalMessenger} size="3x" color="red" /> robinmandhotia@gmail.com</a>
        </div>
        </Container>
        <Footer/>
        </>
    )
}

export default AboutPage;
