import React from 'react';
import './App.css';
import api from './api';
import PostView from './Components/PostView'

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// function App() {
//   return (
//     <div className="App">
//       <div className="PostingSection">
//         <h2>대나무 숲 글 작성하기</h2>
//         <input />
//         <textarea />
//         </div>
//       </div>
//   );
// }

class App extends React.Component{
  constructor(pros){
    super(pros)
    this.state = {
      title: '',
      content: '',
      results: [],
    }
  }
  
  //데이터 요청
  componentDidMount(){
    this.getPosts()
  }

  async getPosts(){
    const _results = await api.getAllPosts()
    console.log(_results)
    this.setState({results:_results.data})
  }

  handlingChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }
  
  handlingSubmit = async(event) => {
    event.preventDefault()
    let result = await api.createPost({title:this.state.title, content:this.state.content})
    console.log("완료됨!",result)
    this.setState({title:'',content:''})
    this.getPosts()
  }

  handlingDelete = async (id) => {
    await api.deletePost(id)
    this.getPosts()
  }

  render(){
    return(
    <div className="App">
      <Container maxWidth="lg">
      <div className="PostingSection">
        <Paper className="PostingPaper" >
        <center><h2>대나무 숲 글 작성하기</h2></center>
        <form className="PostingForm" onSubmit={this.handlingSubmit}>

        <TextField
          id="standard-multiline-flexible"
          label="title"
          name="title"
          multiline
          
          rowsMax="4"
          value={this.state.title}
          onChange={this.handlingChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="standard-multiline-flexible"
          label="content"
          name="content"
          multiline
          rows="4"
          rowsMax="4"
          value={this.state.content}
          onChange={this.handlingChange}
          margin="normal"
          variant="outlined"
        />
        <Button variant="outlined" color="#f5d9fcd7" type="submit" >제출하기</Button>
        </form>
        </Paper>
      </div><center>
      <div className = "ViewSection">
        {
          this.state.results.map((post)=>
            <Card className={'card'}>
            <CardContent>
              <Typography >
                <PostView key={post.id} id={post.id} title={post.title} content={post.content}/>
              </Typography>
            </CardContent>
            <CardActions>
              <Button color="secondary" size="small" onClick={(event)=>this.handlingDelete(post.id)}>Delete</Button>
            </CardActions>
          </Card>
          )
        }
      </div></center>
      </Container>
    </div>
    );
  }
}

export default App;