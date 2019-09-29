import React from 'react'
import '../Pages/Home.css'
import Logo from "../assets/logo-alt.svg";
import Reset from "./Reset.css";
import Avatar from '../assets/avatar.jpeg'
import { Link } from 'react-router-dom'
import { Input } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { Badge } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import { Component } from 'react'
import axios from 'axios'


const api = axios.create({ baseURL: 'https://api.github.com/users/' })

class Home extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onSubmit(e) {
    var title = this.title.value;
    this.loadProfile();
  }

  onClick(e) {
    this.deleteProfile();
  }

  state = {
    profiles: [],
    isLoading: false
  }

  componentDidMount() {
    const dados = JSON.parse(localStorage.getItem('perfil'))
    this.setState({ profiles: dados })

  }

  deleteProfile = () => {
    const dado_remove = JSON.stringify(localStorage.setItem('perfil'))
    this.setState({ profiles: dado_remove })
  }

  loadProfile = async () => {
    try {
      const profiles = this.state.profiles;
      const response = await api.get(`${this.title.value}`)
      profiles.push(response.data)
      this.setState({ profiles: profiles })
      localStorage.setItem('perfil', JSON.stringify(this.state.profiles))

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
            <form autoComplete="off">
              <input
                ref={c => (this.title = c)}
                name="title"
                type="text"
                icon="user"
                iconPosition='left'
                placeholder="Usuário do GitHub"
                autoComplete="false"
              />
            </form>
            <button
              onClick={this.onSubmit}
              className="button-blue"
              type="button"
            >
              ADICIONAR
            </button>
          </div>

          <hr></hr>

          {this.state.isLoading &&
            <span>Aguarde, carregando...</span>
          }
          <div className="users">


            {profiles.map(profile =>
              <Card className="e-card" key={profile.login}>
                <div className="details">

                  <CardContent className="content">
                    <Typography component="h5" variant="h5">
                      {profile.name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {profile.blog}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      <Link style={{ textDecoration: 'none', color: '#A2A7AC', fontstyle: 'italic' }} to="google.com">Repositorios :</Link> {profile.public_repos}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      <Link style={{ textDecoration: 'none', color: '#A2A7AC', fontstyle: 'italic' }} to="google.com">Seguidores :</Link> {profile.followers}
                    </Typography>
                    <Button onClick={this.onClick} icon='trash' size='mini' floated='left'></Button>

                    <a href={profile.repos_url}><Button color='blue' icon='linkify' size='mini' floated='right'>Repositorios</Button></a>


                  </CardContent>
                </div>
                <CardMedia
                  className="cover"
                  image={profile.avatar_url}
                  title="Live from space album cover"
                />
              </Card>

            )}
          </div>
        </div>
      </div >
    );
  }
}

export default Home;
