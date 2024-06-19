import React from 'react';
import './css/Footer.css'; // Import the CSS file for styling

const Footer = ({dbpath,setHfvisibility}) => {
  return (
   <>
       <div class="copyrights hf-hide" style={{color:"black", fontWeight:'500', borderTop:'1px solid rgb(67,35,130)'}}>
        <div class="container-fluid">
            <div class="footer-distributed">
                <div class="footer-left">
                    <p class="footer-links">
                        <a href="#">Home</a>
                        <a href="#">Blog</a>
                        <a href="#">Pricing</a>
                        <a href="#">About</a>
                        <a href="#">Faq</a>
                        <a href="#">Contact</a>
                    </p>
                    <p class="footer-company-name" style={{color:"black", fontWeight:'400'}}>All Rights Reserved. &copy; 2023 <a href="#"></a> Design By : 
					<a href="http://royalswebtechpvtltd.com/" style={{color:'rgb(67,35,130)', fontWeight:'600'}}>  Royals Webtech Pvt. Ltd.</a></p>
                </div>
            </div>
        </div> {/* <!-- end container --> */}
    </div> {/* <!-- end copyrights --> */}

    <a href="#" id="scroll-to-top" class="dmtop global-radius"><i class="fa fa-angle-up"></i></a>
   </>
  );
};
 
export default Footer;