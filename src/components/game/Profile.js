import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import Player from "../../views/Player";
import { Spinner } from "../../views/design/Spinner";
import { Button } from "../../views/design/Button";
import { withRouter } from "react-router-dom";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
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

const Users = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null,
        };
    }

    back() {
        this.props.history.push("/game");
    }

    render() {
        if (this.props.user.birthday == null) {
            this.bday = "Birthday not defined yet"
        } else {
            this.bday = this.props.user.birthday
        }

        return (
            <Container>
                <h2>Profile Page</h2>
                <p>Here are the user's infos:</p>

                <Users>
                    <PlayerContainer>
                        Username
                    </PlayerContainer>
                    {this.props.user.username}
                </Users>
                <Users>
                    <PlayerContainer>
                        Status
                    </PlayerContainer>
                    {this.props.user.status}
                </Users>
                <Users>
                    <PlayerContainer>
                        Creation Date
                    </PlayerContainer>
                    {this.props.user.creationDate}
                </Users>
                <Users>
                    <PlayerContainer>
                        Birthday
                    </PlayerContainer>
                    {this.bday}
                </Users>
                <Button
                    width="100%"
                    onClick={() => {
                        this.back();
                    }}
                >
                    Get back
                </Button>
            </Container>

        );
    }
}

export default withRouter(Profile);
