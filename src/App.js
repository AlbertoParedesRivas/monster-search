import { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(){
        super();
        this.state = {
            monsters: [],
            searchField: ""
        };
        console.log("constructor()");
    }
    
    async componentDidMount(){
        console.log("componentDidMount()");
        try {
            let response = await fetch("https://jsonplaceholder.typicode.com/users");
            let users = await response.json();
            this.setState(() => (
                {monsters: users}
                ), 
                () => console.log(this.state)
            );
        } catch (error) {
            console.log(error);
        }
        }
        
    render(){
        console.log("render()");
        let searchResult = this.state.monsters.filter(monster => {
            return monster.name.toLowerCase().includes(this.state.searchField);
        }); 
        return (
            <div className="App">
                <input 
                    className="search-box" 
                    type="search" 
                    placeholder="search monsters"
                    onChange={event => {
                        let searchField = event.target.value;
                        this.setState(() => {
                            return {searchField}
                        });
                    }}
                />
                {
                    searchResult.map((monster) => {
                        return <div key={monster.id}><h1>{monster.name}</h1></div>;
                    })
                }
            </div>
        );
    }
}

export default App;
