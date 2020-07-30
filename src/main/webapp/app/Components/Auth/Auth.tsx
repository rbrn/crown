import React, { useState } from 'react';
import { Button, Popover } from 'reactstrap';
import './Auth.scss';

const Auth = () => {
	const [popoverOpen, setPopoverOpen] = useState(false);

	const toggle = () => setPopoverOpen(!popoverOpen);

	return (
		<>
			<Button id='Popover1' className='header-btn shadow rounded Popover1'>SIGN UP</Button>
			<Popover placement="bottom-end" isOpen={popoverOpen} target="Popover1" toggle={toggle} trigger="hover">
				<div id="id01" className="auth">
					<form className="animate">
						<div className="container">
							<div className="clearfix mm">
								<div className="button-container">
									<button type="button" className="signin-btn">Sign In</button>
								</div>
								<div className="button-container">
									<button type="submit" className="signup-btn">Sign Up</button>
								</div>
							</div>
							<input type="text" placeholder="Username" name="email" />
							<input className='email' type="text" placeholder="Email" name="psw" />
							<input type="password" placeholder="Password" name="psw" />
							<div className='strenth'>
								<span></span>
								<span></span>
								<span></span>
								<span></span>
								<span></span>
								Password Strenth
							</div>
							<input type="password" placeholder="Confirm Password" name="psw-repeat" />
							<input type="checkbox" /><span className='terms'> I have read and agree to the <strong>Terms and Policy</strong></span>
							<button type='submit' className='login-btn'>Log In</button>
						</div>
					</form>
				</div>
			</Popover>
		</>
	);
}

export default Auth;
