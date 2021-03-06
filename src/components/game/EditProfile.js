import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import User from "../shared/models/User";
import { withRouter } from "react-router-dom";
import { Button } from "../../views/design/Button";
import Profile from "./Profile";
import Game from "./Game";
import FailedRegister from "../register/FailedRegister";

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  height: 375px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background: linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

/**
 * Classes in React allow you to have an internal state within the class and to have the React life-cycle for your component.
 * You should have a class (instead of a functional component) when:
 * - You need an internal state that cannot be achieved via props from other parent components
 * - You fetch data from the server (e.g., in componentDidMount())
 * - You want to access the DOM via Refs
 * https://reactjs.org/docs/react-component.html
 * @Class
 */

class EditProfile extends React.Component {
    /**
     * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
     * The constructor for a React component is called before it is mounted (rendered).
     * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: name and username
     * These fields are then handled in the onChange() methods in the resp. InputFields
     */
    constructor() {
        super();
        this.state = {
            birthday: null,
            username: null,
            toProfile: false,
            user: null,
            profileUser: null
        };
    }
    /**
     * HTTP POST request is sent to the backend.
     * If the request is successful, a new user is returned to the front-end and its token is stored in the localStorage.
     */

    edit() {
        let id = localStorage.getItem("id");
        fetch(`${getDomain()}/users/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: localStorage.getItem("id"),
                username: this.state.username,
                birthday: this.state.birthday,
                token: localStorage.getItem("token"),
                password: localStorage.getItem("password")
            })
        })
            .then(async response => {
                if(!response.ok) {
                    throw await response.json();
                } else {
                    this.newProfile()
                }
            })
            .catch(err => { /*
                if (err.message.match(/Failed to fetch/)) {
                  alert("The server cannot be reached. Did you start it?");
                } else {
                  alert(`Something went wrong during the login: ${err.message}`);
                }*/
                localStorage.setItem("error", err.message);
                this.props.history.push(`/editProfileFail`);
            });
    }

    newProfile() {
        //success
        fetch(`${getDomain()}/users/${localStorage.getItem("id")}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(response => response.json())
            .then(returnedUser => {
                localStorage.setItem("birthday", returnedUser.birthday);
                localStorage.setItem("username", returnedUser.username);
                this.return();
            })
            .catch(err => {
                if (err.message.match(/Failed to fetch/)) {
                    alert("The server cannot be reached. Did you start it?");
                } else {
                    alert(`Something went wrong during the login: ${err.message}`);
                }
            })
    }


    return() {
        this.props.history.push(`/game`);
    }

    /**
     *  Every time the user enters something in the input field, the state gets updated.
     * @param key (the key of the state for identifying the field that needs to be updated)
     * @param value (the value that gets assigned to the identified state key)
     */
    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    /**
     * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
     * Initialization that requires DOM nodes should go here.
     * If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
     * You may call setState() immediately in componentDidMount().
     * It will trigger an extra rendering, but it will happen before the browser updates the screen.
     */
    componentDidMount() {}

    render() {
        return (
            <BaseContainer>
                <FormContainer>
                    <Form>
                        <Label>New Username</Label>
                        <InputField
                            placeholder="Enter here.."
                            onChange={e => {
                                this.handleInputChange("username", e.target.value);
                            }}
                        />
                        <Label>New Birthday</Label>
                        <InputField
                            placeholder="YYYY-MM-DD please.."
                            onChange={e => {
                                this.handleInputChange("birthday", e.target.value);
                            }}
                        />
                        <ButtonContainer>
                            <Button
                                disabled={!this.state.username && !this.state.birthday}
                                width="50%"
                                onClick={() => {
                                    this.edit();
                                }}
                            >
                                Change Profile
                            </Button>
                            <Button
                                width="50%"
                                onClick={() => {
                                    this.return();
                                }}
                            >
                                Return
                            </Button>
                        </ButtonContainer>
                    </Form>
                </FormContainer>
            </BaseContainer>
        );
    }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(EditProfile);
