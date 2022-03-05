import * as React from 'react';
//import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
//import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './NewMemberForm.css';
import { Box, Button } from '@mui/material';
import axios from 'axios';

const NewMemberForm = ({open, setOpen, addMember}) => {
		const [formState, setFormState] = React.useState({
			firstName: "",
			lastName: "",
			title: "",
			story: "",
			favoriteColor:"",
			photoUrl: ""
		});

		const requiredFields = [
			'firstName','lastName','title','story', 'favoriteColor'
		];

		const buttonStyle = {
			paddingTop: '10px',
			float: 'right',
		};

		const isFormValid = () => {
			return requiredFields.every(field => {
					return formState[field] !== "" && formState[field] !== null && formState[field] !== undefined;
			});
		}
		
		const handleClose = () => {
			setOpen(false);
		};

		const handleClick = () => {
			registerMember(formState).then(response => {
				setOpen(false);
				addMember(response.data);
			});
		};

		async function registerMember(data) {
			let response = await axios.post('/newmember',data);

			return response;
		};

		const handleChange = (event) => {
			const fieldName = event.target.name;
			const value = event.target.value;
			setFormState((formState) => ({
				...formState,
				[fieldName] : value
			}));
		};

    return (
        <div>
					<Dialog open={open} onClose={handleClose}>
						<DialogTitle>New Member</DialogTitle>
						<DialogContent>
							<DialogContentText>Fill out your information below.</DialogContentText>
							<Box
								sx={{
									'& .MuiTextField-root': { m: 1, width: '30ch' },
								}}
								autoComplete="off"
								component="form"
							>
							<TextField
								label="First Name"
								name="firstName"
								id='firstName'
								variant='filled'
								required
								onChange={handleChange}
							/>
							<TextField
								label="Last Name"
								name="lastName"
								id="lastName"
								variant='filled'
								required
								onChange={handleChange}
							/>
							<TextField
								label="Title"
								name="title"
								id="title"
								variant='filled'
								required
								onChange={handleChange}
							/>
							<TextField
								label="Story"
								name="story"
								id="story"
								multiline
								rows={4}
								variant='filled'
								required
								onChange={handleChange}
							/>
							<TextField
								label="Favorite Color"
								name="favoriteColor"
								id="favoriteColor"
								variant='filled'
								required
								onChange={handleChange}
							/>
							<TextField
								label ="Photo Url"
								name="photoUrl"
								id="photoUrl"
								variant='filled'
								onChange={handleChange}
							/>
						</Box>
						<div style={buttonStyle}><Button variant='contained' onClick={handleClick} disabled={!isFormValid()}>Submit</Button></div>
						</DialogContent>
					</Dialog>
        </div>
    )

};

export default NewMemberForm;