import React from 'react'
import '../components/css/Home.css'
import { useEffect } from 'react';
export default function Home({dbpath,vsb}) {
  
	
	useEffect(() => {
		vsb('1');
	  }, []);  

	return (
    <>
	
    {/* <!-- Navigation --> */}
	
	<section id="home" class="main-banner">
		
		<div class="slider-new-2  owl-theme">
				
			<div class="item slider-screen">
				<div class="slider-img-full">
					<img src="uploads/slider-01.jpg" style={{width:'100%'}} alt="" />
				</div>
				<div class="container">
					<div class="slider-content text-white">
						<div class="in-box">
							<h2>DHAROHAR</h2>
							<p>Timeless Treasures: Embrace the Extraordinary Elegance of the Past</p>
							<a class="btn-slider js-scroll-trigger hvr-rectangle-out" href="#contact">Contact Us</a>
						</div>
					</div>
				</div>
			</div>	
			
		</div>
	</section>
	
	
{/* 
    <div id="about" class="section lb">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6">
                    <div class="message-box">                        
                        <h2>Welcome to Dharohar - The Vintage Shop</h2>
                        <p> Integer rutrum ligula eu dignissim laoreet. Pellentesque venenatis nibh sed tellus faucibus bibendum. Sed fermentum est vitae rhoncus molestie. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed vitae rutrum neque. Ut id erat sit amet libero bibendum aliquam. Donec ac egestas libero, eu bibendum risus. Phasellus et congue justo. </p>
						<p>Sed vitae rutrum neque. Ut id erat sit amet libero bibendum aliquam. Donec ac egestas libero, eu bibendum risus. Phasellus et congue justo.</p>
						<p>Donec dictum erat eu nisi gravida efficitur. Nulla eu orci quis ante ullamcorper congue ac ac libero. Quisque varius lorem in urna dapibus, ut ullamcorper dolor aliquam. Nulla facilisi. Integer sagittis, tortor eu tempor convallis, tortor lacus interdum lacus, in pharetra orci sapien id ipsum. Donec ullamcorper, ligula sit amet mattis laoreet, dui tellus volutpat felis, id bibendum urna diam a justo.</p>
						<ul>
							<li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
							<li>Nullam ut massa id odio imperdiet consequat.</li>
							<li>Cras ullamcorper nisi eget condimentum aliquet. </li>
							<li>Cras id libero iaculis, sodales ligula vitae, egestas odio.</li>
							<li>Aenean congue ex et bibendum porta.</li>
						</ul>
                        <a href="#" class="sim-btn hvr-rectangle-out"><span>Contact Us</span></a>
                    </div> */}{/* <!-- end messagebox --> */}
                {/*</div>*/}  {/* <!-- end col --> */} 

             {/*}   <div class="col-md-6">
                    <div class="right-box-pro wow fadeIn">
                        <img src="uploads/about_04.jpg" alt="" class="img-fluid img-rounded" />
                    </div>
                </div> 
            </div>
        </div> 
    </div> */}
	
	{/*
	<div class="section cont-box">
		<div class="container-fluid">
			<div class="row">
				<div class="col-lg-3 col-sm-6 col-xs-12">
					<div class="inner-cont-box">
						<i class="flaticon-projector-screen"></i>
						<h3 class="counter-number">8000</h3>
						<h4>Project Done</h4>
					</div>
				</div>
				<div class="col-lg-3 col-sm-6 col-xs-12">
					<div class="inner-cont-box">
						<i class="flaticon-alarm-clock"></i>
						<h3 class="counter-number">3000</h3>
						<h4>Time Of Work</h4>
					</div>
				</div>
				<div class="col-lg-3 col-sm-6 col-xs-12">
					<div class="inner-cont-box">
						<i class="flaticon-idea"></i>
						<h3 class="counter-number">2000</h3>
						<h4>Ideas</h4>
					</div>
				</div>
				<div class="col-lg-3 col-sm-6 col-xs-12">
					<div class="inner-cont-box">
						<i class="flaticon-review"></i>
						<h3 class="counter-number">5000</h3>
						<h4>Client</h4>
					</div>
				</div>
			</div>
		</div>
	</div>
	
    <div id="services" class="section lb">
        <div class="container-fluid">
            <div class="section-title text-center">
                <h3>Services</h3>
                <p>Quisque eget nisl id nulla sagittis auctor quis id. Aliquam quis vehicula enim, non aliquam risus.</p>
            </div> */} {/* <!-- end title --> */}

           {/* <div class="row">
				<div class="col-md-4">
                    <div class="services-inner-box">
						<div class="ser-icon">
							<i class="flaticon-seo"></i>
						</div>
						<h2>Web Development</h2>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
					</div>
                </div>*/} {/* <!-- end col --> */}
                {/*  <div class="col-md-4">
                    <div class="services-inner-box">
						<div class="ser-icon">
							<i class="flaticon-development"></i>
						</div>
						<h2>Responsive Design</h2>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
					</div>
                </div>  */} {/* <!-- end col --> */}
				{/*  <div class="col-md-4">
                    <div class="services-inner-box">
						<div class="ser-icon">
							<i class="flaticon-process"></i>
						</div>
						<h2>Creative Design</h2>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
					</div>
                </div>  */} {/* <!-- end col --> */}
				{/* <div class="col-md-4">
                    <div class="services-inner-box">
						<div class="ser-icon">
							<i class="flaticon-discuss-issue"></i>
						</div>
						<h2>Support</h2>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
					</div>
                </div> */} {/* <!-- end col --> */}
				{/* <div class="col-md-4">
                    <div class="services-inner-box">
						<div class="ser-icon">
							<i class="flaticon-idea"></i>
						</div>
						<h2>Web Idea</h2>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
					</div>
                </div> */} {/* <!-- end col --> */}
				{/* <div class="col-md-4">
                    <div class="services-inner-box">
						<div class="ser-icon">
							<i class="flaticon-idea-1"></i>
						</div>
						<h2>Graphic Design</h2>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
					</div>
                </div> 
            </div>
        </div> 
    </div>  */}
    <div id="contact" class="section db">
        <div class="container-fluid">
            <div class="section-title text-center">
                <h3>Contact</h3>
                <p>Quisque eget nisl id nulla sagittis auctor quis id. Aliquam quis vehicula enim, non aliquam risus.</p>
            </div> {/* <!-- end title --> */}

            <div class="row">
                <div class="col-md-12">
                    <div class="contact_form">
                        <div id="message"></div>
                        <form id="contactForm" name="sentMessage" novalidate="novalidate">
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<input class="form-control" id="name" type="text" placeholder="Your Name" required="required" data-validation-required-message="Please enter your name." />
										<p class="help-block text-danger"></p>
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<input class="form-control" id="email" type="email" placeholder="Your Email" required="required" data-validation-required-message="Please enter your email address." />
										<p class="help-block text-danger"></p>
									</div>
								</div>
								<div class="col-md-12">
									<div class="form-group">
										<input class="form-control" id="phone" type="tel" placeholder="Your Phone" required="required" data-validation-required-message="Please enter your phone number." />
										<p class="help-block text-danger"></p>
									</div>
								</div>
								<div class="col-md-12">
									<div class="form-group">
										<textarea class="form-control" id="message" placeholder="Your Message" required="required" data-validation-required-message="Please enter a message."></textarea>
										<p class="help-block text-danger"></p>
									</div>
								</div>
								<div class="clearfix"></div>
								<div class="col-lg-12 text-center">
									<div id="success"></div>
									<button id="sendMessageButton" class="sim-btn hvr-rectangle-out" data-text="Send Message" type="submit">Send Message</button>
								</div> 	
							</div>
						</form>
                    </div>
                </div> {/* <!-- end col --> */}
            </div> {/* <!-- end row --> */}
        </div> {/* <!-- end container --> */}
    </div> {/* <!-- end section --> */}
    </>
  )
}
