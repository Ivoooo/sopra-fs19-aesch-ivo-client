import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { Button } from "../../views/design/Button";
import { withRouter } from "react-router-dom";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

class FailedRegister extends React.Component {
    constructor() {
        super();

        let err = "Oh no there was an error!";
        if(localStorage.getItem("error") != null) {
            err = localStorage.getItem("error");
        }

        this.state = {
            msg: err
        };
    }

    back() {
        localStorage.removeItem('error')
        this.props.history.push("/EditProfile");
    }

    render() {
        return (
            <Container>
                <h2>Oh no! </h2>
                <p>{this.state.msg}</p>
                <div>
                    <Button
                        width="50%"
                        onClick={() => {
                            this.back();
                        }}
                    >
                        Go back to editing.
                    </Button>
                </div>
            </Container>
        );
    }
}

export default withRouter(FailedRegister);
