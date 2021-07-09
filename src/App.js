import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
// import Clarifai from 'clarifai';
import './App.css';

const particlesOptions = {
    particles: {
      number: {
        value:100,
        density:{
          enable:true,
          value_area:800
        }
      }
    }
  }
  // `c0c0ac362b03416da06ab3fa36fb58e3`
const initialState = {
  input:'',
  imageUrl:'',
  box:{},
  currentPhrase:", y",
  route:'signin',
  isSignedIn: false,
  user : {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user:{
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data,numberofFaces)=>{
    const clarifaiFace = data.outputs[0].data.regions;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    let tempBox = {}
    for (let i=0;i<numberofFaces;i++){
      let currentFace = clarifaiFace[i].region_info.bounding_box
      tempBox[i] = {
            leftCol :currentFace.left_col*width,
            topRow:currentFace.top_row*height,
            rightCol:width-(currentFace.right_col*width),
            bottomRow:height-(currentFace.bottom_row*height)
      }
    }
          return tempBox 
  }

  displayFaceBox = (box) => {
    this.setState({box:box});
  }

  onInputChange = (event) => {
      this.setState({input:event.target.value})
  }

  onSubmit = () => {
    let numberofFaces = 0;
    if (this.state.input){
      this.setState({imageUrl:this.state.input});
        fetch(`https://secure-anchorage-68689.herokuapp.com/imageurl`,{
          method:'post',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({
            input:this.state.input
          })
        })
    
    .then(response => response.json())
    .then(response=> {
      if (response.outputs[0].data.regions){
        numberofFaces = response.outputs[0].data.regions.length
        this.displayFaceBox(this.calculateFaceLocation(response,response.outputs[0].data.regions.length))
        if (numberofFaces===1){
          this.setState({currentPhrase:`, you added ${numberofFaces} face. Y`})
        }else{
          this.setState({currentPhrase:`, you added ${numberofFaces} faces. Y`})
        }
      }else {
        this.setState({box:{}})
        this.setState({currentPhrase:', y'})
      }
      if (response!="Unable to work with API"){
        fetch(`https://secure-anchorage-68689.herokuapp.com/image`,{
          method:'put',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({
            id:this.state.user.id,
            currentFaceCount:numberofFaces
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
          this.setState({input:''})
        })
        .catch(console.log)
      }
    })
    .catch(err=>console.log(err))
  }
}

  onRouteChange = (route) => {
    if (route === 'home'){
      this.setState({isSignedIn: true})
    }else {
      this.setState(initialState)
    }
    this.setState({route : route});
  }

  render() {
    const {isSignedIn, imageUrl, route, box} = this.state;
    return (
    <div className="App">
      <Particles className = 'particles'
                params={particlesOptions} />
      <Navigation onRouteChange = {this.onRouteChange} isSignedIn = {isSignedIn}/>
      {route === 'home'
        ? <div>
            <Logo />
            <Rank name = {this.state.user.name} entries = {this.state.user.entries} currentPhrase = {this.state.currentPhrase}/>
            <ImageLinkForm 
                onInputChange = {this.onInputChange} 
                onSubmit = {this.onSubmit}
                input = {this.state.input}
            />
            <FaceRecognition box={box} imageUrl = {imageUrl} />
          </div>
        :(
          route === 'register'
          ?  <Register onRouteChange = {this.onRouteChange} loadUser = {this.loadUser} />
          : <SignIn onRouteChange = {this.onRouteChange} loadUser = {this.loadUser} />
          
        )
      }
    </div>
    );
  }
}

export default App;
