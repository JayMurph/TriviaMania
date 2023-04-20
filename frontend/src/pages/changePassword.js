import { useState } from 'react';
import { FormTextbox, PadLabel, ErrorLabel, Button, ChangePasswordDiv, ButtonDiv } from "../StyledElements.js";
import { API_URL}  from '../App.js';
import { GetSessionUserId, GetSessionPassword, GetSessionAccessToken } from '../Storage.js';

function ChangePassword() {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorText, setErrorText] = useState("");

  const handleSubmit =  async (e) => {
    e.preventDefault();
    if (password1.length < 6 || password2.length < 6) {
      setErrorText("Invalid input!");
    }
    else if(password1 === password2){
        try {
          let res = await fetch(API_URL + "/profile/" +  GetSessionUserId, {
            method: "PUT",
            headers: { 
              "Content-Type": "application/json", 
              "Authorization": "Bearer " + GetSessionAccessToken
            },
            body: JSON.stringify({
              old_password: GetSessionPassword,
              new_password: password1
            })
          });
          if (res.status === 200) {
            setErrorText("Updated successfully");
          } else {
            setErrorText("Some error occured");
          }
        } catch (err) {
          console.log(err);
          setErrorText("Some error occured");
        }
    }else{
      setErrorText("Passwords are inconsistent");
    } 
  };

  return (
    <>
      <ChangePasswordDiv>
      <PadLabel>New password:</PadLabel>
      <FormTextbox
          type = "password"
          value={password1}
          onChange={(event) => setPassword1(event.target.value)}
      />
      
      <PadLabel>Confirm:</PadLabel>
      <FormTextbox
          type = "password"
          value={password2}
          onChange={(event) => setPassword2(event.target.value)}
      />
      
      <ButtonDiv>
            <Button onClick={handleSubmit}>Change</Button>
      </ButtonDiv>         

      <ErrorLabel>{errorText}</ErrorLabel>
      </ChangePasswordDiv>
    </>
  );
}

export default ChangePassword;