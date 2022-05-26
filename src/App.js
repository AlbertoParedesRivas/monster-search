// import { Component } from 'react';
import { useState, useEffect } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

const App = () => {

    const [searchField, setSearchField] = useState("");
    const [monsters, setMonsters] = useState([]);
    const [filteredMonsters, setFilteredMonsters] = useState(monsters);

    useEffect(() => {
        async function fetchMonsters() {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/users");
                const users = await response.json();
                setMonsters(users);
            } catch (error) {
                console.log(error);
            }
        }
        fetchMonsters();
    }, []);

    useEffect(() => {
        const searchResult = monsters.filter(monster => {
            return monster.name.toLowerCase().includes(searchField);
        });
        setFilteredMonsters(searchResult);
    }, [monsters, searchField]);


    const onSearchChange = event => {
        let searchFieldString = event.target.value;
        setSearchField(searchFieldString);
    }


    return (
        <div className="App">
            <h1 className='app-title'>Monster directory</h1>
            <SearchBox 
                className="monsters-search-box" 
                placeholder="Search monsters." 
                onChangeHandler = {onSearchChange.bind(this)}
            />
            <CardList monsters={filteredMonsters}/>
        </div>
    );
}

// class App extends Component {
//     constructor(){
//         super();
//         this.state = {
//             monsters: [],
//             searchField: ""
//         };
//     }
    
//     async componentDidMount(){
//         try {
//             let response = await fetch("https://jsonplaceholder.typicode.com/users");
//             let users = await response.json();
//             this.setState(() => (
//                 {monsters: users}
//                 ));
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     onSearchChange(event){
//         let searchField = event.target.value;
//         this.setState(() => {
//             return {searchField}
//         });
//     }
        
//     render(){
//         const { monsters, searchField } = this.state;
//         const { onSearchChange } = this;
//         let searchResult = monsters.filter(monster => {
//             return monster.name.toLowerCase().includes(searchField);
//         }); 
//         return (
//             <div className="App">
//                 <h1 className='app-title'>Monster directory</h1>
//                 <SearchBox className="monsters-search-box" placeholder="Search monsters." onChangeHandler = {onSearchChange.bind(this)}/>
//                 <CardList monsters={searchResult}/>
//             </div>
//         );
//     }
// }

export default App;
