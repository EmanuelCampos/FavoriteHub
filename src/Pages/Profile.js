import React from 'react'
import '../Pages/Home.css'
import Logo from "../assets/logo-alt.svg";
import Home from './Home'
import Reset from "./Reset.css";
import Avatar from '../assets/avatar.jpeg'
import { Link } from 'react-router-dom'
import { Input } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import { withRouter } from 'react-router';

import { Card, Icon, Image } from 'semantic-ui-react'

import { Component } from 'react'
import axios from 'axios'


const api = axios.create({ baseURL: 'https://api.github.com/users' })

class Profile extends Component {
    state = {
        profiles: [],
        isLoading: false
    }

    componentDidMount() {

        this.loadProfile();

    }

    loadProfile = async () => {
        try {
            const profiles = this.state.profiles;
            const response = await api.get(this.props.location.pathname)
            profiles.push(response.data)
            this.setState({ profiles: profiles })
        } catch {
            alert("Error, tente novamente.")
        }

    }




    render() {
        const { profiles } = this.state;
        return (
            <div className="container">
                <div className="box">
                    <div className="box-itens">
                        <img src={Logo}></img>
                    </div>

                    <hr></hr>

                    <div className="users">

                        <Link to="/"><Button
                            color='white'
                            content='Voltar'
                            icon='arrow left'
                            floated='left'

                        />
                        </Link>

                        {profiles.map((profile, id) =>

                            <Card>
                                <Image src={profile.avatar_url} wrapped ui={false} />
                                <Card.Content>
                                    <Card.Header>{profile.name}</Card.Header>
                                    <Card.Meta>
                                        <span className='date'>{profile.blog}</span>
                                    </Card.Meta>
                                    <Card.Description>
                                        {profile.bio}
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>

                                    <Icon name='folder' />
                                    {profile.public_repos} Repositorios

                                </Card.Content>
                            </Card>




                        )}
                    </div>
                </div>
            </div>

        );
    }
}


export default withRouter(Profile)
