import mainLogo from '../shared/images/Not_A_Whale.png';
import Image from "next/image";

export const Footer = () => {
    return (
        <footer className="footer p-10 bg-base-200 text-base-content xs:flex xs:flex-col xs:items-center md:flex-row">
            <aside>
                <Image src={mainLogo} alt="main logo" width="100" height="100"/>
                <p>Mykyta Korniienko<br/>Web vyvojar z 2018</p>
            </aside>
            <nav className="md:ml-10">
                <header className="footer-title">Kontakty</header>
                <a className="link link-hover" href="https://www.facebook.com/nikita.kornienko.9">Facebook</a>
                <a className="link link-hover" href="https://www.instagram.com/kornienko7751">Instagram</a>
                <a className="link link-hover" href="https://www.linkedin.com/in/nikita-kornienko-29379215b">Linkedin</a>
                <a className="link link-hover" href="https://github.com/Not-a-whale">Github</a>
            </nav>
        </footer>
    )
}