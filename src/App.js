import React, { Component } from 'react';

import { CardList } from './components/card-list/card-list.component.jsx';
import { SearchBox } from './components/search-box/search-box.component.jsx';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: ''
    }
  }
  // El state nomes es 'state' aqui, un cop l'state es pasa a un children pasa a ser props al children i a tots els seus childrens

  // Primer fem fetch a la web on esta el json, després es formateja el Json 
  // perque React l'entengui i llavors podem agafar els items de dintre del Json
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => this.setState({ monsters: users}));
  }

  // en aquesta funció, cuan la cridem desde el this.handleChange del render() no fa falta especificar el (e) a la crida, perque li estem
  // pasant el bloque senser de codi. Li posem '= (e) =>' perque el 'this' tingui el contexte del 'App' component. Si no ho 
  // posesim així, ens donaria un error al executar ja que 'this' seria undefined.

  // utilitzarem arrow functions en cualsevol métode que escribim que no es part de React (ex. render(), componentDidMount()).
  handleChange = ( e ) => {
    this.setState({ searchField: e.target.value });
  }

  // si fiquem algo entre tags <CardList>aquiPorEjemplo</CardList> el aquiPorEjemplo es un children, i dintre del component CardList sera una variable dels props
  // per agafar la variable children aquesta nomes tenim que posar (props) i  a on vulguem utilitzar-ho props.children
  // No posem this.handleChange() perque llavors s'executaria sol en el moment en que iniciem la pàgina. Volem que s'executi cuan nosaltres volguem, així que no es posa ()
  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster => 
      monster.name.toLowerCase().includes(searchField.toLowerCase())
      )
    return (
      <div className="App">
      <h1> Monsters Rolodex </h1>
      <SearchBox 
        placeholder='search monsters' 
        handleChange={this.handleChange}  
      />

        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
